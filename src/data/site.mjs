/* ---------------------------------------------------------------------------
   src/data/site.mjs
   Business identity, contact info, and global settings.

   THIS IS THE FILE YOU EDIT MOST. Change something here, run `npm run build`,
   and it updates everywhere on the site at once - header, footer, schema,
   every page. See README.md section "Everyday edits".
--------------------------------------------------------------------------- */

export const site = {
  /* -- Identity ------------------------------------------------------------ */
  name: 'Ridgeline Lawn & Landscape',
  legalName: 'Ridgeline Lawn & Landscape, LLC',
  shortName: 'Ridgeline',
  owner: 'Marcus Delgado',
  founded: 2012,
  yearsInBusiness: new Date().getFullYear() - 2012,
  tagline: 'Carmel lawn care, landscape builds, and snow removal.',

  /* -- Where the site will live. Used for canonical URLs, sitemap, og:url.
        Change this to the real domain before launch and rebuild. ----------- */
  domain: 'https://www.ridgelinelawn.example.com',

  /* -- Contact (NAP - keep identical to the Google Business Profile) -------- */
  phone: '(317) 555-0142',
  phoneHref: '+13175550142',
  email: 'estimates@ridgelinelawn.example.com',

  address: {
    street: '',                       // Add the real street address before launch.
    locality: 'Carmel',
    region: 'IN',
    regionName: 'Indiana',
    postalCode: '46032',
    country: 'US'
  },

  /* Carmel, Indiana city centre. Replace with the yard/office coordinates if
     the business has a public address. */
  geo: { lat: 39.9784, lng: -86.1180 },

  /* -- Hours --------------------------------------------------------------- */
  hours: [
    { label: 'Monday – Friday', time: '7:00 AM – 6:00 PM', days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '07:00', closes: '18:00' },
    { label: 'Saturday',        time: '8:00 AM – 2:00 PM', days: ['Sa'], opens: '08:00', closes: '14:00' },
    { label: 'Sunday',          time: 'Closed',            days: ['Su'], closed: true }
  ],
  hoursNote: 'Snow response runs 24/7 for contract clients from November 15 through March 15.',

  /* -- Licensing and insurance (facts supplied by the client) -------------- */
  credentials: {
    contractorNote: 'Registered Indiana home improvement contractor.',
    generalLiability: '$2,000,000 general liability',
    autoLiability: '$1,000,000 commercial auto',
    insurer: 'Cardinal Mutual Insurance Group',
    workersComp: "Workers' compensation coverage on every crew member.",
    coiNote: 'Certificate of insurance available on request for HOA and commercial clients.',
    applicatorLicense: 'Indiana OISC Commercial Applicator, Categories 3A (Ornamental) and 3B (Turf)',
    applicatorNumber: 'RT-48219'
  },

  /* -- Social profiles. Leave a value empty and the icon disappears. ------- */
  social: {
    google: '',      // Google Business Profile share link
    facebook: '',
    instagram: ''
  },

  /* -- Where the forms send to -------------------------------------------- */
  forms: {
    /* Vercel Functions in api/. Vercel does not run PHP, so the old
       estimate.php and reserve.php were removed. See README, "Wiring the
       forms". Requires RESEND_API_KEY, ESTIMATE_TO_EMAIL and MAIL_FROM in
       the Vercel environment. */
    estimateAction: '/api/estimate',
    reserveAction: '/api/reserve',
    maxUploadMb: 10,
    maxUploadFiles: 8,
    acceptedUploads: '.jpg,.jpeg,.png,.heic,.heif,.webp,image/jpeg,image/png,image/heic,image/heif,image/webp'
  },

  /* -- Reviews honesty switch ---------------------------------------------
     Set to true ONLY when src/data/reviews.mjs holds real, verifiable reviews
     the business actually received. While this is false the build:
       - stamps every review card as a placeholder
       - omits aggregateRating + Review from the JSON-LD schema
     Publishing an invented star rating violates Google's structured data
     policy and the FTC endorsement rules. Do not flip this to true early.
  ------------------------------------------------------------------------ */
  REVIEWS_ARE_REAL: false,

  /* -- Analytics. Paste a GA4 / Plausible snippet here and it lands in every
        page just before </body>. Left empty = no third-party scripts, which
        is how the site currently hits its Lighthouse numbers. ------------- */
  analyticsSnippet: ''
};

/* ---------------------------------------------------------------------------
   SEASONAL BANNER
   The strip under the hero on the homepage. Swap this every season.
   `active: false` removes it from every page with no other edits.
   README.md has a copy-paste library of banners for each season.
--------------------------------------------------------------------------- */
export const seasonalBanner = {
  active: true,
  season: 'Late summer / early fall 2026',
  text: 'Fall cleanup and aeration slots are booking now. Reserve before September 15 and lock next season\u2019s rate. Snow contracts open through November 1.',
  ctaLabel: 'Reserve my slot',
  ctaHref: '/contact/',
  /* Optional hard stop. After this date the banner hides itself even if
     nobody remembers to come back and switch it off. Format YYYY-MM-DD. */
  expires: '2026-11-01'
};

/* ---------------------------------------------------------------------------
   NAVIGATION
   Top-level order. Child pages are pulled automatically from the services and
   cities data files, so adding a service or a city updates the menu for free.
--------------------------------------------------------------------------- */
export const nav = [
  { label: 'Services',      href: '/services/',       children: 'services' },
  { label: 'Packages',      href: '/packages/' },
  { label: 'Portfolio',     href: '/portfolio/' },
  { label: 'Service Areas', href: '/service-areas/',  children: 'cities' },
  { label: 'About',         href: '/about/' },
  { label: 'Reviews',       href: '/reviews/' },
  { label: 'Blog',          href: '/blog/' },
  { label: 'FAQ',           href: '/faq/' }
];

export const footerNav = [
  {
    title: 'Services',
    links: 'services'
  },
  {
    title: 'Service Areas',
    links: 'cities'
  },
  {
    title: 'Company',
    links: [
      { label: 'About & Our Crew', href: '/about/' },
      { label: 'Portfolio',        href: '/portfolio/' },
      { label: 'Seasonal Packages', href: '/packages/' },
      { label: 'Reviews',          href: '/reviews/' },
      { label: 'Lawn Care Blog',   href: '/blog/' },
      { label: 'FAQ',              href: '/faq/' },
      { label: 'Free Estimate',    href: '/contact/' }
    ]
  }
];
