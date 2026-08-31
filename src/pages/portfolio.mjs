/* ---------------------------------------------------------------------------
   src/pages/portfolio.mjs  ->  /portfolio/
--------------------------------------------------------------------------- */

import { site } from '../data/site.mjs';
import { projects, featuredProject, beforeAfterProjects } from '../data/projects.mjs';
import { layout } from '../lib/layout.mjs';
import { pageHero, gallery, projectSpotlight, beforeAfter, ctaBand } from '../lib/components.mjs';

export function portfolioPage() {
  const body = [
    pageHero({
      kicker: 'Portfolio',
      title: 'Fourteen years of work you can drive past',
      intro: 'Patios, walls, plantings, lawn rescues and snow routes across Hamilton County, Boone County and the north side of Indianapolis. Filter by the kind of work you are considering.'
    }),
    gallery(projects),
    beforeAfter(beforeAfterProjects),
    projectSpotlight(featuredProject),
    ctaBand({
      title: 'Want something like this on your property?',
      text: 'Send photos of the space and rough dimensions. For hardscape we will come out and measure, but you will have an honest range before that happens.',
      primaryLabel: 'Start a project'
    })
  ].join('\n');

  return layout({
    title: `Project Gallery | Patios, Landscapes & Lawns in Carmel, IN`,
    description: 'Paver patios, retaining walls, landscape installs and lawn restorations across Carmel, Fishers, Westfield and Zionsville. Filterable project gallery.',
    path: '/portfolio/',
    bodyClass: 'page-portfolio',
    body,
    trail: [{ label: 'Home', href: '/' }, { label: 'Portfolio', href: '/portfolio/' }],
    ogImage: `/assets/img/${featuredProject.image.base}.jpg`
  });
}
