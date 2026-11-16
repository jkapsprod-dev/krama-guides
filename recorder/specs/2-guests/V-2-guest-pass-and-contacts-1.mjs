// V-2-guest-pass-and-contacts-1 · How to show your family pass at the door, then find who to call on the day · guides\2-guests\guest-pass-and-contacts.md
// Guest side: the demo guest link. Off camera, the family says Going to Haldi (so Pass shows) and the host
// switches on one contact for guests (so Contacts shows).
import { hostContext, keepOneFunctionOffCamera } from "./_lib.mjs";

export default {
  id: "V-2-guest-pass-and-contacts-1",
  note: "guest-pass-and-contacts",
  start: (seed) => seed.guestLinkPath,
  async setup({ page, seed }) {
    // The family is asked about Haldi only, and says Going to it.
    await keepOneFunctionOffCamera(page, seed, "Haldi");
    await page.getByRole("radiogroup", { name: "Haldi" }).getByText("Going", { exact: true }).click();
    await page.getByRole("button", { name: "Send our reply" }).click();
    await page.getByText(/on the list/i).first().waitFor({ timeout: 30_000 });
    // The host shows the Rangoli Decor contact to guests.
    const ctx = await hostContext(page);
    try {
      const host = await ctx.newPage();
      await host.goto(`${seed.weddingPath}/money/vendors`);
      await host.getByRole("link", { name: /Rangoli Decor/ }).first().click();
      await host.getByRole("link", { name: "Edit", exact: true }).click();
      await host.getByLabel("Show to guests on their wedding page").check();
      await host.getByLabel("What guests see (e.g. Airport pickup)").fill("Decor desk");
      await host.getByRole("button", { name: "Save vendor" }).click();
      await host.waitForLoadState("networkidle");
    } finally {
      await ctx.close();
    }
    await page.goto(seed.guestLinkPath);
  },

  async run({ page, step, tap, show }) {
    const tabs = page.getByRole("navigation", { name: "Wedding pages" });
    await step({ n: 0, what: "Show the RSVP page", hold: 4 });
    await step({ n: 1, what: "Show the page", hold: 3, do: () => show(tabs) });
    await step({ n: 2, what: "Tap Pass", hold: 3, do: () => tap(tabs.getByRole("link", { name: "Pass" })) });
    await step({ n: 3, what: "Show the code", hold: 3, do: () => show(page.getByRole("img").first()) });
    await step({ n: 4, what: "Show the pass with the family name", hold: 5, do: () => show(page.getByRole("heading").first()) });
    await step({ n: 5, what: "Show the tabs again", hold: 3, do: () => show(tabs) });
    await step({ n: 6, what: "Tap Contacts", hold: 3, do: () => tap(tabs.getByRole("link", { name: "Contacts" })) });
    await step({ n: 7, what: "Point at the phone number", hold: 4, do: () => show(page.getByRole("link", { name: /^\+?[\d ]{8,}|Call/ }).first()) });
    await step({ n: "end", what: "Show the contact", hold: 4, do: () => show(page.getByRole("main")) });
  },
};
