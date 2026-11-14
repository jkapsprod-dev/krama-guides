---
tags: [guides, lane-status]
lane: 2
written: 2026-11-14 (2B)
app: krama-celeb main, "Already up to date" at pull time
---
# Lane 2 status · Guests & invitations

## Result

- **19 notes written** in `guides\2-guests\`, plus `_section-intro.md`. All 19 are `status: draft`, `checked: no`, `video: script`.
- **63 video scripts** (V-2-<note>-<n>), each 30 to 90 s, at most 8 steps, captions 8 words or fewer, Voice says in Hinglish.
- **Nothing is `planned`.** Every Lane 2 feature is live in the code. Several are opt-in (see below).
- **Reading level:** `node tools\reading-level.mjs guides\2-guests` passes. Highest grade is 4.5 (personal-messages).
- **Labels:** every bold button, tab and label was checked against `app\messages\en.json` with a script, and none are missing. The same script found no dashes, exclamation marks, "workspace", "events" or prices.
- **Not checked on the running app.** Everything comes from the code and `en.json`. Wave 5 does the real check.
- Nothing committed. Only `guides\2-guests\` was written.

## Notes written

| Note | Tasks | Videos | Who |
|---|---|---|---|
| guest-list | 5 | 5 | couple, family, helper, planner |
| add-a-guest | 5 | 5 | couple, family, planner |
| import-guests | 3 | 3 | couple, family, planner |
| send-rsvp-links | 4 | 4 | couple, family, planner |
| invitations-and-reminders | 3 | 3 | couple, family, planner |
| personal-messages | 3 | 3 | couple, family, planner |
| automations-and-to-send | 3 | 3 | couple, family, planner (opt-in) |
| invite-qr | 3 (one is guest side) | 3 | couple, family, planner, guest |
| headcounts-and-reports | 3 | 3 | couple, family, planner |
| stays-and-rooms | 5 | 5 | couple, family, planner |
| arrivals-and-departures | 4 | 4 | couple, family, helper, planner |
| tickets-from-guests | 3 (one is guest side) | 3 | couple, family, planner, guest (opt-in) |
| pickups | 5 (one is for the driver) | 5 | couple, family, helper, planner |
| guest-rsvp-page | 3 | 3 | guest |
| guest-easier-to-read | 3 | 3 | guest |
| guest-invite-card | 2 | 2 | guest |
| guest-remove-my-details | 2 | 2 | guest, couple |
| guest-short-link | 1 guest, 1 for the couple | 2 | guest, couple (opt-in) |
| guest-pass-and-contacts | 2 | 2 | guest, couple |

## Where the live app differs from the inventory

The notes follow the code. 3A should fix the inventory.

- **Automations send some emails by themselves.** **Reply-by date passed**, **Payment due in 3 days** and **Function time changed** can email on their own once switched on. This breaks the "you press send" rule, so the note says so plainly. WhatsApp is always click to send.
- **Guests page has no summary tiles any more.** It has a reply bar: **Coming**, **Can't come**, **Waiting**. The filter chips are still **Attending**, **Awaiting**, **Declined**. The help article `see-who-is-coming` is out of date here.
- **Remind button** is **Remind the {count} waiting**, and shows only while someone is waiting. It is not under **More**.
- **Reports buttons** are **CSV**, **Excel**, **PDF**. **Download CSV** is only on **Headcounts**.
- **Mark arrived** shows as **Expected**, turning into **Arrived**. "Mark {name} arrived" is only the screen-reader label.
- **Pickups:** **Suggest runs** then **Make these runs**; each run still needs a vehicle and driver added through **Edit**. A driver gets a link only after being picked as a run's **Driver**. Drivers come from **Money**, **Vendors**, or members.
- **Add guest** header button is hidden on a phone: use (+), **Add a guest**.
- **RSVP for {name}** is also a screen-reader label. On screen it is a drop-down with **Attending**, **Declined**, **Maybe**, **Not sent**.
- **Menu item** is **Stays & Travel**, but the page title and first tab are **Stays & rooms**.
- **Help articles to fix before reuse:**
  - add-guests-from-excel says the file "is read in your own browser". Rows are sent to the server for the duplicate check.
  - send-rsvp-links says links keep working after the reply-by date, and that Remind has a **Send by** choice. Links stop one day after the last function.

## Opt-in or conditional (the notes say how to switch each on)

- Automations (every rule starts off; host or planner).
- Tickets from guests (**Let guests send their tickets**; host or planner).
- Short link (**Codes & planner**: a code, **Names to show**, the **Show on the short link** ticks; host only).
- **Contacts** tab (host ticks **Show to guests on their wedding page** on a contact, in **Money**, **Vendors**).
- **Pass** tab (shows once someone in the family says **Going**).
- Easier-to-read RSVP (guest turns it on, or host per family).
- **Read aloud** is English only.

## Features and tasks the inventory missed

Not written up, or only in a Tip. Candidates for a later pass.

- **Guest list:** pagination (50 a page), side cards that filter, function chips with counts, the **More** menu, family grouping, the guest panel's cross-links, **Last reminded**, tap to call on masked phones.
- **Personal messages:** per-family message language, **Name on card**, timezone; more message kinds (**Reminder**, **Day before**, **Room details**, **New timings**); a **Function** filter.
- **Invitations & reminders:** **Enough for today**, **Keep going**, **Hide them**, and the **Send by** choice.
- **Automations:** a built-in "Proposal accepted" rule that has no switch.
- **Stays:** the **Destination wedding** switch (adds a checklist and a "Travel and stay" budget line), **Edit stay**, **Delete stay**, **Edit room**, **Delete room**, **Hotel contact** (shown to guests), **Add arrival** and **Add departure** on the guest panel, and **WhatsApp {name}** on a room's family.
- **Pickups:** **Add guest to a run**, run **Delete**.
- **RSVP page:** a **Stay and travel** tab, a **Photos** tab, **Travel details (optional)**, the card after a reply (**Add to calendar**, **Your pass**, **Your stay**), per-function **Google Calendar**, and editable **Phone**, **WhatsApp number**, **Email** on **My details**.

## Questions for you

1. **Automations and "you press send".** Is it fine that the automations note says some rules email by themselves?
2. **Tip and Stuck? placement.** Settled by you: one pair per task, in every note. (The couple parts of the guest-side notes that have steps also got one pair.)
3. **Hinglish check.** The voice lines were written by Claude. Please have someone fluent read them before recording.
4. **Driver "who" value.** The allowed values have no "driver". The pickups note uses `couple, family, helper, planner` and addresses the driver in one section. Add a value?
5. **Demo data for videos.** Appendix E has no demo driver link, no `sharma-list.csv`, and no demo hotel. Notes assume: a driver link made in the pickups run, a CSV file, "Hotel Riverfront Residency" (from `guides-recording.md`), the Mehta family, Meena Bua. Should 3B add these to the seed data? Videos for tickets (guest side) also need **Let guests send their tickets** switched on first.
6. **Extra couple-side videos.** short-link has a second video (couple switches it on). That may overlap a Codes & planner note in Lane 1. Keep or drop?
7. **Number of videos.** 63 videos, one per task, as the rules say. Several guest videos sit near the 30 s floor. Fewer videos (for example, folding "add a run by hand" into "plan pickup runs")?
8. **"Vendors" wording.** It appears twice, only as the name of the family's own contact list in **Money**. Avoid it entirely?
9. **Label checker.** It cannot match plural labels like "Import {count} guests". The import note describes that button in plain text.
10. **Folder.** The prompt was started in `C:\Users\jayka\code\Guides` (empty). I worked in `C:\Users\jayka\code\krama-guides`, which holds `CLAUDE.md`, `app\` and `guides\`.
