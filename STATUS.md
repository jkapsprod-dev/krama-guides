---
tags: [status]
---
# Status

## Questions for Jay
*From the five writing lanes (2A to 2E), gathered by 3A on 14 Nov 2026. All answered by Jay in the 3A session; answers are under each one and in the notes and DECISIONS.md.*

**For Jay to decide**

1. **Hinglish voice lines.** Claude wrote every "Voice says" line, including words like "zevar", "tyohaar" and "plus button". Who checks them before Wave 5 records? (lanes 2, 3, 4)
   - **Jay:** Jay spot-checks the first finished videos in Wave 5 and flags lines to change. Record with the lines as written.
2. **Automations email by themselves.** Once switched on, **Reply-by date passed**, **Payment due in 3 days** and **Function time changed** send emails without anyone pressing send. WhatsApp is always click to send. May the guide say this plainly? (lane 2)
   - **Jay:** yes, say it plainly. The note says these three rules email by themselves, and WhatsApp is always you pressing send.
3. **Snap a bill fallback.** Is the OCR.Space key set on the live site? If not, the "send this photo for reading" task comes out. (lane 3)
   - **Jay:** not sure. It is no longer a task; one **Stuck?** line says the button may show if the phone can't read the bill.
4. **How many videos.** The notes have one video per task (282). Many short tasks were stretched to reach 30 seconds. Keep one per task, or merge tiny tasks? (lanes 2, 5)
   - **Jay:** merge tiny tasks. 3A folded short videos into their neighbour in the same note and dropped the short-link couple video (it repeats Wedding ID). Old to new IDs are in `guides\_video-list.md`.
5. **Extra tasks the lanes found.** Seating **Near the front**, the guest's own language on the RSVP page, **Print the schedule** on a function, the **Destination wedding** switch on Stays. Which get a task and a video? (lanes 1, 2, 4)
   - **Jay:** all four. Added to seating, guest-rsvp-page, functions and stays-and-rooms, with videos.
