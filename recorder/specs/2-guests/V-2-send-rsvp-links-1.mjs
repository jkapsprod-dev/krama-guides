// V-2-send-rsvp-links-1 · How to invite a guest to functions · guides\2-guests\send-rsvp-links.md
// Alok Saxena is not invited to Haldi in the demo list.
import { navLink } from "./_lib.mjs";

export default {
  id: "V-2-send-rsvp-links-1",
  note: "send-rsvp-links",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show }) {
    const panel = page.getByRole("region", { name: "Alok Saxena", exact: true });
    const haldi = panel.locator("li").filter({ hasText: "Haldi" });
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar", hold: 7, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap the guest's name", hold: 8, do: () => tap(page.getByRole("link", { name: /^Alok Saxena Tau ji/ })) });
    await step({ n: 3, what: "Scroll to Functions and show Haldi", hold: 8, do: () => show(haldi) });
    await step({ n: 4, what: "Tap Invite", hold: 7, do: () => tap(haldi.getByRole("button", { name: "Invite" })) });
    await step({ n: "end", what: "Show Haldi marked as invited", hold: 4, do: () => show(haldi.getByRole("combobox")) });
  },
};
