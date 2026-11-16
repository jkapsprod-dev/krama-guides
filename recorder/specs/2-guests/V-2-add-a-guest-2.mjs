// V-2-add-a-guest-2 · How to put guests in one family · guides\2-guests\add-a-guest.md
// Off camera, a guest in a family called "Sharma family, Pune" is added, so the family is in the list.
import { addGuestsOffCamera, guestForm } from "./_lib.mjs";

export default {
  id: "V-2-add-a-guest-2",
  note: "add-a-guest",
  role: "host",
  start: (seed) => `${seed.weddingPath}/guests/new`,
  setup: ({ page, seed }) =>
    addGuestsOffCamera(page, seed, [{ name: "Prakash Sharma", phone: "98250 30001", familyName: "Sharma family, Pune" }], `${seed.weddingPath}/guests/new`),

  async run({ page, step, tap, type, show }) {
    const form = guestForm(page);
    const family = form.getByLabel("Family (for RSVPs)");
    await step({ n: 0, what: "Show the Add a guest form", hold: 4 });
    await step({ n: 1, what: "Type Meera Sharma in Full name", hold: 8, do: () => type(form.getByLabel("Full name", { exact: true }), "Meera Sharma") });
    await step({ n: 2, what: "Tap Family (for RSVPs)", hold: 8, do: () => tap(family) });
    await step({ n: 3, what: "Pick Sharma family, Pune", hold: 8, do: () => family.selectOption({ label: "Sharma family, Pune" }) });
    await step({ n: 4, what: "Tap Save guest", hold: 6, do: () => tap(form.getByRole("button", { name: "Save guest" })) });
    await step({ n: "end", what: "Show the guest inside the family on the list", hold: 4,
      do: () => show(page.getByRole("heading", { name: "Also in this family" })) });
  },
};
