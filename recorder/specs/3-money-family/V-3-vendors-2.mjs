// V-3-vendors-2 · How to find a vendor, call them and see what you owe · guides\3-money-family\vendors.md
import { openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-vendors-2",
  note: "vendors",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-vendors-2", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({
      ...r(1),
      do: async () => {
        await openSection(ctx, "Money");
        await tap(page.getByRole("link", { name: "Vendors", exact: true }));
      },
    });
    await step({ ...r(2), do: () => show(page.getByText(/Caterer · Booked/)) });
    await step({ ...r(3), do: () => tap(page.getByRole("link", { name: "Call Annapurna Caterers" })) });
    await step({ ...r(4), do: () => tap(page.getByRole("link", { name: /^Annapurna Caterers/ }).first()) });
    await step({ ...r(5), do: () => show(page.getByRole("heading", { name: "Expenses" })) });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { name: "Annapurna Caterers" })) });
  },
};
