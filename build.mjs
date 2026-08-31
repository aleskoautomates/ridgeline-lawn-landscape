#!/usr/bin/env node
/* ===========================================================================
   build.mjs
   Renders the whole site into dist/. Zero dependencies.

   Run:  npm run build
   Then: upload everything inside dist/ to the web root.
=========================================================================== */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { site, seasonalBanner } from './src/data/site.mjs';
import { services } from './src/data/services.mjs';
import { cities } from './src/data/cities.mjs';
import { projects } from './src/data/projects.mjs';
import { posts, postsByDate } from './src/data/posts.mjs';
import { about, crew, crewHasPlaceholders } from './src/data/about.mjs';
import { reviews } from './src/data/reviews.mjs';

import { homePage } from './src/pages/home.mjs';
import { servicesHub, servicePage } from './src/pages/services.mjs';
import { areasHub, cityPage } from './src/pages/areas.mjs';
import { portfolioPage } from './src/pages/portfolio.mjs';
import { packagesPage } from './src/pages/packages.mjs';
import { aboutPage } from './src/pages/about.mjs';
import { reviewsPage } from './src/pages/reviews.mjs';
import { blogIndex, blogPost } from './src/pages/blog.mjs';
import { faqPage } from './src/pages/faq.mjs';
import { contactPage, thankYouPage, notFoundPage } from './src/pages/contact.mjs';
import { ratingIsPublishable } from './src/lib/schema.mjs';
import { touchIcon } from './src/lib/png.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const SRC_IMG = path.join(ROOT, 'src/assets/img');

const warnings = [];
const written = [];

/* -- fs helpers ---------------------------------------------------------- */
function write(rel, contents) {
  const full = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents, 'utf8');
  written.push(rel);
}

function writePage(routePath, html) {
  /* "/services/lawn-mowing/" -> "services/lawn-mowing/index.html"
     "/404.html"              -> "404.html"                          */
  const rel = routePath === '/'
    ? 'index.html'
    : routePath.endsWith('.html')
      ? routePath.replace(/^\//, '')
      : path.join(routePath.replace(/^\/|\/$/g, ''), 'index.html');
  write(rel, html);
  return rel;
}

function copyDir(from, to) {
  if (!fs.existsSync(from)) return 0;
  fs.mkdirSync(to, { recursive: true });
  let n = 0;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) n += copyDir(src, dst);
    else { fs.copyFileSync(src, dst); n++; }
  }
  return n;
}

/* -- Placeholder imagery -------------------------------------------------
   Any photo referenced in the data files that has no real file on disk gets
   a generated SVG in its place: brand gradient, the alt text as a label, and
   the exact aspect ratio the layout expects. The page therefore never has a
   broken image and never shifts when the real photo is dropped in later.
------------------------------------------------------------------------- */
const PALETTES = [
  ['#1E4A32', '#2F6B47'],
  ['#2F6B47', '#4A8A5F'],
  ['#143323', '#1E4A32'],
  ['#4A6B3A', '#6E8C52']
];

function escXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function wrapText(text, perLine) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > perLine) { lines.push(line.trim()); line = w; }
    else line += ' ' + w;
  }
  if (line.trim()) lines.push(line.trim());
  return lines.slice(0, 4);
}

