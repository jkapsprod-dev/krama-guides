---
tags: [guide]
lane: 5
who: [planner, vendor]
status: draft
checked: no
video: script
internal: false
code: ["app/business/[orgId]/documents/page.tsx", "app/business/[orgId]/documents/documents-forms.tsx", "app/business/[orgId]/documents/actions.ts", "app/business/[orgId]/documents/[docId]/open/route.ts"]
---
# Documents

**Time it saves:** Your licences, insurance and contracts live in one private place, so you do not scroll old WhatsApp chats to find a PDF.
**What it is:** A private store for your business papers, with an expiry date and a warning before a paper runs out.
**Why you'd use it:** The venue asks for your FSSAI licence and your insurance on the morning of the Mehendi, and you can open both in seconds.

Owners and admins see every document. Staff cannot see contracts, quotes or money documents, and they cannot add them.

## How to upload a document
1. Open **Documents**. For a planner it sits under **Weddings**. For a vendor it sits under **Work**.
2. Under **Add a document**, click **File** and choose the file. You can use a PDF, an image, a Word file, an Excel file or a CSV, up to 20 MB.
3. Check the **Title**. It is filled from the file name, and you can change it.
4. Pick **What is it?**, such as **Licence**, **Insurance** or **Permit**.
5. Click **Upload**. You see "Added." and the file shows in the list.

**Tip:** Give each document a clear title, like "FSSAI licence 2027", so you can spot it fast.
**Stuck?** If it says "That file type isn't supported.", save the file as a PDF or an image and try again. If it says "That file is over 20 MB.", make the file smaller.

## How to get reminded before a document expires
1. Open **Documents**.
2. When you upload a file, set **Expires on (optional)**. For a file already there, click **Edit**, set **Expires on (optional)** and click **Save**.
3. From 30 days before that date, a box called **Needs your attention** shows at the top of **Documents**. It says "{title} expires on {date}."
4. After the date, the line says "{title} expired on {date}." and the document shows **Expired**.

The reminder is this box, so it shows when you open **Documents**.

**Tip:** Look at **Documents** at the start of each wedding season. Renew the papers that show a date soon.
**Stuck?** No box? Then no document has an expiry date inside the next 30 days. Check that you set **Expires on (optional)**.

## How to open or delete a document
1. Open **Documents**.
2. Find the document in the list.
3. Click **Open** to see it in a new tab, or **Download** to save it.
4. To remove it, click **Delete**. Click **Delete** again to confirm.

**Tip:** Click **Edit** to change the title, the type or the expiry date. You do not need to upload the file again.
**Stuck?** Delete removes the file for good. If you may need it again, download it first.

## See also
- [[set-up-your-business]]
- [[team]]
- [[proposals]]
- [[invoices-and-payments-due]]
- [[files]]

## Video scripts

### V-5-documents-1 · How to upload a document · about 30 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md). The robot uses a made-up PDF called "FSSAI licence (sample).pdf".

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show **Documents** with no files | 5 | "Licence ka PDF ab phir se dhoondhna padega?" | Hunting for a PDF again |
| 1 | Click **Documents** in the sidebar | 5 | "Documents kholo." | Open Documents |
| 2 | Click **File** under **Add a document** and choose the sample PDF | 4 | "File chuno." | Choose the file |
| 3 | Type "FSSAI licence 2027" in **Title** and pick **Licence** in **What is it?** | 4 | "Title likho aur type chuno." | Add a title and type |
| 4 | Click **Upload** | 4 | "Upload pe click karo." | Click Upload |
| end | Show "Added." and the document in the list | 4 | "Ho gaya. Licence ab ek jagah safe hai." | Done |

### V-5-documents-2 · How to get reminded before a document expires, then open or delete a document · about 45 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md). Start with the licence from V-5-documents-1.
From the part on "How to open or delete a document": Start with a second sample file saved as "Old brochure".

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the licence with no expiry date | 5 | "Licence kab expire hoga, yaad hai?" | When does it expire? |
| 1 | Click **Edit** on the licence | 3 | "Edit pe click karo." | Click Edit |
| 2 | Set **Expires on (optional)** to a date 20 days away | 3 | "Expires on mein date daalo." | Set the expiry date |
| 3 | Click **Save** | 3 | "Save pe click karo." | Click Save |
| 4 | Point to the **Needs your attention** box at the top | 4 | "Date paas aayi toh yeh box upar dikhega." | A reminder shows up |
| 5 | Hold on the box and the document's expiry tag | 4 | "Ho gaya. Ab expiry se pehle yaad aa jayega." | Done |
| 6 | Click **Open** on the licence | 3 | "Open se file dekho." | Click Open |
| 7 | Click **Delete** on "Old brochure" | 3 | "Delete pe click karo." | Click Delete |
| 8 | Click **Delete** in the box that asks | 5 | "Phir se Delete dabao. File hamesha ke liye hat jayegi." | Confirm the delete |
| end | Show one file left | 4 | "Ho gaya. Sirf kaam ki file bachi." | Done |
