// V-5-planner-code-2 · How to link a planner (family side) · guides\5-business\planner-code.md
import { planner, unlinkPlannerOffCamera, withRole } from "./_lib.mjs";

let CODE = "";

export default {
  id: "V-5-planner-code-2",
  note: "planner-code",
  role: "host",
  start: (seed) => {
    CODE = `UTSAV-${Date.now().toString(36).slice(-5).toUpperCase()}`; // a used code is kept for good, so each take needs a new one
    return seed.weddingPath;
  },
  // Off camera: Utsav Planners saves its code (V-5-planner-code-1), then the host ends the link.
  async setup({ page, seed }) {
    await withRole(page, "planner", async (p) => {
      await p.goto(planner(seed, "/settings"));
      const box = p.getByRole("region", { name: "Planner code" });
      await box.getByRole("textbox", { name: "Choose a code" }).fill(CODE);
      await box.getByRole("button", { name: "Save code" }).click();
      await box.getByText(CODE).first().waitFor();
    });
    await unlinkPlannerOffCamera(page, seed);
    await page.goto(seed.weddingPath);
  },

  async run({ page, step, tap, type, show, phone }) {
    const box = page.getByRole("region", { name: "Planner" });
    await step({ n: 0, what: "Show the wedding Home", hold: 5 });
    await step({
      n: 1,
      what: "Click Settings, then Codes & planner",
      hold: 6,
      do: async () => {
        if (phone) {
          await tap(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "More", exact: true }));
        }
        await tap(page.getByRole("link", { name: "Settings", exact: true }).first());
        await tap(page.getByRole("navigation", { name: "Settings sections" }).getByRole("link", { name: "Codes & planner" }));
      },
    });
    await step({
      n: 2,
      what: "Type the code in Have a planner code?",
      hold: 5,
      do: () => type(box.getByLabel("Have a planner code?"), CODE),
    });
    await step({ n: 3, what: "Click Find", hold: 4, do: () => tap(box.getByRole("button", { name: "Find" })) });
    await step({ n: 4, what: "Click Link planner", hold: 5, do: () => tap(box.getByRole("button", { name: "Link planner" })) });
    await step({ n: "end", what: "Show Planner linked.", hold: 4, do: () => show(page.getByText("Planner linked.").first()) });
  },
};
