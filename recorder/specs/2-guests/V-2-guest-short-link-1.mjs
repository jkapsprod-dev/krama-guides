// V-2-guest-short-link-1 · How to see the wedding on the short link · guides\2-guests\guest-short-link.md
// Guest side, no sign-in. Off camera, the host sets a wedding code and ticks what the short link shows.
import { hostContext } from "./_lib.mjs";


export default {
  id: "V-2-guest-short-link-1",
  note: "guest-short-link",
  start: (seed) => seed.guestLinkPath, // replaced by the short link in setup
  async setup({ page, seed }) {
    // A code is used once across the whole app, so each take uses a fresh one.
    const CODE = `SHARMA-L2-${Date.now().toString(36).toUpperCase().slice(-5)}`;
    const ctx = await hostContext(page);
    try {
      const host = await ctx.newPage();
      await host.goto(`${seed.weddingPath}/settings/codes`);
      await host.getByRole("textbox", { name: "Choose a code" }).fill(CODE);
      await host.getByRole("button", { name: "Save code" }).click();
      await host.getByText(`Saved: ${CODE}`).waitFor({ timeout: 30_000 });
      await host.getByLabel("Names to show").fill("Riya & Arjun");
      await host.getByLabel("The names above").check();
      await host.getByLabel("Month and city").check();
      await host.getByLabel("Function names and dates").check();
      await host.getByRole("button", { name: "Save", exact: true }).last().click();
      await host.getByText("Saved.").waitFor({ timeout: 30_000 });
    } finally {
      await ctx.close();
    }
    await page.goto(`/${CODE}`);
  },

  async run({ page, step, show }) {
    await step({ n: 0, what: "Show the short link page", hold: 4 });
    await step({ n: 1, what: "Show the short link", hold: 6, do: () => show(page.getByRole("heading").first()) });
    await step({ n: 2, what: "Show the names, month and city", hold: 6, do: () => show(page.getByRole("heading").first()) });
    await step({ n: 3, what: "Scroll to Functions", hold: 7, do: () => show(page.getByText("Functions", { exact: true }).first()) });
    await step({ n: "end", what: "Show the full page", hold: 7, do: () => show(page.getByRole("main")) });
  },
};
