// V-3-money-due-2 · How to mark a payment paid · guides\3-money-family\money-due.md
import { isoDay, pick, scheduleInstalment, script } from "./_lib.mjs";

export default {
  id: "V-3-money-due-2",
  note: "money-due",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money`,

  // Off camera: the demo has nothing overdue, so schedule an instalment for Rangoli Decor that is late.
  async setup({ page, seed }) {
    await scheduleInstalment(page, seed, "Mandap and stage decor", "30000", isoDay(-5));
    await page.goto(`${seed.weddingPath}/money`);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-money-due-2", phone);
    const sheet = page.getByRole("dialog");
    const overdueRow = page.locator("li").filter({ hasText: "Rangoli Decor" }).filter({ has: page.getByRole("button", { name: "Mark paid" }) }).first();
    await step({ ...r(0), do: () => show(overdueRow) });
    await step({ ...r(1), do: () => tap(overdueRow.getByRole("button", { name: "Mark paid" })) });
    await step({ ...r(2), do: () => show(sheet.getByLabel("Amount paid")) });
    await step({
      ...r(3),
      do: async () => {
        await pick({ tap }, sheet.getByLabel("How", { exact: true }), "UPI");
        await pick({ tap }, sheet.getByLabel("Who paid", { exact: true }), "The couple");
      },
    });
    await step({
      ...r(4),
      do: async () => {
        await tap(sheet.getByRole("button", { name: "Save payment" }));
        await sheet.getByText(/Noted/).waitFor({ timeout: 60_000 }); // the save can be slow
      },
    });
    await step({ ...r("end"), do: () => show(sheet.getByText(/Noted/)).catch(() => show(page.getByText("Upcoming payments", { exact: true }))) });
  },
};
