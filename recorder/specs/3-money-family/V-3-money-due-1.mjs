// V-3-money-due-1 · How to see what is due · guides\3-money-family\money-due.md
import { openSection, scheduleInstalment, isoDay, script } from "./_lib.mjs";

export default {
  id: "V-3-money-due-1",
  note: "money-due",
  role: "host", // lane 3, host (Appendix E)
  start: (seed) => seed.weddingPath,

  // Off camera: the demo wedding has nothing overdue and nothing in the next 14 days, so add one
  // instalment of each through the expense page.
  async setup({ page, seed }) {
    await scheduleInstalment(page, seed, "Mandap and stage decor", "30000", isoDay(-5));
    await scheduleInstalment(page, seed, "Photos and video", "40000", isoDay(6));
    await page.goto(seed.weddingPath);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-money-due-1", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openSection(ctx, "Money") });
    await step({ ...r(2), do: () => show(page.getByRole("link", { name: "Due", exact: true })) });
    await step({
      ...r(3),
      do: async () => {
        await show(page.getByText("Overdue", { exact: true }).first());
        await show(page.getByText("Next 14 days", { exact: true }).first());
      },
    });
    await step({ ...r(4), do: () => show(page.getByText("Still to pay", { exact: true }).first()) });
    await step({ ...r(5), do: () => show(page.getByText("Who’s contributing", { exact: true })) });
    await step({ ...r("end"), do: () => show(page.getByText("Upcoming payments", { exact: true })) });
  },
};
