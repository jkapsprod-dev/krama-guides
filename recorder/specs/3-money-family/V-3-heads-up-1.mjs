// V-3-heads-up-1 · How to get weather alerts for an open-air function · guides\3-money-family\heads-up.md
import { pick, script } from "./_lib.mjs";

export default {
  id: "V-3-heads-up-1",
  note: "heads-up",
  role: "host",
  start: (seed) => `${seed.weddingPath}/events`,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-heads-up-1", phone);
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Functions" })) });
    await step({ ...r(1), do: () => tap(page.getByRole("link", { name: "Open Mehendi" })) });
    await step({ ...r(2), do: () => tap(page.getByRole("link", { name: "Edit details" })) });
    await step({ ...r(3), do: () => tap(page.getByLabel("Open-air function")) });
    await step({ ...r(4), do: () => pick({ tap }, page.getByLabel("City for the forecast"), "Ahmedabad") });
    await step({
      ...r(5),
      do: async () => {
        await tap(page.getByRole("button", { name: "Save", exact: true }));
        await page.waitForURL((u) => !/\/edit$/.test(u.pathname), { timeout: 60_000 }); // the save can be slow
      },
    });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { name: "Mehendi" }).first()) });
  },
};
