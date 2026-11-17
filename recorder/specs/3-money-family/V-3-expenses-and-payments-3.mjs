// V-3-expenses-and-payments-3 · How to record a payment and who paid, then attach a receipt
// guides\3-money-family\expenses-and-payments.md
import { addExpense, fixture, pick, script, typeOver } from "./_lib.mjs";

export default {
  id: "V-3-expenses-and-payments-3",
  note: "expenses-and-payments",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money?tab=expenses`,

  // Off camera: a new expense with nothing paid yet.
  async setup({ page, seed }) {
    await addExpense(page, seed, { what: "Pandit ji and puja", total: "40000" });
    await page.goto(`${seed.weddingPath}/money?tab=expenses`);
  },

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-expenses-and-payments-3", phone);
    const sheet = page.getByRole("dialog");
    let chooser = null;
    await step({ ...r(0), do: () => show(page.getByRole("link", { name: /Pandit ji and puja/ })) });
    await step({
      ...r(1),
      do: async () => {
        await tap(page.getByRole("link", { name: /Pandit ji and puja/ }));
        await tap(page.getByRole("button", { name: "Record a payment" }));
      },
    });
    await step({ ...r(2), do: () => typeOver({ page, tap }, sheet.getByLabel("Amount paid"), "10,000") });
    await step({ ...r(3), do: () => pick({ tap }, sheet.getByLabel("How", { exact: true }), "Cash") });
    await step({
      ...r(4),
      do: async () => {
        await pick({ tap }, sheet.getByLabel("Who paid", { exact: true }), "Someone else");
        await type(sheet.getByLabel("Their name"), "Nani");
      },
    });
    await step({ ...r(5), do: () => tap(sheet.getByRole("button", { name: "Save payment" })) });
    await step({
      ...r(6),
      do: async () => {
        // The sheet may close by itself after "Noted"; tap Done only if it is still there.
        const done = sheet.getByRole("button", { name: "Done" });
        if (await done.isVisible().catch(() => false)) await tap(done).catch(() => {}); // it may close mid-tap
        await show(page.getByText(/by Nani/));
      },
    });
    const row = page.locator("li").filter({ hasText: "by Nani" });
    await step({
      ...r(7),
      do: async () => {
        const wait = page.waitForEvent("filechooser");
        await tap(row.getByText("Attach receipt"));
        chooser = await wait;
      },
    });
    await step({
      ...r(8),
      do: async () => {
        await chooser.setFiles(fixture("receipt.jpg"));
        await page.getByText("View receipt").first().waitFor({ timeout: 90_000 }); // the upload can be slow
      },
    });
    await step({ ...r("end"), do: () => show(page.getByText("View receipt").first()) });
  },
};
