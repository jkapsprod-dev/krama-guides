// npm run app:start: set up and start the app in recording mode (background, pid file).
import { ensureApp } from "../lib/app.mjs";

try {
  await ensureApp();
} catch (e) {
  console.error(`[app] ${e.message}`);
  process.exit(1);
}
