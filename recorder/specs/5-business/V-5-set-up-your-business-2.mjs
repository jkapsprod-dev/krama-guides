// V-5-set-up-your-business-2 · How to find and share your Business ID, then switch between your wedding and your business
import { dialog, openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-set-up-your-business-2",
  note: "set-up-your-business",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, show, phone }) {
    const idBox = page.getByRole("region", { name: "Business ID" });
    await step({ n: 0, what: "Show business Home", hold: 5 });
    await step({ n: 1, what: "Click Settings in the sidebar", hold: 5, do: () => openPage(page, tap, phone, "Settings") });
    await step({ n: 2, what: "Highlight the Business ID box", hold: 6, do: () => show(idBox) });
    await step({ n: 3, what: "Click Copy", hold: 3, do: () => tap(idBox.getByRole("button", { name: "Copy" })) });
    await step({ n: 4, what: "Show the Copied message", hold: 4, do: () => show(idBox) });
    await step({
      n: 5,
      what: "Click Switch account at the top of the sidebar",
      hold: 4,
      do: () => tap(page.getByRole("button", { name: /Switch account/ })),
    });
    await step({
      n: 6,
      what: "Highlight Weddings and Businesses in the sheet",
      hold: 4,
      do: () => show(dialog(page).getByRole("heading", { name: "Businesses" })),
    });
    await step({
      n: 7,
      what: "Click the Sharma-Patel wedding",
      hold: 3,
      do: () => tap(dialog(page).getByRole("link", { name: /Sharma.Patel wedding/ })),
    });
    await step({ n: "end", what: "Show the wedding Home", hold: 4, do: () => page.waitForURL(/\/w\/[0-9a-f-]{36}/) });
  },
};
