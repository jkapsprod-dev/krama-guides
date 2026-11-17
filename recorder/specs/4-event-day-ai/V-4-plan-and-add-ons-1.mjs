// V-4-plan-and-add-ons-1 · How to see your plan and what is included · guides\4-event-day-ai\plan-and-add-ons.md
// Host Riya Sharma, lane 4. On a computer there is no More: Settings sits in the sidebar (desktop line in
// voiceover\V-4-plan-and-add-ons-1.sizes.json).
export default {
  id: "V-4-plan-and-add-ons-1",
  note: "plan-and-add-ons",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    await step({
      n: 0,
      what: "Show Home on a phone",
      hold: 5,
      do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding", level: 1 })),
    });
    await step({
      n: 1,
      what: phone ? "Tap More, then Settings" : "Tap Settings in the sidebar",
      hold: 5,
      do: async () => {
        if (phone) {
          await tap(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "More", exact: true }));
          await tap(page.getByRole("main").getByRole("link", { name: /^Settings/ }));
        } else {
          await tap(page.getByRole("complementary").getByRole("link", { name: "Settings", exact: true }));
        }
      },
    });
    await step({
      n: 2,
      what: "Tap Plan & add-ons",
      hold: 4,
      do: () => tap(page.getByRole("link", { name: "Plan & add-ons", exact: true }).first()),
    });
    await step({
      n: 3,
      what: "Zoom on Free during the pilot",
      hold: 5,
      do: () => show(page.getByRole("heading", { name: "Free during the pilot", level: 2 })),
    });
    await step({
      n: 4,
      what: "Scroll through the add-ons and Usage",
      hold: 5,
      do: async () => {
        await show(page.getByRole("region", { name: "Plan & add-ons" }).getByRole("list"));
        await show(page.getByRole("heading", { name: "Usage", level: 2 }));
      },
    });
    await step({
      n: "end",
      what: "Show the full page",
      hold: 3,
      do: () => show(page.getByRole("heading", { name: "Plan & add-ons", level: 1 })),
    });
  },
};
