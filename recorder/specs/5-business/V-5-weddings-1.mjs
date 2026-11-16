// V-5-weddings-1 · How to ask to join a wedding, then cancel a request · guides\5-business\weddings.md
import { confirmBox, openPage, planner, unlinkPlannerOffCamera } from "./_lib.mjs";

export default {
  id: "V-5-weddings-1",
  note: "weddings",
  role: "planner",
  start: (seed) => planner(seed),
  // Off camera: the host ends Utsav Planners' link to the Sharma-Patel wedding.
  async setup({ page, seed }) {
    await unlinkPlannerOffCamera(page, seed);
    await page.goto(planner(seed));
  },

  async run({ page, step, tap, type, show, phone, seed }) {
    const waiting = page.getByRole("region", { name: "Waiting for approval" });
    await step({ n: 0, what: "Show business Home with no wedding linked", hold: 5 });
    await step({ n: 1, what: "Click Weddings in the sidebar", hold: 4, do: () => openPage(page, tap, phone, "Weddings") });
    await step({
      n: 2,
      what: "Paste the ID into Wedding ID under Ask for a wedding",
      hold: 5,
      do: () => type(page.getByLabel("Wedding ID", { exact: true }), seed.weddingId),
    });
    await step({ n: 3, what: "Click Send request", hold: 4, do: () => tap(page.getByRole("button", { name: "Send request" })) });
    await step({ n: 4, what: "Show the request under Waiting for approval", hold: 5, do: () => show(waiting) });
    await step({ n: 5, what: "Click Cancel request", hold: 4, do: () => tap(waiting.getByRole("button", { name: "Cancel request" })) });
    await step({
      n: 6,
      what: "Click the confirm button in the box",
      hold: 4,
      do: () => tap(confirmBox(page).getByRole("button").last()),
    });
    await step({
      n: "end",
      what: "Show Waiting for approval empty",
      hold: 4,
      do: () => show(page.getByRole("main").getByRole("heading", { level: 1 })),
    });
  },
};
