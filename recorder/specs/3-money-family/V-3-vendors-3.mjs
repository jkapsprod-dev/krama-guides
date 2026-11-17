// V-3-vendors-3 · How to show a vendor to guests as a contact · guides\3-money-family\vendors.md
import { script } from "./_lib.mjs";
import { addVendor } from "./_setup.mjs";

export default {
  id: "V-3-vendors-3",
  note: "vendors",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money/vendors`,

  // Off camera: a made-up pickup person to show to guests.
  async setup({ page, seed }) {
    await addVendor(page, seed, { name: "Raju Travels", type: "Transport", phone: "98765 11122" });
    await page.goto(`${seed.weddingPath}/money/vendors`);
  },

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-vendors-3", phone);
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Vendors" })) });
    await step({ ...r(1), do: () => tap(page.getByRole("link", { name: /^Raju Travels/ }).first()) });
    await step({ ...r(2), do: () => tap(page.getByRole("link", { name: "Edit", exact: true })) });
    await step({ ...r(3), do: () => tap(page.getByLabel("Show to guests on their wedding page")) });
    await step({ ...r(4), do: () => type(page.getByLabel("What guests see (e.g. Airport pickup)"), "Airport pickup") });
    await step({
      ...r(5),
      do: async () => {
        await tap(page.getByRole("button", { name: "Save vendor" }));
        await page.waitForURL((u) => !/\/edit$/.test(u.pathname), { timeout: 60_000 }); // the save can be slow
      },
    });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { name: "Raju Travels" })) });
  },
};
