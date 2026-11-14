r"""Make one voice line (WAV) with OpenMontage's Piper tool (free, offline).

Run it with OpenMontage's Python, from anywhere:

  tools\OpenMontage\.venv\Scripts\python.exe tools\voice-line.py ^
      --text "गेस्ट्स खोलिए। ऐड गेस्ट पर टैप कीजिए।" ^
      --voice hi_IN-priyamvada-medium ^
      --out voiceover\V-2-guests-1\01.wav

Hinglish: write it in Devanagari (English words spelled the way people say
them), so the Hindi voices pronounce them naturally.

Voices live in %USERPROFILE%\.piper\models. Add one with:
  tools\OpenMontage\.venv\Scripts\python.exe -m piper.download_voices ^
      --download-dir %USERPROFILE%\.piper\models <voice-name>
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
OPENMONTAGE = HERE / "OpenMontage"
sys.path.insert(0, str(OPENMONTAGE))

# piper.exe sits next to the venv's python; make sure it is on PATH.
os.environ["PATH"] = str(Path(sys.executable).parent) + os.pathsep + os.environ.get("PATH", "")

from tools.audio.piper_tts import PiperTTS  # noqa: E402  (OpenMontage's tool)


def main() -> int:
    p = argparse.ArgumentParser(description="Make one voice line with Piper.")
    p.add_argument("--text", required=True, help="What to say.")
    p.add_argument("--voice", default="hi_IN-priyamvada-medium", help="Piper voice name.")
    p.add_argument("--out", required=True, help="Output .wav path.")
    p.add_argument("--speed", type=float, default=1.05,
                   help="Piper length scale: higher is slower (1.0 = normal).")
    p.add_argument("--pause", type=float, default=0.45, help="Seconds of silence between sentences.")
    p.add_argument("--lead-in", type=float, default=0.3, help="Seconds of silence before speech.")
    args = p.parse_args()

    out = Path(args.out).resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    raw = out.with_name(f"_raw-{out.name}")

    res = PiperTTS().execute({
        "text": args.text,
        "model": args.voice,
        "length_scale": args.speed,
        "sentence_silence": args.pause,
        "output_path": str(raw),
    })
    if not res.success:
        print(res.error, file=sys.stderr)
        return 1

    if shutil.which("ffmpeg"):
        ms = int(args.lead_in * 1000)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(raw),
                        "-af", f"adelay={ms}|{ms}", "-ar", "48000", "-ac", "1", str(out)], check=True)
        raw.unlink()
    else:
        raw.replace(out)

    dur = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "csv=p=0", str(out)], capture_output=True, text=True).stdout.strip() \
        if shutil.which("ffprobe") else "?"
    print(json.dumps({"file": str(out), "voice": args.voice, "seconds": dur}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
