---
tags: [guide]
lane: 5
who: [admin]
status: draft
checked: no
video: none
internal: true
code: ["app/admin/growth/page.tsx", "app/admin/usage/page.tsx", "app/admin/revenue/page.tsx", "app/admin/bar-list.tsx", "app/admin/ui.tsx"]
---
# Growth, usage and revenue

**Time it saves:** The numbers are rolled up for you each night, so there is no export and no spreadsheet.
**What it is:** Three read-only pages of counts and charts: **Growth**, **Usage** and **Revenue**. Superadmins and analysts can open them. They hold no personal data.
**Why you'd use it:** Before the winter wedding season you want to know whether sign-ups are rising and which cities they come from.

## How to read Growth and Usage
1. Click **Growth** in the sidebar. The top row counts **Sign-ups**, **Weddings created**, **Businesses joined** and **Enquiries received**.
2. Under **Period**, click **12 weeks** or **12 months**. The page reloads for that window.
3. Read the charts: **Weddings created** and **Sign-ups** over time, then **Sign-up funnel**. The funnel shows how far each person got: **Signed up**, created a wedding, sent the first invite, paid the base plan.
4. Read the breakdowns: **Weddings by city**, **Weddings by expected guests**, **Sign-ups by account type**, **Businesses by type**.
5. Click **Usage**. It always shows the last 12 weeks, with no **Period** choice. Start with **Weddings active each week** and **RSVP response rate**.

**Tip:** A wedding counts as active when at least one member opened it that week. A business counts as active when it added or changed a lead, note, quote, proposal or invoice that week.
**Stuck?** A pill that says **Hidden** means fewer than 5 weddings or accounts. When one cell is hidden, its smallest neighbour is hidden too, so nobody can work it out from the total. Totals always show. If today's sign-ups are missing, wait: figures are rolled up each night at 2 am India time, up to yesterday.

## How to read Revenue
1. Click **Revenue** in the sidebar.
2. Under **Period**, click **12 weeks** or **12 months**.
3. Read the top row: **Revenue**, **Refunds (incl. GST)**, **GST charged**, **New paying weddings**, **Wedding revenue per new paying wedding**, **Business plans**, **Referral rewards given**.
4. Read **Revenue by product**. The attach rate is the share of new paying weddings that bought that product.
5. Read **Where paying weddings came from**. The sources are a linked planner code, a referral code, or neither.
6. Read **Planner commission** for the total as of last night.

**Tip:** Revenue is net of GST. Refunds are what was paid back, GST included. Test payments are left out. The figures come from Krama's own billing records, not from Razorpay.
**Stuck?** A dash on **Wedding revenue per new paying wedding** means no new paying weddings in the period. A zero is a real zero.

## See also
- [[admin-overview]]
- [[admin-billing]]

## Video scripts
None. Admin guides have no videos.
