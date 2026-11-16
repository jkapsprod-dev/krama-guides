// V-2-pickups-5 · How to see your pickups · guides\2-guests\pickups.md
// Driver side, no sign-in. Off camera, the host makes a run with a driver and a link for them,
// and the driver's page is opened.
import { addRunOffCamera, addVendorOffCamera, hostContext } from "./_lib.mjs";

const SOON = new Date(Date.now() + 3 * 86400000).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
const RUN = { place: "Ahmedabad Airport", date: SOON, time: "06:30", vehicle: "White Innova", seats: 6, driver: "Raju Travels", meet: "Gate 4" };

export default {
  id: "V-2-pickups-5",
  note: "pickups",
  start: (seed) => seed.guestLinkPath, // replaced by the driver's page in setup
  async setup({ page, seed }) {
    const ctx = await hostContext(page);
    try {
      const host = await ctx.newPage();
      await addVendorOffCamera(host, seed, { name: "Raju Travels" });
      await addRunOffCamera(host, seed, RUN, `${seed.weddingPath}/stays/pickups`);
      const drivers = host.getByRole("region", { name: "Drivers’ links" });
      await drivers.getByRole("button", { name: "Make a link" }).click();
      const wa = drivers.getByRole("link", { name: "Send on WhatsApp" });
      await wa.waitFor({ timeout: 30_000 });
      const href = decodeURIComponent(await wa.getAttribute("href"));
      const link = href.match(/https?:\/\/[^\s]+\/pickup\/[\w-]+/)?.[0];
      if (!link) throw new Error("The driver's link is not in the WhatsApp message.");
      await page.goto(link);
    } finally {
      await ctx.close();
    }
  },

  async run({ page, step, show }) {
    await step({ n: 0, what: "Show the driver's page", hold: 5 });
    await step({ n: 1, what: "Show Your pickups", hold: 6, do: () => show(page.getByRole("heading", { name: "Your pickups" })) });
    await step({ n: 2, what: "Point to the day and the run time", hold: 6, do: () => show(page.getByRole("heading", { level: 2 }).first()) });
    await step({ n: 3, what: "Point to the place and Meet at", hold: 6, do: () => show(page.getByText("Ahmedabad Airport").first()) });
    await step({ n: 4, what: "Point to the guest names and flight", hold: 7, do: () => show(page.getByRole("main")) });
    await step({ n: "end", what: "Show the full page", hold: 5 });
  },
};
