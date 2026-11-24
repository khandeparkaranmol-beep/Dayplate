# Dayplate – Personal Health Tracker

[Open Dayplate on GitHub Pages](https://khandeparkaranmol-beep.github.io/Dayplate/)

A mobile-friendly food, activity and weight journal. Choose Sign in with Google to sync across devices or Use offline to keep a diary in this browser. Both experiences open on GitHub Pages. Each account has its own diary. A username lets you invite friends and compete without publishing your private health records.

## Use Dayplate

- **Journal** — log Maharashtrian, Goan and Continental dishes, Indian packaged foods and protein shakes. Pick a portion, see the nutrient totals and repeat a past meal. Each logged meal shows protein and total sugar by default. Choose **Customize columns** under **On your plate** to select nutrients such as carbs, fat, fiber and sodium. Set the columns per row or let them fit your screen. Tap any meal for its per-food breakdown. Open a row under **Macronutrient breakdown** to see the meals that contributed to the daily total. Partial totals show how many foods supplied a value.
- **Foods** — browse 1,309 built-in items, including 63 packaged products and 20 Mumbai and Goan café dishes with recipe estimates for total and added sugars. Six of these dishes also have a Qmin Panaji menu entry for published calories. The Indian breakfast, lunch and snack filters include 120 additional regional recipes. Search by common names such as tomato omelette, besan chilla, rajma chawal or ragda pattice. Inspect each source, portion basis and missing nutrients in the food data audit. Home-cooked recipes use explicit estimates.
- **Indian fast food** — choose a restaurant or search for an order. The 958 menu entries cover McDonald’s (207 West & South, 89 North & East), KFC (196), Burger King (99), Pizza Hut (297), Domino’s (53) and Wow! Momo (17). Entries distinguish sizes, crusts and the portion you can log. Restaurant availability varies. Each record links to its Indian menu source. Undeclared nutrients stay unknown, and conflicting menu rows are held out.
- **Movement** — log a workout to see active calories above rest. Estimates use your workout duration, a matching activity from the 2024 Adult Compendium and body weight. Apple Health workout energy takes priority when available. Tap a session to review its estimate or supply missing details. You can also import Apple's Health export. On iPhone, go to Health → profile → Export All Health Data and save the file. In Dayplate choose Movement → Import Apple Health. Pick dates and sources, preview the result, and save.
- **Progress** — review calorie targets, estimated resting energy needs, weight, measurements and activity over time.
- **Friends** — claim a username, send a request, then invite an accepted friend to a 3-, 7- or 14-day challenge for steps, workout days, workout minutes or completed food-journal days. Both people see the metric and duration before accepting. The scoreboard shows only totals. You can also write an update, share a selected meal or workout, and cheer a friend.

### At the café counter

Baron Crumb and Tara Tiffin react to food selections, finished diary days, workouts and self-reported routine changes. Ask the other character for a reply or choose Quiet mode to hide the commentary on this device. Higgsfield generated the original café illustration. Reactions run locally, including in the offline diary.

### Plan, log and review

1. Open **Foods → My kitchen → New recipe**. Enter ingredients for the full batch, then set the yield, such as four katoris. Save a single ingredient with a yield of one to define a personal ladle, cup or dabba. A portion carries a nutrient estimate only when all ingredients supply that nutrient.
2. In the Journal, choose **Plan my next meal**. Adjust quantities to preview the plate and its effect on your logged day. Choose **Compare another plate** to hold one option beside the current edit. Switch between the plates before saving or logging the one you want. **Save for later** keeps a private draft. **Ate this** logs the portions together. Editing a recipe later preserves the recipe captured in previous meals.
3. Open **Progress → Your weekly review**. Inspect completed days, compare logged breakfasts, review weight and waist measurements, and see your chosen nutrients. Use the date selector to revisit a week. **Food variety this week** lets you record the groups present in mixed meals.
4. In **Progress → Breakfast experiment**, choose two usual breakfasts. After having one, rate afternoon hunger from 1 to 5. Both breakfasts show their rating counts and averages. You can edit a rating on its diary date.
5. In **Movement → Log workout**, select boxing and enable **Record boxing rounds** to save rounds, length, rest and perceived effort alongside the workout's active calories.

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
