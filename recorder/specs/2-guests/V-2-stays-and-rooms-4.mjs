// V-2-stays-and-rooms-4 · How to put a family in a room · guides\2-guests\stays-and-rooms.md
// Anil Agarwal's family (1 person) is waiting for a room in the demo list; rooms 104 and 105 are free.
import { openStays } from "./_lib.mjs";

export default {
  id: "V-2-stays-and-rooms-4",
  note: "stays-and-rooms",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const waiting = page.getByRole("region", { name: "Waiting for a room" });
    const family = waiting.locator("li").filter({ hasText: "Anil Agarwal family" });
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Stays & Travel", hold: 5, do: () => openStays({ page, tap, phone }) });
    await step({ n: 2, what: "Under Waiting for a room, tap Assign next to Anil Agarwal family", hold: 5, do: () => tap(family.getByRole("link", { name: "Assign" })) });
    await step({ n: 3, what: "Tap a free room on the Room map", hold: 5, do: () => tap(page.getByRole("link", { name: /^Room 104/ })) });
    await step({ n: 4, what: "Show Who's staying, Check-in and Check-out", hold: 6, do: () => show(page.getByRole("button", { name: /^Assign/ }).first()) });
    await step({ n: 5, what: "Tap Assign", hold: 5, do: () => tap(page.getByRole("button", { name: /^Assign/ }).first()) });
    await step({ n: "end", what: "Show the room coloured with the family's side", hold: 5, do: () => show(page.getByRole("link", { name: /^Room 104/ })) });
  },
};
