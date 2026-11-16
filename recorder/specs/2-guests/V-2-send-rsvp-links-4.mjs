// V-2-send-rsvp-links-4 · How to record a reply for a guest · guides\2-guests\send-rsvp-links.md
// Off camera, Alok Saxena is invited to Haldi, so he is waiting for a reply there.
import { inviteOffCamera, navLink } from "./_lib.mjs";

export default {
  id: "V-2-send-rsvp-links-4",
  note: "send-rsvp-links",
  role: "host",
  start: (seed) => seed.weddingPath,
  setup: ({ page, seed }) => inviteOffCamera(page, seed, "Alok Saxena", "Haldi", seed.weddingPath),

  async run({ page, step, tap, show }) {
    const panel = page.getByRole("region", { name: "Alok Saxena", exact: true });
    const haldi = panel.locator("li").filter({ hasText: "Haldi" });
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar and tap the guest", hold: 8,
      do: async () => {
        await tap(navLink(page, "Guests"));
        await tap(page.getByRole("link", { name: /^Alok Saxena Tau ji/ }));
      } });
    await step({ n: 2, what: "Scroll to Functions and tap the reply box under Haldi", hold: 8, do: () => tap(haldi.getByRole("combobox")) });
    await step({ n: 3, what: "Pick Attending", hold: 7, do: () => haldi.getByRole("combobox").selectOption({ label: "Attending" }) });
    await step({ n: 4, what: "Type 3 in the number box", hold: 7,
      do: async () => {
        const size = haldi.getByRole("spinbutton");
        await tap(size);
        await size.fill("3");
        await page.keyboard.press("Tab");
      } });
    await step({ n: "end", what: "Show the guest as coming", hold: 4, do: () => show(haldi) });
  },
};
