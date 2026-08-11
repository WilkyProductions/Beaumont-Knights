import sharp from "sharp";
import { mkdirSync } from "node:fs";

// Raw source files (kept out of /public — see design-source/README below —
// since they're 15-20MB print-resolution originals, not web assets).
const EMBLEM = "design-source/BEAUMONT KNIGHTS EMBLEM 1  (11 inch WHT FAB).jpg";
const CANOPY = "design-source/BeaumontKnightsCanopy.jpg";
const BG_THRESHOLD = 34; // max(r,g,b) below this = candidate background

mkdirSync("public/logo", { recursive: true });

// Flood-fill from the image border to find the contiguous black canvas
// around the artwork and knock ONLY that out to transparent — unlike a
// global luminance threshold, this leaves dark shading *inside* the
// artwork (armor shadows, the shield's dark fill) intact, since it's not
// connected to the border through other near-black pixels.
function floodFillTransparent(data, width, height, channels) {
  const visited = new Uint8Array(width * height);
  const stack = [];

  const isBg = (idx) => {
    const o = idx * channels;
    return data[o] < BG_THRESHOLD && data[o + 1] < BG_THRESHOLD && data[o + 2] < BG_THRESHOLD;
  };

  for (let x = 0; x < width; x++) {
    stack.push(x, x + (height - 1) * width);
  }
  for (let y = 0; y < height; y++) {
    stack.push(y * width, y * width + (width - 1));
  }

  while (stack.length) {
    const idx = stack.pop();
    if (visited[idx]) continue;
    if (!isBg(idx)) continue;
    visited[idx] = 1;
    data[idx * channels + 3] = 0;

    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) stack.push(idx - 1);
    if (x < width - 1) stack.push(idx + 1);
    if (y > 0) stack.push(idx - width);
    if (y < height - 1) stack.push(idx + width);
  }
}

// The shield crop's top edge unavoidably overlaps the arched "KNIGHTS"
// text (they're interleaved in the source art — no crop line separates
// them cleanly without also slicing the plume). Text is rendered in
// white/silver; the plume, armor, and shield outline are gold/dark. So
// instead of a position-only cut, knock out near-white pixels — but only
// within the top band, so a stray white highlight on the armor further
// down isn't touched.
function knockOutTopText(data, width, height, channels, yFraction) {
  const yLimit = height * yFraction;
  for (let y = 0; y < yLimit; y++) {
    for (let x = 0; x < width; x++) {
      const o = (y * width + x) * channels;
      const r = data[o];
      const g = data[o + 1];
      const b = data[o + 2];
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      // Text (both its bright white face and its gray/black bevel shadow)
      // is low-saturation; the gold plume/shield outline is not — this
      // catches the whole letterform, not just the bright highlight.
      if (max - min < 38) {
        data[o + 3] = 0;
      }
    }
  }
}

async function cutoutBackground(input, { extract, knockOutTextYFraction } = {}) {
  let pipeline = sharp(input);
  if (extract) pipeline = pipeline.extract(extract);
  // Flood-fill at 2x the eventual output size so the final downscale
  // anti-aliases the new alpha edge smoothly.
  pipeline = pipeline.resize({ width: 1800 }).ensureAlpha();

  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  floodFillTransparent(data, info.width, info.height, info.channels);
  if (knockOutTextYFraction) {
    knockOutTopText(data, info.width, info.height, info.channels, knockOutTextYFraction);
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } });
}

async function main() {
  // Full emblem (with "BEAUMONT KNIGHTS" + "BASEBALL" text), canvas
  // corners knocked out to transparent, for use on any surface.
  const full = await cutoutBackground(EMBLEM);
  await full.clone().resize({ width: 1000 }).png({ quality: 90 }).toFile(
    "public/logo/emblem-full.png"
  );

  // Shield + knight only (no arched text / BASEBALL plate) — cropped for
  // compact nav/footer/favicon use.
  const shieldCrop = { left: 100, top: 930, width: 3350, height: 3360 };
  const shield = await cutoutBackground(EMBLEM, {
    extract: shieldCrop,
    knockOutTextYFraction: 0.18,
  });
  await shield.clone().resize({ width: 900 }).png({ quality: 90 }).toFile(
    "public/logo/shield.png"
  );

  // App icon sizes (opaque black background required for favicons). Next.js
  // auto-serves these from src/app/icon.png and src/app/apple-icon.png.
  const shieldOpaque = sharp(EMBLEM).extract(shieldCrop);
  await shieldOpaque.clone().resize(512, 512, { fit: "cover" }).png().toFile(
    "src/app/icon.png"
  );
  await shieldOpaque.clone().resize(180, 180, { fit: "cover" }).png().toFile(
    "src/app/apple-icon.png"
  );

  // Optimized canopy photo for optional display use — original was
  // 18.8MB, far too large for the web.
  await sharp(CANOPY)
    .resize({ width: 1600 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile("public/logo/canopy.jpg");

  // Open Graph / social share image (1200x630), full emblem centered on
  // the brand black. Next.js auto-picks up src/app/opengraph-image.png.
  const ogEmblem = await full.clone().resize({ height: 560 }).png().toBuffer();
  const ogEmblemMeta = await sharp(ogEmblem).metadata();
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: "#0a0a0b",
    },
  })
    .composite([
      {
        input: ogEmblem,
        left: Math.round((1200 - (ogEmblemMeta.width ?? 0)) / 2),
        top: Math.round((630 - (ogEmblemMeta.height ?? 0)) / 2),
      },
    ])
    .png()
    .toFile("src/app/opengraph-image.png");

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
