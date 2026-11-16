// V-5-planner-code-3 · How to approve or remove a planner (host side) · guides\5-business\planner-code.md
import { askToJoinOffCamera, unlinkPlannerOffCamera } from "./_lib.mjs";

export default {
  id: "V-5-planner-code-3",
  note: "planner-code",
  role: "host",
  start: (seed) => `${seed.weddingPath}/settings/codes`,
  // Off camera: the host ends the link, then Utsav Planners asks again with the Wedding ID.
  async setup({ page, seed }) {
    await unlinkPlannerOffCamera(page, seed);
    await askToJoinOffCamera(page, seed);
    await page.goto(`${seed.weddingPath}/settings/codes`);
  },

  async run({ page, step, tap, show }) {
    const box = page.getByRole("region", { name: "Planner" });
    await step({ n: 0, what: "Show Codes & planner with a Waiting request", hold: 5, do: () => show(box) });
    await step({
      n: 1,
      what: "Highlight the name and ID of Utsav Planners",
      hold: 5,
      do: () => show(box.getByText("Utsav Planners").first()),
    });
    await step({ n: 2, what: "Click Approve", hold: 4, do: () => tap(box.getByRole("button", { name: "Approve" })) });
    await step({ n: 3, what: "Click Remove planner", hold: 4, do: () => tap(box.getByRole("button", { name: "Remove planner" })) });
    await step({ n: 4, what: "Click Yes, remove", hold: 4, do: () => tap(page.getByRole("button", { name: "Yes, remove" })) });
    await step({
      n: "end",
      what: "Show Planner with the Have a planner code? box",
      hold: 4,
      do: () => show(page.getByLabel("Have a planner code?")),
    });
  },
};
