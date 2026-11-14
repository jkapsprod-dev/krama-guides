---
tags: [guides, video-list]
made: 2026-11-14 (3A)
---
# Video list · the making list for Wave 5 · [[README]] · [[_glossary]]

Every video script in the guide notes. Wave 5 makes each one with the kit's one command (`npm run make -- --id <ID>`) and fills in the last two columns. Made from the notes by 3A; if a note changes, its row here changes too.

**246 videos** (196 phone first, 50 desktop first), about 159 minutes in all. Both sizes are made for every video. Planned notes and admin notes have no videos.

## How to read this list

- **ID:** `V-<lane>-<note>-<n>`, the same in the note, the robot's spec and every file name.
- **First:** phone first (couple, family and guest videos) or desktop first (business videos). Make both sizes anyway.
- **Length:** the estimate in the note (3 s title + steps + 3 s end card). Wave 5 writes the real length.
- **Login:** the lane's demo login from Appendix E. "Fresh test account" means a new made-up `example.test` account, never a demo login, so demo passwords and weddings stay as they are.
- **Set up off camera:** Jay chose (3A, 14 Nov) that the robot sets up anything the demo data lacks **before recording, off camera**, through the app itself. No seed change. Reset the lane first (`--lane N`), then do the set-up, then record.
- **Merged videos:** Jay chose to merge tiny tasks. Where one video covers two or three tasks, its title says "…, then …". Old IDs are mapped at the end.
- **Voice:** "Voice says" is Hinglish. Jay spot-checks the first finished videos in Wave 5 and flags lines to change.

## Before recording a lane

- **Every lane:** destructive videos stop before the last button (**Delete permanently**, **Delete my account**). The robot never sends a WhatsApp message or an email to anyone, and never opens WhatsApp Web.
- **Lane 1:** fresh `example.test` accounts for sign-up, password, devices and delete videos. The **Set a password (optional)** video needs an account made with an email link and no password.
- **Lane 2:** a CSV file of made-up guests for import; the demo hotel Hotel Riverfront Residency; **Let guests send their tickets** switched on before the guest-side ticket video; a driver link made in a pickups video before the driver's video.
- **Lane 3:** a quote from Rangoli Decor sent by Utsav Planners (for quotes to approve); a budget band picked at set-up with nothing planned yet (for the typical split card); **Snap a bill** switched on.
- **Lane 4:** several things only work near a function's date. The robot moves a demo function's date off camera: to today for run sheet **Start** and **Done** (6 hours either side), check-in and event day; to the last 7 days for the **That's {name} done.** card; and past the last function for **Wrap-up**. The AI must be online for typed assistant questions, voice and meeting minutes. Voice videos play a recorded clip instead of a live microphone. The offline video switches the network off and on.
- **Lane 5:** the robot first ends Utsav Planners' link to the demo wedding where a video needs it, and adds invoices, a booking, crew, calendar items, documents, a staff member and a family rating as each video says. The full list is in `5-business\_needs-app-changes.md`.

## Lane 1 · Getting started · 66 videos · `1-start`

