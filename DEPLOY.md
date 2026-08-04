# Deploying Auto Glo (Hostinger managed Git deployment)

The live site **detailingautoglo.com** runs on **Hostinger managed hosting** with
Hostinger's **Git deployment** feature — LiteSpeed + **Phusion Passenger** run the
Next.js server. This is NOT the VPS/PM2 setup an earlier version of this doc
described (`ecosystem.config.js` is legacy and unused).

Deploys happen by **pushing to `main`** on the GitHub repo
`Mazenfraihat/autoglo`. Hostinger pulls the commit and builds it.

---

## How a deploy flows

1. You `git push origin main`.
2. Hostinger's Git deployment builds the commit into:
   ```
   ~/domains/detailingautoglo.com/hbuilds/current/nodejs
   ```
   `hbuilds/current` is a symlink Hostinger repoints to the newest build on every deploy.
3. The **running app loads from**:
   ```
   ~/domains/detailingautoglo.com/nodejs
   ```
   which we have made a **symlink → `hbuilds/current/nodejs`** (see fix below).
   Because of that symlink, a new build is instantly the runtime folder.
4. Passenger restarts and serves the new build.

Verify a build is live with the built-in build marker (see
`scripts/gen-build-info.mjs`) — every page carries the commit SHA:
```bash
curl -s https://detailingautoglo.com | grep -o 'data-build-sha="[^"]*"'
```
The printed SHA should match the commit you just pushed.

---

## ⚠️ Root cause of the "deploys complete but nothing changes" bug (2026-08-04)

For weeks every deploy reported **Completed** while the site kept serving a build
frozen at **Jul 15**. Confirmed via SSH:

- Hostinger built each commit correctly into `hbuilds/current/nodejs`.
- But the running app loaded from a **separate, real folder** `~/domains/detailingautoglo.com/nodejs`
  that was **frozen at Jul 15** — Hostinger's pipeline never synced `hbuilds/current`
  into the runtime folder.
- So the **origin itself was old.** All the cache theories (LiteSpeed `s-maxage`,
  CDN, browser cache) were **red herrings** — purging them did nothing because the
  server was genuinely serving old HTML.

### The fix (applied via SSH — permanent)
```bash
cd ~/domains/detailingautoglo.com
mv nodejs nodejs-backup-jul15                 # keep the old folder as a backup
ln -s hbuilds/current/nodejs nodejs           # runtime now points at the latest build
touch nodejs/tmp/restart.txt                  # tell Passenger to restart
```
The site went live with the new build immediately. Since `nodejs` is now a symlink
to `hbuilds/current`, **future deploys apply automatically.**

---

## Troubleshooting: deploys complete but the live site doesn't change

1. **Confirm which build is actually served:**
   ```bash
   curl -s https://detailingautoglo.com | grep -o 'data-build-sha="[^"]*"'
   ```
   If the SHA is old, the origin is stale — continue below (it is almost never cache).

2. **SSH in and check the runtime symlink is intact:**
   ```bash
   cd ~/domains/detailingautoglo.com
   ls -la nodejs
   ```
   It **must** be `nodejs -> hbuilds/current/nodejs`. If Hostinger's system ever
   replaced it with a real folder again, recreate it:
   ```bash
   mv nodejs nodejs-stale-$(date +%F)
   ln -s hbuilds/current/nodejs nodejs
   touch nodejs/tmp/restart.txt
   ```

3. **Force a Passenger restart** (no rebuild): `touch nodejs/tmp/restart.txt`, wait ~60s,
   test in an **incognito** window.

4. **Full rebuild + restart from the dashboard:**
   hPanel → Website Dashboard → Deployments → **Settings and Redeploy** → Save and Redeploy.

5. **Read the logs:** hPanel → Website Dashboard → **Runtime Logs** — shows why a
   process failed to restart onto the new build.

6. **Check framework detection:** builds should land under `.../nodejs`, not
   `public_html/hbuilds` as a static site. If misdetected, redeploy with framework = **Next.js**.

> LiteSpeed cache is generally **not** the culprit here. Purging it is harmless
> but wasn't what fixed anything — the runtime symlink was.

---

## Resend setup (booking emails)

The `/api/book` route emails via [Resend](https://resend.com). Secrets live in a
`.env.local` on the server (git-ignored), loaded automatically by Next.js:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
BOOKING_FROM=Auto Glo Bookings <bookings@detailingautoglo.com>
```
1. Resend → **Add Domain** → `detailingautoglo.com`, add the SPF/DKIM/DMARC DNS
   records in hPanel → DNS, wait for **Verified**.
2. Resend → **API Keys → Create**, copy the `re_...` key into `.env.local`.
3. Redeploy / restart so the new env is picked up. Submissions email **info@detailingautoglo.com**.

> Before the domain is verified, test with `BOOKING_FROM=Auto Glo <onboarding@resend.dev>`
> (delivers only to your own Resend account email).

---

## Build marker (kept intentionally)

`scripts/gen-build-info.mjs` runs on the `prebuild`/`predev` npm hooks and writes a
git-ignored `lib/build-info.ts` with the commit SHA + build timestamp. The root
layout exposes it as `data-build-sha` / `data-build-time` on `<html>` and
`x-build-*` `<meta>` tags. **Kept permanently** — it's the fastest way to confirm
which build is actually live (exactly what diagnosed the symlink bug), with
negligible cost.
