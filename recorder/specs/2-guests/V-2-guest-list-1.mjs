// V-2-guest-list-1 · How to find a guest · guides\2-guests\guest-list.md
import { guestListRegion, navLink } from "./_lib.mjs";

export default {
  id: "V-2-guest-list-1",
  note: "guest-list",
  role: "host", // lane 2, couple (Appendix E)
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, type, show }) {
    const region = guestListRegion(page);
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar", hold: 6, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap the search box Search by name, relation, family or phone", hold: 7,
      do: () => tap(region.getByRole("searchbox", { name: "Search guests" })) });
    await step({ n: 3, what: "Type Mausi", hold: 6, do: () => page.keyboard.type("Mausi", { delay: 85 }) });
    await step({ n: 4, what: "Tap Search", hold: 5, do: () => tap(region.getByRole("button", { name: "Search", exact: true })) });
    await step({ n: 5, what: "Tap the guest's name in the result", hold: 6,
      do: () => tap(page.getByRole("link", { name: /^Anil Kapoor Mausi/ })) });
    await step({ n: "end", what: "Show the guest's details", hold: 4,
      do: () => show(page.getByRole("region", { name: "Anil Kapoor" })) });
  },
};
