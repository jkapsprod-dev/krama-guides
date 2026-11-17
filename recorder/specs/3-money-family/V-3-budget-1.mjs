// V-3-budget-1 · How to set your budget · guides\3-money-family\budget.md
import { clearBudget, openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-budget-1",
  note: "budget",
  role: "host",
  start: (seed) => seed.weddingPath,

  // Off camera: the demo budget already has amounts, so empty them first.
  async setup({ page, seed }) {
    await clearBudget(page, seed);
    await page.goto(seed.weddingPath);
  },

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-budget-1", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({
      ...r(1),
      do: async () => {
        await openSection(ctx, "Money");
        await tap(page.getByRole("link", { name: "Budget", exact: true }));
      },
    });
    await step({ ...r(2), do: () => type(page.getByRole("textbox", { name: "Planned for Venue", exact: true }), "2,50,000") });
    await step({ ...r(3), do: () => type(page.getByRole("textbox", { name: "Planned for Catering", exact: true }), "2.5L") });
    await step({ ...r(4), do: () => show(page.getByText("Total", { exact: true })) });
    await step({
      ...r(5),
      do: async () => {
        await tap(page.getByRole("button", { name: "Save budget" }));
        await page.getByText("Budget saved.").waitFor({ timeout: 60_000 }); // the save can be slow
      },
    });
    await step({ ...r("end"), do: () => show(page.getByText("Budget saved.")) });
  },
};
