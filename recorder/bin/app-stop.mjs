// npm run app:stop: stop the app. Add `-- --db` to also stop the local database (data is kept).
import { stopApp } from "../lib/app.mjs";

await stopApp({ db: process.argv.includes("--db") });
