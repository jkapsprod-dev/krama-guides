// V-5-calendar-2 · How to spot double bookings, then set the most jobs you take in a day
import { choose, dialog, planner, replace } from "./_lib.mjs";

// The Sangeet is the evening before the wedding day (the seed prints "wedding on yyyy-mm-dd").
const sangeetOf = (seed) => {
  const d = new Date(`${seed.output.match(/wedding on (\d{4}-\d{2}-\d{2})/)[1]}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
};

export default {
  id: "V-5-calendar-2",
  note: "calendar",
  role: "planner",
  start: (seed) => planner(seed, `/calendar?m=${sangeetOf(seed).slice(0, 7)}`),
  // Off camera: a Blocked date saved on the Sangeet day.
  async setup({ page, seed }) {
    const SANGEET = sangeetOf(seed);
    await page.getByRole("button", { name: "Add to calendar" }).click();
    const form = dialog(page);
    await choose(async () => {}, form.getByLabel("What is it?"), "Blocked date");
    await form.getByLabel("Title", { exact: true }).fill("Cousin's wedding, no work");
    await form.getByLabel("From", { exact: true }).fill(SANGEET);
    await form.getByRole("button", { name: "Save", exact: true }).click();
    await page.getByRole("gridcell", { name: new RegExp(`^${SANGEET}:`) }).waitFor();
  },

  async run({ page, step, tap, show, seed }) {
    const SANGEET = sangeetOf(seed);
    const cell = page.getByRole("gridcell", { name: new RegExp(`^${SANGEET}:`) });
    const jobs = page.getByRole("textbox", { name: "Most jobs you take on one day" });
    await step({ n: 0, what: "Show Calendar with a red dot on one day", hold: 5, do: () => show(cell) });
    await step({ n: 1, what: "Point to the red dot on the Sangeet day", hold: 4, do: () => show(cell) });
    await step({ n: 2, what: "Click that day", hold: 4, do: () => tap(cell) });
    await step({
      n: 3,
      what: "Point to the red line in the day panel",
      hold: 5,
      do: () => show(page.getByRole("region", { name: /12 February/ })),
    });
    await step({
      n: 4,
      what: "Point to the dots and Wedding function in the list",
      hold: 5,
      do: () => show(page.getByText("Wedding function").first()),
    });
    await step({ n: 5, what: "Hold on the day panel", hold: 4, do: () => show(page.getByRole("region", { name: /12 February/ })) });
    await step({
      n: 6,
      what: "Scroll to Most jobs you take on one day",
      hold: 5,
      do: () => show(jobs),
    });
    await step({ n: 7, what: "Type 2 in the box", hold: 4, do: () => replace(page, tap, jobs, "2") });
    await step({
      n: 8,
      what: "Click Save",
      hold: 4,
      do: () => tap(page.getByRole("main").getByRole("button", { name: "Save", exact: true }).last()),
    });
    await step({ n: "end", what: "Show Saved. and the jobs shown on the day squares", hold: 5, do: () => show(cell) });
  },
};
