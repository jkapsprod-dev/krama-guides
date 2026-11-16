// V-5-quote-requests-3 · How to send quotes to the client, then write a brief for a vendor · guides\5-business\quote-requests.md
import { addVendorToBookOffCamera, openPage, planner, sendQuoteOffCamera, sendQuoteRequestOffCamera } from "./_lib.mjs";

export default {
  id: "V-5-quote-requests-3",
  note: "quote-requests",
  role: "planner",
  start: (seed) => planner(seed, "/quotes"),
  // Off camera: Rangoli Decor is in the vendor book, a request was sent, and the vendor's quote shows as Quoted.
  async setup({ page, seed }) {
    await addVendorToBookOffCamera(page, seed);
    await sendQuoteRequestOffCamera(page, seed);
    await sendQuoteOffCamera(page, seed);
    await page.goto(planner(seed, "/quotes"));
  },

  async run({ page, step, tap, type, show }) {
    const card = page.getByRole("listitem").filter({ hasText: "Rangoli Decor" }).filter({ has: page.getByRole("button", { name: "Save brief" }) });
    await step({ n: 0, what: "Show the request with a Quoted price", hold: 5, do: () => show(page.getByText("Quoted").first()) });
    await step({ n: 1, what: "Open Quote requests and point to the price", hold: 5, do: () => show(page.getByText(/52,000/).first()) });
    await step({
      n: 2,
      what: "Tick Rangoli Decor's quote",
      hold: 5,
      do: () => tap(page.getByRole("checkbox").first()),
    });
    await step({ n: 3, what: "Click Send to client", hold: 5, do: () => tap(page.getByRole("button", { name: "Send to client" })) });
    await step({ n: 4, what: "Show the request marked With the client", hold: 5, do: () => show(page.getByText("With the client").first()) });
    await step({
      n: 5,
      what: "Scroll to Briefs for your vendors",
      hold: 5,
      do: () => show(page.getByRole("heading", { name: "Briefs for your vendors" })),
    });
    await step({
      n: 6,
      what: "Type Haldi setup ready by 7 am. Marigold and mango leaf. in Brief",
      hold: 9,
      do: () => type(card.getByRole("textbox", { name: "Brief", exact: true }), "Haldi setup ready by 7 am. Marigold and mango leaf."),
    });
    await step({
      n: 7,
      what: "Type a name and number in Who to call on the day",
      hold: 7,
      do: () => type(card.getByRole("textbox", { name: "Who to call on the day" }), "Meena Bua 98250 11223"),
    });
    await step({ n: 8, what: "Click Save brief", hold: 5, do: () => tap(card.getByRole("button", { name: "Save brief" })) });
    await step({ n: "end", what: "Show Brief saved. and the read status", hold: 5, do: () => show(page.getByText("Brief saved.").first()) });
  },
};
