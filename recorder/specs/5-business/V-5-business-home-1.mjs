// V-5-business-home-1 · How to work through Needs you, then read Your weddings or Today's jobs
import { planner } from "./_lib.mjs";

export default {
  id: "V-5-business-home-1",
  note: "business-home",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, show }) {
    const needs = page.getByRole("region", { name: "Needs you" });
    const weddings = page.getByRole("region", { name: "Your weddings" });
    await step({ n: 0, what: "Show business Home, Needs you at the top", hold: 5, do: () => show(needs.getByRole("heading", { name: "Needs you" })) });
    await step({ n: 1, what: "Highlight the Needs you list", hold: 5, do: () => show(needs.getByRole("list")) });
    await step({
      n: 2,
      what: "Highlight the red number on line 1",
      hold: 4,
      do: () => show(needs.getByRole("listitem").first().getByText("1", { exact: true })),
    });
    await step({
      n: 3,
      what: "Click line 1",
      hold: 4,
      do: () => tap(needs.getByRole("listitem").first().getByRole("link")),
    });
    await step({ n: 4, what: "Show the page that opened", hold: 4, do: () => page.waitForURL(/\/w\/[0-9a-f-]{36}/) });
    await step({
      n: 5,
      what: "Go back to Home and scroll to Your weddings",
      hold: 5,
      do: async () => {
        await page.goBack();
        await show(weddings.getByRole("heading", { name: "Your weddings" }));
      },
    });
    await step({
      n: 6,
      what: "Highlight the Sharma-Patel row",
      hold: 4,
      do: () => show(weddings.getByRole("link", { name: /Sharma.Patel wedding/ })),
    });
    await step({
      n: 7,
      what: "Highlight the Tasks and RSVPs columns",
      hold: 4,
      do: () => show(weddings.getByText(/waiting$/).filter({ visible: true }).first()),
    });
    await step({
      n: 8,
      what: "Scroll to Coming up",
      hold: 4,
      do: () => show(page.getByRole("region", { name: "Coming up" }).getByRole("heading", { name: "Coming up" })),
    });
    await step({ n: "end", what: "Show the full Home", hold: 4 });
  },
};
