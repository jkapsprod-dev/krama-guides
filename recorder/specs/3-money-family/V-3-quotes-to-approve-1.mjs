// V-3-quotes-to-approve-1 · How to approve a quote your planner sent · guides\3-money-family\quotes-to-approve.md
import { isoDay, openSection, script } from "./_lib.mjs";
import { addQuote } from "./_setup.mjs";

export default {
  id: "V-3-quotes-to-approve-1",
  note: "quotes-to-approve",
  role: "host",
  start: (seed) => seed.weddingPath,

  // Off camera: a quote from Rangoli Decor, sent by Utsav Planners (written into the local demo database).
  async setup({ page, seed }) {
    addQuote(seed, {
      title: "Mandap decor",
      amountRupees: 380000,
      note: "Fresh flowers, 3 days of set-up",
      inclusions: "Mandap, stage, entry gate and table flowers",
      validIso: isoDay(30),
    });
    await page.goto(seed.weddingPath);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-quotes-to-approve-1", phone);
    const ctx = { page, tap, phone };
    const dialog = page.getByRole("alertdialog").or(page.getByRole("dialog"));
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({
      ...r(1),
      do: async () => {
        await openSection(ctx, "Money");
        await tap(page.getByRole("link", { name: "Quotes", exact: true }));
      },
    });
    await step({ ...r(2), do: () => show(page.getByText(/Includes/)) });
    await step({ ...r(3), do: () => tap(page.getByRole("button", { name: "Approve", exact: true })) });
    await step({ ...r(4), do: () => show(dialog) });
    await step({ ...r(5), do: () => tap(dialog.getByRole("button", { name: "Approve", exact: true })) });
    await step({ ...r("end"), do: () => show(page.getByText("Approved", { exact: true }).first()) });
  },
};
