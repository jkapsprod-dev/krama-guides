---
tags: [guides, lane-status]
lane: 1
written: 2026-11-14 (2A)
app: krama-celeb main (pulled 14 Nov 2026)
---
# Lane 1 · Getting started · status

Nothing is committed. All files are in `guides\1-start\`. I worked in `C:\Users\jayka\code\krama-guides`, because the session folder `C:\Users\jayka\code\Guides` is empty (see Questions, 1).

## Notes written

20 notes, 71 video scripts, plus `_section-intro.md`. All are `status: draft` and `video: script`. None is `planned`, because every Lane 1 feature is live.

| Note | Tasks and videos |
|---|---|
| create-an-account | 2 |
| sign-in-and-passwords | 4 |
| your-account | 3 |
| join-the-wedding | 2 |
| set-up-your-wedding | 4 |
| your-weddings-and-switching | 3 |
| getting-around | 4 |
| home | 3 |
| journey | 2 |
| wedding-sheet | 3 |
| functions | 5 |
| tasks | 4 |
| run-sheets | 3 |
| plan | 6 |
| members | 4 |
| personalise | 6 |
| language | 1 |
| wedding-id-and-code | 3 |
| data-and-privacy | 6 |
| leave-or-delete-account | 3 |

**Checks run**
- `node tools\reading-level.mjs guides\1-start`: every note is grade 1.7 to 3.9 (limit 8).
- No em dashes, en dashes or exclamation marks in any note.
- No "workspace", "Oops" or old brand name in the guide text.
- Every bold name was matched against `app\messages\en.json`. The only difference is **Add these**, which is a plural button ("Add these 5 items").
- All 71 videos are 30 to 90 seconds including the 3-second title and end card. Captions are at most 8 words, and every hold is long enough for its voice line.
- I raised many hold times and fixed the "about N s" labels so they match the tables. Short tasks have long holds on the result row.

**Choices to know about**
- The template's inline YAML comments are left out of the frontmatter.
- Some tasks in the inventory were split so no task has more than 6 steps (for example Personalise has 6 tasks, set-up has 4).
- The "Voice says" lines are Hinglish in Roman letters. Everything else is English.
- Videos use fresh made-up `example.test` accounts for sign-up, passwords, devices and delete tasks, so the demo logins stay untouched. Destructive tasks stop before the final confirm button.

## Where the code differs from the inventory or the help articles

The notes follow the code.

- **Set-up wizard:** there is no **Skip** button on the helpers step. You tap **Next**. The wizard has 9 questions and a review.
- **Retention reminders:** the app says 30, 7 and 3 days. The help article says 72 hours.
- **Members page:** only hosts and planners can open it. `NAVIGATION.md` says family can read it.
- **Settings:** only hosts and planners can open it, so family can't see the Wedding ID or Data & privacy. Only a host can choose or change the wedding code and the short link.
- **Account switcher:** on a computer the button reads **Switch account**. **Switch wedding or account** is only the sheet title. It shows only for a wedding plus a business, or two businesses. With weddings only, use **More**, then **Switch wedding**.
- **(+) button:** phone only. A computer has none.
- **Add a function and New task:** these buttons are computer only. On a phone, use the (+) menu.
- **Board** on Tasks shows only on a computer, so that video is desktop first.
- **Set the muhurat:** there is no button on Run sheets. It is set in the function's **Rituals** tab.
- **Journey and Wedding Sheet:** not in the sidebar. They are under **Plan** in **More**, and in the Home switch (**Dashboard**, **Journey**, **Sheet**). Only tasks and payments can be moved on Journey, not functions.
- **New link and Copy invite link:** only on WhatsApp invites. An email invite must be cancelled and sent again.
- **Remove a member:** a bin icon labelled **Remove {name}**, then **Yes, remove**.
- **Home:** the Replies card's title is **RSVPs by function**.

## Features the inventory missed

- **Planning team** panel on Members (**Make coordinator**, **Make planner**, **Make lead**). It shows when a planner business is linked. It belongs in Lane 5.
- **Plan > Wrap-up** tab. It belongs in Lane 4.
- **Personalise** also has **Spacing** (**Comfortable**, **Compact**), **Sidebar** (**Full**, **Icon rail**) and **Reset to wedding defaults**. I covered them in the personalise note.
- **Show password** on the sign-in page, and automatic joining when someone signs in with the invited email. Both are in the notes.
- **Function page:** **Print the schedule** and an **Overview** tab are not covered.
- **Wedding Sheet:** editing its **Introduction**, and each function's **Line for the Sheet**.
- **Guests can pick a language** on their RSVP page. Lane 2 should own it.
- **Referral code** also sits on the Codes & planner page. Lane 4 covers it.
- Journey and Wedding Sheet are also open to helpers and viewers through **More**. I did not check what they see.

## Questions for you

1. **Folder:** this session opened in the empty `C:\Users\jayka\code\Guides`. I wrote to `krama-guides` because that is where `app\` and `guides\` are. Is that right?
2. **Old brand name in the app:** the WhatsApp and email invite messages from Members still say "Krama Celebrations" (`Members.whatsAppMessage`, `emailSubject`). This needs an app fix in 6B. The guides don't quote the message.
3. **Demo data the videos need** (add to the lane 1 seed if you agree):
   - Planner Neha with two weddings, or a wedding plus a business (switching videos).
   - A spare active member, Mausi Patel, and an expired WhatsApp invite (`members-2`, `members-4`).
   - A Krama support request (`data-and-privacy-5`).
   - A paste target for the Wedding ID (`wedding-id-and-code-1`).
4. **Fresh accounts:** are fresh `example.test` accounts fine for sign-up, password, devices and delete videos? The **Set a password (optional)** video needs an account that came in by email link, because accounts made with a password never see it.
5. **Roles:** most videos record as the host (Riya Sharma). `tasks-2` uses helper Kavya. Tell me if any should use the planner instead.
6. **Alerts widget:** Home's **Add widget** list still offers the "Coming soon" **Alerts** card. I left it out of the guide. Is that right, or should the app hide it?
7. **Help article fixes:** the website text still has the **Skip** step and "72 hours". Should 3A fix the articles, or leave them?
