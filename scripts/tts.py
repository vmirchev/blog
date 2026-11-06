#!/usr/bin/env python3
"""Generate blog narration with Kokoro and export WAV, MP3, and a segment CSV."""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
import textwrap
import time
from pathlib import Path

SAMPLE_RATE = 24_000
MODEL_ID = "hexgrad/Kokoro-82M"
MANIFEST_SCHEMA = 1


def markdown_to_speech(raw: str, *, keep_image_captions: bool = False) -> str:
    """Remove common Markdown formatting and standalone image captions."""
    raw = raw.replace("\r\n", "\n")
    raw = re.sub(r"\A---\s*\n.*?\n---\s*(?:\n|\Z)", "", raw, flags=re.S)
    raw = re.sub(r"```.*?```|~~~.*?~~~", "", raw, flags=re.S)
    raw = re.sub(
        r"<!--\s*tts:skip:start\s*-->.*?<!--\s*tts:skip:end\s*-->",
        "",
        raw,
        flags=re.S,
    )
    if not keep_image_captions:
        raw = re.sub(
            r"<figcaption\b[^>]*>.*?</figcaption\s*>",
            "\n",
            raw,
            flags=re.I | re.S,
        )
    raw = re.sub(
        r"(?m)(?:^[ \t]*>[ \t]?.*(?:\n|$))+",
        lambda match: "\n\n"
        + " ".join(
            re.sub(r"^[ \t]*>[ \t]?", "", line)
            for line in match.group().splitlines()
        )
        + "\n\n",
        raw,
    )
    lines = raw.splitlines()
    filtered = []
    i = 0
    image_line = re.compile(r"[ \t]*!\[[^]\n]*\]\([^\n]*\)[ \t]*")
    italic_line = re.compile(r"[ \t]*(?:\*[^*\n]+\*|_[^_\n]+_)[ \t]*")
    while i < len(lines):
        line = lines[i]
        if "<!-- tts:skip -->" in line:
            i += 1
            continue
        if not keep_image_captions and image_line.fullmatch(line):
            filtered.append(line)
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            if j < len(lines) and italic_line.fullmatch(lines[j]):
                i = j + 1
                continue
        filtered.append(line)
        i += 1
    raw = "\n".join(filtered)
    raw = re.sub(r"!\[([^]]*)\]\([^)]*\)", "", raw)
    raw = re.sub(r"\[([^]]+)\]\([^)]*\)", r"\1", raw)
    raw = re.sub(r"<[^>]+>", "", raw)
    raw = re.sub(
        r"^[ \t]*#{1,6}[ \t]+(.+?)[ \t]*$",
        r"\n\n\1\n\n",
        raw,
        flags=re.M,
    )
    raw = re.sub(r"^[ \t]*[-*+][ \t]+", "", raw, flags=re.M)
    raw = re.sub(r"[`*_~]", "", raw)
    raw = re.sub(r"[ \t]+", " ", raw)
    raw = re.sub(r"\n{3,}", "\n\n", raw)
    return raw.strip()


