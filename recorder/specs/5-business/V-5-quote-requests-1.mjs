// V-5-quote-requests-1 · How to add a vendor to your vendor book · guides\5-business\quote-requests.md
import { choose, openPage, planner, vendorBusinessId } from "./_lib.mjs";

export default {
  id: "V-5-quote-requests-1",
  note: "quote-requests",
  role: "planner",
  start: (seed) => planner(seed),
  // Off camera: copy Rangoli Decor's Business ID from the vendor's Settings page.
  async setup({ page, seed }) {
    page.__vendorId = await vendorBusinessId(page, seed);
    await page.goto(planner(seed));
  },

  async run({ page, step, tap, type, show, phone }) {
    const book = page.getByRole("heading", { name: "Your vendor book" });
    await step({ n: 0, what: "Show Quote requests with an empty vendor book", hold: 5 });
    await step({ n: 1, what: "Click Quote requests in the sidebar", hold: 5, do: () => openPage(page, tap, phone, "Quote requests") });
    await step({ n: 2, what: "Point to the card Your vendor book", hold: 5, do: () => show(book) });
    await step({
      n: 3,
      what: "Click Vendor ID and paste Rangoli Decor's ID",
      hold: 8,
      do: () => type(page.getByLabel("Vendor ID", { exact: true }), page.__vendorId),
    });
    await step({ n: 4, what: "Click Add vendor", hold: 5, do: () => tap(page.getByRole("button", { name: "Add vendor" })) });
    await step({
      n: 5,
      what: "Pick 5 stars in Your rating, type a note in Private notes, click Save",
      hold: 14,
      do: async () => {
        const card = page.getByRole("listitem").filter({ hasText: "Rangoli Decor" }).filter({ has: page.getByLabel("Private notes") }).first();
        await choose(show, card.getByLabel("Your rating"), "5 stars");
        await type(card.getByLabel("Private notes"), "Always on time. Good marigold work.");
        await tap(card.getByRole("button", { name: "Save", exact: true }));
      },
    });
    await step({ n: "end", what: "Show Rangoli Decor in the book", hold: 5, do: () => show(page.getByText("Rangoli Decor").first()) });
  },
};
