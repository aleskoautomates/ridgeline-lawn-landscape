/* ---------------------------------------------------------------------------
   src/lib/components.mjs
   Reusable page sections. Everything here returns an HTML string.
--------------------------------------------------------------------------- */

import { site, seasonalBanner } from '../data/site.mjs';
import { services } from '../data/services.mjs';
import { packages, pricingTiers, pricingNotes } from '../data/packages.mjs';
import { galleryCategories } from '../data/projects.mjs';
import { cities } from '../data/cities.mjs';
import { reviews } from '../data/reviews.mjs';
import { esc, map, picture, img, formatDate } from './html.mjs';
import { bannerIsActive } from './layout.mjs';

/* -- Small building blocks ---------------------------------------------- */

export function sectionHead({ kicker, title, intro, align = 'left', level = 2 }) {
  return `<div class="sec-head sec-head--${align}">
    ${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}
    <h${level} class="sec-head__title">${esc(title)}</h${level}>
    ${intro ? `<p class="sec-head__intro">${esc(intro)}</p>` : ''}
  </div>`;
}

export function stars(n = 5) {
  const star = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m10 1.8 2.4 5 5.5.8-4 3.8 1 5.4-4.9-2.6-4.9 2.6 1-5.4-4-3.8 5.5-.8z" fill="currentColor"/></svg>';
  return `<span class="stars" role="img" aria-label="${n} out of 5 stars">${star.repeat(n)}</span>`;
}

/* -- Seasonal banner ----------------------------------------------------- */
export function seasonalBannerSection() {
  if (!bannerIsActive()) return '';
  return `<aside class="seasonal" aria-label="Current seasonal offer">
    <div class="container seasonal__inner">
      <span class="seasonal__flag" aria-hidden="true">
        <svg viewBox="0 0 20 20" focusable="false"><path d="M4 2v16M4 3h11l-2.2 3.4L15 10H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
      </span>
      <p class="seasonal__text">${esc(seasonalBanner.text)}</p>
      <a class="seasonal__cta" href="${esc(seasonalBanner.ctaHref)}">${esc(seasonalBanner.ctaLabel)}<span aria-hidden="true"> &rarr;</span></a>
    </div>
  </aside>`;
}

/* -- Services grid (photo tiles, not icons) ------------------------------ */
export function servicesGrid({ items = services, heading = true, current = null } = {}) {
  const tiles = map(items.filter((s) => s.slug !== current), (s) => `
    <li class="stile">
      <a class="stile__link" href="/services/${esc(s.slug)}/">
        <span class="stile__media">
          ${picture({ base: s.image.base, alt: s.image.alt, w: 800, h: 600, sizes: '(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw' })}
        </span>
        <span class="stile__body">
          <span class="stile__title">${esc(s.navLabel)}</span>
          <span class="stile__tag">${esc(s.tagline)}</span>
          <span class="stile__more" aria-hidden="true">View service &rarr;</span>
        </span>
      </a>
    </li>`);

  return `<section class="section section--services" id="services">
    <div class="container">
      ${heading ? sectionHead({
        kicker: 'What we do',
        title: 'Eight services, one crew, one standard',
        intro: 'Everything below is run in-house. Nothing gets subcontracted out to whoever was available that week.'
      }) : ''}
      <ul class="stiles">${tiles}</ul>
    </div>
  </section>`;
}

