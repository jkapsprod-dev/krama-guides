// V-2-guest-list-3 · How to invite many guests at once · guides\2-guests\guest-list.md
import { bulkBar, navLink, pick } from "./_lib.mjs";

export default {
  id: "V-2-guest-list-3",
  note: "guest-list",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar", hold: 5, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tick the box beside three guests", hold: 7,
      do: async () => {
        for (const name of ["Alok Saxena", "Ishaan Saxena", "Ananya Sharma"]) await tap(pick(page, name));
      } });
    await step({ n: 3, what: "Tap Choose a function", hold: 6, do: () => tap(bulkBar(page).getByRole("combobox", { name: "Choose a function" })) });
    await step({ n: 4, what: "Pick Haldi", hold: 6, do: () => bulkBar(page).getByRole("combobox", { name: "Choose a function" }).selectOption({ label: "Haldi" }) });
    await step({ n: 5, what: "Tap Invite", hold: 6, do: () => tap(bulkBar(page).getByRole("button", { name: "Invite", exact: true })) });
    await step({ n: "end", what: "Show the function letters on the three rows", hold: 4,
      do: () => show(page.getByRole("link", { name: /^Alok Saxena/ })) });
  },
};
