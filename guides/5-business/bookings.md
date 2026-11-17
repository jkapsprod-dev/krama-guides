---
tags: [guide]
lane: 5
who: [planner, vendor]
status: final
checked: 2026-11-17
video: made
internal: false
code: [app/business/[orgId]/proposals/bookings/page.tsx, app/business/[orgId]/proposals/bookings/[bookingId]/page.tsx, app/business/[orgId]/proposals/proposals-forms.tsx, app/business/[orgId]/proposals/actions.ts, app/business/[orgId]/money/money-forms.tsx, lib/db/proposals.ts]
---
# Bookings

**Time it saves:** Every confirmed job, its stage and its payment dates in one place, instead of a notebook and three WhatsApp groups.
**What it is:** The jobs you have confirmed. A booking appears when a client accepts your proposal.
**Why you'd use it:** A family has accepted your haldi decor. You need to know it is confirmed, when the advance is due, and what is still unpaid before the sangeet.

**Who can see what:** Everyone in your business sees the bookings and can change a booking's status. Staff see them without amounts. Only owners and admins see the money, and set the payment schedule.

## How to track a booking
1. Open **Proposals & bookings**. Staff land straight on the bookings.
2. Click the **Bookings** tab.
3. Find the booking. It shows the date and, for owners and admins, the total and the advance.
4. Use the **Booking status** list to pick **Hold**, **Confirmed**, **In production**, **Delivered**, **Closed** or **Cancelled**.
5. For a planner's booking, the wedding's ID shows next to **Wedding:**. Click the booking's name to open it.

**Tip:** A booking made from an accepted proposal starts as **Confirmed**. Move it to **In production** when the work starts, and to **Delivered** when it is done.
**Stuck?** The list is empty? A booking appears only after a client accepts a proposal. See [[proposals]].

## How to set a payment schedule
Owners and admins only.
1. Open **Proposals & bookings**, click the **Bookings** tab, and click the booking's name.
2. Find **Payment schedule**.
3. Under **Type**, pick **Advance**, **Milestone** or **Balance**. Type a **Name** like "Advance".
4. Type the **Amount (₹, incl. GST)** and pick the **Due date**.
5. Click **Add to schedule**.

**Tip:** The page tells you how much of the booking is not scheduled yet. Add lines until it says "The whole booking is scheduled." Click **Remove** to take a line out.
**Stuck?** The schedule cannot add up to more than the booking total. Lower an amount and try again. Staff see "Only owners and admins of the business see its money."

## How to raise an invoice from the schedule
Owners and admins only.
1. Open the booking, as in the last task.
2. In **Payment schedule**, find the line tagged **Not invoiced**.
3. Click **Raise invoice**.
4. A draft invoice opens, filled in from that line.

**Tip:** Once a line has an invoice, its number replaces the button. Click the number to open the invoice. Finish, issue and track the invoice in [[invoices-and-payments-due]]. Krama only keeps the record. It never holds or moves your money.
**Stuck?** A note says the wedding has a planner and bills go to the planner? That is right. A vendor on a wedding with a planner bills the planner, not the family.

## See also
- [[proposals]]
- [[invoices-and-payments-due]]
- [[clients]]
- [[weddings]]

## Video scripts

### V-5-bookings-1 · How to track a booking · 38 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md). Needs one booking: record it after the client accepts "Proposal for Meera Shah" (V-5-proposals-3).

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show business Home | 5 | "Kaun si job kahan tak pahunchi, yaad rakhna mushkil hai." |  |
| 1 | Click **Proposals & bookings**, then click the **Bookings** tab | 7 | "**Bookings** tab kholo." | Open Bookings |
| 2 | Point at the booking and its **Confirmed** status | 5 | "Yahan job ka status dikhta hai." | See the status |
| 3 | Open the **Booking status** list | 5 | "**Booking status** list kholo." | Open Booking status |
| 4 | Pick **In production** | 5 | "Kaam shuru ho gaya, to **In production** chuno." | Pick In production |
| end | Show the booking with its new status | 5 | "Ho gaya. Status badal gaya." | Done |

### V-5-bookings-2 · How to set a payment schedule, then raise an invoice from the schedule · 63 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md). Same booking as the first video.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the **Bookings** tab | 5 | "Advance kab aana hai, balance kab? Schedule bana lo." |  |
| 1 | Click the booking's name | 5 | "Booking ka naam kholo." | Open the booking |
| 2 | Scroll to **Payment schedule** | 5 | "**Payment schedule** tak aao." | Find Payment schedule |
| 3 | Pick **Advance** in **Type**. Type "Advance" in **Name** | 9 | "Type **Advance** chuno aur naam likho." | Pick Advance and name it |
| 4 | Type "50000" in **Amount (₹, incl. GST)**. Pick a **Due date** | 8 | "Amount aur **Due date** daalo." | Add amount and due date |
| 5 | Click **Add to schedule** | 5 | "**Add to schedule** dabao." | Click Add to schedule |
| 6 | Point at the **Not invoiced** tag | 5 | "Yahan **Not invoiced** likha hai." | Find the unpaid line |
| 7 | Click **Raise invoice** | 5 | "**Raise invoice** pe click karo." | Click Raise invoice |
| 8 | Show the draft invoice that opens | 5 | "Draft invoice khul gaya, amount bhara hua." | The draft opens |
| end | Show the draft invoice page | 5 | "Ho gaya. Invoice ka draft ready hai." | Done |
