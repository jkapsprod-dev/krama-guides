// V-3-files-1 · How to upload a contract or list · guides\3-money-family\files.md
import { fixture, openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-files-1",
  note: "files",
  role: "host", // lane 3 has no separate family login; the host sees Files too
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-files-1", phone);
    const ctx = { page, tap, phone };
    let chooser = null;
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openSection(ctx, "Files") });
    await step({
      ...r(2),
      do: async () => {
        const wait = page.waitForEvent("filechooser");
        await tap(page.getByText("Upload files", { exact: true }).first());
        chooser = await wait;
      },
    });
    await step({ ...r(3), do: () => chooser.setFiles(fixture("Rangoli Decor quote.pdf")) });
    await step({ ...r(4), do: () => show(page.getByText("Uploaded.").first()) });
    await step({ ...r("end"), do: () => tap(page.getByRole("link", { name: /Rangoli Decor quote\.pdf/ }).first()) });
  },
};