/* -- Package cards ------------------------------------------------------- */
export function packageCards({ items = packages, compact = false } = {}) {
  return `<ul class="pkgs${compact ? ' pkgs--compact' : ''}">${map(items, (p) => `
    <li class="pkg${p.popular ? ' pkg--popular' : ''}${p.isWinter ? ' pkg--winter' : ''}">
      ${p.badge ? `<span class="pkg__badge">${esc(p.badge)}</span>` : ''}
      <h3 class="pkg__name">${esc(p.name)}</h3>
      <p class="pkg__price"><span class="pkg__amount">${esc(p.price)}</span><span class="pkg__unit">${esc(p.unit)}</span></p>
      ${p.altPrice ? `<p class="pkg__alt">${esc(p.altPrice)}</p>` : ''}
      <p class="pkg__window">${esc(p.window)}</p>
      <p class="pkg__summary">${esc(p.summary)}</p>
      <ul class="pkg__list">${map(p.includes, (i) => `<li>${esc(i)}</li>`)}</ul>
      ${p.urgency ? `<p class="pkg__urgency">${esc(p.urgency)}</p>` : ''}
      <a class="btn ${p.popular ? 'btn--gold' : 'btn--green'} pkg__cta" href="#reserve" data-package="${esc(p.slug)}">${esc(p.ctaLabel)}</a>
      <p class="pkg__best"><strong>Best for:</strong> ${esc(p.bestFor)}</p>
    </li>`)}</ul>`;
}

export function pricingTable() {
  return `<div class="tiers">
    <h3 class="tiers__title">Lot size tiers</h3>
    <div class="table-scroll">
      <table class="tiers__table">
        <caption class="u-visually-hidden">Price adjustment by lot size</caption>
        <thead><tr><th scope="col">Lot size</th><th scope="col">Adjustment</th><th scope="col">Typical</th></tr></thead>
        <tbody>${map(pricingTiers, (t) => `<tr><th scope="row">${esc(t.size)}</th><td>${esc(t.adjustment)}</td><td>${esc(t.note)}</td></tr>`)}</tbody>
      </table>
    </div>
    <ul class="tiers__notes">${map(pricingNotes, (n) => `<li>${esc(n)}</li>`)}</ul>
  </div>`;
}

/* -- Before / after slider ----------------------------------------------
   Built on a range input so it is keyboard operable and screen-reader
   announced for free. The pointer drag in site.js just drives the same
   input. Both images are real <img> tags, so if JS never loads the visitor
   still sees the "after" photo rather than an empty box.
------------------------------------------------------------------------- */
export function beforeAfter(items) {
  if (!items || !items.length) return '';

  const panels = map(items, (p, i) => {
    const ba = p.beforeAfter;
    return `<div class="ba__panel${i === 0 ? ' is-active' : ''}" id="ba-panel-${i}" role="tabpanel" aria-labelledby="ba-tab-${i}"${i === 0 ? '' : ' hidden'}>
      <div class="ba" data-ba style="--pos:50%">
        <div class="ba__frame">
          <div class="ba__img ba__img--after">
            ${img({ base: ba.after.base, alt: ba.after.alt, w: ba.after.w, h: ba.after.h })}
            <span class="ba__label ba__label--after">After</span>
          </div>
          <div class="ba__img ba__img--before" data-ba-before>
            ${img({ base: ba.before.base, alt: ba.before.alt, w: ba.before.w, h: ba.before.h })}
            <span class="ba__label ba__label--before">Before</span>
          </div>
          <div class="ba__handle" data-ba-handle aria-hidden="true"><span></span></div>
        </div>
        <label class="ba__control">
          <span class="u-visually-hidden">Reveal the before photo for ${esc(p.title)}. Left shows more of the after photo, right shows more of the before photo.</span>
          <input type="range" min="0" max="100" value="50" step="1" data-ba-range>
        </label>
      </div>
      <div class="ba__meta">
        <h3 class="ba__title">${esc(p.title)}</h3>
        <p class="ba__where">${esc(ba.label)}</p>
        <p class="ba__blurb">${esc(p.blurb)}</p>
      </div>
    </div>`;
  });

  const tabs = map(items, (p, i) =>
    `<button class="ba__tab${i === 0 ? ' is-active' : ''}" type="button" role="tab" id="ba-tab-${i}" aria-controls="ba-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? '0' : '-1'}">${esc(p.city)}</button>`);

  return `<section class="section section--ba" id="before-after">
    <div class="container">
      ${sectionHead({
        kicker: 'Before and after',
        title: 'Three properties, three problems, one season each',
        intro: 'Drag the handle, or use the arrow keys, to see what changed.'
      })}
      <div class="ba__tabs" role="tablist" aria-label="Before and after projects" data-ba-tabs>${tabs}</div>
      <div class="ba__panels">${panels}</div>
    </div>
  </section>`;
}

