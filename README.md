# Dayplate – Personal Health Tracker

[Open Dayplate on GitHub Pages](https://khandeparkaranmol-beep.github.io/Dayplate/) · [Open the offline journal](./Dayplate.html) · [Download the full source](./Dayplate-source.zip)

A mobile-friendly food, activity and weight journal. The online edition supports Google Identity Services when a web client is configured, with the original ChatGPT account route available during setup. Each account has its own diary. A username lets you invite friends and compete without publishing your private health records.

## Use Dayplate

- **Journal** — log Maharashtrian, Goan and Continental dishes, Indian packaged foods and protein shakes. Pick a portion, see the nutrient totals and repeat a past meal.
- **Foods** — browse 205 built-in items, including 63 packaged products. Inspect each source, portion basis and missing nutrients in the food data audit. Home-cooked recipes use explicit estimates.
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

Unzip Dayplate-source.zip and open its directory. Use Node 22.13 or newer.

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

Register a Google OAuth **Web application** client. Add the origin of the account-backed site to its authorized JavaScript origins. Set the public client ID as the Worker environment variable GOOGLE_CLIENT_ID and apply the google_sessions migration. Google signs the credential, the server verifies its signature and claims, and an HTTP-only session cookie opens the same private diary on other devices after sign-in. The GitHub Pages front door links to this account-backed site.