def split_post(text: str, max_chars: int) -> list[str]:
    pieces: list[str] = []
    for paragraph in re.split(r"\n\s*\n", text):
        paragraph = " ".join(paragraph.split())
        if not paragraph:
            continue
        current = ""
        for sentence in re.split(r"(?<=[.!?])\s+", paragraph):
            for part in textwrap.wrap(
                sentence,
                width=max_chars,
                break_long_words=False,
                break_on_hyphens=False,
            ):
                if len(part) > max_chars:
                    raise ValueError(
                        f"A word is longer than --max-chars ({max_chars}); "
                        "edit the input before synthesis"
                    )
                candidate = f"{current} {part}".strip()
                if len(candidate) > max_chars and current:
                    pieces.append(current)
                    current = part
                else:
                    current = candidate
        if current:
            pieces.append(current)
    return pieces


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create blog-post narration with Kokoro (CPU inference)."
    )
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--text", help="Text to speak; quote it in your shell")
    source.add_argument(
        "--file", type=str, help="UTF-8 .txt/.md file, or '-' to read stdin"
    )
    source.add_argument(
        "--sync-blog", action="store_true",
        help="Sync MP3s and a content-hash manifest for published blog posts",
    )
    parser.add_argument("--output-dir", type=Path, default=Path("output"))
    parser.add_argument("--name", default="blog_post_audio", help="Output basename")
    parser.add_argument("--voice", default="af_heart")
    parser.add_argument(
        "--lang", choices=("a", "b", "e", "f", "h", "i", "p"), default="a",
        help="a=US English, b=UK English; other listed codes use espeak-ng",
    )
    parser.add_argument("--speed", type=float, default=1.0)
    parser.add_argument("--pause", type=float, default=0.35, help="Seconds between segments")
    parser.add_argument("--max-chars", type=int, default=350)
    parser.add_argument("--mp3-bitrate", default="128k", choices=("96k", "128k", "192k"))
    parser.add_argument(
        "--preview-text", action="store_true", help="Print the text that would be spoken, then exit"
    )
    parser.add_argument(
        "--keep-image-captions", action="store_true",
        help="Read italic paragraphs immediately after standalone images",
    )
    parser.add_argument("--overwrite", action="store_true", help="Replace matching output files")
    parser.add_argument("--blog-root", type=Path, default=Path("src/content/blog"))
    parser.add_argument("--audio-dir", type=Path, default=Path("public/audio"))
    parser.add_argument("--manifest", type=Path, default=Path("src/data/audio-manifest.json"))
    parser.add_argument("--narration-version", default="1", help="Bump to regenerate all blog audio")
    parser.add_argument("--check-only", action="store_true", help="Plan blog audio changes without loading Kokoro")
    parser.add_argument("--github-output", action="store_true", help="Write plan booleans to GITHUB_OUTPUT")
    args = parser.parse_args(argv)

    if not re.fullmatch(r"[A-Za-z0-9_-]+", args.name):
        parser.error("--name must contain only letters, digits, underscores, or hyphens")
    if not args.voice.startswith(args.lang):
        parser.error("--voice prefix must match --lang (for example af_heart with --lang a)")
    if not 0.5 <= args.speed <= 2.0:
        parser.error("--speed must be between 0.5 and 2.0")
    if not 0 <= args.pause <= 2:
        parser.error("--pause must be between 0 and 2 seconds")
    if not 100 <= args.max_chars <= 400:
        parser.error("--max-chars must be between 100 and 400")
    if (args.check_only or args.github_output) and not args.sync_blog:
        parser.error("--check-only and --github-output require --sync-blog")
    if not args.narration_version.strip():
        parser.error("--narration-version must not be empty")
    return args


def read_source(args: argparse.Namespace) -> str:
    if args.text is not None:
        raw = args.text
    elif args.file == "-":
        raw = sys.stdin.read()
    else:
        path = Path(args.file)
        if path.suffix.lower() not in {".txt", ".md"}:
            raise ValueError("--file must be a .txt or .md file")
        raw = path.read_text(encoding="utf-8-sig")
    text = markdown_to_speech(raw, keep_image_captions=args.keep_image_captions)
    if not text:
        raise ValueError("No speakable text found")
    return text


def synthesize(
    pieces: list[str], args: argparse.Namespace, wav_path: Path, csv_path: Path
) -> tuple[int, float]:
    import numpy as np
    import soundfile as sf
    from kokoro import KPipeline

    pipeline = KPipeline(lang_code=args.lang, repo_id=MODEL_ID, device="cpu")
    silence = np.zeros(round(args.pause * SAMPLE_RATE), dtype=np.float32)
    segments = 0
    started = time.perf_counter()

    with sf.SoundFile(
        wav_path, mode="w", samplerate=SAMPLE_RATE, channels=1, subtype="PCM_16"
    ) as wav, csv_path.open("w", newline="", encoding="utf-8") as manifest:
        writer = csv.writer(manifest)
        writer.writerow(["segment", "source_piece", "start_seconds", "end_seconds", "text"])
        for piece_number, piece in enumerate(pieces, 1):
            before_piece = segments
            for result in pipeline(piece, voice=args.voice, speed=args.speed):
                if result.audio is None:
                    continue
                audio = result.audio.detach().cpu().numpy().astype(np.float32).reshape(-1)
                if not audio.size:
                    continue
                start_seconds = wav.tell() / SAMPLE_RATE
                wav.write(audio)
                end_seconds = wav.tell() / SAMPLE_RATE
                if silence.size:
                    wav.write(silence)
                segments += 1
                writer.writerow(
                    [
                        segments,
                        piece_number,
                        round(start_seconds, 3),
                        round(end_seconds, 3),
                        result.graphemes.strip() or piece,
                    ]
                )
            if segments == before_piece:
                raise RuntimeError(f"Kokoro returned no audio for piece {piece_number}: {piece[:80]!r}")
            print(f"Completed piece {piece_number}/{len(pieces)}", file=sys.stderr)

    if not segments:
        raise RuntimeError("Kokoro returned no audio; check the text, language, and voice")
    return segments, time.perf_counter() - started