/* -- Featured project spotlight ------------------------------------------ */
export function projectSpotlight(p) {
  if (!p || !p.story) return '';
  return `<section class="section section--spotlight">
    <div class="container spotlight">
      <div class="spotlight__media">
        ${picture({ base: p.image.base, alt: p.image.alt, w: p.image.w, h: p.image.h, sizes: '(max-width: 900px) 100vw, 55vw' })}
      </div>
      <div class="spotlight__body">
        <p class="kicker">Featured project &middot; ${esc(p.city)}, Indiana</p>
        <h2 class="spotlight__title">${esc(p.title)}</h2>
        <dl class="spotlight__story">
          <dt>The problem</dt><dd>${esc(p.story.problem)}</dd>
          <dt>What we did</dt><dd>${esc(p.story.did)}</dd>
          <dt>The result</dt><dd>${esc(p.story.result)}</dd>
        </dl>
        <a class="btn btn--green" href="/portfolio/">See the full portfolio</a>
      </div>
    </div>
  </section>`;
}

/* -- Filterable gallery with lightbox ------------------------------------ */
export function gallery(projects, { heading = true } = {}) {
  const filters = map(galleryCategories, (c, i) =>
    `<button class="filter${i === 0 ? ' is-active' : ''}" type="button" data-filter="${esc(c.id)}" aria-pressed="${i === 0}">${esc(c.label)}</button>`);

  const items = map(projects, (p, i) => `
    <li class="gitem" data-category="${esc(p.category)}">
      <button class="gitem__btn" type="button"
        data-lightbox="${i}"
        data-full="/assets/img/${esc(p.image.base)}"
        data-alt="${esc(p.image.alt)}"
        data-title="${esc(p.title)}"
        data-city="${esc(p.city)}, Indiana"
        data-blurb="${esc(p.blurb)}">
        ${picture({ base: p.image.base, alt: p.image.alt, w: p.image.w, h: p.image.h, sizes: '(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw' })}
        <span class="gitem__cap">
          <span class="gitem__title">${esc(p.title)}</span>
          <span class="gitem__city">${esc(p.city)}, IN</span>
        </span>
        <span class="u-visually-hidden">Open larger view</span>
      </button>
    </li>`);

  return `<section class="section section--gallery" id="gallery">
    <div class="container">
      ${heading ? sectionHead({
        kicker: 'Portfolio',
        title: 'Work you can drive past',
        intro: 'Every project below is in Hamilton, Boone or north Marion County. Filter by the kind of work you are considering.'
      }) : ''}
      <div class="filters" role="group" aria-label="Filter projects by type" data-filters>${filters}</div>
      <p class="filters__count" role="status" data-filter-count></p>
      <ul class="grid-gallery" data-gallery>${items}</ul>
      <p class="gallery__empty" data-gallery-empty hidden>No projects in that category yet.</p>
    </div>

    <div class="lightbox" data-lightbox-root hidden>
      <div class="lightbox__backdrop" data-lightbox-close></div>
      <div class="lightbox__dialog" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
        <button class="lightbox__close" type="button" data-lightbox-close><span class="u-visually-hidden">Close</span><span aria-hidden="true">&times;</span></button>
        <button class="lightbox__nav lightbox__nav--prev" type="button" data-lightbox-prev><span class="u-visually-hidden">Previous project</span><span aria-hidden="true">&#8249;</span></button>
        <figure class="lightbox__figure">
          <img data-lightbox-img alt="" width="1600" height="1067">
          <figcaption>
            <h2 id="lightbox-title" data-lightbox-title></h2>
            <p class="lightbox__city" data-lightbox-city></p>
            <p class="lightbox__blurb" data-lightbox-blurb></p>
          </figcaption>
        </figure>
        <button class="lightbox__nav lightbox__nav--next" type="button" data-lightbox-next><span class="u-visually-hidden">Next project</span><span aria-hidden="true">&#8250;</span></button>
      </div>
    </div>
  </section>`;
}

