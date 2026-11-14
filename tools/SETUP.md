---
tags: [setup, tools]
---
# Video tools setup (1C, 2026-11-14)

Everything below is installed on Jay's Windows PC and was tested on 2026-11-14.

## What's installed

| Tool | Version | Where | How it got there |
|---|---|---|---|
| Node.js | 24.20.0 (npm 11.19.0) | `C:\Program Files\nodejs` | already there |
| Python | 3.12.10 | `%LOCALAPPDATA%\Programs\Python\Python312` | already there |
| Git | 2.55.0 | `C:\Program Files\Git` | already there |
| FFmpeg + FFprobe | 9.0.2 (full build) | `%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg_…\ffmpeg-9.0.2-full_build\bin` (on PATH) | `winget install Gyan.FFmpeg` |
| OpenMontage | commit `fecb9a1` (2026-11-08) | `tools\OpenMontage\` (ignored by git) | `git clone --depth 1 https://github.com/calesthio/OpenMontage` |
| OpenMontage Python env | Python 3.12, `requirements.txt` | `tools\OpenMontage\.venv\` | README's Windows setup line |
| OpenMontage Remotion | 199 npm packages | `tools\OpenMontage\remotion-composer\node_modules\` | `npm install` |
| Piper TTS | piper-tts 1.8.0 | `tools\OpenMontage\.venv\Scripts\piper.exe` | `pip install piper-tts` |
| Piper voices | `hi_IN-priyamvada-medium`, `hi_IN-pratham-medium`, `hi_IN-rohan-medium` | `%USERPROFILE%\.piper\models\` | `python -m piper.download_voices` |
| OpenMontage `.env` | copied from `.env.example`, no keys yet | `tools\OpenMontage\.env` (ignored by git) | `Copy-Item .env.example .env` |
| HyperFrames | **0.8.146** (same as `app\promo\launch-60s`; 0.9.45 exists, don't upgrade) | runs with `npx --yes hyperframes@0.8.146` | npx cache |
| HyperFrames skills | hyperframes, hyperframes-cli, hyperframes-registry, media-use | `%USERPROFILE%\.claude\skills\` and `%USERPROFILE%\.agents\skills\` (every Claude session) | `npx hyperframes@0.8.146 skills update` |
| HyperFrames browser | chrome-headless-shell 146.0.7680.31 | `%USERPROFILE%\.cache\puppeteer\chrome-headless-shell\` | downloaded on first render |

**OpenMontage preflight** (`registry.provider_menu_summary()`): FFmpeg, Remotion and HyperFrames runtimes all available. Voice: Piper only (1 of 19; the rest need keys). Music search: Pixabay (1 of 2; Freesound needs a key). Subtitles: 2 of 2.

**Not installed (optional):** Mermaid CLI, whisper-cpp, Kokoro and MusicGen (HyperFrames' local fallbacks). No ElevenLabs key.

**PATH note:** FFmpeg was added to PATH by winget. A terminal that was open before the install won't see it. Open a new terminal, or run:
```powershell
$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
```

## Make a voice line (free, offline)

From `C:\Users\jayka\code\krama-guides`:

```powershell
tools\OpenMontage\.venv\Scripts\python.exe tools\voice-line.py --text "गेस्ट्स खोलिए। ऐड गेस्ट पर टैप कीजिए।" --voice hi_IN-priyamvada-medium --out voiceover\V-2-guests-1\01.wav
```

- `tools\voice-line.py` calls OpenMontage's `piper_tts` tool, adds 0.3 s of silence at the start and saves 48 kHz mono WAV. It prints the file and its length in seconds.
- Options: `--speed` (1.05 default; higher is slower), `--pause` (0.45 s between sentences), `--lead-in` (0.3 s).
- **Hinglish:** write the line in Devanagari, with English words spelled as people say them (गेस्ट्स, ऐड गेस्ट, टैप, सेव). The Hindi voices read Latin letters badly.
- Voices: `hi_IN-priyamvada-medium` (female), `hi_IN-pratham-medium` (male), `hi_IN-rohan-medium` (male). Add another voice with:
  ```powershell
  tools\OpenMontage\.venv\Scripts\python.exe -m piper.download_voices --download-dir $HOME\.piper\models <voice-name>
  ```
- **Custom voice / ElevenLabs:** the owner plans a custom voice. For ElevenLabs, put `ELEVENLABS_API_KEY=…` in `tools\OpenMontage\.env` (never in a committed file); OpenMontage's `elevenlabs_tts` tool then becomes available.

Samples made in 1C: `voiceover\samples\sample-1-priyamvada-female.wav`, `sample-2-pratham-male.wav`, `sample-3-rohan-male.wav` (Hinglish, about 10 s each).

## Render a HyperFrames video

From a HyperFrames project folder (one with `index.html` and `hyperframes.json`, like `kit\` once 4A builds it, or a copy of `app\promo\launch-60s`):

```powershell
npx --yes hyperframes@0.8.146 preview                     # live preview in the browser
npx --yes hyperframes@0.8.146 check                       # check the composition
npx --yes hyperframes@0.8.146 render --quality delivery --video-bitrate 3000k --output renders/V-2-guests-1-16x9.mp4
npx --yes hyperframes@0.8.146 render --composition formats/9x16.html --quality delivery --video-bitrate 3000k --output renders/V-2-guests-1-9x16.mp4
```

- `--video-bitrate 3000k` keeps videos at about 3 Mbps (Appendix F).
- `--quality draft` is quicker for test renders.
- **Never render inside `app\`.** Copy the project out first (renders write a `renders\` folder).
- Test: a draft render of a copy of the 60-second launch film took 3 min 38 s on this PC (Ryzen 9 5900HX, GPU capture) and gave a correct 1920×1080 H.264 + AAC file.

## OpenMontage pipelines for later

OpenMontage says every production goes through a pipeline (`pipeline_defs\`, plus the stage skills in `skills\pipelines\<pipeline>\`). Read `tools\OpenMontage\AGENT_GUIDE.md` first.

- **Screen Demo** (`screen-demo.yaml`, production): takes a real screen recording (our Playwright footage) and adds callouts, zooms, subtitles and cleaned audio. Stages: idea → script → scene_plan → assets → edit → compose → publish.
- **Localization & Dub** (`localization-dub.yaml`, beta): from a finished video, makes translated subtitles, dubbed audio and other-language versions. Same stages, with quality gates for translation and timing.
- **Music:** OpenMontage checks `tools\OpenMontage\music_library\` first. Copy the chosen track there. Its `pixabay_music` search tool needs no key but scrapes the site (see `music\_candidates.md`).
- Projects go in `tools\OpenMontage\projects\<name>\` (ignored by git).

Python for OpenMontage commands: `tools\OpenMontage\.venv\Scripts\python.exe`, run from `tools\OpenMontage\`.
