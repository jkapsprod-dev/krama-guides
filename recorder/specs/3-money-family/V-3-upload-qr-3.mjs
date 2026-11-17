// V-3-upload-qr-3 · How a guest adds photos with the QR · guides\3-money-family\upload-qr.md
// A guest: no sign-in. The upload link comes from the QR the host makes off camera.
import path from "node:path";

import { fixture, pick, ROOT, script } from "./_lib.mjs";

export default {
  id: "V-3-upload-qr-3",
  note: "upload-qr",
  // no role: the guest opens the link without an account
  start: (seed) => seed.guestLinkPath,

  // Off camera: the host makes the QR and the robot reads its link, then opens it as the guest.
  async setup({ page, seed }) {
    const browser = page.context().browser();
    const hostState = path.join(ROOT, "recorder", ".cache", "auth", "lane3-host.json");
    const host = await browser.newContext({ baseURL: new URL(page.url()).origin, storageState: hostState });
    const hp = await host.newPage();
    await hp.goto(`${seed.weddingPath}/photos/qr`);
    const create = hp.getByRole("button", { name: "Create the upload QR" });
    if (await create.isVisible().catch(() => false)) await create.click();
    const link = await hp.getByText(/\/up\/[\w-]+/).first().innerText();
    await host.close();
    await page.goto(link.trim());
  },

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-upload-qr-3", phone);
    let chooser = null;
    await step({ ...r(0), do: () => show(page.getByRole("heading").first()) });
    await step({ ...r(1), do: () => show(page.getByRole("heading").first()) });
    await step({ ...r(2), do: () => type(page.getByLabel("Your name (optional)"), "Aarav") });
    await step({ ...r(3), do: () => pick({ tap }, page.getByLabel("Album"), "Sangeet") });
    await step({
      ...r(4),
      do: async () => {
        const wait = page.waitForEvent("filechooser");
        await tap(page.getByText("Add photos", { exact: true }).first());
        chooser = await wait;
        await chooser.setFiles([fixture("sangeet-1.jpg"), fixture("sangeet-2.jpg"), fixture("sangeet-3.jpg")]);
      },
    });
    await step({
      ...r(5),
      do: async () => {
        await page.getByText(/3 photos added/).waitFor({ timeout: 60_000 });
        await show(page.getByText(/3 photos added/));
      },
    });
    await step({ ...r(6), do: () => show(page.getByText("Your photos", { exact: true })) });
    await step({ ...r("end"), do: () => show(page.getByRole("heading").first()) });
  },
};
