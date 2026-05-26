// Generates clean monochrome studio SVG product mockups into public/mockups/.
// Run: node scripts/generate-mockups.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "mockups");
mkdirSync(OUT, { recursive: true });

// ── palettes ──────────────────────────────────────────
const PAL = {
  black: { bgTop: "#F1EEE8", bgBot: "#E3DED4", fill: "#191919", seam: "#3a3a3a", shadow: "rgba(0,0,0,0.16)", wm: "#00000022" },
  white: { bgTop: "#23211e", bgBot: "#15140f", fill: "#F3F1EA", seam: "#cdc8bd", shadow: "rgba(0,0,0,0.45)", wm: "#ffffff14" },
};

const W = 600, H = 800;

function frame(p, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.bgTop}"/><stop offset="1" stop-color="${p.bgBot}"/>
    </linearGradient>
    <radialGradient id="vig" cx="0.5" cy="0.42" r="0.75">
      <stop offset="0.6" stop-color="#00000000"/><stop offset="1" stop-color="#00000018"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <ellipse cx="300" cy="660" rx="180" ry="34" fill="${p.shadow}"/>
  ${body}
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
  <text x="300" y="772" text-anchor="middle" font-family="Georgia, serif" font-size="17" letter-spacing="7" fill="${p.wm}">LUXAFOIR</text>