/* -- Reviews carousel ----------------------------------------------------
   Placeholder-aware: while site.REVIEWS_ARE_REAL is false every card carries
   a visible "sample" flag so nobody accidentally ships fabricated proof.
------------------------------------------------------------------------- */
export function reviewsCarousel({ items = reviews, heading = true } = {}) {
  const real = site.REVIEWS_ARE_REAL;

  const warning = real ? '' : `<p class="notice notice--warn">
    <strong>Owner note, remove before launch:</strong> these are sample cards, not real customer reviews.
    Paste real Google reviews into <code>src/data/reviews.mjs</code> and set
    <code>REVIEWS_ARE_REAL: true</code> in <code>src/data/site.mjs</code>.
    Until then the star rating is deliberately kept out of the page schema.
  </p>`;

  const cards = map(items, (r) => `
    <li class="review" ${r.isPlaceholder ? 'data-placeholder="true"' : ''}>
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
    </li>`);

  return `<section class="section section--reviews" id="reviews">
    <div class="container">
      ${heading ? sectionHead({
        kicker: 'What clients say',
        title: 'Fourteen years of repeat customers',
        align: 'center'
      }) : ''}
      ${warning}
      <div class="carousel" data-carousel>
        <button class="carousel__btn carousel__btn--prev" type="button" data-carousel-prev><span class="u-visually-hidden">Previous reviews</span><span aria-hidden="true">&#8249;</span></button>
        <ul class="carousel__track" data-carousel-track tabindex="0" aria-label="Customer reviews, scrollable">${cards}</ul>
        <button class="carousel__btn carousel__btn--next" type="button" data-carousel-next><span class="u-visually-hidden">More reviews</span><span aria-hidden="true">&#8250;</span></button>
      </div>
      <p class="reviews__cta"><a href="/reviews/">Read all reviews</a></p>
    </div>
  </section>`;
}

/* -- Service area map ----------------------------------------------------
   Hand-drawn SVG rather than an embedded Google Map. No API key, no
   third-party script, no cookie banner, and it costs nothing in Lighthouse.
------------------------------------------------------------------------- */
export function serviceAreaMap() {
  const pins = map(cities, (c, i) => `
    <a class="map__pin${c.isHome ? ' map__pin--home' : ''}" href="/service-areas/${esc(c.slug)}/"
       style="left:${c.map.x}%; top:${c.map.y}%">
      <span class="map__dot" aria-hidden="true"></span>
      <span class="map__name">${esc(c.displayName || c.name)}</span>
    </a>`);

  return `<section class="section section--map" id="service-areas">
    <div class="container">
      ${sectionHead({
        kicker: 'Service area',
        title: 'Seven communities, one set of routes',
        intro: 'Based in Carmel and working across Hamilton County, Boone County and the north side of Indianapolis.'
      })}
      <div class="map">
        <div class="map__canvas">
          <svg class="map__bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <rect width="100" height="100" fill="var(--map-bg)"/>
            <path d="M0 74 H100" stroke="var(--map-line)" stroke-width="0.6" stroke-dasharray="2 2"/>
            <path d="M44 0 V100" stroke="var(--map-line)" stroke-width="0.8"/>
            <path d="M0 52 H100" stroke="var(--map-line)" stroke-width="0.5"/>
            <path d="M22 0 V100" stroke="var(--map-line)" stroke-width="0.5"/>
            <text x="46" y="6" font-size="2.6" fill="var(--map-label)">US 31</text>
            <text x="1.5" y="72.5" font-size="2.6" fill="var(--map-label)">Marion Co. line</text>
          </svg>
          <div class="map__pins">${pins}</div>
        </div>
        <ul class="map__list">
          ${map(cities, (c) => `<li><a href="/service-areas/${esc(c.slug)}/"><strong>${esc(c.displayName || c.name)}</strong><span>${esc(c.county)}</span></a></li>`)}
        </ul>
      </div>
      <p class="map__note">Just outside the map? Ask anyway. We travel further for project work than for weekly routes.</p>
    </div>
  </section>`;
}

