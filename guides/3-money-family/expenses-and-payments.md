---
tags: [guide]
lane: 3
who: [couple, family, planner]
status: draft
checked: no
video: script
internal: false
code: [app/w/[workspaceId]/money/expenses/expense-form.tsx, app/w/[workspaceId]/money/expenses/[commitmentId]/page.tsx, app/w/[workspaceId]/money/expenses/[commitmentId]/payment-controls.tsx, app/w/[workspaceId]/money/payment-sheet.tsx, app/w/[workspaceId]/money/actions.ts]
---
# Expenses and payments

**What it is:** An expense is something you have booked, like a caterer or a decorator. Under it you note every payment, and who paid it.
**Why you'd use it:** The caterer takes a ₹1,00,000 advance today and the rest after the wedding. Nani paid the advance in cash. You note both, so everyone knows who gave what.

**Who can see this:** Hosts, planners and family see every expense and amount. Helpers and viewers never see them. Krama only records what your family has already paid. It does not hold, move or pay money.

## How to add an expense
1. On a phone, tap the (+) button, then **Add an expense**. On a computer, open **Money** and tap **Add expense**.
2. Type what it is for, like "Wedding lunch for 400".
3. Type the **Total agreed**, like 2,50,000 or 2.5L. Pick **Whose side**.
4. Pick the **Vendor**, **Budget category** and **Function**. If the vendor is not in the list, choose **A new vendor…** and type the name.
5. Under **Payments**, choose **Nothing paid or scheduled yet**, **Paid in full today** or **Schedule the first instalment**.
6. Tap **Save expense**. The expense opens on its own page.

**Tip:** You can leave **Vendor**, **Budget category** and **Function** empty and fill them in later with **Edit**.
**Stuck?** If a red line says "Please enter an amount like 2,50,000 or 2.5L.", fix the **Total agreed**. If you land on Home, the wedding is read-only, so adding is switched off.

## How to schedule instalments
1. Open **Money**, then the **Expenses** tab. Tap the expense.
2. Scroll to **Payments**.
3. Tap **Schedule an instalment**.
4. Type the **Amount**.
5. Pick the date under **Due on**.
6. Tap **Add instalment**.

**Tip:** When you add a new expense, **Schedule the first instalment** does the same thing at once. Leave **Instalment amount** empty to use the full amount.
**Stuck?** The instalment shows on the **Due** tab and on the expense. If it is not there, check that you picked a date under **Due on**.

## How to record a payment and who paid
1. Open **Money**, then the **Expenses** tab. Tap the expense.
2. Tap **Record a payment**. The amount is filled in with what is left.
3. Check **Amount paid** and **Paid on**.
4. Pick **How** you paid. Then pick **Who paid**: **Bride’s family**, **Groom’s family**, **The couple**, **Shared** or **Someone else**. For **Someone else**, type **Their name**.
5. Type a **Reference**, like a UPI number or cheque number, if you want.
6. Tap **Save payment**.

**Tip:** Krama remembers how and who paid last time, so the next payment is quicker. Your choices also feed **Who’s contributing** on the **Due** tab.
**Stuck?** If you saved a wrong payment, tap **Mark as not paid** or **Delete payment** next to it. If you paid more than agreed, the page says so.

## How to attach a receipt
1. Open **Money**, then the **Expenses** tab. Tap the expense.
2. Find the payment under **Payments**.
3. Tap **Attach receipt**.
4. Choose a photo or a PDF.
5. Wait while it says "Uploading…". Then **View receipt** appears.

**Tip:** You can also add the receipt when you record the payment. Use the **Receipt (optional)** box.
**Stuck?** A file over 20 MB is too big. Take a smaller photo. If a receipt is already there, the button says **Replace receipt**. Use **Remove receipt** to take it off.

## See also
- [[money-due]]
- [[budget]]
- [[vendors]]
- [[snap-a-bill]]
- [[money-by-side]]
- [[files]]

## Video scripts

### V-3-expenses-and-payments-1 · How to add an expense · about 60 s · phone first
Demo login: lane 3, host (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the Money page with no expense for the decorator | 4 | "Decor book kar liya, par kahin likha nahi hai." |  |
| 1 | Tap the (+) button, then **Add an expense** | 3 | "Plus dabao, phir Add an expense." | Tap Add an expense |
| 2 | Type "Mandap decor" | 3 | "Pehle likho yeh kis cheez ka hai." | Say what it is for |
| 3 | Type 2,50,000 in **Total agreed** | 3 | "Total agreed mein amount likho." | Type the Total agreed |
| 4 | Pick **Rangoli Decor** in **Vendor** and **Sangeet** in **Function** | 5 | "Vendor aur Function chuno." | Pick vendor and function |
| 5 | Choose **Schedule the first instalment** under **Payments** | 4 | "Payments mein Schedule the first instalment chuno." | Choose how it is paid |
| 6 | Tap **Save expense** | 3 | "Phir Save expense dabao." | Tap Save expense |
| end | Show the new expense page | 3 | "Expense ban gaya." | Done |

### V-3-expenses-and-payments-2 · How to schedule instalments · about 50 s · phone first
Demo login: lane 3, host (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show an expense with a big balance and no dates | 4 | "Decor ka paisa kisht mein dena hai, par dates kahin nahi hain." |  |
| 1 | Open **Money**, **Expenses** tab, then tap "Mandap decor" | 4 | "Expenses tab se expense kholo." | Open the expense |
| 2 | Scroll to **Payments** and tap **Schedule an instalment** | 3 | "Payments mein Schedule an instalment dabao." | Tap Schedule an instalment |
| 3 | Type 1,00,000 in **Amount** and pick a date under **Due on** | 5 | "Amount likho aur Due on mein date chuno." | Amount and due date |
| 4 | Tap **Add instalment** | 3 | "Add instalment dabao." | Tap Add instalment |
| end | Show the instalment in the list | 3 | "Yeh ab Due tab mein bhi dikhega." | It shows on the Due tab |

### V-3-expenses-and-payments-3 · How to record a payment and who paid, then attach a receipt · about 40 s · phone first
Demo login: lane 3, host (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show an expense where Nani paid the advance in cash | 4 | "Nani ne advance diya, par kisi ko yaad nahi." |  |
| 1 | Open the expense and tap **Record a payment** | 3 | "Expense kholo, Record a payment dabao." | Tap Record a payment |
| 2 | Show **Amount paid** and **Paid on** | 3 | "Amount paid aur Paid on check karo." | Check amount and date |
| 3 | Pick **Cash** in **How** | 3 | "How mein Cash chuno." | Pick how it was paid |
| 4 | Pick **Someone else** in **Who paid** and type "Nani" in **Their name** | 5 | "Who paid mein Someone else chuno aur Nani ka naam likho." | Note who paid |
| 5 | Tap **Save payment** | 3 | "Save payment dabao." | Tap Save payment |
| 6 | Open the expense and find the payment under **Payments** | 3 | "Expense kholo aur payment dhundho." | Find the payment |
| 7 | Tap **Attach receipt** | 3 | "Attach receipt dabao." | Tap Attach receipt |
| 8 | Choose a receipt photo | 4 | "Receipt ki photo ya PDF chuno." | Choose a photo or PDF |
| end | Show **View receipt** | 3 | "Ab receipt yahin rakhi hai." | Receipt saved |
