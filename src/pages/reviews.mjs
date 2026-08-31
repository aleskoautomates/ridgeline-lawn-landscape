/* ---------------------------------------------------------------------------
   src/pages/reviews.mjs  ->  /reviews/
--------------------------------------------------------------------------- */

import { site } from '../data/site.mjs';
import { reviews, reviewSummary } from '../data/reviews.mjs';
import { esc, map, formatDate } from '../lib/html.mjs';
import { layout } from '../lib/layout.mjs';
import { ratingIsPublishable } from '../lib/schema.mjs';
import { pageHero, stars, ctaBand, sectionHead, trustStrip } from '../lib/components.mjs';

export function reviewsPage() {
  const real = ratingIsPublishable();

  const warn = real ? '' : `<p class="notice notice--warn">
    <strong>Owner note, remove before launch:</strong> every card on this page is a sample, not a real customer review.
    Paste real reviews into <code>src/data/reviews.mjs</code>, set <code>reviewSummary</code> to the live count and average,
    then set <code>REVIEWS_ARE_REAL: true</code> in <code>src/data/site.mjs</code>. The rating is kept out of the page
    schema until you do, on purpose.
  </p>`;

  const summary = real ? `<div class="ratebox">
    <p class="ratebox__score">${esc(reviewSummary.average)}</p>
    ${stars(Math.round(reviewSummary.average))}
    <p class="ratebox__count">${esc(reviewSummary.count)} reviews on ${esc(reviewSummary.primarySource)}</p>
  </div>` : '';

  const list = `<section class="section">
    <div class="container">
      ${warn}
      ${summary}
      <ul class="reviewgrid">${map(reviews, (r) => `
        <li class="review review--full"${r.isPlaceholder ? ' data-placeholder="true"' : ''}>
          ${r.isPlaceholder ? '<span class="review__flag">Sample card</span>' : ''}
          ${stars(r.rating)}
          <blockquote class="review__body"><p>${esc(r.body)}</p></blockquote>
          <div class="review__who">
            <span class="review__avatar" aria-hidden="true">${esc(r.initials)}</span>
            <div>
              <p class="review__name">${esc(r.author)}</p>
              <p class="review__meta">${esc(r.city)}, IN &middot; ${esc(formatDate(r.date))} &middot; ${esc(r.source)}</p>
            </div>
          </div>
        </li>`)}</ul>
    </div>
  </section>`;

  const ask = `<section class="section section--prose">
    <div class="container container--narrow prose">
      <h2>Worked with us?</h2>
      <p>Reviews are how a local trade business gets found, and an honest one helps more than a glowing one. If something went wrong, call ${esc(site.phone)} first and give us the chance to fix it. We would rather solve it than read about it.</p>
    </div>
  </section>`;

  const body = [
    pageHero({
      kicker: 'Reviews',
      title: 'What clients say',
      intro: 'Fourteen years in the same seven communities means most of our work comes from people who already know us. Here is what they say about it.'
    }),
    trustStrip(),
    list,
    ask,
    ctaBand()
  ].join('\n');

  return layout({
    title: `Reviews | Ridgeline Lawn & Landscape, Carmel IN`,
    description: 'Customer reviews for Ridgeline Lawn & Landscape across Carmel, Fishers, Westfield, Zionsville and Noblesville, Indiana.',
    path: '/reviews/',
    bodyClass: 'page-reviews',
    body,
    trail: [{ label: 'Home', href: '/' }, { label: 'Reviews', href: '/reviews/' }],
    noindex: !real
  });
}
