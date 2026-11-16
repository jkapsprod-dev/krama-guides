// V-2-import-guests-3 · How to import from your phone's contacts · guides\2-guests\import-guests.md
// The phone's own contact picker is an Android screen the robot cannot film. The robot's browser
// answers it with three made-up contacts, so the video shows what Krama does with them.
import { guestsMore, moreItem, navLink } from "./_lib.mjs";

const CONTACTS = [
  { name: ["Kamla Bua"], tel: ["98250 60001"] },
  { name: ["Mohan Fufa"], tel: ["98250 60002"] },
  { name: ["Sunita Mami"], tel: ["98250 60003"] },
];

export default {
  id: "V-2-import-guests-3",
  note: "import-guests",
  role: "host",
  start: (seed) => seed.weddingPath,
  async setup({ page, seed }) {
    await page.addInitScript((contacts) => {
      // @ts-ignore: the contact picker exists on some Android phones only
      window.ContactsManager = window.ContactsManager || function ContactsManager() {};
      Object.defineProperty(navigator, "contacts", { configurable: true, value: { select: async () => contacts } });
    }, CONTACTS);
    await page.goto(seed.weddingPath);
  },

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap More, then Import contacts on Guests", hold: 8,
      do: async () => {
        await tap(navLink(page, "Guests"));
        await tap(guestsMore(page));
        await tap(moreItem(page, "Import contacts"));
      } });
    await step({ n: 2, what: "Tap From your phone's contacts", hold: 7, do: () => tap(page.getByRole("button", { name: /From your phone/ })) });
    await step({ n: 3, what: "Pick three contacts on the phone", hold: 8, do: () => show(page.getByRole("heading", { name: /^Review \d+ guests/ })) });
    await step({ n: 4, what: "Show the review list", hold: 7, do: () => show(page.getByRole("button", { name: /^Import \d+ guests/ })) });
    await step({ n: "end", what: "Show the three contacts ready to import", hold: 4, do: () => show(page.getByRole("heading", { name: /^Review \d+ guests/ })) });
  },
};