| ID | Task | First | Length | Login | Set up off camera | Real length | Status |
|---|---|---|---|---|---|---|---|
| V-1-create-an-account-1 | [[create-an-account]]: How to create an account | phone | about 40 s | Fresh test account (example.test) | The robot uses a fresh made-up address at example.test, for example meera.shah@example.test (Appendix E). | | to make |
| V-1-create-an-account-2 | [[create-an-account]]: How to set a password after you confirm | phone | about 30 s | Fresh test account (example.test) | The robot uses a fresh made-up address at example.test that signed up with an email link and no password, never a demo login (Appendix E). Accounts made with a password never see this step. | | to make |
| V-1-data-and-privacy-1 | [[data-and-privacy]]: How to see how long your data is kept, then keep everything longer | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-1-data-and-privacy-2 | [[data-and-privacy]]: How to download everything, then delete the wedding now | phone | about 40 s | Host (Riya Sharma) | From the part on "How to delete the wedding now": The robot stops before **Delete permanently** and never taps it. | | to make |
| V-1-data-and-privacy-3 | [[data-and-privacy]]: How to answer a Krama support request, then see who did what | phone | about 40 s | Host (Riya Sharma) | Needs a support request added to the demo wedding first. See the lane status file. | | to make |
| V-1-functions-1 | [[functions]]: How to add a function | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-functions-2 | [[functions]]: How to set or change a date | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-functions-3 | [[functions]]: How to plan rituals | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-functions-4 | [[functions]]: How to start from an outline | phone | about 30 s | Host (Riya Sharma) | Use a function whose run sheet is still empty and not yet offered. | | to make |
| V-1-functions-5 | [[functions]]: How to add a function to your calendar, then print a function's schedule | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-1-getting-around-1 | [[getting-around]]: How to add anything from the (+) | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-getting-around-2 | [[getting-around]]: How to find a guest, function or task fast | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-getting-around-3 | [[getting-around]]: How to find a section on your phone | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-getting-around-4 | [[getting-around]]: How to collapse the sidebar on a computer | desktop | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-home-1 | [[home]]: How to read your Home | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-1-home-2 | [[home]]: How to arrange your Home | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-home-3 | [[home]]: How to add a widget | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-join-the-wedding-1 | [[join-the-wedding]]: How to accept an email invite | phone | about 30 s | Fresh test account (example.test) | test, for example meera.shah@example.test. Off camera, host Riya Sharma invites that email in **Members** (Appendix E). | | to make |
| V-1-join-the-wedding-2 | [[join-the-wedding]]: How to accept a WhatsApp invite | phone | about 30 s | Fresh test account (example.test) | test. Off camera, host Riya Sharma invites a made-up WhatsApp number in **Members** (Appendix E). | | to make |
| V-1-journey-1 | [[journey]]: How to see the wedding week by week | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-journey-2 | [[journey]]: How to move something to another week | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-language-1 | [[language]]: How to change the app's language | phone | about 30 s | Helper (Kavya Sharma) | — | | to make |
| V-1-leave-or-delete-account-1 | [[leave-or-delete-account]]: How to leave a wedding | phone | about 30 s | Helper (Kavya Sharma) | The robot stops before **Yes, leave** and never taps it. | | to make |
| V-1-leave-or-delete-account-2 | [[leave-or-delete-account]]: How to delete my account | phone | about 35 s | Fresh test account (example.test) | test with no weddings, never a lane 1 demo user (Appendix E). The robot stops before **Delete my account** and never taps it. | | to make |
| V-1-leave-or-delete-account-3 | [[leave-or-delete-account]]: How to hand things over first | phone | about 30 s | Host (Riya Sharma) | The robot stops before changing any role. | | to make |
| V-1-members-1 | [[members]]: How to invite family | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-1-members-2 | [[members]]: How to change someone's role or remove them | phone | about 35 s | Host (Riya Sharma) | Use the spare demo member Mausi Patel, added for this video. The robot stops before **Yes, remove**. | | to make |
| V-1-members-3 | [[members]]: How to let a helper see some guests, then resend an expired invite | phone | about 40 s | Host (Riya Sharma) | From the part on "How to resend an expired invite": Use a spare WhatsApp invite that has expired. | | to make |
| V-1-personalise-1 | [[personalise]]: How to switch to light or dark | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-personalise-2 | [[personalise]]: How to pick a look | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-personalise-3 | [[personalise]]: How to change the wedding theme | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-personalise-4 | [[personalise]]: How to make text bigger or use easy reading | phone | about 30 s | Helper (Kavya Sharma) | — | | to make |
| V-1-personalise-5 | [[personalise]]: How to choose what is on your Home | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-personalise-6 | [[personalise]]: How to set the bottom bar, sidebar and start screen | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-plan-1 | [[plan]]: How to ask the family to approve something | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-plan-2 | [[plan]]: How to note a decision | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-plan-3 | [[plan]]: How to fill in the brief | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-plan-4 | [[plan]]: How to book a trial or tasting | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-plan-5 | [[plan]]: How to freeze the guest list or menu | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-plan-6 | [[plan]]: How to send a change for approval | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-run-sheets-1 | [[run-sheets]]: How to build a run sheet | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-run-sheets-2 | [[run-sheets]]: How to set the muhurat and see clashes | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-run-sheets-3 | [[run-sheets]]: How to print or share a run sheet | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-set-up-your-wedding-1 | [[set-up-your-wedding]]: How to start a new wedding | phone | about 30 s | Fresh test account (example.test) | test, for example meera.shah@example.test, so the Sharma and Patel wedding stays untouched (Appendix E). | | to make |
| V-1-set-up-your-wedding-2 | [[set-up-your-wedding]]: How to choose traditions and functions | phone | about 30 s | Fresh test account (example.test) | — | | to make |
| V-1-set-up-your-wedding-3 | [[set-up-your-wedding]]: How to add the date, guests and budget | phone | about 35 s | Fresh test account (example.test) | — | | to make |
| V-1-set-up-your-wedding-4 | [[set-up-your-wedding]]: How to add helpers, choose how long to keep your data, and create your wedding | phone | about 40 s | Fresh test account (example.test) | — | | to make |
| V-1-sign-in-and-passwords-1 | [[sign-in-and-passwords]]: How to sign in with a password | phone | about 30 s | Host (Riya Sharma) | The robot starts signed out and types the demo email and password. | | to make |
| V-1-sign-in-and-passwords-2 | [[sign-in-and-passwords]]: How to sign in without a password | phone | about 35 s | Host (Riya Sharma) | The robot starts signed out and uses the demo email only. | | to make |
| V-1-sign-in-and-passwords-3 | [[sign-in-and-passwords]]: How to reset a forgotten password | phone | about 40 s | Fresh test account (example.test) | The robot uses a fresh made-up address at example.test, never the demo accounts (Appendix E). | | to make |
| V-1-sign-in-and-passwords-4 | [[sign-in-and-passwords]]: How to get the confirm email again | phone | about 30 s | Fresh test account (example.test) | The robot uses a fresh made-up address at example.test that has signed up but not opened the confirm link yet (Appendix E). | | to make |
| V-1-tasks-1 | [[tasks]]: How to add a task and give it to someone | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-tasks-2 | [[tasks]]: How to tick a task done | phone | about 30 s | Helper (Kavya Sharma) | — | | to make |
| V-1-tasks-3 | [[tasks]]: How to use the board | desktop | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-tasks-4 | [[tasks]]: How to see only your tasks | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-wedding-id-and-code-1 | [[wedding-id-and-code]]: How to find and copy your Wedding ID | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-wedding-id-and-code-2 | [[wedding-id-and-code]]: How to choose a wedding code | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-wedding-id-and-code-3 | [[wedding-id-and-code]]: How to choose what the short link shows | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-wedding-sheet-1 | [[wedding-sheet]]: How to see the whole wedding on one page | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-1-wedding-sheet-2 | [[wedding-sheet]]: How to print it | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-1-wedding-sheet-3 | [[wedding-sheet]]: How to share a read-only link | phone | about 35 s | Host (Riya Sharma) | The robot does not send the link anywhere. | | to make |
| V-1-your-account-1 | [[your-account]]: How to set, change or remove your password | phone | about 30 s | Fresh test account (example.test) | The robot uses a fresh made-up account at example.test, never the demo accounts, so the demo passwords stay as they are (Appendix E). | | to make |
| V-1-your-account-2 | [[your-account]]: How to see your signed-in devices, then sign out other devices | phone | about 45 s | Fresh test account (example.test) | The robot uses a fresh made-up account at example.test that is also signed in on a second browser (Appendix E). | | to make |
| V-1-your-weddings-and-switching-1 | [[your-weddings-and-switching]]: How to open another wedding | phone | about 35 s | Planner (Neha Desai, Utsav Planners) | Needs a planner who belongs to two weddings. | | to make |
| V-1-your-weddings-and-switching-2 | [[your-weddings-and-switching]]: How to switch between a wedding and a business | phone | about 30 s | Planner (Neha Desai, Utsav Planners) | She has a wedding and a business. | | to make |
| V-1-your-weddings-and-switching-3 | [[your-weddings-and-switching]]: How to find a wedding with the filters | phone | about 40 s | Planner (Neha Desai, Utsav Planners) | Needs a planner who belongs to two or more weddings. | | to make |

