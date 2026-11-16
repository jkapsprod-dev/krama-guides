---
tags: [guides, lane-status]
lane: 5
folder: 5-business
written: 2026-11-14
updated: 2026-11-16 (Wave 5, lane 5)
---
# Lane 5 status · 5-business

**Wave 5 stopped part way, on Jay's say-so (16 Nov).** 29 of the 48 videos are finished in both sizes. Nothing is committed. The app is still running.

## What is done

- **5 notes are `status: final`, `checked: 2026-11-16`, `video: made`**, with real timings in their script tables: `leads` (3 videos), `clients` (2), `calendar` (2), `business-home` (2) and `getting-around-the-portal` (3). Each step was followed on the running app, as Neha Desai (planner) or Imran Shaikh (vendor) in lane 5.
- **29 videos have both a phone and a desktop file** in `videos\final\5-business\`, with `.srt` files and `voiceover\<ID>.md`:
  - leads 1 to 3, clients 1 to 2, calendar 1 to 2, business-home 1 to 2, getting-around-the-portal 1 to 3
  - set-up-your-business 2, weddings 2, planner-code 1 and 3, documents 1
  - invoices-and-payments-due 1 and 4, challans-and-purchases 1
  - crew-and-shifts 1, 3, 4 and 5, proposals 2, quote-requests 3 and 4
  - vendor-wedding-page 1 and 3
  - I looked at frames from the first few: highlights, captions and voice timing were right.
- **Specs written for 44 videos** in `recorder\specs\5-business\` (`_lib.mjs` holds the shared helpers). They use role and label selectors only. The voice lines are in `voiceover\ai\`.
- The reading-level check passes: every note is grade 2 to 5 (limit 8).

## What is not done

| State | Videos | What is left |
|---|---|---|
| **Recorded in both sizes, not rendered yet** | challans-and-purchases-2 (phone is rendered), crew-and-shifts-2, proposals-1, quote-requests-1, quote-requests-2, vendor-wedding-page-2, invoices-and-payments-due-2 | `npm run make -- --id <ID> --no-record` in `kit\`. invoices-2 was recorded again after I changed its last voice line (see below), and its old files were deleted |
| **Specs fixed, take not yet clean** | set-up-your-business-1, weddings-1, planner-code-2, documents-2, invoices-and-payments-due-3, proposals-3, bookings-1, bookings-2 | `npm run make -- --id <ID> --no-render`, look at the take, then render. The last tries failed on a seed or page time-out (the PC and database were busy with other lanes), not on a missing label |
| **Blocked: no way to make the data** | team-1, team-2, planning-team-1, family-feedback-1 | See [[_needs-app-changes]] |
| **Section intro** | `npm run intro -- --lane 5` | Not made. First reformat `_section-intro.md` like lane 2's (rows **Section name (on screen)**, **One short line (on screen)**, **Voice says**), because the kit reads those labels |

The notes with videos still to make (`bookings`, `challans-and-purchases`, `crew-and-shifts`, `documents`, `family-feedback`, `invoices-and-payments-due`, `planner-code`, `planning-team`, `proposals`, `quote-requests`, `set-up-your-business`, `team`, `vendor-wedding-page`, `weddings`) stay `status: draft`, `video: script`. Their finished videos already have real timings in the tables. Once the last video of a note is made, set its status to final and `checked` to that day.

## Changes I made to the guides after following them in the app

- **set-up-your-business:** video 1 uses the host login (Riya Sharma, who has a wedding and no business). A planner or vendor who already has a business is taken straight to it, so Neha can't show the form. The guide now says a host with one wedding clicks **Your weddings** at the top of the sidebar to see the list. The **Set up another business** tip now says it only shows with two or more businesses.
- **calendar:** **From** starts on today, not on the day you clicked. Step 4 now says so.
- **invoices-and-payments-due:** an invoice with a ₹1,25,000 rate has GST added, so ₹50,000 paid leaves ₹97,500, not ₹75,000. The last voice line of video 2 no longer says an amount. Video 3 ends on the **Open in WhatsApp** button (the robot never opens WhatsApp), and **Prepare a reminder** is a closed panel, not a button.
- **planner-code:** a used planner code is kept for good (the old one still works for 30 days), so each take of the videos uses a new code. The video shows a code like UTSAV-K4Z9Q, not UTSAV-WEDDINGS. After a host removes a planner, the **Planner** card shows the **Have a planner code?** box, not "No planner linked."
- **Robot does rows:** where the video starts on business Home (leads, clients, crew, documents, challans, purchases, invoices, proposals, quote requests, bookings), row 0 now says "Show business Home". Several rows were reworded to match what the robot does.

## Things you should know

1. **Working folder.** The session's folder was empty, so I used `C:\Users\jayka\code\krama-guides`. I wrote only to the guides, images, specs, raw and final videos and voice files for lane 5.
2. **Off-camera data.** Everything is set up through the app's own screens (the robot signs in as the planner, vendor or host in a private window, or signs a made-up client up through the sign-up page and the local mail catcher). The only exceptions are the four blocked videos. I tried to add a second team member and a family rating directly to the local database, and the system declined, so I left them for an app session.
3. **Hinglish voice.** The voice spells some English words oddly in Devanagari, for example "Stage" is read as "स्तगे", "Leads" as "लेअद्स", "Lead history" as "लीड हिस्तोर्य". Fixing it means adding words to `kit\voice\hinglish-words.json`, which is not a lane 5 file. Each video's `voiceover\<ID>.md` lists its words under **Check these words**.
4. **Speed.** Each video took 15 to 30 minutes, because other lanes were recording and rendering on the same PC. Seeds sometimes failed with a rate limit ("retry after a moment") and then worked on the next try.
5. **Screens.** Screenshots for each step are in `guides\img\<note name>\`, refreshed by each recording. The inbox page is titled **Notifications** (the bell is named **Inbox**). The business (+) sheet is still titled "Add to your wedding" (in `_app-fixes`).
6. **Commit.** Nothing is committed. 6A should leave out the video, audio and `.srt` files.

## Possible app problems (unchanged from the first pass)

1. **Vendors can see Ask for a wedding**, but a host's **Codes & planner** lists planners only. A vendor's request would wait with nobody able to approve it.
2. **Commission page** says "Krama pays it out". Our rule says Krama never moves money.
3. **Proposal.donePlanner** still says "workspace".
4. **Leads empty state** mentions the enquiry form, which is not live.
5. **The business (+) sheet title** reads "Add to your wedding".
6. **New:** the Team page says invites come later, so a business can't add a second person yet. Four videos wait for that.
