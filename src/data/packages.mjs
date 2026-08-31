/* ---------------------------------------------------------------------------
   src/data/packages.mjs
   Seasonal contract packages. These drive the /packages/ page, the homepage
   package cards, the "Reserve My Spot" form dropdown, and the Offer nodes in
   the JSON-LD schema.

   PRICE CHANGES: edit `price` (the display string) AND `priceValue` (the raw
   number the schema publishes). If those two disagree, Google gets told one
   number and the customer reads another. Keep them in sync.
--------------------------------------------------------------------------- */

export const packages = [
  {
    slug: 'curb-appeal',
    name: 'Curb Appeal Plan',
    price: 'from $189',
    priceValue: 189,
    unit: '/month',
    window: 'April – October',
    popular: false,
    summary:
      'The weekly cut, done properly, every week. This is the plan for a tidy lot that does not need a full program behind it.',
    bestFor: 'Lots up to 1/4 acre that mainly need mowing kept on schedule.',
    includes: [
      'Weekly mowing at the correct seasonal height',
      'String trimming around every bed, tree and post',
      'Mechanical edging on drives and walks',
      'Full blow down of all hard surfaces',
      'Clipping management, mulched or bagged',
      'Same crew, same service day, every week'
    ],
    notIncluded: ['Fertilization and weed control', 'Spring and fall cleanup', 'Shrub trimming'],
    ctaLabel: 'Reserve my spot'
  },

  {
    slug: 'full-season',
    name: 'Full Season Plan',
    price: 'from $339',
    priceValue: 339,
    unit: '/month',
    window: 'April – November',
    popular: true,
    badge: 'Most popular',
    summary:
      'Everything in Curb Appeal plus the licensed turf program and both seasonal cleanups. This is the plan that actually changes how a lawn looks, because mowing alone never has.',
    bestFor: 'Most homeowners. If you are choosing between plans, this is the one.',
    includes: [
      'Everything in the Curb Appeal Plan',
      'Six-step licensed fertilization and weed control program',
      'Pre-emergent, broadleaf control and grub prevention',
      'Core aeration and overseeding in the fall window',
      'Spring cleanup with bed cutbacks and re-edging',
      'Fall cleanup with full leaf removal and haul away',
      'One round of shrub trimming'
    ],
    notIncluded: ['Irrigation startup and blowout', 'Mulch refresh', 'Seasonal colour rotations'],
    ctaLabel: 'Reserve my spot'
  },

  {
    slug: 'estate',
    name: 'Estate Plan',
    price: 'from $579',
    priceValue: 579,
    unit: '/month',
    window: 'Year-round',
    popular: false,
    summary:
      'The whole property, handled, twelve months a year. You stop thinking about the yard and we stop asking you to approve things one at a time.',
    bestFor: 'Larger properties and owners who want one number and no decisions.',
    includes: [
      'Everything in the Full Season Plan',
      'Irrigation spring startup and fall blowout',
      'Two rounds of shrub trimming instead of one',
      'Seasonal colour rotations in beds and containers',
      'Annual mulch refresh at proper depth',
      'Priority scheduling ahead of non-contract work',
      'Year-round coverage, not just the growing season'
    ],
    notIncluded: ['Snow removal, which is a separate Winter Watch contract'],
    ctaLabel: 'Reserve my spot'
  },

  {
    slug: 'winter-watch',
    name: 'Winter Watch Snow Contract',
    price: 'from $495',
    priceValue: 495,
    unit: '/season',
    altPrice: 'or $85 per push',
    window: 'November 15 – March 15',
    popular: false,
    isWinter: true,
    urgency: 'Contracts open August 1 and close November 1, or sooner when routes fill.',
    summary:
      'A flat seasonal rate for unlimited plows at a 2-inch trigger. We come automatically. You do not call, you do not negotiate at 5 a.m., and you are not competing with non-contract customers for the truck.',
    bestFor: 'Anyone who has ever waited three days for a plow.',
    includes: [
      'Unlimited plows at a 2-inch accumulation trigger',
      'Automatic dispatch, no call required',
      'Walk, entry and stair clearing',
      'Ice melt application, plant safe blends near beds',
      'Multiple passes during long duration storms',
      'Overnight routes so the drive is open before the commute',
      '24/7 response for contract clients through the season'
    ],
    notIncluded: ['Roof or gutter ice removal', 'Service below the 2-inch trigger, available as a salt-only visit'],
    ctaLabel: 'Lock in my route'
  }
];

export const packageBySlug = Object.fromEntries(packages.map((p) => [p.slug, p]));

/* ---------------------------------------------------------------------------
   Lot size tiers. Shown as a table on /packages/ and referenced in the FAQ.
   Percentages are uplifts applied to the base plan price.
--------------------------------------------------------------------------- */
export const pricingTiers = [
  { size: 'Up to 1/4 acre', adjustment: 'Base price', note: 'Most Carmel, Fishers and Noblesville subdivision lots.' },
  { size: '1/4 to 1/2 acre', adjustment: '+35%', note: 'Common in Westfield and older north-side Indianapolis lots.' },
  { size: '1/2 to 1 acre', adjustment: '+70%', note: 'Larger Westfield, Zionsville and Whitestown parcels.' },
  { size: 'Over 1 acre', adjustment: 'Custom quote', note: 'Priced on a site walk or from aerial measurement.' }
];

export const pricingNotes = [
  'All listed prices assume lots up to a quarter acre. Larger lots use the tier table above.',
  'Ten percent discount on any plan paid in full for the annual contract.',
  'Commercial, HOA and retail properties are always quoted custom. Send us the address and we will measure it from an aerial before anyone drives out.',
  'Prices are starting points, not quotes. What changes them is lot size, slope, obstacle count and access.'
];

/* Snow contract window, used by the packages page and the seasonal urgency
   copy. Update these dates each year and the copy follows. */
export const snowContractWindow = {
  opens: 'August 1',
  closes: 'November 1',
  seasonStart: 'November 15',
  seasonEnd: 'March 15'
};
