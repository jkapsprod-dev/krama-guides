// V-3-upload-qr-2 · How to switch it off or replace it · guides\3-money-family\upload-qr.md
import { script } from "./_lib.mjs";

export default {
  id: "V-3-upload-qr-2",
  note: "upload-qr",
  role: "host",
  start: (seed) => `${seed.weddingPath}/photos`,

  // Off camera: make the QR first, so there is one to switch off and replace.
  async setup({ page, seed }) {
    await page.goto(`${seed.weddingPath}/photos/qr`);
    await page.getByRole("button", { name: "Create the upload QR" }).click();
    await page.getByRole("button", { name: "Switch off" }).waitFor();
    await page.goto(`${seed.weddingPath}/photos`);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-upload-qr-2", phone);
    const dialog = page.getByRole("alertdialog").or(page.getByRole("dialog"));
    await step({ ...r(0), do: () => show(page.getByRole("link", { name: "Upload QR" })) });
    await step({ ...r(1), do: () => tap(page.getByRole("link", { name: "Upload QR" })) });
    await step({ ...r(2), do: () => tap(page.getByRole("button", { name: "Switch off" })) });
    await step({ ...r(3), do: () => tap(page.getByRole("button", { name: "Switch on" })) });
    await step({ ...r(4), do: () => tap(page.getByRole("button", { name: "New QR", exact: true })) });
    await step({ ...r(5), do: () => tap(dialog.getByRole("button", { name: "New QR", exact: true })) });
    await step({ ...r("end"), do: () => show(page.getByRole("button", { name: "Switch off" })) });
  },
};
