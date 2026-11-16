// V-5-crew-and-shifts-5 · How to see your own shifts (crew) · phone first
// No login. Off camera, the planner makes Mahesh's private link and gives him the Haldi shift; the
// recording then opens that link, like a crew member would from a WhatsApp message.
import { addCrewOffCamera, assignShiftOffCamera, planner, withRole } from "./_lib.mjs";

export default {
  id: "V-5-crew-and-shifts-5",
  note: "crew-and-shifts",
  start: () => "/login",
  async setup({ page, seed }) {
    let link = "";
    await withRole(page, "planner", async (p) => {
      await addCrewOffCamera(p, seed);
      await assignShiftOffCamera(p);
      await p.getByRole("button", { name: "Phone access" }).first().click();
      await p.getByRole("button", { name: "Make link" }).click();
      const box = p.getByRole("textbox").filter({ hasNot: p.locator("[disabled]") });
      await p.getByRole("button", { name: "Copy link" }).waitFor();
      link = await p.locator("input[readonly], input[value*='/']").last().inputValue();
    });
    await page.goto(link);
  },

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show a WhatsApp-style message with the link", hold: 5, do: () => show(page.getByRole("heading", { name: "Your shifts" })) });
    await step({ n: 1, what: "Open the private shift link", hold: 5 });
    await step({
      n: 2,
      what: "Point to Your shifts and the Haldi shift",
      hold: 5,
      do: () => show(page.getByText("Haldi").first()),
    });
    await step({
      n: 3,
      what: "Point to the role, the note and the venue name",
      hold: 5,
      do: () => show(page.getByText("Tent lead").first()),
    });
    await step({
      n: 4,
      what: "Tap the venue name",
      hold: 5,
      do: () => show(page.getByRole("link", { name: /Sharma residence lawn/ }).first()),
    });
    await step({ n: "end", what: "Show the Maps page or the shifts page", hold: 5 });
  },
};
