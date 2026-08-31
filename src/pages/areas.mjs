/* ---------------------------------------------------------------------------
   src/pages/areas.mjs
   /service-areas/            hub
   /service-areas/<slug>/     one page per city
   H1 pattern required by the brief: "[Service] in [City], Indiana".
--------------------------------------------------------------------------- */

import { site } from '../data/site.mjs';
import { cities } from '../data/cities.mjs';
import { serviceBySlug, services } from '../data/services.mjs';
import { projectsByCity } from '../data/projects.mjs';
import { esc, map, picture } from '../lib/html.mjs';
import { layout } from '../lib/layout.mjs';
import { cityServiceSchema } from '../lib/schema.mjs';
import {
  pageHero, serviceAreaMap, ctaBand, gallery, trustStrip,
  sectionHead, relatedLinks, packageCards
} from '../lib/components.mjs';

/* -- HUB ----------------------------------------------------------------- */
export function areasHub() {
  const cards = map(cities, (c) => `
    <li class="citycard">
      <a href="/service-areas/${esc(c.slug)}/">
        <h2 class="citycard__name">${esc(c.displayName || c.name)}${c.isHome ? '<span class="citycard__flag">Home base</span>' : ''}</h2>
        <p class="citycard__county">${esc(c.county)}, Indiana</p>
        <p class="citycard__intro">${esc(c.intro.split('. ')[0])}.</p>
        <span class="citycard__more" aria-hidden="true">See ${esc(c.name)} services &rarr;</span>
      </a>
    </li>`);

  const body = [
    pageHero({
      kicker: 'Service areas',
      title: 'Where Ridgeline works',
      intro: 'Carmel, Fishers, Westfield, Zionsville, Noblesville, Whitestown and the north side of Indianapolis. Routes are geographic, which is what keeps your service day consistent.'
    }),
    trustStrip(),
    `<section class="section"><div class="container"><ul class="citycards">${cards}</ul></div></section>`,
    serviceAreaMap(),
    ctaBand()
  ].join('\n');

  return layout({
    title: `Service Areas | Carmel, Fishers, Westfield & Zionsville, IN`,
    description: 'Ridgeline serves Carmel, Fishers, Westfield, Zionsville, Noblesville, Whitestown and the north side of Indianapolis including Broad Ripple and Nora.',
    path: '/service-areas/',
    bodyClass: 'page-areas',
    body,
    trail: [{ label: 'Home', href: '/' }, { label: 'Service Areas', href: '/service-areas/' }]
  });
}

/* -- CITY PAGE ----------------------------------------------------------- */
export function cityPage(c) {
  const cityName = c.displayName || c.name;
  const h1 = `${c.h1Service} in ${c.name === 'North Indianapolis' ? 'North Indianapolis' : c.name}, Indiana`;

  const featured = (c.featuredServices || []).map((slug) => serviceBySlug[slug]).filter(Boolean);
  const local = projectsByCity(c.slug);

  const svcCards = `<section class="section section--citysvcs">
    <div class="container">
      ${sectionHead({
        kicker: `${cityName} services`,
        title: `What we do most in ${cityName}`,
        intro: `Every service is available here. These four are the ones ${cityName} properties ask for most.`
      })}
      <ul class="stiles">${map(featured, (s) => `
        <li class="stile">
          <a class="stile__link" href="/services/${esc(s.slug)}/">
            <span class="stile__media">${picture({ base: s.image.base, alt: s.image.alt, w: 800, h: 600, sizes: '(max-width: 640px) 100vw, 50vw' })}</span>
            <span class="stile__body">
              <span class="stile__title">${esc(s.cityLabel)} in ${esc(cityName)}</span>
              <span class="stile__tag">${esc(s.tagline)}</span>
              <span class="stile__more" aria-hidden="true">View service &rarr;</span>
            </span>
          </a>
        </li>`)}</ul>
    </div>
  </section>`;

  const localInfo = `<section class="section section--localinfo">
    <div class="container container--narrow">
      <div class="localinfo">
        <div>
          <h2 class="localinfo__title">Serving ${esc(cityName)}</h2>
          <dl class="localinfo__dl">
            <div><dt>County</dt><dd>${esc(c.county)}, Indiana</dd></div>
            <div><dt>ZIP codes</dt><dd>${esc(c.zips.join(', '))}</dd></div>
            <div><dt>Areas covered</dt><dd>${esc(c.landmarks.join(' &middot; ').replace(/&middot;/g, '\u00b7'))}</dd></div>
            <div><dt>Hardiness zone</dt><dd>USDA Zone 6a</dd></div>
            <div><dt>Phone</dt><dd><a href="tel:${esc(site.phoneHref)}" data-call>${esc(site.phone)}</a></dd></div>
          </dl>
        </div>
      </div>
    </div>
  </section>`;

  const otherCities = cities
    .filter((x) => x.slug !== c.slug)
    .map((x) => ({ label: x.displayName || x.name, href: `/service-areas/${x.slug}/` }));

  const body = [
    pageHero({
      kicker: `${c.county}, Indiana`,
      title: h1,
      intro: c.intro
    }),
    trustStrip(),
    `<section class="section section--prose"><div class="container container--narrow prose">${map(c.body, (p) => `<p>${esc(p)}</p>`)}</div></section>`,
    svcCards,
    local.length ? gallery(local, { heading: false }) : '',
    localInfo,
    `<section class="section section--citypkgs"><div class="container">${sectionHead({
      kicker: 'Plans',
      title: `Seasonal plans for ${cityName} properties`,
      intro: 'Lock a route slot rather than calling for one-off visits. Routes here fill through spring, and snow routes fill in the fall.'
    })}${packageCards({ compact: true })}</div></section>`,
    relatedLinks({ title: 'Other communities we serve', links: otherCities }),
    ctaBand({
      title: `Free ${cityName} estimate in 24 hours.`,
      text: `Send two or three photos of your ${cityName} property and we will send back a real number, usually without a site visit.`
    })
  ].join('\n');

  return layout({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/service-areas/${c.slug}/`,
    bodyClass: 'page-city',
    body,
    trail: [
      { label: 'Home', href: '/' },
      { label: 'Service Areas', href: '/service-areas/' },
      { label: cityName, href: `/service-areas/${c.slug}/` }
    ],
    schema: [cityServiceSchema(c)]
  });
}
