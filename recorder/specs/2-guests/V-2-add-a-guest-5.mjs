// V-2-add-a-guest-5 · How to change a guest's details · guides\2-guests\add-a-guest.md
import { guestForm, navLink } from "./_lib.mjs";

export default {
  id: "V-2-add-a-guest-5",
  note: "add-a-guest",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show }) {
    const panel = page.getByRole("region", { name: "Alok Saxena", exact: true });
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar and tap the guest", hold: 8,
      do: async () => {
        await tap(navLink(page, "Guests"));
        await tap(page.getByRole("link", { name: /^Alok Saxena Tau ji/ }));
      } });
    await step({ n: 2, what: "Tap Edit", hold: 7, do: () => tap(panel.getByRole("link", { name: "Edit", exact: true })) });
    await step({ n: 3, what: "Change the Phone", hold: 8,
      do: async () => {
        await tap(guestForm(page).getByLabel("Phone", { exact: true }));
        await page.keyboard.press("Control+A");
        await page.keyboard.type("98250 55501", { delay: 85 });
      } });
    await step({ n: 4, what: "Tap Save guest", hold: 7, do: () => tap(guestForm(page).getByRole("button", { name: "Save guest" })) });
    await step({ n: "end", what: "Show the guest with the new phone", hold: 4, do: () => show(page.getByRole("link", { name: /98250 55501/ })) });
  },
};
