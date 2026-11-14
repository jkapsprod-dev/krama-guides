---
tags: [decisions]
---
# Decisions (newest first)

## 2026-11-14

- **3A: Jay's answers to the writing lanes' questions** (full list in [[STATUS]]):
  - **Hinglish lines:** recorded as written. Jay spot-checks the first finished videos in Wave 5 and flags lines to change.
  - **Automations:** the guides say plainly that **Reply-by date passed**, **Payment due in 3 days** and **Function time changed** email families by themselves once switched on. WhatsApp is always "you press send".
  - **Snap a bill fallback:** Jay isn't sure the OCR.Space key is set, so **Send this photo for reading** is only a Stuck? line, not a task.
  - **Fewer videos:** tiny tasks are merged. A video with 3 or fewer steps joins its neighbour in the same note when the login, the screen size and the flow allow it (at most 8 steps, 90 s). The written guide keeps one "How to" per task. The short-link couple video was dropped (it repeated Wedding ID). Result: 246 videos. Old to new IDs are in `guides\_video-list.md`.
  - **Four tasks added** with videos: seating **Near the front**, a guest choosing their RSVP page's language, **Print the schedule** on a function, the **Destination wedding** switch.
  - **Demo data:** the robot sets up anything the demo data lacks **off camera, before each video**, through the app. No seed change (this replaces the earlier yes to more lane 5 seed data). The made-up names the notes use (Mehta family, Meena Bua, Mama ji, Mausi Patel, Hotel Riverfront Residency, Meera Shah, Mahesh Parmar and others) count as demo data.
  - **App fixes** go to an app session, not 6B: the old brand "Krama Celebrations", four wording fixes, hiding what can't work yet, a lasting recap link, and two bugs (helpers can't open **Vendors**; no **Notifications** menu item for hosts and planners). All in `guides\_app-fixes.md`. The guides follow the app as it is until those land.
  - **The code is right** that viewers may react, report and add photos, and that the Money page is titled **Budget**.
- **3A: one word for one thing.** `guides\_glossary.md` is the word list for every note, caption and video, matching `app\design\COPY.md`. App labels always win, in bold.
- **3A: Planning team** (the panel on a wedding's **Members** page) is a feature of its own, in lane 5 (`planning-team`). The inventory now has 96 features.

- **Not in the guides for now** (owner, after 1A). If any of these changes, flip its row in `guides\_inventory.md` to live.
  - **Continue with Google:** Google sign-in is off.
  - **A vendor asking to join a wedding by Wedding ID:** there's no approval screen. Vendors are linked when the family approves their quote.
  - **The business enquiry form and its first reply:** the anti-spam keys aren't set, so both stay `planned`.
- **Claude does every step;** the owner only pastes prompts and approves permissions. Setup, installs, starting and stopping the app, voice, music and editing are all in the prompts.
- **Video tools:** Playwright records the real app; **HyperFrames** (same version and brand as the launch film in `app\promo\launch-60s`) gives each video the Krama look, makes the section intros and the "Welcome to Krama" tour; **OpenMontage** makes the voice and music, and later other-language versions.
- **Finished videos come with an AI voice** so nothing waits on the owner. The owner can swap in their own voice for any video later.
- **One track, straight to final.** The redesign went live on 9 November, so guides and videos are made from the live app on `main`.
- **Labels come from `messages\en.json`**, in bold. Words follow `design\COPY.md`.
- **Admin console guides are written only** (no videos) and never published.
- **Voiceover language for the first videos: Hinglish** (owner, 1A). Hindi and English mixed, written in Roman letters, the way families talk. Button and screen names stay exactly in English as the app shows them ("**Add guest** pe tap karo"). Written guides, captions and everything else stay in English.
- **Voice:** a **custom voice**, to be confirmed by the owner later. 1C made three free Piper samples in Hinglish (`voiceover\samples\`) so the voice pipeline is tested and there is a free fallback; none is picked yet.
- **Music:** **"Indian Flute - Indian Flute Music" by JonasBlakewood** (Pixabay ID 580577, 2:26), `music\1-indian-flute.mp3`, one track for every video (owner, 1C). Pixabay Content License, free for commercial use, no credit needed; licence notes in `music\_candidates.md`. Also copied to `tools\OpenMontage\music_library\`.

## 2026-11-07 / 09

- **Guides and videos live in their own folder,** `C:\Users\jayka\code\krama-guides`, local only (not on GitHub). Sessions read the app from `app\` and never change it. Sessions run from the Claude desktop app's Code tab.
- **Only made-up demo data** appears in guides and videos (Sharma–Patel wedding, Utsav Planners, Rangoli Decor).
- **Reading level:** grade 8 or lower for every guide.
