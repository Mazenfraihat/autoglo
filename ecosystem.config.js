// PM2 process config for running the built Next.js app on a Hostinger VPS.
// Usage on the server (after `npm run build`):
//   pm2 start ecosystem.config.js
//   pm2 save && pm2 startup   (so it restarts on reboot)
//
// Secrets (RESEND_API_KEY, BOOKING_FROM) are NOT here — put them in a
// `.env.local` file on the server (Next.js loads it automatically). That file
// is git-ignored so it never ends up in the repo.
module.exports = {
  apps: [
    {
      name: "autoglo",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
