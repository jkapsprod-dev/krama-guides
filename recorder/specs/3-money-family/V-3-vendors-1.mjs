// V-3-vendors-1 · How to add a vendor · guides\3-money-family\vendors.md
import { openSection, pick, script } from "./_lib.mjs";

export default {
  id: "V-3-vendors-1",
  note: "vendors",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-vendors-1", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({
      ...r(1),
      do: async () => {
        await openSection(ctx, "Money");
        await tap(page.getByRole("link", { name: "Vendors", exact: true }));
      },
    });
    await step({ ...r(2), do: () => tap(page.getByRole("link", { name: "Add vendor", exact: true })) });
    await step({
      ...r(3),
      do: async () => {
        await type(page.getByLabel("Name", { exact: true }), "Shree Caterers");
        await pick({ tap }, page.getByLabel("Type", { exact: true }), "Caterer");
      },
    });
    await step({ ...r(4), do: () => type(page.getByLabel("Phone", { exact: true }), "98765 43210") });
    await step({ ...r(5), do: () => tap(page.getByRole("button", { name: "Save vendor" })) });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { name: "Shree Caterers" })) });
  },
};
