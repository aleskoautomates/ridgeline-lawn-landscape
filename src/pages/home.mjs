/* ---------------------------------------------------------------------------
   src/pages/home.mjs  ->  /index.html
   Section order is fixed by the brief. If you reorder anything, reorder it
   here, not in the CSS.
--------------------------------------------------------------------------- */

import { site } from '../data/site.mjs';
import { services } from '../data/services.mjs';
import { packages } from '../data/packages.mjs';
import { featuredProject, beforeAfterProjects } from '../data/projects.mjs';
import { homepageFaqs } from '../data/faqs.mjs';
import { about } from '../data/about.mjs';
import { esc, picture, map } from '../lib/html.mjs';
import { layout } from '../lib/layout.mjs';
import { faqSchema } from '../lib/schema.mjs';
import {
  seasonalBannerSection, servicesGrid, beforeAfter, projectSpotlight,
  packageCards, reserveForm, reviewsCarousel, serviceAreaMap,
  faqAccordion, ctaBand, trustStrip, sectionHead
} from '../lib/components.mjs';

function hero() {
  return `<section class="hero">
  <div class="hero__media">
    ${picture({
      base: 'paver-patio-zionsville-firepit',
      alt: 'Tumbled paver patio with a circular fire pit, curved seat wall and layered plantings behind a Zionsville, Indiana home at dusk.',
      w: 1920,
      h: 1080,
      sizes: '100vw',
      priority: true
    })}
  </div>
  <div class="hero__scrim" aria-hidden="true"></div>
  <div class="container hero__inner">
    <h1 class="hero__title">Carmel&rsquo;s Lawn and Landscape Crew for ${site.yearsInBusiness} Years.</h1>
    <p class="hero__sub">Weekly mowing, full landscape builds, and snow that gets cleared before your first coffee.</p>
    <div class="hero__actions">
      <a class="btn btn--gold btn--lg" href="/contact/">Get a Free Estimate</a>
      <a class="btn btn--outline btn--lg" href="tel:${esc(site.phoneHref)}" data-call>Call ${esc(site.phone)}</a>
    </div>
    <p class="hero__proof">Licensed Indiana contractor &middot; ${esc(site.credentials.generalLiability)} &middot; Estimates back in 24 hours</p>
  </div>
</section>`;
}

function packagesSection() {
  return `<section class="section section--packages" id="packages">
  <div class="container">
    ${sectionHead({
      kicker: 'Seasonal plans',
      title: 'Lock in your spot for the season',
      intro: 'Routes are finite. A plan is not just a discount, it is a standing slot on a crew\u2019s week that somebody else cannot take.'
    })}
    ${packageCards()}
    <div class="packages__foot">
      <p class="packages__note">Prices assume lots up to a quarter acre. Larger lots and commercial properties are quoted on the <a href="/packages/">pricing page</a>.</p>
    </div>
    ${reserveForm({ id: 'reserve', title: 'Reserve My Spot' })}
  </div>
</section>`;
}

function crewSection() {
  return `<section class="section section--crew">
  <div class="container crewblock">
    <div class="crewblock__media">
      ${picture({ base: about.crewPhoto.base, alt: about.crewPhoto.alt, w: about.crewPhoto.w, h: about.crewPhoto.h, sizes: '(max-width: 900px) 100vw, 50vw' })}
    </div>
    <div class="crewblock__body">
      <p class="kicker">Who we are</p>
      <h2 class="crewblock__title">${esc(about.headline)}</h2>
      <p>${esc(about.lede)}</p>
      <p>${esc(about.story[1].text)}</p>
      <a class="btn btn--green" href="/about/">Meet the crew</a>
    </div>
  </div>
</section>`;
}

export function homePage() {
  const body = [
    hero(),
    seasonalBannerSection(),
    trustStrip(),
    servicesGrid(),
    beforeAfter(beforeAfterProjects),
    projectSpotlight(featuredProject),
    packagesSection(),
    reviewsCarousel(),
    serviceAreaMap(),
    crewSection(),
    faqAccordion(homepageFaqs, { title: 'Questions we get every week' }),
    ctaBand()
  ].join('\n');

  return layout({
    title: 'Lawn Care & Landscaping in Carmel, IN | Ridgeline',
    description:
      `Weekly mowing, landscape design, paver patios and snow removal in Carmel, Fishers, Westfield and Zionsville. ${site.yearsInBusiness} years, licensed and insured.`,
    path: '/',
    bodyClass: 'page-home',
    body,
    schema: [faqSchema(homepageFaqs)].filter(Boolean)
  });
}
