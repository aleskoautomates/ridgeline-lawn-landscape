/* ---------------------------------------------------------------------------
   src/data/services.mjs
   One entry = one service page + one card in the homepage grid + one row in
   the nav and footer. Add an object to this array and a full page appears at
   /services/<slug>/ on the next build. Nothing else to touch.
--------------------------------------------------------------------------- */

export const services = [
  /* ======================================================================= */
  {
    slug: 'lawn-mowing',
    name: 'Weekly Lawn Mowing & Maintenance',
    navLabel: 'Lawn Mowing & Maintenance',
    cityLabel: 'Lawn Mowing',
    category: 'lawn-care',
    icon: 'mower',
    metaTitle: 'Weekly Lawn Mowing in Carmel, IN | Ridgeline Lawn & Landscape',
    metaDescription:
      'Weekly and biweekly lawn mowing in Carmel, Fishers, Westfield and Zionsville. Mow, trim, edge, blow clean, same crew, same day each week. Plans from $189/month.',
    tagline: 'Same crew, same day, every week.',
    lede:
      'A mowed lawn is the thing your neighbours notice first and the thing you notice last, right up until the week it gets skipped. We run fixed routes so your property lands on the same day every week, and the crew that shows up in July is the crew that showed up in April.',
    body: [
      {
        heading: 'What a Ridgeline mow actually includes',
        text:
          'Plenty of companies quote "mowing" and mean four passes with a deck and a wave from the truck. Every visit we make covers the full cut: the mow itself at the right height for the season, string trimming around every bed, tree ring, post and foundation, a clean mechanical edge along drives and walks, and a full blow down so no clippings sit on your hard surfaces. If we cannot leave it looking finished, we are not done.'
      },
      {
        heading: 'Cutting height matters more than cutting frequency',
        text:
          'Central Indiana sits in the turf transition zone, which means cool-season grass under warm-season heat. We raise decks through June, July and August so the canopy shades its own root zone and holds moisture, then drop back down for the last cuts of the season to reduce matting under snow. Blades get sharpened on a schedule because a torn leaf blade browns at the tip and invites disease, and a torn lawn looks dull from the street even when the height is right.'
      },
      {
        heading: 'Clippings, and why we usually leave them',
        text:
          'Mulched clippings return nitrogen to the soil and break down inside a week when the cut is regular. We mulch by default. When growth outruns the schedule after a wet stretch, or you want a show finish for an event, we bag and haul instead. Tell us your preference once and it stays on your work order.'
      }
    ],
    includes: [
      'Mow at the correct seasonal height with sharp blades',
      'String trim every bed line, tree ring, fence line and foundation',
      'Mechanical edge on driveways, sidewalks and curb lines',
      'Full blow down of drives, walks, patios and porches',
      'Clipping management, mulched by default or bagged on request',
      'Weekly or biweekly schedules, April through October',
      'Same crew and same service day, week to week',
      'A quick eye on the property each visit, so problems get flagged early'
    ],
    process: [
      { title: 'Send photos', text: 'Two or three shots of the yard and we can price it without booking a site visit.' },
      { title: 'Lock your day', text: 'You get a fixed weekday on a fixed route. Routes fill in spring, so earlier is better.' },
      { title: 'First cut', text: 'The crew walks the property with you if you want, notes bed lines and obstacles, and cuts.' },
      { title: 'Every week after', text: 'Same day, same crew. Rain pushes the route, never skips it.' }
    ],
    pricingNote:
      'Weekly mowing starts at $189 per month on the Curb Appeal Plan for lots up to a quarter acre. Larger lots are tiered. Most Carmel and Westfield subdivision lots land in the first or second tier.',
    relatedPackages: ['curb-appeal', 'full-season', 'estate'],
    faqs: [
      {
        q: 'What happens when it rains on my service day?',
        a: 'The route slides, it does not disappear. Heavy rain pushes the day forward, usually by 24 to 48 hours, and we catch up on Saturday if a week gets badly hit. Mowing saturated turf tears it and leaves ruts, so waiting a day is the right call even when the calendar says otherwise.'
      },
      {
        q: 'Do I need to be home?',
        a: 'No. We need gate access and a heads up about dogs. Most of our weekly clients have never met the crew in person, which is the point.'
      },
      {
        q: 'Can I do biweekly instead of weekly?',
        a: 'In May and September, yes. Through the peak growth weeks in late spring, biweekly means removing more than a third of the leaf blade in one pass, which stresses the turf and leaves clumps. We will do it if you ask, but we will tell you honestly what it costs the lawn.'
      },
      {
        q: 'Do you mow year round?',
        a: 'The mowing season runs roughly April through October depending on the weather. The Estate Plan carries through the winter with other work, and snow removal is a separate contract that runs November 15 through March 15.'
      }
    ],
    image: {
      base: 'mowing-carmel-subdivision',
      alt: 'Striped weekly mow on a front lawn at a Carmel, Indiana subdivision home with clean edges along the driveway.'
    }
  },

  /* ======================================================================= */
  {
    slug: 'landscape-design',
    name: 'Landscape Design & Installation',
    navLabel: 'Landscape Design & Installation',
    cityLabel: 'Landscape Design',
    category: 'landscape-design',
    icon: 'leaf',
    metaTitle: 'Landscape Design & Installation | Carmel & Zionsville, IN',
    metaDescription:
      'Landscape design and installation in Carmel, Zionsville and Fishers. 3D concept renderings, Zone 6a plant selection, bed construction, mulch, stone and lighting.',
    tagline: 'See it rendered before we ever break ground.',
    lede:
      'Most landscape regret comes from picking plants at a garden centre on a Saturday and hoping it works out. We design the whole thing first, show it to you in 3D from the angles you actually look at the house from, and only then start digging.',
    body: [
      {
        heading: 'You see it before you buy it',
        text:
          'Every design starts with measurements, sun mapping and a conversation about how you use the space. You get a 3D concept rendering of the finished planting, at maturity, from your front walk and from inside your main windows. Changing a plant palette on a rendering costs a phone call. Changing it after installation costs a weekend and a nursery invoice.'
      },
      {
        heading: 'Plants that survive USDA Zone 6a',
        text:
          'Central Indiana runs Zone 6a, with winter lows that can touch minus 10 Fahrenheit and summers humid enough to rot anything that wants dry feet. We specify to that reality. That means proven performers for our clay soils and our freeze thaw cycles, structure from evergreens so the beds are not bare from November to April, and a mix that carries colour across three seasons instead of peaking for two weeks in May.'
      },
      {
        heading: 'The parts nobody photographs',
        text:
          'A bed is only as good as what is under it. We cut clean spade edges that hold their line, amend the clay where it needs it, set proper bed depth, and grade so water runs away from the foundation rather than pooling at it. Landscape fabric goes in where it earns its keep and stays out where it just chokes the soil. Then mulch or stone goes on at the right depth, which is two to three inches, not the six inch volcano piled against a trunk that you see all over the north side.'
      },
      {
        heading: 'Lighting, last but planned first',
        text:
          'Low voltage landscape lighting doubles the hours your investment is visible. We run the sleeves and conduit during installation, when the trenches are already open, even if the fixtures come later. Retrofitting light into a finished bed means cutting it back open.'
      }
    ],
    includes: [
      '3D concept renderings before any work starts',
      'Site measurement, sun mapping and drainage assessment',
      'Plant selection specified for USDA Zone 6a and central Indiana clay',
      'Bed construction, spade edging and soil amendment',
      'Hardwood mulch or decorative stone at proper depth',
      'Low voltage landscape lighting design and installation',
      'Foundation plantings, island beds and full front yard rebuilds',
      'Plant warranty terms in writing before you sign'
    ],
    process: [
      { title: 'Walk the property', text: 'We measure, photograph, check drainage and sun, and ask how you actually use the yard.' },
      { title: 'Concept and rendering', text: 'You get a 3D view of the finished planting at maturity, plus a plant list and a number.' },
      { title: 'Revise', text: 'Two rounds of changes are included. This is the cheap part of the project. Use it.' },
      { title: 'Install', text: 'Beds cut, soil prepped, plants set, mulch laid, lighting run, site left clean.' },
      { title: 'Establishment', text: 'You get a watering schedule for the first season. Most plant loss is a watering problem, not a plant problem.' }
    ],
    pricingNote:
      'Design and installation is quoted per project. Foundation bed rebuilds commonly run in the low thousands. Full front yard redesigns are larger. Send photos and we will give you an honest range before anyone comes out.',
    relatedPackages: ['estate'],
    faqs: [
      {
        q: 'Do you charge for the design?',
        a: 'A design fee applies for full property plans and is credited back against the installation if you build with us. Smaller single bed projects are quoted directly with no separate design charge.'
      },
      {
        q: 'When is the best time to plant in central Indiana?',
        a: 'Fall is the best window and spring is the second best. Roots keep growing in warm soil after the air cools, so a September or October planting goes into summer with a season of establishment already behind it. We plant through the season, but if you have the choice, choose fall.'
      },
      {
        q: 'Do the plants come with a warranty?',
        a: 'Yes, and the terms are written on the proposal before you sign rather than mentioned after something dies. Warranty assumes the watering schedule was followed, because it usually comes down to water.'
      }
    ],
    image: {
      base: 'landscape-design-zionsville-front',
      alt: 'Newly installed foundation planting with boxwood, hydrangea and hardwood mulch at a Zionsville, Indiana brick home.'
    }
  },

  /* ======================================================================= */
  {
    slug: 'spring-fall-cleanup',
    name: 'Spring & Fall Cleanup',
    navLabel: 'Spring & Fall Cleanup',
    cityLabel: 'Spring and Fall Cleanup',
    category: 'cleanups',
    icon: 'rake',
    metaTitle: 'Spring & Fall Yard Cleanup | Carmel & Hamilton County, IN',
    metaDescription:
      'Spring and fall yard cleanup in Carmel, Fishers, Westfield and Noblesville. Bed cutbacks, dethatching, leaf removal and haul away, gutter clearing, bed winterizing.',
    tagline: 'Two visits a year that decide how the other fifty look.',
    lede:
      'Cleanup is the least glamorous work we do and the highest leverage. A yard that gets cut back properly in March and cleared properly in November spends the rest of the year needing less of everything else.',
    body: [
      {
        heading: 'Spring cleanup: reset the whole property',
        text:
          'We cut back perennials and ornamental grasses to the right height, pull the winter debris out of the beds, dethatch where the mat has built up past half an inch, clear the leaf litter that blew in over winter, re-cut the bed edges that frost heave pushed out of line, and refresh mulch if it is on the plan. The property goes from dormant to ready in one visit, before the first mow.'
      },
      {
        heading: 'Fall cleanup: get it off the turf before it mats',
        text:
          'Leaves left on a lawn under snow do not compost politely. They mat, they smother, and they set up snow mould that shows as grey or pink patches when the snow pulls back in March. We clear and haul leaves off site rather than blowing them to the treeline, cut back what should be cut back, leave standing what feeds birds and holds winter interest, and winterize the beds.'
      },
      {
        heading: 'Timing beats thoroughness',
        text:
          'One perfect cleanup in early November is worse than two passes in late October and early December. In Hamilton County the oaks hold their leaves weeks after the maples drop, so a single visit either goes too early and misses half of them or waits so long the first ones have already matted. Full Season and Estate clients get the visits sequenced around that.'
      }
    ],
    includes: [
      'Perennial and ornamental grass cutbacks at the correct height',
      'Bed debris removal and re-edging',
      'Dethatching where thatch exceeds half an inch',
      'Complete leaf removal with haul away, not blown to the treeline',
      'Gutter clearing on single story and standard two story homes',
      'Bed winterizing and mulch top off',
      'Final low cut on the last mow of the season',
      'Multi pass scheduling in fall so late dropping trees get covered'
    ],
    process: [
      { title: 'Book the window', text: 'Spring runs March into April. Fall runs late October into early December. Both fill.' },
      { title: 'Walk and flag', text: 'We note what gets cut back, what stays standing over winter, and what needs replacing.' },
      { title: 'Clear and haul', text: 'Debris leaves the property. Nothing gets stashed behind the shed.' },
      { title: 'Set up the next season', text: 'Beds winterized in fall, edged and mulched in spring.' }
    ],
    pricingNote:
      'Cleanups are quoted per property based on tree cover and bed footage. Both cleanups are bundled into the Full Season Plan and the Estate Plan, which is almost always cheaper than booking them one off.',
    relatedPackages: ['full-season', 'estate'],
    faqs: [
      {
        q: 'When should fall cleanup happen?',
        a: 'For most Hamilton County properties the main pass lands between the last week of October and the third week of November, with a follow up if you have oaks or a heavy canopy. Waiting until every leaf is down usually means waiting until they have already matted under the first snow.'
      },
      {
        q: 'Where do the leaves go?',
        a: 'Off your property. We haul them out rather than piling them at the back fence, which is where they turn into next spring’s weed nursery.'
      },
      {
        q: 'Do you do gutters?',
        a: 'Yes, on single story and standard two story homes as part of cleanup. Steep pitches, third stories and anything needing a lift are outside what we do, and we will say so rather than sending someone up there.'
      }
    ],
    image: {
      base: 'fall-cleanup-carmel-leaves',
      alt: 'Crew clearing maple leaves from a front lawn and beds during fall cleanup at a Carmel, Indiana home.'
    }
  },

  /* ======================================================================= */
  {
    slug: 'fertilization-weed-control',
    name: 'Fertilization & Weed Control',
    navLabel: 'Fertilization & Weed Control',
    cityLabel: 'Fertilization and Weed Control',
    category: 'lawn-care',
    icon: 'flask',
    metaTitle: 'Licensed Lawn Fertilization & Weed Control | Carmel, IN',
    metaDescription:
      'Six-step licensed turf program in Carmel and Hamilton County. Pre-emergent, broadleaf weed control, grub prevention, aeration and overseeding. Indiana OISC licensed.',
    tagline: 'Six visits, licensed applicator, no guesswork.',
    lede:
      'Anybody can buy a bag of fertilizer. Applying a restricted use product on someone else’s property in Indiana requires a licence, and getting the timing right requires knowing what the soil temperature is doing, not what the calendar says.',
    body: [
      {
        heading: 'Licensed, and here is the number',
        text:
          'Marcus holds an Indiana Office of Indiana State Chemist Commercial Applicator licence in Categories 3A Ornamental and 3B Turf, licence number RT-48219. That is a legal requirement for commercial application in this state and a fair number of trucks on the road do not have one. Ask anyone quoting you a weed program for theirs.'
      },
      {
        heading: 'The six steps',
        text:
          'Round one is the early spring pre-emergent that stops crabgrass before it germinates. Round two is late spring fertilizer with broadleaf control for dandelion, clover and creeping charlie. Round three is the early summer application timed for grub prevention, which has to go down before the beetles lay rather than after the damage shows. Round four is a summer stress treatment at a low rate, because pushing nitrogen into dormant turf in July burns it. Round five is the early fall feeding that does the real work of the year, paired with aeration and overseeding. Round six is the late fall winterizer that goes into the roots and shows up as green in March.'
      },
      {
        heading: 'Pre-emergent is a two week window',
        text:
          'Crabgrass germinates when soil temperature at two inches holds around 55 Fahrenheit for several consecutive days. In central Indiana that is typically somewhere in the back half of March through mid April, and it moves by two or three weeks year to year. Apply late and you are spraying a lawn that has already germinated. This is the single most common reason a fertilization program underdelivers.'
      },
      {
        heading: 'Aeration and overseeding, bundled in',
        text:
          'Our clay compacts. Core aeration pulls plugs, opens the soil to air and water, and gives overseed actual soil contact instead of a seed sitting on thatch. Late August through mid September is the window. Seed put down then goes into warm soil with cooling air, which is exactly what cool season grass wants, and it establishes before winter.'
      }
    ],
    includes: [
      'Six scheduled applications across the season',
      'Early spring pre-emergent crabgrass control',
      'Broadleaf weed control for dandelion, clover and creeping charlie',
      'Grub prevention timed before egg lay, not after damage',
      'Low rate summer stress treatment',
      'Core aeration and overseeding in the fall window',
      'Late fall winterizer application',
      'Applied by an Indiana OISC licensed commercial applicator',
      'Posted notification at application, per Indiana requirements'
    ],
    process: [
      { title: 'Soil and turf assessment', text: 'We identify the grass type, the weed pressure and whether the problem is nutrition, water or compaction.' },
      { title: 'Program set', text: 'Six visits scheduled across the season, timed to soil temperature rather than a fixed calendar.' },
      { title: 'Application with notes', text: 'Every visit leaves a record of what went down, at what rate, and what to expect.' },
      { title: 'Fall aeration and seed', text: 'The visit that changes the lawn most. Late August into mid September.' }
    ],
    pricingNote:
      'The six-step program is included in the Full Season Plan and the Estate Plan. It can be bought standalone and is quoted by turf square footage, which we can measure from an aerial rather than a site visit.',
    relatedPackages: ['full-season', 'estate'],
    faqs: [
      {
        q: 'Is it safe for kids and dogs?',
        a: 'Follow the re-entry interval on the notice we post, which for most of what we apply means staying off until the treated area is dry. That is typically one to two hours. We post it at the application rather than making you call and ask.'
      },
      {
        q: 'Why is my lawn still getting weeds?',
        a: 'Pre-emergent stops seeds from germinating, it does not kill what already grew, and it breaks down over the season. A lawn under real pressure from a neighbouring untreated yard will keep getting seed blown in. Thick turf is the actual long term answer, which is why aeration and overseeding are in the program rather than sold as an extra.'
      },
      {
        q: 'Can you fix a lawn that is mostly weeds?',
        a: 'Usually, over one full season, with aeration and overseeding doing most of the lifting. If the turf is under about forty percent coverage a renovation is the honest answer and we will tell you that instead of selling you six applications that will not get there.'
      }
    ],
    image: {
      base: 'fertilization-noblesville-turf',
      alt: 'Dense green tall fescue turf after a full season of fertilization and overseeding at a Noblesville, Indiana property.'
    }
  },

  /* ======================================================================= */
  {
    slug: 'hardscaping',
    name: 'Hardscaping: Patios, Walkways & Retaining Walls',
    navLabel: 'Hardscaping & Patios',
    cityLabel: 'Patios and Hardscaping',
    category: 'hardscaping',
    icon: 'paver',
    metaTitle: 'Paver Patios, Walkways & Retaining Walls | Carmel, IN',
    metaDescription:
      'Paver patios, natural stone walkways, segmental retaining walls, fire pits and seat walls in Carmel, Zionsville and Westfield. Built on a compacted base that lasts.',
    tagline: 'Built on a base you will never see and never have to think about.',
    lede:
      'A paver patio is ninety percent excavation and base and ten percent the part you look at. Failures are almost never the pavers. They are a base that was four inches when it needed eight, compacted in one lift instead of three, on soil that was never allowed to drain.',
    body: [
      {
        heading: 'What is under the patio',
        text:
          'Central Indiana clay holds water and heaves when it freezes. We excavate to depth, install and compact open graded or dense graded aggregate in lifts, screed a proper bedding layer, and account for drainage before the first paver is set. Every patio gets pitched away from the house, because a beautiful patio that sends water at your foundation is a liability, not an amenity.'
      },
      {
        heading: 'Retaining walls that are engineered, not stacked',
        text:
          'Segmental block walls need a buried base course, compacted backfill, drainage aggregate behind the wall with a drain tile at the bottom, and geogrid tied back into the slope on anything with real load. A wall built without those is a wall with a timeline. Indiana municipalities generally require engineering and permitting above four feet, and we will tell you when you have crossed that line rather than quietly building to three foot eleven.'
      },
      {
        heading: 'Fire pits, seat walls and the rest of the room',
        text:
          'The patio is the floor. What makes people actually use it is the walls and the reason to sit down. Seat walls solve seating without hauling out chairs, a fire pit extends your usable season by about two months on each end, and lighting extends the usable day. All of it is easier and cheaper to run while the base is open.'
      },
      {
        heading: 'Drainage is part of the job, not an add on',
        text:
          'French drains, downspout extensions, dry creek beds and catch basins get designed into the project up front. Hardscape changes how water moves across a property by definition. Ignoring that is how a new patio turns the low corner of the yard into a pond.'
      }
    ],
    includes: [
      'Paver patios in concrete paver or natural stone',
      'Flagstone and paver walkways and front entries',
      'Segmental block retaining walls with drainage and geogrid',
      'Seat walls, steps, columns and caps',
      'Wood burning and gas fire pits',
      'Integrated drainage: French drains, catch basins, downspout tie ins',
      'Polymeric sand joints and edge restraint',
      'Full excavation, base and compaction in lifts, not one pour'
    ],
    process: [
      { title: 'Design and layout', text: 'Shape, material, elevation and how it connects to the house and the lawn.' },
      { title: 'Locate and permit', text: 'Utility locates every time. Permits and engineering where the wall height or code calls for it.' },
      { title: 'Excavate and base', text: 'The part that takes the longest and decides whether it is still flat in ten years.' },
      { title: 'Set and finish', text: 'Pavers laid, cut, edge restrained, joints filled and compacted, site cleaned.' },
      { title: 'Restore the lawn', text: 'Equipment paths get repaired and seeded. We do not leave you a patio and a mud track.' }
    ],
    pricingNote:
      'Hardscape is quoted per project after a site visit, because grade and access change the number more than square footage does. Photos plus rough dimensions get you an honest range the same week.',
    relatedPackages: [],
    faqs: [
      {
        q: 'How long does a paver patio take?',
        a: 'A straightforward 300 to 400 square foot patio is usually four to six working days. Walls, steps, grade changes and poor access add days. We give you a start date and a finish date in writing and we do not stack three jobs at once.'
      },
      {
        q: 'Do I need a permit?',
        a: 'For a ground level patio in most of our service area, generally no. For retaining walls above four feet, and for anything altering drainage across a property line, usually yes, and often with engineering. We handle the filing and we tell you before you sign, not after.'
      },
      {
        q: 'What is the best time of year to build?',
        a: 'Anything from spring thaw through late fall. Fall is genuinely good: the ground is workable, the crews are past the mowing crunch, and you go into spring with the patio already done instead of waiting through the busiest quarter.'
      },
      {
        q: 'Will the pavers settle?',
        a: 'Properly based hardscape does not meaningfully settle. Ours carries a workmanship warranty in writing. If it moves because of how we built it, we come back.'
      }
    ],
    image: {
      base: 'paver-patio-zionsville-firepit',
      alt: 'Paver patio with a circular fire pit and seat wall installed behind a Zionsville, Indiana home.'
    }
  },

  /* ======================================================================= */
  {
    slug: 'irrigation',
    name: 'Irrigation Installation & Repair',
    navLabel: 'Irrigation',
    cityLabel: 'Irrigation',
    category: 'irrigation',
    icon: 'droplet',
    metaTitle: 'Sprinkler System Install & Repair | Carmel & Fishers, IN',
    metaDescription:
      'Irrigation installation, head replacement, smart controller upgrades, spring startups and fall blowouts in Carmel, Fishers, Westfield and Zionsville, Indiana.',
    tagline: 'Water where the lawn needs it, not on the driveway.',
    lede:
      'Most irrigation problems are not broken systems. They are systems watering the wrong amount at the wrong time of day, through heads that drifted out of alignment three seasons ago and are now doing a very thorough job on the sidewalk.',
    body: [
      {
        heading: 'New installs, zoned properly',
        text:
          'Zones get designed around what the plants need, not around what fits on a manifold. Turf, shade beds and sun beds have different requirements and putting them on one zone guarantees that something is always over or under watered. We calculate head spacing for head to head coverage, check static pressure and available flow before designing, and install a backflow preventer to code.'
      },
      {
        heading: 'Smart controllers actually pay for themselves',
        text:
          'A weather based controller pulls local data and skips cycles after rain instead of running the full program into a puddle. On a typical Hamilton County property it cuts water use meaningfully over a season and, more importantly, stops the chronic overwatering that causes most fungal turf disease. We upgrade existing systems without replacing what already works underground.'
      },
      {
        heading: 'Spring startup and fall blowout, on schedule',
        text:
          'Startup means charging the system slowly, walking every zone, checking each head, adjusting arcs and finding the winter damage before it wastes a month of water. Blowout means clearing every line with compressed air before the first hard freeze. Water left in a lateral line or a backflow assembly expands when it freezes and cracks fittings, and that repair costs many times what the blowout does.'
      },
      {
        heading: 'When to book the blowout',
        text:
          'Central Indiana typically sees its first hard freeze somewhere from mid October into early November, and it does not send a warning. Blowouts should be done by mid October. Waiting for the forecast to threaten is how people end up on a two week waiting list during a cold snap.'
      }
    ],
    includes: [
      'New system design and installation with proper zoning',
      'Head replacement, nozzle changes and arc adjustment',
      'Valve, solenoid and wire fault diagnosis and repair',
      'Smart and weather based controller upgrades',
      'Backflow preventer installation and testing',
      'Spring startup with a full zone by zone walk',
      'Fall blowout with compressed air before first freeze',
      'Drip conversion for beds and container plantings'
    ],
    process: [
      { title: 'Pressure and flow check', text: 'Everything else depends on this. A design that ignores it will underperform forever.' },
      { title: 'Zone plan', text: 'Turf, sun beds and shade beds separated so each gets what it needs.' },
      { title: 'Install or repair', text: 'Clean trenching, minimal turf disruption, everything mapped for the next technician.' },
      { title: 'Seasonal service', text: 'Startup in spring, blowout by mid October, on a standing schedule so you never have to call.' }
    ],
    pricingNote:
      'Startups and blowouts are priced per zone. New installs are quoted per property. Irrigation startup and blowout are both bundled into the Estate Plan.',
    relatedPackages: ['estate'],
    faqs: [
      {
        q: 'When should I get my sprinklers blown out in Indiana?',
        a: 'By mid October. The first hard freeze in central Indiana can arrive anywhere from mid October into early November and it does not need to be a long freeze to crack a fitting. Book early, because everyone calls the same week the forecast turns.'
      },
      {
        q: 'How much water should my lawn actually get?',
        a: 'Roughly an inch a week including rainfall, delivered in one or two deep soakings rather than a light daily cycle. Deep and infrequent drives roots down. Daily light watering keeps them at the surface, which is exactly where you do not want them in July.'
      },
      {
        q: 'Can you work on a system somebody else installed?',
        a: 'Yes, that is most of what we do. We map it as we go so the next visit is not a treasure hunt.'
      }
    ],
    image: {
      base: 'irrigation-head-fishers',
      alt: 'Rotary sprinkler head running across a green lawn during a spring irrigation startup in Fishers, Indiana.'
    }
  },

  /* ======================================================================= */
  {
    slug: 'tree-shrub-trimming',
    name: 'Tree & Shrub Trimming',
    navLabel: 'Tree & Shrub Trimming',
    cityLabel: 'Tree and Shrub Trimming',
    category: 'landscape-design',
    icon: 'shears',
    metaTitle: 'Shrub Trimming & Ornamental Pruning | Carmel, IN',
    metaDescription:
      'Ornamental pruning, shrub shaping and deadwooding on trees under 25 feet in Carmel, Westfield and Zionsville. Seasonal disease and insect treatments available.',
    tagline: 'Pruned on the plant’s schedule, not the crew’s.',
    lede:
      'The reason so many foundation shrubs look like green cinder blocks is that they get sheared whenever the truck is in the neighbourhood. Pruning has a right time and a right cut, and both depend on the plant.',
    body: [
      {
        heading: 'Timing is the whole thing',
        text:
          'Spring flowering shrubs like lilac, forsythia and most hydrangea species set their buds the previous summer. Shear them in March and you have just cut off the entire bloom. Summer flowering shrubs bloom on new wood and want a late winter cut. We prune to the plant, which sometimes means telling you we are coming back in six weeks instead of doing it while we are already here.'
      },
      {
        heading: 'Shaping versus shearing',
        text:
          'Shearing makes an outer shell of growth that shades out the interior until the plant is hollow, green on the outside and bare sticks within. Selective hand pruning opens the plant, keeps light moving through it, and holds its natural form. It takes longer. It also means the shrub still looks like a plant in year five.'
      },
      {
        heading: 'Trees under 25 feet',
        text:
          'We deadwood, raise canopies, clear structures and roof lines, and remove crossing and rubbing branches on ornamental and small trees up to about twenty five feet. Above that, or anything near a power line, is a certified arborist and a bucket truck, and we will refer you rather than improvise. We do not top trees. Topping is not pruning, it permanently damages the tree, and no reputable company does it.'
      },
      {
        heading: 'Disease and insect treatments',
        text:
          'Bagworms on arborvitae and spruce, scale on euonymus, aphids, spider mites in a dry August, and the fungal issues that come with a humid Indiana summer all respond well when caught on time and poorly when caught late. Treatments are applied under the same OISC applicator licence as the turf program.'
      }
    ],
    includes: [
      'Selective hand pruning and natural form shaping',
      'Ornamental tree pruning and canopy raising under 25 feet',
      'Deadwooding and removal of crossing branches',
      'Hedge and screen maintenance',
      'Rejuvenation pruning on overgrown shrubs, staged over seasons',
      'Clearance pruning off roofs, walks and structures',
      'Seasonal disease and insect treatments, licensed application',
      'All debris chipped or hauled, nothing left behind'
    ],
    process: [
      { title: 'Identify what is planted', text: 'The prune depends on the species and when it sets bud. We identify before we cut.' },
      { title: 'Schedule to the plant', text: 'Some things get pruned in late winter, some right after bloom, some not this year at all.' },
      { title: 'Prune and clean', text: 'Hand cuts where it matters, full cleanup, debris off site.' },
      { title: 'Flag what is failing', text: 'If a shrub is past saving, we say so rather than trimming a dying plant every year.' }
    ],
    pricingNote:
      'Quoted per property by plant count and size. One trimming round is included in the Full Season Plan and two in the Estate Plan.',
    relatedPackages: ['full-season', 'estate'],
    faqs: [
      {
        q: 'When should hydrangeas be pruned?',
        a: 'It depends on the type, which is exactly why so many get ruined. Bigleaf and oakleaf types bloom on old wood and should be pruned right after flowering. Panicle and smooth types bloom on new wood and can be cut back in late winter. We identify what you have before we touch it.'
      },
      {
        q: 'Can you save an overgrown shrub?',
        a: 'Often, with rejuvenation pruning staged across two or three seasons rather than one hard cut. A few species can take a hard renewal cut to the ground and come back. Some cannot, and we will tell you when replacement is the cheaper honest answer.'
      },
      {
        q: 'Do you remove trees?',
        a: 'No. We prune under twenty five feet. Removals and anything large or near utilities go to a certified arborist, and we are happy to point you at one.'
      }
    ],
    image: {
      base: 'shrub-trimming-westfield',
      alt: 'Hand pruned boxwood and hydrangea foundation shrubs holding natural form at a Westfield, Indiana home.'
    }
  },

  /* ======================================================================= */
  {
    slug: 'snow-removal',
    name: 'Snow Removal & Salting',
    navLabel: 'Snow Removal & Salting',
    cityLabel: 'Snow Removal',
    category: 'snow',
    icon: 'snow',
    metaTitle: 'Snow Removal & Salting Contracts | Carmel & Fishers, IN',
    metaDescription:
      'Driveway and lot plowing, walk shoveling and ice melt in Carmel, Fishers, Westfield and Zionsville. 2-inch trigger, seasonal or per-push. Contracts from $495/season.',
    tagline: 'Cleared before your first coffee, on a 2-inch trigger.',
    lede:
      'Snow work is won in August. Routes are geographic and they are finite, because a plow truck can only cover so many driveways before the morning commute starts. When a route fills, it is full, and no amount of calling during a storm changes that.',
    body: [
      {
        heading: 'What a 2-inch trigger means',
        text:
          'When accumulation reaches two inches, we come, automatically, without you calling. That is the whole point of a trigger. It is not a minimum you have to argue for and it is not a judgement call made at 5 a.m. by someone looking out a different window than yours. Two inches on the ground, we roll.'
      },
      {
        heading: 'The overnight run',
        text:
          'Contract clients are on a route that runs through the night so residential drives are open before the morning commute. On a long duration storm we make multiple passes rather than waiting for it to end, because clearing eight inches once is harder on your driveway and slower for everyone than clearing four inches twice.'
      },
      {
        heading: 'Walks and salt, not just the driveway',
        text:
          'Plowing the drive and leaving the front walk under six inches is a liability, especially on commercial and HOA properties. Contracts include walk clearing and ice melt application. We use calcium or magnesium blends near plantings and concrete where straight rock salt would do damage, because chloride burn on a new lawn edge in March costs more to fix than the salt saved.'
      },
      {
        heading: 'Commercial, HOA and retail',
        text:
          'Lots, drive lanes, fire lanes, entries and walks, with pre-treatment before a forecast event and documented service times for your insurer. Certificates of insurance go out on request. We carry $2,000,000 general liability and workers’ compensation on every crew member, which is not optional in a slip and fall exposure.'
      }
    ],
    includes: [
      'Automatic dispatch at a 2-inch accumulation trigger',
      'Driveway and parking lot plowing',
      'Walk, entry and stair shoveling',
      'Ice melt application, plant safe blends near landscaping',
      'Multiple passes during long duration storms',
      'Overnight routes so drives are clear before the commute',
      'Seasonal flat rate or per push billing',
      '24/7 response for contract clients, November 15 through March 15',
      'Pre-treatment and documented service times for commercial sites'
    ],
    process: [
      { title: 'Sign before routes fill', text: 'Contracts open August 1 and close November 1, or earlier when the routes are full.' },
      { title: 'Property mapped', text: 'We mark stakes, note where snow gets stacked, and flag anything we should not hit.' },
      { title: 'Automatic service', text: 'Two inches down, we come. No call needed.' },
      { title: 'Salt as conditions call for it', text: 'Applied where it is needed, in blends that will not kill your beds.' }
    ],
    pricingNote:
      'Winter Watch seasonal contracts start at $495 per season for unlimited plows at a 2-inch trigger on a standard residential drive. Per push service is $85. Commercial and HOA properties are quoted custom.',
    relatedPackages: ['winter-watch'],
    faqs: [
      {
        q: 'Is seasonal or per push cheaper?',
        a: 'Over an average central Indiana winter the seasonal rate usually wins, and it wins big in a heavy year. Per push is cheaper only in a light winter. Seasonal also buys you route priority, which is the part people underestimate at 5 a.m. on a Tuesday.'
      },
      {
        q: 'What if we get less than two inches?',
        a: 'We do not come, and on the seasonal contract you are not billed extra either way. If you want service on a dusting or a freezing rain event, ask about a salt only visit.'
      },
      {
        q: 'How late can I sign up?',
        a: 'Contracts open August 1 and close November 1, or sooner when a route fills. We would rather turn you away in October than take your money and then miss you in January.'
      },
      {
        q: 'Do you damage driveways?',
        a: 'Plows run with shoes set for the surface and we stake the edges before the first storm so the operator knows exactly where the pavement ends in the dark. We are insured, and in fourteen years the honest answer is that clearly marked properties are the ones that stay undamaged.'
      }
    ],
    image: {
      base: 'snow-plow-carmel-driveway',
      alt: 'Plow truck clearing a residential driveway at dawn after a snowfall in Carmel, Indiana.'
    }
  }
];

/* Lookup helper used by the templates. */
export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
