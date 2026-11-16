---
tags: [guides, lane-status]
lane: 4
folder: 4-event-day-ai
made: 2026-11-14 (2D)
updated: 2026-11-16 (Wave 5, lane 4)
app: krama-celeb main @ 4fb01ef6 (the copy in `app\`, run in recording mode)
---
# Lane 4 status · Event day, AI & voice

**Where I worked:** the session opened in the empty `C:\Users\jayka\code\Guides`. The project is `C:\Users\jayka\code\krama-guides` (3A said so), so I read and wrote there. Nothing is committed.

## Result

- **16 notes** checked on the running app and set to `status: final`, `checked: 2026-11-16`. 13 are `video: made`; the 3 AI notes are `video: script`. Reading level: every note is grade 3.2 or lower. No dashes or exclamation marks in the notes.
- **22 videos** are final, and **5 wait for a real AI** (see below). Each is made in phone and desktop, with `.srt` files, in `videos\final\4-event-day-ai\` (33 to 63 s). Raw takes and timings are in `videos\raw\4-event-day-ai\`. Specs are in `recorder\specs\4-event-day-ai\`. Each note's script table now has the real step lengths (phone) and the real video length in the heading.
- **Section intro** made: `V-4-section-intro-phone.mp4` and `-desktop.mp4` (7.0 s). I rewrote `_section-intro.md` as a table, like lane 2's, because the intro command reads that format.
- I looked at frames of about ten videos (live run sheet, event day offline, voice, seating, wrap-up, emergency card on desktop and others). Highlights and captions were in the right place. I did not look at every frame of every video.

## Real lengths (phone)

| Video | s | Video | s | Video | s |
|---|---|---|---|---|---|
| assistant-1 | 43 | event-day-3 | 63 | referral-code-1 | 43 |
| assistant-2 | 33 | family-passes-1 | 49 | seating-1 | 38 |
| check-in-1 | 33 | food-1 | 39 | seating-2 | 46 |
| check-in-2 | 45 | food-2 | 45 | seating-3 | 35 |
| counts-1 | 44 | function-recap-1 | 33 | voice-1 | 46 |
| emergency-card-1 | 52 | live-run-sheet-1 | 45 | voice-2 | 46 |
| event-day-1 | 41 | live-run-sheet-2 | 40 | wrap-up-1 | 42 |
| event-day-2 | 33 | moments-1 | 33 | wrap-up-2 | 50 |
| | | notes-from-a-meeting-1 | 44 | wrap-up-3 | 34 |
| | | plan-and-add-ons-1 | 38 | | |

I did not touch `guides\_video-list.md` (not in my paths). 3A or 6A can copy these into its **Real length** and **Status** columns.

## Things Jay should know

1. **Five videos wait for a real AI (Jay, 16 Nov: "Wait for real AI").** [[assistant]], [[voice]] and [[notes-from-a-meeting]] are `status: final` (the steps are checked) but `video: script`. I moved their 20 test files to `videosinal-event-day-ai_stand-in-ai-not-for-handover` so they are not handed over. Once the recording app has a real AI, record these five again with `npm run make -- --id V-4-assistant-1,V-4-assistant-2,V-4-voice-1,V-4-voice-2,V-4-notes-from-a-meeting-1`, set `video: made`, and delete that folder. The take with the stand-in AI is described next.

   **How the test takes were made.** They were recorded against a stand-in AI, not a real one. The recording app has no AI (`AI_BASE_URL` is empty), so the assistant's typed box, the answer language, the microphone and meeting notes are switched off. For [[assistant]] (both videos), [[voice]] (both) and [[notes-from-a-meeting]] I ran a second copy of the app on port 3410 with a small rule-based stand-in (`recorder\specs\4-event-day-ai\_stand-in-ai.mjs`, `_ai-on.mjs`, `_ai-off.mjs`). It only sorts a typed sentence into one of the 20 fixed questions, turns a short note into a task or arrival, and splits meeting notes into minutes and tasks. The assistant's answers themselves come from the app and the demo wedding, as in the live app. The microphone is a pretend one, and the "spoken" sentences are queued by the spec. No file in `app\` changed. Both helpers are stopped now. If Jay wants real AI answers on camera, record these five again against a real AI.
2. **`V-4-wrap-up-2` shows "Krama Celebrations"** on the wedding-in-numbers card (known, [[_app-fixes]] item 1). Record it again after that fix.
3. **A developer's end-to-end test run shares the local database** and wiped lane 4's demo wedding several times, and the machine was at 100% CPU while other lanes rendered. About a dozen takes failed on slow pages or a wiped wedding. I added longer waits to six specs and recorded those takes again. All 27 videos were recorded in both sizes.
4. **Hinglish words.** The kit spelled many words by rule, so some may sound off. Each `voiceover\V-4-*.md` lists them under **Check these words**. The most worth fixing in `kit\voice\hinglish-words.json` (I did not edit that shared file): event, voice, aaram, chalao, pooch, aspataal, plates, guarantee, deliverables, settle, microphone, recording, undo, referral, seating. Jay's spot-check should start with the section intro (it says "Event day, AI aur voice").
5. **The wedding date.** The demo wedding is in February 2027, so everything that needs a nearby date is shifted off camera, through the local database only, by `_lib.mjs`: the Mehendi or Sangeet is moved to today (event day, run sheet, offline), the Mehendi to yesterday with ticks and check-ins (recap, moment card), and all functions into the past (Wrap-up). Tables, a run sheet, a made-up friend's referral code (ANJALI-DHRUV27) and the like are also added there.

## What I changed in the notes (the app did not match)

- [[referral-code]]: on a phone **Codes & planner** is under **More**, not **Settings**. Video code is ANJALI-DHRUV27, and the button says **Copied** after **Copy code**.
- [[plan-and-add-ons]]: the add-on rows are **Base plan**, **WhatsApp invites and reminders**, **Photo gallery**, **Face search** and **AI assistant** (voice and meeting notes come with it). Not "voice" and "meeting notes" as separate rows.
- [[wrap-up]]: **See all** in **Shagun** shows only when more than 10 thank-yous wait. Each entry has **Mark thanked** and **Draft a message**. **Prepare export** says Krama tells you in **Notifications** when it is ready. The video shows that message (the export job does not run locally).
- [[check-in]]: the Mehta family video checks in 3 people (**Check in 3**, **3 of 74 arrived**), not 4.
- [[family-passes]]: it is the **Anil Sharma family**. **New pass** asks with the browser's own box (see [[_needs-app-changes]]).
- [[live-run-sheet]]: the key moment is "Bride's mehndi" on the Mehendi, not the pheras. After the move the page shows **2 items moved. Undo** and a **Running 30 min late** banner with **Undo the last 30 min**. The video ends on the new times.
- [[event-day]]: after **End event-day mode on this phone** the page says "Event-day mode has ended, and its copy has left this phone."
- [[food]] (**Guarantee by** is a date, set in the video), [[counts]], [[emergency-card]], [[seating]]: the video ends on the print page, not a print preview (the robot's browser has no print window).
- [[moments]] and [[function-recap]]: the function is called **Mehendi** in the app. Home shows the "That's Mehendi done." card first, so the moments video starts on Home with the card.
- [[voice]]: the guest in a note must be in the guest list, so the video uses Anil Kapoor.
- [[notes-from-a-meeting]]: the page says **From a meeting BETA**. The video unticks one task, so it ends on "Minutes saved with 2 tasks."
- [[assistant]]: in Hindi the cards are in Hindi too, so the language video taps the first card.

## Things in the app that look wrong (for an app session)

All earlier items stay in [[_app-fixes]]. New this time:

- **Family passes, New pass** uses `window.confirm`. An in-app confirm box would show on video and match the rest of the app.
- **Wedding in numbers card** says "Krama Celebrations" (already listed).
- The recap and card say "That's Mehendi done." with a straight apostrophe while the app elsewhere uses curly ones. Cosmetic.

## Not done or not checked

- The helper's door view and the helper and planner roles are in the guides but not recorded (all videos are the host, as agreed in 3A).
- **Scan pass** on check-in shows in the video but the camera is never used.
- **Download** on Wrap-up is never on camera (export job does not run locally).
- The Hinglish lines were recorded as written (Jay spot-checks).

## Questions for you

1. (Answered: wait for a real AI.) When will the recording app have one?
2. May I add the words above to `kit\voice\hinglish-words.json`, or should 4A do it?
3. Should `_video-list.md` get these real lengths from 3A or 6A?
