---
tags: [guide]
lane: 5
who: [planner, vendor]
status: final
checked: 2026-11-17
video: made
internal: false
code: ["app/business/[orgId]/quotes/page.tsx", "app/business/[orgId]/tools-actions.ts", "app/business/[orgId]/tools-forms.tsx", "app/w/[workspaceId]/money/quotes/actions.ts"]
---
# Quote requests

**Time it saves:** One brief goes to every vendor you pick, and the prices come back side by side, so there is no retyping and no WhatsApp thread to chase.
**What it is:** Planners ask the vendors in their own vendor book for quotes on a wedding, and vendors send back a price.
**Why you'd use it:** The Sharma-Patel family wants three decor prices by Friday, and you do not want to chase three WhatsApp chats.

## How to add a vendor to your vendor book
Owners and admins only. Your vendor book is your own private list of vendors you already work with. Only vendors in it can be asked for quotes.

1. Open **Quote requests**. On a phone it sits under **More**.
2. Find the card called **Your vendor book**.
3. Type the vendor's ID in **Vendor ID**. It looks like V-XXXX-XXXX. The vendor gives it to you. It is the **Business ID** on their Settings page.
4. Click **Add vendor**. The vendor now shows in your book.
5. If you like, give them a star rating in **Your rating** and write **Private notes**. Click **Save**.

**Tip:** Your rating and notes are private. The vendor never sees them. The book also shows how often you asked, how often they quoted, and their last quote.
**Stuck?** If it says "We could not find a vendor with that ID.", ask the vendor to copy their **Business ID** again and paste it as it is.

## How to ask vendors for quotes
1. Open **Quote requests**.
2. Click **New quote request**. You see this button once you are linked to at least one wedding.
3. Pick the **Wedding**. Type what you need in **What do you need?**. Choose a **Category**.
4. Write the **Brief**. Set a **Reply by** date.
5. Tick the vendors under **Ask these vendors**. Choose 1 to 8.
6. Click **Send request**.

Each vendor is told. Your request shows **Collecting quotes**. A vendor's line says **Waiting for a quote** until they reply. Then it says **Quoted**.

**Tip:** Put the function, the headcount and the setup time in the brief, so every price covers the same job. The lowest price is marked **Lowest**.
**Stuck?** If **Ask these vendors** is empty, it says "Add vendors to your vendor book first." Add them, then try again.

## How to send quotes to the client
Any team member can do this.

1. Open **Quote requests**.
2. Find the request that shows **Collecting quotes**. Compare the prices.
3. Tick the quotes you want the family to see.
4. Click **Send to client**.
5. The request now shows **With the client**. The host opens **Quotes** in their wedding and clicks **Approve**.

The family sees the vendor's price only. They never see your rating or your notes.

When the host approves, Krama does four things:
- The vendor is linked to the wedding.
- The quoted amount goes into the family's budget as that vendor's amount.
- The other vendors see **Not chosen**.
- A confirmed booking is added for the vendor.

You get a note in your inbox when the family chooses.

**Tip:** Changed your mind? Click **Close request**, then **Yes, do it**. The vendors are told it is closed and no quote is chosen.
**Stuck?** No **Send to client** button? At least one vendor must show **Quoted**, and the request must still say **Collecting quotes**.

## How to write a brief for a vendor
1. Open **Quote requests**.
2. Scroll to **Briefs for your vendors**.
3. Find the vendor and the wedding. Write the job in **Brief**.
4. Type a name and a number in **Who to call on the day**.
5. Click **Save brief**. You see "Brief saved."

Under each vendor's name you see if they have read it. It says "Read by the vendor on {date} (version {version})." or "Version {version} has not been read by the vendor yet." The vendor reads it on their wedding page and clicks **I have read this**.

**Tip:** When the plan changes, edit the brief and save again. The version goes up, so you can see if the vendor read the new one.
**Stuck?** The card **Briefs for your vendors** only shows once a vendor is linked to one of your weddings, for example after the family approves their quote.

## How to send your quote (vendors)
Owners and admins give the price. Staff can read the request but cannot send a price.

1. Open **Home**.
2. In **Needs your attention**, click the row marked **Quote requested**.
3. Read the brief and the reply-by date.
4. Type your price in **Your price (₹)**, for example 52,000. Add a **Note** and **What is included**.
5. Set **Price holds until**, so the planner knows how long the price is good.
6. Click **Send quote**. You see "Quote sent."

**Tip:** You can send again to change your price until the planner sends the quotes on to the family. If the family chooses you, you are linked to that wedding. It shows under **Weddings**, and a confirmed booking appears under **Proposals & bookings**.
**Stuck?** Once you send, the row leaves **Needs your attention**. That means your quote is in. If it says "This request is no longer open.", the planner has closed it or moved on.

## See also
- [[quotes-to-approve]]
- [[vendors]]
- [[vendor-wedding-page]]
- [[bookings]]
- [[weddings]]

## Video scripts

