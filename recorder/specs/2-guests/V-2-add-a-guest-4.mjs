// V-2-add-a-guest-4 · How to handle a possible duplicate · guides\2-guests\add-a-guest.md
// Off camera, Meena Bua is added with phone 98765 43210, and the form is filled in for Suresh Fufa.
import { addGuestsOffCamera, guestForm } from "./_lib.mjs";

export default {
  id: "V-2-add-a-guest-4",
  note: "add-a-guest",
  role: "host",
  start: (seed) => `${seed.weddingPath}/guests/new`,
  async setup({ page, seed }) {
    await addGuestsOffCamera(page, seed, [{ name: "Meena Bua", phone: "98765 43210" }], `${seed.weddingPath}/guests/new`);
    const form = guestForm(page);
    await form.getByLabel("Full name", { exact: true }).fill("Suresh Fufa");
    await form.getByLabel("Phone", { exact: true }).fill("98765 43210");
  },

  async run({ page, step, tap, show }) {
    const form = guestForm(page);
    await step({ n: 0, what: "Show the Add a guest form filled in for Suresh Fufa", hold: 4 });
    await step({ n: 1, what: "Tap Save guest", hold: 6, do: () => tap(form.getByRole("button", { name: "Save guest" })) });
    await step({ n: 2, what: "Show the box This might be a duplicate", hold: 8, do: () => show(page.getByText("This might be a duplicate")) });
    await step({ n: 3, what: "Point at View Meena Bua", hold: 8, do: () => show(page.getByRole("link", { name: "View Meena Bua" })) });
    await step({ n: 4, what: "Tap Add anyway", hold: 8, do: () => tap(page.getByRole("button", { name: "Add anyway" })) });
    await step({ n: "end", what: "Show the guest saved", hold: 4, do: () => show(page.getByRole("heading", { name: "Suresh Fufa" })) });
  },
};
