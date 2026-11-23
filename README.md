# Dayplate – Personal Health Tracker

[Open Dayplate](https://dayplate-anmol.anmolskhandeparkar24.chatgpt.site)

Dayplate is a mobile-friendly personal food, activity and weight journal. Sign in with ChatGPT to use the same diary on your phone and computer.

- Log Maharashtrian, Goan and Continental dishes, Indian snacks, and protein shakes. The built-in catalogue includes 205 foods, with serving sizes and links to their nutrition sources.
- See calories and protein for a portion before adding it. Track weight, measurements and a personal calorie target over time.
- Import your Apple Health export under **Movement → Import Apple Health**. Preview steps, active calories, resting calories and workouts before saving them. Raw files are processed on your device. Reimport to update your totals.
- Open **Friends**, choose a username, and add a friend. Invite them to a 3-, 7- or 14-day contest for steps, workout minutes, workout days or completed journal days. Both participants see challenge totals after acceptance. Share individual updates and cheer each other on.

Your diary is private. Friendships do not give anyone access to your weight, food history, or calorie target.

## Run the source

[Download the complete website source](./Dayplate-source.zip). It contains the React and TypeScript frontend, Worker routes, D1 database migrations, nutrition catalogue, offline build, and account and activity tests. Unzip it, then use Node 22.13 or newer:

```sh
npm ci
npm run build
node scripts/check-diary.mjs
node scripts/check-social.mjs
```

The hosted site uses the Sites sign-in gateway. An independent deployment must authenticate sessions server-side. See the included README for local setup.
