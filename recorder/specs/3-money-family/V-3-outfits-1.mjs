// V-3-outfits-1 · How to add an outfit · guides\3-money-family\outfits.md
import { openSection, pick, script } from "./_lib.mjs";

export default {
  id: "V-3-outfits-1",
  note: "outfits",
  role: "host", // lane 3 has no separate family login; the host sees Outfits too
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-outfits-1", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({
      ...r(1),
      do: async () => {
        await openSection(ctx, "Outfits");
        await tap(page.getByRole("link", { name: "Add an outfit" }).first());
      },
    });
    await step({ ...r(2), do: () => type(page.getByLabel("Name", { exact: true }), "Bride") });
    await step({ ...r(3), do: () => pick({ tap }, page.getByLabel("Function", { exact: true }), "Sangeet") });
    await step({ ...r(4), do: () => type(page.getByLabel("Outfit", { exact: true }), "Silk lehenga") });
    await step({ ...r(5), do: () => pick({ tap }, page.getByLabel("Main colour"), "Maroon") });
    await step({ ...r(6), do: () => tap(page.getByRole("button", { name: "Save outfit" })) });
    await step({ ...r("end"), do: () => show(page.getByText("Add a photo").first()) });
  },
};
