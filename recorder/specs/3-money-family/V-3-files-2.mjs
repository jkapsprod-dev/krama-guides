// V-3-files-2 · How to link a file to a function, task, vendor or guest · guides\3-money-family\files.md
import { pick, script } from "./_lib.mjs";
import { addFiles } from "./_setup.mjs";

export default {
  id: "V-3-files-2",
  note: "files",
  role: "host",
  start: (seed) => `${seed.weddingPath}/files`,

  // Off camera: a seating list with no link yet.
  async setup({ page, seed }) {
    await addFiles(page, seed, ["Haldi seating list.xlsx"]);
    await page.goto(`${seed.weddingPath}/files`);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-files-2", phone);
    const file = page.getByRole("link", { name: /Haldi seating list\.xlsx/ }).first();
    await step({ ...r(0), do: () => show(file) });
    await step({ ...r(1), do: () => tap(file) });
    await step({ ...r(2), do: () => pick({ tap }, page.getByLabel("Link to"), "Function") });
    await step({ ...r(3), do: () => pick({ tap }, page.getByLabel(/^Which function|Function$/).last(), "Haldi") });
    await step({ ...r(4), do: () => tap(page.getByRole("button", { name: "Save", exact: true })) });
    await step({ ...r("end"), do: () => show(page.getByText(/Linked to Haldi/).first()) });
  },
};
