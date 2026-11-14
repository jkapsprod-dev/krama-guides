---
tags: [guide]
lane: 5
who: [planner, vendor, couple]
status: draft
checked: no
video: script
internal: false
code: [app/business/[orgId]/proposals/page.tsx, app/business/[orgId]/proposals/[proposalId]/page.tsx, app/business/[orgId]/proposals/proposals-forms.tsx, app/business/[orgId]/proposals/actions.ts, app/proposal/[token]/page.tsx, app/proposal/[token]/decide-panel.tsx, app/proposal/[token]/actions.ts]
---
# Proposals

**Time it saves:** One link your client can read and accept, instead of a PDF that goes back and forth on WhatsApp.
**What it is:** A quote you build in sections and lines, send as a link, and your client accepts or declines on their own page.
**Why you'd use it:** A family asks for a quote for the haldi and mehndi. You send one clear page with the prices, the GST and the advance. They accept it the same evening, and the booking is ready for you.

**Who can use this:** Owners and admins only. Staff see bookings, not proposals.

## How to build a proposal
Owners and admins only.
1. Open **Proposals & bookings** and click **New proposal**.
2. Under **About this proposal**, fill **Proposal title**, **Client (family or company)** and **Client's email**. The client needs this email to accept.
3. Set **Valid until**, **GST** and **Advance (% of total)**. A planner can also type the **Wedding name (created when they accept)**.
4. Type a **Section** name, like "Haldi decor". Tick **Optional for the client** if the family can leave that section out.
5. In the first line, fill **Function**, **Date**, **What's included**, **Qty** and **Price each (₹)**. Click **Add line** for more lines, or **Add section** for another section.
6. Check the box **What the family will see** on the right. Then click **Save draft**.

**Tip:** Untick **Show prices to the client** if you want to send what is included, without prices. You can type prices like 25000 or 2.5L. You can also start from a lead: open the lead and click **New proposal**, and the name and email are copied over.
**Stuck?** The proposal will not save? Check that the title, the client name and **What's included** on each line are filled in, and that prices are numbers.

## How to send a proposal to your client
Owners and admins only.
1. Open **Proposals & bookings**. A new proposal shows **Draft**. Click its title.
2. Check that **Client's email** is filled in.
3. Click **Save and send**. The status changes to **Sent**.
4. A box called **Share with your client** appears with the link.
5. Click **Copy link** and paste it into WhatsApp, then press send yourself. Or click **Email it**. Your email app opens with the message ready, and you press send.

**Tip:** If you change a sent proposal, click **Save and send** again. Your client keeps seeing the last one you sent until then. If you leave **Valid until** empty, the link stays open for 14 days.
**Stuck?** **Save and send** says to add the client's email, or to add at least one line? Fix that first. Krama never sends the link for you. You press send.

## How your client accepts or declines
1. Your client opens the link. They can read everything without signing in. The page shows your business name, the sections and, if you chose it, the prices and total.
2. To decide, they click **Sign in to accept**. They must sign in with the email you typed in **Client's email**.
3. Under **Optional parts to include**, they untick any part they do not want. **Your total** changes as they go.
4. They type their full name under **Type your full name to accept**. The name, the time and the device's address are saved as their acceptance.
5. They click **Accept proposal**. Or they click **Decline** and confirm with **Decline** again.

**Tip:** After an acceptance, the proposal shows **Accepted** and the link **See the booking**. The lead becomes **Won**, and a booking appears in **Bookings**. For a planner, the family's wedding is created too, and you are already in it. If they decline, the lead becomes **Lost**.
**Stuck?** Your client sees "This proposal has expired"? Send a new version with a later **Valid until**. They see "Sign in with the email address this proposal was sent to"? The email they used does not match **Client's email**. Fix it and send again.

## See also
- [[leads]]
- [[bookings]]
- [[clients]]
- [[invoices-and-payments-due]]
- [[weddings]]

## Video scripts

### V-5-proposals-1 · How to build a proposal · about 45 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md).

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the **Proposals** page with one draft | 5 | "Quote bhejne mein itna time kyun lagta hai?" | |
| 1 | Click **Proposals & bookings**, then click **New proposal** | 4 | "**New proposal** pe click karo." | Click New proposal |
| 2 | Type "Haldi and mehndi planning" in **Proposal title**. Type "Shah family" in **Client (family or company)**. Type "hitesh.shah@example.test" in **Client's email** | 5 | "Title, client ka naam aur email daalo." | Fill the proposal details |
| 3 | Type "Haldi decor" in **Section** | 4 | "Section ka naam likho." | Name the section |
| 4 | Type "Stage and flower decor" in **What's included**. Type "85000" in **Price each (₹)** | 5 | "Kya milega aur kitne ka, woh likho." | Add the first line |
| 5 | Click **Add line** | 4 | "Aur kuch jodna ho to **Add line**." | Click Add line |
| 6 | Point at the box **What the family will see** | 4 | "Side mein dikhta hai ki family ko kya dikhega." | Check the preview |
| 7 | Click **Save draft** | 4 | "Phir **Save draft** dabao." | Click Save draft |
| end | Show the message **Saved.** | 4 | "Ho gaya. Proposal draft mein save hai." | Done |

### V-5-proposals-2 · How to send a proposal to your client · about 35 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md). Uses the draft "Proposal for Meera Shah" that the demo already has.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the **Proposals** page with the draft for Meera Shah | 5 | "Proposal ready hai. Ab client tak kaise pahunchaye?" | |
| 1 | Click "Proposal for Meera Shah" | 4 | "Proposal kholo." | Open the proposal |
| 2 | Point at **Client's email** | 4 | "Client ka email bhara hona chahiye." | Check the email |
| 3 | Click **Save and send** | 4 | "**Save and send** dabao." | Click Save and send |
| 4 | Point at the box **Share with your client** | 4 | "Yahan link aa gaya." | The link appears |
| 5 | Click **Copy link** | 4 | "**Copy link** karo aur WhatsApp mein paste karo. Send aap dabate ho." | Click Copy link |
| end | Show the status **Sent** | 4 | "Ho gaya. Proposal bhej diya." | Done |

### V-5-proposals-3 · How your client accepts or declines · about 35 s · desktop first
Demo login: lane 5, client (Meera Shah, made up), already signed in with the email the proposal was sent to. Uses the link from the previous video. "Voice says" is in Hinglish (DECISIONS.md).

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Open the proposal link and show the page | 5 | "Client ko proposal aise dikhta hai." | |
| 1 | Scroll to show the sections and the total | 4 | "Sections, prices aur total, sab ek page pe." | Read the proposal |
| 2 | Untick the optional part "Extras" under **Optional parts to include** | 4 | "Jo optional part nahi chahiye, uska tick hata do." | Leave out an optional part |
| 3 | Point at **Your total** | 4 | "**Your total** apne aap badal gaya." | The total updates |
| 4 | Type "Meera Shah" in **Type your full name to accept** | 4 | "Apna poora naam likho." | Type the full name |
| 5 | Click **Accept proposal** | 4 | "**Accept proposal** dabao." | Click Accept proposal |
| end | Show **Thank you** and the button **Open your wedding** | 4 | "Ho gaya. Planner ko booking mil gayi." | Done |
