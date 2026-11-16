// V-2-stays-and-rooms-5 · How to print the rooming list for the hotel, then mark a destination wedding · guides\2-guests\stays-and-rooms.md
import { navLink, openStays } from "./_lib.mjs";

export default {
  id: "V-2-stays-and-rooms-5",
  note: "stays-and-rooms",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays`,

  async run({ page, step, tap, show, phone }) {
    await step({ n: 0, what: "Show the Stays & rooms page with filled rooms", hold: 5 });
    await step({ n: 1, what: "Open Stays & Travel from More", hold: 3, do: () => openStays({ page, tap, phone }) });
    await step({ n: 2, what: "Tap Rooming list", hold: 3, do: () => tap(page.getByRole("link", { name: "Rooming list" })) });
    await step({ n: 3, what: "Tap Print", hold: 5, do: () => tap(page.getByRole("button", { name: "Print", exact: true }).or(page.getByRole("link", { name: "Print", exact: true })).first()) });
    await step({ n: 4, what: "Show the list on screen", hold: 4, do: () => show(page.getByRole("heading", { level: 1 }).first()) });
    await step({ n: 5, what: "Show the Rooming list page", hold: 4, do: () => show(page.getByRole("heading", { level: 1 }).first()) });
    await step({ n: 6, what: "Open Stays & Travel from More", hold: 4, do: () => openStays({ page, tap, phone }) });
    await step({ n: 7, what: "Turn on Destination wedding", hold: 4, do: () => tap(page.getByRole("switch", { name: /^Destination wedding/ })) });
    await step({ n: 8, what: "Open Tasks and show the destination checklist", hold: 4, do: () => tap(navLink(page, "Tasks")) });
    await step({ n: "end", what: "Hold on the checklist", hold: 4, do: () => show(page.getByRole("heading", { level: 1 }).first()) });
  },
};