## Lane 2 · Guests & invitations · 59 videos · `2-guests`

| ID | Task | First | Length | Login | Set up off camera | Real length | Status |
|---|---|---|---|---|---|---|---|
| V-2-add-a-guest-1 | [[add-a-guest]]: How to add one guest | phone | about 38 s | Host (Riya Sharma) | — | | to make |
| V-2-add-a-guest-2 | [[add-a-guest]]: How to put guests in one family | phone | about 38 s | Host (Riya Sharma) | Off camera, the demo list has a family called Sharma family, Pune. | | to make |
| V-2-add-a-guest-3 | [[add-a-guest]]: How to add children's counts | phone | about 38 s | Host (Riya Sharma) | — | | to make |
| V-2-add-a-guest-4 | [[add-a-guest]]: How to handle a possible duplicate | phone | about 38 s | Host (Riya Sharma) | Off camera, the demo list has Meena Bua with phone 98765 43210. | | to make |
| V-2-add-a-guest-5 | [[add-a-guest]]: How to change a guest's details | phone | about 38 s | Host (Riya Sharma) | — | | to make |
| V-2-arrivals-and-departures-1 | [[arrivals-and-departures]]: How to add a train or a flight | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-2-arrivals-and-departures-2 | [[arrivals-and-departures]]: How to give someone a pickup | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-2-arrivals-and-departures-3 | [[arrivals-and-departures]]: How to mark a guest arrived | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-2-arrivals-and-departures-4 | [[arrivals-and-departures]]: How to see only your pickups | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-2-automations-and-to-send-1 | [[automations-and-to-send]]: How to switch on an automation | phone | about 50 s | Host (Riya Sharma) | — | | to make |
| V-2-automations-and-to-send-2 | [[automations-and-to-send]]: How to send what's waiting | phone | about 50 s | Host (Riya Sharma) | — | | to make |
| V-2-automations-and-to-send-3 | [[automations-and-to-send]]: How to pause all of them | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-2-guest-easier-to-read-1 | [[guest-easier-to-read]]: How to turn on easier reading, then answer one question at a time | phone | about 45 s | Guest RSVP link | — | | to make |
| V-2-guest-easier-to-read-2 | [[guest-easier-to-read]]: How to hear it read aloud | phone | about 30 s | Guest RSVP link | — | | to make |
| V-2-guest-invite-card-1 | [[guest-invite-card]]: How to save your invite card, then reply from the card | phone | about 40 s | Guest RSVP link | — | | to make |
| V-2-guest-list-1 | [[guest-list]]: How to find a guest | phone | about 38 s | Host (Riya Sharma) | — | | to make |
| V-2-guest-list-2 | [[guest-list]]: How to filter by side or reply | phone | about 38 s | Host (Riya Sharma) | — | | to make |
| V-2-guest-list-3 | [[guest-list]]: How to invite many guests at once | phone | about 38 s | Host (Riya Sharma) | — | | to make |
| V-2-guest-list-4 | [[guest-list]]: How to tag many guests | phone | about 38 s | Host (Riya Sharma) | — | | to make |
| V-2-guest-list-5 | [[guest-list]]: How to delete many guests | phone | about 38 s | Host (Riya Sharma) | Use three extra made-up guests added off camera. | | to make |
| V-2-guest-pass-and-contacts-1 | [[guest-pass-and-contacts]]: How to show your family pass at the door, then find who to call on the day | phone | about 40 s | Guest RSVP link | — | | to make |
| V-2-guest-remove-my-details-1 | [[guest-remove-my-details]]: How to remove your details | phone | about 30 s | Guest RSVP link | — | | to make |
| V-2-guest-remove-my-details-2 | [[guest-remove-my-details]]: How to stop emails | phone | about 30 s | Guest RSVP link | Off camera, a reminder email from the family is open. | | to make |
| V-2-guest-rsvp-page-1 | [[guest-rsvp-page]]: How to reply for your family | phone | about 40 s | Guest RSVP link | — | | to make |
| V-2-guest-rsvp-page-2 | [[guest-rsvp-page]]: How to see the schedule and add it to your calendar | phone | about 35 s | Guest RSVP link | — | | to make |
| V-2-guest-rsvp-page-3 | [[guest-rsvp-page]]: How to fix your details, then read the page in your language | phone | about 40 s | Guest RSVP link | — | | to make |
| V-2-guest-short-link-1 | [[guest-short-link]]: How to see the wedding on the short link | phone | about 30 s | Guest RSVP link | — | | to make |
| V-2-headcounts-and-reports-1 | [[headcounts-and-reports]]: How to see who's coming to each function | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-2-headcounts-and-reports-2 | [[headcounts-and-reports]]: How to send the caterer a sheet | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-2-headcounts-and-reports-3 | [[headcounts-and-reports]]: How to download the transport manifest or RSVP by side | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-2-import-guests-1 | [[import-guests]]: How to import guests from a CSV file | phone | about 38 s | Host (Riya Sharma) | Off camera, put a small made-up file called sharma-list.csv on the phone, with columns Name, Phone and City. | | to make |
| V-2-import-guests-2 | [[import-guests]]: How to check duplicates and finish the import | phone | about 38 s | Host (Riya Sharma) | Continue from the review screen of the file in video 1, which has one repeated guest and two guests who share a surname and a city. | | to make |
| V-2-import-guests-3 | [[import-guests]]: How to import from your phone's contacts | phone | about 38 s | Host (Riya Sharma) | Use an Android phone with three made-up contacts. | | to make |
| V-2-invitations-and-reminders-1 | [[invitations-and-reminders]]: How to remind families who haven't replied | phone | about 55 s | Host (Riya Sharma) | — | | to make |
| V-2-invitations-and-reminders-2 | [[invitations-and-reminders]]: How to set a reply-by date | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-2-invitations-and-reminders-3 | [[invitations-and-reminders]]: How to choose who guests can call | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-2-invite-qr-1 | [[invite-qr]]: How to make an invite QR | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-2-invite-qr-2 | [[invite-qr]]: How to add the people who scanned it | phone | about 50 s | Host (Riya Sharma) | — | | to make |
| V-2-invite-qr-3 | [[invite-qr]]: How to send your details | phone | about 45 s | Guest RSVP link | — | | to make |
| V-2-personal-messages-1 | [[personal-messages]]: How to send a save the date, invitation or thank-you | phone | about 55 s | Host (Riya Sharma) | — | | to make |
| V-2-personal-messages-2 | [[personal-messages]]: How to schedule an email | phone | about 50 s | Host (Riya Sharma) | — | | to make |
| V-2-personal-messages-3 | [[personal-messages]]: How to turn on the easier RSVP page for some families | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-2-pickups-1 | [[pickups]]: How to plan pickup runs | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-2-pickups-2 | [[pickups]]: How to add a run by hand | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-2-pickups-3 | [[pickups]]: How to move a run that's late | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-2-pickups-4 | [[pickups]]: How to send a driver their link | phone | about 35 s | Host (Riya Sharma) | The robot stops at WhatsApp opening and never presses send. | | to make |
| V-2-pickups-5 | [[pickups]]: How to see your pickups | phone | about 35 s | Driver link (no sign-in) | No sign-in is needed. | | to make |
| V-2-send-rsvp-links-1 | [[send-rsvp-links]]: How to invite a guest to functions | phone | about 38 s | Host (Riya Sharma) | Use a guest who is not yet invited to Haldi. | | to make |
| V-2-send-rsvp-links-2 | [[send-rsvp-links]]: How to send a family their link | phone | about 38 s | Host (Riya Sharma) | Use a guest with a made-up phone number. | | to make |
| V-2-send-rsvp-links-3 | [[send-rsvp-links]]: How to stop a link shared by mistake | phone | about 38 s | Host (Riya Sharma) | Use a guest who is in a family. | | to make |
| V-2-send-rsvp-links-4 | [[send-rsvp-links]]: How to record a reply for a guest | phone | about 38 s | Host (Riya Sharma) | Use a guest invited to Haldi. | | to make |
| V-2-stays-and-rooms-1 | [[stays-and-rooms]]: How to add a hotel or a home | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-2-stays-and-rooms-2 | [[stays-and-rooms]]: How to add rooms | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-2-stays-and-rooms-3 | [[stays-and-rooms]]: How to mark a family that needs a room | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-2-stays-and-rooms-4 | [[stays-and-rooms]]: How to put a family in a room | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-2-stays-and-rooms-5 | [[stays-and-rooms]]: How to print the rooming list for the hotel, then mark a destination wedding | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-2-tickets-from-guests-1 | [[tickets-from-guests]]: How to let guests send their tickets | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-2-tickets-from-guests-2 | [[tickets-from-guests]]: How to check a ticket and add it to travel | phone | about 35 s | Host (Riya Sharma) | A ticket sent by the demo guest must be waiting. | | to make |
| V-2-tickets-from-guests-3 | [[tickets-from-guests]]: How to send your ticket to the hosts | phone | about 40 s | Guest RSVP link | Needs **Let guests send their tickets** switched on first. | | to make |

