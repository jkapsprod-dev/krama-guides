// V-3-upload-qr-1 · How to make a photo QR for guests · guides\3-money-family\upload-qr.md
import { openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-upload-qr-1",
  note: "upload-qr",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-upload-qr-1", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openSection(ctx, "Photos") });
    await step({ ...r(2), do: () => tap(page.getByRole("link", { name: "Upload QR" })) });
    await step({ ...r(3), do: () => tap(page.getByRole("button", { name: "Create the upload QR" })) });
    await step({
      ...r(4),
      do: async () => {
        await page.evaluate(() => { window.print = () => {}; }); // the print screen is the browser's
        await tap(page.getByRole("button", { name: "Print", exact: true }));
      },
    });
    await step({ ...r("end"), do: () => show(page.getByRole("img", { name: /QR code to add photos/ })) });
  },
};
