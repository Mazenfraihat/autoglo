// Generates dark "showroom light on black paint" SVG placeholders into /public.
// These are intentional stand-ins — drop real .jpg photos over the same names
// in /public/images and update the paths in lib/data.ts to swap them in.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUB = join(ROOT, "public");
const IMG = join(PUB, "images");

function rng(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function beads(seed, w, h, count) {
  const r = rng(seed);
  let out = "";
  const cx = w * (0.5 + (r() - 0.5) * 0.3);
  const cy = h * (0.55 + (r() - 0.5) * 0.2);
  for (let i = 0; i < count; i++) {
    const ang = r() * Math.PI * 2;
    const dist = r() * Math.min(w, h) * 0.42;
    const x = cx + Math.cos(ang) * dist;
    const y = cy + Math.sin(ang) * dist * 0.7;
    const rad = 3 + r() * 8;
    out += `
      <g opacity="${(0.45 + r() * 0.4).toFixed(2)}">
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}" fill="url(#bead)"/>
        <circle cx="${(x - rad * 0.3).toFixed(1)}" cy="${(y - rad * 0.35).toFixed(1)}" r="${(rad * 0.28).toFixed(1)}" fill="#ffffff" opacity="0.85"/>
      </g>`;
  }
  return out;
}

function defs() {
  return `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#17181b"/>
      <stop offset="0.55" stop-color="#0e0f11"/>
      <stop offset="1" stop-color="#070708"/>
    </linearGradient>
    <radialGradient id="light" cx="0.5" cy="0.02" r="0.9">
      <stop offset="0" stop-color="#4a4e55" stop-opacity="0.9"/>
      <stop offset="0.4" stop-color="#26282c" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="streak" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.45" stop-color="#e5e7eb"/>
      <stop offset="0.8" stop-color="#9ca3af"/>
      <stop offset="1" stop-color="#d1d5db"/>
    </linearGradient>
    <radialGradient id="bead" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#dfe4ea" stop-opacity="0.9"/>
      <stop offset="0.7" stop-color="#5b6husky" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.05"/>
    </radialGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.85"/>
    </linearGradient>
  </defs>`.replace("#5b6husky", "#5b6672");
}

function panel({ w, h, caption, seed, showTag = true }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${caption || "Auto Glo detailing"}">
  ${defs()}
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <ellipse cx="${w / 2}" cy="${h * -0.05}" rx="${w * 0.75}" ry="${h * 0.65}" fill="url(#light)"/>
  <g transform="rotate(-18 ${w / 2} ${h / 2})">
    <rect x="${-w * 0.2}" y="${h * 0.18}" width="${w * 1.4}" height="${h * 0.16}" fill="url(#streak)"/>
  </g>
  ${beads(seed, w, h, Math.round((w * h) / 42000) + 6)}
  <rect x="0" y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="url(#floor)"/>
  ${
    caption
      ? `<g transform="translate(${w * 0.06} ${h * 0.86})">
    ${showTag ? `<text x="0" y="0" font-family="Arial, Helvetica, sans-serif" font-size="${Math.max(11, w * 0.016)}" letter-spacing="4" fill="#9ca3af">AUTO GLO</text>` : ""}
    <text x="0" y="${Math.max(28, w * 0.045)}" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${Math.max(22, w * 0.036)}" fill="url(#chrome)">${caption}</text>
  </g>`
      : ""
  }
  <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="#2a2a2a" stroke-width="1"/>
</svg>`;
}

function logoBadge() {
  const s = 240;
  const c = s / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" role="img" aria-label="Auto Glo Mobile Detailing badge">
  <defs>
    <radialGradient id="disc" cx="0.5" cy="0.35" r="0.75">
      <stop offset="0" stop-color="#2a2c30"/>
      <stop offset="1" stop-color="#0b0b0c"/>
    </radialGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.5" stop-color="#aab0b8"/>
      <stop offset="1" stop-color="#6b7280"/>
    </linearGradient>
    <linearGradient id="mono" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.6" stop-color="#dfe3e8"/>
      <stop offset="1" stop-color="#9ca3af"/>
    </linearGradient>
  </defs>
  <circle cx="${c}" cy="${c}" r="116" fill="url(#ring)"/>
  <circle cx="${c}" cy="${c}" r="110" fill="url(#disc)"/>
  <circle cx="${c}" cy="${c}" r="98" fill="none" stroke="#6b7280" stroke-width="1.5" opacity="0.7"/>
  <text x="${c}" y="112" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="66" letter-spacing="2" fill="url(#mono)">AG</text>
  <text x="${c}" y="150" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="20" letter-spacing="3" fill="#e5e7eb">AUTO GLO</text>
  <text x="${c}" y="172" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="11" letter-spacing="3" fill="#9ca3af">MOBILE DETAILING</text>
  <text x="${c}" y="196" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="8.5" letter-spacing="4" fill="#6b7280">PREMIUM SERVICE</text>
</svg>`;
}

function ogImage() {
  const w = 1200;
  const h = 630;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Auto Glo Mobile Detailing">
  ${defs()}
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <ellipse cx="${w / 2}" cy="-40" rx="820" ry="440" fill="url(#light)"/>
  ${beads("og-seed", w, h, 16)}
  <rect x="0" y="${h * 0.6}" width="${w}" height="${h * 0.4}" fill="url(#floor)"/>
  <text x="80" y="250" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="8" fill="#9ca3af">SERVING POMONA &amp; THE INLAND EMPIRE</text>
  <text x="76" y="360" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="112" letter-spacing="2" fill="url(#chrome)">AUTO GLO</text>
  <text x="80" y="420" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="34" letter-spacing="10" fill="#e5e7eb">MOBILE DETAILING</text>
  <text x="80" y="500" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#9ca3af">Detail Driven, Showroom Glow — (909) 307-4711</text>
  <rect x="80" y="530" width="360" height="2" fill="url(#chrome)"/>
</svg>`;
}

const gallery = [
  ["gallery-ceramic-coating", "Ceramic Coating"],
  ["gallery-foam-bath", "Foam Bath"],
  ["gallery-interior-detail", "Interior Detail"],
  ["gallery-wheel-detail", "Wheel Detail"],
  ["gallery-paint-correction", "Paint Correction"],
  ["gallery-hand-wash", "Hand Wash"],
  ["gallery-leather-care", "Leather Care"],
  ["gallery-engine-bay", "Engine Bay"],
  ["gallery-headlight", "Headlight Restoration"],
  ["gallery-trim", "Trim Restoration"],
  ["gallery-mobile-setup", "Mobile Setup"],
  ["gallery-showroom-finish", "Showroom Finish"],
];

await mkdir(IMG, { recursive: true });

const jobs = [];
jobs.push([join(PUB, "logo.svg"), logoBadge()]);
jobs.push([join(IMG, "og.svg"), ogImage()]);
jobs.push([join(IMG, "hero-car.svg"), panel({ w: 1600, h: 1040, caption: "", seed: "hero-car" })]);
jobs.push([join(IMG, "about-detail.svg"), panel({ w: 1120, h: 900, caption: "", seed: "about-detail" })]);
for (const [file, caption] of gallery) {
  jobs.push([join(IMG, `${file}.svg`), panel({ w: 880, h: 660, caption, seed: file })]);
}

await Promise.all(jobs.map(([p, c]) => writeFile(p, c, "utf8")));
console.log(`Generated ${jobs.length} placeholder images into /public`);
