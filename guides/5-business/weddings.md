---
tags: [guide]
lane: 5
who: [planner]
status: final
checked: 2026-11-17
video: made
internal: false
code: ["app/business/[orgId]/weddings/page.tsx", "app/business/forms.tsx", "app/business/actions.ts"]
---
# Weddings

**Time it saves:** The family and you do not trade messages about access. You send one ID, they press one button.
**What it is:** The list of weddings your planner business is linked to, and the place to ask a family to add you.
**Why you'd use it:** A family says "please plan our wedding" and gives you their Wedding ID on WhatsApp. You type it in and wait for their yes.

## How to ask to join a wedding
Owners and admins only.
1. Ask the host for the wedding's ID. It starts with W-. Ask them to copy it and paste it to you.
2. Open **Weddings** in the sidebar.
3. Under **Ask for a wedding**, paste the ID into **Wedding ID**.
4. Click **Send request**. You see "Request sent. You'll see the wedding here once it is approved."
5. Wait for the host. Your request shows under **Waiting for approval**. You see nothing of the wedding yet.
6. When the host says yes, the wedding appears under **Linked weddings** and in **Your weddings** on Home.

**Tip:** A family can also add you with your planner code, with no ID needed. See [[planner-code]]. Vendors do not use this page to join: a vendor is linked when the family approves its quote.
**Stuck?** "We couldn't find a wedding with that ID that can take requests." Ask the host to copy the ID again. A wedding that has ended, or is read only, cannot take requests. A wedding can have only one planner, so the host may need to remove the current one first.

## How to cancel a request
Owners and admins only.
1. Open **Weddings**.
2. Find the wedding under **Waiting for approval**. You see its ID and the date you asked.
3. Click **Cancel request**.
4. Confirm in the box that opens.

**Tip:** Cancel if you typed the wrong ID. Then send a new request with the right one.
**Stuck?** No **Cancel request** button? Only owners and admins have it. The host may also have already answered, so check under **Linked weddings**.

## How to leave a wedding
Owners and admins only.
1. Open **Weddings**.
2. Find the wedding under **Linked weddings**.
3. Click **Leave wedding**.
4. Read the message, then confirm. You lose access straight away.

**Tip:** Leaving does not delete anything for the family. They can link you again later.
**Stuck?** You left by mistake? Ask the host to link you again with your planner code or by approving a new request.

## See also
- [[planner-code]]
- [[business-home]]
- [[wedding-id-and-code]]
- [[members]]
- [[set-up-your-business]]
- [[planning-team]]

## Video scripts

### V-5-weddings-1 · How to ask to join a wedding, then cancel a request · 41 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md). Before recording, end Utsav Planners' link to the Sharma-Patel wedding, and read that wedding's ID from the seed output.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show business Home with no wedding linked | 5 | Family ne apni wedding ka ID bheja hai. |  |
| 1 | Click **Weddings** in the sidebar | 4 | **Weddings** kholo. | Open Weddings |
| 2 | Paste the ID into **Wedding ID** under **Ask for a wedding** | 5 | Yahan **Wedding ID** paste karo. | Paste the Wedding ID |
| 3 | Click **Send request** | 4 | **Send request** dabao. | Click Send request |
| 4 | Show the request under **Waiting for approval** | 5 | Ab family ke yes ka intezaar. | Now wait for the host |
| 5 | Click **Cancel request** | 4 | Galat wedding? **Cancel request** pe click karo. | Click Cancel request |
| 6 | Click the confirm button in the box | 4 | Box mein confirm kar do. | Confirm |
| end | Show **Waiting for approval** empty | 4 | Ho gaya. Request hat gayi. | Request cancelled |

### V-5-weddings-2 · How to leave a wedding · 32 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md). Reset the lane first, so the wedding is linked.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show **Weddings** with the Sharma-Patel wedding linked | 6 | Shaadi ka kaam poora ho gaya? | Done with a wedding? |
| 1 | Click **Leave wedding** | 6 | **Leave wedding** pe click karo. | Click Leave wedding |
| 2 | Click the confirm button in the box | 8 | Confirm karo. Access turant band ho jayega. | Confirm |
| end | Show **Linked weddings** empty | 6 | Ho gaya. Wedding list se hat gayi. | Wedding left |
