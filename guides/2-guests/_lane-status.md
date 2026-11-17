---
tags: [guides, lane-status]
lane: 2
written: 2026-11-14 (2B)
updated: 2026-11-17
app: krama-celeb main, local recording copy in app\
---
# Lane 2 status · Guests & invitations

## Where it stands (17 Nov 2026)

**Finished, apart from one video that needs an app change.** 58 of 59 videos have a spec, and all 58 are made in both sizes (phone and desktop, with captions), plus the section intro.

- **Notes:** 18 of 19 are `status: final`, `checked: 2026-11-17`, `video: made`, with real timings in their script tables. `automations-and-to-send` stays `draft` / `video: partly made` because video 2 has no spec.
- **Not made:** `V-2-automations-and-to-send-2` (the "To send" queue). It needs queued messages, and the robot may not use the jobs secret. See `_needs-app-changes.md`.
- **Reading level:** `node toolseading-level.mjs guides-guests` passes. Highest grade 4.5.
- **Frames checked:** `V-2-guest-list-1` phone, `V-2-guest-easier-to-read-1` phone and `V-2-stays-and-rooms-2` desktop. They showed one real bug (typing added to a prefilled value in the Add rooms form: From read "101101" and Sleeps "23"), fixed in the spec and re-made. Other videos were not looked at frame by frame.
- **Why there were so many re-runs:** after the selector fixes below, every failure was a page-load or reseed timeout from other lanes using the PC. One real helper bug (the driver vendor was used before it was saved) is fixed in `_lib.mjs`.
- **To re-make anything:** `cd kit; npm run make -- --id <ID>` (add `--no-record` to reuse recordings), then `node recorder\specs-guests\_update-notes.mjs`.

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
