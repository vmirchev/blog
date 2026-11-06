# Personal website

This is a personal website at [vmirchev.com](https://vmirchev.com). It introduces my work as a software engineer, highlights selected projects, and collects writing about software development and machine learning.

This repository contains the source for the site. It is built with Astro and TypeScript, with blog posts written in Markdown and MDX. The site builds to static files in `dist/`; GitHub Actions checks the build and deploys it over SFTP when changes reach the default branch.

## Blog narration

Published posts can have a Kokoro audio player beside their title. On a push to `main`, the deployment workflow checks spoken text against `src/data/audio-manifest.json` before installing Python or Kokoro. It generates missing or changed MP3s in `public/audio/`, removes audio for deleted or draft posts, commits those assets and the manifest, then builds and deploys that workspace. Pull requests only check and build. Caption-only edits that do not change spoken text leave the MP3 unchanged. Remote deletion is limited to `/audio/`.

Run the dependency-free check locally with `python3 scripts/tts.py --sync-blog --check-only`. To generate locally, use Python 3.12 with CPU PyTorch, `kokoro==0.9.4`, `soundfile`, `espeak-ng`, and `ffmpeg`, then run `python3 scripts/tts.py --sync-blog`. You can also build the CPU image from the repository root with `docker build -f scripts/Dockerfile -t kokoro-blog-tts .` and run it with `docker run --rm -v "$PWD:/workspace" -v "$PWD/output:/output" -w /workspace kokoro-blog-tts --sync-blog`. The first production run generates audio for every published post; review generated narration before making it public.

To run it locally:

```bash
npm ci
npm run dev
```
