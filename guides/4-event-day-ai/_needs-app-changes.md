---
tags: [guides, needs-app-changes]
lane: 4
folder: 4-event-day-ai
made: 2026-11-14 (2D)
updated: 2026-11-15 (Wave 5, lane 4)
---
# Lane 4 · needs app changes

Found while checking every note on the running app and recording its videos (15 Nov 2026). Nothing here changed the app. 6B (selectors only, no visible change) decides which rows it can take.

## For 6B: selectors the recorder needs

Every other step in this lane has a stable role and label, so only one row is needed.

| Screen | Element | Why |
|---|---|---|
| Guests, **Family passes** | **New pass** (one per family) | It asks "Cancel the old pass?" with the browser's own `window.confirm` box (`components\checkin\renew-pass-button.tsx`). A recording of the page can't show a browser box, so [[family-passes]] video V-4-family-passes-1 says yes to it off screen and the question never appears on camera. An in-app confirm box (like **Yes, remove** on **Codes & planner**) would show up in the video. |

## Not selector problems, but worth knowing (no app change needed)

- **Print.** The robot taps **Print** and **Print seating**, but its browser has no print window, so the videos end on the print page itself. This is a recorder limit, not an app problem.
- **Prepare export** (the **Download, then delete** step on Wrap-up). The export is made by the app's background job (`/api/jobs/tick`), which does not run in the recording setup. The video shows the app's own **Preparing your export** message and stops there. The **Download** link is never on camera.
- **AI.** The recording app has no AI, so five videos (the assistant's typed box and answer language, voice, meeting notes) wait for a real AI. Test takes made with a stand-in AI are kept apart and are not for handover. See [[_lane-status]].

## Moved by 3A (14 Nov 2026)

The four owner decisions that were here (a lasting link to the function recap, "Krama Celebrations" on the wedding-in-numbers card, the referral reward line, the WhatsApp add-on row on Plan & add-ons) were answered by Jay in 3A: all four go to an app session. They now live in [[_app-fixes]], with the notes to update when they land. 6B must not change them. `V-4-wrap-up-2` shows the **Krama Celebrations** line on the wedding-in-numbers card, so it needs to be recorded again after that fix.
