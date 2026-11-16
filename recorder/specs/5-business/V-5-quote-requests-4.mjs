// V-5-quote-requests-4 · How to send your quote (vendors) · guides\5-business\quote-requests.md
import { addVendorToBookOffCamera, sendQuoteRequestOffCamera, vendor } from "./_lib.mjs";

export default {
  id: "V-5-quote-requests-4",
  note: "quote-requests",
  role: "vendor",
  start: (seed) => vendor(seed),
  // Off camera: Rangoli Decor is in the planner's book and a quote request is waiting.
  async setup({ page, seed }) {
    await addVendorToBookOffCamera(page, seed);
    await sendQuoteRequestOffCamera(page, seed);
    await page.goto(vendor(seed));
  },

  async run({ page, step, tap, type, show }) {
    const until = new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10);
    await step({ n: 0, what: "Show Home with Needs your attention", hold: 5, do: () => show(page.getByText("Needs your attention").first()) });
    await step({
      n: 1,
      what: "Click the row marked Quote requested",
      hold: 5,
      do: () => tap(page.getByRole("link", { name: /Quote requested/ }).first()),
    });
    await step({ n: 2, what: "Point to the brief and the reply-by date", hold: 5, do: () => show(page.getByText(/Haldi and sangeet/).first()) });
    await step({
      n: 3,
      what: "Type 52,000 in Your price (₹)",
      hold: 6,
      do: () => type(page.getByLabel("Your price (₹)"), "52,000"),
    });
    await step({
      n: 4,
      what: "Type Mandap, stage, 200 chairs, lights in What is included and pick a date in Price holds until",
      hold: 12,
      do: async () => {
        await type(page.getByLabel("What is included"), "Mandap, stage, 200 chairs, lights");
        const d = page.getByLabel("Price holds until");
        await show(d);
        await d.fill(until);
      },
    });
    await step({ n: 5, what: "Click Send quote", hold: 5, do: () => tap(page.getByRole("button", { name: "Send quote" })) });
    await step({ n: "end", what: "Show Quote sent.", hold: 5, do: () => show(page.getByText("Quote sent.").first()) });
  },
};
