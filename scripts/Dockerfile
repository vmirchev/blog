FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HF_HOME=/output/.cache/huggingface

RUN apt-get update \
    && apt-get install -y --no-install-recommends espeak-ng ffmpeg libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

# CPU-only PyTorch keeps the image smaller than the default Linux CUDA wheels.
RUN python -m pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu torch \
    && python -m pip install --no-cache-dir kokoro==0.9.4 soundfile

WORKDIR /app
COPY scripts/tts.py /app/scripts/tts.py

ENTRYPOINT ["python", "/app/scripts/tts.py"]
