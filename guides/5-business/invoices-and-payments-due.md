---
tags: [guide]
lane: 5
who: [planner, vendor]
status: draft
checked: no
video: script
internal: false
code: [app/business/[orgId]/money/page.tsx, app/business/[orgId]/money/invoices/page.tsx, app/business/[orgId]/money/invoices/[invoiceId]/page.tsx, app/business/[orgId]/money/money-forms.tsx, app/business/[orgId]/money/actions.ts, app/business/[orgId]/settings/page.tsx]
---
# Invoices and payments due

**Time it saves:** No more typing invoices in a note app or chasing "what is still unpaid?" through a WhatsApp thread.
**What it is:** The **Money** section of your business portal. It holds your invoices, the payments you log against them, and a **Due** list of what clients still owe you.
**Why you'd use it:** The Sharma family asks, "What is still unpaid?" You open **Due**, read the list, and send a reminder in a minute.

**Who can use this:** Owners and admins only. Staff do not see **Money**. Krama only keeps your records. No money moves through Krama. Your client pays you directly, and you write the payment down here.

## How to raise an invoice
Owners and admins only.
1. Open **Money**. On a phone, tap **More** first.
2. Click the **Invoices** tab.
3. Click **New invoice**. A draft opens.
4. Under **Who is it for?**, type the **Name**. Pick the **State (place of supply)**. Set the **Due date (default 15 days)** if you need a different day.
5. Under **What you are billing**, type the **Description**, the **Qty** and the **Rate (₹)**. Pick the **GST** rate. Click **Add line** for more items.
6. Click **Issue invoice**. The invoice gets a number and is locked.

**Tip:** Not ready yet? Click **Save draft** and come back later. After you issue, click **Print or save as PDF** to share it.
**Stuck?** If you see "Add your GSTIN and state in Settings, or use a bill of supply", fill in your **Billing details** first, or change **Type** to **Bill of supply**.

## How to log a payment
Owners and admins only. You write down money that reached your own account.
1. Open **Money**, then click **Invoices**. The (+) menu item **Payment received** opens the same tab.
2. Click the issued invoice.
3. Scroll down to **Payments**.
4. Check **Date received**. Pick **How** the client paid.
5. Type the **Amount received (₹)**. Add **TDS deducted (₹)** or a **Reference (UTR / cheque no.)** if you have one.
6. Click **Log payment**. **Still to pay** goes down. At zero you see **Fully paid.**

**Tip:** For a part payment, type the smaller amount. The rest stays under **Still to pay**.
**Stuck?** If you see "That is more than is owed on this invoice", the amount is too high. Type up to **Still to pay**. Logged a wrong payment? Click **Remove** next to it.

## How to remind a client who owes you
Owners and admins only. Krama never sends the message. You press send.
1. Open **Money**. The **Due** tab opens first.
2. Look under **Overdue**. Each row shows the client, the amount and how many days late it is.
3. Click **Prepare a reminder** on the row.
4. Read the message. It has the client's name, the amount and the due date.
5. Click **Open in WhatsApp**. WhatsApp opens with the message ready.
6. Pick your client's chat and press send.

**Tip:** Click **Copy message** if you want to paste it somewhere else. On the invoice's own page, **Open in email** also shows when you saved the client's email.
**Stuck?** No **Prepare a reminder**? It shows only after the due date has passed. Rows under **Coming up** are not late yet.

## How to add your GST and bank details
Owners and admins only.
1. Open **Settings**. On a phone, tap **More** first.
2. Scroll to **Billing details**.
3. Type your **GSTIN**. Choose your **State**. Type your **Address**.
4. Add an **Invoice prefix (up to 4 letters)** and your **Terms on invoices** if you want them.
5. Under **How clients pay you**, type your **UPI ID**. Or fill in **Account name**, **Bank**, **Account number** and **IFSC**.
6. Click **Save billing details**. You see **Saved.**

**Tip:** These details print on your invoices, so clients know where to pay you. Only owners and admins can see them.
**Stuck?** "That GSTIN isn't valid" means a typing slip. Check all 15 characters. The first two digits must match your **State**.

## See also
- [[bookings]]
- [[challans-and-purchases]]
- [[getting-around-the-portal]]
- [[set-up-your-business]]

## Video scripts

