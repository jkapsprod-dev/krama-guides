// V-5-vendor-wedding-page-1 · How to read the brief, then mark the day · guides\5-business\vendor-wedding-page.md
import { vendor, writeBriefOffCamera } from "./_lib.mjs";

export default {
  id: "V-5-vendor-wedding-page-1",
  note: "vendor-wedding-page",
  role: "vendor",
  start: (seed) => vendor(seed),
  // Off camera: the planner has written a brief that the vendor has not read yet.
  async setup({ page, seed }) {
    await writeBriefOffCamera(page, seed);
    await page.goto(vendor(seed));
  },

  async run({ page, step, tap, show }) {
    const haldi = page.getByRole("listitem").filter({ hasText: "Haldi" }).first();
    await step({ n: 0, what: "Show Needs your attention with a Brief to read line", hold: 5, do: () => show(page.getByText("Brief to read").first()) });
    await step({
      n: 1,
      what: "Click the Sharma-Patel line",
      hold: 5,
      do: () => tap(page.getByRole("link", { name: /Brief to read/ }).first()),
    });
    await step({
      n: 2,
      what: "Highlight the banner and the Brief section",
      hold: 6,
      do: () => show(page.getByText(/A brief is waiting for you|The brief has changed/).first()),
    });
    await step({ n: 3, what: "Click I have read this", hold: 5, do: () => tap(page.getByRole("button", { name: "I have read this" })) });
    await step({ n: 4, what: "Show You have read version", hold: 5, do: () => show(page.getByText(/You have read version/).first()) });
    await step({ n: 5, what: "Highlight the Haldi function", hold: 5, do: () => show(haldi) });
    await step({ n: 6, what: "Click Arrived", hold: 5, do: () => tap(haldi.getByRole("button", { name: "Arrived" })) });
    await step({ n: 7, what: "Click Set up done", hold: 5, do: () => tap(haldi.getByRole("button", { name: "Set up done" })) });
    await step({ n: 8, what: "Click Finished", hold: 5, do: () => tap(haldi.getByRole("button", { name: "Finished" })) });
    await step({ n: "end", what: "Show three lit buttons with times", hold: 5, do: () => show(haldi) });
  },
};
