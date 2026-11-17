// V-3-money-by-side-2 · How to print or download it · guides\3-money-family\money-by-side.md
import { addExpense, script } from "./_lib.mjs";

export default {
  id: "V-3-money-by-side-2",
  note: "money-by-side",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money?tab=sides`,

  // Off camera: put expenses on both families' sides so each page has something to print.
  async setup({ page, seed }) {
    await addExpense(page, seed, { what: "Wedding lunch for 400", total: "250000", side: "Bride’s side" });
    await addExpense(page, seed, { what: "Baraat band and horse", total: "90000", side: "Groom’s side" });
    await page.goto(`${seed.weddingPath}/money?tab=sides`);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-money-by-side-2", phone);
    await step({ ...r(0), do: () => show(page.getByText("Money by side", { exact: true })) });
    await step({ ...r(1), do: () => tap(page.getByRole("link", { name: "Print Groom’s side money" })) });
    await step({ ...r(2), do: () => show(page.getByRole("heading", { level: 1 })) });
    await step({
      ...r(3),
      do: async () => {
        // The print screen belongs to the browser and is not drawn in the recording.
        await page.evaluate(() => { window.print = () => {}; });
        await tap(page.getByRole("button", { name: "Print", exact: true }));
      },
    });
    await step({
      ...r(4),
      do: async () => {
        await page.goBack();
        const dl = page.waitForEvent("download");
        await tap(page.getByRole("link", { name: "Download Groom’s side money as CSV" }));
        await dl;
      },
    });
    await step({ ...r("end"), do: () => show(page.getByText("Money by side", { exact: true })) });
  },
};