## Lane 3 · Money & family · 46 videos · `3-money-family`

| ID | Task | First | Length | Login | Set up off camera | Real length | Status |
|---|---|---|---|---|---|---|---|
| V-3-budget-1 | [[budget]]: How to set your budget | phone | about 55 s | Host (Riya Sharma) | — | | to make |
| V-3-budget-2 | [[budget]]: How to start from a typical split | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-budget-3 | [[budget]]: How to add or rename a category | phone | about 55 s | Host (Riya Sharma) | — | | to make |
| V-3-budget-4 | [[budget]]: How to split shared costs between the families | phone | about 60 s | Host (Riya Sharma) | — | | to make |
| V-3-expenses-and-payments-1 | [[expenses-and-payments]]: How to add an expense | phone | about 60 s | Host (Riya Sharma) | — | | to make |
| V-3-expenses-and-payments-2 | [[expenses-and-payments]]: How to schedule instalments | phone | about 50 s | Host (Riya Sharma) | — | | to make |
| V-3-expenses-and-payments-3 | [[expenses-and-payments]]: How to record a payment and who paid, then attach a receipt | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-3-family-feed-1 | [[family-feed]]: How to post an update or photos, then react to a post | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-3-family-feed-2 | [[family-feed]]: How to report or remove a post | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-files-1 | [[files]]: How to upload a contract or list | phone | about 45 s | Family member | — | | to make |
| V-3-files-2 | [[files]]: How to link a file to a function, task, vendor or guest | phone | about 55 s | Family member | — | | to make |
| V-3-files-3 | [[files]]: How to hide money files from helpers and viewers | phone | about 50 s | Family member | — | | to make |
| V-3-gold-today-1 | [[gold-today]]: How to see today's gold price on your jewellery budget | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-3-gold-today-2 | [[gold-today]]: How to switch the gold price off | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-3-heads-up-1 | [[heads-up]]: How to get weather alerts for an open-air function | phone | about 50 s | Host (Riya Sharma) | — | | to make |
| V-3-heads-up-2 | [[heads-up]]: How to read a festival or long-weekend warning | phone | about 45 s | Host (Riya Sharma) | A demo function date is set next to a 2026 holiday so the card shows. | | to make |
| V-3-money-by-side-1 | [[money-by-side]]: How to see one family's share | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-money-by-side-2 | [[money-by-side]]: How to print or download it | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-money-due-1 | [[money-due]]: How to see what is due | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-money-due-2 | [[money-due]]: How to mark a payment paid | phone | about 50 s | Host (Riya Sharma) | — | | to make |
| V-3-money-due-3 | [[money-due]]: How to filter by function or side | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-money-due-4 | [[money-due]]: How to export | desktop | about 40 s | Host (Riya Sharma) | — | | to make |
| V-3-notifications-1 | [[notifications]]: How to read and clear your notices | phone | about 40 s | Family member | — | | to make |
| V-3-notifications-2 | [[notifications]]: How to set a reminder for yourself | phone | about 50 s | Family member | — | | to make |
| V-3-notifications-3 | [[notifications]]: How to choose what you're told about | phone | about 45 s | Family member | — | | to make |
| V-3-notifications-4 | [[notifications]]: How to get the morning email, then stop the morning email | phone | about 40 s | Family member | — | | to make |
| V-3-outfits-1 | [[outfits]]: How to add an outfit | phone | about 60 s | Family member | — | | to make |
| V-3-outfits-2 | [[outfits]]: How to track fittings and pick-ups | phone | about 60 s | Family member | — | | to make |
| V-3-outfits-3 | [[outfits]]: How to spot two people in the same colour | phone | about 50 s | Family member | — | | to make |
| V-3-photos-1 | [[photos]]: How to add photos to a function's album | phone | about 60 s | Host (Riya Sharma) | — | | to make |
| V-3-photos-2 | [[photos]]: How to move or delete a photo | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-photos-3 | [[photos]]: How to download everything | desktop | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-quotes-to-approve-1 | [[quotes-to-approve]]: How to approve a quote your planner sent | phone | about 55 s | Host (Riya Sharma) | — | | to make |
| V-3-shagun-1 | [[shagun]]: How to note an envelope or a gift | phone | about 60 s | Host (Riya Sharma) | — | | to make |
| V-3-shagun-2 | [[shagun]]: How to see shagun by function or family | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-shagun-3 | [[shagun]]: How to thank someone | phone | about 60 s | Host (Riya Sharma) | — | | to make |
| V-3-shagun-4 | [[shagun]]: How to export your shagun list | phone | about 30 s | Host (Riya Sharma) | — | | to make |
| V-3-smart-helpers-1 | [[smart-helpers]]: How to switch a smart helper on or off | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-snap-a-bill-1 | [[snap-a-bill]]: How to switch Snap a bill on | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-3-snap-a-bill-2 | [[snap-a-bill]]: How to add an expense from a bill photo | phone | about 60 s | Host (Riya Sharma) | Snap a bill is already switched on. Use a made-up printed bill from Shree Caterers. | | to make |
| V-3-upload-qr-1 | [[upload-qr]]: How to make a photo QR for guests | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-upload-qr-2 | [[upload-qr]]: How to switch it off or replace it | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-upload-qr-3 | [[upload-qr]]: How a guest adds photos with the QR | phone | about 60 s | Guest RSVP link | — | | to make |
| V-3-vendors-1 | [[vendors]]: How to add a vendor | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-vendors-2 | [[vendors]]: How to find a vendor, call them and see what you owe | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-3-vendors-3 | [[vendors]]: How to show a vendor to guests as a contact | phone | about 45 s | Host (Riya Sharma) | — | | to make |

