// Generates the BEFORE (dull/dusty) and AFTER (glossy) paint panels used by the
// "Auto Glo Difference" comparison slider. Swap for real photos later by
// dropping before-paint.jpg / after-paint.jpg into /public/images.
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const IMG = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const W = 1600;
const H = 1000;

function rng(seed) {
  let a = 0;
  for (let i = 0; i < seed.length; i++) a = (Math.imul(a, 31) + seed.charCodeAt(i)) | 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// AFTER — deep glossy black paint, showroom light, water beads, specular streak.
function after() {
  const r = rng("after");
  let beads = "";
  for (let i = 0; i < 26; i++) {
    const x = 120 + r() * (W - 240);
    const y = 260 + r() * (H - 380);
    const rad = 4 + r() * 12;
    beads += `<g opacity="${(0.4 + r() * 0.45).toFixed(2)}"><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(1)}" fill="url(#bd)"/><circle cx="${(x - rad * 0.3).toFixed(0)}" cy="${(y - rad * 0.35).toFixed(0)}" r="${(rad * 0.28).toFixed(1)}" fill="#fff" opacity="0.9"/></g>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#191b1f"/><stop offset="0.55" stop-color="#0d0e10"/><stop offset="1" stop-color="#060607"/></linearGradient>
    <radialGradient id="lt" cx="0.5" cy="0" r="0.85"><stop offset="0" stop-color="#565b63" stop-opacity="0.95"/><stop offset="0.4" stop-color="#2a2d31" stop-opacity="0.5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <linearGradient id="sk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <radialGradient id="bd" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#e3e8ee" stop-opacity="0.95"/><stop offset="0.7" stop-color="#5b6672" stop-opacity="0.3"/><stop offset="1" stop-color="#000" stop-opacity="0.05"/></radialGradient>
    <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.8"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <ellipse cx="${W / 2}" cy="-60" rx="${W * 0.7}" ry="${H * 0.7}" fill="url(#lt)"/>
  <g transform="rotate(-20 ${W / 2} ${H / 2})"><rect x="-200" y="180" width="${W + 400}" height="150" fill="url(#sk)"/></g>
  ${beads}
  <rect x="0" y="${H * 0.6}" width="${W}" height="${H * 0.4}" fill="url(#fl)"/>
</svg>`;
}

// BEFORE — dull, desaturated, dusty paint with faint swirl marks and haze.
function before() {
  const r = rng("before");
  let dust = "";
  for (let i = 0; i < 220; i++) {
    const x = r() * W;
    const y = r() * H;
    const rad = 0.6 + r() * 2.4;
    const tan = r() > 0.5 ? "#b7a98f" : "#8f8a83";
    dust += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(1)}" fill="${tan}" opacity="${(0.05 + r() * 0.14).toFixed(2)}"/>`;
  }
  let swirls = "";
  for (let i = 0; i < 14; i++) {
    const cx = r() * W;
    const cy = 120 + r() * (H - 240);
    const rad = 30 + r() * 90;
    const a0 = r() * 360;
    const a1 = a0 + 120 + r() * 160;
    const p0 = `${(cx + rad * Math.cos((a0 * Math.PI) / 180)).toFixed(0)},${(cy + rad * Math.sin((a0 * Math.PI) / 180)).toFixed(0)}`;
    const p1 = `${(cx + rad * Math.cos((a1 * Math.PI) / 180)).toFixed(0)},${(cy + rad * Math.sin((a1 * Math.PI) / 180)).toFixed(0)}`;
    swirls += `<path d="M ${p0} A ${rad.toFixed(0)} ${rad.toFixed(0)} 0 0 1 ${p1}" fill="none" stroke="#d8d2c4" stroke-width="1" opacity="0.06"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bbg" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#33302b"/><stop offset="0.6" stop-color="#24221e"/><stop offset="1" stop-color="#1a1815"/></linearGradient>
    <radialGradient id="haze" cx="0.4" cy="0.3" r="0.9"><stop offset="0" stop-color="#5a5348" stop-opacity="0.35"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bbg)"/>
  <rect width="${W}" height="${H}" fill="url(#haze)"/>
  ${swirls}
  ${dust}
  <rect width="${W}" height="${H}" fill="#6b5f4a" opacity="0.06"/>
</svg>`;
}

await mkdir(IMG, { recursive: true });
await writeFile(join(IMG, "after-paint.svg"), after(), "utf8");
await writeFile(join(IMG, "before-paint.svg"), before(), "utf8");
console.log("Generated before-paint.svg + after-paint.svg");