### V-5-invoices-and-payments-due-1 · How to raise an invoice · about 40 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md).

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the **Money** page with an empty **Invoices** list | 5 | "Client ko invoice bhejna hai, aur number bhi yaad rakhna hai." | |
| 1 | Click **Money** in the sidebar | 4 | "Pehle Money kholo." | Open Money |
| 2 | Click the **Invoices** tab | 4 | "Phir Invoices tab pe jao." | Click Invoices |
| 3 | Click **New invoice** | 4 | "New invoice pe click karo." | Click New invoice |
| 4 | Type "Sharma family" in **Name**. Pick "24 Gujarat" in **State (place of supply)** | 4 | "Client ka Name likho, aur State chuno." | Add name and state |
| 5 | Type "Planning fee, advance" in **Description**. Type "125000" in **Rate (₹)** | 4 | "Description aur Rate likho." | Add what you bill |
| 6 | Click **Issue invoice** | 4 | "Ab Issue invoice pe click karo." | Click Issue invoice |
| end | Show the issued invoice with its number | 4 | "Ho gaya. Invoice ka number lag gaya." | Invoice issued |

### V-5-invoices-and-payments-due-2 · How to log a payment · about 35 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md).
Setup, off camera: one issued invoice to "Sharma family" for ₹1,25,000, so the robot has something to log against.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the **Invoices** list with one issued invoice | 5 | "Client ne advance bhej diya. Ab isse likhna hai." | |
| 1 | Click the **Invoices** tab under **Money** | 4 | "Money mein Invoices kholo." | Open Invoices |
| 2 | Click the invoice for "Sharma family" | 4 | "Invoice pe click karo." | Open the invoice |
| 3 | Scroll to **Payments** | 4 | "Neeche Payments mein jao." | Scroll to Payments |
| 4 | Type "50000" in **Amount received (₹)** | 4 | "Jitna paisa aaya, Amount received mein likho." | Type the amount |
| 5 | Click **Log payment** | 4 | "Log payment pe click karo." | Click Log payment |
| end | Show **Still to pay** at ₹75,000 | 4 | "Ho gaya. Baaki ₹75,000 dikh raha hai." | Balance updated |

### V-5-invoices-and-payments-due-3 · How to remind a client who owes you · about 35 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md).
Setup, off camera: one issued invoice to "Sharma family" for ₹1,25,000 with a due date 10 days ago.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the **Due** tab with one row under **Overdue** | 5 | "Paisa abhi tak nahi aaya. Yaad kaise dilayein?" | |
| 1 | Click **Money** in the sidebar. **Due** opens | 4 | "Money kholo. Due tab pehle khulta hai." | Open Money |
| 2 | Point at the row under **Overdue** | 4 | "Yahan late payment dikhta hai." | See what is late |
| 3 | Click **Prepare a reminder** | 4 | "Prepare a reminder pe click karo." | Click Prepare a reminder |
| 4 | Show the message | 4 | "Message ready hai. Naam, amount, date sab hai." | Message is ready |
| 5 | Click **Open in WhatsApp** | 4 | "Open in WhatsApp pe click karo." | Click Open in WhatsApp |
| end | Show the new WhatsApp tab with the message | 4 | "Ab client chuno aur send tum dabao. Krama khud nahi bhejta." | You press send |

### V-5-invoices-and-payments-due-4 · How to add your GST and bank details · about 35 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md).

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show an invoice with no payment details | 5 | "Client poochta hai, paisa kahan bhejein?" | |
| 1 | Click **Settings** in the sidebar | 4 | "Settings kholo." | Open Settings |
| 2 | Scroll to **Billing details** | 4 | "Billing details tak neeche jao." | Find Billing details |
| 3 | Type "24ABCDE1234F1Z6" in **GSTIN**. Pick "24 Gujarat" in **State** | 4 | "GSTIN likho aur State chuno." | Add GSTIN and state |
| 4 | Type "utsavplanners@okbank" in **UPI ID** | 4 | "Phir apna UPI ID likho." | Add your UPI ID |
| 5 | Click **Save billing details** | 4 | "Save billing details pe click karo." | Click Save billing details |
| end | Show **Saved.** | 4 | "Ho gaya. Ab har invoice pe yeh details chhapengi." | Details saved |