## Lane 4 · Event day, AI & voice · 27 videos · `4-event-day-ai`

| ID | Task | First | Length | Login | Set up off camera | Real length | Status |
|---|---|---|---|---|---|---|---|
| V-4-assistant-1 | [[assistant]]: How to ask a quick question, then type your own question | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-4-assistant-2 | [[assistant]]: How to choose the answer language | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-4-check-in-1 | [[check-in]]: How to put a helper on the door | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-4-check-in-2 | [[check-in]]: How to check a family in, then fix a mistake | phone | about 45 s | Host (Riya Sharma) | The robot uses **Find family**. It shows **Scan pass** but doesn't use the camera. | | to make |
| V-4-counts-1 | [[counts]]: How to see the counts, change the ratios, then print or download the counts | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-4-emergency-card-1 | [[emergency-card]]: How to fill in the emergency card, then print the card | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-4-event-day-1 | [[event-day]]: How to open event-day mode | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-4-event-day-2 | [[event-day]]: How to move between the tabs | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-4-event-day-3 | [[event-day]]: How to keep working without signal, then end event-day mode | phone | about 45 s | Host (Riya Sharma) | The robot turns the network off and on. | | to make |
| V-4-family-passes-1 | [[family-passes]]: How to print family passes, then cancel a lost pass | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-4-food-1 | [[food]]: How to write the menu | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-4-food-2 | [[food]]: How to set the plates guaranteed, then send it to the caterer | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-4-function-recap-1 | [[function-recap]]: How to see how a function went | phone | about 35 s | Host (Riya Sharma) | The robot uses a function that has finished, with check-in and run sheet ticks. | | to make |
| V-4-live-run-sheet-1 | [[live-run-sheet]]: How to tick items as they happen, then mark the key moment | phone | about 45 s | Host (Riya Sharma) | The robot opens a function that is happening today. | | to make |
| V-4-live-run-sheet-2 | [[live-run-sheet]]: How to tell everyone you are running late | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-4-moments-1 | [[moments]]: What the moment cards mean | phone | about 35 s | Host (Riya Sharma) | The robot sets the demo wedding so a function has just finished. | | to make |
| V-4-notes-from-a-meeting-1 | [[notes-from-a-meeting]]: How to turn meeting notes into minutes and tasks | phone | about 45 s | Host (Riya Sharma) | The robot pastes a short made-up note. | | to make |
| V-4-plan-and-add-ons-1 | [[plan-and-add-ons]]: How to see your plan and what is included | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-4-referral-code-1 | [[referral-code]]: How to share your referral code, then use a friend's code | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-4-seating-1 | [[seating]]: How to add tables, then seat a family | phone | about 40 s | Host (Riya Sharma) | — | | to make |
| V-4-seating-2 | [[seating]]: How to seat elders near the front, then let Krama suggest seats | phone | about 45 s | Host (Riya Sharma) | — | | to make |
| V-4-seating-3 | [[seating]]: How to print seating | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-4-voice-1 | [[voice]]: How to speak instead of typing, then say a command to the assistant | phone | about 40 s | Host (Riya Sharma) | The robot plays a short recorded clip instead of a real microphone. | | to make |
| V-4-voice-2 | [[voice]]: How to turn a voice note into tasks or arrivals | phone | about 35 s | Host (Riya Sharma) | — | | to make |
| V-4-wrap-up-1 | [[wrap-up]]: How to settle every vendor, then track deliverables | phone | about 40 s | Host (Riya Sharma) | The robot sets the demo wedding so Wrap-up is open. | | to make |
| V-4-wrap-up-2 | [[wrap-up]]: How to see the thank-yous still to send, rate your planner, then share the wedding in numbers | phone | about 45 s | Host (Riya Sharma) | From the part on "How to rate your planner": The demo wedding has Utsav Planners linked. | | to make |
| V-4-wrap-up-3 | [[wrap-up]]: How to download, then delete | phone | about 35 s | Host (Riya Sharma) | The robot does not tap **Delete permanently**. It stops after the typing box appears. | | to make |

