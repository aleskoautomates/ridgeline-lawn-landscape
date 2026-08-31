/* ---------------------------------------------------------------------------
   src/lib/layout.mjs
   The page shell: <head>, sticky header, footer. Every page renders through
   `layout()`.
--------------------------------------------------------------------------- */

import { site, nav, footerNav, seasonalBanner } from '../data/site.mjs';
import { services } from '../data/services.mjs';
import { cities } from '../data/cities.mjs';
import { esc, jsonLd, map } from './html.mjs';
import { localBusiness, webSiteSchema, breadcrumbSchema } from './schema.mjs';

/* Is the seasonal banner live right now? */
export function bannerIsActive(today = new Date()) {
  if (!seasonalBanner.active) return false;
  if (!seasonalBanner.expires) return true;
  const [y, m, d] = seasonalBanner.expires.split('-').map(Number);
  return today <= new Date(y, m - 1, d, 23, 59, 59);
}

function resolveLinks(spec) {
  if (spec === 'services') {
    return services.map((s) => ({ label: s.navLabel, href: `/services/${s.slug}/` }));
  }
  if (spec === 'cities') {
    return cities.map((c) => ({ label: c.displayName || c.name, href: `/service-areas/${c.slug}/` }));
  }
  return spec || [];
}

const phoneLink = (label, className) =>
  `<a class="${className}" href="tel:${esc(site.phoneHref)}" data-call>${label}</a>`;

