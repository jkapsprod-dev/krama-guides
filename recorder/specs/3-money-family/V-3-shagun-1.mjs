// V-3-shagun-1 · How to note an envelope or a gift · guides\3-money-family\shagun.md
import { openSection, pick, script } from "./_lib.mjs";

export default {
  id: "V-3-shagun-1",
  note: "shagun",
  role: "host", // lane 3, the couple (Appendix E)
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-shagun-1", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openSection(ctx, "Shagun") });
    await step({ ...r(2), do: () => tap(page.getByRole("link", { name: "Add an entry", exact: true })) });
    await step({
      ...r(3),
      do: async () => {
        await pick({ tap }, page.getByLabel("What happened"), "We received");
        await pick({ tap }, page.getByLabel("Type", { exact: true }), "Cash or envelope");
      },
    });
    await step({ ...r(4), do: () => pick({ tap }, page.getByLabel("Family on the guest list"), "Mehta family") });
    await step({ ...r(5), do: () => type(page.getByLabel("Amount (₹)"), "5,100") });
    await step({ ...r(6), do: () => pick({ tap }, page.getByLabel("Function", { exact: true }), "Haldi") });
    await step({ ...r(7), do: () => tap(page.getByRole("button", { name: "Save entry" })) });
    await step({ ...r("end"), do: () => show(page.getByText(/From Mehta family/).first()) });
  },
};
