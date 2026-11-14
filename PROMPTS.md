---
tags: [plan, prompts, guides]
status: active 2026-11-14
aliases: [guides prompts, video guide prompts, guides runbook]
---
# Krama guides + videos: every prompt, in order · [[STATUS]] · [[DECISIONS]]

**You only paste prompts.** Claude does everything else: setting up, installing tools, starting and stopping the app, writing, recording, voice, music and editing. When Claude asks for permission (to install something or run a command), click **Allow**.

## What you get

- **A simple written guide for every section of Krama**, that a 13-year-old can follow, with screenshots.
- **A finished video for every task** (30 to 90 seconds), in phone and desktop sizes, with Krama's look, voice, music and captions.
- **A short animated intro for each section**, and a **"Welcome to Krama" tour video** (about 90 seconds).
- **A voiceover script** with exact timings, if you ever want to replace the AI voice with your own.

## The three tools Claude uses

| Tool | What it does here |
|---|---|
| **Playwright** (already in your app) | The robot. It clicks through the real app with made-up data and records the screen, so every click is exactly right. |
| **HyperFrames** (used for your 60-second launch film) | Makes each video look like Krama: intro title, highlights on what to tap, captions and end card, in the same fonts and colours as the launch film. Also makes the section intros and the tour video. |
| **OpenMontage** (used for your ad film) | Gives each video a voice (free AI voice on your computer, or ElevenLabs if you add a key), finds background music, and later makes other-language versions. |

## The plan

```
Wave 1   1A Folder + feature list ║ 1B Recording helpers in the app ║ 1C Install the video tools + pick a voice
Wave 2   2A ║ 2B ║ 2C ║ 2D ║ 2E      Write the guides (one lane each)
Wave 3   3A Tie the guides together ║ 3B The recording robot + a test recording
Wave 4   4A The Krama video kit + your first finished video
Wave 5   5A ║ 5B ║ 5C ║ 5D ║ 5E      Check every guide on the real app and make its videos
Wave 6   6B Fix the app (only if needed) → 6A Final check, section intros, tour video
```
`║` = side by side. Start a wave when the one before it is finished (its **Done when** is true).

---

## How to start a session (the same every time)

1. Claude desktop app → **Code** tab → **+ New**.
2. Choose the folder in the row under the prompt box:
   - 🟢 **Guides session** (almost all of them): `C:\Users\jayka\code\krama-guides`, **Worktree off**.
   - 🔵 **App session** (only 1B and 6B): `C:\Users\jayka\code\mandapos`, **Worktree on**.
3. Pick the **model** named in the step (model picker, or Ctrl+Shift+I). Don't switch it mid-session.
4. Paste the prompt. Answer if Claude asks you something; click **Allow** when it asks for permission.

To watch several at once: right-click a session in the sidebar → **Open in** → **Split view**.

