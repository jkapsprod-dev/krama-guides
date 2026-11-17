// V-3-money-by-side-1 · How to see one family's share · guides\3-money-family\money-by-side.md
import { addExpense, openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-money-by-side-1",
  note: "money-by-side",
  role: "host",
  start: (seed) => seed.weddingPath,

  // Off camera: everything in the demo is shared, so put one expense on each family's side.
  async setup({ page, seed }) {
    await addExpense(page, seed, { what: "Wedding lunch for 400", total: "250000", side: "Bride’s side" });
    await addExpense(page, seed, { what: "Baraat band and horse", total: "90000", side: "Groom’s side" });
    await page.goto(seed.weddingPath);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-money-by-side-1", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openSection(ctx, "Money") });
    await step({ ...r(2), do: () => tap(page.getByRole("link", { name: "Sides", exact: true })) });
    await step({ ...r(3), do: () => show(page.getByText("Money by side", { exact: true })) });
    await step({ ...r(4), do: () => tap(page.getByRole("link", { name: "See Bride’s side expenses" })) });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { level: 1 })) });
  },
};
