// V-5-weddings-2 · How to leave a wedding · guides\5-business\weddings.md
import { confirmBox, planner } from "./_lib.mjs";

export default {
  id: "V-5-weddings-2",
  note: "weddings",
  role: "planner",
  start: (seed) => planner(seed, "/weddings"),

  async run({ page, step, tap, show }) {
    const linked = page.getByRole("region", { name: "Linked weddings" });
    await step({ n: 0, what: "Show Weddings with the Sharma-Patel wedding linked", hold: 6, do: () => show(linked) });
    await step({ n: 1, what: "Click Leave wedding", hold: 6, do: () => tap(linked.getByRole("button", { name: "Leave wedding" })) });
    await step({
      n: 2,
      what: "Click the confirm button in the box",
      hold: 8,
      do: () => tap(confirmBox(page).getByRole("button", { name: "Leave wedding" })),
    });
    await step({ n: "end", what: "Show Linked weddings empty", hold: 6, do: () => show(page.getByRole("main").getByRole("heading", { level: 1 })) });
  },
};
