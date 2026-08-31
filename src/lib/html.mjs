/* ---------------------------------------------------------------------------
   src/lib/html.mjs
   Small helpers shared by every template. No dependencies.
--------------------------------------------------------------------------- */

import fs from 'node:fs';
import path from 'node:path';

/* Escape text destined for HTML body content or a double-quoted attribute. */
export function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Escape a string being embedded inside a <script type="application/ld+json">
   block. JSON.stringify handles quoting; this stops a stray </script> or an
   HTML comment opener from breaking out of the element. */
export function jsonLd(obj) {
  return JSON.stringify(obj, null, 2)
    .replace(/</g, '\u003c')
    .replace(/>/g, '\u003e')
    .replace(/&/g, '\u0026');
}

/* Join class names, dropping falsy values. */
export function cls(...parts) {
  return parts.filter(Boolean).join(' ');
}

/* Render an array through a function and join it. */
export const map = (arr, fn) => (arr || []).map(fn).join('');

/* Strip HTML and collapse whitespace, for meta descriptions built from copy. */
export function plain(str, max = 0) {
  const s = String(str || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (!max || s.length <= max) return s;
  return s.slice(0, max - 1).replace(/\s+\S*$/, '') + '\u2026';
}

/* 2026-08-30 -> "August 30, 2026" */
export function formatDate(iso) {
  const [y, m, d] = String(iso).split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[m - 1]} ${d}, ${y}`;
}

/* ---------------------------------------------------------------------------
   IMAGES

   Every photo is referenced by a `base` name, e.g. "westfield-slope-wall".
   At build time we look in src/assets/img/ for real files:

     <base>.avif   <base>.webp   <base>.jpg     (full size)
     <base>-800.avif  <base>-800.webp  ...       (optional responsive widths)

   If a real <base>.jpg exists we emit a full <picture> with AVIF and WebP
   sources plus srcset. If it does not, we emit the generated SVG placeholder
   so the layout is complete and nothing renders as a broken image.

   Either way the tag always carries width, height, alt and a loading
   strategy, because those are what keep Lighthouse happy.
--------------------------------------------------------------------------- */

const IMG_SRC_DIR = path.resolve('src/assets/img');
const RESPONSIVE_WIDTHS = [480, 800, 1200, 1600];

function fileExists(p) {
  try { return fs.existsSync(p); } catch { return false; }
}

/* Which real derivatives exist on disk for this base name. */
export function imageAssets(base) {
  const has = (ext, w) =>
    fileExists(path.join(IMG_SRC_DIR, w ? `${base}-${w}.${ext}` : `${base}.${ext}`));
  return {
    hasJpg: has('jpg') || has('jpeg'),
    jpgExt: has('jpg') ? 'jpg' : has('jpeg') ? 'jpeg' : null,
    hasAvif: has('avif'),
    hasWebp: has('webp'),
    widths: RESPONSIVE_WIDTHS.filter((w) => has('jpg', w) || has('webp', w) || has('avif', w))
  };
}

function srcsetFor(base, ext, widths) {
  if (!widths.length) return '';
  return widths.map((w) => `/assets/img/${base}-${w}.${ext} ${w}w`).join(', ');
}

/**
 * picture({ base, alt, w, h, sizes, priority, className })
 *
 * priority: true  -> eager load + high fetch priority (use for the hero only)
 * priority: false -> lazy load + async decode (everything below the fold)
 */
export function picture(opts) {
  const {
    base,
    alt,
    w = 1600,
    h = 1067,
    sizes = '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw',
    priority = false,
    className = ''
  } = opts;

  const a = imageAssets(base);
  const loading = priority
    ? 'loading="eager" fetchpriority="high" decoding="async"'
    : 'loading="lazy" decoding="async"';
  const dims = `width="${w}" height="${h}"`;
  const klass = className ? ` class="${esc(className)}"` : '';

  /* No real photo yet: use the generated SVG placeholder. */
  if (!a.hasJpg) {
    return `<img src="/assets/img/${esc(base)}.svg" alt="${esc(alt)}" ${dims} ${loading}${klass} data-placeholder="true">`;
  }

  const sources = [];
  if (a.hasAvif) {
    const ss = srcsetFor(base, 'avif', a.widths) || `/assets/img/${base}.avif`;
    sources.push(`<source type="image/avif" srcset="${esc(ss)}" sizes="${esc(sizes)}">`);
  }
  if (a.hasWebp) {
    const ss = srcsetFor(base, 'webp', a.widths) || `/assets/img/${base}.webp`;
    sources.push(`<source type="image/webp" srcset="${esc(ss)}" sizes="${esc(sizes)}">`);
  }
  const jpgSrcset = srcsetFor(base, a.jpgExt, a.widths);
  const jpgAttrs = jpgSrcset ? ` srcset="${esc(jpgSrcset)}" sizes="${esc(sizes)}"` : '';

  return `<picture>${sources.join('')}<img src="/assets/img/${esc(base)}.${a.jpgExt}"${jpgAttrs} alt="${esc(alt)}" ${dims} ${loading}${klass}></picture>`;
}

/* Bare <img> for cases where <picture> markup is inconvenient (the
   before/after slider needs two plain images it can size identically). */
export function img(opts) {
  const { base, alt, w = 1600, h = 1067, priority = false, className = '' } = opts;
  const a = imageAssets(base);
  const ext = a.hasJpg ? a.jpgExt : 'svg';
  const loading = priority
    ? 'loading="eager" fetchpriority="high" decoding="async"'
    : 'loading="lazy" decoding="async"';
  const klass = className ? ` class="${esc(className)}"` : '';
  const flag = a.hasJpg ? '' : ' data-placeholder="true"';
  return `<img src="/assets/img/${esc(base)}.${ext}" alt="${esc(alt)}" width="${w}" height="${h}" ${loading}${klass}${flag}>`;
}
