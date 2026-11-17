// V-4-food-2 · How to set the plates guaranteed, then send it to the caterer · guides\4-event-day-ai\food.md
// Host Riya Sharma, lane 4. The robot taps Print for the caterer and Download CSV; its browser has no
// print dialog and the CSV lands in a temporary folder, so the video ends on the page.
import { fn } from "./_lib.mjs";

export default {
  id: "V-4-food-2",
  note: "food",
  role: "host",
  start: (seed) => `${seed.weddingPath}/events/${fn(seed, "Reception")}/food`,

  async run({ page, step, tap, type, show }) {
    const form = page.getByRole("form", { name: "Note and guarantee" });
    await step({ n: 0, what: "Show the count sheet", hold: 5, do: () => show(page.getByRole("region", { name: "Count sheet" })) });
    await step({ n: 1, what: "Scroll to Note and guarantee", hold: 3, do: () => show(form) });
    await step({
      n: 2,
      what: "Type 300 under Plates guaranteed and pick a Guarantee by date",
      hold: 4,
      do: async () => {
        await type(form.getByRole("spinbutton", { name: "Plates guaranteed" }), "300");
        // A date box takes its whole value at once; the tap shows where it is.
        const by = form.getByRole("textbox", { name: "Guarantee by" });
        await tap(by);
        await by.fill("2027-02-08");
      },
    });
    await step({ n: 3, what: "Tap Save", hold: 3, do: () => tap(form.getByRole("button", { name: "Save" })) });
    await step({ n: 4, what: "Show the guarantee line", hold: 4, do: async () => {
        const line = page.getByText(/Guaranteed 300 plates/).first();
        await line.waitFor({ state: "visible", timeout: 120_000 });
        await show(line);
      },
    });
    await step({ n: 5, what: "Tap Print for the caterer", hold: 3, do: () => tap(page.getByRole("button", { name: "Print for the caterer" })) });
    await step({ n: 6, what: "Tap Download CSV", hold: 4, do: () => tap(page.getByRole("link", { name: "Download CSV" })) });
    await step({ n: "end", what: "Show the count sheet and the guarantee line", hold: 4, do: () => show(page.getByText(/Guaranteed 300 plates/)) });
  },
};
