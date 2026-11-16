// V-2-automations-and-to-send-1 · How to switch on an automation · guides\2-guests\automations-and-to-send.md
import { navLink } from "./_lib.mjs";

export default {
  id: "V-2-automations-and-to-send-1",
  note: "automations-and-to-send",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const rule = page.getByRole("heading", { name: "Reply-by date passed" });
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Tap More", hold: 4, do: () => (phone ? tap(navLink(page, "More")) : show(page.getByRole("link", { name: "Settings", exact: true }).first())) });
    await step({ n: 2, what: "Tap Settings", hold: 5,
      do: () => tap(phone ? page.getByRole("main").getByRole("link", { name: /^Settings/ }) : page.getByRole("link", { name: "Settings", exact: true }).first()) });
    await step({ n: 3, what: "Tap Automations", hold: 4, do: () => tap(page.getByRole("link", { name: "Automations", exact: true })) });
    await step({ n: 4, what: "Scroll to Reply-by date passed", hold: 5, do: () => show(rule) });
    await step({ n: 5, what: "Tap Switch on", hold: 5, do: () => tap(page.getByRole("button", { name: "Switch on" }).first()) });
    await step({ n: "end", what: "Show the On tag on the rule", hold: 5, do: () => show(rule) });
  },
};
