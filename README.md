# Dayplate – Personal Health Tracker

[Open Dayplate on GitHub Pages](https://khandeparkaranmol-beep.github.io/Dayplate/)

A mobile-friendly food, activity and weight journal. Choose Sign in with Google to sync across devices or Use offline to keep a diary in this browser. Both experiences open on GitHub Pages. Each account has its own diary. A username lets you invite friends and compete without publishing your private health records.

## Use Dayplate

- **Journal** — log Maharashtrian, Goan and Continental dishes, Indian packaged foods and protein shakes. Pick a portion, see the nutrient totals and repeat a past meal.
- **Foods** — browse 224 built-in items, including 63 packaged products and 19 Mumbai and Goan café foods. Inspect each source, portion basis and missing nutrients in the food data audit. Home-cooked recipes use explicit estimates.
- **Movement** — add a workout or import Apple's Health export. On iPhone, go to Health → profile → Export All Health Data and save the file. In Dayplate choose Movement → Import Apple Health. Pick dates and sources, preview the result, and save.
- **Progress** — review calorie targets, estimated resting energy needs, weight, measurements and activity over time.
- **Friends** — claim a username, send a request, then invite an accepted friend to a 3-, 7- or 14-day challenge for steps, workout days, workout minutes or completed food-journal days. Both people see the metric and duration before accepting. The scoreboard shows only totals. You can also write an update, share a selected meal or workout, and cheer a friend.

### Apple Health and Fitness

The browser processes export.zip or export.xml on-device. It saves only the selected daily activity summaries and workouts after confirmation. Reimport to refresh. Use one source per metric to avoid summing overlapping phone and watch records. For active energy, the exported Apple Fitness Move summary takes precedence. When both active and resting calories are present the site also shows their sum. Missing data is displayed as a dash.

A web browser cannot request native HealthKit access or read the Apple Watch in the background. Imported steps can differ from Apple's merged data. Source-level totals use the start date written into each sample. Imported workouts keep stable identifiers across repeat imports. A later export does not remove diary records omitted from it.

### Account privacy

Private journal records use the signed-in account identifier on every read and write. New accounts have no public username until they choose one. Friend requests and challenges require acceptance. Diary entries, body weight, and calorie targets do not appear in a friend feed. Posting to friends is a separate explicit action. To move a diary from the offline edition, export it there, then choose Your account → Import a Dayplate backup online.

## Source and development

The full site uses React, TypeScript, Vinext, a Cloudflare Worker and D1. Apple export parsing uses the MIT-licensed fflate and the SAX parser with its license in vendor/xml. The source tree includes a separate offline entry point that runs entirely in-browser. Social features require the signed-in server.

Use Node 22.13 or newer.

```sh
npm ci
npm run build
node scripts/check-diary.mjs
node scripts/check-social.mjs
node scripts/check-signin.mjs
node portable/build.mjs outputs/Dayplate.html
```

For local development run `npm run dev`. Apply SQL migrations from `drizzle/` in filename order to the local D1 database. To run the built worker, use `npm start`. The hosted deployment uses the Sites sign-in gateway to authenticate requests and assign account IDs. Do not expose an independent Worker that trusts client-supplied identity headers. When adapting to another host, verify sessions server-side before supplying the owner ID.

## Configure Google sign-in

Register a Google OAuth Web application with the JavaScript origin `https://khandeparkaranmol-beep.github.io`. Set GOOGLE_CLIENT_ID in the Worker environment and apply the database migrations. GitHub Pages renders the Google button and diary. The API verifies the signed Google identity and exchanges a single-use challenge for a revocable session held in the browser tab. The offline diary is separate and stays in IndexedDB.

Build the Pages files from the project root with `node portable/build.mjs index.html pages` and `node portable/build.mjs Dayplate.html`. Copy `portable/sw.js` alongside both files for offline reopening.
