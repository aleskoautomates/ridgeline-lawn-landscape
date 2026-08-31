/* ---------------------------------------------------------------------------
   src/pages/contact.mjs  ->  /contact/  plus /thank-you/ and /404.html
--------------------------------------------------------------------------- */

import { site } from '../data/site.mjs';
import { faqGroups } from '../data/faqs.mjs';
import { esc, map } from '../lib/html.mjs';
import { layout } from '../lib/layout.mjs';
import { faqSchema } from '../lib/schema.mjs';
import { pageHero, estimateForm, ctaBand, faqAccordion, trustStrip } from '../lib/components.mjs';

export function contactPage() {
  const estimateFaqs = faqGroups.find((g) => g.id === 'estimates').items;
  const c = site.credentials;

  const hours = map(site.hours, (h) =>
    `<div class="hours__row"><dt>${esc(h.label)}</dt><dd>${esc(h.time)}</dd></div>`);

  const sidebar = `<aside class="contactside">
    <div class="contactcard">
      <h2 class="contactcard__title">Call instead</h2>
      <p class="contactcard__phone"><a href="tel:${esc(site.phoneHref)}" data-call>${esc(site.phone)}</a></p>
      <p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
      <dl class="hours">${hours}</dl>
      <p class="contactcard__note">${esc(site.hoursNote)}</p>
    </div>
    <div class="contactcard">
      <h2 class="contactcard__title">Licensed and insured</h2>
      <ul class="creds creds--stack">
        <li>${esc(c.contractorNote)}</li>
        <li>${esc(c.generalLiability)} and ${esc(c.autoLiability)}, ${esc(c.insurer)}.</li>
        <li>${esc(c.workersComp)}</li>
        <li>${esc(c.applicatorLicense)}, licence ${esc(c.applicatorNumber)}.</li>
        <li>${esc(c.coiNote)}</li>
      </ul>
    </div>
    <div class="contactcard contactcard--areas">
      <h2 class="contactcard__title">Service area</h2>
      <p>Carmel, Fishers, Westfield, Zionsville, Noblesville, Whitestown, and north-side Indianapolis including Meridian-Kessler, Broad Ripple and Nora.</p>
      <p><a href="/service-areas/">See all service areas</a></p>
    </div>
  </aside>`;

  const body = [
    pageHero({
      kicker: 'Free estimate',
      title: 'Send a photo, skip the site visit',
      intro: 'Most residential quotes come back within 24 hours on a weekday, as a real number rather than a range. Two or three photos of the yard is usually all we need.',
      cta: false
    }),
    trustStrip(),
    `<section class="section section--contact">
      <div class="container contactgrid">
        <div class="contactgrid__form">${estimateForm({ id: 'estimate' })}</div>
        ${sidebar}
      </div>
    </section>`,
    faqAccordion(estimateFaqs, { title: 'Before you send it', kicker: 'FAQ' })
  ].join('\n');

  return layout({
    title: `Free Estimate | Ridgeline Lawn & Landscape, Carmel IN`,
    description: 'Get a free lawn care, landscaping or snow removal estimate in Carmel, Fishers, Westfield or Zionsville. Upload photos of your yard and get a real number in 24 hours.',
    path: '/contact/',
    bodyClass: 'page-contact',
    body,
    trail: [{ label: 'Home', href: '/' }, { label: 'Free Estimate', href: '/contact/' }],
    schema: [faqSchema(estimateFaqs)].filter(Boolean)
  });
}

export function thankYouPage() {
  const body = `<section class="section section--thanks">
    <div class="container container--narrow thanks">
      <span class="thanks__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" focusable="false"><circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="m14 24.5 7 7 13-15" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <h1>Got it. We are on the clock.</h1>
      <p class="thanks__lede">Your request is in. You will hear back within 24 hours on a weekday, and if you sent photos it will usually be with an actual number rather than a request for a site visit.</p>
      <p>If it is urgent, or a snow event is in the forecast, call <a href="tel:${esc(site.phoneHref)}" data-call>${esc(site.phone)}</a> instead of waiting on email.</p>
      <div class="thanks__actions">
        <a class="btn btn--green" href="/portfolio/">See recent projects</a>
        <a class="btn btn--ghost" href="/blog/">Read seasonal tips</a>
      </div>
    </div>
  </section>`;

  return layout({
    title: `Thank you | ${site.name}`,
    description: 'Your estimate request has been received. We reply within 24 hours on weekdays.',
    path: '/thank-you/',
    bodyClass: 'page-thanks',
    body,
    noindex: true
  });
}

export function notFoundPage() {
  const body = `<section class="section section--thanks">
    <div class="container container--narrow thanks">
      <h1>That page is not here</h1>
      <p class="thanks__lede">The link is either old or slightly wrong. Here is where most people are heading.</p>
      <div class="thanks__actions">
        <a class="btn btn--gold" href="/contact/">Get a free estimate</a>
        <a class="btn btn--ghost" href="/services/">All services</a>
        <a class="btn btn--ghost" href="/packages/">Packages and pricing</a>
        <a class="btn btn--ghost" href="/portfolio/">Portfolio</a>
      </div>
      <p>Or call <a href="tel:${esc(site.phoneHref)}" data-call>${esc(site.phone)}</a>.</p>
    </div>
  </section>`;

  return layout({
    title: `Page not found | ${site.name}`,
    description: 'That page could not be found.',
    path: '/404.html',
    bodyClass: 'page-404',
    body,
    noindex: true
  });
}
