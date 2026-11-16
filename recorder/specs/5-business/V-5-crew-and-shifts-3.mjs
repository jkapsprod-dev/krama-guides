// V-5-crew-and-shifts-3 · How to send the call sheet · guides\5-business\crew-and-shifts.md
// The robot does not follow the WhatsApp link: the video ends on the Open in WhatsApp button.
import { addCrewOffCamera, assignShiftOffCamera } from "./_lib.mjs";

export default {
  id: "V-5-crew-and-shifts-3",
  note: "crew-and-shifts",
  role: "planner",
  start: (seed) => seed.plannerPath,
  // Off camera: Mahesh Parmar on the crew list, with the Haldi shift from V-5-crew-and-shifts-2.
  async setup({ page, seed }) {
    await addCrewOffCamera(page, seed);
    await assignShiftOffCamera(page);
  },

  async run({ page, step, tap, show }) {
    const sheetLink = page.getByText("Call sheets:").locator("..").getByRole("link").first();
    await step({ n: 0, what: "Show Coming up with one shift", hold: 5, do: () => show(page.getByRole("heading", { name: "Coming up" })) });
    await step({ n: 1, what: "Click the date next to Call sheets:", hold: 5, do: () => tap(sheetLink) });
    await step({
      n: 2,
      what: "Point to the function, venue and times on the sheet",
      hold: 5,
      do: () => show(page.getByText("Haldi").first()),
    });
    await step({
      n: 3,
      what: "Hover over Open in WhatsApp",
      hold: 5,
      do: () => show(page.getByRole("link", { name: "Open in WhatsApp" }).first()),
    });
    await step({
      n: 4,
      what: "Point to Copy message and Print or save as PDF",
      hold: 5,
      do: () => show(page.getByRole("button", { name: "Copy message" }).first()),
    });
    await step({ n: "end", what: "Hold on the call sheet", hold: 5 });
  },
};
