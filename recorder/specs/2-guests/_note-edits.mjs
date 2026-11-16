// What the running app showed, as edits to the lane 2 notes. Applied by update-notes.mjs.
// rowEdits: video id -> { row number -> new "Robot does" text }.
// voiceEdits: video id -> { row number -> [voice, caption] } (only where the screen changed the words).
// textEdits: note name -> [[old text, new text]] anywhere in the note (steps, tips, stuck lines, intros).

const HOME = "Show **Home**";
export const rowEdits = {
  "V-2-guest-list-1": { 0: HOME },
  "V-2-guest-list-2": { 0: HOME },
  "V-2-guest-list-3": { 0: HOME },
  "V-2-guest-list-4": { 0: HOME },
  "V-2-guest-list-5": { 0: HOME },
  "V-2-add-a-guest-3": { 0: HOME },
  "V-2-add-a-guest-4": { 3: "Point at **View Meena Bua**", 4: "Tap **Add anyway**" },
  "V-2-add-a-guest-5": { 0: HOME },
  "V-2-add-a-guest-2": { 1: "Type Meera Sharma in **Full name**" },
  "V-2-import-guests-1": { 0: HOME },
  "V-2-stays-and-rooms-2": { 2: "Find **Add rooms** under the **Room map**; the form is already open" },
  "V-2-import-guests-2": { 2: "Tick the family in **Put these together?**", 4: "Tap the button Import 4 guests" },
  "V-2-import-guests-3": {
    0: HOME,
    2: "Tap **From your phone's contacts**",
    3: "Pick three contacts on the phone",
    4: "Show the review list",
    5: undefined,
  },
};

export const textEdits = {
  "stays-and-rooms": [
    [
      "2. Tap **Add rooms** under the **Room map**. A form opens.",
      "2. Find **Add rooms** under the **Room map**. With no rooms yet, the form is already open. If it is closed, tap **Add rooms** to open it.",
    ],
  ],
  "add-a-guest": [
    [
      "After you save, a card shows **Message on WhatsApp**, **Send by email** and **Copy RSVP link**. You press send in your own app.",
      "After you save, a card shows **Message on WhatsApp** and **Copy RSVP link**. If you typed an email, it also shows **Send by email**. You press send in your own app.",
    ],
  ],
};
