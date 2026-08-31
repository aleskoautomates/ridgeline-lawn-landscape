/* ---------------------------------------------------------------------------
   src/data/about.mjs
   Copy and crew for the /about/ page and the homepage "who we are" block.

   NOTE ON THE CREW LIST
   Marcus Delgado is the only real, client-supplied person. The other cards
   are structural placeholders so the layout is finished and ready. Replace
   each one with a real crew member (name, role, one honest line) or delete
   it. Do not ship invented people, and do not use stock headshots of people
   who do not work here. Both are trivially detectable and both cost more
   trust than an empty section ever would.
--------------------------------------------------------------------------- */

export const about = {
  headline: 'Fourteen years on the same roads.',
  lede:
    'Ridgeline started in 2012 with one truck, one trailer and a Carmel route that Marcus Delgado could finish by himself. It is bigger now. The standard has not moved.',

  story: [
    {
      heading: 'Why the company exists',
      text:
        'Marcus spent his first years in this trade watching crews cut corners in ways homeowners could not see. Base depth on a patio. Blade sharpness on a mow. A pre-emergent going down three weeks late because the calendar said April rather than because the soil said 55 degrees. None of it shows up the day the invoice is paid. All of it shows up in year three. Ridgeline was built to do the parts nobody checks, on the theory that fourteen years of retained clients is a better business than fourteen years of new ones.'
    },
    {
      heading: 'How we actually run',
      text:
        'Routes are fixed and assigned by crew, so your property is served by people who know it. Estimates come back inside 24 hours, usually from photos rather than a site visit, because your Saturday is worth more than our convenience. Prices are published rather than negotiated on a doorstep. And when something is outside what we do well, like a tree over 25 feet or a wall that needs a stamped engineering drawing, we say so and hand you a name instead of improvising.'
    },
    {
      heading: 'Licensed, insured, and happy to prove it',
      text:
        'Registered Indiana home improvement contractor. Two million dollars in general liability and one million in commercial auto through Cardinal Mutual Insurance Group. Workers compensation on every crew member, which matters to you because an uninsured worker injured on your property can become your problem. Indiana OISC Commercial Applicator licence RT-48219 in Categories 3A and 3B, which is legally required to put weed control on your lawn and is worth asking every competitor about. Certificates of insurance go out on request, same day.'
    },
    {
      heading: 'Residential and commercial, both properly',
      text:
        'About three quarters of our work is residential. The rest is HOA common areas, small office parks and retail strip centres, which run on documented service times, insurance certificates on file and a phone that gets answered during a snow event. Those two sides of the business keep each other honest. Commercial work forces the documentation discipline. Residential work forces the finish quality.'
    }
  ],

  stats: [
    { value: '14', label: 'Years in business', detail: 'Founded 2012, same owner' },
    { value: '7', label: 'Cities served', detail: 'Hamilton, Boone and north Marion' },
    { value: '24 hr', label: 'Estimate turnaround', detail: 'Weekdays, usually from photos' },
    { value: '2 in', label: 'Snow trigger', detail: 'Automatic dispatch, no call needed' }
  ],

  crewPhoto: {
    base: 'ridgeline-crew',
    alt: 'The Ridgeline Lawn and Landscape crew standing with their trucks and equipment trailer in Carmel, Indiana.',
    w: 1600,
    h: 900
  }
};

export const crew = [
  {
    name: 'Marcus Delgado',
    role: 'Owner and Licensed Applicator',
    isPlaceholder: false,
    bio:
      'Founded Ridgeline in 2012 and still walks the hardscape jobs himself. Holds the Indiana OISC Commercial Applicator licence, Categories 3A and 3B, licence RT-48219, which means every application this company makes is his signature.',
    photo: {
      base: 'crew-marcus-delgado',
      alt: 'Marcus Delgado, owner of Ridgeline Lawn and Landscape, on a job site in Carmel, Indiana.',
      w: 800,
      h: 800
    }
  },
  {
    name: 'PLACEHOLDER - Crew Lead',
    role: 'Maintenance Crew Lead',
    isPlaceholder: true,
    bio:
      'Replace with a real crew lead: their name, how long they have been with Ridgeline, and one specific thing they are known for. One honest sentence beats three generic ones. Delete this card if there is nobody to put in it.',
    photo: {
      base: 'crew-placeholder-2',
      alt: 'Placeholder portrait slot for a Ridgeline Lawn and Landscape crew lead.',
      w: 800,
      h: 800
    }
  },
  {
    name: 'PLACEHOLDER - Hardscape Foreman',
    role: 'Hardscape Foreman',
    isPlaceholder: true,
    bio:
      'Replace with the person who runs patio and retaining wall builds. Mention years of experience and a signature project if there is one. Delete this card if there is nobody to put in it.',
    photo: {
      base: 'crew-placeholder-3',
      alt: 'Placeholder portrait slot for a Ridgeline Lawn and Landscape hardscape foreman.',
      w: 800,
      h: 800
    }
  },
  {
    name: 'PLACEHOLDER - Office and Scheduling',
    role: 'Scheduling and Estimates',
    isPlaceholder: true,
    bio:
      'Replace with whoever answers the phone and turns estimates around. This is often the most reassuring card on the page, because it is the person a customer will actually deal with. Delete this card if there is nobody to put in it.',
    photo: {
      base: 'crew-placeholder-4',
      alt: 'Placeholder portrait slot for Ridgeline Lawn and Landscape scheduling and estimates staff.',
      w: 800,
      h: 800
    }
  }
];

export const crewHasPlaceholders = crew.some((c) => c.isPlaceholder);