function placeholderSvg({ base, alt, w, h }) {
  const seed = [...base].reduce((a, c) => a + c.charCodeAt(0), 0);
  const [c1, c2] = PALETTES[seed % PALETTES.length];
  const lines = wrapText(alt || base, Math.max(24, Math.round(w / 34)));
  const fs1 = Math.round(Math.min(w, h) * 0.036);
  const startY = h / 2 - ((lines.length - 1) * fs1 * 1.35) / 2 + fs1 * 0.35;

  const text = lines.map((l, i) =>
    `<text x="${w / 2}" y="${Math.round(startY + i * fs1 * 1.35)}" text-anchor="middle" ` +
    `font-family="Georgia, serif" font-size="${fs1}" fill="#F7F5F0" opacity=".34">${escXml(l)}</text>`
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${escXml(alt || base)}">
<defs>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
  </linearGradient>
  <pattern id="p" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
    <rect width="46" height="46" fill="none"/>
    <path d="M0 23h46" stroke="#F7F5F0" stroke-opacity=".05" stroke-width="9"/>
  </pattern>
</defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<rect width="${w}" height="${h}" fill="url(#p)"/>
<rect x="${Math.round(w * 0.04)}" y="${Math.round(h * 0.05)}" width="${Math.round(w * 0.92)}" height="${Math.round(h * 0.9)}" fill="none" stroke="#D8A22E" stroke-opacity=".22" stroke-width="2" rx="8"/>
<text x="${w / 2}" y="${Math.round(h * 0.17)}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(fs1 * 0.58)}" letter-spacing="3" fill="#D8A22E" opacity=".5">PHOTO PLACEHOLDER</text>
${text}
<text x="${w / 2}" y="${Math.round(h * 0.9)}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(fs1 * 0.5)}" fill="#F7F5F0" opacity=".28">${escXml(base)}.jpg &#183; ${w}&#215;${h}</text>
</svg>`;
}

/* Collect every image reference in the data layer. */
function collectImages() {
  const found = new Map();
  const add = (o, w, h) => {
    if (!o || !o.base) return;
    if (!found.has(o.base)) {
      found.set(o.base, { base: o.base, alt: o.alt || o.base, w: o.w || w, h: o.h || h });
    }
  };

  services.forEach((s) => add(s.image, 1600, 1200));
  projects.forEach((p) => {
    add(p.image, 1600, 1067);
    if (p.beforeAfter) { add(p.beforeAfter.before, 1600, 1067); add(p.beforeAfter.after, 1600, 1067); }
  });
  posts.forEach((p) => add(p.image, 1600, 900));
  add(about.crewPhoto, 1600, 900);
  crew.forEach((c) => add(c.photo, 800, 800));
  add({ base: 'og-default', alt: `${site.name}, lawn care and landscaping in Carmel, Indiana`, w: 1200, h: 630 }, 1200, 630);
  /* The hero uses the Zionsville patio at a wider crop. */
  found.set('paver-patio-zionsville-firepit', {
    base: 'paver-patio-zionsville-firepit',
    alt: 'Tumbled paver patio with a circular fire pit, curved seat wall and layered plantings behind a Zionsville, Indiana home at dusk.',
    w: 1920, h: 1080
  });
  return [...found.values()];
}

function hasRealPhoto(base) {
  return ['jpg', 'jpeg', 'png', 'webp', 'avif']
    .some((ext) => fs.existsSync(path.join(SRC_IMG, `${base}.${ext}`)));
}

function buildPlaceholders() {
  const all = collectImages();
  let made = 0;
  const missing = [];
  for (const im of all) {
    if (hasRealPhoto(im.base)) continue;
    missing.push(im.base);
    write(path.join('assets/img', `${im.base}.svg`), placeholderSvg(im));
    made++;
  }
  return { made, missing, total: all.length };
}

/* -- Static files --------------------------------------------------------- */
function robotsTxt() {
  return `# robots.txt for ${site.domain}
User-agent: *
Allow: /

# Nothing here is worth crawling
Disallow: /thank-you/

Sitemap: ${site.domain}/sitemap.xml
`;
}

function sitemapXml(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  for (const r of routes) {
    lines.push('  <url>');
    lines.push('    <loc>' + site.domain + r.path + '</loc>');
    lines.push('    <lastmod>' + (r.lastmod || today) + '</lastmod>');
    lines.push('    <changefreq>' + (r.freq || 'monthly') + '</changefreq>');
    lines.push('    <priority>' + r.priority.toFixed(1) + '</priority>');
    lines.push('  </url>');
  }
  lines.push('</urlset>');
  lines.push('');
  return lines.join('\n');
}

function webmanifest() {
  return JSON.stringify({
    name: site.legalName,
    short_name: site.shortName,
    description: site.tagline,
    start_url: '/',
    display: 'browser',
    background_color: '#F7F5F0',
    theme_color: '#1E4A32',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
  }, null, 2);
}

function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#1E4A32"/>
<path d="M5 25 16 6l11 19z" fill="#F7F5F0" opacity=".92"/>
<path d="M11 25 16 16l5 9z" fill="#D8A22E"/>
</svg>`;
}

function htaccess() {
  return `# ---------------------------------------------------------------------------
# Ridgeline Lawn & Landscape - Apache config
# Works as-is on most cPanel / shared hosting. On Nginx, see README.
# ---------------------------------------------------------------------------

# Force HTTPS and a single canonical host (www). If the business prefers the
# bare domain, swap the two RewriteRule lines below.
<IfModule mod_rewrite.c>
  RewriteEngine On

  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  RewriteCond %{HTTP_HOST} !^www\. [NC]
  RewriteCond %{HTTP_HOST} !^localhost [NC]
  RewriteRule ^ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Trailing slash on directory URLs, so /services and /services/ do not
  # become two indexable pages.
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteCond %{REQUEST_URI} !\.[a-zA-Z0-9]{2,5}$
  RewriteRule ^(.*)$ /$1/ [L,R=301]
</IfModule>

ErrorDocument 404 /404.html

# HSTS. Only switch this on once HTTPS is confirmed working on every host.
# <IfModule mod_headers.c>
#   Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
# </IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css                "access plus 1 year"
  ExpiresByType application/javascript  "access plus 1 year"
  ExpiresByType image/jpeg              "access plus 1 year"
  ExpiresByType image/webp              "access plus 1 year"
  ExpiresByType image/avif              "access plus 1 year"
  ExpiresByType image/svg+xml           "access plus 1 year"
  ExpiresByType text/html               "access plus 0 seconds"
</IfModule>

AddType image/avif .avif
AddType image/webp .webp

# Uploads come in through estimate.php. Raise these if the 10 MB per-file
# limit is ever increased in src/data/site.mjs.
<IfModule mod_php.c>
  php_value upload_max_filesize 12M
  php_value post_max_size 100M
  php_value max_file_uploads 12
</IfModule>
`;
}

/* -- PHP handlers ---------------------------------------------------------
   Copied out of src/server/ with the real email address and site name
   substituted in, so the address lives in one place (src/data/site.mjs).
------------------------------------------------------------------------- */
function buildHandlers() {
  const dir = path.join(ROOT, 'src/server');
  if (!fs.existsSync(dir)) return 0;
  let n = 0;
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.php')) continue;
    const src = fs.readFileSync(path.join(dir, file), 'utf8')
      .replaceAll('ESTIMATE_EMAIL_PLACEHOLDER', site.email)
      .replaceAll('SITE_NAME_PLACEHOLDER', site.name);
    write(file, src);
    n++;
  }
  return n;
}

