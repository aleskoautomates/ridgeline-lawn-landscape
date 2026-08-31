/* ---------------------------------------------------------------------------
   src/pages/faq.mjs  ->  /faq/
   General FAQs plus every service-specific question, grouped.
--------------------------------------------------------------------------- */

import { site } from '../data/site.mjs';
import { faqGroups } from '../data/faqs.mjs';
import { services } from '../data/services.mjs';
import { esc, map } from '../lib/html.mjs';
import { layout } from '../lib/layout.mjs';
import { faqSchema } from '../lib/schema.mjs';
import { pageHero, ctaBand } from '../lib/components.mjs';

export function faqPage() {
  const serviceGroups = services
    .filter((s) => s.faqs && s.faqs.length)
    .map((s) => ({ id: `svc-${s.slug}`, title: s.navLabel, href: `/services/${s.slug}/`, items: s.faqs }));

  const groups = [...faqGroups, ...serviceGroups];

  const toc = `<nav class="faqtoc" aria-label="Jump to a topic">
    <h2 class="faqtoc__title">Jump to</h2>
    <ul>${map(groups, (g) => `<li><a href="#${esc(g.id)}">${esc(g.title)}</a></li>`)}</ul>
  </nav>`;

  const sections = map(groups, (g) => `
    <section class="faqsec" id="${esc(g.id)}">
      <h2 class="faqsec__title">${esc(g.title)}${g.href ? ` <a class="faqsec__link" href="${esc(g.href)}">See the service</a>` : ''}</h2>
      <div class="faq">
        ${map(g.items, (f) => `<details class="faq__item">
          <summary class="faq__q"><span>${esc(f.q)}</span><span class="faq__icon" aria-hidden="true"></span></summary>
          <div class="faq__a"><p>${esc(f.a)}</p></div>
        </details>`)}
      </div>
    </section>`);

  const body = [
    pageHero({
      kicker: 'FAQ',
      title: 'Questions, answered straight',
      intro: `If the answer is not here, call ${site.phone}. We would rather tell you something is outside what we do than sell you a job we cannot do well.`,
      cta: false
    }),
    `<section class="section"><div class="container faqpage">${toc}<div class="faqpage__body">${sections}</div></div></section>`,
    ctaBand()
  ].join('\n');

  const schemaItems = groups.flatMap((g) => g.items);

  return layout({
    title: `FAQ | Lawn Care, Landscaping & Snow in Carmel, IN`,
    description: 'Answers on estimates, pricing tiers, licensing and insurance, scheduling, rain days, snow triggers and service areas across Carmel and Hamilton County.',
    path: '/faq/',
    bodyClass: 'page-faq',
    body,
    trail: [{ label: 'Home', href: '/' }, { label: 'FAQ', href: '/faq/' }],
    schema: [faqSchema(schemaItems)].filter(Boolean)
  });
}