## Lane 5 · For planners and vendors · 48 videos · `5-business`

| ID | Task | First | Length | Login | Set up off camera | Real length | Status |
|---|---|---|---|---|---|---|---|
| V-5-bookings-1 | [[bookings]]: How to track a booking | desktop | about 30 s | Planner (Neha Desai, Utsav Planners) | Needs one booking: record it after the client accepts "Proposal for Meera Shah" (V-5-proposals-3). | | to make |
| V-5-bookings-2 | [[bookings]]: How to set a payment schedule, then raise an invoice from the schedule | desktop | about 40 s | Planner (Neha Desai, Utsav Planners) | Same booking as the first video. | | to make |
| V-5-business-home-1 | [[business-home]]: How to work through Needs you, then read Your weddings or Today's jobs | desktop | about 45 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-business-home-2 | [[business-home]]: How to open a wedding | desktop | about 30 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-calendar-1 | [[calendar]]: How to block time on your calendar | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-calendar-2 | [[calendar]]: How to spot double bookings, then set the most jobs you take in a day | desktop | about 45 s | Planner (Neha Desai, Utsav Planners) | Start with a **Blocked date** saved on the Sangeet day of the Sharma-Patel wedding. | | to make |
| V-5-challans-and-purchases-1 | [[challans-and-purchases]]: How to make a delivery challan | desktop | about 40 s | Vendor (Imran Shaikh, Rangoli Decor) | — | | to make |
| V-5-challans-and-purchases-2 | [[challans-and-purchases]]: How to add a purchase bill | desktop | about 40 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-clients-1 | [[clients]]: How to add a client | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-clients-2 | [[clients]]: How to add the people who decide and pay | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | Starts on the Shah family's page, made in the first video. | | to make |
| V-5-crew-and-shifts-1 | [[crew-and-shifts]]: How to add crew | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-crew-and-shifts-2 | [[crew-and-shifts]]: How to give someone a shift | desktop | about 30 s | Planner (Neha Desai, Utsav Planners) | Start with Mahesh Parmar on the crew list (end of V-5-crew-and-shifts-1). | | to make |
| V-5-crew-and-shifts-3 | [[crew-and-shifts]]: How to send the call sheet | desktop | about 30 s | Planner (Neha Desai, Utsav Planners) | Start with the shift from V-5-crew-and-shifts-2. The robot does not follow the WhatsApp link. | | to make |
| V-5-crew-and-shifts-4 | [[crew-and-shifts]]: How to give crew a private shift link | desktop | about 30 s | Planner (Neha Desai, Utsav Planners) | Start with Mahesh Parmar on the crew list. | | to make |
| V-5-crew-and-shifts-5 | [[crew-and-shifts]]: How to see your own shifts (crew) | phone | about 30 s | Crew shift link (no sign-in) | The robot opens the private shift link made in V-5-crew-and-shifts-4 in a new tab. | | to make |
| V-5-documents-1 | [[documents]]: How to upload a document | desktop | about 30 s | Planner (Neha Desai, Utsav Planners) | The robot uses a made-up PDF called "FSSAI licence (sample).pdf". | | to make |
| V-5-documents-2 | [[documents]]: How to get reminded before a document expires, then open or delete a document | desktop | about 45 s | Planner (Neha Desai, Utsav Planners) | Start with the licence from V-5-documents-1. From the part on "How to open or delete a document": Start with a second sample file saved as "Old brochure". | | to make |
| V-5-family-feedback-1 | [[family-feedback]]: How to read families' ratings | desktop | about 30 s | Planner (Neha Desai, Utsav Planners) | The demo has no rating yet. One made-up family rating, for example 5 out of 5 with a short note, must be saved before recording. | | to make |
| V-5-getting-around-the-portal-1 | [[getting-around-the-portal]]: How to use the (+) | phone | about 30 s | Planner (Neha Desai, Utsav Planners) | Record this one at phone size, because the (+) shows only below 1024 px wide. | | to make |
| V-5-getting-around-the-portal-2 | [[getting-around-the-portal]]: How to search pages and actions | desktop | about 30 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-getting-around-the-portal-3 | [[getting-around-the-portal]]: How to read your inbox | desktop | about 30 s | Vendor (Imran Shaikh, Rangoli Decor) | — | | to make |
| V-5-invoices-and-payments-due-1 | [[invoices-and-payments-due]]: How to raise an invoice | desktop | about 40 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-invoices-and-payments-due-2 | [[invoices-and-payments-due]]: How to log a payment | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | Setup, off camera: one issued invoice to "Sharma family" for ₹1,25,000, so the robot has something to log against. | | to make |
| V-5-invoices-and-payments-due-3 | [[invoices-and-payments-due]]: How to remind a client who owes you | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | Setup, off camera: one issued invoice to "Sharma family" for ₹1,25,000 with a due date 10 days ago. | | to make |
| V-5-invoices-and-payments-due-4 | [[invoices-and-payments-due]]: How to add your GST and bank details | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-leads-1 | [[leads]]: How to add a lead | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-leads-2 | [[leads]]: How to move a lead through the stages | desktop | about 30 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-leads-3 | [[leads]]: How to note a call or a meeting, then turn a lead into a client | desktop | about 45 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-planner-code-1 | [[planner-code]]: How to choose your planner code | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | Utsav Planners must have no planner code yet. | | to make |
| V-5-planner-code-2 | [[planner-code]]: How to link a planner (family side) | desktop | about 30 s | Host (Riya Sharma) | Before recording, end the link with Utsav Planners so the **Planner** box is empty, and use the code from the first video. | | to make |
| V-5-planner-code-3 | [[planner-code]]: How to approve or remove a planner (host side) | desktop | about 30 s | Host (Riya Sharma) | Before recording, have a request from Utsav Planners waiting. | | to make |
| V-5-planning-team-1 | [[planning-team]]: How to make someone a coordinator, then choose who leads | desktop | about 45 s | Planner (Neha Desai, Utsav Planners) | Off camera: Utsav Planners is linked to the Sharma-Patel wedding and has a second team member (staff) on it. | | to make |
| V-5-proposals-1 | [[proposals]]: How to build a proposal | desktop | about 45 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-proposals-2 | [[proposals]]: How to send a proposal to your client | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | Uses the draft "Proposal for Meera Shah" that the demo already has. | | to make |
| V-5-proposals-3 | [[proposals]]: How your client accepts or declines | desktop | about 35 s | Client (Meera Shah, made up) | Uses the link from the previous video. | | to make |
| V-5-quote-requests-1 | [[quote-requests]]: How to add a vendor to your vendor book | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | Before recording, the robot copies Rangoli Decor's **Business ID** from the vendor's Settings page. | | to make |
| V-5-quote-requests-2 | [[quote-requests]]: How to ask vendors for quotes | desktop | about 40 s | Planner (Neha Desai, Utsav Planners) | Start with Rangoli Decor already in the vendor book (end of V-5-quote-requests-1). | | to make |
| V-5-quote-requests-3 | [[quote-requests]]: How to send quotes to the client, then write a brief for a vendor | desktop | about 45 s | Planner (Neha Desai, Utsav Planners) | Start after V-5-quote-requests-4, so Rangoli Decor's quote shows as **Quoted**. From the part on "How to write a brief for a vendor": Rangoli Decor is already linked to the Sharma-Patel wedding, so its brief shows. | | to make |
| V-5-quote-requests-4 | [[quote-requests]]: How to send your quote (vendors) | desktop | about 35 s | Vendor (Imran Shaikh, Rangoli Decor) | Start after V-5-quote-requests-2, so a request is waiting for Rangoli Decor. | | to make |
| V-5-set-up-your-business-1 | [[set-up-your-business]]: How to set up a planner or vendor business | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-set-up-your-business-2 | [[set-up-your-business]]: How to find and share your Business ID, then switch between your wedding and your business | desktop | about 40 s | Planner (Neha Desai, Utsav Planners) | — | | to make |
| V-5-team-1 | [[team]]: How to see your team and roles, then remove someone | desktop | about 45 s | Planner (Neha Desai, Utsav Planners) | From the part on "How to remove someone": Start with one staff member on the team besides the owner. The seed does not add one yet. | | to make |
| V-5-team-2 | [[team]]: How to leave the business | desktop | about 30 s | Staff (Utsav Planners) | This needs a staff login in the demo data. The seed does not add one yet. | | to make |
| V-5-vendor-wedding-page-1 | [[vendor-wedding-page]]: How to read the brief, then mark the day | desktop | about 40 s | Vendor (Imran Shaikh, Rangoli Decor) | The planner must have written a brief for Rangoli Decor that is not yet read. | | to make |
| V-5-vendor-wedding-page-2 | [[vendor-wedding-page]]: How to use your tools | desktop | about 30 s | Vendor (Imran Shaikh, Rangoli Decor) | Reset the lane first, so the checklist is empty. | | to make |
| V-5-vendor-wedding-page-3 | [[vendor-wedding-page]]: How to add crew and deliverables | desktop | about 30 s | Vendor (Imran Shaikh, Rangoli Decor) | — | | to make |
| V-5-weddings-1 | [[weddings]]: How to ask to join a wedding, then cancel a request | desktop | about 35 s | Planner (Neha Desai, Utsav Planners) | Before recording, end Utsav Planners' link to the Sharma-Patel wedding, and read that wedding's ID from the seed output. | | to make |
| V-5-weddings-2 | [[weddings]]: How to leave a wedding | desktop | about 30 s | Planner (Neha Desai, Utsav Planners) | Reset the lane first, so the wedding is linked. | | to make |

