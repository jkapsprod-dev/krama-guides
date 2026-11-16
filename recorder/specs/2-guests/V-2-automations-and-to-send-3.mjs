// V-2-automations-and-to-send-3 · How to pause all of them · guides\2-guests\automations-and-to-send.md
import { navLink } from "./_lib.mjs";

export default {
  id: "V-2-automations-and-to-send-3",
  note: "automations-and-to-send",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    await step({ n: 0, what: "Show Home", hold: 6 });
    await step({ n: 1, what: "Tap More", hold: 4, do: () => (phone ? tap(navLink(page, "More")) : show(page.getByRole("link", { name: "Settings", exact: true }).first())) });
    await step({ n: 2, what: "Tap Settings", hold: 5,
      do: () => tap(phone ? page.getByRole("main").getByRole("link", { name: /^Settings/ }) : page.getByRole("link", { name: "Settings", exact: true }).first()) });
    await step({ n: 3, what: "Tap Automations", hold: 4, do: () => tap(page.getByRole("link", { name: "Automations", exact: true })) });
    await step({ n: 4, what: "Tap Stop all automations", hold: 6, do: () => tap(page.getByRole("button", { name: "Stop all automations" })) });
    await step({ n: "end", what: "Show the tag Stopped and the Resume automations button", hold: 6,
      do: () => show(page.getByRole("button", { name: "Resume automations" })) });
  },
};
