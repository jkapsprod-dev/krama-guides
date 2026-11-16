// V-2-add-a-guest-3 · How to add children's counts · guides\2-guests\add-a-guest.md
import { navLink } from "./_lib.mjs";

export default {
  id: "V-2-add-a-guest-3",
  note: "add-a-guest",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, type, show }) {
    const panel = page.getByRole("region", { name: "Alok Saxena", exact: true });
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar", hold: 5, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap a guest in the family", hold: 6, do: () => tap(page.getByRole("link", { name: /^Alok Saxena Tau ji/ })) });
    await step({ n: 3, what: "Tap Edit beside Children", hold: 6, do: () => tap(panel.getByRole("button", { name: "Edit", exact: true })) });
    await step({ n: 4, what: "Type 2 in Children (3 to 12) and 1 in Infants (under 3)", hold: 8,
      do: async () => {
        const kids = panel.getByRole("spinbutton", { name: "Children (3 to 12)" });
        await tap(kids);
        await kids.fill("2");
        const infants = panel.getByRole("spinbutton", { name: "Infants (under 3)" });
        await tap(infants);
        await infants.fill("1");
      } });
    await step({ n: 5, what: "Tap Save", hold: 5, do: () => tap(panel.getByRole("button", { name: "Save", exact: true })) });
    await step({ n: "end", what: "Show the new counts under Children", hold: 4, do: () => show(panel.getByText("2 children", { exact: false })) });
  },
};
