---
tags: [guides, needs-app-changes]
lane: 3
folder: 3-money-family
made: 2026-11-16
---
# Lane 3 · things the robot could not find by a clear label or role

Written by the lane 3 Wave 5 session. The robot never changes `app\`. Every video in this lane was still recorded: where an element has no clean label, the spec uses the closest match and says so here. Nothing below blocks a video, and no step was skipped.

| Screen | Element | Why it matters |
|---|---|---|
| **Photos** and the guest photo page | The **Album** picker | Its label wraps the whole picker, so its accessible name is "Album" followed by every album name (**Mehendi Haldi Sangeet …**). An exact label match fails. The specs match the start of the name. A proper link between the label and the picker, or an `aria-label` of just "Album", would make it stable. |
| **Photos** and **Files** | The file pickers (**Add photos**, **Upload files**) | The picker is a hidden file box inside a label, so its name carries the hint text too (for example "Upload files Images, PDF, Word and Excel · up to 20 MB each"). The robot taps the label text and answers the file chooser. A short `aria-label` on each would be cleaner. |
| **Money**, an expense page | **Schedule an instalment** | It is the summary line of a closed section, not a button, so it has no button role. The robot finds it by its text. |

## Things the demo setup cannot show (not app changes)

- **Email:** the app sends no email while recording, so the morning email's own stop link (`notifications.md`, "How to stop the morning email") has no video. The video stops the email with **Off** on the same card instead.
- **Printing, WhatsApp and spreadsheets:** the browser's print screen, WhatsApp and a spreadsheet app are outside the app, so the robot cannot film them. The videos end on the app screen and the voice says what happens next.
- **Budget range and quotes:** the app has no screen to pick the budget range after set-up, and a quote needs a planner and a vendor session. The robot sets these two up off camera in the local demo database (lane 3 only). See `_lane-status.md`.
