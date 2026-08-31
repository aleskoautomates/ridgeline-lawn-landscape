/* ---------------------------------------------------------------------------
   src/pages/about.mjs  ->  /about/
--------------------------------------------------------------------------- */

import { site } from '../data/site.mjs';
import { about, crew, crewHasPlaceholders } from '../data/about.mjs';
import { esc, map, picture } from '../lib/html.mjs';
import { layout } from '../lib/layout.mjs';
import { pageHero, ctaBand, sectionHead, trustStrip, servicesGrid } from '../lib/components.mjs';

export function aboutPage() {
  const stats = `<section class="section section--stats">
    <div class="container">
      <ul class="stats">${map(about.stats, (s) => `
        <li class="stat">
          <span class="stat__v">${esc(s.value)}</span>
          <span class="stat__l">${esc(s.label)}</span>
          <span class="stat__d">${esc(s.detail)}</span>
        </li>`)}</ul>
    </div>
  </section>`;

  const story = `<section class="section section--prose">
    <div class="container container--narrow prose">
      ${map(about.story, (b) => `<h2>${esc(b.heading)}</h2><p>${esc(b.text)}</p>`)}
    </div>
  </section>`;

  const warn = crewHasPlaceholders ? `<div class="container"><p class="notice notice--warn">
    <strong>Owner note, remove before launch:</strong> the cards marked PLACEHOLDER are layout slots, not real people.
    Replace them with real crew in <code>src/data/about.mjs</code> or delete them.
    Do not use stock photos of people who do not work here.
  </p></div>` : '';

  const crewGrid = `<section class="section section--crewgrid">
    <div class="container">
      ${sectionHead({ kicker: 'The crew', title: 'Who actually shows up' })}
    </div>
    ${warn}
    <div class="container">
      <ul class="people">${map(crew, (p) => `
        <li class="person${p.isPlaceholder ? ' person--placeholder' : ''}">
          <div class="person__photo">${picture({ base: p.photo.base, alt: p.photo.alt, w: p.photo.w, h: p.photo.h, sizes: '(max-width: 640px) 50vw, 25vw' })}</div>
          ${p.isPlaceholder ? '<span class="person__flag">Placeholder</span>' : ''}
          <h3 class="person__name">${esc(p.name)}</h3>
          <p class="person__role">${esc(p.role)}</p>
          <p class="person__bio">${esc(p.bio)}</p>
        </li>`)}</ul>
    </div>
  </section>`;

  const photo = `<section class="section section--crewphoto">
    <div class="container">
      ${picture({ base: about.crewPhoto.base, alt: about.crewPhoto.alt, w: about.crewPhoto.w, h: about.crewPhoto.h, sizes: '100vw', className: 'crewphoto' })}
    </div>
  </section>`;

  const body = [
    pageHero({ kicker: 'About', title: about.headline, intro: about.lede }),
    trustStrip(),
    stats,
    photo,
    story,
    crewGrid,
    servicesGrid(),
    ctaBand()
  ].join('\n');

  return layout({
    title: `About Ridgeline Lawn & Landscape | Carmel, IN Since 2012`,
    description: `Marcus Delgado founded Ridgeline in 2012. Licensed Indiana contractor, OISC applicator RT-48219, ${site.credentials.generalLiability}, workers comp on every crew member.`,
    path: '/about/',
    bodyClass: 'page-about',
    body,
    trail: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about/' }]
  });
}
