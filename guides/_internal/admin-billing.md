---
tags: [guide]
lane: 5
who: [admin]
status: draft
checked: no
video: none
internal: true
code: ["app/admin/billing/page.tsx", "app/admin/billing/forms.tsx", "app/admin/billing/actions.ts", "app/admin/billing/documents-section.tsx"]
---
# Billing

**Time it saves:** Prices, payment alerts, planner payouts and referrals are all on one page, each change with its reason in the log.
**What it is:** The superadmin page for what Krama sells and what Krama owes planners. It also holds Krama's own invoice details. The pilot switch is not here. It sits on **Operations**. The app keeps records only. It does not move money.
**Why you'd use it:** A planner asks why her payout for the Sharma-Patel wedding has not been marked paid. You open **Planner earnings** and see it is waiting on the CA review.

## How to set prices
1. Click **Billing** in the sidebar. Scroll to **Prices and limits**.
2. Find the product. Change **Price (₹, before GST)**, **GST rate**, **On sale**, or a limit such as **Messages**, **Photos**, **Gallery GB**, **Files GB** or **Questions a day**.
3. Type a **Reason (kept in the audit log)**. Use 10 to 300 characters.
4. Click **Save price**.
5. The form says "Saved."

**Tip:** A change applies to new orders only. Add-ons stay off sale until their feature ships.
**Stuck?** "Give a reason of 10 to 300 characters." means the reason is too short or too long. "Check the values: something isn't valid." means a field is wrong. Fix it and save again.

## How to approve planner earnings
1. Scroll to **Planner earnings**. The counts line shows how many are due, waiting for their payout date, and approved.
2. Look at the rows under it. These earnings have reached their payout date and the order is still paid. All are ticked.
3. Untick any you want to leave for later.
4. Type a **Reason (kept in the audit log)**.
5. Click **Approve selected**.

**Tip:** Commission is off until you set it in **Planner commission**. With it off, nothing is due.
**Stuck?** No **Approve selected** button means nothing is due yet. Earnings wait out the refund hold first.

## How to record the CA review and mark an earning paid
1. In **Planner earnings**, read the line above the review box. Until the CA has reviewed TDS and GST on commission, no payout can be marked paid.
2. Type a reason in the review box. Click **Record CA review**.
3. Pay the planner yourself, by UPI or bank, outside the app. Krama does not move the money.
4. Find the approved earning. Type the **UPI or bank reference** and a reason.
5. Click **Mark paid**.

**Tip:** **Mark paid** stays greyed out until **Record CA review** is done. **Undo CA review** switches it off again.
**Stuck?** "Record the CA review of TDS and GST first." means the review is not recorded.

## How to void a referral
1. Scroll to **Referrals**. Flagged referrers are listed first in red. They have 3 or more referrals in 30 days.
2. Find the referral. Each row shows the new wedding, the wedding whose code it used, and its status.
3. Type a **Reason (kept in the audit log)**.
4. Tick **Yes, void this referral**. If the reward was given, the box reads **Yes, void it and take back the reward**.
5. Click **Void referral**.

**Tip:** A voided referral shows **Void** with its reason. Only Krama staff see this page.
**Stuck?** No void button on a row means it is already void.

## How to resolve a payment alert
1. Scroll to **Payment alerts**.
2. Read the alert and fix the cause where it happened, for example a refund in the provider dashboard.
3. Type a reason and click **Mark resolved**.

**Tip:** **Reconciliation** checks each India day against Razorpay the next morning. Any difference becomes an alert here.
**Stuck?** "Nothing needs you." means there are no open alerts.

## See also
- [[admin-operations]]
- [[admin-growth-usage-revenue]]
- [[commission-earnings]]
- [[subscription]]

## Video scripts
None. Admin guides have no videos.
