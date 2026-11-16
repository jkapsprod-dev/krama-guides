---
tags: [guides, needs-app-changes]
lane: 2
written: 2026-11-15 (5B)
---
# Lane 2 · things the robot can't record without an app or demo-data change

The robot never changes `app\`. Each row is a screen or element it can't film as the note describes, and why.

| Screen | Element | Why |
|---|---|---|
| **Guests › More › To send** | The list of waiting messages | The demo wedding has no queued messages. Krama queues them only when its scheduler runs after **Reply-by date passed** is on. The robot may not call the scheduler (it needs the jobs secret), so V-2-automations-and-to-send-2 has no robot spec. Needs a seed that queues two or three messages for lane 2, or an app button that runs the rules now. |
| **Guests › More › Import contacts** | **From your phone's contacts** | The phone's contact picker is an Android screen outside the page. The robot's browser answers it with three made-up contacts, so the video shows what Krama does next, not the picker. |
| **Message on WhatsApp**, **Remind on WhatsApp**, **Send on WhatsApp**, **Open in WhatsApp** | WhatsApp itself | The links open WhatsApp outside Krama. The robot stops them at the door and never opens WhatsApp, so the videos end on the Krama screen. The notes' rows that showed WhatsApp now show the Krama button instead. |
| **Guests list rows** | Each guest's link | Its accessible name is the whole row ("Alok Saxena Tau ji Not invited to Mehendi ..."), so the robot finds it by the start of the name. It works, but a short label on the name would be steadier. |
| **Stays & Travel › Pickups › Waiting for a run** | Each arrival line | No label of its own; the robot finds lines by the guest's name. |
| **Reports** | The four sheet blocks | The blocks have no region name; the robot finds each one by its heading. |
| **Guests › Replies / selection bar** | The bar that opens when guests are ticked | Its accessible name reads "N selected" while its text reads "0 selected". The robot uses the name's ending. |
