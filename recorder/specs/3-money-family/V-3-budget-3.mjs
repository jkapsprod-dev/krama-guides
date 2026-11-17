// V-3-budget-3 · How to add or rename a category · guides\3-money-family\budget.md
import { script } from "./_lib.mjs";

export default {
  id: "V-3-budget-3",
  note: "budget",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money/budget`,

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-budget-3", phone);
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Edit budget" })) });
    await step({ ...r(1), do: () => show(page.getByRole("heading", { name: "Add a category" })) });
    await step({ ...r(2), do: () => type(page.getByLabel("Category name", { exact: true }), "Pandit and puja") });
    await step({ ...r(3), do: () => show(page.getByLabel("Inside", { exact: true })) });
    await step({ ...r(4), do: () => tap(page.getByRole("button", { name: "Add", exact: true })) });
    await step({
      ...r(5),
      do: async () => {
        await tap(page.getByRole("button", { name: "Rename Pandit and puja" }));
        const box = page.getByRole("textbox", { name: "Rename Pandit and puja" });
        await tap(box);
        await page.keyboard.press("Control+A");
        await page.keyboard.type("Pandit and havan", { delay: 85 });
        await tap(page.getByRole("button", { name: "Save name" }));
      },
    });
    await step({ ...r("end"), do: () => show(page.getByRole("list").getByText("Pandit and havan", { exact: true }).first()) });
  },
};
