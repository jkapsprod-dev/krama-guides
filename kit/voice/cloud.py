r"""The kit's cloned voice: ElevenLabs, through OpenMontage's ElevenLabs tool.

Run with OpenMontage's Python (the kit does this for you):

  clone   make a voice from voiceover\my-voice\sample.wav and print its id as JSON
  line    say one line in that voice, with the lines around it as context so the
          delivery flows from line to line like one person talking

The API key comes from tools\OpenMontage\.env (ELEVENLABS_API_KEY), loaded by
OpenMontage. It is never printed or written anywhere by this script.
"""
import argparse
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OPENMONTAGE = ROOT / "tools" / "OpenMontage"
sys.path.insert(0, str(OPENMONTAGE))

from tools.audio.elevenlabs_tts import ElevenLabsTTS  # noqa: E402  (loads .env too)


def key() -> str:
    k = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    if not k:
        raise SystemExit("ELEVENLABS_API_KEY is not set in tools\\OpenMontage\\.env")
    return k


def clone(args) -> int:
    import requests

    files = [("files", (Path(f).name, open(f, "rb"))) for f in args.sample]
    data = {
        "name": args.name,
        "description": args.description,
        "remove_background_noise": "true" if args.denoise else "false",
    }
    r = requests.post(
        "https://api.elevenlabs.io/v1/voices/add",
        headers={"xi-api-key": key()},
        data=data,
        files=files,
        timeout=180,
    )
    if r.status_code >= 400:
        print(f"ElevenLabs said {r.status_code}: {r.text[:400]}", file=sys.stderr)
        return 1
    body = r.json()
    print(json.dumps({"voice_id": body.get("voice_id"), "requires_verification": body.get("requires_verification", False)}))
    return 0


def line(args) -> int:
    if os.environ.get("KIT_CLOUD_FAKE") == "1":
        # Test hook for the kit's own checks: a tone as long as the line would roughly be, no API call.
        import subprocess

        secs = max(0.8, len(args.text) * 0.07)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", f"sine=frequency=220:duration={secs:.2f}",
                        "-af", "apad=pad_dur=0.4", args.out], check=True)
        print(json.dumps({"request_id": "fake", "chars": len(args.text)}))
        return 0
    inputs = {
        "text": args.text,
        "voice_id": args.voice_id,
        "model_id": args.model,
        "stability": args.stability,
        "similarity_boost": args.similarity,
        "style": args.style,
        "speed": args.speed,
        "use_speaker_boost": True,
        "output_format": "mp3_44100_192",
        "output_path": args.out,
    }
    if args.seed is not None:
        inputs["seed"] = args.seed
    if args.previous_text:
        inputs["previous_text"] = args.previous_text
    if args.next_text:
        inputs["next_text"] = args.next_text
    if args.previous_request_id:
        inputs["previous_request_ids"] = args.previous_request_id[-3:]
    try:
        res = ElevenLabsTTS().execute(inputs)
    except Exception as e:  # requests errors carry the status; keep the key out of it
        print(f"ElevenLabs failed: {type(e).__name__}: {str(e)[:300]}", file=sys.stderr)
        return 1
    if not res.success:
        print(res.error, file=sys.stderr)
        return 1
    print(json.dumps({"request_id": res.data.get("request_id"), "chars": res.data.get("text_length")}))
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description="The kit's cloned voice (ElevenLabs).")
    sub = p.add_subparsers(dest="cmd", required=True)

    c = sub.add_parser("clone")
    c.add_argument("--sample", action="append", required=True)
    c.add_argument("--name", required=True)
    c.add_argument("--description", default="Krama guide videos: calm Hinglish narration.")
    c.add_argument("--denoise", action="store_true")
    c.set_defaults(fn=clone)

    l = sub.add_parser("line")
    l.add_argument("--text", required=True)
    l.add_argument("--voice-id", required=True)
    l.add_argument("--model", default="eleven_multilingual_v2")
    l.add_argument("--stability", type=float, default=0.45)
    l.add_argument("--similarity", type=float, default=0.85)
    l.add_argument("--style", type=float, default=0.25)
    l.add_argument("--speed", type=float, default=1.0)
    l.add_argument("--seed", type=int)
    l.add_argument("--previous-text")
    l.add_argument("--next-text")
    l.add_argument("--previous-request-id", action="append")
    l.add_argument("--out", required=True)
    l.set_defaults(fn=line)

    args = p.parse_args()
    return args.fn(args)


if __name__ == "__main__":
    sys.exit(main())
