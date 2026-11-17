// V-3-outfits-3 · How to spot two people in the same colour · guides\3-money-family\outfits.md
import { pick, script } from "./_lib.mjs";
import { addOutfit } from "./_setup.mjs";

export default {
  id: "V-3-outfits-3",
  note: "outfits",
  role: "host",
  start: (seed) => `${seed.weddingPath}/outfits`,

  // Off camera: two bridesmaids in maroon for the sangeet. Only the first is in the bridal party yet.
  async setup({ page, seed }) {
    await addOutfit(page, seed, { name: "Anya", fn: "Sangeet", outfit: "Silk lehenga", colour: "Maroon", bridal: true });
    await addOutfit(page, seed, { name: "Tara", fn: "Sangeet", outfit: "Silk lehenga", colour: "Maroon" });
    await page.goto(`${seed.weddingPath}/outfits`);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-outfits-3", phone);
    await step({ ...r(0), do: () => show(page.locator("li, article, a").filter({ hasText: "Tara" }).filter({ hasText: "Silk lehenga" }).last()) });
    await step({ ...r(1), do: () => tap(page.locator("li, article, a").filter({ hasText: "Tara" }).filter({ hasText: "Silk lehenga" }).last()) });
    await step({ ...r(2), do: () => tap(page.getByLabel("In the bridal party")) });
    await step({ ...r(3), do: () => tap(page.getByRole("button", { name: "Save outfit" })) });
    await step({ ...r(4), do: () => show(page.getByText(/Same colour/).first()) });
    await step({
      ...r(5),
      do: async () => {
        await tap(page.locator("li, article, a").filter({ hasText: "Tara" }).filter({ hasText: "Silk lehenga" }).last());
        await pick({ tap }, page.getByLabel("Main colour"), "Pink");
        await tap(page.getByRole("button", { name: "Save outfit" }));
      },
    });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { name: "Outfits" }).first()) });
  },
};
