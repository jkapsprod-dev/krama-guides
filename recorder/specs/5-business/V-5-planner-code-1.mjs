// V-5-planner-code-1 · How to choose your planner code · guides\5-business\planner-code.md
import { openPage, planner } from "./_lib.mjs";

// A planner code is kept for good once used (the old one still works for 30 days), so every take needs a new one.
let CODE = "";
const newCode = () => `UTSAV-${Date.now().toString(36).slice(-5).toUpperCase()}`;

export default {
  id: "V-5-planner-code-1",
  note: "planner-code",
  role: "planner",
  start: (seed) => {
    CODE = newCode();
    return planner(seed);
  },

  async run({ page, step, tap, type, show, phone }) {
    const box = page.getByRole("region", { name: "Planner code" });
    await step({ n: 0, what: "Show business Home", hold: 5 });
    await step({ n: 1, what: "Click Settings in the sidebar", hold: 5, do: () => openPage(page, tap, phone, "Settings") });
    await step({ n: 2, what: "Highlight the Planner code box", hold: 4, do: () => show(box) });
    await step({
      n: 3,
      what: "Type UTSAV-WEDDINGS in Choose a code",
      hold: 5,
      do: () => type(box.getByRole("textbox", { name: "Choose a code" }), CODE),
    });
    await step({ n: 4, what: "Click Save code", hold: 4, do: () => tap(box.getByRole("button", { name: "Save code" })) });
    await step({ n: 5, what: "Click Copy code", hold: 4, do: () => tap(box.getByRole("button", { name: "Copy code" })) });
    await step({ n: "end", what: "Show the saved code", hold: 4, do: () => show(box.getByText(CODE).first()) });
  },
};
