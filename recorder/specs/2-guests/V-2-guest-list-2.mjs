// V-2-guest-list-2 · How to filter by side or reply · guides\2-guests\guest-list.md
import { guestListRegion, navLink } from "./_lib.mjs";

export default {
  id: "V-2-guest-list-2",
  note: "guest-list",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show }) {
    const chips = page.getByRole("group", { name: "Filter guests" });
    const region = guestListRegion(page);
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar", hold: 5, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap Bride's side", hold: 6, do: () => tap(chips.getByRole("link", { name: "Bride’s side" })) });
    await step({ n: 3, what: "Tap Awaiting", hold: 7, do: () => tap(chips.getByRole("link", { name: "Awaiting" })) });
    await step({ n: 4, what: "Tap More filters", hold: 5, do: () => tap(region.getByText("More filters", { exact: true })) });
    await step({ n: 5, what: "Pick Haldi in Any function, then tap Apply", hold: 7,
      do: async () => {
        const fn = region.getByRole("combobox", { name: "Any function" });
        await tap(fn);
        await fn.selectOption({ label: "Haldi" });
        await tap(region.getByRole("button", { name: "Apply", exact: true }));
      } });
    await step({ n: "end", what: "Show the short list", hold: 4, do: () => show(page.getByRole("heading", { level: 1 }).first()) });
  },
};