def frontmatter_is_draft(raw: str) -> bool:
    """Read the simple `draft: true` field used by this blog's Astro schema."""
    match = re.match(r"\A---[ \t]*\r?\n(.*?)\r?\n---[ \t]*(?:\r?\n|\Z)", raw, re.S)
    if not match:
        return False
    values = re.findall(
        r"(?im)^[ \t]*draft[ \t]*:[ \t]*(true|false)[ \t]*(?:#.*)?$",
        match.group(1),
    )
    if len(values) > 1:
        raise ValueError("Duplicate draft fields in frontmatter")
    return bool(values and values[0].lower() == "true")


def narration_fingerprint(text: str, args: argparse.Namespace) -> str:
    settings = {
        "text": text,
        "model": MODEL_ID,
        "narration_version": args.narration_version,
        "voice": args.voice,
        "lang": args.lang,
        "speed": args.speed,
        "pause": args.pause,
        "max_chars": args.max_chars,
        "mp3_bitrate": args.mp3_bitrate,
        "keep_image_captions": args.keep_image_captions,
    }
    encoded = json.dumps(settings, sort_keys=True, ensure_ascii=False, separators=(",", ":"))
    return hashlib.sha256(encoded.encode("utf-8")).hexdigest()


def load_manifest(path: Path) -> dict[str, dict[str, str]]:
    if not path.exists():
        return {}
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict) or data.get("schema") != MANIFEST_SCHEMA:
        raise ValueError(f"Unsupported audio manifest: {path}")
    posts = data.get("posts")
    if not isinstance(posts, dict):
        raise ValueError(f"Invalid posts in audio manifest: {path}")
    for slug, entry in posts.items():
        if not isinstance(slug, str) or not isinstance(entry, dict):
            raise ValueError(f"Invalid audio manifest entry: {slug!r}")
        expected_file = f"{slug}.mp3"
        relative = Path(expected_file)
        if relative.is_absolute() or ".." in relative.parts or entry.get("file") != expected_file:
            raise ValueError(f"Unsafe audio manifest path for {slug!r}")
        if not isinstance(entry.get("fingerprint"), str):
            raise ValueError(f"Missing fingerprint for {slug!r}")
    return posts


def plan_blog_sync(args: argparse.Namespace) -> dict:
    root = args.blog_root.resolve()
    if not root.is_dir():
        raise ValueError(f"Blog directory does not exist: {root}")
    old_posts = load_manifest(args.manifest)
    new_posts: dict[str, dict[str, str]] = {}
    texts: dict[str, str] = {}
    generate: list[str] = []
    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in {".md", ".mdx"}:
            continue
        raw = path.read_text(encoding="utf-8-sig")
        if frontmatter_is_draft(raw):
            continue
        slug = path.relative_to(root).with_suffix("").as_posix()
        if slug in new_posts:
            raise ValueError(f"Duplicate blog post slug: {slug}")
        if not all(re.fullmatch(r"[A-Za-z0-9_-]+", part) for part in slug.split("/")):
            raise ValueError(f"Unsupported blog post filename: {path}")
        text = markdown_to_speech(raw, keep_image_captions=args.keep_image_captions)
        if not text:
            raise ValueError(f"No speakable text in published post: {path}")
        entry = {"fingerprint": narration_fingerprint(text, args), "file": f"{slug}.mp3"}
        new_posts[slug] = entry
        texts[slug] = text
        audio_path = args.audio_dir / entry["file"]
        if old_posts.get(slug) != entry or not audio_path.is_file() or audio_path.stat().st_size == 0:
            generate.append(slug)
    remove = sorted(set(old_posts) - set(new_posts))
    return {
        "generate": generate,
        "remove": remove,
        "needs_generation": bool(generate),
        "needs_changes": bool(generate or remove or not args.manifest.exists()),
        "posts": new_posts,
        "texts": texts,
        "old_posts": old_posts,
    }


