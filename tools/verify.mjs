#!/usr/bin/env node
/* ---------------------------------------------------------------------------
   tools/verify.mjs
   Post-build checks. Run with:  node tools/verify.mjs

   Catches the things that silently break a static site: dead internal links,
   images missing alt or dimensions, duplicate or missing H1s, JSON-LD that
   does not parse, and meta descriptions outside the useful length range.
--------------------------------------------------------------------------- */

import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const problems = [];
const notes = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

if (!fs.existsSync(DIST)) {
  console.error('No dist/. Run `npm run build` first.');
  process.exit(1);
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const rel = (f) => path.relative(DIST, f).split(path.sep).join('/');

/* Every URL path the build actually produced. */
const served = new Set();
for (const f of files) {
  const r = '/' + rel(f);
  served.add(r);
  if (r.endsWith('/index.html')) served.add(r.replace(/index\.html$/, ''));
}

function decode(str) {
  return String(str)
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’').replace(/&middot;/g, '·')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–');
}

let totalImgs = 0, lazyImgs = 0, jsonBlocks = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const where = rel(file);

  /* Pages deliberately kept out of the index are not linted for SERP length. */
  const noindex = /<meta name="robots" content="noindex/.test(html);

  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length === 0) problems.push(`${where}: no <h1>`);
  if (h1s.length > 1) problems.push(`${where}: ${h1s.length} <h1> elements, should be 1`);

  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  if (!title) problems.push(`${where}: no <title>`);
  else if (!noindex && title.length > 65) notes.push(`${where}: title is ${title.length} chars, may truncate in SERPs`);

  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  if (!desc) problems.push(`${where}: no meta description`);
  else if (!noindex && (desc.length < 70 || desc.length > 165)) {
    notes.push(`${where}: meta description is ${desc.length} chars (aim 120-160)`);
  }

  if (!/<link rel="canonical"/.test(html)) problems.push(`${where}: no canonical`);

  const imgs = html.match(/<img\b[^>]*>/g) || [];
  for (const tag of imgs) {
    totalImgs++;
    if (!/\salt="/.test(tag)) problems.push(`${where}: <img> with no alt: ${tag.slice(0, 90)}`);
    /* The lightbox <img> ships empty and is populated by site.js when a
       visitor opens a project, so an empty alt on it is correct. */
    else if (/\salt=""/.test(tag) && !/aria-hidden/.test(tag) && !/data-lightbox-img/.test(tag)) {
      notes.push(`${where}: empty alt on a content image`);
    }
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) {
      problems.push(`${where}: <img> without width/height (layout shift): ${tag.slice(0, 90)}`);
    }
    if (/loading="lazy"/.test(tag)) lazyImgs++;
  }

  const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  for (const b of blocks) {
    jsonBlocks++;
    const raw = b.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
    try {
      const parsed = JSON.parse(raw);
      if (!parsed['@context']) problems.push(`${where}: JSON-LD block with no @context`);
    } catch (err) {
      problems.push(`${where}: JSON-LD does not parse - ${err.message}`);
    }
  }

  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  for (const href of new Set(hrefs)) {
    if (served.has(href)) continue;
    if (served.has(href + 'index.html')) continue;
    if (href.endsWith('.php')) continue;
    problems.push(`${where}: dead internal link -> ${href}`);
  }

  if (!/<html lang="/.test(html)) problems.push(`${where}: <html> missing lang`);
  if (!/name="viewport"/.test(html)) problems.push(`${where}: no viewport meta`);
}

const smPath = path.join(DIST, 'sitemap.xml');
if (fs.existsSync(smPath)) {
  const sm = fs.readFileSync(smPath, 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const p = loc.replace(/^https?:\/\/[^/]+/, '');
    if (!served.has(p) && !served.has(p + 'index.html')) {
      problems.push(`sitemap.xml: lists ${p} which was not built`);
    }
  }
  notes.push(`sitemap.xml lists ${locs.length} URLs`);
} else {
  problems.push('no sitemap.xml');
}

const bytes = files.reduce((n, f) => n + fs.statSync(f).size, 0);
const biggest = files
  .map((f) => ({ f: rel(f), b: fs.statSync(f).size }))
  .sort((a, b) => b.b - a.b).slice(0, 5);

console.log('');
console.log('  VERIFY');
console.log('  ' + '-'.repeat(58));
console.log(`  ${htmlFiles.length} HTML pages, ${files.length} files, ${(bytes / 1024).toFixed(0)} KB total`);
console.log(`  ${totalImgs} <img> tags, ${lazyImgs} lazy-loaded, ${jsonBlocks} JSON-LD blocks`);
console.log('  largest: ' + biggest.map((x) => `${x.f} ${(x.b / 1024).toFixed(0)}KB`).join(', '));

if (notes.length) {
  console.log('');
  console.log('  NOTES (' + notes.length + ')');
  notes.forEach((n) => console.log('   - ' + n));
}

console.log('');
if (problems.length) {
  console.log('  PROBLEMS (' + problems.length + ')');
  problems.forEach((p) => console.log('   x ' + p));
  console.log('');
  process.exit(1);
}
console.log('  No problems found.');
console.log('');
