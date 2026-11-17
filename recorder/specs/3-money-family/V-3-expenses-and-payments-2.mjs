// V-3-expenses-and-payments-2 · How to schedule instalments · guides\3-money-family\expenses-and-payments.md
import { isoDay, script } from "./_lib.mjs";

export default {
  id: "V-3-expenses-and-payments-2",
  note: "expenses-and-payments",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money?tab=expenses`,

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-expenses-and-payments-2", phone);
    await step({ ...r(0), do: () => show(page.getByRole("link", { name: /Mandap and stage decor/ })) });
    await step({ ...r(1), do: () => tap(page.getByRole("link", { name: /Mandap and stage decor/ })) });
    await step({ ...r(2), do: () => tap(page.getByText("Schedule an instalment", { exact: true })) });
    await step({
      ...r(3),
      do: async () => {
        await type(page.getByLabel("Amount", { exact: true }), "1,00,000");
        const due = page.getByLabel("Due on", { exact: true });
        await tap(due);
        await due.fill(isoDay(40));
      },
    });
    await step({ ...r(4), do: () => tap(page.getByRole("button", { name: "Add instalment" })) });
    await step({ ...r("end"), do: () => show(page.getByText(`1,00,000`).first()) });
  },
};