def render_blog_mp3(text: str, args: argparse.Namespace, destination: Path) -> None:
    pieces = split_post(text, args.max_chars)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=".kokoro-", dir=destination.parent) as temporary:
        temporary_path = Path(temporary)
        wav_path = temporary_path / "narration.wav"
        mp3_path = temporary_path / "narration.mp3"
        csv_path = temporary_path / "segments.csv"
        segments, elapsed = synthesize(pieces, args, wav_path, csv_path)
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav_path),
             "-codec:a", "libmp3lame", "-b:a", args.mp3_bitrate, str(mp3_path)],
            check=True,
        )
        if not mp3_path.is_file() or mp3_path.stat().st_size < 1024:
            raise RuntimeError(f"Invalid generated MP3: {destination}")
        mp3_path.replace(destination)
    print(f"Generated {destination} ({segments} segments, {elapsed:.1f}s)")


def write_manifest(path: Path, posts: dict[str, dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    content = json.dumps({"schema": MANIFEST_SCHEMA, "posts": posts}, indent=2, ensure_ascii=False)
    with tempfile.NamedTemporaryFile(
        mode="w", encoding="utf-8", prefix=".audio-manifest-", suffix=".json",
        dir=path.parent, delete=False,
    ) as temporary:
        temporary.write(content + "\n")
        temp_path = Path(temporary.name)
    temp_path.replace(path)


def sync_blog(args: argparse.Namespace) -> int:
    plan = plan_blog_sync(args)
    summary = {key: plan[key] for key in ("generate", "remove", "needs_generation", "needs_changes")}
    print(json.dumps(summary, sort_keys=True))
    if args.github_output:
        github_output = os.environ.get("GITHUB_OUTPUT")
        if not github_output:
            raise ValueError("--github-output requires GITHUB_OUTPUT")
        with Path(github_output).open("a", encoding="utf-8") as output:
            output.write(f"needs_generation={str(plan['needs_generation']).lower()}\n")
            output.write(f"needs_changes={str(plan['needs_changes']).lower()}\n")
    if args.check_only or not plan["needs_changes"]:
        return 0
    for slug in plan["generate"]:
        render_blog_mp3(plan["texts"][slug], args, args.audio_dir / plan["posts"][slug]["file"])
    for slug in plan["remove"]:
        old_file = args.audio_dir / plan["old_posts"][slug]["file"]
        old_file.unlink(missing_ok=True)
        print(f"Removed {old_file}")
    write_manifest(args.manifest, plan["posts"])
    return 0


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    if args.sync_blog:
        return sync_blog(args)
    text = read_source(args)
    if args.preview_text:
        print(text)
        return 0
    pieces = split_post(text, args.max_chars)
    if not pieces:
        raise ValueError("No speakable text found after splitting")

    output_dir = args.output_dir.expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    wav_path = output_dir / f"{args.name}.wav"
    mp3_path = output_dir / f"{args.name}.mp3"
    csv_path = output_dir / f"{args.name}_segments.csv"
    destinations = (wav_path, mp3_path, csv_path)
    existing = [str(path) for path in destinations if path.exists()]
    if existing and not args.overwrite:
        raise FileExistsError(
            "Output already exists: " + ", ".join(existing) + "; use --overwrite to replace it"
        )

    print(f"Synthesizing {len(pieces)} pieces ({len(text.split())} words) on CPU")
    with tempfile.TemporaryDirectory(prefix=".kokoro-", dir=output_dir) as temporary:
        temp_dir = Path(temporary)
        temp_wav = temp_dir / wav_path.name
        temp_mp3 = temp_dir / mp3_path.name
        temp_csv = temp_dir / csv_path.name
        segments, elapsed = synthesize(pieces, args, temp_wav, temp_csv)
        subprocess.run(
            [
                "ffmpeg", "-y", "-loglevel", "error", "-i", str(temp_wav),
                "-codec:a", "libmp3lame", "-b:a", args.mp3_bitrate, str(temp_mp3),
            ],
            check=True,
        )
        for source, destination in (
            (temp_wav, wav_path), (temp_mp3, mp3_path), (temp_csv, csv_path)
        ):
            source.replace(destination)

    print(f"Created {segments} segments in {elapsed:.1f} seconds")
    for path in destinations:
        print(path)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OSError, ValueError, RuntimeError, subprocess.CalledProcessError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
