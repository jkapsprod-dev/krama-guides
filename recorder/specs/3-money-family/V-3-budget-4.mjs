// V-3-budget-4 · How to split shared costs between the families · guides\3-money-family\budget.md
import { pick, script, typeOver } from "./_lib.mjs";

export default {
  id: "V-3-budget-4",
  note: "budget",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money/budget`,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-budget-4", phone);
    const who = page.getByLabel("Who pays Venue", { exact: true });
    const share = page.getByRole("textbox", { name: "Bride’s share of Venue, %" });
    await step({ ...r(0), do: () => show(who) });
    await step({ ...r(1), do: () => tap(who) });
    await step({
      ...r(2),
      do: async () => {
        await who.selectOption({ label: "Shared" });
        await typeOver({ page, tap }, share, "60");
      },
    });
    await step({ ...r(3), do: () => show(share) });
    await step({
      ...r(4),
      do: async () => {
        await tap(page.getByRole("button", { name: "Save budget" }));
        await page.getByText("Budget saved.").waitFor({ timeout: 60_000 }); // the save can be slow
      },
    });
    await step({ ...r(5), do: () => tap(page.getByRole("link", { name: "Sides", exact: true })) });
    await step({ ...r("end"), do: () => show(page.getByText("Money by side", { exact: true })) });
  },
};
