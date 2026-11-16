// V-5-documents-2 · How to get reminded before a document expires, then open or delete a document
import { choose, confirmBox, planner, samplePdf } from "./_lib.mjs";

/** Off camera: upload one made-up file through the Add a document form. */
async function upload(page, fileName, title, type) {
  const form = page.getByRole("main");
  await form.getByLabel("File").setInputFiles(samplePdf(fileName, `${title}, made up for the guide`));
  await form.getByLabel("Title", { exact: true }).fill(title);
  if (type) await choose(async () => {}, form.getByLabel("What is it?"), type);
  await form.getByRole("button", { name: "Upload", exact: true }).click();
  await page.getByText(title).first().waitFor();
}

export default {
  id: "V-5-documents-2",
  note: "documents",
  role: "planner",
  start: (seed) => planner(seed, "/documents"),
  // Off camera: the licence from V-5-documents-1, and a second file called Old brochure.
  async setup({ page }) {
    await upload(page, "FSSAI licence (sample).pdf", "FSSAI licence 2027", "Licence");
    await upload(page, "Old brochure.pdf", "Old brochure", null);
  },

  async run({ page, step, tap, show }) {
    const row = (title) => page.getByRole("listitem").filter({ hasText: title }).first();
    const soon = new Date(Date.now() + 20 * 864e5).toISOString().slice(0, 10);
    await step({ n: 0, what: "Show the licence with no expiry date", hold: 5, do: () => show(row("FSSAI licence 2027")) });
    await step({
      n: 1,
      what: "Click Edit on the licence",
      hold: 4,
      do: () => tap(row("FSSAI licence 2027").getByRole("button", { name: "Edit" })),
    });
    await step({
      n: 2,
      what: "Set Expires on (optional) to a date 20 days away",
      hold: 5,
      do: async () => {
        const box = page.getByLabel("Expires on (optional)").last();
        await show(box);
        await box.fill(soon);
      },
    });
    await step({
      n: 3,
      what: "Click Save",
      hold: 4,
      do: () => tap(row("FSSAI licence 2027").getByRole("button", { name: "Save" })),
    });
    await step({
      n: 4,
      what: "Point to the Needs your attention box at the top",
      hold: 5,
      do: () => show(page.getByText("Needs your attention").first()),
    });
    await step({
      n: 5,
      what: "Hold on the box and the document's expiry tag",
      hold: 5,
      do: () => show(page.getByText("Needs your attention").first()),
    });
    await step({
      n: 6,
      what: "Click Open on the licence",
      hold: 4,
      do: async () => {
        const popup = page.context().waitForEvent("page", { timeout: 8000 }).catch(() => null);
        await tap(row("FSSAI licence 2027").getByRole("link", { name: "Open" }));
        (await popup)?.close().catch(() => {});
      },
    });
    await step({
      n: 7,
      what: "Click Delete on Old brochure",
      hold: 4,
      do: () => tap(row("Old brochure").getByRole("button", { name: "Delete" })),
    });
    await step({
      n: 8,
      what: "Click Delete in the box that asks",
      hold: 5,
      do: () => tap(row("Old brochure").getByRole("button", { name: "Delete" }).or(confirmBox(page).getByRole("button", { name: "Delete" })).last()),
    });
    await step({ n: "end", what: "Show one file left", hold: 4, do: () => show(row("FSSAI licence 2027")) });
  },
};
