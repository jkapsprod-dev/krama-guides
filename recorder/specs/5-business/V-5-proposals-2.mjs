// V-5-proposals-2 · How to send a proposal to your client · guides\5-business\proposals.md
import { openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-proposals-2",
  note: "proposals",
  role: "planner",
  start: (seed) => planner(seed, "/proposals"),

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show the Proposals page with the draft for Meera Shah", hold: 5, do: () => show(page.getByRole("link", { name: /Proposal for Meera Shah/ }).first()) });
    await step({
      n: 1,
      what: "Click Proposal for Meera Shah",
      hold: 5,
      do: () => tap(page.getByRole("link", { name: /Proposal for Meera Shah/ }).first()),
    });
    await step({ n: 2, what: "Point at Client's email", hold: 5, do: () => show(page.getByLabel("Client's email", { exact: true })) });
    await step({ n: 3, what: "Click Save and send", hold: 5, do: () => tap(page.getByRole("button", { name: "Save and send" })) });
    await step({
      n: 4,
      what: "Point at the box Share with your client",
      hold: 5,
      do: () => show(page.getByText("Share with your client").first()),
    });
    await step({ n: 5, what: "Click Copy link", hold: 5, do: () => tap(page.getByRole("button", { name: "Copy link" })) });
    await step({ n: "end", what: "Show the status Sent", hold: 5, do: () => show(page.getByText("Sent", { exact: true }).first()) });
  },
};