## Old video IDs (before 3A merged tiny tasks)

The lanes' `_lane-status.md` files use the old IDs. Any old ID not listed here kept its number. `V-2-guest-short-link-2` was dropped: it repeated `V-1-wedding-id-and-code-3`.

| Old ID | New ID |
|---|---|
| V-1-data-and-privacy-2 | V-1-data-and-privacy-1 |
| V-1-data-and-privacy-3 | V-1-data-and-privacy-2 |
| V-1-data-and-privacy-4 | V-1-data-and-privacy-2 |
| V-1-data-and-privacy-5 | V-1-data-and-privacy-3 |
| V-1-data-and-privacy-6 | V-1-data-and-privacy-3 |
| V-1-members-4 | V-1-members-3 |
| V-1-your-account-3 | V-1-your-account-2 |
| V-2-guest-easier-to-read-2 | V-2-guest-easier-to-read-1 |
| V-2-guest-easier-to-read-3 | V-2-guest-easier-to-read-2 |
| V-2-guest-invite-card-2 | V-2-guest-invite-card-1 |
| V-2-guest-pass-and-contacts-2 | V-2-guest-pass-and-contacts-1 |
| V-3-expenses-and-payments-4 | V-3-expenses-and-payments-3 |
| V-3-family-feed-2 | V-3-family-feed-1 |
| V-3-family-feed-3 | V-3-family-feed-2 |
| V-3-notifications-5 | V-3-notifications-4 |
| V-4-assistant-2 | V-4-assistant-1 |
| V-4-assistant-3 | V-4-assistant-2 |
| V-4-check-in-3 | V-4-check-in-2 |
| V-4-counts-2 | V-4-counts-1 |
| V-4-counts-3 | V-4-counts-1 |
| V-4-emergency-card-2 | V-4-emergency-card-1 |
| V-4-event-day-4 | V-4-event-day-3 |
| V-4-family-passes-2 | V-4-family-passes-1 |
| V-4-food-3 | V-4-food-2 |
| V-4-live-run-sheet-2 | V-4-live-run-sheet-1 |
| V-4-live-run-sheet-3 | V-4-live-run-sheet-2 |
| V-4-referral-code-2 | V-4-referral-code-1 |
| V-4-seating-2 | V-4-seating-1 |
| V-4-seating-3 | V-4-seating-2 |
| V-4-seating-4 | V-4-seating-3 |
| V-4-voice-2 | V-4-voice-1 |
| V-4-voice-3 | V-4-voice-2 |
| V-4-wrap-up-2 | V-4-wrap-up-1 |
| V-4-wrap-up-3 | V-4-wrap-up-2 |
| V-4-wrap-up-4 | V-4-wrap-up-2 |
| V-4-wrap-up-5 | V-4-wrap-up-2 |
| V-4-wrap-up-6 | V-4-wrap-up-3 |
| V-5-bookings-3 | V-5-bookings-2 |
| V-5-business-home-2 | V-5-business-home-1 |
| V-5-business-home-3 | V-5-business-home-2 |
| V-5-calendar-3 | V-5-calendar-2 |
| V-5-documents-3 | V-5-documents-2 |
| V-5-leads-4 | V-5-leads-3 |
| V-5-quote-requests-4 | V-5-quote-requests-3 |
| V-5-quote-requests-5 | V-5-quote-requests-4 |
| V-5-set-up-your-business-3 | V-5-set-up-your-business-2 |
| V-5-team-2 | V-5-team-1 |
| V-5-team-3 | V-5-team-2 |
| V-5-vendor-wedding-page-2 | V-5-vendor-wedding-page-1 |
| V-5-vendor-wedding-page-3 | V-5-vendor-wedding-page-2 |
| V-5-vendor-wedding-page-4 | V-5-vendor-wedding-page-3 |
| V-5-weddings-2 | V-5-weddings-1 |
| V-5-weddings-3 | V-5-weddings-2 |
