---
tags: [guides, lane-status]
lane: 4
folder: 4-event-day-ai
made: 2026-11-14 (2D)
app: krama-celeb main, `git -C app pull` said "Already up to date"
---
# Lane 4 status · Event day, AI & voice

**Where I worked:** The session opened in `C:\Users\jayka\code\Guides`, which is empty. The real project is `C:\Users\jayka\code\krama-guides`, so I read and wrote there. Nothing was committed. I only wrote inside `guides\4-event-day-ai\`.

## Notes written

All 14 Lane 4 features have a note, and all are `status: draft`, `checked: no`. None is `planned`: everything in this lane is live. Reading level is grade 3.2 or lower for every note (limit 8). No em dashes, en dashes, exclamation marks, "workspace" or prices.

| Note | Video scripts |
|---|---|
| [[event-day]] | V-4-event-day-1 to 4 |
| [[live-run-sheet]] | V-4-live-run-sheet-1 to 3 |
| [[check-in]] | V-4-check-in-1 to 3 |
| [[family-passes]] | V-4-family-passes-1 to 2 |
| [[seating]] | V-4-seating-1 to 4 |
| [[counts]] | V-4-counts-1 to 3 |
| [[food]] | V-4-food-1 to 3 |
| [[emergency-card]] | V-4-emergency-card-1 to 2 |
| [[function-recap]] | V-4-function-recap-1 |
| [[wrap-up]] | V-4-wrap-up-1 to 6 |
| [[assistant]] | V-4-assistant-1 to 3 |
| [[voice]] | V-4-voice-1 to 3 |
| [[notes-from-a-meeting]] | V-4-notes-from-a-meeting-1 |
| [[plan-and-add-ons]] | V-4-plan-and-add-ons-1 |
| [[referral-code]] | V-4-referral-code-1 to 2 |
| [[moments]] | V-4-moments-1 |

That is 42 video scripts. Also written: `_section-intro.md` (English and Hinglish).

**Video checks:** Every script has at most 8 steps, captions of 8 words or fewer, and hold times that add up to 27 s or more. With the 3 s title and 3 s end card, each video should run 30 s or more. The final length depends on the voice, so 3B and 4A should time each line.

## Where I deviated from the inventory

- **Plan & add-ons:** I wrote only "How to see your plan and what is included". I **left out "download an invoice"**. Buying is off sale, so nobody can have an invoice, and the list always says "No invoices yet". Add it when payments open.
- **Notes from a meeting:** the inventory names a button **Notes from a meeting**. The real label on the Tasks page is **From a meeting**. The note's file name stays `notes-from-a-meeting`, as in the README.
- **Voice, "speak into a form":** the microphone exists in only two places, the assistant box and the meeting notes. I wrote it that way.
- **Moments:** it has no task in the inventory, so I wrote "What the moment cards mean" with one video.

## Features and tasks the inventory missed

1. **Wrap-up has five steps, and the inventory lists four tasks.** The **Thank-yous** step (envelopes and gifts not yet thanked, with **See all** in Shagun) was missing. I added it as a task with a video.
2. **Seating, near the front:** each waiting family has a toggle to sit **Near the front**. Tables can also be locked and renamed. Locks are in the note. "Near the front" is not. 3A may want a task for it.
3. **Check-in screen extras:** the door screen shows a late banner when the function is running late, a one-tap **Emergency** strip (**Show**, **Open the full card**) and a **Food** line with the expected count. I did not cover these.
4. **Menu freeze:** the food page can show a freeze banner. Dishes and the note can't change, but the guaranteed plates can. It is one **Stuck?** line in [[food]].
5. **Counts, "By function":** the whole-wedding page lists each function with a link. Small, but not in the inventory.
6. **Assistant:** it has about 20 fixed questions, not 3. The note names the three the inventory lists and says "pick a card, like".
7. **Family feedback for planners** (a business screen) is part of Wrap-up but belongs to Lane 5 (`family-feedback`).

## Things in the app that look wrong (for a 6B app session)

- **The recap has no permanent link.** [[function-recap]] opens only from the **See how it went** moment card. A card shows once, within about 7 days of the function ending, and goes away after **Got it**. After that, nobody can reach the recap. A link on the function's page would fix this.
- **The "wedding in numbers" card says "Krama Celebrations"** at the bottom (`Wrapup.numbers.cardFoot`). The brand is Krama Events. The card is posted to the family feed, so families will see it.
- **Referral reward text:** the app says the reward starts working "when the assistant launches" (`Codes.referral.reward.unlocked`). The assistant is already live in the pilot. The line is confusing.
- **Plan & add-ons lists "WhatsApp invites and reminders"** as an add-on, and during the pilot it shows **On**. Krama doesn't send WhatsApp messages by itself, and the WhatsApp API is not built. The guides never mention it. A reader may still ask.

## Needed before recording (for 3B, Wave 5)

- **The demo wedding is about 3 months away.** Several things only work close to a function's date:
  - Run sheet **Start** and **Done** work from 6 hours before a function to 6 hours after.
  - The **That's {name} done.** card needs a function that ended in the last 7 days.
  - **Wrap-up** opens the day after the last function.
  - Check-in and event-day copies expire 12 hours after a function ends.
  The robot needs a day-shifted copy of the demo data, or a clock shift.
- **The AI must be online.** Typed questions, voice and meeting minutes all stop when `AI_*` is not set. The cards still work. [[assistant]] videos 1 and 3, [[voice]] and [[notes-from-a-meeting]] need it. Status says typed questions use the free tier, 400 a day.
- **Fake microphone and camera.** [[voice]] needs a pre-recorded clip. [[check-in]] shows **Scan pass** but the script uses **Find family**, so the camera isn't needed.
- **Offline.** [[event-day]] video 3 needs the robot to switch the network off and on.
- **Wrap-up delete:** [[wrap-up]] video 6 stops before **Delete permanently**. The robot must not delete the demo wedding.
- **Helper view:** all scripts use the couple login. The helper's door view is written in the guide but not recorded.

## Checked from code only

Everything was written from the code and `messages\en.json`. Wave 5 should check these on the real app:
- Where **Ratios** sits on the counts page.
- That a helper finds check-in through **Event day** on the bottom bar.
- That **Put on door** needs the helper to be a member first.
- The exact label next to a moment card's next step (**Got it**).
- The **Live counter** option on a dish.

## Questions for you

1. **Hinglish lines:** Should someone who speaks Hinglish read the "Voice says" lines? I wrote them simply, with all button names in English, but I can't judge the tone.
2. **Invoices:** OK to leave out "download an invoice" until payments open?
3. **WhatsApp add-on row** on Plan & add-ons: do you want it hidden in the app, or is it fine?
4. **App problems:** written up in `_needs-app-changes.md` (owner decisions, not selectors). Tell me which, if any, should go to an app session.
5. **Seating, "near the front":** do you want it as its own task and video?
