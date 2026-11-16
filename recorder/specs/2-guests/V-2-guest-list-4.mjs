// V-2-guest-list-4 · How to tag many guests · guides\2-guests\guest-list.md
import { bulkBar, navLink, pick } from "./_lib.mjs";

export default {
  id: "V-2-guest-list-4",
  note: "guest-list",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, type, show }) {
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar", hold: 7, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tick the box beside three guests", hold: 8,
      do: async () => {
        for (const name of ["Alok Saxena", "Ishaan Saxena", "Ananya Sharma"]) await tap(pick(page, name));
      } });
    await step({ n: 3, what: "Type pune in Tag, e.g. pune", hold: 8, do: () => type(bulkBar(page).getByRole("textbox", { name: "Tag, e.g. pune" }), "pune") });
    await step({ n: 4, what: "Tap Add tag", hold: 7, do: () => tap(bulkBar(page).getByRole("button", { name: "Add tag", exact: true })) });
    await step({ n: "end", what: "Show the bar closing and the list again", hold: 4,
      do: () => show(page.getByRole("heading", { level: 1 }).first()) });
  },
};