/* -- FAQ accordion (native details/summary, no JS needed) ---------------- */
export function faqAccordion(items, { title = 'Common questions', kicker = 'FAQ', level = 2 } = {}) {
  if (!items || !items.length) return '';
  return `<section class="section section--faq">
    <div class="container container--narrow">
      ${sectionHead({ kicker, title, level })}
      <div class="faq">
        ${map(items, (f) => `<details class="faq__item">
          <summary class="faq__q"><span>${esc(f.q)}</span><span class="faq__icon" aria-hidden="true"></span></summary>
          <div class="faq__a"><p>${esc(f.a)}</p></div>
        </details>`)}
      </div>
    </div>
  </section>`;
}

/* -- Estimate form -------------------------------------------------------
   Posts multipart/form-data to site.forms.estimateAction. The shipped PHP
   handler validates and emails it. Swap the action for Formspree/Netlify if
   the host has no PHP; see README "Wiring the forms".
------------------------------------------------------------------------- */
export function estimateForm({ compact = false, id = 'estimate' } = {}) {
  const f = site.forms;

  const serviceBoxes = map(services, (s) => `
    <label class="checkcard">
      <input type="checkbox" name="services[]" value="${esc(s.name)}">
      <span class="checkcard__box" aria-hidden="true"></span>
      <span class="checkcard__label">${esc(s.navLabel)}</span>
    </label>`);

  return `<form class="form form--estimate${compact ? ' form--compact' : ''}"
      id="${esc(id)}"
      action="${esc(f.estimateAction)}"
      method="post"
      novalidate
      data-estimate-form>

    <p class="form__intro">Fill this out and you get a real number back within 24 hours on a weekday. Most of the time we can quote from your photos without booking a site visit.</p>

    <div class="form__grid">
      <div class="field">
        <label for="${id}-name">Your name <span class="req" aria-hidden="true">*</span></label>
        <input id="${id}-name" name="name" type="text" autocomplete="name" required>
        <p class="field__err" data-err hidden></p>
      </div>

      <div class="field">
        <label for="${id}-phone">Phone <span class="req" aria-hidden="true">*</span></label>
        <input id="${id}-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required
               placeholder="(317) 555-0142">
        <p class="field__err" data-err hidden></p>
      </div>

      <div class="field">
        <label for="${id}-email">Email <span class="req" aria-hidden="true">*</span></label>
        <input id="${id}-email" name="email" type="email" inputmode="email" autocomplete="email" required>
        <p class="field__err" data-err hidden></p>
      </div>

      <div class="field">
        <label for="${id}-start">Preferred start date</label>
        <input id="${id}-start" name="preferred_start" type="date">
        <p class="field__hint">Leave blank if you are flexible.</p>
      </div>

      <div class="field field--wide">
        <label for="${id}-address">Property address <span class="req" aria-hidden="true">*</span></label>
        <input id="${id}-address" name="address" type="text" autocomplete="street-address" required
               placeholder="Street, city, ZIP">
        <p class="field__hint">We measure most lots from an aerial before anyone drives out.</p>
        <p class="field__err" data-err hidden></p>
      </div>

      <div class="field field--wide">
        <label for="${id}-size">Property size</label>
        <select id="${id}-size" name="property_size">
          <option value="">Not sure</option>
          <option>Up to 1/4 acre</option>
          <option>1/4 to 1/2 acre</option>
          <option>1/2 to 1 acre</option>
          <option>Over 1 acre</option>
          <option>Commercial, HOA or multi-property</option>
        </select>
      </div>
    </div>

    <fieldset class="fieldset">
      <legend>What are you interested in? <span class="field__hint field__hint--inline">Pick as many as apply.</span></legend>
      <div class="checkcards">${serviceBoxes}</div>
    </fieldset>

    <div class="upload" data-upload>
      <label class="upload__label" for="${id}-photos">Photos of your yard</label>
      <p class="upload__pitch">Two or three photos of your yard is usually all we need to send a real number.</p>
      <div class="upload__zone" data-upload-zone>
        <svg viewBox="0 0 24 24" class="upload__icon" aria-hidden="true" focusable="false"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <p class="upload__cta"><strong>Tap to add photos</strong> or drag them here</p>
        <p class="upload__meta">JPEG, PNG or HEIC straight off your phone. Up to ${f.maxUploadFiles} files, ${f.maxUploadMb} MB each.</p>
        <input id="${id}-photos" name="photos[]" type="file"
               accept="${esc(f.acceptedUploads)}" multiple
               data-max-mb="${f.maxUploadMb}" data-max-files="${f.maxUploadFiles}">
      </div>
      <ul class="upload__list" data-upload-list></ul>
      <p class="field__err" data-upload-err hidden></p>
    </div>

    <div class="field field--wide">
      <label for="${id}-notes">Anything else we should know?</label>
      <textarea id="${id}-notes" name="notes" rows="4" placeholder="Wet corner by the shed, dog in the back yard, HOA needs a COI, that kind of thing."></textarea>
    </div>

    <div class="form__consent">
      <label class="checkline">
        <input type="checkbox" name="consent" value="yes" required>
        <span>It is fine to contact me about this estimate by phone, text or email.</span>
      </label>
    </div>

    <p class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></p>
    <input type="hidden" name="form_name" value="Free estimate request">
    <input type="hidden" name="page" value="" data-page-field>

    <button class="btn btn--gold btn--block" type="submit">Send my photos and get a quote</button>
    <p class="form__foot">Or call <a href="tel:${esc(site.phoneHref)}" data-call>${esc(site.phone)}</a>. We answer Monday to Friday, 7 to 6, and Saturday 8 to 2.</p>
    <p class="form__status" role="status" data-form-status></p>
  </form>`;
}