</svg>`;
}

const stroke = (p, w = 2) => `fill="none" stroke="${p.seam}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"`;

// ── garments ──────────────────────────────────────────
function tee(p, { print = false, washed = false } = {}) {
  const wash = washed
    ? `<path d="M205 300 L205 600 L395 600 L395 300 Z" fill="#ffffff" opacity="0.05"/>`
    : "";
  const graphic = print
    ? `<rect x="248" y="380" width="104" height="120" rx="4" fill="${p.bgTop}" opacity="0.9"/><rect x="262" y="398" width="76" height="10" rx="5" fill="${p.fill}"/><rect x="262" y="420" width="58" height="8" rx="4" fill="${p.fill}"/><rect x="262" y="470" width="40" height="8" rx="4" fill="${p.fill}"/>`
    : "";
  return `
  <path d="M150 305 Q150 272 178 268 L252 250 Q300 240 348 250 L422 268 Q450 272 450 305 L472 386 Q474 402 458 404 L408 376 L408 596 Q408 606 398 606 L202 606 Q192 606 192 596 L192 376 L142 404 Q126 402 128 386 Z" fill="${p.fill}"/>
  <ellipse cx="300" cy="256" rx="50" ry="17" fill="${p.bgTop}"/>
  <path d="M252 252 Q300 286 348 252" ${stroke(p)} />
  ${wash}${graphic}
  <path d="M192 376 L142 404 M408 376 L458 404" ${stroke(p, 1.5)} />`;
}

function longsleeve(p) {
  return `
  <path d="M150 300 Q150 270 178 266 L252 250 Q300 240 348 250 L422 266 Q450 270 450 300
    L470 560 Q470 576 452 576 L408 576 L408 596 Q408 606 398 606 L202 606 Q192 606 192 596 L192 576 L148 576 Q130 576 130 560 Z"
    fill="${p.fill}"/>
  <ellipse cx="300" cy="256" rx="50" ry="17" fill="${p.bgTop}"/>
  <path d="M252 252 Q300 286 348 252" ${stroke(p)} />
  <rect x="130" y="556" width="48" height="22" rx="6" fill="${p.fill}" stroke="${p.seam}" stroke-opacity="0.4"/>
  <rect x="422" y="556" width="48" height="22" rx="6" fill="${p.fill}" stroke="${p.seam}" stroke-opacity="0.4"/>`;
}

function hoodie(p, { zip = false } = {}) {
  const center = zip
    ? `<line x1="300" y1="320" x2="300" y2="600" ${stroke(p, 2)} opacity="0.6"/>`
    : `<path d="M236 312 Q300 300 364 312" ${stroke(p, 2)} />`;
  return `
  <path d="M232 286 Q300 250 368 286 L300 360 Z" fill="${p.fill}"/>
  <path d="M236 300 Q300 270 364 300 L300 352 Z" fill="${p.bgTop}" opacity="0.55"/>
  <path d="M150 320 Q150 286 182 282 L246 300 Q300 312 354 300 L418 282 Q450 286 450 320
    L470 404 Q472 420 456 422 L408 392 L408 600 Q408 610 398 610 L202 610 Q192 610 192 600 L192 392 L144 422 Q128 420 130 404 Z"
    fill="${p.fill}"/>
  ${center}
  <path d="M236 470 Q300 486 364 470 L364 540 Q300 556 236 540 Z" fill="${p.fill}" stroke="${p.seam}" stroke-opacity="0.4"/>
  <circle cx="276" cy="318" r="4" fill="${p.seam}"/><circle cx="324" cy="318" r="4" fill="${p.seam}"/>
  <path d="M276 320 L284 366 M324 320 L316 366" ${stroke(p, 3)} opacity="0.7"/>`;
}

function pants(p, { wide = false, jogger = false, cargo = false, shorts = false } = {}) {
  const hem = shorts ? 470 : 690;
  const outer = wide ? 60 : 40;
  const innerTaper = jogger ? 34 : 0;
  const lx = 300 - 92, rx = 300 + 92;
  const legTopY = 300;
  const body = `
  <path d="M${lx} ${legTopY} Q300 282 ${rx} ${legTopY} L${rx} 360 L${rx + outer} ${hem} L${300 + 18 + innerTaper} ${hem} L300 410 L${300 - 18 - innerTaper} ${hem} L${lx - outer} ${hem} L${lx} 360 Z" fill="${p.fill}"/>
  <rect x="${lx}" y="288" width="184" height="34" rx="6" fill="${p.fill}" stroke="${p.seam}" stroke-opacity="0.4"/>`;
  const cuffs = jogger
    ? `<rect x="${300 - 18 - innerTaper - 6}" y="${hem - 26}" width="${(18 + innerTaper) + outer + 12}" height="26" rx="6" fill="${p.fill}" stroke="${p.seam}" stroke-opacity="0.4"/>
       <rect x="${300 + 18}" y="${hem - 26}" width="${(18 + innerTaper) + outer + 12}" height="26" rx="6" fill="${p.fill}" stroke="${p.seam}" stroke-opacity="0.4"/>`
    : "";
  const pocket = cargo
    ? `<rect x="${lx - outer + 8}" y="480" width="62" height="78" rx="6" fill="${p.fill}" stroke="${p.seam}" stroke-opacity="0.5"/>
       <rect x="${rx + outer - 70}" y="480" width="62" height="78" rx="6" fill="${p.fill}" stroke="${p.seam}" stroke-opacity="0.5"/>`
    : "";
  return `${body}<line x1="300" y1="322" x2="300" y2="${hem - 10}" ${stroke(p, 1.5)} />${cuffs}${pocket}`;
}

function fabric(p) {
  const lines = Array.from({ length: 22 }, (_, i) =>
    `<line x1="120" y1="${230 + i * 16}" x2="480" y2="${230 + i * 16}" stroke="${p.seam}" stroke-width="1" opacity="0.18"/>`
  ).join("");
  return `
  <rect x="120" y="220" width="360" height="360" rx="10" fill="${p.fill}"/>
  ${lines}
  <rect x="120" y="220" width="360" height="360" rx="10" fill="none" stroke="${p.seam}" stroke-opacity="0.3"/>
  <rect x="250" y="500" width="100" height="40" rx="4" fill="${p.bgTop}" opacity="0.92"/>
  <text x="300" y="525" text-anchor="middle" font-family="Georgia, serif" font-size="13" letter-spacing="3" fill="${p.fill}">LUXAFOIR</text>
  <path d="M150 250 L150 300 M450 250 L450 300" ${stroke(p, 3)} opacity="0.4"/>`;
}

// ── write product mockups ─────────────────────────────
const files = {
  "tee-black": frame(PAL.black, tee(PAL.black)),
  "tee-white": frame(PAL.white, tee(PAL.white)),
  "teeprint-black": frame(PAL.black, tee(PAL.black, { print: true })),
  "teewashed-black": frame(PAL.black, tee(PAL.black, { washed: true })),
  "longsleeve-black": frame(PAL.black, longsleeve(PAL.black)),
  "hoodie-black": frame(PAL.black, hoodie(PAL.black)),
  "ziphoodie-black": frame(PAL.black, hoodie(PAL.black, { zip: true })),
  "widepants-black": frame(PAL.black, pants(PAL.black, { wide: true })),
  "cargo-black": frame(PAL.black, pants(PAL.black, { wide: true, cargo: true })),
  "jogger-black": frame(PAL.black, pants(PAL.black, { jogger: true })),
  "shorts-black": frame(PAL.black, pants(PAL.black, { shorts: true })),
  "shortswashed-black": frame(PAL.black, pants(PAL.black, { shorts: true })),
  "fabric-black": frame(PAL.black, fabric(PAL.black)),
  "fabric-white": frame(PAL.white, fabric(PAL.white)),
};

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(OUT, `${name}.svg`), svg);
}

// ── collection banners (portrait 1200x1500) & hero (1920x1080) ──
function banner(w, h, label) {
  const p = PAL.white;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#1c1b18"/><stop offset="0.55" stop-color="#111110"/><stop offset="1" stop-color="#070707"/>
  </linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  ${Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${(h / 14) * i}" x2="${w}" y2="${(h / 14) * i + 60}" stroke="#ffffff" stroke-width="1" opacity="0.04"/>`).join("")}
  <text x="${w / 2}" y="${h / 2}" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="${Math.round(w / 12)}" fill="#ffffff12">${label}</text>
</svg>`;
}
writeFileSync(join(OUT, "col-essentials.svg"), banner(1200, 1500, "Essentials"));
writeFileSync(join(OUT, "col-heavyweight.svg"), banner(1200, 1500, "Heavyweight"));
writeFileSync(join(OUT, "col-utility.svg"), banner(1200, 1500, "Utility"));
for (let i = 1; i <= 5; i++) writeFileSync(join(OUT, `hero-${i}.svg`), banner(1920, 1080, ["NEW", "HEAVY", "SKENA", "BASIC", "LOCAL"][i - 1]));

console.log("Generated", Object.keys(files).length + 8, "mockups in public/mockups/");
