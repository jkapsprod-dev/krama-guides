// V-2-invitations-and-reminders-1 · How to remind families who haven't replied · guides\2-guests\invitations-and-reminders.md
// The robot never opens WhatsApp: the link is stopped at the door, so the video stays in Krama.
import { blockMessaging, navLink } from "./_lib.mjs";

export default {
  id: "V-2-invitations-and-reminders-1",
  note: "invitations-and-reminders",
  role: "host",
  start: (seed) => seed.weddingPath,
  setup: ({ page }) => blockMessaging(page),

  async run({ page, step, tap, show }) {
    const sendBy = page.getByRole("group", { name: "Send by" });
    const first = page.getByRole("link", { name: "Remind on WhatsApp" }).first();
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Open Guests", hold: 3, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap Remind the 33 waiting", hold: 4, do: () => tap(page.getByRole("link", { name: /^Remind the \d+ waiting$/ })) });
    await step({ n: 3, what: "Under Send by, tap WhatsApp", hold: 4, do: () => tap(sendBy.getByRole("link", { name: "WhatsApp", exact: true })) });
    await step({ n: 4, what: "Tap Remind on WhatsApp beside the first family", hold: 4, do: () => tap(first) });
    await step({ n: 5, what: "Show the Remind on WhatsApp button", hold: 5, do: () => show(first) });
    await step({ n: 6, what: "Show the next family on top", hold: 4, do: () => show(page.getByRole("status")) });
    await step({ n: "end", what: "Show the counter", hold: 3, do: () => show(page.getByRole("status")) });
  },
};
