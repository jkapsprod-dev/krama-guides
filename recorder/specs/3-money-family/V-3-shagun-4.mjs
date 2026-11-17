// V-3-shagun-4 · How to export your shagun list · guides\3-money-family\shagun.md
import { openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-shagun-4",
  note: "shagun",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-shagun-4", phone);
    const ctx = { page, tap, phone };
    const exportLink = page.getByRole("link", { name: "Export CSV", exact: true });
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openSection(ctx, "Shagun") });
    await step({
      ...r(2),
      do: async () => {
        const dl = page.waitForEvent("download");
        await tap(exportLink);
        await dl;
      },
    });
    await step({ ...r(3), do: () => show(exportLink) });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { name: "Shagun" }).first()) });
  },
};
