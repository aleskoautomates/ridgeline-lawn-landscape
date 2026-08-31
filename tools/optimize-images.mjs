#!/usr/bin/env node
/* ---------------------------------------------------------------------------
   tools/optimize-images.mjs

   Turns the real photos into the AVIF / WebP / JPEG responsive set the build
   is already wired to emit. This is the ONLY step between "we have photos"
   and "we hit Lighthouse 90 with a photo-heavy site".

   WORKFLOW
   1. Put full-size originals in  photos-original/  named exactly like the
      `base` value in the data files, e.g.  westfield-slope-retaining-wall.jpg
   2. npm i --save-dev sharp        (one time, ~30 MB, dev only)
   3. npm run images
   4. npm run build

   It writes into src/assets/img/:
      <base>.jpg  <base>.webp  <base>.avif           (full size, capped)
      <base>-480/-800/-1200/-1600 in all three       (responsive srcset)

   Originals stay untouched. Re-running skips anything already generated
   unless you pass --force.
--------------------------------------------------------------------------- */

import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('photos-original');
const OUT = path.resolve('src/assets/img');
const WIDTHS = [480, 800, 1200, 1600];
const FORCE = process.argv.includes('--force');

let sharp;
try {
  ({ default: sharp } = await import('sharp'));
} catch {
  console.error('');
  console.error('  sharp is not installed.');
  console.error('');
  console.error('  npm i --save-dev sharp');
  console.error('');
  console.error('  It is a dev dependency only. Nothing on the live site needs it,');
  console.error('  and the site builds fine without it using placeholder imagery.');
  console.error('');
  process.exit(1);
}

if (!fs.existsSync(SRC)) {
  fs.mkdirSync(SRC, { recursive: true });
  console.log('');
  console.log('  Created photos-original/. Put the full-size photos in there,');
  console.log('  named to match the `base` values in src/data/*.mjs, then run this again.');
  console.log('');
  process.exit(0);
}

fs.mkdirSync(OUT, { recursive: true });

const originals = fs.readdirSync(SRC)
  .filter((f) => /\.(jpe?g|png|tiff?|webp|heic|heif)$/i.test(f));

if (!originals.length) {
  console.log('  No source images found in photos-original/.');
  process.exit(0);
}

let made = 0, skipped = 0;
const report = [];

for (const file of originals) {
  const base = file.replace(/\.[^.]+$/, '');
  const input = path.join(SRC, file);
  const meta = await sharp(input).metadata();
  const srcW = meta.width || 1600;
  const srcH = meta.height || 1067;

  /* Only generate widths the original can actually supply. Upscaling a
     1200px photo to 1600 makes a bigger file that looks worse. */
  const widths = WIDTHS.filter((w) => w <= srcW);
  if (!widths.length) widths.push(srcW);

  const targets = [{ w: Math.min(srcW, 1600), suffix: '' }]
    .concat(widths.map((w) => ({ w, suffix: '-' + w })));

  for (const t of targets) {
    for (const [ext, opts] of [
      ['avif', { quality: 52, effort: 5 }],
      ['webp', { quality: 76 }],
      ['jpg',  { quality: 80, mozjpeg: true, progressive: true }]
    ]) {
      const outPath = path.join(OUT, `${base}${t.suffix}.${ext}`);
      if (!FORCE && fs.existsSync(outPath)) { skipped++; continue; }
      const pipeline = sharp(input).resize({ width: t.w, withoutEnlargement: true });
      if (ext === 'avif') await pipeline.avif(opts).toFile(outPath);
      else if (ext === 'webp') await pipeline.webp(opts).toFile(outPath);
      else await pipeline.jpeg(opts).toFile(outPath);
      made++;
    }
  }

  /* Report the real dimensions so they can be copied into the data file.
     Wrong width/height in the data means layout shift on load. */
  const outMeta = await sharp(path.join(OUT, `${base}.jpg`)).metadata();
  report.push({ base, w: outMeta.width, h: outMeta.height, srcW, srcH });
}

console.log('');
console.log('  IMAGES');
console.log('  ' + '-'.repeat(60));
console.log(`  ${originals.length} originals -> ${made} files written, ${skipped} already present`);
console.log('');
console.log('  Check these against the `w` and `h` values in src/data/*.mjs.');
console.log('  A mismatch shows up as layout shift and costs Lighthouse points.');
console.log('');
for (const r of report) {
  console.log(`    ${r.base}:  w: ${r.w}, h: ${r.h}`);
}
console.log('');
console.log('  Now run: npm run build');
console.log('');
