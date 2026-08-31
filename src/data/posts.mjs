/* ---------------------------------------------------------------------------
   src/data/posts.mjs
   Blog posts. One entry = one page at /blog/<slug>/ plus a card on /blog/.

   Body blocks:
     { h2: 'Heading' }                 section heading
     { p: 'Paragraph text.' }          paragraph
     { ul: ['item', 'item'] }          bulleted list
     { ol: ['step', 'step'] }          numbered list
     { note: 'Callout text.' }         highlighted aside
     { cta: { text, href, label } }    inline call to action

   Dates are ISO YYYY-MM-DD. `updated` is optional; when present it is what
   the article schema publishes as dateModified and what the byline shows.
--------------------------------------------------------------------------- */

export const posts = [
  {
    slug: 'when-to-aerate-and-overseed-central-indiana',
    title: 'When to Aerate and Overseed a Central Indiana Lawn',
    metaTitle: 'When to Aerate & Overseed a Central Indiana Lawn | Ridgeline',
    metaDescription:
      'The aeration and overseeding window for central Indiana runs late August through mid September. Here is why that window matters and what happens if you miss it.',
    date: '2026-08-12',
    author: 'Marcus Delgado',
    category: 'Lawn Care',
    readMinutes: 6,
    relatedServices: ['fertilization-weed-control', 'lawn-mowing'],
    excerpt:
      'If you only do one thing for your lawn this year, do this one, and do it in the next four weeks rather than in October.',
    image: {
      base: 'carmel-aeration-overseed',
      alt: 'Soil cores pulled across a lawn during September core aeration and overseeding at a Carmel, Indiana property.',
      w: 1600,
      h: 900
    },
    body: [
      { p: 'Core aeration and overseeding is the single highest return visit anyone makes to a central Indiana lawn all year. It is also the one most often done at the wrong time, usually because someone decided fall lawn work happens in October.' },
      { h2: 'The window is late August through mid September' },
      { p: 'Cool season grasses, which is what nearly every lawn in Hamilton and Boone County is growing, want warm soil and cooling air. That combination happens here in a fairly narrow band from roughly the last week of August through the middle of September.' },
      { p: 'Seed dropped in that window germinates into soil that is still holding summer warmth, then establishes through six to eight weeks of mild weather before the ground gets cold. By the time winter arrives it has a root system. Seed dropped in mid October germinates late, if at all, and goes into its first freeze as a seedling. A lot of it does not come back.' },
      { note: 'Soil temperature, not air temperature, is what the seed responds to. Soil lags air by a couple of weeks, which is exactly why a warm October afternoon feels like good seeding weather and is not.' },
      { h2: 'Why aeration has to happen at the same time' },
      { p: 'Central Indiana sits on clay. Clay compacts, and compacted soil does three things to a lawn: it blocks water from reaching roots, it blocks air exchange, and it physically stops roots from going deeper. A lawn on compacted clay is a lawn with roots living in the top inch or two of soil, which is the layer that dries out first in July.' },
      { p: 'Core aeration pulls plugs of soil out of the ground and leaves open channels. Those channels do two jobs. They relieve the compaction, and they give overseed somewhere to land that is actual soil rather than thatch. Seed sitting on top of thatch does not germinate reliably, no matter how much of it you put down.' },
      { ul: [
        'Pull cores, do not spike. Spike aeration compresses the soil around the hole instead of removing it.',
        'Leave the cores on the lawn. They break down inside two or three weeks and return organic matter to the surface.',
        'Seed immediately after aerating, while the holes are open.',
        'Water lightly and frequently for the first two to three weeks, then taper to deep and infrequent.'
      ] },
      { h2: 'How much seed, and what kind' },
      { p: 'For overseeding an existing central Indiana lawn, a turf type tall fescue or a fescue and bluegrass blend suits our transition zone climate. Tall fescue handles our summer heat better than bluegrass alone and holds up under the humidity. Rates vary by product, so follow the bag for overseeding rather than new seeding, which is roughly half the rate.' },
      { p: 'The temptation is always to put down more seed than the bag says. Do not. Overcrowded seedlings compete with each other and you end up with thin weak grass instead of thick strong grass.' },
      { h2: 'What to skip for the next month' },
      { p: 'No pre-emergent. Pre-emergent herbicide does not distinguish between crabgrass seed and the grass seed you just paid for. If you have a fall pre-emergent on your program, it has to be timed around the seeding, not on top of it. This is one of the more common ways a homeowner accidentally wastes a seeding.' },
      { p: 'Mow a little higher for the first few weeks and keep the mower off the newly seeded areas until the new grass has been cut at least twice.' },
      { cta: { text: 'Aeration and overseeding is bundled into the Full Season and Estate plans, and the slots for this window fill through September.', href: '/contact/', label: 'Reserve an aeration slot' } }
    ]
  },
  {
    slug: 'why-your-carmel-lawn-goes-brown-in-july',
    title: 'Why Your Carmel Lawn Goes Brown in July (and What to Do About It)',
    metaTitle: 'Why Your Carmel Lawn Goes Brown in July | Ridgeline',
    metaDescription:
      'Summer dormancy is not death, and watering it wrong makes it worse. What actually causes a central Indiana lawn to brown out in July and how to handle it.',
    date: '2026-07-06',
    author: 'Marcus Delgado',
    category: 'Lawn Care',
    readMinutes: 5,
    relatedServices: ['fertilization-weed-control', 'irrigation', 'lawn-mowing'],
    excerpt:
      'Most July brownout in Carmel is dormancy, not death. The damage usually comes from what people do about it.',
    image: {
      base: 'westfield-weekly-mow',
      alt: 'Freshly mown and edged half-acre front lawn with mowing stripes at a Westfield, Indiana home.',
      w: 1600,
      h: 900
    },
    body: [
      { p: 'Every July the phone starts ringing about brown lawns. Almost always the lawn is fine. What is happening is a cool season grass doing exactly what a cool season grass does when it gets hot, and the trouble usually starts with the response rather than the cause.' },
      { h2: 'Central Indiana is a transition zone, and that is the whole problem' },
      { p: 'We sit in the turf transition zone. That means our winters are too cold for warm season grasses like bermuda and zoysia to thrive, and our summers are too hot for cool season grasses like fescue and bluegrass to be comfortable. Whatever you plant here spends part of the year stressed. In Carmel, that part is July and August.' },
      { p: 'When soil temperatures climb and rain stops, cool season grass protects itself by going dormant. It stops top growth, pulls resources into the crown, and lets the leaf blades brown out. The plant is alive. It is waiting.' },
      { h2: 'Dormant or dead? There is a simple test' },
      { ul: [
        'Grab a handful of brown grass and pull gently. Dormant grass resists. Dead grass pulls out with no effort at all.',
        'Look at the pattern. Dormancy is broad and fairly even. Dead patches from grubs or disease are irregular and have edges.',
        'Check the crown at the base of the plant. If it is still greenish and firm, the plant is dormant.',
        'Peel back a square foot of turf in a bad spot. If it rolls up like carpet with no roots holding it, that is grub damage, not drought.'
      ] },
      { h2: 'The two things that turn dormancy into actual damage' },
      { p: 'The first is light daily watering. A dormant lawn given a fifteen minute sprinkle every evening gets pulled part way out of dormancy without getting enough water to actually recover. That cycle burns through the plant reserves and is genuinely worse than leaving it alone. If you are going to water, water deeply, about an inch a week including rain, in one or two soakings, early in the morning.' },
      { p: 'The second is nitrogen. Pushing fertilizer into heat stressed turf forces top growth the plant cannot support and can burn it outright. This is why our six-step program uses a low rate summer application rather than a normal feeding. Anyone putting a heavy summer feed on a July lawn in Indiana is doing damage.' },
      { note: 'Traffic matters too. Dormant turf does not repair itself. Paths worn across a brown lawn in July are still visible in September, because the plant was not growing when they were made.' },
      { h2: 'What actually helps' },
      { ol: [
        'Raise the mowing height. A taller canopy shades its own root zone and holds soil moisture. This is the cheapest thing on the list and it works.',
        'Water deeply and infrequently, or commit to not watering at all. The middle option is the bad one.',
        'Stay off it as much as you can.',
        'Sharpen the blade. Torn leaf tips lose more water and brown faster than clean cut ones.',
        'Plan the real fix for late August, which is aeration and overseeding.'
      ] },
      { h2: 'The long term answer is root depth' },
      { p: 'A lawn that browns out badly every July is usually a lawn with shallow roots, and shallow roots usually come from compacted soil and years of frequent shallow watering. That is fixable, but it is fixed in the fall, not in the middle of the heat. Core aeration to relieve compaction, overseeding with a heat tolerant tall fescue blend, and a watering habit that drives roots down instead of keeping them at the surface.' },
      { cta: { text: 'If your lawn browns out badly every summer, the fix is a fall aeration and overseed, not a July rescue.', href: '/services/fertilization-weed-control/', label: 'See the six-step program' } }
    ]
  },
  {
    slug: 'fall-leaf-cleanup-timing-hamilton-county',
    title: 'Fall Leaf Cleanup Timing for Hamilton County',
    metaTitle: 'Fall Leaf Cleanup Timing for Hamilton County, IN | Ridgeline',
    metaDescription:
      'One cleanup in November is usually the wrong call. How to time leaf removal in Carmel, Fishers, Westfield and Noblesville, and what matting does to turf.',
    date: '2026-08-25',
    author: 'Marcus Delgado',
    category: 'Seasonal',
    readMinutes: 5,
    relatedServices: ['spring-fall-cleanup'],
    excerpt:
      'Waiting for the last leaf to fall is the most common fall lawn mistake in Hamilton County, and it costs you in March.',
    image: {
      base: 'indy-leaf-cleanup',
      alt: 'Crew clearing heavy oak and maple leaf cover from a lawn under mature trees in the Meridian-Kessler neighbourhood of Indianapolis.',
      w: 1600,
      h: 900
    },
    body: [
      { p: 'The instinct is to wait until the trees are bare and do it once. In Hamilton County that instinct is usually wrong, and the reason is that our trees do not drop on the same schedule.' },
      { h2: 'Maples and oaks are weeks apart' },
      { p: 'Maples, which are everywhere in Carmel and Fishers subdivisions, typically drop through mid to late October. Oaks hold on considerably longer and can still be dropping into late November or December, and some hold dead leaves through the winter entirely. A single cleanup timed for the oaks means the maple leaves have been sitting on your turf for six weeks. A single cleanup timed for the maples means you do it again yourself in December.' },
      { p: 'On a property with mixed mature canopy, two passes is the honest minimum and three is often right. On a newer Westfield or Whitestown lot with young trees, one well timed pass may genuinely be enough.' },
      { h2: 'What matted leaves actually do' },
      { p: 'A layer of wet leaves on turf blocks light and traps moisture against the crown of the plant. Under snow, that layer compresses into a mat that holds moisture all winter at temperatures just above freezing, which is close to ideal conditions for snow mould.' },
      { ul: [
        'Grey snow mould shows up as bleached, matted circular patches when the snow pulls back in March.',
        'Pink snow mould is worse and can kill the crown rather than just the leaf tissue.',
        'Both are far more likely under leaf mat than under clean turf.',
        'Damage shows in March, which is months after the decision that caused it.'
      ] },
      { note: 'Mulch mowing a light scattering of leaves back into the lawn is fine and actually good for the soil. The problem is volume. Once you cannot see grass through the leaves, mulching stops working and you are just chopping the mat finer.' },
      { h2: 'A workable Hamilton County schedule' },
      { ol: [
        'Late October: first pass, clearing the maple drop before it gets rained on.',
        'Mid November: main pass, which for most properties is the big one.',
        'Early December: final pass on properties with oaks, plus the last low cut of the season.'
      ] },
      { p: 'The last mow of the year should be a notch lower than your summer height. Shorter grass mats less under snow. Do not scalp it, just take it down a step.' },
      { h2: 'Where the leaves should go' },
      { p: 'Off the property. Blowing them to the back treeline is the standard shortcut and it creates a permanently damp pile that kills whatever is under it and seeds weeds into the nearby beds every spring. We haul. If you are doing it yourself, Hamilton County communities generally run seasonal curbside leaf collection, and municipal schedules are published each fall.' },
      { h2: 'While you are out there' },
      { p: 'Fall cleanup is also the right visit for gutter clearing, because a gutter full of leaves in November becomes an ice dam in January. And it is the last practical chance to cut back perennials, though leaving ornamental grasses and seed heads standing over winter is a legitimate choice that feeds birds and looks better than bare beds in February.' },
      { cta: { text: 'Fall cleanup slots book through September and both cleanups are bundled into the Full Season and Estate plans.', href: '/services/spring-fall-cleanup/', label: 'See what cleanup includes' } }
    ]
  },
  {
    slug: 'irrigation-blowout-before-first-indiana-freeze',
    title: 'Getting Your Irrigation Blown Out Before the First Indiana Freeze',
    metaTitle: 'Irrigation Blowout Timing Before the First Indiana Freeze',
    metaDescription:
      'Central Indiana can see its first hard freeze from mid October into early November. Why sprinkler blowouts should be done by mid October.',
    date: '2025-09-29',
    author: 'Marcus Delgado',
    category: 'Irrigation',
    readMinutes: 4,
    relatedServices: ['irrigation'],
    excerpt:
      'The repair costs many times what the blowout does, and the appointment book fills the same week the forecast turns.',
    image: {
      base: 'fishers-irrigation-install',
      alt: 'Newly installed rotary sprinkler head running on a freshly restored lawn during a six-zone irrigation install in Fishers, Indiana.',
      w: 1600,
      h: 900
    },
    body: [
      { p: 'A sprinkler blowout is a boring appointment that prevents an expensive one. The whole thing takes under an hour on a typical residential system, and skipping it is one of the few lawn decisions that can cost four figures.' },
      { h2: 'What actually breaks' },
      { p: 'Water expands when it freezes. Any water left sitting in a lateral line, a valve body, a backflow assembly or a sprinkler head has somewhere to go when it turns to ice, and what it does is split whatever is containing it.' },
      { ul: [
        'Backflow preventers are the most common casualty and the most expensive. They sit above ground, they are brass, and they crack.',
        'Poly lateral lines split lengthwise. That one hides until spring startup, when a zone turns into a fountain.',
        'Valve bodies and solenoids crack and then leak continuously once the system is charged.',
        'Sprinkler heads split at the body and spray sideways.'
      ] },
      { note: 'Automatic drain valves and a sloped install help, but they do not clear the water trapped in heads, valves and the backflow assembly. Compressed air does. On any system with a backflow preventer, a blowout is not optional in this climate.' },
      { h2: 'The timing' },
      { p: 'Central Indiana typically sees its first hard freeze somewhere from mid October into early November, and the variance year to year is large. It does not need to be a long or deep freeze to crack a backflow assembly, and it does not announce itself far in advance.' },
      { p: 'Book the blowout for the first half of October. That is early enough to be safely ahead of the first event in almost any year, and late enough that you are not giving up meaningful irrigation days. Waiting until a freeze appears in the ten day forecast means calling in the same week as everyone else, which is how people end up on a two week list during the exact two weeks that matter.' },
      { h2: 'Why compressed air and not just draining' },
      { p: 'Blowing a system out properly means running enough air volume through each zone to push standing water out of the heads, at a pressure low enough not to damage the components. That is a volume problem more than a pressure problem, which is why a small pancake compressor from a garage does not do it. Too little volume and the water never clears. Too much pressure and you damage seals and gears in the heads.' },
      { p: 'Each zone gets run until the heads are discharging mist rather than water, then moved on, then usually revisited. The backflow assembly gets isolated and drained separately.' },
      { h2: 'What else should happen at the same visit' },
      { ol: [
        'Shut off and drain the backflow preventer, and insulate it if it stays exposed.',
        'Set the controller to off or rain mode for the winter rather than unplugging it, so the program is still there in April.',
        'Note any heads that were already damaged, so spring startup is a repair list rather than a discovery process.'
      ] },
      { p: 'Spring startup then becomes a short visit rather than a diagnostic session, and you find out about problems in April rather than in June when the lawn has already thinned in the spot a broken zone was not covering.' },
      { cta: { text: 'Irrigation startup and blowout are both bundled into the Estate Plan, and standalone blowouts are priced per zone.', href: '/services/irrigation/', label: 'Book a fall blowout' } }
    ]
  },
  {
    slug: 'what-a-2-inch-snow-trigger-means',
    title: 'What a 2-Inch Snow Trigger Actually Means for Your Driveway',
    metaTitle: 'What a 2-Inch Snow Trigger Means for Your Driveway | Ridgeline',
    metaDescription:
      'Trigger depth, seasonal versus per push pricing, route priority and why snow contracts are decided in August. A plain explanation of how plowing contracts work.',
    date: '2025-11-04',
    author: 'Marcus Delgado',
    category: 'Snow',
    readMinutes: 5,
    relatedServices: ['snow-removal'],
    excerpt:
      'The trigger is the part of a snow contract people understand least, and it is the part that decides whether your driveway is clear at 6 a.m.',
    image: {
      base: 'snow-plow-carmel-driveway',
      alt: 'Plow truck clearing a residential driveway at dawn after a snowfall in Carmel, Indiana.',
      w: 1600,
      h: 900
    },
    body: [
      { p: 'Every snow contract has a trigger. It is the accumulation depth at which service happens automatically. Ours is two inches. That single number decides more about your winter than the price does.' },
      { h2: 'Automatic means automatic' },
      { p: 'At two inches of accumulation we come. You do not call, you do not text, and nobody at our end makes a judgement call about whether your driveway looks bad enough. The trigger exists precisely so that decision is already made before the storm starts.' },
      { p: 'This matters at 5 a.m. more than it sounds like it should. The alternative model, where you call when you want service, means you are competing with everyone else who woke up and looked outside at the same moment, and the truck is already three neighbourhoods away.' },
      { h2: 'Why two inches and not one' },
      { p: 'Below about two inches, most vehicles handle a driveway without help and plowing does more harm than good. A plow blade needs some depth to work against. Running a blade on a dusting scrapes the surface, picks up gravel on unpaved drives, and does not accomplish much on pavement.' },
      { p: 'Under two inches the useful service is usually salt rather than a plow, which is a separate visit and worth asking about if you have a steep drive or somebody in the house who cannot risk a fall.' },
      { note: 'Freezing rain is its own category. It does not accumulate to a trigger depth and it is more dangerous than six inches of powder. Ice events are handled with salt, not a blade.' },
      { h2: 'One pass or several' },
      { p: 'On a long duration storm we come back rather than waiting for it to finish. Clearing four inches twice is easier on the equipment, easier on your driveway surface and faster overall than clearing eight inches once, and it means you are never looking at a fully blocked drive halfway through a storm.' },
      { h2: 'Seasonal versus per push' },
      { p: 'A seasonal contract is a flat rate for the winter covering unlimited plows at the trigger. Per push bills each visit. Which one wins depends on the winter, and here is the honest breakdown.' },
      { ul: [
        'In an average central Indiana winter, the seasonal rate usually comes out ahead.',
        'In a heavy winter it comes out well ahead, and that is the year you care most.',
        'In a light winter, per push is cheaper. That is the real trade off and anyone who tells you otherwise is selling.',
        'Seasonal also buys route priority, which per push does not. Contract clients are served before non-contract work, always.'
      ] },
      { p: 'The way to think about it is insurance rather than purchase. You are buying a fixed cost and a guaranteed spot on the route instead of a variable cost and a queue position.' },
      { h2: 'Why contracts close November 1' },
      { p: 'Routes are geographic. A truck can only cover so many properties before the morning commute starts, and the properties have to be close enough together for that to work. Once a route is full, adding another driveway means everyone on it gets served later.' },
      { p: 'So contracts open August 1 and close November 1, or earlier when the routes fill. That is not a sales tactic. It is the reason we can promise your drive is open before you leave for work, and it is why we would rather turn someone away in October than take their money and miss them in January.' },
      { h2: 'What to do before the first storm' },
      { ol: [
        'Mark the edges of the driveway with stakes, especially where pavement meets lawn. An operator working in the dark cannot see where your turf starts.',
        'Point out anything that should not be hit: irrigation heads near the drive, low landscape lighting, a septic lid, decorative edging.',
        'Agree on where snow gets stacked. That decision is much easier in October than during the third storm of the season.',
        'Clear the drive of anything that will be under snow, including trailers, planters and basketball hoops.'
      ] },
      { cta: { text: 'Winter Watch contracts open August 1 and close November 1, or sooner when routes fill.', href: '/packages/', label: 'See snow contract pricing' } }
    ]
  },
  {
    slug: 'spring-pre-emergent-timing-two-week-window',
    title: 'Spring Pre-Emergent Timing: The Two-Week Window Most People Miss',
    metaTitle: 'Spring Pre-Emergent Timing in Central Indiana | Ridgeline',
    metaDescription:
      'Crabgrass pre-emergent works on soil temperature, not the calendar. How to time the spring application in central Indiana and why late is the same as never.',
    date: '2026-03-09',
    author: 'Marcus Delgado',
    category: 'Lawn Care',
    readMinutes: 5,
    relatedServices: ['fertilization-weed-control'],
    excerpt:
      'Pre-emergent is the highest leverage application of the year and the easiest one to get wrong by two weeks.',
    image: {
      base: 'fertilization-noblesville-turf',
      alt: 'Dense green tall fescue turf after a full season of fertilization and overseeding at a Noblesville, Indiana property.',
      w: 1600,
      h: 900
    },
    body: [
      { p: 'Pre-emergent herbicide does one job. It puts a chemical barrier in the top layer of soil that stops germinating seeds from establishing. It does not kill existing weeds, and it does nothing at all to a crabgrass plant that has already come up. Which means the entire value of the application depends on when it goes down.' },
      { h2: 'Soil temperature is the trigger, not the date' },
      { p: 'Crabgrass germinates when soil temperature at about a two inch depth holds near 55 degrees Fahrenheit for several consecutive days. In central Indiana that generally lands somewhere in the back half of March through mid April, but it moves by two or three weeks depending on the year.' },
      { p: 'A warm early spring pulls it forward. A cold wet March pushes it back. Anybody applying pre-emergent on a fixed calendar date every year is right roughly half the time and expensively wrong the rest.' },
      { note: 'The old forsythia rule is a decent free indicator. When forsythia finishes blooming and the flowers start dropping, soil temperatures in the area are usually approaching the crabgrass germination range. It is not precise, but it beats the calendar.' },
      { h2: 'Why late is effectively never' },
      { p: 'Once crabgrass has germinated, the barrier is irrelevant to it. You are then dealing with post-emergent control on an established annual weed, which is harder, more expensive, more chemical on your lawn, and less effective.' },
      { p: 'And crabgrass is prolific. A single plant can produce thousands of seeds, and those seeds stay viable in the soil for years. Missing one spring means feeding the seed bank for the next several.' },
      { h2: 'Why too early is also a problem' },
      { p: 'Pre-emergent breaks down in the soil over time. Put it down in early March in a cold year and a meaningful part of its active life is spent before germination even begins, leaving the barrier weak by the time late-germinating crabgrass shows up in May and June.' },
      { p: 'This is why a split application is often better than one heavy one: an initial application at the front of the window and a second lighter one six to eight weeks later, which carries protection through the tail of the germination period.' },
      { h2: 'The one thing that cancels it out' },
      { p: 'Pre-emergent does not know the difference between crabgrass seed and the grass seed you paid for. Applying it and then seeding, or seeding and then applying it, wastes one of the two.' },
      { ul: [
        'If you are seeding in spring, most pre-emergents have to be skipped or the seeding has to wait. Read the label interval.',
        'A better plan for most central Indiana lawns is to run pre-emergent in spring and do the seeding in the late August to mid September window instead, where it works far better anyway.',
        'If you have bare patches that need seed now, spot treat the rest of the lawn and leave those areas out.',
        'Tell whoever runs your program that you intend to seed. This is the single most common avoidable conflict in a lawn care schedule.'
      ] },
      { h2: 'What it does not cover' },
      { p: 'Pre-emergent handles annual grassy weeds. It does not touch dandelion, clover, creeping charlie or plantain, which are broadleaf perennials that come back from roots rather than from seed each year. Those need a broadleaf post-emergent, which is a separate application and is why the second round in a six step program looks different from the first.' },
      { h2: 'The unglamorous long term fix' },
      { p: 'Crabgrass germinates where it gets light and space at the soil surface. Thin turf gives it both. A dense stand of grass is a better crabgrass control than any herbicide, which is why aeration and overseeding sit inside a weed control program rather than beside it. The chemistry buys you the season. The turf density is what makes next season easier.' },
      { cta: { text: 'The six-step program times the spring application to soil temperature rather than a fixed date.', href: '/services/fertilization-weed-control/', label: 'See the six-step program' } }
    ]
  }
];

/* Newest first, regardless of the order they were typed in above. */
export const postsByDate = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));

export const postCategories = [...new Set(posts.map((p) => p.category))].sort();
