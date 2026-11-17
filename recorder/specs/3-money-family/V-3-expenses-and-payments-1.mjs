// V-3-expenses-and-payments-1 · How to add an expense · guides\3-money-family\expenses-and-payments.md
import { isoDay, openAddExpense, pick, script } from "./_lib.mjs";

export default {
  id: "V-3-expenses-and-payments-1",
  note: "expenses-and-payments",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money`,

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-expenses-and-payments-1", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByText("Upcoming payments", { exact: true })) });
    await step({ ...r(1), do: () => openAddExpense(ctx) });
    await step({ ...r(2), do: () => type(page.getByRole("textbox", { name: "What is it for?" }), "Mandap decor") });
    await step({ ...r(3), do: () => type(page.getByLabel("Total agreed"), "2,50,000") });
    await step({
      ...r(4),
      do: async () => {
        await pick({ tap }, page.getByLabel("Vendor", { exact: true }), "Rangoli Decor");
        await pick({ tap }, page.getByLabel("Function", { exact: true }), "Sangeet");
      },
    });
    await step({
      ...r(5),
      do: async () => {
        await tap(page.getByLabel("Schedule the first instalment"));
        const due = page.getByLabel("Due on", { exact: true });
        await tap(due);
        await due.fill(isoDay(20));
      },
    });
    await step({ ...r(6), do: () => tap(page.getByRole("button", { name: "Save expense" })) });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { name: "Mandap decor" })) });
  },
};
