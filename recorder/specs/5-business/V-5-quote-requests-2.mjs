// V-5-quote-requests-2 · How to ask vendors for quotes · guides\5-business\quote-requests.md
import { addVendorToBookOffCamera, choose, chooseLike, planner } from "./_lib.mjs";

export default {
  id: "V-5-quote-requests-2",
  note: "quote-requests",
  role: "planner",
  start: (seed) => planner(seed, "/quotes"),
  // Off camera: Rangoli Decor is in the vendor book (end of V-5-quote-requests-1).
  async setup({ page, seed }) {
    await addVendorToBookOffCamera(page, seed);
    await page.goto(planner(seed, "/quotes"));
  },

  async run({ page, step, tap, type, show }) {
    const form = page.getByRole("dialog").or(page.locator("form").filter({ has: page.getByRole("button", { name: "Send request" }) })).first();
    const reply = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
    await step({ n: 0, what: "Show Quote requests with no requests", hold: 5 });
    await step({ n: 1, what: "Click New quote request", hold: 5, do: () => tap(page.getByRole("button", { name: "New quote request" })) });
    await step({
      n: 2,
      what: "Pick the Sharma-Patel wedding in Wedding, type Mandap and stage decor in What do you need?, choose Décor in Category",
      hold: 14,
      do: async () => {
        await chooseLike(show, form.getByLabel("Wedding", { exact: true }), "Sharma");
        await type(form.getByLabel("What do you need?"), "Mandap and stage decor");
        await chooseLike(show, form.getByLabel("Category", { exact: true }), "cor");
      },
    });
    await step({
      n: 3,
      what: "Type a short note in Brief",
      hold: 7,
      do: () => type(form.getByLabel("Brief", { exact: true }), "Haldi and sangeet. 200 guests. Setup by 7 am."),
    });
    await step({
      n: 4,
      what: "Pick a date in Reply by",
      hold: 5,
      do: async () => {
        const d = form.getByLabel("Reply by");
        await show(d);
        await d.fill(reply);
      },
    });
    await step({ n: 5, what: "Tick Rangoli Decor under Ask these vendors", hold: 5, do: () => tap(form.getByRole("checkbox", { name: /Rangoli Decor/ })) });
    await step({ n: 6, what: "Click Send request", hold: 5, do: () => tap(form.getByRole("button", { name: "Send request" })) });
    await step({ n: "end", what: "Show the request marked Collecting quotes", hold: 5, do: () => show(page.getByText("Collecting quotes").first()) });
  },
};
