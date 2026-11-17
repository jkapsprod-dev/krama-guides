---
tags: [guides, lane-status]
lane: 3
folder: 3-money-family
made: 2026-11-14
checked: 2026-11-17
---
# Lane 3 status · Money & family · Wave 5 (5C)

**Done.** All 17 live notes are `status: final`, `checked: 2026-11-17`, `video: made`. `find-my-photos` stays `planned` (no videos). 46 videos, each in a phone and a desktop size, plus the lane 3 section intro, are in `videos\final\3-money-family\` (not in git). The app is left running on port 3400.

Working folder: the session opened in the empty `C:\Users\jayka\code\Guides`. Everything was done in `C:\Users\jayka\code\krama-guides`, as 3A noted.

## What was made

| Note | Videos (phone / desktop, seconds) |
|---|---|
| money-due | 1: 41/34 · 2: 50/39 · 3: 29/30 · 4: 35/43 (desktop first) |
| budget | 1: 70/42 · 2: 39/44 · 3: 33/39 · 4: 47/87 |
| expenses-and-payments | 1: 49/56 · 2: 37/38 · 3: 60/76 |
| snap-a-bill | 1: 36/48 · 2: 46/47 |
| vendors | 1: 37/47 · 2: 37/38 · 3: 31/59 |
| quotes-to-approve | 1: 37/35 |
| money-by-side | 1: 34/29 · 2: 52/34 |
| gold-today | 1: 36/42 · 2: 33/47 |
| shagun | 1: 46/40 · 2: 33/28 · 3: 33/34 · 4: 28/22 |
| family-feed | 1: 61/62 · 2: 38/44 |
| photos | 1: 41/30 · 2: 27/27 · 3: 34/32 (desktop first) |
| upload-qr | 1: 36/33 · 2: 29/29 · 3: 33/45 (guest side) |
| heads-up | 1: 49/61 · 2: 32/32 |
| smart-helpers | 1: 37/37 |
| notifications | 1: 36/48 · 2: 33/39 · 3: 29/30 · 4: 44/75 |
| outfits | 1: 42/36 · 2: 35/39 · 3: 33/37 |
| files | 1: 30/39 · 2: 50/39 · 3: 30/39 |
| section intro | `V-3-section-intro-phone.mp4` and `-desktop.mp4` (npm run intro -- --lane 3) |

Each note's script table now has the real length of every step in **Hold (s)** (from the phone take, or the desktop take for the two desktop-first videos) and the finished video's length in its heading. Phone videos run 27 to 70 s (5 are 27 to 29 s, a little under Appendix D's 30 s). Desktop takes are longer in places (up to 87 s) because pages loaded slowly while five lanes were rendering at once.

Reading level: all notes grade 2.1 to 3.6 (limit 8). No exclamation marks. The only dashes in the lane's guide text are inside the exact app label in `files.md`.

## What was changed in the notes after trying the real app

- **Scripts follow what the robot can really show.** Screens that are not the app (a paper bill, a chat full of numbers, a WhatsApp window, a spreadsheet, the print screen, a downloads bar) became the nearest real screen, and the voice lines still say what happens. Videos that said "Open More, then X" now start on Home so the move is on screen.
- **Spellings and names:** **Mehendi** (the app's label) instead of "Mehndi" where the label is meant; **Annapurna Caterers** (the demo vendor) instead of "Shree Caterers" on the vendors list (Shree Caterers is still the vendor added in `V-3-vendors-1` and the bill in `V-3-snap-a-bill-2`); **Raju Travels** is the made-up pickup person in `V-3-vendors-3`.
- **No "family" login exists in lane 3** (Appendix E has host, helper, planner, vendor), so notifications, outfits and files record as the **host**. Their "Demo login" lines now say host. Shagun, feed, photos and upload QR say host too.
- **`V-3-money-due-4`** and **`V-3-photos-3`** are written for a computer. A phone has no **Export** button, so the phone take of money-due-4 uses **CSV** on the **Sides** tab (lines in `voiceover\V-3-money-due-4.sizes.json`).
- **`V-3-notifications-4`** stops the email with **Off** on the same card (no email is sent while recording, so the stop link cannot be shown).
- **`V-3-family-feed-1`** lost its repeated "Open Family feed" row; **`V-3-expenses-and-payments-3`** no longer taps **Done** (the sheet closes by itself after **Noted**); **`V-3-shagun-3`** ends on **Thank-yous to send** one lower (thanked families leave the list).
- **`V-3-upload-qr-1`** ends on the QR on screen. The printed page is print-only and the app blanks everything else when printing, so it cannot be filmed.
- The written guide steps matched the app. No label, button or tab name was wrong. Checked against the code notes from Wave 2: **hosts do have a Notifications item in More** now (the old note said they did not), the Money page heading is **Budget**, and **Money by side** shows only when an expense or budget line is on a family.
- `_section-intro.md` gained a `section:` line and a **Voice says** row so the intro command can read it.

## Set up off camera before each video

Done by the robot with fast clicks through the app's own screens, after the lane reset. Two things had no screen, so they went into the **local demo database** (lane 3 only; never krama-dev or krama-prod):

- **A quote** from Rangoli Decor, sent by Utsav Planners (`V-3-quotes-to-approve-1`). Written into `quote_requests` and `quotes`.
- **The budget range** picked at set-up (`V-3-budget-2`), written into the wedding's `config`.

Through the app: late and upcoming instalments (`money-due-1`, `2`, `3`), a Haldi expense (`money-due-3`), expenses on each family's side (`money-by-side-1`, `2`), a new expense (`expenses-and-payments-3`), emptied budget amounts (`budget-1`, `2`), **Snap a bill** switched on (`snap-a-bill-2`), the vendor Raju Travels, photos in the albums, files, outfits, a QR, and the Sangeet moved to Christmas Day 2026 so a festival warning shows (`heads-up-2`). The photos, receipt, bill and PDFs are made-up files made by `recorder\specs\3-money-family\_make-fixtures.mjs` into `_fixtures\`.

## For the next session

1. **Hinglish words for `kit\voice\hinglish-words.json`** (not edited here, because it is a shared file). 229 words were spelled by rule, so some English words and app labels sound a little off in the AI voice. Each video's `voiceover\V-3-*.md` lists its own under **Check these words**. The ones that matter most are the app's own words: planned, booked, still, pay, overdue, shared, sides, bride, groom, receipt, instalment, expenses, outfits, reminders, thanked, uploaded, shagun, forecast, ahmedabad, airport, lehenga, pandit. Add them, then run `npm run make -- --lane 3 --no-record` to voice and render again. Jay's spot-check of the Hinglish lines is still due.
2. **Re-recorded on 17 Nov, on a quiet machine, with the page-wait helper.** Lengths barely changed, because each step's **Hold (s)** in the notes now holds the real length from the first takes, and a hold is the shortest a step can be. So long steps stay long (for example step 1 of `V-3-money-due-1` holds 10 s, and `V-3-budget-1` runs 70 s). To tighten them, lower the slow rows' **Hold (s)** in the script tables (the original small holds are in git at the "Guides written" commit) and run `npm run make -- --lane 3`.
3. **Rendering failed twice for `V-3-budget-1`** ("hyperframes render failed", no message) while the machine was overloaded. It rendered cleanly when run alone.
4. **Not recorded by the kit's single `make` command:** to finish in time the robot recorded all videos one after another with the same voice lines (`record`), then ran `make --no-record` in parallel for the design check and render. The files are the same.
5. **App fixes, already in `guides\_app-fixes.md`:** the guest photo upload page still shows the old brand "Krama Celebrations" (visible in `V-3-upload-qr-3`).
6. `_needs-app-changes.md` lists three labels that are not clean (the **Album** picker, the file pickers, **Schedule an instalment**). Nothing is blocked.

## Files this session touched

`guides\3-money-family\` (all notes, `_section-intro.md`, `_needs-app-changes.md`, this file), `guides\img\<note>\` for the 17 notes (step screenshots, written by the robot), `recorder\specs\3-money-family\` (46 specs, `_lib.mjs`, `_setup.mjs`, `_make-fixtures.mjs`, `_fixtures\`), `videos\raw\3-money-family\`, `videos\final\3-money-family\`, and for the lane's videos in `voiceover\`: the voice files, the timing notes (`V-3-*.md`) and 22 `V-3-*.sizes.json` files (lines for one size only).