/* -- Reserve My Spot: three fields, one button ---------------------------
   Deliberately short. This is the contract-signup path, not the quote path.
------------------------------------------------------------------------- */
export function reserveForm({ id = 'reserve', title = 'Lock in your spot', selected = '' } = {}) {
  const opts = map(packages, (p) =>
    `<option value="${esc(p.name)}"${p.slug === selected ? ' selected' : ''}>${esc(p.name)} &mdash; ${esc(p.price)}${esc(p.unit)}</option>`);

  return `<div class="reserve" id="${esc(id)}">
    <div class="reserve__head">
      <h2 class="reserve__title">${esc(title)}</h2>
      <p class="reserve__sub">Three fields. We confirm your route slot the same day and send the agreement to sign.</p>
    </div>
    <form class="form form--reserve"
        action="${esc(site.forms.reserveAction)}"
        method="post"
        novalidate
        data-reserve-form>
      <div class="reserve__grid">
        <div class="field">
          <label for="${id}-name">Name <span class="req" aria-hidden="true">*</span></label>
          <input id="${id}-name" name="name" type="text" autocomplete="name" required>
          <p class="field__err" data-err hidden></p>
        </div>
        <div class="field">
          <label for="${id}-phone">Phone <span class="req" aria-hidden="true">*</span></label>
          <input id="${id}-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required>
          <p class="field__err" data-err hidden></p>
        </div>
        <div class="field">
          <label for="${id}-address">Property address <span class="req" aria-hidden="true">*</span></label>
          <input id="${id}-address" name="address" type="text" autocomplete="street-address" required>
          <p class="field__err" data-err hidden></p>
        </div>
        <div class="field">
          <label for="${id}-package">Package <span class="req" aria-hidden="true">*</span></label>
          <select id="${id}-package" name="package" required data-package-select>${opts}</select>
        </div>
      </div>
      <p class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></p>
      <input type="hidden" name="form_name" value="Package reservation">
      <input type="hidden" name="page" value="" data-page-field>
      <button class="btn btn--gold btn--block" type="submit">Reserve My Spot</button>
      <p class="form__status" role="status" data-form-status></p>
    </form>
  </div>`;
}

