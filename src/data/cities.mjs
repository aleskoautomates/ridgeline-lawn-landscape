/* ---------------------------------------------------------------------------
   src/data/cities.mjs
   One entry = one city page at /service-areas/<slug>/ plus a pin on the
   homepage service-area map and a row in the footer.

   H1 pattern required by the SEO brief: "[Service] in [City], Indiana".
   Each city sets `h1Service` to the service it should rank hardest for there.
--------------------------------------------------------------------------- */

export const cities = [
  {
    slug: 'carmel',
    name: 'Carmel',
    county: 'Hamilton County',
    isHome: true,
    /* Position on the SVG service-area map, as a percentage of the viewBox.
       Roughly geographic, not survey accurate. Adjust by eye. */
    map: { x: 40, y: 62 },
    h1Service: 'Lawn Care and Landscaping',
    metaTitle: 'Lawn Care & Landscaping in Carmel, IN | Ridgeline',
    metaDescription:
      'Carmel lawn mowing, landscape design, hardscaping and snow removal from a crew based here since 2012. Licensed, insured, free estimates in 24 hours.',
    intro:
      'Carmel is home base. It is where the trucks start every morning and where most of our weekly routes run, which means shorter drive times, tighter scheduling and a crew that already knows which streets flood at the corner after a hard rain.',
    body: [
      'We work the full spread of Carmel property types, from the tight zero lot lines around the Arts and Design District to the larger parcels west of Springmill and the established canopy along the older Meridian corridor streets. Each one needs something different. A quarter acre subdivision lot is a mowing and fertilization property. A half acre with forty year old maples is a leaf management problem eight weeks a year. We price them differently because they are different jobs.',
      'The Monon Trail corridor and the roundabout medians set a visible standard in this city, and homeowners here notice edges. That is why a mechanical edge on every drive and walk is standard on our weekly service rather than an upsell.',
      'Snow routes in Carmel fill first every year. If you want a Winter Watch contract for a Carmel address, August and September are the months to lock it, not the week of the first forecast.'
    ],
    featuredServices: ['lawn-mowing', 'fertilization-weed-control', 'hardscaping', 'snow-removal'],
    zips: ['46032', '46033', '46074', '46280', '46290'],
    landmarks: ['Arts & Design District', 'Monon Trail corridor', 'Clay Terrace', 'West Carmel', 'Meridian corridor']
  },

  {
    slug: 'fishers',
    name: 'Fishers',
    county: 'Hamilton County',
    map: { x: 66, y: 60 },
    h1Service: 'Lawn Care and Landscaping',
    metaTitle: 'Lawn Care & Landscaping in Fishers, IN | Ridgeline',
    metaDescription:
      'Weekly mowing, fertilization, paver patios and snow removal in Fishers, Indiana. Same crew every week, photo estimates in 24 hours, licensed and insured.',
    intro:
      'Fishers grew fast, and a lot of it grew at once. That shows up in the yards: whole streets of homes built within a few years of each other, on the same graded clay, with the same builder grade sod and the same drainage quirks.',
    body: [
      'Builder grade lawns in Fishers tend to share a specific problem. The topsoil layer is thin, the subsoil underneath was compacted by heavy equipment during construction, and the grass sits on top of it with nowhere for roots to go. It looks fine for two seasons and then thins out and takes weeds. Core aeration and overseeding is the fix, and it is why that step is built into our six-step program rather than sold separately.',
      'Newer neighbourhoods also mean newer backyards, which is where most of our Fishers hardscape work comes from. A blank rectangle of turf behind a five year old house is the easiest kind of project to design well, because nothing has to be demolished first.',
      'We run weekly mowing routes across Fishers from April through October and hold snow contracts here through the winter.'
    ],
    featuredServices: ['lawn-mowing', 'fertilization-weed-control', 'hardscaping', 'irrigation'],
    zips: ['46037', '46038', '46040', '46060'],
    landmarks: ['Geist Reservoir area', 'Nickel Plate District', 'Sunblest', 'Brooks School Road corridor']
  },

  {
    slug: 'westfield',
    name: 'Westfield',
    county: 'Hamilton County',
    map: { x: 46, y: 34 },
    h1Service: 'Lawn Mowing and Landscaping',
    metaTitle: 'Lawn Mowing & Landscaping in Westfield, IN | Ridgeline',
    metaDescription:
      'Westfield lawn mowing, retaining walls, drainage work and seasonal cleanups. Larger lots welcome, tiered pricing, free photo estimate within 24 hours.',
    intro:
      'Westfield lots run bigger on average than the rest of our service area, and a lot of the newer development sits on ground that used to be farmland with real grade to it. That combination produces the two things we get called about most here: mowing quotes for larger parcels, and water going where nobody wants it.',
    body: [
      'Our flagship project this year is a Westfield backyard, and it is on this site because it is the clearest example of the problem. Three feet of grade were washing out of the yard, the low end was a permanent wet spot, and the family could not use half their own lawn. It took a 42 foot segmental retaining wall, a French drain and a rebuilt grade to turn it into flat usable turf. That is a Westfield job in one sentence.',
      'The Grand Park area brought a lot of new construction with it, which means a lot of young landscapes still finding out what survives here. Zone 6a is not forgiving of the wrong plant in the wrong spot, and we would rather specify correctly the first time than replace things in year three.',
      'Larger lots price on our tiered structure. A half acre lands at plus 35 percent over the base plan, a full acre at plus 70, and anything above an acre gets a custom quote.'
    ],
    featuredServices: ['lawn-mowing', 'hardscaping', 'spring-fall-cleanup', 'landscape-design'],
    zips: ['46074', '46062'],
    landmarks: ['Grand Park', 'Downtown Westfield', 'Chatham Hills area', 'US 31 corridor']
  },

  {
    slug: 'zionsville',
    name: 'Zionsville',
    county: 'Boone County',
    map: { x: 16, y: 66 },
    h1Service: 'Landscape Design and Lawn Care',
    metaTitle: 'Landscape Design & Lawn Care in Zionsville, IN | Ridgeline',
    metaDescription:
      'Landscape design, flagstone walkways, paver patios and full-service lawn care in Zionsville, Indiana. Design renderings before you commit. Licensed and insured.',
    intro:
      'Zionsville has a look, and it is one of the few places in our service area where matching the existing character matters as much as the plant list. Brick, mature trees, older homes with real architecture, and a village core that sets the tone for everything around it.',
    body: [
      'That is why most of our Zionsville work is design led. A flagstone walkway in front of a 1920s home is a different problem from a paver walk at a new build, and getting it wrong is visible from the street forever. We render the design first, in context, so you can see whether the material and the scale actually suit the house before anything is ordered.',
      'The mature canopy through much of Zionsville is an asset and a constraint. It limits what will grow in the beds, it changes the turf mix that will hold under shade, and it makes fall cleanup a multi visit job rather than a single pass. We plan around all three.',
      'Our flagship paver patio and planting project, the one at the top of this site, is a Zionsville build.'
    ],
    featuredServices: ['landscape-design', 'hardscaping', 'tree-shrub-trimming', 'lawn-mowing'],
    zips: ['46077'],
    landmarks: ['Zionsville Village', 'Main Street brick district', 'Eagle Creek corridor', 'Holliday Farms area']
  },

  {
    slug: 'noblesville',
    name: 'Noblesville',
    county: 'Hamilton County',
    map: { x: 74, y: 30 },
    h1Service: 'Lawn Care and Weed Control',
    metaTitle: 'Lawn Care & Weed Control in Noblesville, IN | Ridgeline',
    metaDescription:
      'Noblesville lawn mowing, licensed six-step fertilization and weed control, aeration and overseeding, cleanups and snow removal. Free photo estimates.',
    intro:
      'Noblesville covers a lot of ground and a lot of housing eras, from the older streets around the courthouse square to subdivisions still being finished on the north and east sides. The lawns tell you which is which the moment you look at them.',
    body: [
      'A good share of our Noblesville work is turf rescue. Older lawns that have thinned under shade and compaction, newer lawns that were sodded over compacted construction fill, and a lot of properties in between that have simply never had a program run on them properly. Our before and after gallery includes a Noblesville lawn that went from weed dominated to solid turf across a single season, which is roughly the honest timeline for that kind of recovery.',
      'The six-step licensed program does most of the work, but the visit that changes a lawn most is the fall aeration and overseed in the late August to mid September window. If you are only going to do one thing for a struggling Noblesville lawn, do that one.',
      'Weekly mowing routes run here through the season, and Winter Watch snow contracts cover Noblesville drives and lots.'
    ],
    featuredServices: ['fertilization-weed-control', 'lawn-mowing', 'spring-fall-cleanup', 'snow-removal'],
    zips: ['46060', '46061', '46062'],
    landmarks: ['Downtown square', 'Morse Reservoir area', 'Hazel Dell corridor', 'Riverwalk']
  },

  {
    slug: 'whitestown',
    name: 'Whitestown',
    county: 'Boone County',
    map: { x: 12, y: 44 },
    h1Service: 'Lawn Mowing and Snow Removal',
    metaTitle: 'Lawn Mowing & Snow Removal in Whitestown, IN | Ridgeline',
    metaDescription:
      'Lawn mowing, landscape installation and commercial snow removal in Whitestown, Indiana. Residential plans and custom quotes for lots and business parks.',
    intro:
      'Whitestown has been one of the fastest growing communities in Indiana, and the mix here is different from the rest of our map. Alongside the new residential neighbourhoods there is a lot of commercial and light industrial development, which changes what we get called for.',
    body: [
      'On the residential side it is mostly new construction, which means young landscapes, thin builder topsoil and turf that has never been fed properly. Those lawns respond quickly to a real program because the problems are recent rather than decades deep.',
      'On the commercial side it is lots, drive lanes and entries, and the conversation is almost entirely about snow. Business park and retail properties need documented service times, pre-treatment ahead of a forecast event and a certificate of insurance on file. We carry $2,000,000 general liability and workers compensation on every crew member, and the COI goes out on request.',
      'Whitestown sits at the western edge of our service area. We hold routes here, but they are finite, so commercial snow contracts in particular should be signed early in the fall.'
    ],
    featuredServices: ['snow-removal', 'lawn-mowing', 'landscape-design', 'fertilization-weed-control'],
    zips: ['46075'],
    landmarks: ['Anson development', 'Whitestown business parks', 'Perry Worth area', 'I-65 corridor']
  },

  {
    slug: 'north-indianapolis',
    name: 'North Indianapolis',
    displayName: 'North-Side Indianapolis',
    county: 'Marion County',
    map: { x: 44, y: 88 },
    h1Service: 'Lawn Care and Landscaping',
    metaTitle: 'Lawn Care & Landscaping | Broad Ripple, Nora & Meridian-Kessler',
    metaDescription:
      'Lawn care, landscape design and cleanups in Meridian-Kessler, Broad Ripple and Nora on the north side of Indianapolis. Mature-lot specialists. Free estimates.',
    intro:
      'The north side of Indianapolis is our oldest ground, and it is nothing like the subdivisions further north. Meridian-Kessler, Broad Ripple and Nora are mature neighbourhoods with mature trees, narrow lots, alley access and landscapes that in some cases have been in place for fifty years.',
    body: [
      'Old canopy changes everything. Shade limits what turf will hold, roots compete with anything you plant under them, and leaf volume in the fall is several times what a newer neighbourhood produces. Fall cleanup here is a multi pass job by necessity, not by upsell, because the maples and the oaks drop weeks apart.',
      'Access is the other constraint. Narrow drives, alleys, tight side yards and street parking mean the equipment that works in Westfield does not always fit here. We scale the crew and the machines to the property rather than showing up with a mower that cannot get through the gate.',
      'A lot of the landscape work on the north side is restoration rather than installation. Overgrown foundation beds that have swallowed the windows, shrubs that were sheared into blocks for two decades, bed lines that disappeared years ago. Most of it can be brought back over two or three seasons of staged pruning and selective replacement, which is cheaper and better than tearing it all out.'
    ],
    featuredServices: ['spring-fall-cleanup', 'tree-shrub-trimming', 'landscape-design', 'lawn-mowing'],
    zips: ['46208', '46220', '46240', '46260'],
    landmarks: ['Meridian-Kessler', 'Broad Ripple Village', 'Nora', 'Butler-Tarkington edge', 'Monon Trail']
  }
];

export const cityBySlug = Object.fromEntries(cities.map((c) => [c.slug, c]));

/* Plain list used in schema areaServed and in body copy. */
export const cityNames = cities.map((c) => c.displayName || c.name);
