---
tags: [guides, lane-status]
lane: 5
folder: 5-business
written: 2026-11-14
---
# Lane 5 status · 5-business

Written from the live code in `app\` (branch `main`, already up to date when pulled). Nothing is committed. Nothing was checked on the running app yet, so every note is `status: draft`, `checked: no`.

## Notes written

**22 notes in `guides\5-business\`** (plus `_section-intro.md`, English and Hinglish):

| Group | Notes | Videos |
|---|---|---|
| Set up and portal | set-up-your-business, getting-around-the-portal, business-home, weddings, planner-code, vendor-wedding-page | 3 + 3 + 3 + 3 + 3 + 4 |
| Sales | leads, clients, proposals, bookings | 4 + 2 + 3 + 3 |
| Work | quote-requests, calendar, crew-and-shifts, documents, team, family-feedback | 5 + 3 + 5 + 3 + 3 + 1 |
| Money | invoices-and-payments-due, challans-and-purchases | 4 + 2 |
| **Planned** (no videos) | enquiry-form, first-reply, commission-earnings, subscription | none |

**7 notes in `guides\_internal\`** (`internal: true`, no videos): admin-sign-in, admin-overview, admin-operations, admin-growth-usage-revenue, admin-accounts, admin-support-access, admin-billing.

**57 video scripts** (V-5-<note>-<n>), 30 to 45 seconds each, desktop first. Two are marked phone first (see below).

Checks run on every note: reading level (all grade 2 to 5, limit 8, for both folders); every bold name matched against `messages\en.json`; no em or en dashes; no marketplace or vendor-discovery words; every task has a Tip, a **Stuck?** line and a video script.

## Choices I made

- **Where I worked.** The session's folder (`C:\Users\jayka\code\Guides`) was empty, so I used `C:\Users\jayka\code\krama-guides`. I wrote only in `guides\5-business\` and `guides\_internal\`.
- **"Time it saves" line.** Each note has one extra line under the title, before **What it is**, so a busy planner reads the time saved first. The rest follows the template exactly. Remove the line if you want the template untouched.
- **Video length.** Many tasks have only 2 to 4 steps. To meet 30 seconds, I stretched step holds to 4 to 8 seconds. Merging tiny tasks (for example **Cancel request** and **Leave wedding**) into one video is an option.
- **Bookings.** I left out "Link to a wedding by its ID" and **Ask to link**. A planner's booking links by itself when the client accepts. The form only shows for vendor bookings, and vendors can't join by Wedding ID.
- **Labels not in `en.json`:** only "(+)" (used in leads and the portal note, as the inventory does).

## Where the code differs from the inventory or NAVIGATION.md

- **(+) is phone only.** The bottom bar is hidden on desktop (`components\app-nav.tsx`). The portal note points desktop users to search, which lists the same actions. `V-5-getting-around-the-portal-1` is phone first. So is `V-5-crew-and-shifts-5` (crew open their own shift page on a phone).
- **Search** finds pages and actions only, not leads or clients (`B/finder-actions.ts`).
- **Needs you** is planner only. Vendors see **Needs your attention**.
- **Open wedding** is not a button. It ends a **Needs you** line after a client accepts a proposal. Planners open a wedding by clicking its row.
- **Family feedback** is a button on the planner's Home, not a sidebar item. NAVIGATION.md (Team group) is stale.
- **Staff can change a booking's status.** The inventory doesn't say so.
- **Accepting a planner's proposal** also creates the client's wedding with the planner already linked. **Approving a quote** creates the vendor link, a vendor contact, a budget amount and a confirmed booking (`supabase\migrations\20261022084000_sourcing.sql`).
- **Planner code:** a host's link is active at once, a family member's waits for a host, one planner per wedding.
- **Reminders** open WhatsApp with the message ready but no phone number (`wa.me/?text=`), so you pick the client's chat. **Open in email** shows only on an invoice's own page, and only when the client's email is saved. **Prepare a reminder** shows only on late rows.
- **Payment received** and **Raise an invoice** in the (+) both just open the Invoices tab.
- **Subscription** is reachable only by owners and admins (through Settings), though the page allows any member.
- **A vendor can't edit a sent quote.** The row leaves **Needs your attention** and there's no way back.

## Features the inventory missed (admin console)

- **AI kill switch** on Operations (one line added to admin-operations).
- Billing also has **Planner commission**, payment alerts, reconciliation and Krama's invoice details (a short "resolve a payment alert" task added).
- Accounts has a code-change control (**Allow one more change**), added as a task.
- Overview has six tiles, including Paying weddings, Revenue this month and Support access.
- Role access: Growth, Usage and Revenue for superadmin and analyst; Accounts and Support for superadmin and support; Overview, Operations and Billing for superadmin only.
- Passkey set-up needs a one-time link from a superadmin (15-minute window, 12-hour and 30-minute session limits). These numbers come from SPEC 7.19, not from page code. Please confirm them.

## Possible app problems to look at (I changed nothing)

1. **Vendors can see Ask for a wedding** on the Weddings page, but the host's **Codes & planner** lists planners only. A vendor's request would sit pending with nobody able to approve it. This is the same gap you decided to leave out of the guides.
2. **Commission page** says "Krama pays it out" (`Codes.earnings.note`). Our rule says Krama never moves money. I left that sentence out of the planned note.
3. **Proposal.donePlanner** in `en.json` still says "workspace".
4. **Leads empty state** mentions the enquiry form (`Crm.list.emptyBody`). The Leads guide tells people to ignore it.
5. **The business (+) sheet title** reads "Add to your wedding" (`Nav.quickAddTitle`).

## Demo data the robot will need

The lane 5 seed (`scripts\guides\seed.ts`) has none of these, so the videos assume them:

- **Invoices:** one issued invoice, and one with a past due date (for the reminder video). Billing details are empty. No bookings, challans or purchases.
- **Bookings and proposals:** one booking. V-5-proposals-3 would create it, but it assumes a signed-in client (the demo client is made up: meera.shah@example.test, with no login yet).
- **Weddings and planner code:** Utsav Planners starts unlinked from the Sharma-Patel wedding, with a pending request for one video, and no planner code yet.
- **Vendor page:** Rangoli Decor needs an unread brief, an unread inbox note and an empty checklist. Planner **Needs you** needs at least one line.
- **Work side:** a vendor book with quote requests, crew, calendar items (one Blocked date on the Sangeet day), documents (plus a sample PDF), one family rating, and a second (Staff) team member for the Team videos.
- **Business ID:** the quote-request videos copy Rangoli Decor's Business ID.

## Questions for you

1. Can the lane 5 seed add the items above? Or may the robot do them as off-camera setup before each video?
2. The invoice reminder opens WhatsApp Web with the message. Should the video end on that page, or on the **Open in WhatsApp** button?
3. Invoice video 4 uses a made-up GSTIN (24ABCDE1234F1Z6) that passes the app's check-digit test. OK?
4. Should the **Ask for a wedding** form be hidden from vendors in the app? (Problem 1 above.)
5. Should the commission page text and "workspace" string be fixed in the app?
6. The planned notes describe the Settings cards that exist today and tell people not to share the link. Is that enough, or should they say less?
7. Do you want the "Time it saves" line kept?