/* -- Routes --------------------------------------------------------------- */
function allRoutes() {
  const r = [
    { path: '/',               render: homePage,      priority: 1.0, freq: 'weekly' },
    { path: '/services/',      render: servicesHub,   priority: 0.9, freq: 'monthly' },
    { path: '/packages/',      render: packagesPage,  priority: 0.9, freq: 'monthly' },
    { path: '/portfolio/',     render: portfolioPage, priority: 0.8, freq: 'monthly' },
    { path: '/service-areas/', render: areasHub,      priority: 0.8, freq: 'monthly' },
    { path: '/about/',         render: aboutPage,     priority: 0.6, freq: 'yearly' },
    { path: '/reviews/',       render: reviewsPage,   priority: 0.6, freq: 'monthly' },
    { path: '/blog/',          render: blogIndex,     priority: 0.7, freq: 'weekly' },
    { path: '/faq/',           render: faqPage,       priority: 0.6, freq: 'monthly' },
    { path: '/contact/',       render: contactPage,   priority: 0.9, freq: 'monthly' }
  ];

  services.forEach((s) => r.push({
    path: `/services/${s.slug}/`, render: () => servicePage(s), priority: 0.8, freq: 'monthly'
  }));

  cities.forEach((c) => r.push({
    path: `/service-areas/${c.slug}/`, render: () => cityPage(c), priority: 0.8, freq: 'monthly'
  }));

  postsByDate.forEach((p) => r.push({
    path: `/blog/${p.slug}/`, render: () => blogPost(p), priority: 0.6, freq: 'yearly', lastmod: p.updated || p.date
  }));

  /* Not in the sitemap. */
  r.push({ path: '/thank-you/', render: thankYouPage, priority: 0, noindex: true });
  r.push({ path: '/404.html',   render: notFoundPage, priority: 0, noindex: true });

  return r;
}

