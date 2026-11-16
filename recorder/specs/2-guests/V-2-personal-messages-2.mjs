// V-2-personal-messages-2 · How to schedule an email · guides\2-guests\personal-messages.md
// Only families with an email address get a scheduled email, so two made-up families are added
// off camera with an email address.
import { addGuestsOffCamera, guestsMore, moreItem, navLink } from "./_lib.mjs";

export default {
  id: "V-2-personal-messages-2",
  note: "personal-messages",
  role: "host",
  start: (seed) => seed.weddingPath,
  setup: ({ page, seed }) =>
    addGuestsOffCamera(
      page,
      seed,
      [
        { name: "Kamlesh Rathod", phone: "98700 22201", email: "kamlesh.rathod@example.test", familyName: "Rathod family, Surat" },
        { name: "Hetal Zaveri", phone: "98700 22202", email: "hetal.zaveri@example.test", familyName: "Zaveri family, Surat" },
      ],
      seed.weddingPath,
    ),

  async run({ page, step, tap, show }) {
    const message = page.getByRole("group", { name: "Message", exact: true });
    const schedule = page.getByRole("region", { name: "Schedule email" });
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Personal messages from Guests, More", hold: 5,
      do: async () => {
        await tap(navLink(page, "Guests"));
        await tap(guestsMore(page));
        await tap(moreItem(page, "Personal messages"));
      } });
    await step({ n: 2, what: "Tap Invitation under Message", hold: 4, do: () => tap(message.getByRole("link", { name: "Invitation" })) });
    await step({ n: 3, what: "Scroll to Schedule email and pick a Date", hold: 5,
      do: async () => {
        const date = schedule.getByRole("textbox", { name: "Date" });
        await tap(date);
        await date.fill("2027-01-20");
      } });
    await step({ n: 4, what: "Set the Time (their local time)", hold: 5,
      do: async () => {
        const time = schedule.getByRole("textbox", { name: "Time (their local time)" });
        await tap(time);
        await time.fill("09:00");
      } });
    await step({ n: 5, what: "Tap Schedule email", hold: 5, do: () => tap(schedule.getByRole("button", { name: "Schedule email" })) });
    await step({ n: "end", what: "Show the line emails scheduled", hold: 4, do: () => show(schedule) });
  },
};
