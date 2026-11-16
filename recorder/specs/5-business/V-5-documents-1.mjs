// V-5-documents-1 · How to upload a document · guides\5-business\documents.md
import { choose, openPage, planner, replace, samplePdf } from "./_lib.mjs";

export default {
  id: "V-5-documents-1",
  note: "documents",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, show, phone }) {
    const add = page.getByRole("main");
    await step({ n: 0, what: "Show Documents with no files", hold: 5 });
    await step({ n: 1, what: "Click Documents in the sidebar", hold: 5, do: () => openPage(page, tap, phone, "Documents") });
    await step({
      n: 2,
      what: "Click File under Add a document and choose the sample PDF",
      hold: 5,
      do: async () => {
        const file = add.getByLabel("File");
        await show(file);
        await file.setInputFiles(samplePdf("FSSAI licence (sample).pdf", "FSSAI licence, made up for the guide"));
      },
    });
    await step({
      n: 3,
      what: "Type FSSAI licence 2027 in Title and pick Licence in What is it?",
      hold: 9,
      do: async () => {
        await replace(page, tap, add.getByLabel("Title", { exact: true }), "FSSAI licence 2027");
        await choose(show, add.getByLabel("What is it?"), "Licence");
      },
    });
    await step({ n: 4, what: "Click Upload", hold: 4, do: () => tap(add.getByRole("button", { name: "Upload", exact: true })) });
    await step({
      n: "end",
      what: "Show Added. and the document in the list",
      hold: 4,
      do: () => show(page.getByText("FSSAI licence 2027").first()),
    });
  },
};
