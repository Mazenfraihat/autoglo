# Deploying Auto Glo to a Hostinger VPS (Node.js)

This app is a Next.js server (it has an `/api/book` endpoint that emails via
Resend), so it needs Node running behind Nginx. Below is the full path from a
fresh Ubuntu VPS to a live, HTTPS site at `detailingautoglo.com`.

Everything in `<angle brackets>` is something you fill in.

---

## 0. What you need first
- A **Hostinger VPS** (KVM plan) with **Ubuntu 22.04/24.04**. In hPanel: VPS → set OS to Ubuntu, note the **server IP** and root password / SSH key.
- Your **GitHub repo** (private) — created in the "Push to GitHub" step.
- A **Resend API key** — see [Resend setup](#resend-setup) at the bottom.

---

## 1. Connect to the VPS
```bash
ssh root@<SERVER_IP>
```

## 2. Install Node 20, Git, Nginx, PM2
```bash
apt update && apt -y upgrade
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt -y install nodejs git nginx
npm install -g pm2
node -v   # should print v20.x
```

## 3. Get the code
Create a GitHub **Personal Access Token** (github.com → Settings → Developer
settings → Fine-grained tokens → read-only access to this repo), then:
```bash
mkdir -p /var/www && cd /var/www
git clone https://<GITHUB_USERNAME>:<TOKEN>@github.com/<GITHUB_USERNAME>/autoglo.git
cd autoglo
```

## 4. Add secrets + build
```bash
cp .env.local.example .env.local
nano .env.local        # paste your RESEND_API_KEY and BOOKING_FROM, save
npm ci
npm run build
```

## 5. Start with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup            # run the command it prints, so it survives reboots
```
The app is now running on `http://127.0.0.1:3000`. Test it:
```bash
curl -I http://127.0.0.1:3000
```

## 6. Nginx reverse proxy
```bash
nano /etc/nginx/sites-available/autoglo
```
Paste:
```nginx
server {
    listen 80;
    server_name detailingautoglo.com www.detailingautoglo.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable it:
```bash
ln -s /etc/nginx/sites-available/autoglo /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

## 7. Point the domain at the VPS
In Hostinger hPanel → **Domains → DNS / Nameservers** for `detailingautoglo.com`:
- **A** record: `@` → `<SERVER_IP>`
- **A** record: `www` → `<SERVER_IP>`

DNS can take up to a few hours. Check with `ping detailingautoglo.com`.

## 8. Free HTTPS (Let's Encrypt)
Once DNS points at the server:
```bash
apt -y install certbot python3-certbot-nginx
certbot --nginx -d detailingautoglo.com -d www.detailingautoglo.com
```
Certbot auto-renews. Site is now live at **https://detailingautoglo.com**.

---

## Redeploying after code changes
```bash
cd /var/www/autoglo
git pull
npm ci
npm run build
pm2 reload autoglo
```

---

## Resend setup
1. Sign up free at **https://resend.com**.
2. **Add Domain** → `detailingautoglo.com`. Resend shows DNS records (SPF, DKIM,
   DMARC). Add each one in Hostinger hPanel → DNS. Wait for "Verified".
3. **API Keys → Create** → copy the `re_...` key.
4. On the VPS, put it in `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   BOOKING_FROM=Auto Glo Bookings <bookings@detailingautoglo.com>
   ```
5. `pm2 reload autoglo`. Form submissions now email **info@detailingautoglo.com**.

> Before the domain is verified you can test with `BOOKING_FROM=Auto Glo <onboarding@resend.dev>`,
> but Resend's shared sender only delivers to your own Resend account email.
