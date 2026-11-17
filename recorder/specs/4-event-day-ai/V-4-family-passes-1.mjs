// V-4-family-passes-1 · How to print family passes, then cancel a lost pass · guides\4-event-day-ai\family-passes.md
// Host Riya Sharma, lane 4. The robot taps Print passes; its browser has no print dialog.
export default {
  id: "V-4-family-passes-1",
  note: "family-passes",
  role: "host",
  start: (seed) => `${seed.weddingPath}/guests`,

  async run({ page, step, tap, show }) {
    const family = page.getByRole("listitem").filter({ hasText: "Anil Sharma family" });
    await step({ n: 0, what: "Show the Guests list", hold: 5, do: () => show(page.getByRole("heading", { level: 1 })) });
    await step({
      n: 1,
      what: "Tap More, then Family passes",
      hold: 4,
      do: async () => {
        await tap(page.getByRole("main").getByText("More", { exact: true }));
        await tap(page.getByRole("link", { name: /Family passes/ }));
      },
    });
    await step({ n: 2, what: "Scroll the list of passes", hold: 4, do: () => show(family) });
    await step({ n: 3, what: "Tap Print passes", hold: 3, do: () => tap(page.getByRole("button", { name: "Print passes" })) });
    await step({ n: 4, what: "Show the passes ready to print", hold: 3, do: () => show(page.getByRole("heading", { name: "Family passes", level: 1 })) });
    // New pass asks with the browser's own confirm box, which a recording cannot show: the robot says yes to it.
    await step({
      n: 5,
      what: "Tap New pass next to the Anil Sharma family",
      hold: 4,
      do: async () => {
        page.once("dialog", (d) => d.accept());
        await tap(family.getByRole("button", { name: "New pass" }));
      },
    });
    await step({ n: 6, what: "Say yes to the question", hold: 5, do: () => show(family) });
    await step({ n: "end", what: "Show the new pass", hold: 4, do: () => show(page.getByRole("img", { name: "Check-in pass for Anil Sharma family" })) });
  },
};
