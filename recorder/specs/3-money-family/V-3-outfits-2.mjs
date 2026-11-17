// V-3-outfits-2 · How to track fittings and pick-ups · guides\3-money-family\outfits.md
import { isoDay, pick, script } from "./_lib.mjs";
import { addOutfit } from "./_setup.mjs";

export default {
  id: "V-3-outfits-2",
  note: "outfits",
  role: "host",
  start: (seed) => `${seed.weddingPath}/outfits`,

  // Off camera: the bride's sangeet outfit, with no dates yet.
  async setup({ page, seed }) {
    await addOutfit(page, seed, { name: "Bride", fn: "Sangeet", outfit: "Silk lehenga", colour: "Maroon" });
    await page.goto(`${seed.weddingPath}/outfits`);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-outfits-2", phone);
    await step({ ...r(0), do: () => show(page.getByText("Silk lehenga").first()) });
    await step({ ...r(1), do: () => tap(page.getByText("Silk lehenga").first()) });
    await step({
      ...r(2),
      do: async () => {
        const d = page.getByLabel("Fitting date");
        await tap(d);
        await d.fill(isoDay(30));
      },
    });
    await step({
      ...r(3),
      do: async () => {
        const d = page.getByLabel("Alteration or pick-up date");
        await tap(d);
        await d.fill(isoDay(45));
      },
    });
    await step({
      ...r(4),
      do: async () => {
        await show(page.getByLabel("Remind us with tasks"));
        await pick({ tap }, page.getByLabel("Who looks after the tasks"), "Kavya Sharma");
      },
    });
    await step({ ...r(5), do: () => tap(page.getByRole("button", { name: "Save outfit" })) });
    await step({ ...r(6), do: () => tap(page.getByRole("link", { name: /Fittings and alterations/ }).or(page.getByRole("tab", { name: /Fittings and alterations/ })).first()) });
    await step({ ...r("end"), do: () => show(page.getByText(/Fitting|pick-up/i).first()) });
  },
};
