// V-5-vendor-wedding-page-2 · How to use your tools · guides\5-business\vendor-wedding-page.md
import { openVendorWeddingPage } from "./_lib.mjs";

export default {
  id: "V-5-vendor-wedding-page-2",
  note: "vendor-wedding-page",
  role: "vendor",
  start: (seed) => seed.vendorPath,
  async setup({ page, seed }) {
    await openVendorWeddingPage(page, seed);
  },

  async run({ page, step, tap, type, show }) {
    const checklist = page.getByRole("region", { name: "Checklist" });
    const tools = checklist.getByRole("heading", { name: "Checklist" });
    await step({ n: 0, what: "Show the wedding page, scrolled to Your tools", hold: 5, do: async () => {
      await tap(page.getByRole("navigation", { name: "On this page" }).getByRole("link", { name: "Your tools" }));
      await show(tools);
    } });
    await step({
      n: 1,
      what: "Click Add a starter checklist under Checklist",
      hold: 5,
      do: () => tap(checklist.getByRole("button", { name: "Add a starter checklist" })),
    });
    await step({
      n: 2,
      what: "Type Order marigold garlands in Add a task",
      hold: 7,
      do: () => type(checklist.getByLabel("Add a task"), "Order marigold garlands"),
    });
    await step({ n: 3, what: "Click Add", hold: 5, do: () => tap(checklist.getByRole("button", { name: "Add", exact: true })) });
    await step({
      n: 4,
      what: "Tick Done on the first line",
      hold: 5,
      do: () => tap(checklist.getByRole("checkbox", { name: /as done$/ }).first()),
    });
    await step({ n: "end", what: "Show the checklist with one line done", hold: 5, do: () => show(tools) });
  },
};
