/* ---------------------------------------------------------------------------
   src/pages/blog.mjs
   /blog/            index
   /blog/<slug>/     one page per post
--------------------------------------------------------------------------- */

import { site } from '../data/site.mjs';
import { posts, postsByDate } from '../data/posts.mjs';
import { serviceBySlug } from '../data/services.mjs';
import { esc, map, picture, formatDate } from '../lib/html.mjs';
import { layout } from '../lib/layout.mjs';
import { articleSchema } from '../lib/schema.mjs';
import { pageHero, ctaBand, relatedLinks, sectionHead } from '../lib/components.mjs';

/* -- INDEX --------------------------------------------------------------- */
export function blogIndex() {
  const [lead, ...rest] = postsByDate;

  const leadCard = `<article class="postlead">
    <a class="postlead__link" href="/blog/${esc(lead.slug)}/">
      <div class="postlead__media">${picture({ base: lead.image.base, alt: lead.image.alt, w: lead.image.w, h: lead.image.h, sizes: '(max-width: 900px) 100vw, 60vw', priority: true })}</div>
      <div class="postlead__body">
        <p class="post__cat">${esc(lead.category)}</p>
        <h2 class="postlead__title">${esc(lead.title)}</h2>
        <p class="postlead__excerpt">${esc(lead.excerpt)}</p>
        <p class="post__meta">${esc(formatDate(lead.date))} &middot; ${lead.readMinutes} min read</p>
      </div>
    </a>
  </article>`;

  const cards = map(rest, (p) => `
    <li class="postcard">
      <a href="/blog/${esc(p.slug)}/">
        <span class="postcard__media">${picture({ base: p.image.base, alt: p.image.alt, w: p.image.w, h: p.image.h, sizes: '(max-width: 640px) 100vw, 33vw' })}</span>
        <span class="post__cat">${esc(p.category)}</span>
        <span class="postcard__title">${esc(p.title)}</span>
        <span class="postcard__excerpt">${esc(p.excerpt)}</span>
        <span class="post__meta">${esc(formatDate(p.date))} &middot; ${p.readMinutes} min read</span>
      </a>
    </li>`);

  const body = [
    pageHero({
      kicker: 'Blog',
      title: 'Lawn care that works in central Indiana',
      intro: 'Zone 6a, clay soil, and a transition-zone climate that is wrong for every grass. What actually works here, and when to do it.',
      cta: false
    }),
    `<section class="section"><div class="container">${leadCard}<ul class="postgrid">${cards}</ul></div></section>`,
    ctaBand()
  ].join('\n');

  return layout({
    title: `Lawn Care Blog | Central Indiana Seasonal Tips | Ridgeline`,
    description: 'Seasonal lawn and landscape advice for central Indiana: aeration timing, pre-emergent windows, leaf cleanup, irrigation blowouts and snow contracts.',
    path: '/blog/',
    bodyClass: 'page-blog',
    body,
    trail: [{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog/' }]
  });
}

/* -- POST ---------------------------------------------------------------- */
function renderBlock(b) {
  if (b.h2) return `<h2>${esc(b.h2)}</h2>`;
  if (b.p) return `<p>${esc(b.p)}</p>`;
  if (b.ul) return `<ul>${map(b.ul, (i) => `<li>${esc(i)}</li>`)}</ul>`;
  if (b.ol) return `<ol>${map(b.ol, (i) => `<li>${esc(i)}</li>`)}</ol>`;
  if (b.note) return `<aside class="pullnote"><p>${esc(b.note)}</p></aside>`;
  if (b.cta) return `<div class="inlinecta"><p>${esc(b.cta.text)}</p><a class="btn btn--gold" href="${esc(b.cta.href)}">${esc(b.cta.label)}</a></div>`;
  return '';
}

export function blogPost(post) {
  const related = (post.relatedServices || []).map((s) => serviceBySlug[s]).filter(Boolean)
    .map((s) => ({ label: s.navLabel, href: `/services/${s.slug}/` }));

  const more = postsByDate.filter((p) => p.slug !== post.slug).slice(0, 3);

  const article = `<article class="article">
    <div class="container container--narrow">
      <header class="article__head">
        <p class="post__cat">${esc(post.category)}</p>
        <h1 class="article__title">${esc(post.title)}</h1>
        <p class="article__meta">By ${esc(post.author)} &middot; ${esc(formatDate(post.date))}${post.updated ? ` &middot; updated ${esc(formatDate(post.updated))}` : ''} &middot; ${post.readMinutes} min read</p>
      </header>
    </div>
    <div class="container article__hero">
      ${picture({ base: post.image.base, alt: post.image.alt, w: post.image.w, h: post.image.h, sizes: '(max-width: 1100px) 100vw, 1100px', priority: true })}
    </div>
    <div class="container container--narrow prose article__body">
      ${map(post.body, renderBlock)}
    </div>
  </article>`;

  const moreSection = `<section class="section section--more">
    <div class="container">
      ${sectionHead({ kicker: 'More reading', title: 'Other seasonal guides' })}
      <ul class="postgrid">${map(more, (p) => `
        <li class="postcard">
          <a href="/blog/${esc(p.slug)}/">
            <span class="postcard__media">${picture({ base: p.image.base, alt: p.image.alt, w: p.image.w, h: p.image.h, sizes: '(max-width: 640px) 100vw, 33vw' })}</span>
            <span class="post__cat">${esc(p.category)}</span>
            <span class="postcard__title">${esc(p.title)}</span>
            <span class="post__meta">${esc(formatDate(p.date))}</span>
          </a>
        </li>`)}</ul>
    </div>
  </section>`;

  const body = [
    article,
    relatedLinks({ title: 'Related services', links: related }),
    moreSection,
    ctaBand()
  ].join('\n');

  return layout({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}/`,
    bodyClass: 'page-post',
    body,
    trail: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog/' },
      { label: post.title, href: `/blog/${post.slug}/` }
    ],
    schema: [articleSchema(post)],
    ogImage: `/assets/img/${post.image.base}.jpg`
  });
}
