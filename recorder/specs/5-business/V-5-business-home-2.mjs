// V-5-business-home-2 · How to open a wedding
import { planner } from "./_lib.mjs";

export default {
  id: "V-5-business-home-2",
  note: "business-home",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, show }) {
    const row = page.getByRole("region", { name: "Your weddings" }).getByRole("link", { name: /Sharma.Patel wedding/ });
    await step({
      n: 0,
      what: "Show Your weddings on business Home",
      hold: 5,
      do: () => show(page.getByRole("region", { name: "Your weddings" }).getByRole("heading", { name: "Your weddings" })),
    });
    await step({ n: 1, what: "Hover the Sharma-Patel row", hold: 6, do: () => show(row) });
    await step({ n: 2, what: "Click the Sharma-Patel row", hold: 6, do: () => tap(row) });
    await step({ n: "end", what: "Show the Sharma-Patel wedding Home", hold: 4, do: () => page.waitForURL(/\/w\/[0-9a-f-]{36}/) });
  },
};
