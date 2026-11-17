// V-3-photos-3 · How to download everything · guides\3-money-family\photos.md
// Desktop first; the phone take does the same steps.
import { openSection, script } from "./_lib.mjs";
import { addPhotos } from "./_setup.mjs";

export default {
  id: "V-3-photos-3",
  note: "photos",
  role: "host",
  start: (seed) => seed.weddingPath,

  // Off camera: photos in two albums, so there is something to download.
  async setup({ page, seed }) {
    await addPhotos(page, seed, "Mehendi", ["mehndi-1.jpg", "mehndi-2.jpg", "mehndi-3.jpg"]);
    await addPhotos(page, seed, "Sangeet", ["sangeet-1.jpg", "sangeet-2.jpg", "sangeet-3.jpg"]);
    await page.goto(seed.weddingPath);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-photos-3", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openSection(ctx, "Photos") });
    await step({ ...r(2), do: () => tap(page.getByRole("button", { name: /^Download all/ })) });
    await step({ ...r(3), do: () => show(page.getByRole("button", { name: /^Part 1/ }).first()) });
    await step({
      ...r(4),
      do: async () => {
        const dl = page.waitForEvent("download", { timeout: 60_000 });
        await tap(page.getByRole("button", { name: /^Part 1/ }).first());
        await dl;
      },
    });
    await step({ ...r("end"), do: () => show(page.getByRole("button", { name: /^Part 1/ }).first()) });
  },
};
