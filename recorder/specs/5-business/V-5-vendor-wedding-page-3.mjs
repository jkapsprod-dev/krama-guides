// V-5-vendor-wedding-page-3 · How to add crew and deliverables · guides\5-business\vendor-wedding-page.md
import { openVendorWeddingPage } from "./_lib.mjs";

export default {
  id: "V-5-vendor-wedding-page-3",
  note: "vendor-wedding-page",
  role: "vendor",
  start: (seed) => seed.vendorPath,
  async setup({ page, seed }) {
    await openVendorWeddingPage(page, seed);
  },

  async run({ page, step, tap, type, show }) {
    await step({ n: 0, what: "Show the wedding page, scrolled to Your crew", hold: 5, do: () => show(page.getByRole("heading", { name: "Your crew" })) });
    await step({
      n: 1,
      what: "Type Sanjay in Crew member and Lead decorator in Role",
      hold: 9,
      do: async () => {
        await type(page.getByLabel("Crew member"), "Sanjay");
        await type(page.getByLabel("Role", { exact: true }).first(), "Lead decorator");
      },
    });
    await step({ n: 2, what: "Click Add crew", hold: 5, do: () => tap(page.getByRole("button", { name: "Add crew" })) });
    await step({
      n: 3,
      what: "Type Stage photos for the family in What will you deliver?",
      hold: 8,
      do: () => type(page.getByLabel("What will you deliver?"), "Stage photos for the family"),
    });
    await step({ n: 4, what: "Click Add deliverable", hold: 5, do: () => tap(page.getByRole("button", { name: "Add deliverable" })) });
    await step({ n: "end", what: "Show the crew and the deliverable on the page", hold: 5, do: () => show(page.getByText("Stage photos for the family").first()) });
  },
};
