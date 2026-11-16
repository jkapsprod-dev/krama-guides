// V-2-personal-messages-1 · How to send a save the date, invitation or thank-you · guides\2-guests\personal-messages.md
// The robot never opens WhatsApp: the link is stopped at the door, so the video stays in Krama.
import { blockMessaging, guestsMore, moreItem, navLink } from "./_lib.mjs";

export default {
  id: "V-2-personal-messages-1",
  note: "personal-messages",
  role: "host",
  start: (seed) => seed.weddingPath,
  setup: ({ page }) => blockMessaging(page),

  async run({ page, step, tap, show }) {
    const message = page.getByRole("group", { name: "Message", exact: true });
    const sendTo = page.getByRole("group", { name: "Send to" });
    const firstPreview = page.locator("summary").filter({ hasText: "Preview message" }).first();
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Guests", hold: 4, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap More, then Personal messages", hold: 5,
      do: async () => {
        await tap(guestsMore(page));
        await tap(moreItem(page, "Personal messages"));
      } });
    await step({ n: 3, what: "Under Message, tap Save the date", hold: 5, do: () => tap(message.getByRole("link", { name: "Save the date" })) });
    await step({ n: 4, what: "Under Send to, tap Everyone", hold: 4, do: () => tap(sendTo.getByRole("link", { name: "Everyone" })) });
    await step({ n: 5, what: "Tap Preview message on the first family", hold: 5, do: () => tap(firstPreview) });
    await step({ n: 6, what: "Tap Send on WhatsApp", hold: 5, do: () => tap(page.getByRole("link", { name: "Send on WhatsApp" }).first()) });
    await step({ n: "end", what: "Show the Send on WhatsApp button with the message ready", hold: 4, do: () => show(page.getByRole("link", { name: "Send on WhatsApp" }).first()) });
  },
};
