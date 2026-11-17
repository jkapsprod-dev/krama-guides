// V-3-photos-1 · How to add photos to a function's album · guides\3-money-family\photos.md
import { fixture, openSection, pick, script } from "./_lib.mjs";

export default {
  id: "V-3-photos-1",
  note: "photos",
  role: "host", // lane 3, the couple (Appendix E)
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-photos-1", phone);
    const ctx = { page, tap, phone };
    let chooser = null;
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openSection(ctx, "Photos") });
    await step({ ...r(2), do: () => pick({ tap }, page.getByLabel("Album"), "Mehendi") });
    await step({
      ...r(3),
      do: async () => {
        const wait = page.waitForEvent("filechooser");
        await tap(page.getByText("Add photos", { exact: true }).first());
        chooser = await wait;
      },
    });
    await step({ ...r(4), do: () => chooser.setFiles([fixture("mehndi-1.jpg"), fixture("mehndi-2.jpg"), fixture("mehndi-3.jpg")]) });
    await step({ ...r(5), do: () => show(page.getByText(/Uploading|photos? added/).first()) });
    await step({
      ...r("end"),
      do: async () => {
        await page.getByText(/3 photos added/).waitFor({ timeout: 60_000 });
        await show(page.getByText(/3 photos added/));
      },
    });
  },
};
