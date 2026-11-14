---
tags: [guide]
lane: 5
who: [planner, vendor]
status: draft
checked: no
video: script
internal: false
code: [app/business/[orgId]/money/challans/page.tsx, app/business/[orgId]/money/challans/[challanId]/page.tsx, app/business/[orgId]/money/purchases/page.tsx, app/business/[orgId]/money/purchases/purchase-form.tsx, app/business/[orgId]/money/money-forms.tsx, app/business/[orgId]/money/actions.ts]
---
# Challans and purchases

**Time it saves:** The truck leaves with its paper already printed, and your supplier bills sit in one place instead of a bag of crumpled slips.
**What it is:** Two tabs in **Money**. **Challans** are delivery papers for equipment that leaves without an invoice. **Purchases** is where you keep the bills your suppliers charged you.
**Why you'd use it:** The decor truck leaves for the Hotel Riverfront Residency lawn at 5 am, and the driver needs a paper for the equipment. You make a challan the night before.

**Who can use this:** Every role can make a challan. Staff use the (+) menu, because they do not see **Money**. Purchases are for owners and admins only. These are your own records. Nothing is paid from here.

## How to make a delivery challan
1. Open **Money** and click the **Challans** tab. On a phone, tap **More** first. Staff: tap the (+) and pick **Make a challan**.
2. Click **New challan**. A draft opens.
3. Under **Where is it going?**, pick **Why is it moving?**. Type **Going to**. Check the **State**. Add the **Delivery address**.
4. Under **What is moving**, type the **Description**, **Qty** and **Value (₹)**. Click **Add item** for more things.
5. Under **Transport**, type the **Vehicle number** and the **Transporter** if you have them.
6. Click **Issue challan**. It gets a number.

**Tip:** After you issue, click **Print or save as PDF** and put the paper in the truck.
**Stuck?** If the goods are worth more than ₹50,000, the page says an e-way bill is needed. Make it on the GST portal, then type its number in **E-way bill number**. Made a mistake after issuing? Click **Cancel challan** and make a new one.

## How to add a purchase bill
Owners and admins only.
1. Open **Money** and click the **Purchases** tab.
2. Under **Add a purchase bill**, type the **Supplier**.
3. Type the **Bill number**. Check the **Bill date**.
4. Type the **Total on the bill (₹)**. Add the **GST on the bill (₹, optional)** if the bill shows it.
5. Pick **What for**, such as **Materials** or **Travel**.
6. Click **Save bill**. You see **Saved.** and the bill joins **Purchase bills**.

**Tip:** Type amounts like 1,25,000 or 2.5L. If you leave **Amount before GST (₹, optional)** empty, Krama works it out from the total. If you see **Snap a bill** above the form, you can photograph a bill and check every detail before you save.
**Stuck?** Added a bill by mistake? Click the bin next to it, then click **Delete bill**. If you do not see the **Purchases** tab, you are staff. Ask an owner or admin.

## See also
- [[invoices-and-payments-due]]
- [[bookings]]
- [[getting-around-the-portal]]
- [[snap-a-bill]]

## Video scripts

### V-5-challans-and-purchases-1 · How to make a delivery challan · about 40 s · desktop first
Demo login: lane 5, vendor (Imran Shaikh, Rangoli Decor). "Voice says" is in Hinglish (DECISIONS.md).

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the **Challans** tab with an empty list | 5 | "Decor ka saaman kal subah venue jayega. Driver ke paas paper chahiye." | |
| 1 | Click **Money** in the sidebar, then the **Challans** tab | 4 | "Money kholo, phir Challans tab." | Open Challans |
| 2 | Click **New challan** | 4 | "New challan pe click karo." | Click New challan |
| 3 | Type "Hotel Riverfront Residency" in **Going to**. Pick "24 Gujarat" in **State** | 4 | "Going to mein jagah likho, aur State chuno." | Add where it is going |
| 4 | Type "Mandap frames" in **Description**. Type "6" in **Qty** | 4 | "Kya ja raha hai, woh likho." | Add what is moving |
| 5 | Type "GJ 01 AB 1234" in **Vehicle number** | 4 | "Gaadi ka number likho." | Add vehicle number |
| 6 | Click **Issue challan** | 4 | "Issue challan pe click karo." | Click Issue challan |
| end | Show the issued challan with its number | 4 | "Ho gaya. Challan ready hai, print karke gaadi mein rakho." | Challan issued |

### V-5-challans-and-purchases-2 · How to add a purchase bill · about 40 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md).

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the **Purchases** tab with no bills | 5 | "Supplier ke bills idhar-udhar pade hain. Ek jagah rakhne hain." | |
| 1 | Click **Money** in the sidebar, then the **Purchases** tab | 4 | "Money kholo, phir Purchases tab." | Open Purchases |
| 2 | Type "Gulab Flower Mart" in **Supplier** | 4 | "Supplier ka naam likho." | Type the supplier |
| 3 | Type "GF-2217" in **Bill number** | 4 | "Bill number likho." | Type the bill number |
| 4 | Type "48500" in **Total on the bill (₹)**. Type "2310" in **GST on the bill (₹, optional)** | 4 | "Total aur GST likho." | Type total and GST |
| 5 | Pick **Materials** in **What for** | 4 | "What for mein Materials chuno." | Pick what for |
| 6 | Click **Save bill** | 4 | "Save bill pe click karo." | Click Save bill |
| end | Show the bill in **Purchase bills** | 4 | "Ho gaya. Bill ab list mein hai." | Bill saved |
