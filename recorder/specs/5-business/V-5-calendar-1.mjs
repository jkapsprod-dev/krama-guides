// V-5-calendar-1 · How to block time on your calendar · guides\5-business\calendar.md
import { choose, dialog, openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-calendar-1",
  note: "calendar",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, type, show, phone }) {
    const form = dialog(page);
    const day = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // today: the From box starts on today
    await step({ n: 0, what: "Show Calendar with the month grid", hold: 5 });
    await step({
      n: 1,
      what: "Click Calendar in the sidebar, then click a day",
      hold: 7,
      do: async () => {
        await openPage(page, tap, phone, "Calendar");
        await tap(page.getByRole("gridcell", { name: new RegExp(`^${day}:`) }));
      },
    });
    await step({ n: 2, what: "Click Add to calendar", hold: 4, do: () => tap(page.getByRole("button", { name: "Add to calendar" })) });
    await step({
      n: 3,
      what: "Pick Site visit in What is it? and type Venue visit, Ahmedabad in Title",
      hold: 8,
      do: async () => {
        await choose(show, form.getByLabel("What is it?"), "Site visit");
        await type(form.getByLabel("Title", { exact: true }), "Venue visit, Ahmedabad");
      },
    });
    await step({
      n: 4,
      what: "Untick All day and set the start and end time",
      hold: 8,
      do: async () => {
        await tap(form.getByLabel("All day"));
        const times = form.locator('input[type="time"]');
        await show(times.nth(0));
        await times.nth(0).fill("10:00");
        await show(times.nth(1));
        await times.nth(1).fill("12:00");
      },
    });
    await step({ n: 5, what: "Click Save", hold: 4, do: () => tap(form.getByRole("button", { name: "Save", exact: true })) });
    await step({
      n: "end",
      what: "Show the entry on that day",
      hold: 4,
      do: () => show(page.getByText("Venue visit, Ahmedabad").first()),
    });
  },
};
