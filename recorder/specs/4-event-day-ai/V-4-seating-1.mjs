// V-4-seating-1 · How to add tables, then seat a family · guides\4-event-day-ai\seating.md
// Host Riya Sharma, lane 4. The Reception has no tables yet.
import { fn } from "./_lib.mjs";

export default {
  id: "V-4-seating-1",
  note: "seating",
  role: "host",
  start: (seed) => `${seed.weddingPath}/events/${fn(seed, "Reception")}/seating`,

  async run({ page, step, tap, type, show }) {
    const addForm = page.getByRole("form", { name: "Add tables" });
    const find = page.getByRole("textbox", { name: "Find a family" });
    const replaceNumber = async (box, value) => {
      await tap(box);
      await page.keyboard.press("Control+A");
      await page.keyboard.type(value, { delay: 85 });
    };

    await step({ n: 0, what: "Show the empty Seating tab of the Reception", hold: 5, do: () => show(page.getByRole("heading", { name: "Seating · Reception" })) });
    await step({ n: 1, what: "Type 12 in How many", hold: 4, do: () => replaceNumber(addForm.getByRole("spinbutton", { name: "How many" }), "12") });
    await step({
      n: 2,
      what: "Set Seats to 10 and Shape to Round",
      hold: 3,
      do: async () => {
        await replaceNumber(addForm.getByRole("spinbutton", { name: "Seats" }), "10");
        await show(addForm.getByRole("combobox", { name: "Shape" }));
      },
    });
    await step({ n: 3, what: "Tap Add", hold: 3, do: () => tap(addForm.getByRole("button", { name: "Add", exact: true })) });
    await step({ n: 4, what: "Show the 12 tables", hold: 3, do: () => show(page.getByRole("region", { name: "Tables" }).getByRole("heading", { name: "Tables" })) });
    await step({ n: 5, what: "Type Mehta in Find a family", hold: 4, do: () => type(find, "Mehta") });
    await step({ n: 6, what: "Tap the Mehta family", hold: 3, do: () => tap(page.getByRole("button", { name: /^Mehta family/ })) });
    await step({ n: 7, what: "Tap Seat Mehta family here on Table 1", hold: 3, do: () => tap(page.getByRole("button", { name: "Seat Mehta family here" }).first()) });
    await step({ n: "end", what: "Show Table 1 filling up", hold: 4, do: () => show(page.getByRole("listitem", { name: "Table 1", exact: true })) });
  },
};
