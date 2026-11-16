// V-2-guest-rsvp-page-3 · How to fix your details, then read the page in your language · guides\2-guests\guest-rsvp-page.md
// Guest side: the demo guest link. Off camera, Nisha's name is saved with a spelling mistake.
export default {
  id: "V-2-guest-rsvp-page-3",
  note: "guest-rsvp-page",
  start: (seed) => `${seed.guestLinkPath}?tab=details`,
  async setup({ page, seed }) {
    const name = page.getByRole("group", { name: "Nisha Mehta" }).getByRole("textbox", { name: "Name" });
    await name.fill("Nisha Mehtaa");
    await page.getByRole("button", { name: "Save my details" }).click();
    await page.getByRole("group", { name: "Nisha Mehtaa" }).waitFor({ timeout: 30_000 });
    await page.goto(seed.guestLinkPath);
  },

  async run({ page, step, tap, show }) {
    const tabs = page.getByRole("navigation", { name: "Wedding pages" });
    const language = page.getByRole("combobox", { name: "Language" });
    await step({ n: 0, what: "Show the RSVP page", hold: 4 });
    await step({ n: 1, what: "Show the page", hold: 3, do: () => show(tabs) });
    await step({ n: 2, what: "Tap My details", hold: 3, do: () => tap(tabs.getByRole("link", { name: "My details" })) });
    await step({ n: 3, what: "Correct the Name field", hold: 3,
      do: async () => {
        const name = page.getByRole("group", { name: "Nisha Mehtaa" }).getByRole("textbox", { name: "Name" });
        await tap(name);
        await page.keyboard.press("Control+A");
        await page.keyboard.type("Nisha Mehta", { delay: 85 });
      } });
    await step({ n: 4, what: "Tap Save my details", hold: 4, do: () => tap(page.getByRole("button", { name: "Save my details" })) });
    await step({ n: 5, what: "Show the saved message", hold: 4, do: () => show(page.getByRole("status").first()) });
    await step({ n: 6, what: "Scroll to the bottom of the page", hold: 3, do: () => show(language) });
    await step({ n: 7, what: "Tap Language", hold: 3, do: () => tap(language) });
    await step({ n: 8, what: "Pick Gujarati", hold: 3, do: () => language.selectOption({ label: "ગુજરાતી · BETA" }) });
    await step({ n: "end", what: "Show the page in Gujarati", hold: 4, do: () => show(page.getByRole("main")) });
  },
};
