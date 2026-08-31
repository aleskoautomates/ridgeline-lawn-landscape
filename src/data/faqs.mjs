/* ---------------------------------------------------------------------------
   src/data/faqs.mjs
   General FAQs. These drive the /faq/ page and the homepage accordion.

   Service-specific questions live on each service in src/data/services.mjs
   and are pulled into the FAQ page automatically, grouped by service. Put a
   question here only if it applies across the whole business.

   These are emitted as FAQPage JSON-LD, so keep answers factual. An answer
   that overpromises here is an answer Google may show verbatim in search.
--------------------------------------------------------------------------- */

export const faqGroups = [
  {
    id: 'estimates',
    title: 'Estimates and getting started',
    items: [
      {
        q: 'How fast do I get an estimate?',
        a: 'Within 24 hours on weekdays. Send two or three photos of the yard with the form and most residential quotes come back as a real number, not a range, without anyone needing to drive out. Hardscape and full landscape design still need a site visit, because grade and access change the price more than square footage does.'
      },
      {
        q: 'Why do you want photos instead of coming out?',
        a: 'Because a site visit costs you a half-day window and costs us a truck. Photos of the front, the back and anything unusual let us measure from an aerial and quote accurately. It gets you a number the same day instead of next week. If we need to see it in person, we will say so.'
      },
      {
        q: 'What do you need in the photos?',
        a: 'One of the front from the street, one of the back, and one of anything you are specifically worried about, like a wet corner, a bare patch or an overgrown bed. Phone photos are fine. HEIC and JPEG both upload.'
      },
      {
        q: 'Do you charge for estimates?',
        a: 'No for maintenance, lawn programs and snow. Full property landscape design carries a design fee that is credited back against the installation if you build with us.'
      },
      {
        q: 'Is there a contract?',
        a: 'Seasonal plans and snow contracts are agreements for a defined season, which is what lets us hold a route slot for you. One-off work like a patio or a cleanup is a per-project proposal. Nothing auto-renews without us contacting you first.'
      }
    ]
  },
  {
    id: 'licensing',
    title: 'Licensing, insurance and crew',
    items: [
      {
        q: 'Are you licensed and insured?',
        a: 'Yes. Ridgeline is a registered Indiana home improvement contractor carrying 2 million dollars in general liability and 1 million in commercial auto through Cardinal Mutual Insurance Group, with workers compensation on every crew member. A certificate of insurance goes out on request, which HOA boards and commercial property managers should always ask for.'
      },
      {
        q: 'Are you licensed to apply weed control?',
        a: 'Yes. Indiana OISC Commercial Applicator, Categories 3A Ornamental and 3B Turf, licence number RT-48219. Indiana requires this for commercial application and it is worth asking any company quoting you a weed program for their number.'
      },
      {
        q: 'Will it be the same crew every week?',
        a: 'On maintenance routes, yes. Routes are assigned by crew and by day, so the people cutting your lawn in October are the ones who cut it in April. That is how they learn the property instead of relearning it every visit.'
      },
      {
        q: 'Do I need to be home when you come?',
        a: 'No. We need gate access and a heads up about dogs. Most weekly clients never meet the crew.'
      }
    ]
  },
  {
    id: 'pricing',
    title: 'Pricing and billing',
    items: [
      {
        q: 'Why is pricing shown as starting at?',
        a: 'Because a quarter acre flat lot and a half acre with a slope, three bed lines and a fenced dog run are different jobs. Published prices assume lots up to a quarter acre. Bigger lots use the tier table on the packages page: plus 35 percent to a half acre, plus 70 percent to an acre, custom above that.'
      },
      {
        q: 'Is there a discount for paying up front?',
        a: 'Ten percent off any plan paid in full for the annual contract.'
      },
      {
        q: 'How does billing work?',
        a: 'Seasonal plans are billed monthly across the plan window. Snow is either a flat seasonal rate or per push. Project work is billed on a deposit and completion schedule set out in the proposal.'
      },
      {
        q: 'Do you work with HOAs and commercial properties?',
        a: 'Yes. HOA common areas, small office parks and retail strip centres are roughly a quarter of what we do. Those are always quoted custom, with documented service times and a certificate of insurance on file.'
      }
    ]
  },
  {
    id: 'scheduling',
    title: 'Scheduling, weather and the season',
    items: [
      {
        q: 'What happens if it rains on my service day?',
        a: 'The route slides forward, usually 24 to 48 hours, and we catch up on Saturday if a week gets badly hit. We do not skip a week. Cutting saturated turf tears the grass and leaves ruts, so the delay is the right call.'
      },
      {
        q: 'When does the mowing season start and end?',
        a: 'Roughly April through October, moved by the weather rather than the calendar. The Curb Appeal Plan runs April to October, Full Season runs April to November, and the Estate Plan runs year round.'
      },
      {
        q: 'When do snow contracts open and close?',
        a: 'They open August 1 and close November 1, or earlier when the routes fill. Service runs November 15 through March 15 with 24/7 response for contract clients. Routes are geographic and finite, so signing in August is the difference between being on one and not.'
      },
      {
        q: 'How far out do you book?',
        a: 'Maintenance routes fill in early spring. Fall cleanup and aeration slots fill through September. Hardscape projects are typically booked several weeks out and longer in peak season. If a date matters to you, book earlier than feels necessary.'
      }
    ]
  },
  {
    id: 'service-area',
    title: 'Service area',
    items: [
      {
        q: 'Where do you work?',
        a: 'Carmel, Fishers, Westfield, Zionsville, Noblesville, Whitestown, and the north side of Indianapolis including Meridian-Kessler, Broad Ripple and Nora.'
      },
      {
        q: 'I am just outside your area. Will you still come?',
        a: 'Ask. For project work like a patio or a landscape install we will travel further than we will for a weekly mow, because the drive time is a smaller share of the job. For weekly maintenance and snow, the route has to make geographic sense or we cannot hold the service standard.'
      }
    ]
  }
];

/* Short subset shown in the homepage accordion. */
export const homepageFaqs = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[1].items[0],
  faqGroups[2].items[0],
  faqGroups[3].items[0],
  faqGroups[3].items[2]
];

export const allFaqItems = faqGroups.flatMap((g) => g.items);