**Before you start**, decide two things (you'll type them into 1A and 1C):
- **Voiceover language** for the first videos (e.g. Hinglish, or simple English).
- **Voice:** a free AI voice that runs on your computer (default), or ElevenLabs (nicer, paid, needs an API key).

---

## Wave 1 · three sessions side by side

### 1A · Folder + feature list · 🟢 Opus · *fill in your language*

**Done when:** it says it committed `guides\_inventory.md`.

```
Read CLAUDE.md, PROMPTS.md (all of it), STATUS.md and DECISIONS.md in this folder.

First, set up the folder:
1. If app\ doesn't exist, clone the live app into it: git clone https://github.com/jkapsprod-dev/krama-celeb app (branch main). If it exists, run git -C app pull.
2. If this folder's git has no commits yet, commit everything ("Set up krama-guides"). If git asks who I am, set user.name "Jay Kapasi" and user.email "jaykapasii@gmail.com" globally.

Then make the feature list. In app\ (read only), read design\DESIGN.md, design\FLOWS.md, design\NAVIGATION.md, design\COPY.md, docs\memory\status.md, docs\memory\decisions.md, docs\plans\roadmap.md and docs\plans\website-help-articles.md. Show me a short plan, then go ahead.
3. Go through the live code in app\ (routes under app\app\, navigation, sign-up and accounts, onboarding, Looks and settings, wedding pages, guest pages, business portal, admin console). List every feature a person can use.
4. For each feature: who uses it (couple/family, helper, guest, planner, vendor, admin), what people do with it as short "How to…" tasks, whether it's live or switched off / off sale (follow docs\memory\status.md), and its main code files.
5. Use the names people see on screen (app\messages\en.json and design\NAVIGATION.md), never code names.
6. Put every feature into one of the five lanes in Appendix B (move one only if it clearly fits better; keep the lanes roughly equal). Note which features the 17 help guides in website-help-articles.md already cover.
7. Write guides\_inventory.md (table: Feature, Who, Tasks, Live?, Lane, Help article, Code files) and a first guides\README.md.
8. Run node tools\reading-level.mjs guides once to check it works.

Voiceover language for the videos: [MY ANSWER]. Put it in DECISIONS.md in place of the "to be decided" line.

Don't change anything in app\. Commit only guides\, STATUS.md and DECISIONS.md ("1A: feature list"; 1C works in this folder at the same time) and add a line to STATUS.md.
```

### 1B · Recording helpers in the app · 🔵 Opus

**Done when:** its PR is merged and it ran `/wrap-up`.

First message: `Copy .env.local from C:\Users\jayka\code\mandapos into this folder and run pnpm install.` Then:

```
/start-task guide-recording-support
Read C:\Users\jayka\code\krama-guides\PROMPTS.md Appendix E (read only; don't change anything in krama-guides). Read docs/memory/status.md, docs/memory/gotchas.md, playwright.config.ts, the tests/e2e fixtures and components/security/protected-screen.tsx. Show me a short plan first.

Add what the guide-video robot needs from the app. Nothing a real user sees changes.
1. Demo data: pnpm seed:guides --lane N (N = 1 to 5) creates the demo wedding, businesses and guests in Appendix E, with made-up people only. One copy per lane, so five recordings can run side by side; running it again resets that lane. It must refuse to run against krama-prod. Tell me in the plan which database it uses and anything I must switch on first (do it yourself where you can).
2. Demo logins for each lane: couple (host), family helper, planner, vendor, plus a guest link. Test values only.
3. Recording mode: screen protection and the watermark turn off only when GUIDE_RECORDING=1 AND the app is not production. Add a test proving production ignores it.
4. Write docs/guides-recording.md so another Claude session can follow it without me: how to install, start and stop the app for recording on this Windows PC from a separate copy of the repo (command, port, URL, which database, which env values it needs and where they come from), how to seed a lane, and the demo logins.
Don't add data-testids now; the guide lanes will list any they need.
pnpm check and e2e green, open a PR, merge when green, then /wrap-up.
```

### 1C · Install the video tools + pick a voice · 🟢 Opus · *fill in your voice choice*

**Done when:** you've picked a voice from the samples and it wrote `tools\SETUP.md`.

```
Read CLAUDE.md and PROMPTS.md (the tools table, Appendix D and F) in this folder. Show me a short plan, then go ahead. Ask me before each install; I'll allow it.

Set up the video tools on this Windows PC:
1. Check and, if missing, install: Node 22 or newer, Python 3.10 or newer, FFmpeg, Git (use winget where you can).
2. OpenMontage: clone https://github.com/calesthio/OpenMontage into tools\OpenMontage and run its setup the Windows way its README describes (Python venv, requirements, its npm install, Piper for the free offline voice, .env from .env.example). Read its CLAUDE.md, AGENT_GUIDE.md and pipeline_defs so you know the Screen Demo and Localization & Dub pipelines and its voice and music tools.
3. HyperFrames: install its skills for this folder (npx hyperframes@0.8.146 skills update, or npx skills add heygen-com/hyperframes) and make sure npx hyperframes@0.8.146 can render (it downloads its browser on first run). Use the same version as app\promo\launch-60s.
4. Voice: my choice is [MY ANSWER: "free AI voice" or "ElevenLabs"]. Make three 10-second samples of this guide line in the voiceover language from DECISIONS.md, each with a different suitable voice: "Open Guests. Tap Add guest. Type the name, and tap Save. Done." Use OpenMontage's voice tools (Piper for free voices; ElevenLabs only if I chose it and gave a key in tools\OpenMontage\.env). Put them in voiceover\samples\ and tell me the file paths so I can listen. Write my pick in DECISIONS.md.
5. Music: find 3 calm, royalty-free background tracks that suit a wedding app (soft, warm, light Indian feel), using OpenMontage's music tools or a clearly royalty-free source. Save them in music\ with their licence notes, and tell me the paths so I can listen. Write my pick in DECISIONS.md.
6. Write tools\SETUP.md: what's installed, versions, where, and the exact commands to make a voice line and render a HyperFrames video.
Don't touch app\ or guides\, and don't commit (1A is committing in this folder at the same time; 3A commits your files).
```

---

## Wave 2 · five sessions side by side · 🟢 Sonnet

**Done when (each):** it wrote its `_lane-status.md`. Lanes don't commit; 3A does.

### 2A · Write guides, lane 1: Getting started & everyday

```
Run git -C app pull first. Read CLAUDE.md, PROMPTS.md (Appendix B, C and D), DECISIONS.md, guides\_template.md, guides\_inventory.md and guides\README.md here, and app\design\COPY.md and app\design\NAVIGATION.md (read only). Then go ahead without waiting for me, unless something is unclear.

Write the guides for every feature in Lane 1 of the inventory: one note per feature in guides\1-start\, following guides\_template.md exactly. Each note has the written guide and one video script per task.
- The app is live, so write final steps: read the real code in app\ for each feature, and copy button, tab and label names exactly from app\messages\en.json, in bold.
- Reuse text from app\docs\plans\website-help-articles.md where the inventory says it covers the feature.
- Write the "Voice says" lines in the voiceover language from DECISIONS.md; everything else in English.
- Features that are switched off or off sale get status: planned and no video script.
- Write guides\1-start\_section-intro.md: the section's name and one short line on what it's for (for a 6-second animated intro), in English and in the voiceover language.
- Follow Appendix C (writing) and Appendix D (videos).
- Run node tools\reading-level.mjs guides\1-start until every note is grade 8 or lower.
- Write only in guides\1-start\. Don't commit. At the end, write guides\1-start\_lane-status.md: notes written, features you think the inventory missed, and questions for me.
```

### 2B · Write guides, lane 2: Guests & invitations

```
Run git -C app pull first. Read CLAUDE.md, PROMPTS.md (Appendix B, C and D), DECISIONS.md, guides\_template.md, guides\_inventory.md and guides\README.md here, and app\design\COPY.md and app\design\NAVIGATION.md (read only). Then go ahead without waiting for me, unless something is unclear.

Write the guides for every feature in Lane 2 of the inventory: one note per feature in guides\2-guests\, following guides\_template.md exactly. Each note has the written guide and one video script per task.
- The app is live, so write final steps: read the real code in app\ for each feature, and copy button, tab and label names exactly from app\messages\en.json, in bold.
- Reuse text from app\docs\plans\website-help-articles.md where the inventory says it covers the feature.
- Guest-side guides (what a guest sees from their link) speak to the guest, not the couple. Keep them extra short, because couples will forward them.
- Write the "Voice says" lines in the voiceover language from DECISIONS.md; everything else in English.
- Features that are switched off or off sale get status: planned and no video script.
- Write guides\2-guests\_section-intro.md: the section's name and one short line on what it's for (for a 6-second animated intro), in English and in the voiceover language.
- Follow Appendix C (writing) and Appendix D (videos).
- Run node tools\reading-level.mjs guides\2-guests until every note is grade 8 or lower.
- Write only in guides\2-guests\. Don't commit. At the end, write guides\2-guests\_lane-status.md: notes written, features you think the inventory missed, and questions for me.
```

### 2C · Write guides, lane 3: Money & family extras

```
Run git -C app pull first. Read CLAUDE.md, PROMPTS.md (Appendix B, C and D), DECISIONS.md, guides\_template.md, guides\_inventory.md and guides\README.md here, and app\design\COPY.md and app\design\NAVIGATION.md (read only). Then go ahead without waiting for me, unless something is unclear.

Write the guides for every feature in Lane 3 of the inventory: one note per feature in guides\3-money-family\, following guides\_template.md exactly. Each note has the written guide and one video script per task.
- The app is live, so write final steps: read the real code in app\ for each feature, and copy button, tab and label names exactly from app\messages\en.json, in bold.
- Reuse text from app\docs\plans\website-help-articles.md where the inventory says it covers the feature.
- Say clearly who can see money and shagun amounts (follow the roles in the code and app\docs\memory\decisions.md). Never say Krama holds or moves money.
- Write the "Voice says" lines in the voiceover language from DECISIONS.md; everything else in English.
- Features that are switched off or off sale get status: planned and no video script.
- Write guides\3-money-family\_section-intro.md: the section's name and one short line on what it's for (for a 6-second animated intro), in English and in the voiceover language.
- Follow Appendix C (writing) and Appendix D (videos).
- Run node tools\reading-level.mjs guides\3-money-family until every note is grade 8 or lower.
- Write only in guides\3-money-family\. Don't commit. At the end, write guides\3-money-family\_lane-status.md: notes written, features you think the inventory missed, and questions for me.
```

### 2D · Write guides, lane 4: Event day, AI & voice

```
Run git -C app pull first. Read CLAUDE.md, PROMPTS.md (Appendix B, C and D), DECISIONS.md, guides\_template.md, guides\_inventory.md and guides\README.md here, and app\design\COPY.md and app\design\NAVIGATION.md (read only). Then go ahead without waiting for me, unless something is unclear.

Write the guides for every feature in Lane 4 of the inventory: one note per feature in guides\4-event-day-ai\, following guides\_template.md exactly. Each note has the written guide and one video script per task.
- The app is live, so write final steps: read the real code in app\ for each feature, and copy button, tab and label names exactly from app\messages\en.json, in bold.
- Reuse text from app\docs\plans\website-help-articles.md where the inventory says it covers the feature.
- Paid add-ons: one line saying it's an add-on and how to turn it on. No prices, because prices can change.
- Write the "Voice says" lines in the voiceover language from DECISIONS.md; everything else in English.
- Features that are switched off or off sale get status: planned and no video script.
- Write guides\4-event-day-ai\_section-intro.md: the section's name and one short line on what it's for (for a 6-second animated intro), in English and in the voiceover language.
- Follow Appendix C (writing) and Appendix D (videos).
- Run node tools\reading-level.mjs guides\4-event-day-ai until every note is grade 8 or lower.
- Write only in guides\4-event-day-ai\. Don't commit. At the end, write guides\4-event-day-ai\_lane-status.md: notes written, features you think the inventory missed, and questions for me.
```

### 2E · Write guides, lane 5: Business portal & admin

```
Run git -C app pull first. Read CLAUDE.md, PROMPTS.md (Appendix B, C and D), DECISIONS.md, guides\_template.md, guides\_inventory.md and guides\README.md here, and app\design\COPY.md and app\design\NAVIGATION.md (read only). Then go ahead without waiting for me, unless something is unclear.

Write the guides for every feature in Lane 5 of the inventory: one note per feature in guides\5-business\, following guides\_template.md exactly. Each note has the written guide and one video script per task.
- The app is live, so write final steps: read the real code in app\ for each feature, and copy button, tab and label names exactly from app\messages\en.json, in bold.
- Reuse text from app\docs\plans\website-help-articles.md where the inventory says it covers the feature.
- Write for a busy planner or vendor: start with the time it saves. Business videos are desktop-first.
- Admin console guides go in guides\_internal\ with internal: true. Written guides only, no video scripts, never published.
- No marketplace or vendor-discovery wording anywhere.
- Write the "Voice says" lines in the voiceover language from DECISIONS.md; everything else in English.
- Features that are switched off or off sale get status: planned and no video script.
- Write guides\5-business\_section-intro.md: the section's name and one short line on what it's for (for a 6-second animated intro), in English and in the voiceover language.
- Follow Appendix C (writing) and Appendix D (videos).
- Run node tools\reading-level.mjs guides\5-business (and guides\_internal) until every note is grade 8 or lower.
- Write only in guides\5-business\ and guides\_internal\. Don't commit. At the end, write guides\5-business\_lane-status.md: notes written, features you think the inventory missed, and questions for me.
```

---

## Wave 3 · two sessions side by side · 🟢 Opus

### 3A · Tie the guides together

**Done when:** it committed and put any questions for you at the top of `STATUS.md` (answer them in the same session).

```
All five writing lanes are done. Read CLAUDE.md, PROMPTS.md, DECISIONS.md, guides\_inventory.md, every _lane-status.md and every note in guides\. Show me a short plan, then go ahead.

1. Every feature in the inventory has a note. Write any that are missing, including features the lanes say the inventory missed (add those to the inventory too).
2. One word for one thing everywhere. Write guides\_glossary.md (matching app\design\COPY.md, e.g. "function", never "event") and fix the notes to match.
3. Run node tools\reading-level.mjs guides and fix anything above grade 8.
4. Add "See also" links between related notes. Turn guides\README.md into the full index: by person (couple/family, guest, planner, vendor) and by task ("How to…").
5. Write guides\_video-list.md: every video script with its ID, lane, phone or desktop first, estimated length and the demo login it needs. This is the making list for Wave 5.
6. Put all the lanes' questions for me in one list at the top of STATUS.md, then ask me them here and write my answers into the notes.
Only touch guides\, tools\SETUP.md, voiceover\samples\, music\, STATUS.md and DECISIONS.md (3B is building recorder\ at the same time). Don't change anything in app\. Commit those paths ("Guides written") and add a line to STATUS.md.
```

### 3B · The recording robot + a test recording

**Done when:** it shows you a raw test recording and committed `recorder\`.

```
Read CLAUDE.md, PROMPTS.md (Appendix D and E) and STATUS.md here. Run git -C app pull, then read (read only) app\docs\guides-recording.md, app\playwright.config.ts and the app\tests\e2e fixtures. Show me a short plan, then go ahead. Ask me before installing anything.

Build the recording robot in recorder\ (its own package.json, Playwright).
1. It runs the app by itself: npm run app:start sets up and starts the app from app\ in recording mode exactly as guides-recording.md says (the only files you may add in app\ are the ones git ignores there, such as node_modules, .next and .env.local), waits until it answers, and keeps running in the background with a pid file; npm run app:stop stops it. Every record command starts the app if it isn't running, so several lanes can share one app.
2. Before each video it resets that lane's demo data with the seed command.
3. Two sizes: desktop 1920×1080 and phone 390×844, sharp (deviceScaleFactor 2). A visible cursor glides to each target with a small click ripple. No titles or effects here; the video kit adds those later.
4. A small helper, step({ do, hold }), so each video's spec reads like the script table in its guide note. If a voice file exists for a step (voiceover\ai\<ID>\<step>.wav), hold that step at least as long as the line plus half a second, so the voice always fits.
5. For each video it saves videos\raw\<lane folder>\<ID>-phone.mp4 and <ID>-desktop.mp4, plus <ID>.json with where each step starts and ends and where the tapped element was on screen (for highlights and zooms later). Step screenshots go to guides\img\<note name>\.
6. Commands: record one video by ID, one lane, or everything (e.g. npm run record -- --id V-2-guests-1).
7. Test it on the first "add a guest" video in guides\2-guests\. Tell me the file paths so I can watch the raw recording.
8. Write recorder\README.md in plain steps.
Only touch recorder\, videos\raw\ and guides\img\ (3A is editing the guide notes at the same time). Stop the app when you're done. Commit those paths ("Recording robot") and add a line to STATUS.md.
```

---

## Wave 4 · one session · 🟢 Opus

### 4A · The Krama video kit + your first finished video

**Done when:** you've watched the first finished video (phone and desktop), said you like it, and it committed `kit\`.

```
Read CLAUDE.md, PROMPTS.md (the tools table, Appendix D, E and F), DECISIONS.md, tools\SETUP.md and recorder\README.md here. Read (read only) app\promo\launch-60s (README.md, CLAUDE.md, index.html, shared\krama.css, shared\kit.js, assets\fonts) and app\design\COPY.md. Use the HyperFrames skills (start at /hyperframes; /motion-graphics, /media-use) and OpenMontage's voice and music tools. Show me a short plan, then go ahead.

Build the Krama guide-video kit in kit\, so one command turns a guide note into a finished video.
1. Brand: same look as the launch film (fonts, colours, grain, gold thread), copied into kit\ (don't link into app\). Calm and clear, not flashy (Appendix F).
2. A HyperFrames template for a guide video: a 3-second intro title (feature name + "How to …"), the raw recording with a soft highlight ring and a gentle zoom on each tapped element (from the recorder's <ID>.json), short captions synced to each step, and a 3-second end card ("Krama Events" and krama.events/help). Phone 1080×1920 and desktop 1920×1080 from the same template.
3. Voice: make each step's "Voice says" line with OpenMontage's voice tool and the voice in DECISIONS.md, saved as voiceover\ai\<ID>\<step>.wav, placed at the start of its step. Also write voiceover\<ID>.md (each line with its start and end time) and a .srt captions file.
4. Music: the track in DECISIONS.md under the whole video, quiet, dipping under the voice, fading out on the end card.
5. One command does everything for a video, in this order: make the voice lines, record with the robot (so holds fit the voice), build the HyperFrames composition, check it (npx hyperframes@0.8.146 check), render both sizes to videos\final\<lane folder>\<ID>-phone.mp4 and <ID>-desktop.mp4 with the .srt next to them. Commands for one video, one lane, or everything, e.g. npm run make -- --id V-2-guests-1. Keep files small (about 3 Mbps, like the launch film).
6. A section intro template (6 seconds, /motion-graphics style): the section name and its one line from guides\<lane folder>\_section-intro.md, with voice and music. Command: npm run intro -- --lane 2.
7. Make the first "add a guest" video in guides\2-guests\ end to end, and the lane 2 section intro. Tell me the file paths. If I ask for changes (speed, zoom, captions, music level, voice), make them and re-render.
8. Write kit\README.md in plain steps, including how to swap in my own voice later (voiceover\my-voice\<ID>.wav replaces the AI voice for that video).
Only touch kit\, voiceover\, videos\final\ and music\. Commit those paths, except video and audio files ("Video kit"), and add a line to STATUS.md.
```

---

## Wave 5 · five sessions side by side · 🟢 Sonnet

**Done when (each):** it updated its `_lane-status.md`. Lanes don't commit; 6A does.
If your computer gets very slow, run 2 or 3 lanes at a time instead of 5. The result is the same.

Paste the same prompt five times. In each, change only the **lane number** and **folder** (both appear twice in the prompt):

| Session | Lane | Folder |
|---|---|---|
| 5A | 1 | `1-start` |
| 5B | 2 | `2-guests` |
| 5C | 3 | `3-money-family` |
| 5D | 4 | `4-event-day-ai` |
| 5E | 5 | `5-business` (also checks the `_internal` notes, without videos) |

```
You are lane 1, folder 1-start. Read CLAUDE.md, PROMPTS.md (Appendix C, D, E and F), DECISIONS.md, guides\_glossary.md, guides\_video-list.md, recorder\README.md and kit\README.md. Then go ahead without waiting for me, unless something is unclear.

For every note in guides\1-start\ (skip status: planned and removed):
1. Open the feature in the running app (the robot starts it) with lane 1's demo login and follow the guide's steps. Fix any step, label or screenshot that doesn't match what you see.
2. Write each video's spec in recorder\specs\1-start\ using step(), with role and label selectors.
3. Make each video with the kit's one command (voice, recording, edit, both sizes). Watch a few frames of each result (npx hyperframes@0.8.146 snapshot) and fix anything that looks wrong: a highlight on the wrong place, cut-off captions, voice running past its step.
4. Put the real timings into the note's script table. Set status: final, checked: <today's date>, video: made.
5. Run node tools\reading-level.mjs guides\1-start; every note stays grade 8 or lower.
If a step can't be recorded because the element has no stable label or role, don't touch the app: add it to guides\1-start\_needs-app-changes.md (screen, element, why) and move on.
Make lane 1's section intro (npm run intro -- --lane 1).
Only touch guides\1-start\, guides\img\ for your notes, recorder\specs\1-start\, videos\raw\1-start\, videos\final\1-start\ and your videos' files in voiceover\. Don't commit. Leave the app running (other lanes may be using it). At the end, update guides\1-start\_lane-status.md.
```

---

## Wave 6 · finish

### 6B · Fix the app · 🔵 Sonnet · *only if a lane wrote `_needs-app-changes.md`*

**Done when:** its PR is merged.

First message: `Copy .env.local from C:\Users\jayka\code\mandapos into this folder and run pnpm install.` Then:
```
/start-task guide-recording-selectors
Read every guides\*\_needs-app-changes.md in C:\Users\jayka\code\krama-guides (read only). Add the stable selectors they ask for (data-testid, or a proper label or role), with no visual change. pnpm check and e2e green, open a PR, merge when green, then /wrap-up.
```

### 6A · Final check, tour video and handover · 🟢 Opus

**Done when:** it committed and gave you the list of finished videos.

```
All lanes are done. Read CLAUDE.md, PROMPTS.md, DECISIONS.md, guides\README.md, guides\_glossary.md, guides\_video-list.md, every _lane-status.md, recorder\README.md and kit\README.md. Use the HyperFrames skills. Show me a short plan, then go ahead.

1. If any _needs-app-changes.md exists: run git -C app pull, restart the app (npm run app:stop then app:start in recorder\), make those videos now, mark their notes final, and delete the handled files.
2. Every live feature has a final note and finished videos in both sizes, and every lane has its section intro. List anything missing at the top of STATUS.md.
3. Glossary words and real button names match everywhere. Run node tools\reading-level.mjs guides; everything is grade 8 or lower.
4. Make "Welcome to Krama" (about 90 seconds, phone and desktop): the five section intros joined with the best few seconds from that section's videos, one voice line per section, music, Krama end card. Save to videos\final\welcome-to-krama-phone.mp4 and -desktop.mp4.
5. Update guides\_video-list.md with each video's file names, real length and status.
6. Write voiceover\_voiceover-pack.md: every video's lines, grouped by lane, with start and end times, in case I want to record my own voice later.
7. Stop the app (npm run app:stop in recorder\).
8. Copy the finished videos, the guides and their images into a folder called handover\ in this folder, organised by section, ready to upload anywhere.
9. Add a line to DECISIONS.md: guides and videos done.
Don't change anything in app\. Commit everything except video and audio files ("Guides and videos: final") and add a line to STATUS.md. Then tell me where the handover folder is and how many guides and videos there are.
```

**Then:** copy `krama-guides` to Google Drive (or ask Claude in any session to tell you which folder to copy).

---

## Later · paste whenever you like (🟢 Sonnet unless it says)

**Use my own voice for some videos**
Save your recordings as `voiceover\my-voice\<video ID>.wav` (one per video, read from `voiceover\_voiceover-pack.md`). Then:
```
I've put my own voice recordings in voiceover\my-voice\. Read kit\README.md. For each recording, line it up with its video's steps, use it instead of the AI voice, and re-render that video in both sizes. Tell me which videos changed.
```

**Switch to a nicer AI voice (ElevenLabs)**
```
I want ElevenLabs for the voice. Read tools\SETUP.md and kit\README.md. Help me add my API key to tools\OpenMontage\.env (tell me exactly where to paste it), make three sample voices for me to pick from, then re-make the voice for every video and re-render them all. Tell me roughly what it will cost before you start.
```

**A screen changed after launch**
```
A screen changed: [WHICH FEATURE, or "check everything changed since <date>"]. Run git -C app pull. Read CLAUDE.md, PROMPTS.md (Appendix C and D), guides\_glossary.md, recorder\README.md and kit\README.md. Find the guide notes and videos this affects, update the steps and screenshots, re-make those videos, and update handover\. Commit and add a line to STATUS.md.
```

**Other languages** · 🟢 Opus
```
Make the guides and videos in [LANGUAGE]. Read tools\SETUP.md and kit\README.md, and OpenMontage's Localization & Dub pipeline. Translate the guides and voice lines (keep button names exactly as the app shows them in that language, from app\messages\), switch the robot's app language, re-record, and render with a voice for that language. Put everything under a [LANGUAGE] folder. List the lines a native speaker should check before we publish.
```

**Put the guides on the website**
In a chat in the **Wedding CRM** project on claude.ai (it can edit the website as drafts):
> Read the final guides in my krama-guides handover folder. Turn them into Help pages on the Krama Events website as drafts, one page per feature, with its phone video, without video scripts and without admin guides. Run the publish checklist on each and show me the list; I'll publish.

---

# APPENDIX B · The five lanes (1A may move a feature if it clearly fits better)

| Lane | Folder | Covers |
|---|---|---|
| 1 | `1-start` | Sign-up, password and sign-in, accepting an invite, onboarding, creating or joining a wedding, wedding ID, Home, functions, tasks, run sheets, Looks and themes, settings (language, light/dark, bottom bar), privacy, "remove my details", delete my account |
| 2 | `2-guests` | Guests and families, importing guests, RSVP, messages (click-to-send and email), the guest page (guest side too), stays and travel, ticket upload, seating |
| 3 | `3-money-family` | Money and budget, snap-a-bill, gold price, shagun register, family feed, photo gallery, weather and festival alerts |
| 4 | `4-event-day-ai` | Check-in and food on the day, AI assistant, voice, add-ons, referral codes |
| 5 | `5-business` | Planner and vendor dashboards, linking a wedding by ID, leads, enquiries, proposals, invoicing, team, calendar, planner codes; admin console in `_internal` |

# APPENDIX C · Writing rules (every guide)

- Write for a 13-year-old, or a busy aunty on her phone. **Grade 8 or lower**, checked with `tools\reading-level.mjs`.
- Short sentences. One action per step. **3 to 6 steps** per task; more than 6 means two tasks.
- Every task starts "How to …" in plain words ("How to add a guest", not "Guest creation").
- Button, tab and label names exactly as the app shows them (from `messages\en.json`), in **bold**.
- Say "you". Use the app's own words from `design\COPY.md`: "functions" (never "events"), "guests", "families", "your wedding" (never "workspace").
- Every "Why you'd use it" is a real Indian-wedding moment (Mausi asking the haldi time, a cousin's train ticket, who gave which envelope).
- Every feature gets one **Tip** and one **Stuck?** line.
- No exclamation marks, no "Oops", no em dashes or en dashes (the guides will go on the website).
- Never promise anything that isn't live. Switched-off or off-sale features stay `planned` and are never published.
- Made-up names and numbers only, never real users.
- No prices, no marketplace or vendor-discovery words, never say Krama holds or moves money.

# APPENDIX D · Video rules

- **One task per video, 30 to 90 seconds**, at most 8 steps.
- Order: 3-second intro title → a 3 to 5 second problem line → the steps → the result → 3-second end card.
- Each step is held at least 2 to 3 seconds, and always long enough for its voice line.
- Voice lines are short and calm: one sentence per step, in the voiceover language.
- Captions at most 8 words, always on (many people watch on mute).
- Couple, family and guest videos are **phone-first**; business videos are **desktop-first**. Make both sizes anyway.
- Admin console guides get no videos.
- Same demo wedding in every video, so they feel like one story.
- Video ID: `V-<lane>-<feature>-<n>`, the same in the note, the spec and every file name.

# APPENDIX E · Demo data

- **Demo wedding:** *Sharma–Patel wedding*, Ahmedabad. Functions: mehndi, haldi, sangeet, wedding and reception, about 3 months away. About 120 made-up guests across both families: some said yes, some waiting, a few can't come. Some tasks done and some overdue, a budget partly spent, a few shagun entries, 2 or 3 family feed posts, and stays at 2 made-up hotels.
- **Demo planner:** *Utsav Planners* (made up), linked to the demo wedding by its wedding ID, with 3 leads and 1 proposal.
- **Demo vendor:** *Rangoli Decor* (made up), linked to the demo wedding.
- **Demo guest:** one made-up guest with a guest link.
- **One copy per lane** (`--lane 1` to `--lane 5`), so recordings side by side never clash.
- **Look:** the standard look in light mode, unless the video is about changing the look.

# APPENDIX F · Look and sound of the videos

- **Brand:** the launch film's fonts, colours and gold thread (`app\promo\launch-60s`), so the guides feel like the same company.
- **Motion:** calm. Cursor about 600 to 800 ms per move, a small click ripple, a soft highlight ring, a gentle zoom only on small targets. Section intros may move a little more, but never flashy.
- **Voice:** warm and unhurried, like a helpful cousin, in the voiceover language. The same voice in every video.
- **Music:** one soft, royalty-free track for all videos, quiet under the voice, fading out on the end card.
- **Captions:** bottom of the frame, clear of the app's bottom bar on phone videos.
- **End card:** "Krama Events" and krama.events/help. No prices.
- **File size:** about 3 Mbps, so videos stay light for WhatsApp and the website.