/* -- Final CTA band ------------------------------------------------------ */
export function ctaBand({
  title = 'Free estimate in 24 hours. Send a photo, skip the site visit.',
  text = 'Two or three photos of your yard is usually all we need to send a real number. No site visit, no sales call, no waiting a week to hear back.',
  primaryLabel = 'Get my free estimate',
  primaryHref = '/contact/'
} = {}) {
  return `<section class="cta-band">
    <div class="container cta-band__inner">
      <div>
        <h2 class="cta-band__title">${esc(title)}</h2>
        <p class="cta-band__text">${esc(text)}</p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--gold btn--lg" href="${esc(primaryHref)}">${esc(primaryLabel)}</a>
        <a class="btn btn--outline btn--lg" href="tel:${esc(site.phoneHref)}" data-call>Call ${esc(site.phone)}</a>
      </div>
    </div>
  </section>`;
}

/* -- Trust strip --------------------------------------------------------- */
export function trustStrip() {
  const c = site.credentials;
  const items = [
    { big: `${site.yearsInBusiness} years`, small: `Serving Carmel since ${site.founded}` },
    { big: 'Licensed', small: c.applicatorLicense.replace('Indiana OISC Commercial Applicator, ', 'OISC applicator ') },
    { big: 'Insured', small: `${c.generalLiability} and workers' comp` },
    { big: '24 hours', small: 'Estimate turnaround, weekdays' }
  ];
  return `<section class="trust">
    <div class="container">
      <ul class="trust__list">${map(items, (t) => `
        <li class="trust__item">
          <span class="trust__big">${esc(t.big)}</span>
          <span class="trust__small">${esc(t.small)}</span>
        </li>`)}</ul>
    </div>
  </section>`;
}

/* -- Related links (services / cities) ----------------------------------- */
export function relatedLinks({ title, links }) {
  if (!links || !links.length) return '';
  return `<section class="section section--related">
    <div class="container">
      <h2 class="related__title">${esc(title)}</h2>
      <ul class="related__list">${map(links, (l) =>
        `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)}</ul>
    </div>
  </section>`;
}

/* -- Page hero ----------------------------------------------------------- */
export function pageHero({ kicker, title, intro, image, cta = true }) {
  return `<section class="phero${image ? ' phero--image' : ''}">
    ${image ? `<div class="phero__media">${picture({ base: image.base, alt: image.alt, w: image.w || 1600, h: image.h || 900, sizes: '100vw', priority: true })}</div>` : ''}
    <div class="container phero__inner">
      ${kicker ? `<p class="kicker kicker--light">${esc(kicker)}</p>` : ''}
      <h1 class="phero__title">${esc(title)}</h1>
      ${intro ? `<p class="phero__intro">${esc(intro)}</p>` : ''}
      ${cta ? `<div class="phero__actions">
        <a class="btn btn--gold" href="/contact/">Get a free estimate</a>
        <a class="btn btn--outline" href="tel:${esc(site.phoneHref)}" data-call>Call ${esc(site.phone)}</a>
      </div>` : ''}
    </div>
  </section>`;
}
