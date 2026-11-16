// V-2-invitations-and-reminders-3 · How to choose who guests can call · guides\2-guests\invitations-and-reminders.md
import { navLink } from "./_lib.mjs";

export default {
  id: "V-2-invitations-and-reminders-3",
  note: "invitations-and-reminders",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show }) {
    const who = page.getByRole("combobox", { name: "Who guests can call" });
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Guests", hold: 4, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap Remind the 33 waiting", hold: 5, do: () => tap(page.getByRole("link", { name: /^Remind the \d+ waiting$/ })) });
    await step({ n: 3, what: "Scroll to Who guests can call", hold: 4, do: () => show(who) });
    await step({ n: 4, what: "Pick a person from the list", hold: 6,
      do: async () => {
        await tap(who);
        await who.selectOption({ index: 1 });
      } });
    await step({ n: 5, what: "Tap Save", hold: 4, do: () => tap(page.getByRole("button", { name: "Save", exact: true }).nth(1)) });
    await step({ n: "end", what: "Show the saved choice", hold: 5, do: () => show(who) });
  },
};
