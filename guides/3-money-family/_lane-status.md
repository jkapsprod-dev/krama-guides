---
tags: [guides, lane-status]
lane: 3
folder: 3-money-family
made: 2026-11-14
app: krama-celeb main (git -C app pull said "Already up to date")
---
# Lane 3 status · Money & family

Nothing is committed. Written only in `guides\3-money-family\`. Reading level: all 18 notes are grade 2 to 4 (limit 8). No exclamation marks. The only dash in any guide text is the app's own label in `files.md` (see Questions, 1).

Working folder note: the session opened in `C:\Users\jayka\code\Guides`, which is empty. The real guides repo is `C:\Users\jayka\code\krama-guides`, so everything was written there.

## Notes written (18)

| Note | Status | Tasks | Video scripts |
|---|---|---|---|
| money-due | draft | 4 | V-3-money-due-1 to 4 (export one is desktop first) |
| budget | draft | 4 | V-3-budget-1 to 4 |
| expenses-and-payments | draft | 4 | V-3-expenses-and-payments-1 to 4 |
| snap-a-bill | draft | 3 | 2 (the "send for reading" fallback has none) |
| vendors | draft | 3 | V-3-vendors-1 to 3 |
| quotes-to-approve | draft | 1 | V-3-quotes-to-approve-1 |
| money-by-side | draft | 2 | V-3-money-by-side-1 to 2 |
| gold-today | draft | 2 | V-3-gold-today-1 to 2 |
| shagun | draft | 4 | V-3-shagun-1 to 4 |
| family-feed | draft | 3 | V-3-family-feed-1 to 3 |
| photos | draft | 3 | V-3-photos-1 to 3 |
| upload-qr | draft | 3 (one is the guest side) | V-3-upload-qr-1 to 3 |
| find-my-photos | planned | none | none |
| heads-up | draft | 2 | V-3-heads-up-1 to 2 |
| smart-helpers | draft | 1 | V-3-smart-helpers-1 |
| notifications | draft | 5 | V-3-notifications-1 to 5 |
| outfits | draft | 3 | V-3-outfits-1 to 3 |
| files | draft | 3 | V-3-files-1 to 3 |

Also written: `_section-intro.md` (English and Hinglish).

## Where the code differs from the inventory

These notes follow the code, not the inventory.

- **Vendors are money-role only.** The inventory and the help article say every member sees vendor names and phones. The Vendors pages all call `requireMoney` (`money/load.ts`), so helpers and viewers get a 404. The note says "hosts, planners and family only".
- **Smart helpers:** Settings shows only to hosts and planners (`settings/layout.tsx`), so family cannot change them. `who` is couple and planner.
- **Upload QR:** the button and page are host and planner only, not family, and need the gallery on.
- **Quotes:** only a host with an editable wedding sees **Approve**. Planner and family can read the list.
- **Family feed:** viewers can react and report (they just cannot post). Only a host sees report counts and can remove others' posts.
- **Photos:** code lets any member upload, but the (+) menu hides Photo for viewers.
- **Find my photos:** the host **Face search** card is live in the app. A host can switch it on when the add-on is granted, then guests see "Find my photos is coming soon." Guests see nothing if the host did not switch it on. The note stays planned.
- **Money page:** Export and the header **Add expense** button are desktop only. On a phone, use (+) then **Add an expense**. **Edit budget** shows only on the empty Money page. The page heading says **Budget** while the menu item says **Money**.
- **Typical split card** shows only if a budget band was picked at set-up and nothing is planned yet.
- **Snap a bill:** **Send this photo for reading** shows only when the phone fails and the OCR.Space key is set on the server.
- **Morning email:** **Mondays only** is for hosts only. Off by default; sends only between 8 and 12 local time; sends nothing if there is nothing to report.
- **Notifications:** hosts and planners have no menu item, only the bell then **See all notifications**.
- **Files:** **Upload files** is for host, planner and family only. The **Has money details** box is ticked and locked for files tied to a vendor, expense or payment.
- **Heads-up:** weather covers only open-air functions with a city, about 9 days ahead, from a list of 35 cities. Festivals are 2026 only.
- **Guest upload page** shows the brand "Krama Celebrations", not "Krama Events".

## Features the inventory missed

- Money: **Who's contributing** card on **Due**; **Expenses** tab (category bars and ledger); expense **Edit** and **Delete expense**; payment **Mark as not paid** and **Delete payment**; **Replace receipt** and **Remove receipt**; budget category **Rename**, **Remove**, **Note**; per-line side and **Bride %**; **Download CSV** on the side print page; a mic button on the expense description (voice add-on).
- Vendors: **Edit**, **Delete vendor**, **Add expense for {name}**, a Files section on a vendor page.
- Shagun: **Edit entry** and **Delete entry**; (+) **Add a shagun entry**; Direction chips.
- Family feed: **Older posts**, presence faces.
- Photos: single-photo **Open** and **Download**, an "Other" album, a storage bar, "The gallery is full".
- Notifications: **Delete reminder**, **Clear read**, one-click stop in mail apps (`app/api/brief/unsubscribe/[token]`), settings checkboxes for function time changes, running late and the 3-day payment email.
- Outfits: up to 3 photos, **Delete outfit**.
- Files: rename, **Open**, **Download**, **Delete file**.
- Snap a bill also exists on business Purchases (lane 5).

## Questions for you

1. **Em dash in a label (answered by Jay: keep the exact label).** The app's label is **Has money details — hide from helpers and viewers**. It stays exactly as the app shows it, in bold, in `files.md` (steps and one video cell). It is the only dash in the lane's guide text. Before the website publish, the website step may need to allow this one dash, or the app label can change.
2. **Helpers and vendor names.** Should helpers see vendor names somewhere? The help article says a helper can call the decorator, but the Vendors page gives helpers a 404. The event-day Contacts tab (lane 4) may be the real route. The help article text should be fixed on the website.
3. **Is the OCR.Space key set on the live site?** If not, the "send this photo for reading" task in snap-a-bill should come out.
4. **Demo data (Appendix E) lacks quotes,** so V-3-quotes-to-approve-1 cannot be recorded until a Rangoli Decor quote from Utsav Planners is seeded for lane 3.
5. **Budget videos assume** a budget band was picked at set-up and nothing is planned yet. Is that true of the lane 3 seed? If not, the typical split card will not show.
6. **Demo households.** Videos use made-up names such as the Mehta family and Mama ji. Add them to Appendix E?
7. **Viewers on the feed and photos.** Viewers can react, report and upload photos in the code. The inventory says "read only". Is the code right, or a bug to fix in the app?
8. **Feed composer label.** **Write a post** is screen-reader only. The guide tells people to tap the box "Share an update with the family…". OK?
9. **"Krama Celebrations"** on the guest photo upload page. Intended?
10. **Hosts and planners get no Notifications menu item,** only the bell. Intended?
11. **Money page title** reads **Budget** while the menu says **Money**. Fix in the app, or leave?
12. **Hinglish words** the writers used: "Zevar", "tyohaar", "Plus button" (own wording). Fine for the voice?
13. **Status is `draft`** on every live note until Wave 5 checks it on the real app (`checked: no`).
