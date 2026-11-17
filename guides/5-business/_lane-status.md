---
tags: [guides, lane-status]
lane: 5
folder: 5-business
written: 2026-11-14
updated: 2026-11-17 (Wave 5, lane 5)
---
# Lane 5 status · 5-business

**43 of the 48 videos are made, in both sizes, and 15 of the 19 notes are `status: final`.** The section intro is made. One video waits on a rate limit, and four wait on demo data the app can't create. Nothing is pushed.

## What is done

- **15 notes are `status: final`, `checked: 2026-11-16` or `2026-11-17`, `video: made`**, with the real timings in their script tables: `bookings`, `business-home`, `calendar`, `challans-and-purchases`, `clients`, `crew-and-shifts`, `documents`, `getting-around-the-portal`, `invoices-and-payments-due`, `leads`, `proposals`, `quote-requests`, `set-up-your-business`, `vendor-wedding-page` and `weddings`. Every step was followed on the running app, as Neha Desai (planner), Imran Shaikh (vendor) or Riya Sharma (host) in lane 5.
- **43 videos** are in `videos\final\5-business\` as `-phone.mp4` and `-desktop.mp4`, each with an `.srt`, and `voiceover\<ID>.md` has the timings. I looked at frames from several of them: highlights, captions and voice timing were right.
- **Section intro:** `V-5-section-intro-phone.mp4` and `-desktop.mp4` (7.5 s, because the voice line is long). `_section-intro.md` is now in the same format as lane 2's.
- **Specs for all 44 recordable videos** are in `recorder\specs\5-business\` (`_lib.mjs` holds the shared helpers). They use role and label selectors only. Nothing in `app\` was changed.
- Every note is grade 2 to 5 on the reading-level check (limit 8). Every video file plays.

## What is not done

| Video | State | What it needs |
|---|---|---|
| **planner-code-2** (host links a planner) | Spec is fixed, but the take can't run today | The app allows 5 planner-code saves per person per day (`code_change`, resets at 05:30 IST, midnight UTC), and Neha's five for 17 Nov are used up by the earlier takes and retries. After 05:30 IST on 18 Nov run `npm run make -- --id V-5-planner-code-2` in the `kit` folder (it records and renders both sizes). Do not retry before then: each try counts. The note `planner-code` stays `draft` until this video is made |
| **team-1, team-2, planning-team-1, family-feedback-1** | Blocked, no spec run | See [[_needs-app-changes]]: the app has no screen to add a second team member, and a family rating only opens after the wedding |

## Section label

Every video shows **For planners and vendors** above the screen (the `section:` line in `_section-intro.md`). The 20 videos made before I set it were all rendered again on 17 Nov, so none still says "5-BUSINESS".

## Changes I made to the guides after following them in the app

- **set-up-your-business:** video 1 uses the host login (Riya Sharma, who has a wedding and no business). A planner or vendor who already has a business is taken straight to it, so Neha can't show the form. The guide says a host with one wedding clicks **Your weddings** at the top of the sidebar to see the list, and that **Set up another business** shows only with two or more businesses.
- **calendar:** **From** starts on today, not on the day you clicked.
- **invoices-and-payments-due:** an invoice with a ₹1,25,000 rate has GST added, so ₹50,000 paid leaves ₹97,500, not ₹75,000. The last voice line of video 2 no longer says an amount. Video 3 ends on the **Open in WhatsApp** button (the robot never opens WhatsApp), and **Prepare a reminder** is a closed panel, not a button.
- **planner-code:** a used planner code is kept for good (the old one still works for 30 days), so each take uses a new one, like UTSAV-K4Z9Q. After a host removes a planner, the **Planner** card shows the **Have a planner code?** box, not "No planner linked."
- **Robot does rows:** where the video starts on business Home, row 0 now says "Show business Home". Several other rows were reworded to match what the robot does.

## Things you should know

1. **Working folder.** The session's folder was empty, so I used `C:\Users\jayka\code\krama-guides`. I wrote only to the guides, images, specs, raw and final videos and voice files for lane 5.
2. **Off-camera data** is set up through the app's own screens. The robot signs in as the planner, vendor or host in a private window, and signs a made-up client up through the sign-up page and the local mail catcher. The only gaps are the four blocked videos. I tried to add a second team member and a family rating straight into the local database, and the system declined, so I left them for an app session.
3. **Hinglish voice.** The voice spells some English words oddly in Devanagari, for example "Stage" is read as "स्तगे", "Leads" as "लेअद्स", "Lead history" as "लीड हिस्तोर्य". Fixing it means adding words to `kit\voice\hinglish-words.json`, which is not a lane 5 file. Each video's `voiceover\<ID>.md` lists its words under **Check these words**.
4. **Speed and failures.** Each video took 15 to 30 minutes, because other lanes were recording and rendering on the same PC. Seeds sometimes failed with a rate limit and then worked on the next try.
5. **Screens.** Screenshots for each step are in `guides\img\<note name>\`, refreshed by each recording. The inbox page is titled **Notifications** (the bell is named **Inbox**). The business (+) sheet is still titled "Add to your wedding" (in `_app-fixes`).
6. **Commit.** 6A should leave out the video, audio and `.srt` files.

## Possible app problems (unchanged from the first pass)

1. **Vendors can see Ask for a wedding**, but a host's **Codes & planner** lists planners only. A vendor's request would wait with nobody able to approve it.
2. **Commission page** says "Krama pays it out". Our rule says Krama never moves money.
3. **Proposal.donePlanner** still says "workspace".
4. **Leads empty state** mentions the enquiry form, which is not live.
5. **The business (+) sheet title** reads "Add to your wedding".
6. **New:** the Team page says invites come later, so a business can't add a second person yet. Four videos wait for that.
