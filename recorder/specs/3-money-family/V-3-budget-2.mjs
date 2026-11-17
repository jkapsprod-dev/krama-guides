// V-3-budget-2 · How to start from a typical split · guides\3-money-family\budget.md
import { clearBudget, setBudgetBand, script } from "./_lib.mjs";

export default {
  id: "V-3-budget-2",
  note: "budget",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money/budget`,

  // Off camera: the card shows only while nothing is planned and a budget range was picked at set-up.
  async setup({ page, seed }) {
    await clearBudget(page, seed);
    setBudgetBand(seed, "10_25l");
    await page.goto(`${seed.weddingPath}/money/budget`);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-budget-2", phone);
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Edit budget" })) });
    await step({ ...r(1), do: () => show(page.getByText("Start from a typical split?")) });
    await step({ ...r(2), do: () => tap(page.getByRole("button", { name: "Fill in a typical split" })) });
    await step({ ...r(3), do: () => show(page.getByText("Filled in. Check the numbers, then save.")) });
    await step({
      ...r(4),
      do: async () => {
        await tap(page.getByRole("button", { name: "Save budget" }));
        await page.getByText("Budget saved.").waitFor({ timeout: 60_000 }); // the save can be slow
      },
    });
    await step({ ...r("end"), do: () => show(page.getByText("Budget saved.")) });
  },
};
