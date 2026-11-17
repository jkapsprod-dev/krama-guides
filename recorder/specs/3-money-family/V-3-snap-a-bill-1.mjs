// V-3-snap-a-bill-1 · How to switch Snap a bill on · guides\3-money-family\snap-a-bill.md
import { openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-snap-a-bill-1",
  note: "snap-a-bill",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money/expenses/new`,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-snap-a-bill-1", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Add an expense" })) });
    await step({ ...r(1), do: () => openSection(ctx, "Settings") });
    await step({ ...r(2), do: () => tap(page.getByRole("link", { name: /^Smart helpers/ })) });
    await step({ ...r(3), do: () => tap(page.getByLabel("Snap a bill")) });
    await step({
      ...r(4),
      do: async () => {
        await tap(page.getByRole("button", { name: "Save", exact: true }));
        await show(page.getByText("Saved."));
      },
    });
    await step({
      ...r("end"),
      do: async () => {
        await page.goto(page.url().replace(/\/settings.*$/, "/money/expenses/new"));
        await show(page.getByText("Snap a bill", { exact: true }).first());
      },
    });
  },
};
