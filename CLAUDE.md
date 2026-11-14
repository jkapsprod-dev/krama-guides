# krama-guides · rules for every Claude Code session in this folder

This folder holds the **user guides and guide videos** for Krama Events (the wedding app). The app is live, so everything here is **final**. The owner only pastes prompts from `PROMPTS.md`; you do all the work, including setup, starting and stopping the app, and installs (ask before each install).

The app's code and its Obsidian vault (`docs\`, `design\`) are in **`app\`**: a clone of the krama-celeb repo (branch `main`). The owner's real build folder is `C:\Users\jayka\code\mandapos`; never use it from here.

## Hard rules

- **`app\` is read-only.** Never edit or delete its tracked files, and never commit or switch branches in it. You may run `git -C app pull` when a prompt says so. The recording robot may add files that git ignores there (node_modules, .next, .env.local) so the app can run for recording.
- **Never touch `C:\Users\jayka\code\mandapos`** from a guides session. App changes happen only in app sessions (PROMPTS.md 1B and 6B).
- **Only made-up data.** Use the demo data in PROMPTS.md Appendix E. Never real users' names, numbers or photos.
- **Never touch the production database** (krama-prod). Recording always uses the database that `app\docs\guides-recording.md` names.
- **Ask before installing anything** (winget, pip, npm packages, Playwright's browser, ffmpeg, HyperFrames' browser).
- **Never put API keys in a committed file.** Keys live only in `tools\OpenMontage\.env` (ignored by git).
- **Lanes** (2A–2E, 5A–5E): write only in your own lane's folders. Don't edit shared files and don't commit; the next single session does. Put your summary in `guides\<lane folder>\_lane-status.md`. Leave the app running when you finish (other lanes may use it).
- **Single sessions** (1A, 1C, 3A, 3B, 4A, 6A): commit only the paths your prompt names, never video or audio files, and add one dated line to the top of the log in `STATUS.md`.

## The three video tools

| Tool | Where | Used for |
|---|---|---|
| Playwright | `recorder\` | Clicking through the app and recording raw, silent footage |
| HyperFrames (`npx hyperframes@0.8.146`, skills start at `/hyperframes`) | `kit\` | Krama look: intro title, highlights, zooms, captions, end card, section intros, tour video |
| OpenMontage | `tools\OpenMontage\` | AI voice (Piper free, or ElevenLabs), background music, other languages (Localization & Dub) |

`tools\SETUP.md` has the versions and commands. `recorder\README.md` and `kit\README.md` say how to make a video.

## Where things go

| Folder / file | What's in it |
|---|---|
| `PROMPTS.md` | Every prompt, plus Appendix B–F (lanes, writing, video rules, demo data, look and sound) |
| `START-HERE.md` | One-page checklist |
| `STATUS.md` | Where we are, questions for the owner, and a dated log (newest first) |
| `DECISIONS.md` | Decisions for the guides (language, voice, music), newest first |
| `guides\_template.md` | The template every guide note follows |
| `guides\_inventory.md`, `_glossary.md`, `_video-list.md` | Every feature; one word per thing; every video |
| `guides\1-start\` … `5-business\` | One note per feature (guide + video scripts), plus `_section-intro.md` |
| `guides\_internal\` | Admin console guides; never published, no videos |
| `guides\img\<note name>\` | Screenshots for that note |
| `recorder\` | The recording robot (also starts and stops the app) |
| `kit\` | The HyperFrames video kit (`npm run make`, `npm run intro`) |
| `videos\raw\<lane>\`, `videos\final\<lane>\` | Raw recordings; finished videos and captions (not in git) |
| `voiceover\` | Timed lines per video, AI voice files, `my-voice\`, the voiceover pack |
| `music\` | The chosen background track and its licence note |
| `handover\` | Finished guides, images and videos, ready to upload (made in 6A, not in git) |
| `tools\` | `reading-level.mjs`, `SETUP.md`, and the installed OpenMontage |

## Writing

- Follow PROMPTS.md **Appendix C** (writing), **D** (videos) and **F** (look and sound).
- Check reading level with `node tools\reading-level.mjs guides`. Every guide must be grade 8 or lower.
- Button, tab and label names exactly as the app shows them (from `app\messages\en.json`), in **bold**.
- Section names follow `app\design\NAVIGATION.md`; words and tone follow `app\design\COPY.md` ("functions", never "events"; no "Oops", no exclamation marks). No em dashes or en dashes in guide text.
- Use the ponytail skill if it's installed.
