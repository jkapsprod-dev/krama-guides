---
tags: [guide]
lane: 2
who: [couple, family, planner, guest]
status: final
checked: 2026-11-15
video: made
internal: false
code: ["app/w/[workspaceId]/stays/travel/tickets/page.tsx", "app/w/[workspaceId]/stays/travel/tickets/ticket-controls.tsx", "app/w/[workspaceId]/stays/travel/tickets/actions.ts", "app/rsvp/[token]/ticket-box.tsx", "app/rsvp/[token]/stay-view.tsx", "lib/travel/ticket-read.ts"]
---
# Tickets from guests

**What it is:** Guests add their train or flight ticket on their own invitation page. Krama reads it and fills in their arrival. You check it and confirm it into Travel.
**Why you'd use it:** Forty guests are coming by train from Pune and Surat. You don't want to type forty train numbers. They send the tickets, and you only check them.

This is opt-in. It is off for every wedding until a host or planner switches it on.

## How to let guests send their tickets
1. Open **Stays & Travel**. On a phone, tap **More** first.
2. Tap the **Arrivals & departures** tab.
3. Tap **Let guests send their tickets**.
4. Switch on **Let guests send their tickets**.

Guests now see **Add your ticket** on their own page. They don't need a new link.

**Tip:** The ticket file is read and never kept. You can tell guests that.
**Stuck?** Only a host or planner sees this switch. If you can't see it, ask one of them.

## How to check a ticket and add it to travel
1. Open the **Arrivals & departures** tab.
2. Tap the line that says how many tickets from guests are waiting.
3. Check the details Krama read, like **Flight or train number**, **Arriving at** and **Arrival time**. Fix any mistake.
4. Keep **Needs a pickup** on if they need one. Then choose **Picked up by** or **Driver**.
5. Tap **Confirm into Travel**.

The arrival and the pickup now show in the **Arrivals & departures** list.

**Tip:** Krama puts a suggested pickup time in **Notes**. Change it if you like.
**Stuck?** If it is the wrong ticket or a blurry one, tap **Discard ticket**. The guest's travel stays as it was.

## How to send your ticket to the hosts
This part is for guests. Forward it to your guests.

1. Open your RSVP link.
2. Tap the **Stay and travel** tab.
3. Under **Add your ticket**, tap **Choose ticket**. Pick your PDF or photo.
4. Check the details. Fix anything that is wrong.
5. Tick everyone travelling on this ticket.
6. Tap **Send to the hosts**.

The hosts check it and confirm your arrival and pickup.

**Tip:** A photo is read on your phone. A PDF is read on our server, up to 2 MB. The file is not kept.
**Stuck?** If you can't see **Add your ticket**, the hosts have not switched it on. Type your arrival under **Travel details (optional)** on the RSVP page instead.

## See also
- [[arrivals-and-departures]]
- [[pickups]]
- [[guest-rsvp-page]]
- [[send-rsvp-links]]
- [[stays-and-rooms]]
- [[members]]

## Video scripts

### V-2-tickets-from-guests-1 · How to let guests send their tickets · about 41 s · phone first
Demo login: lane 2, couple (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the Arrivals & departures tab with no tickets | 6 | Chalis guest train se aa rahe hain. Sabke number kaun likhega. | Forty train numbers to type |
| 1 | Open **Stays & Travel** from **More** | 7 | Stays and Travel kholo. | Open Stays & Travel |
| 2 | Tap the **Arrivals & departures** tab | 7 | Arrivals and departures tab pe tap karo. | Open the tab |
| 3 | Tap **Let guests send their tickets** | 8 | Let guests send their tickets pe tap karo. | Tap the link |
| 4 | Switch on **Let guests send their tickets** | 7 | Ab yeh switch on kar do. | Switch it on |
| end | Show the switch on | 6 | Ho gaya. Guests ab apna ticket bhej sakte hain. | Guests can send tickets |

### V-2-tickets-from-guests-2 · How to check a ticket and add it to travel · about 43 s · phone first
Demo login: lane 2, couple (Appendix E). A ticket sent by the demo guest must be waiting. "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the line "1 ticket from guests to check" | 6 | Mehta family ne apna ticket bhej diya hai. | A ticket has arrived |
| 1 | Open the **Arrivals & departures** tab | 6 | Arrivals and departures kholo. | Open the tab |
| 2 | Tap the line "1 ticket from guests to check" | 6 | Tickets waali line pe tap karo. | Open the ticket |
| 3 | Show **Flight or train number**, **Arriving at** and **Arrival time** | 7 | Train ka number, jagah aur time dekh lo. | Check the details |
| 4 | Keep **Needs a pickup** on and choose **Picked up by** | 7 | Pickup chahiye to Picked up by mein naam chuno. | Choose who picks up |
| 5 | Tap **Confirm into Travel** | 6 | Confirm into Travel pe tap karo. | Tap Confirm into Travel |
| end | Show the message "Confirmed. The arrival and pickup are now in Travel." | 6 | Ho gaya. Arrival aur pickup list mein hain. | Arrival and pickup added |

### V-2-tickets-from-guests-3 · How to send your ticket to the hosts · about 45 s · phone first
Demo login: lane 2, demo guest link (Appendix E). Needs **Let guests send their tickets** switched on first.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the guest's RSVP page | 6 | Hosts ko aapka ticket chahiye, par type karna lamba hai. | Send your ticket in a tap |
| 1 | Tap the **Stay and travel** tab | 6 | Stay and travel tab pe tap karo. | Open Stay and travel |
| 2 | Tap **Choose ticket** under **Add your ticket** and pick the sample ticket | 7 | Choose ticket pe tap karo aur apna ticket chuno. | Choose your ticket |
| 3 | Show the details Krama read | 7 | Jo details mili hain, unhe ek baar dekh lo. | Check the details |
| 4 | Tick who is travelling | 8 | Jo log is ticket pe jaa rahe hain, unko tick karo. | Tick who is travelling |
| 5 | Tap **Send to the hosts** | 6 | Send to the hosts pe tap karo. | Tap Send to the hosts |
| end | Show the message "Sent. The hosts will confirm your arrival and pickup." | 6 | Ho gaya. Hosts ab aapka pickup confirm karenge. | Sent to the hosts |
