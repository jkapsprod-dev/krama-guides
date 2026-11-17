// V-3-money-due-3 · How to filter by function or side · guides\3-money-family\money-due.md
import { addExpense, isoDay, scheduleInstalment, script } from "./_lib.mjs";

export default {
  id: "V-3-money-due-3",
  note: "money-due",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money`,

  // Off camera: the Function row only lists functions that have an expense, so add one for Haldi
  // on the bride's side, with an instalment due soon.
  async setup({ page, seed }) {
    await addExpense(page, seed, { what: "Haldi flowers and tent", total: "60000", fn: "Haldi", side: "Bride’s side" });
    await page.goto(`${seed.weddingPath}/money?tab=expenses`);
    await scheduleInstalment(page, seed, "Haldi flowers and tent", "20000", isoDay(9));
    await page.goto(`${seed.weddingPath}/money`);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-money-due-3", phone);
    const fnRow = page.getByRole("group", { name: "Function" });
    const sideRow = page.getByRole("group", { name: "Side" });
    await step({ ...r(0), do: () => show(page.getByText("Upcoming payments", { exact: true })) });
    await step({ ...r(1), do: () => tap(fnRow.getByRole("link", { name: "Haldi", exact: true })) });
    await step({ ...r(2), do: () => show(page.getByText("Upcoming payments", { exact: true })) });
    await step({ ...r(3), do: () => tap(sideRow.getByRole("link", { name: "Bride’s side", exact: true })) });
    await step({ ...r(4), do: () => show(page.getByText("Upcoming payments", { exact: true })) });
    await step({
      ...r("end"),
      do: async () => {
        await tap(fnRow.getByRole("link", { name: "Whole wedding", exact: true }));
        await tap(sideRow.getByRole("link", { name: "Both families", exact: true }));
      },
    });
  },
};
