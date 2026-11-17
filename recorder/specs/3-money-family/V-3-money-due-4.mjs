// V-3-money-due-4 · How to export · guides\3-money-family\money-due.md
// Desktop first. A phone has no Export button, so the phone take uses CSV on the Sides tab
// (lines for it are in voiceover\V-3-money-due-4.sizes.json).
import { openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-money-due-4",
  note: "money-due",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-money-due-4", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openSection(ctx, "Money") });
    if (phone) {
      await step({ ...r(2), do: () => tap(page.getByRole("link", { name: "Sides", exact: true })) });
      await step({
        ...r(3),
        do: async () => {
          const dl = page.waitForEvent("download");
          await tap(page.getByRole("link", { name: "CSV" }).first());
          await dl;
        },
      });
      await step({ ...r(4), do: () => show(page.getByText("Money by side").first()) });
    } else {
      await step({
        ...r(2),
        do: async () => {
          const dl = page.waitForEvent("download");
          await tap(page.getByRole("link", { name: "Export", exact: true }));
          await dl;
        },
      });
      await step({ ...r(3), do: () => show(page.getByRole("link", { name: "Export", exact: true })) });
      await step({ ...r(4), do: () => show(page.getByText("Upcoming payments", { exact: true })) });
    }
    await step({ ...r("end") });
  },
};
