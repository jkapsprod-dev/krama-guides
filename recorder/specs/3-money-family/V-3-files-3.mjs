// V-3-files-3 · How to hide money files from helpers and viewers · guides\3-money-family\files.md
import { script } from "./_lib.mjs";
import { addFiles } from "./_setup.mjs";

export default {
  id: "V-3-files-3",
  note: "files",
  role: "host",
  start: (seed) => `${seed.weddingPath}/files`,

  // Off camera: a caterer quote with rates in it.
  async setup({ page, seed }) {
    await addFiles(page, seed, ["Caterer quote.pdf"]);
    await page.goto(`${seed.weddingPath}/files`);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-files-3", phone);
    const file = page.getByRole("link", { name: /Caterer quote\.pdf/ }).first();
    const box = page.getByLabel(/Has money details/);
    await step({ ...r(0), do: () => show(file) });
    await step({ ...r(1), do: () => tap(file) });
    await step({ ...r(2), do: () => show(box) });
    await step({ ...r(3), do: () => tap(box) });
    await step({ ...r(4), do: () => tap(page.getByRole("button", { name: "Save", exact: true })) });
    await step({ ...r("end"), do: () => show(file.getByText("Money", { exact: true })) });
  },
};
