/* ---------------------------------------------------------------------------
   src/pages/services.mjs
   /services/            hub
   /services/<slug>/     one page per service
--------------------------------------------------------------------------- */

import { site } from '../data/site.mjs';
import { services } from '../data/services.mjs';
import { cities } from '../data/cities.mjs';
import { packageBySlug } from '../data/packages.mjs';
import { projects } from '../data/projects.mjs';
import { esc, map, picture } from '../lib/html.mjs';
import { layout } from '../lib/layout.mjs';
import { serviceSchema, faqSchema } from '../lib/schema.mjs';
import {
  pageHero, servicesGrid, ctaBand, faqAccordion, packageCards,
  relatedLinks, gallery, sectionHead, trustStrip
} from '../lib/components.mjs';

/* -- HUB ----------------------------------------------------------------- */
export function servicesHub() {
  const body = [
    pageHero({
      kicker: 'Services',
      title: 'Everything a property here needs, run by one crew',
      intro: 'Eight services, all in-house. We do not subcontract the work out to whoever had a truck free that week, which is why the finish looks the same in October as it did in April.'
    }),
    trustStrip(),
    servicesGrid({ heading: false }),
    `<section class="section section--prose">
      <div class="container container--narrow prose">
        <h2>How to choose</h2>
        <p>If your property mainly needs to look tidy, start with weekly mowing. If the lawn itself is the problem, thin, weedy or browning out every July, the fix is the six-step fertilization program with fall aeration and overseeding, and mowing alone will never get you there.</p>
        <p>If you want the yard to be different rather than just maintained, that is landscape design or hardscaping, and both start with a plan rather than a plant order. And if you have ever waited three days for a plow, sign a snow contract in August rather than in January.</p>
        <p>Most homeowners end up on a seasonal plan because bundling is cheaper than buying the same work one visit at a time. <a href="/packages/">Compare the plans</a>.</p>
      </div>
    </section>`,
    ctaBand()
  ].join('\n');

  return layout({
    title: 'Lawn & Landscape Services in Carmel, IN | Ridgeline',
    description: 'Weekly mowing, landscape design, cleanups, licensed weed control, paver patios, irrigation and snow removal across Carmel and Hamilton County.',
    path: '/services/',
    bodyClass: 'page-services',
    body,
    trail: [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }]
  });
}

/* -- SERVICE PAGE -------------------------------------------------------- */
export function servicePage(s) {
  const related = (s.relatedPackages || []).map((slug) => packageBySlug[slug]).filter(Boolean);
  const shots = projects.filter((p) => p.category === s.category).slice(0, 6);

  const bodySections = map(s.body, (b) => `
    <section class="prose__block">
      <h2>${esc(b.heading)}</h2>
      <p>${esc(b.text)}</p>
    </section>`);

  const includes = `<section class="section section--includes">
    <div class="container">
      <div class="includes">
        <div class="includes__col">
          <h2 class="includes__title">What is included</h2>
          <ul class="ticks">${map(s.includes, (i) => `<li>${esc(i)}</li>`)}</ul>
        </div>
        <div class="includes__col">
          <h2 class="includes__title">How it runs</h2>
          <ol class="steps">${map(s.process, (p, i) => `
            <li class="step">
              <span class="step__n" aria-hidden="true">${i + 1}</span>
              <div><h3 class="step__t">${esc(p.title)}</h3><p>${esc(p.text)}</p></div>
            </li>`)}</ol>
        </div>
      </div>
    </div>
  </section>`;

  const pricing = `<section class="section section--pricebox">
    <div class="container container--narrow">
      <div class="pricebox">
        <h2 class="pricebox__title">What it costs</h2>
        <p class="pricebox__note">${esc(s.pricingNote)}</p>
        ${related.length ? `<div class="pricebox__pkgs">${packageCards({ items: related, compact: true })}</div>` : ''}
        <p class="pricebox__foot"><a class="btn btn--gold" href="/contact/">Get a free estimate</a> <a class="btn btn--ghost" href="/packages/">Compare all plans</a></p>
      </div>
    </div>
  </section>`;

  const cityLinks = cities.map((c) => ({
    label: `${s.cityLabel} in ${c.displayName || c.name}`,
    href: `/service-areas/${c.slug}/`
  }));

  const body = [
    pageHero({
      kicker: 'Service',
      title: s.name,
      intro: s.lede,
      image: { base: s.image.base, alt: s.image.alt, w: 1600, h: 900 }
    }),
    `<section class="section section--prose"><div class="container container--narrow prose">${bodySections}</div></section>`,
    includes,
    shots.length ? gallery(shots, { heading: false }) : '',
    pricing,
    faqAccordion(s.faqs, { title: `${s.navLabel} questions`, kicker: 'FAQ' }),
    relatedLinks({ title: `${s.cityLabel} by city`, links: cityLinks }),
    servicesGrid({ heading: true, current: s.slug }),
    ctaBand()
  ].join('\n');

  return layout({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/services/${s.slug}/`,
    bodyClass: 'page-service',
    body,
    trail: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services/' },
      { label: s.navLabel, href: `/services/${s.slug}/` }
    ],
    schema: [serviceSchema(s), faqSchema(s.faqs)].filter(Boolean),
    ogImage: `/assets/img/${s.image.base}.jpg`
  });
}
