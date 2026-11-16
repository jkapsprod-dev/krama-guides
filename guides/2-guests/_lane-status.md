---
tags: [guides, lane-status]
lane: 2
written: 2026-11-14 (2B)
updated: 2026-11-16
app: krama-celeb main, local recording copy in app\
---
# Lane 2 status · Guests & invitations

## Where it stands (16 Nov 2026, evening)

**Nearly finished: 58 of 59 videos have a spec; 57 are made in both sizes. Two are left.**

- **Made, notes set to `final` / `checked: 2026-11-16` / `video: made`:** 17 of 19 notes (all but `automations-and-to-send` and `pickups`). Real timings are in their script tables.
- **Still to do:**
  - `V-2-pickups-5` phone: the take failed on a lane-2 reseed timeout (the shared database was slow). Desktop is made. Run `cd kit; npm run make -- --id V-2-pickups-5`, then `node recorder\specs-guests\_update-notes.mjs`.
  - `V-2-automations-and-to-send-2`: no spec. It needs queued messages (see `_needs-app-changes.md`).
  - `V-2-automations-and-to-send-1` and `-3` were made in round 2; the note stays `draft` only because video 2 is missing.
- **Why so many re-runs:** every failure after the first pass was a page-load or seed timeout from other lanes using the PC, apart from the selector fixes listed below. One real bug (the driver vendor was not saved before it was used) is fixed in `_lib.mjs`.
- **Reading level:** `node toolseading-level.mjs guides-guests` passes. Highest grade 4.5.
- **Section intro:** made earlier (`V-2-section-intro-*.mp4`).
- **Frames checked:** only `V-2-guest-list-1` phone so far. Spot-check a few more with `npx hyperframes@0.8.146 snapshot`.
- **Note edit not applied:** the add-a-guest text edit "After you save, a card shows Message on WhatsApp..." was not found in the note. Check that sentence by hand.

## What the running app showed (fixes made in the notes)

- **The number on the Remind button** is guests waiting (33), not families. The list under it counts families ("1 of 13"). Fixed in invitations-and-reminders and headcounts-and-reports.
- **Demo data differs from the notes' story.** The Mehta family already has Room 101. There is no "Sharma family, Pune", no Meena Bua and no Excel list. The robot adds these off camera. The videos use guests that are really in the demo list (Alok Saxena, Anil Kapoor, Bhavesh Pandya, Anil Agarwal, Aryan Tiwari) or ones the robot adds (Meera Sharma, Meena Bua, Suresh Fufa, Haveli Heritage Stay).
- **Stays:** the demo wedding already has two hotels, so the add-a-stay video adds a new stay instead of showing "No stays yet."
- **Add a guest:** the card after saving shows **Send by email** only when an email was typed (note fixed).
- **Duplicate warning:** going back from **View {name}** loses the typed form, so the video points at **View {name}** and taps **Add anyway** (rows 3 and 4).
- **Import:** **Put these together?** is one tick per family. The review button reads **Import 4 guests** for the sample file. After picking phone contacts the review opens at once (no **Review** button on that path).
- **Easier-to-read page:** the demo guest is invited to five functions, so it asks five questions. The robot takes the guest off four functions off camera, so the video shows one.
- **Schedule tab:** **Open in Maps** does not show for the demo venues. The video points at **Google Calendar**.
- **Pass and Contacts tabs** show only after a family says **Going** and a vendor is shown to guests. The robot does both off camera.

These row and text changes are listed in `recorder\specs\2-guests\_note-edits.mjs`; the updater applies them to the notes when it runs.

## What the videos cannot show

- **WhatsApp:** the robot blocks the link and never opens WhatsApp. The video stays on the Krama screen.
- **Phone contacts picker, downloaded files, the gallery, a call screen, an email inbox:** outside the page. Downloads are triggered, then the button is shown again. The stop-emails video opens the stop page directly (`/rsvp/<token>/unsubscribe`) instead of an email. The contacts video uses a stand-in for the picker (three made-up contacts).
- **To send messages:** see `_needs-app-changes.md`.

## Notes and their videos

| Note | Videos | Specs |
|---|---|---|
| guest-list | 5 | 5 |
| add-a-guest | 5 | 5 |
| import-guests | 3 | 3 |
| send-rsvp-links | 4 | 4 |
| invitations-and-reminders | 3 | 3 |
| personal-messages | 3 | 3 |
| automations-and-to-send | 3 | 2 (video 2 needs queued messages) |
| invite-qr | 3 | 3 |
| headcounts-and-reports | 3 | 3 |
| stays-and-rooms | 5 | 5 |
| arrivals-and-departures | 4 | 4 |
| tickets-from-guests | 3 | 3 (set-up writes a made-up train ticket PDF) |
| pickups | 5 | 5 |
| guest-rsvp-page | 3 | 3 |
| guest-easier-to-read | 2 | 2 |
| guest-invite-card | 1 | 1 |
| guest-remove-my-details | 2 | 2 |
| guest-short-link | 1 | 1 |
| guest-pass-and-contacts | 1 | 1 |

## For 6A

- `guides\_video-list.md` still says "to make" with no real lengths. Fill them from `videos\final\2-guests\`.
- Desktop takes use the phone's voice and captions. Where a phone step says "(+)", "More" or "bottom bar" the desktop take does the nearest thing (the sidebar). `make` warns about each. Add `voiceover\<ID>.sizes.json` lines to reword them.
- Only lane 2's own folders were touched. Nothing was committed. The app is still running on port 3400.
