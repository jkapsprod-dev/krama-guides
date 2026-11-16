// V-2-stays-and-rooms-3 · How to mark a family that needs a room · guides\2-guests\stays-and-rooms.md
// Bhavesh Pandya's family is not waiting for a room in the demo list.
import { navLink, openStays } from "./_lib.mjs";

export default {
  id: "V-2-stays-and-rooms-3",
  note: "stays-and-rooms",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const panel = page.getByRole("region", { name: "Bhavesh Pandya", exact: true });
    const needs = panel.getByRole("switch");
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Guests", hold: 5, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap Bhavesh Pandya", hold: 6, do: () => tap(page.getByRole("link", { name: /^Bhavesh Pandya Neighbour/ })) });
    await step({ n: 3, what: "Scroll to Stay & travel", hold: 5, do: () => show(needs) });
    await step({ n: 4, what: "Switch on Needs a room", hold: 5, do: () => tap(needs) });
    await step({ n: 5, what: "Open Stays & Travel and show Waiting for a room", hold: 6,
      do: async () => {
        await openStays({ page, tap, phone });
        await show(page.getByRole("region", { name: "Waiting for a room" }));
      } });
    await step({ n: "end", what: "Show the family in the waiting list", hold: 5, do: () => show(page.getByText("Bhavesh Pandya family").first()) });
  },
};
