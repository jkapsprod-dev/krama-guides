// V-2-guest-list-5 · How to delete many guests · guides\2-guests\guest-list.md
// Off camera, three extra made-up guests are added through the Add a guest form.
import { addGuestsOffCamera, bulkBar, navLink, pick } from "./_lib.mjs";

const EXTRA = [
  { name: "Aarav Rathod", phone: "98700 11101" },
  { name: "Aarti Rathod", phone: "98700 11102" },
  { name: "Aditi Rathod", phone: "98700 11103" },
];

export default {
  id: "V-2-guest-list-5",
  note: "guest-list",
  role: "host",
  start: (seed) => seed.weddingPath,
  setup: ({ page, seed }) => addGuestsOffCamera(page, seed, EXTRA, seed.weddingPath),

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar", hold: 5, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tick the box beside the three extra guests", hold: 7,
      do: async () => {
        for (const g of EXTRA) await tap(pick(page, g.name));
      } });
    await step({ n: 3, what: "Tap Delete", hold: 6, do: () => tap(bulkBar(page).getByRole("button", { name: "Delete", exact: true })) });
    await step({ n: 4, what: "Show the box that says how many guests will go", hold: 7,
      do: () => show(page.getByRole("button", { name: "Yes, delete" })) });
    await step({ n: 5, what: "Tap Yes, delete", hold: 5, do: () => tap(page.getByRole("button", { name: "Yes, delete" })) });
    await step({ n: "end", what: "Show the shorter list", hold: 4, do: () => show(page.getByRole("heading", { level: 1 }).first()) });
  },
};
