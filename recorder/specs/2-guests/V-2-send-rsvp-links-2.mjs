// V-2-send-rsvp-links-2 · How to send a family their link · guides\2-guests\send-rsvp-links.md
// The robot never opens WhatsApp: the link is stopped at the door, so the video stays in Krama.
import { blockMessaging, navLink } from "./_lib.mjs";

export default {
  id: "V-2-send-rsvp-links-2",
  note: "send-rsvp-links",
  role: "host",
  start: (seed) => seed.weddingPath,
  setup: ({ page }) => blockMessaging(page),

  async run({ page, step, tap, show }) {
    const panel = page.getByRole("region", { name: "Anil Kapoor", exact: true });
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar", hold: 5, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap the guest's name", hold: 6, do: () => tap(page.getByRole("link", { name: /^Anil Kapoor Mausi/ })) });
    await step({ n: 3, what: "Tap Message on WhatsApp", hold: 6, do: () => tap(panel.getByRole("link", { name: "Message on WhatsApp" })) });
    await step({ n: 4, what: "Show the ready message buttons", hold: 7, do: () => show(panel.getByRole("link", { name: "Message on WhatsApp" })) });
    await step({ n: 5, what: "Show Copy RSVP link", hold: 6, do: () => show(panel.getByRole("button", { name: "Copy RSVP link" })) });
    await step({ n: "end", what: "Show the guest's card", hold: 4, do: () => show(panel.getByRole("heading", { name: "Anil Kapoor" })) });
  },
};
