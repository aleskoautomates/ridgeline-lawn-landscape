/* ===========================================================================
   src/data/reviews.mjs

   >>> READ THIS BEFORE LAUNCH <<<

   Every review below is a PLACEHOLDER. None of them came from a real
   customer. They exist so the carousel, the reviews page and the layout can
   be built and tested. They are not marketing copy and they must not go
   live.

   WHY THIS MATTERS, not just legally but practically:
   - Google's structured data policy prohibits marking up reviews the
     business did not actually receive. Getting caught costs you every rich
     result on the domain, sitewide, and it is not quick to get back.
   - The FTC treats fabricated testimonials as deceptive advertising. It has
     explicit rules and civil penalties for fake consumer reviews.
   - Indiana customers do cross-check a company's site against its Google
     Business Profile. A five-star quote on the website from someone who
     does not exist on Google is the fastest way to lose a $579/month
     Estate Plan client.

   HOW TO GO LIVE WITH THIS SECTION
   1. Open the Google Business Profile for Ridgeline and copy real reviews:
      the reviewer's name as displayed, the date, the star rating, the text.
      Do the same for Facebook, Angi, Nextdoor, wherever they exist.
   2. Replace the objects below. Delete any you do not fill. Set
      `isPlaceholder: false` on each real one.
   3. Set `reviewSummary` to the ACTUAL count and average from the profile.
   4. In src/data/site.mjs set  REVIEWS_ARE_REAL: true
   5. Rebuild.

   Until step 4, the build:
     - stamps every card with a visible "sample" label,
     - prints a warning in the build output,
     - and omits aggregateRating and Review entirely from the JSON-LD.
   That is deliberate. Do not remove the guard to make the warning go away.
=========================================================================== */

/* The real numbers from the Google Business Profile. These are placeholders
   too. Do NOT publish them until they match the live profile exactly. */
export const reviewSummary = {
  count: 0,        // total review count across all sources
  average: 0,      // e.g. 4.9
  primarySource: 'Google Business Profile'
};

export const reviews = [
  {
    id: 'r1',
    isPlaceholder: true,
    author: 'PLACEHOLDER - replace with a real reviewer name',
    initials: 'PL',
    city: 'Carmel',
    service: 'lawn-mowing',
    rating: 5,
    date: '2026-06-14',
    source: 'Google',
    body:
      'Sample text only. Replace this entire object with a real review copied from the Google Business Profile, including the reviewer name, date and star rating exactly as they appear there.'
  },
  {
    id: 'r2',
    isPlaceholder: true,
    author: 'PLACEHOLDER - replace with a real reviewer name',
    initials: 'PL',
    city: 'Westfield',
    service: 'hardscaping',
    rating: 5,
    date: '2026-05-02',
    source: 'Google',
    body:
      'Sample text only. A good one to source is a hardscape client, since the retaining wall and patio work carries the highest ticket and benefits most from social proof.'
  },
  {
    id: 'r3',
    isPlaceholder: true,
    author: 'PLACEHOLDER - replace with a real reviewer name',
    initials: 'PL',
    city: 'Fishers',
    service: 'fertilization-weed-control',
    rating: 5,
    date: '2026-04-21',
    source: 'Google',
    body:
      'Sample text only. A turf-program review that mentions the lawn improving over a season is the most persuasive kind for this service and worth asking a happy client for directly.'
  },
  {
    id: 'r4',
    isPlaceholder: true,
    author: 'PLACEHOLDER - replace with a real reviewer name',
    initials: 'PL',
    city: 'Zionsville',
    service: 'landscape-design',
    rating: 5,
    date: '2026-03-30',
    source: 'Google',
    body:
      'Sample text only. Replace with a real design client review. If one mentions the 3D rendering step, use that one, because it is the differentiator competitors do not offer.'
  },
  {
    id: 'r5',
    isPlaceholder: true,
    author: 'PLACEHOLDER - replace with a real reviewer name',
    initials: 'PL',
    city: 'Noblesville',
    service: 'snow-removal',
    rating: 5,
    date: '2026-01-18',
    source: 'Google',
    body:
      'Sample text only. A winter review that references being cleared early in the morning is the one that sells Winter Watch contracts in August.'
  },
  {
    id: 'r6',
    isPlaceholder: true,
    author: 'PLACEHOLDER - replace with a real reviewer name',
    initials: 'PL',
    city: 'Carmel',
    service: 'spring-fall-cleanup',
    rating: 5,
    date: '2025-11-09',
    source: 'Google',
    body:
      'Sample text only. Replace with a real cleanup review, ideally one from a client with heavy tree cover who can speak to the multi-pass scheduling.'
  }
];

/* True only when every review is real AND the summary is filled in. The
   schema builder checks this as well as site.REVIEWS_ARE_REAL, so both have
   to be right before anything gets published to Google. */
export const reviewsLookReal =
  reviews.length > 0 &&
  reviews.every((r) => r.isPlaceholder === false) &&
  reviewSummary.count > 0 &&
  reviewSummary.average > 0;