6. **Demo data.** The videos need more made-up data than Appendix E has: a planner with two weddings, a spare member and an expired invite, a support request, quotes, a driver link, a demo hotel, a CSV file, invoices, bookings, crew, documents, a staff member, a day-shifted copy for event-day videos, and more (each lane's `_lane-status.md` has the list). Add it to the seed in an app session, or let the robot set it up off camera? (all lanes)
   - **Jay:** the robot sets it up off camera before each video. No seed change. Each video's needs are in the "Set up off camera" column of `guides\_video-list.md`.
7. **App fixes.** Which go to an app session? (a) the old brand "Krama Celebrations" in Members invites, the wrap-up numbers card and the guest photo upload page; (b) wording: "workspace" in `Proposal.donePlanner`, "Krama pays it out" on Commission, the referral reward line, the business (+) title "Add to your wedding"; (c) hide what can't work yet: the **Alerts** widget, the **WhatsApp invites and reminders** add-on row, **Ask for a wedding** for vendors; (d) a lasting link to the function recap. (lanes 1, 3, 4, 5)
   - **Jay:** all of (a) to (d) go to an app session. Listed with code locations in `guides\_app-fixes.md`. The guides follow the app as it is today until those land.
8. **Code or docs?** In the code, viewers can react, report and add photos; helpers can't open **Vendors**; hosts and planners have no **Notifications** menu item; the Money page is titled **Budget**. The guides follow the code. Is the code right? (lane 3)
   - **Jay:** mixed. **Bugs** (to `guides\_app-fixes.md`): helpers can't open **Vendors**; hosts and planners have no **Notifications** menu item. **The code is right:** viewers may react, report and add photos; the Money page is titled **Budget**.

**Settled by 3A** (say if you disagree)

- **Folder:** sessions opened in the empty `C:\Users\jayka\code\Guides`. `krama-guides` is the right folder, and every lane wrote there. Start future 🟢 sessions in `krama-guides`.
- **Already answered by Jay during Wave 2:** one Tip and one **Stuck?** per task (2B); the em dash label in **Has money details — hide from helpers and viewers** stays exact (2C); yes to more lane 5 seed data (2E; now replaced by question 6: the robot sets data up off camera).
- **Fresh `example.test` accounts** are fine for sign-up, password, devices and delete videos (made up, never a demo login). Destructive videos stop before the last button.
- **Roles:** videos record as the host unless the helper, family, planner or vendor view is the point.
- **Left out of the guides:** the **Alerts** widget and **Today** start screen ("Coming soon"), **Download an invoice** on Plan & add-ons (nobody can buy yet), **Link to a wedding by its ID** on bookings (vendors can't join by ID).
- **Help articles on the website:** the fixes the lanes found (no **Skip** on set-up, 30/7/3 day reminders not 72 hours, imports are checked on the server, links stop the day after the last function) wait for the "Put the guides on the website" step. They are listed in `guides\_inventory.md`.
- **Drivers and crew** get no new "who" value; their notes speak to them in their own section.
- **"Vendors"** stays where it is the app's own label (the family's list in **Money**). No marketplace words anywhere.
- **Family feed:** the guide says to tap the "Share an update with the family…" box (**Write a post** is screen-reader only).
- **Invoice reminder video** ends on **Open in WhatsApp**; the robot never opens WhatsApp Web. The made-up GSTIN `24ABCDE1234F1Z6` is fine.
- **Planned notes** are never published, so their current wording is enough.
- **"Time it saves" line** stays on business notes (the 2E prompt asks for it).

## Steps

| Step | What | State |
|---|---|---|
| 1A | Folder + feature list | ☑ |
| 1B | Recording helpers in the app (mandapos PR) | ☐ |
| 1C | Video tools installed, voice and music picked | ☑ |
| 2A–2E | Write the guides, 5 lanes | ☑ |
| 3A | Glossary, index, video list | ☑ |
| 3B | Recording robot + test recording | ☑ |
| 4A | Video kit + first finished video | ☐ |
| 5A–5E | Check every guide and make its videos, 5 lanes | ☐ |
| 6B | Fix the app (only if needed) | ☐ |
| 6A | Final check, tour video, handover | ☐ |

## Log (newest first)

- 2026-11-14 · **4A: video kit built** (commit "Video kit"). `kit\` turns a guide note into a finished video with one command: `npm run make -- --id <ID>` (or `--lane N`, `--all`) makes the voice (Piper `hi_IN-priyamvada-medium` through OpenMontage, Hinglish spelled in Devanagari from `kit\voice\hinglish-words.json`), records with the robot, builds the HyperFrames composition in the launch film's look (3 s title, screen card with gold ring and gentle zoom, captions, progress thread, 3 s end card), runs `hyperframes check` and renders phone and desktop at about 3.2 Mbps with `.srt` files. Music: Indian Flute, quiet and lower under each line. `npm run intro -- --lane N` makes the section intro. First video `V-2-add-a-guest-1` (44.6 s) and the lane 2 intro (7.0 s, its voice line is 6.2 s) are in `videos\final\2-guests\` (not in git). Voice: no custom voice yet, so the kit uses the Piper fallback; your own voice goes in `voiceover\my-voice\<ID>.wav` (see `kit\README.md`). Desktop-only lines live in `voiceover\<ID>.sizes.json`. Waiting on Jay to watch and approve.

- 2026-11-14 · **3A done.** Guides tied together (commit "Guides written").
  - 103 notes (96 features + 7 admin). New: `5-business\planning-team.md`, the one feature the lanes found missing. Four new tasks Jay asked for: seating **Near the front**, a guest's own language, **Print the schedule**, **Destination wedding**.
  - Videos: tiny tasks merged (Jay), so **246 videos** (196 phone first, about 159 minutes). `guides\_video-list.md` is the making list for Wave 5, with logins, off-camera set-up and the old to new ID map.
  - `guides\_glossary.md` written; about 40 word fixes in the notes (computer, tap or click, sidebar, account, RSVP page, coming / can't come / waiting).
  - Cross-lane "See also" links added, two broken links fixed. `guides\README.md` is the full index by section, person and task.
  - All 8 questions answered by Jay (top of this file). App fixes Jay wants are in `guides\_app-fixes.md`, with a prompt for an app session.
  - Reading level: every note grade 4.8 or lower. No dashes or exclamation marks in the notes (one exact app label keeps its dash).
  - Committed 1C's `tools\SETUP.md` and `music\_candidates.md`. Not committed: `tools\voice-line.py` (outside 3A's paths; commit it in a later step). Audio files stay out of git.

- 2026-11-14 · **3B done.** Recording robot in `recorder\` (commit "Recording robot"). `npm run app:start` / `app:stop` run the app from `app\` in recording mode on port 3400 (pid file, shared by lanes). `npm run record -- --id <ID>` (or `--lane N`, `--all`) resets the lane and records phone and desktop MP4s at 2× with a gliding cursor, plus `<ID>.json` timings and step screenshots. The test recording of V-2-add-a-guest-1 is in `videos\raw\2-guests\` (not in git). Specs for renumbered video IDs and the off-camera setup data are written in Wave 5 with each spec's `setup` hook. App stopped; the local database is left running.

- 2026-11-14 · **1C done.**
  - Installed FFmpeg 9.0.2 (winget). Node 24.20, Python 3.12.10 and Git 2.55 were already there.
  - OpenMontage set up in `tools\OpenMontage` (venv, Remotion, Piper 1.8.0, 3 Hindi voices, `.env` with no keys). Its preflight passes.
  - HyperFrames 0.8.146 skills installed; a test render of a copy of the launch film works.
  - `tools\SETUP.md` and `tools\voice-line.py` written.
  - Voice: Jay will use a **custom voice** (to confirm later). Three free Hinglish Piper samples in `voiceover\samples\` as a fallback.
  - Music: **Indian Flute** by JonasBlakewood (Pixabay), `music\1-indian-flute.mp3`. Licence notes in `music\_candidates.md`.
  - For 3A to commit: `tools\SETUP.md`, `tools\voice-line.py`, `music\_candidates.md`, and 1C's lines in `DECISIONS.md`.

- 2026-11-14 · 1A follow-up: Jay answered "no" to all three questions.
  - Google sign-in, vendor ID requests, and the enquiry form with its first reply are left out.
  - The inventory now has 90 live and 5 planned.

- 2026-11-14 · **1A done.**
  - `app\` cloned (main @ `173c54bd`).
  - First commit made.
  - `guides\_inventory.md` lists 95 features in 5 lanes (20 / 19 / 18 / 16 / 22) plus 7 admin notes: 92 live, 3 planned (face search, commission earnings, business subscription). It also says where each of the 17 help articles goes.
  - `guides\README.md` started.
  - The reading-level tool works.
  - Voiceover language: Hinglish.
  - Three questions for Jay are at the end of the inventory (Google sign-in on prod, vendor ID approval screen, enquiry form keys).

- 2026-11-14 · Plan updated: Claude does every step (setup, app start/stop, voice, music, editing). Videos use Playwright (recording), HyperFrames (Krama look, intros, tour video) and OpenMontage (voice, music, languages). Next: Wave 1.
- 2026-11-09 · Switched to the desktop app's Code tab and a read-only app copy in app\.
- 2026-11-07 · Folder set up.
