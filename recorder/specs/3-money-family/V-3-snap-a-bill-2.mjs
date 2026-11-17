// V-3-snap-a-bill-2 · How to add an expense from a bill photo · guides\3-money-family\snap-a-bill.md
import { fixture, openAddExpense, script, typeOver } from "./_lib.mjs";

export default {
  id: "V-3-snap-a-bill-2",
  note: "snap-a-bill",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money`,

  // Off camera: Snap a bill is off until it is switched on, so switch it on through Settings.
  async setup({ page, seed }) {
    await page.goto(`${seed.weddingPath}/settings/helpers`);
    const box = page.getByLabel("Snap a bill");
    if (!(await box.isChecked())) {
      await box.check();
      await page.getByRole("button", { name: "Save", exact: true }).click();
      await page.getByText("Saved.").waitFor();
    }
    await page.goto(`${seed.weddingPath}/money`);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-snap-a-bill-2", phone);
    const ctx = { page, tap, phone };
    let chooser = null;
    await step({ ...r(0), do: () => show(page.getByText("Upcoming payments", { exact: true })) });
    await step({ ...r(1), do: () => openAddExpense(ctx) });
    await step({
      ...r(2),
      do: async () => {
        const wait = page.waitForEvent("filechooser");
        await tap(page.getByText("Take or choose a photo", { exact: true }));
        chooser = await wait;
      },
    });
    await step({
      ...r(3),
      do: async () => {
        await chooser.setFiles(fixture("bill.jpg"));
        await page.getByText(/Done\. Check every detail/).waitFor({ timeout: 90_000 });
      },
    });
    await step({ ...r(4), do: () => show(page.getByText(/Done\. Check every detail/)) });
    await step({ ...r(5), do: () => typeOver({ page, tap }, page.getByLabel("Total agreed"), "45,000") });
    await step({ ...r(6), do: () => tap(page.getByRole("button", { name: "Save expense" })) });
    await step({ ...r("end"), do: () => show(page.getByRole("link", { name: /bill photo|receipt/i }).first()) });
  },
};