### V-5-quote-requests-1 · How to add a vendor to your vendor book · 54 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md). Before recording, the robot copies Rangoli Decor's **Business ID** from the vendor's Settings page.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show business Home | 5.1 | "Apne vendors ki list kahan rakhein? Ek hi jagah." | Your own vendors, one place |
| 1 | Click **Quote requests** in the sidebar | 5.6 | "Quote requests kholo." | Open Quote requests |
| 2 | Point to the card **Your vendor book** | 5 | "Yeh hai aapki apni vendor book." | Your vendor book |
| 3 | Click **Vendor ID** and paste Rangoli Decor's ID | 8 | "Vendor ka ID yahan paste karo." | Paste the vendor ID |
| 4 | Click **Add vendor** | 5 | "Add vendor pe click karo." | Click Add vendor |
| 5 | Pick 5 stars in **Your rating**, type a note in **Private notes**, click **Save** | 14 | "Rating aur private notes likho. Vendor ko yeh nahi dikhta." | Rating and notes stay private |
| end | Show Rangoli Decor in the book | 5 | "Ho gaya. Rangoli Decor ab aapki book mein hai." | Done |

### V-5-quote-requests-2 · How to ask vendors for quotes · 64 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md). Start with Rangoli Decor already in the vendor book (end of V-5-quote-requests-1).

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show **Quote requests** with no requests | 5 | "Teen vendors se price chahiye. WhatsApp pe kitna chase karein?" | Chasing prices on WhatsApp |
| 1 | Click **New quote request** | 5 | "New quote request pe click karo." | Click New quote request |
| 2 | Pick the Sharma-Patel wedding in **Wedding**, type "Mandap and stage decor" in **What do you need?**, choose Décor in **Category** | 14 | "Wedding chuno, kya chahiye likho, aur category chuno." | Pick wedding and category |
| 3 | Type a short note in **Brief** | 12.7 | "Brief mein function aur setup ka time likho." | Write the brief |
| 4 | Pick a date in **Reply by** | 5 | "Reply by date daalo." | Set a reply-by date |
| 5 | Tick Rangoli Decor under **Ask these vendors** | 5 | "Jis vendor se poochna hai, usko tick karo." | Tick your vendors |
| 6 | Click **Send request** | 5 | "Send request pe click karo." | Click Send request |
| end | Show the request marked **Collecting quotes** | 5 | "Ho gaya. Vendor ko request mil gayi." | Request sent |

### V-5-quote-requests-3 · How to send quotes to the client, then write a brief for a vendor · 62 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md). Start after V-5-quote-requests-4, so Rangoli Decor's quote shows as **Quoted**.
From the part on "How to write a brief for a vendor": Rangoli Decor is already linked to the Sharma-Patel wedding, so its brief shows.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the request with a **Quoted** price | 5 | "Vendor ka price aa gaya. Ab family ko kaise dikhayein?" | Price is in. Now what? |
| 1 | Open **Quote requests** and point to the price | 5 | "Quote requests mein saare prices ek saath dikhte hain." | Prices side by side |
| 2 | Tick Rangoli Decor's quote | 5 | "Jo quote family ko dikhana hai, usko tick karo." | Tick the quotes to share |
| 3 | Click **Send to client** | 5 | "Send to client pe click karo." | Click Send to client |
| 4 | Show the request marked **With the client** | 5 | "Ho gaya. Ab family ke host approve karenge." | Sent to the family |
| 5 | Scroll to **Briefs for your vendors** | 5 | "Briefs for your vendors tak scroll karo." | Find Briefs for your vendors |
| 6 | Type "Haldi setup ready by 7 am. Marigold and mango leaf." in **Brief** | 9 | "Brief mein kaam likho." | Write the brief |
| 7 | Type a name and number in **Who to call on the day** | 7 | "Din ke liye kisko call karna hai, woh likho." | Add the day-of contact |
| 8 | Click **Save brief** | 5 | "Save brief pe click karo." | Click Save brief |
| end | Show "Brief saved." and the read status | 5 | "Ho gaya. Ab dikhega ki vendor ne padha ya nahi." | Brief saved |

### V-5-quote-requests-4 · How to send your quote (vendors) · 49 s · desktop first
Demo login: lane 5, vendor (Imran Shaikh, Rangoli Decor). "Voice says" is in Hinglish (DECISIONS.md). Start after V-5-quote-requests-2, so a request is waiting for Rangoli Decor.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show **Home** with **Needs your attention** | 5.1 | "Planner ne quote maanga hai. Kahan dekhein?" | A quote was asked |
| 1 | Click the row marked **Quote requested** | 5 | "Needs your attention mein Quote requested pe click karo." | Click Quote requested |
| 2 | Point to the brief and the reply-by date | 5.1 | "Brief padho aur reply ki date dekho." | Read the brief |
| 3 | Type 52,000 in **Your price (₹)** | 6 | "Apna price Your price mein likho." | Type your price |
| 4 | Type "Mandap, stage, 200 chairs, lights" in **What is included** and pick a date in **Price holds until** | 12 | "Kya included hai aur price kab tak chalega, woh likho." | Add what is included |
| 5 | Click **Send quote** | 5 | "Send quote pe click karo." | Click Send quote |
| end | Show "Quote sent." | 5 | "Ho gaya. Planner ko quote mil gaya." | Quote sent |
