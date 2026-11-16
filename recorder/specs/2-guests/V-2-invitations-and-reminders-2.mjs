// V-2-invitations-and-reminders-2 · How to set a reply-by date · guides\2-guests\invitations-and-reminders.md
import { navLink } from "./_lib.mjs";

export default {
  id: "V-2-invitations-and-reminders-2",
  note: "invitations-and-reminders",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show }) {
    const date = page.getByRole("textbox", { name: "Please reply by" });
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Guests", hold: 4, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap Set a reply-by date", hold: 5, do: () => tap(page.getByRole("link", { name: "Set a reply-by date" })) });
    await step({ n: 3, what: "Scroll to Please reply by", hold: 4, do: () => show(date) });
    await step({ n: 4, what: "Tap the box and pick a date", hold: 6,
      do: async () => {
        await tap(date);
        await date.fill("2027-01-20");
      } });
    await step({ n: 5, what: "Tap Save", hold: 4, do: () => tap(page.getByRole("button", { name: "Save", exact: true }).first()) });
    await step({ n: "end", what: "Show the saved date", hold: 5, do: () => show(date) });
  },
};