/* -- Preflight warnings ---------------------------------------------------
   These print at the end of every build. They are the launch checklist.
------------------------------------------------------------------------- */
function preflight(imgReport) {
  if (!ratingIsPublishable()) {
    warnings.push(
      'REVIEWS ARE PLACEHOLDERS. ' + reviews.length + ' sample cards are showing, aggregateRating is ' +
      'suppressed in the schema, and /reviews/ is set to noindex. Fix: paste real reviews into ' +
      'src/data/reviews.mjs, fill reviewSummary, then set REVIEWS_ARE_REAL: true in src/data/site.mjs.'
    );
  }
  if (crewHasPlaceholders) {
    const n = crew.filter((c) => c.isPlaceholder).length;
    warnings.push(
      n + ' crew card' + (n === 1 ? ' is a placeholder' : 's are placeholders') +
      '. Replace or delete them in src/data/about.mjs. Do not ship invented people.'
    );
  }
  if (site.domain.includes('example.com')) {
    warnings.push(
      'DOMAIN IS STILL A PLACEHOLDER (' + site.domain + '). Canonicals, og:url and sitemap.xml all point ' +
      'at it. Set the real domain in src/data/site.mjs before launch.'
    );
  }
  if (site.email.includes('example.com')) {
    warnings.push('EMAIL IS STILL A PLACEHOLDER (' + site.email + '). Both PHP handlers send there.');
  }
  if (!site.address.street) {
    warnings.push(
      'No street address set. LocalBusiness schema is publishing city, state and ZIP only. That is valid ' +
      'for a service-area business, but if Ridgeline has a public address, add it in src/data/site.mjs.'
    );
  }
  if (imgReport.missing.length) {
    warnings.push(
      imgReport.missing.length + ' of ' + imgReport.total + ' photos are generated placeholders. ' +
      'Drop real files into src/assets/img/ using the exact base names, then rebuild. ' +
      'Run `npm run images` first if you want AVIF/WebP derivatives.'
    );
  }
  if (!Object.values(site.social).some(Boolean)) {
    warnings.push('No social profile URLs set, so sameAs is omitted from the schema. Add at least the Google Business Profile link.');
  }
}

/* -- Main ----------------------------------------------------------------- */
function main() {
  const t0 = Date.now();

  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  /* 1. Pages */
  const routes = allRoutes();
  for (const r of routes) {
    writePage(r.path, r.render());
  }

  /* 2. Assets */
  const css = copyDir(path.join(ROOT, 'src/assets/css'), path.join(DIST, 'assets/css'));
  const js  = copyDir(path.join(ROOT, 'src/assets/js'),  path.join(DIST, 'assets/js'));
  const im  = copyDir(path.join(ROOT, 'src/assets/img'), path.join(DIST, 'assets/img'));

  /* 3. Generated placeholder imagery for anything with no real photo yet */
  const imgReport = buildPlaceholders();

  /* 4. Server handlers */
  const handlers = buildHandlers();

  /* 5. Static root files */
  const indexable = routes.filter((r) => !r.noindex && r.priority > 0);
  write('sitemap.xml', sitemapXml(indexable));
  write('robots.txt', robotsTxt());
  write('site.webmanifest', webmanifest());
  write('favicon.svg', faviconSvg());
  fs.writeFileSync(path.join(DIST, 'apple-touch-icon.png'), touchIcon(180));
  written.push('apple-touch-icon.png');
  write('.htaccess', htaccess());

  /* 6. Report */
  preflight(imgReport);

  const pages = written.filter((f) => f.endsWith('.html')).length;
  const ms = Date.now() - t0;

  console.log('');
  console.log('  Ridgeline Lawn & Landscape');
  console.log('  ' + '-'.repeat(60));
  console.log('  ' + pages + ' pages built in ' + ms + 'ms');
  console.log('    ' + services.length + ' service pages');
  console.log('    ' + cities.length + ' city pages');
  console.log('    ' + postsByDate.length + ' blog posts');
  console.log('    ' + projects.length + ' gallery projects');
  console.log('  assets: ' + css + ' css, ' + js + ' js, ' + im + ' copied images, ' +
              imgReport.made + ' generated placeholders');
  console.log('  handlers: ' + handlers + ' php');
  console.log('  output: dist/');

  if (warnings.length) {
    console.log('');
    console.log('  BEFORE LAUNCH (' + warnings.length + ')');
    console.log('  ' + '-'.repeat(60));
    warnings.forEach((w, i) => {
      const wrapped = w.match(/.{1,74}(\s|$)/g) || [w];
      console.log('  ' + (i + 1) + '. ' + wrapped.map((l, j) => (j ? '     ' : '') + l.trim()).join('\n'));
    });
  }
  console.log('');
}

main();
