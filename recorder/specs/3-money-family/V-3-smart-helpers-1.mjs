// V-3-smart-helpers-1 · How to switch a smart helper on or off · guides\3-money-family\smart-helpers.md
import { openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-smart-helpers-1",
  note: "smart-helpers",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money/expenses/new`,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-smart-helpers-1", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Add an expense" })) });
    await step({ ...r(1), do: () => openSection(ctx, "Settings") });
    await step({ ...r(2), do: () => tap(page.getByRole("link", { name: /^Smart helpers/ })) });
    await step({ ...r(3), do: () => show(page.getByText("Sends only a city to a public forecast service.")) });
    await step({
      ...r(4),
      do: async () => {
        await tap(page.getByLabel("Snap a bill"));
        await tap(page.getByLabel("Gold price on the jewellery budget line"));
      },
    });
    await step({
      ...r(5),
      do: async () => {
        await tap(page.getByRole("button", { name: "Save", exact: true }));
        await show(page.getByText("Saved."));
      },
    });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { name: "Smart helpers" })) });
  },
};
