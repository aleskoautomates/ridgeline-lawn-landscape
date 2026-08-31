/* ---------------------------------------------------------------------------
   src/pages/packages.mjs  ->  /packages/
--------------------------------------------------------------------------- */

import { site } from '../data/site.mjs';
import { packages, snowContractWindow } from '../data/packages.mjs';
import { faqGroups } from '../data/faqs.mjs';
import { esc, map } from '../lib/html.mjs';
import { layout } from '../lib/layout.mjs';
import { faqSchema } from '../lib/schema.mjs';
import {
  pageHero, packageCards, pricingTable, reserveForm,
  ctaBand, faqAccordion, sectionHead, trustStrip
} from '../lib/components.mjs';

export function packagesPage() {
  const pricingFaqs = faqGroups.find((g) => g.id === 'pricing').items;

  const compare = `<section class="section section--compare">
    <div class="container">
      ${sectionHead({
        kicker: 'Side by side',
        title: 'What each plan actually covers',
        intro: 'The difference between plans is not service quality. It is scope. Every plan gets the same crew and the same standard.'
      })}
      <div class="table-scroll">
        <table class="cmp">
          <caption class="u-visually-hidden">Comparison of seasonal plans</caption>
          <thead>
            <tr>
              <th scope="col">Included</th>
              <th scope="col">Curb Appeal</th>
              <th scope="col">Full Season</th>
              <th scope="col">Estate</th>
            </tr>
          </thead>
          <tbody>
            ${map([
              ['Weekly mowing, trimming, edging, blow down', 1, 1, 1],
              ['Six-step fertilization and weed control', 0, 1, 1],
              ['Core aeration and overseeding', 0, 1, 1],
              ['Spring cleanup', 0, 1, 1],
              ['Fall cleanup with leaf haul-away', 0, 1, 1],
              ['Shrub trimming', 0, '1 round', '2 rounds'],
              ['Irrigation startup and blowout', 0, 0, 1],
              ['Seasonal colour rotations', 0, 0, 1],
              ['Mulch refresh', 0, 0, 1],
              ['Priority scheduling', 0, 0, 1],
              ['Coverage window', 'Apr\u2013Oct', 'Apr\u2013Nov', 'Year-round']
            ], (row) => `<tr><th scope="row">${esc(row[0])}</th>${
              row.slice(1).map((v) => {
                if (v === 1) return '<td><span class="yes" role="img" aria-label="Included">&#10003;</span></td>';
                if (v === 0) return '<td><span class="no" role="img" aria-label="Not included">&ndash;</span></td>';
                return `<td>${esc(v)}</td>`;
              }).join('')
            }</tr>`)}
          </tbody>
        </table>
      </div>
      <p class="cmp__note">Snow removal is a separate Winter Watch contract on every plan, including Estate.</p>
    </div>
  </section>`;

  const snow = `<section class="section section--snowbox">
    <div class="container container--narrow">
      <div class="snowbox">
        <p class="kicker kicker--light">Winter Watch</p>
        <h2 class="snowbox__title">Snow contracts open ${esc(snowContractWindow.opens)} and close ${esc(snowContractWindow.closes)}</h2>
        <p>Routes are geographic and finite. Once a route fills it is full, and calling during a storm does not change that. Service runs ${esc(snowContractWindow.seasonStart)} through ${esc(snowContractWindow.seasonEnd)} with 24/7 response for contract clients.</p>
        <p><a class="btn btn--gold" href="#reserve">Lock in my route</a></p>
      </div>
    </div>
  </section>`;

  const body = [
    pageHero({
      kicker: 'Seasonal packages',
      title: 'Lock in your spot, not just a quote',
      intro: 'A plan buys a standing slot on a crew\u2019s week. That is the part that matters in May when the routes are full and in January when the plows are out.',
      cta: false
    }),
    trustStrip(),
    `<section class="section section--pkglist"><div class="container">${packageCards()}</div></section>`,
    compare,
    `<section class="section section--tiers"><div class="container container--narrow">${pricingTable()}</div></section>`,
    snow,
    `<section class="section section--reserve"><div class="container container--narrow">${reserveForm({ id: 'reserve', title: 'Reserve My Spot' })}</div></section>`,
    faqAccordion(pricingFaqs, { title: 'Pricing questions', kicker: 'FAQ' }),
    ctaBand({
      title: 'Bigger property, or not sure which plan?',
      text: 'Send photos and the address. We measure from an aerial and tell you which plan actually fits, including when the answer is the cheaper one.'
    })
  ].join('\n');

  return layout({
    title: `Seasonal Lawn Care Packages & Pricing | Carmel, IN`,
    description: 'Curb Appeal from $189/mo, Full Season from $339/mo, Estate from $579/mo, and Winter Watch snow contracts from $495/season. Lot size tiers and what each plan covers.',
    path: '/packages/',
    bodyClass: 'page-packages',
    body,
    trail: [{ label: 'Home', href: '/' }, { label: 'Packages', href: '/packages/' }],
    schema: [faqSchema(pricingFaqs)].filter(Boolean)
  });
}
