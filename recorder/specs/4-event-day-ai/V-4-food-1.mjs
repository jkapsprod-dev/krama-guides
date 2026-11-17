// V-4-food-1 · How to write the menu · guides\4-event-day-ai\food.md
// Host Riya Sharma, lane 4. The Reception has no dishes yet.
import { fn } from "./_lib.mjs";

export default {
  id: "V-4-food-1",
  note: "food",
  role: "host",
  start: (seed) => `${seed.weddingPath}/events/${fn(seed, "Reception")}`,

  async run({ page, step, tap, type, show }) {
    const addDish = page.getByRole("form", { name: "Add dish" });
    await step({ n: 0, what: "Show the Reception function page", hold: 5, do: () => show(page.getByRole("heading", { name: "Reception", level: 1 })) });
    await step({ n: 1, what: "Tap Menu and counts", hold: 4, do: () => tap(page.getByRole("link", { name: "Menu and counts" })) });
    await step({ n: 2, what: "Scroll to Change the menu", hold: 4, do: () => show(page.getByRole("heading", { name: "Change the menu", level: 2 })) });
    await step({
      n: 3,
      what: "Type Paneer tikka, pick Starters and Veg",
      hold: 6,
      do: async () => {
        await type(addDish.getByRole("textbox", { name: "Dish" }), "Paneer tikka");
        await show(addDish.getByRole("combobox", { name: "Course" }));
        await addDish.getByRole("combobox", { name: "Course" }).selectOption({ label: "Starters" });
        await show(addDish.getByRole("combobox", { name: "Diet" }));
        await addDish.getByRole("combobox", { name: "Diet" }).selectOption({ label: "Veg" });
      },
    });
    await step({ n: 4, what: "Tap Add dish", hold: 4, do: () => tap(addDish.getByRole("button", { name: "Add dish" })) });
    await step({ n: "end", what: "Show the menu list", hold: 4, do: () => show(page.getByRole("region", { name: "Menu", exact: true })) });
  },
};