/* -- HEADER -------------------------------------------------------------- */
function header(current) {
  const items = map(nav, (item) => {
    const kids = item.children ? resolveLinks(item.children) : null;
    const isCurrent = current === item.href || (current || '').startsWith(item.href) && item.href !== '/';
    const aria = isCurrent ? ' aria-current="page"' : '';
    if (!kids) {
      return `<li class="nav__item"><a class="nav__link" href="${esc(item.href)}"${aria}>${esc(item.label)}</a></li>`;
    }
    const id = `submenu-${item.href.replace(/\W+/g, '')}`;
    return `<li class="nav__item nav__item--has-sub">
      <a class="nav__link" href="${esc(item.href)}"${aria}>${esc(item.label)}</a>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="${id}">
        <span class="u-visually-hidden">Show ${esc(item.label)} pages</span>
        <svg viewBox="0 0 12 8" aria-hidden="true" focusable="false"><path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <ul class="subnav" id="${id}">
        ${map(kids, (k) => `<li><a href="${esc(k.href)}">${esc(k.label)}</a></li>`)}
      </ul>
    </li>`;
  });

  return `<header class="site-header" id="site-header" data-header>
  <div class="site-header__bar container">
    <a class="brand" href="/">
      <span class="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" focusable="false"><path d="M4 26 16 6l12 20z" fill="currentColor" opacity=".9"/><path d="M10 26 16 15l6 11z" fill="var(--gold)"/></svg>
      </span>
      <span class="brand__text">
        <span class="brand__name">Ridgeline</span>
        <span class="brand__sub">Lawn &amp; Landscape</span>
      </span>
    </a>

    <nav class="nav" id="primary-nav" aria-label="Main">
      <ul class="nav__list">${items}</ul>
    </nav>

    <div class="site-header__actions">
      ${phoneLink(`<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.5 2.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5L13.5 11l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 2.5 4.7 2 2 0 0 1 4.5 2.5z" fill="currentColor"/></svg><span class="btn__label">${esc(site.phone)}</span>`, 'btn btn--ghost btn--call')}
      <a class="btn btn--gold" href="/contact/"><span class="btn__full">Get a Free Estimate</span><span class="btn__short">Free Estimate</span></a>
      <button class="nav-burger" type="button" aria-expanded="false" aria-controls="primary-nav" data-burger>
        <span class="u-visually-hidden">Menu</span>
        <span class="nav-burger__bars" aria-hidden="true"><i></i><i></i><i></i></span>
      </button>
    </div>
  </div>
</header>`;
}

/* -- FOOTER -------------------------------------------------------------- */
function footer() {
  const cols = map(footerNav, (col) => {
    const links = resolveLinks(col.links);
    return `<div class="footer__col">
      <h2 class="footer__heading">${esc(col.title)}</h2>
      <ul class="footer__list">${map(links, (l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)}</ul>
    </div>`;
  });

  const hours = map(site.hours, (h) =>
    `<div class="hours__row"><dt>${esc(h.label)}</dt><dd>${esc(h.time)}</dd></div>`);

  const socials = Object.entries(site.social).filter(([, v]) => v);
  const socialHtml = socials.length
    ? `<ul class="footer__social">${map(socials, ([k, v]) =>
        `<li><a href="${esc(v)}" rel="noopener">${esc(k[0].toUpperCase() + k.slice(1))}</a></li>`)}</ul>`
    : '';

  const c = site.credentials;

  return `<footer class="site-footer">
  <div class="container site-footer__grid">
    <div class="footer__col footer__col--nap">
      <p class="footer__brand">${esc(site.legalName)}</p>
      <p class="footer__tagline">Lawn care, landscape builds and snow removal across Hamilton and Boone County since ${site.founded}.</p>
      <address class="footer__nap">
        <p class="footer__phone">${phoneLink(esc(site.phone), 'footer__phonelink')}</p>
        <p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
        <p>${esc(site.address.locality)}, ${esc(site.address.region)} ${esc(site.address.postalCode)}</p>
      </address>
      <dl class="hours">${hours}</dl>
      <p class="footer__hoursnote">${esc(site.hoursNote)}</p>
      ${socialHtml}
    </div>
    ${cols}
  </div>

  <div class="container footer__credentials">
    <h2 class="footer__heading">Licensed and insured</h2>
    <ul class="creds">
      <li>${esc(c.contractorNote)}</li>
      <li>${esc(c.generalLiability)} and ${esc(c.autoLiability)} through ${esc(c.insurer)}.</li>
      <li>${esc(c.workersComp)}</li>
      <li>${esc(c.applicatorLicense)}, licence ${esc(c.applicatorNumber)}.</li>
      <li>${esc(c.coiNote)}</li>
    </ul>
  </div>

  <div class="container footer__legal">
    <p>&copy; ${new Date().getFullYear()} ${esc(site.legalName)}. All rights reserved.</p>
    <p><a href="/sitemap.xml">Sitemap</a></p>
  </div>
</footer>

<a class="call-fab" href="tel:${esc(site.phoneHref)}" data-call>
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.5 2.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5L13.5 11l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 2.5 4.7 2 2 0 0 1 4.5 2.5z" fill="currentColor"/></svg>
  <span>Call ${esc(site.phone)}</span>
</a>`;
}

/* -- BREADCRUMBS --------------------------------------------------------- */
function breadcrumbs(trail) {
  if (!trail || trail.length < 2) return '';
  const items = trail.map((t, i) => {
    const last = i === trail.length - 1;
    return last
      ? `<li aria-current="page">${esc(t.label)}</li>`
      : `<li><a href="${esc(t.href)}">${esc(t.label)}</a></li>`;
  }).join('');
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><div class="container"><ol>${items}</ol></div></nav>`;
}

/* -- PAGE SHELL ----------------------------------------------------------
   layout({
     title, description, path, body,
     trail, schema, bodyClass, ogImage, noindex
   })
------------------------------------------------------------------------- */
export function layout(opts) {
  const {
    title,
    description,
    path: pagePath = '/',
    body = '',
    trail = null,
    schema = [],
    bodyClass = '',
    ogImage = '/assets/img/og-default.jpg',
    noindex = false
  } = opts;

  const canonical = `${site.domain}${pagePath}`;
  const blocks = [localBusiness(), webSiteSchema(), ...(Array.isArray(schema) ? schema : [schema])];
  const crumbSchema = breadcrumbSchema(trail);
  if (crumbSchema) blocks.push(crumbSchema);

  const schemaHtml = blocks
    .filter(Boolean)
    .map((b) => `<script type="application/ld+json">${jsonLd(b)}</script>`)
    .join('\n');

  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(site.domain + ogImage)}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">

<meta name="theme-color" content="#1E4A32">
<meta name="geo.region" content="US-IN">
<meta name="geo.placename" content="Carmel, Indiana">
<meta name="geo.position" content="${site.geo.lat};${site.geo.lng}">
<meta name="ICBM" content="${site.geo.lat}, ${site.geo.lng}">

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600;8..60,700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600;8..60,700&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600;8..60,700&display=swap"></noscript>

<link rel="stylesheet" href="/assets/css/site.css">
${schemaHtml}
</head>
<body class="${esc(bodyClass)}">
<a class="skip-link" href="#main">Skip to content</a>
${header(pagePath)}
${breadcrumbs(trail)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/site.js" defer></script>
${site.analyticsSnippet || ''}
</body>
</html>`;
}
