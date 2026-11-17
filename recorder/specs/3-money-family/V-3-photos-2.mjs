// V-3-photos-2 · How to move or delete a photo · guides\3-money-family\photos.md
import { pick, script } from "./_lib.mjs";
import { addPhotos } from "./_setup.mjs";

export default {
  id: "V-3-photos-2",
  note: "photos",
  role: "host",
  start: (seed) => `${seed.weddingPath}/photos`,

  // Off camera: a few photos in the Mehendi album, one of them from the sangeet.
  async setup({ page, seed }) {
    await addPhotos(page, seed, "Mehendi", ["mehndi-1.jpg", "mehndi-2.jpg", "sangeet-1.jpg"]);
    await page.goto(`${seed.weddingPath}/photos`);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-photos-2", phone);
    await step({ ...r(0), do: () => show(page.getByRole("link", { name: /^Mehendi/ })) });
    await step({ ...r(1), do: () => tap(page.getByRole("link", { name: /^Mehendi/ })) });
    await step({ ...r(2), do: () => tap(page.getByRole("button", { name: /sangeet/i }).or(page.locator("main img").last()).first()) });
    await step({ ...r(3), do: () => pick({ tap }, page.getByLabel("Album"), "Sangeet") });
    await step({ ...r(4), do: () => tap(page.getByRole("button", { name: "Move", exact: true })) });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { level: 1 })) });
  },
};
