// V-2-send-rsvp-links-3 · How to stop a link shared by mistake · guides\2-guests\send-rsvp-links.md
// Anil Kapoor is in the Anil Kapoor family, so Reset link shows.
import { blockMessaging, navLink } from "./_lib.mjs";

export default {
  id: "V-2-send-rsvp-links-3",
  note: "send-rsvp-links",
  role: "host",
  start: (seed) => seed.weddingPath,
  setup: ({ page }) => blockMessaging(page),

  async run({ page, step, tap, show }) {
    const panel = page.getByRole("region", { name: "Anil Kapoor", exact: true });
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar and tap the guest", hold: 8,
      do: async () => {
        await tap(navLink(page, "Guests"));
        await tap(page.getByRole("link", { name: /^Anil Kapoor Mausi/ }));
      } });
    await step({ n: 2, what: "Scroll down to Reset link", hold: 8, do: () => show(panel.getByRole("button", { name: "Reset link" })) });
    await step({ n: 3, what: "Tap Reset link", hold: 7, do: () => tap(panel.getByRole("button", { name: "Reset link" })) });
    await step({ n: 4, what: "Show the buttons again", hold: 7, do: () => show(panel.getByRole("link", { name: "Message on WhatsApp" })) });
    await step({ n: "end", what: "Show Message on WhatsApp for the new link", hold: 4, do: () => show(panel.getByRole("button", { name: "Copy RSVP link" })) });
  },
};
