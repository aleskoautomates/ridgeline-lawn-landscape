/* ---------------------------------------------------------------------------
   src/data/projects.mjs

   ADDING A PROJECT TO THE GALLERY
   -------------------------------
   1. Drop the photo in  src/assets/img/  named <base>.jpg  (see `image.base`).
   2. Copy any object below, paste it at the TOP of `projects`, change the
      fields.
   3. `npm run build`.

   Rules that matter:
   - `category` MUST be one of the ids in `galleryCategories` further down.
     Anything else and the filter button will not find it.
   - `alt` is not optional. It is what a screen reader announces and what
     Google Images indexes. Describe the work AND the location, e.g.
     "Flagstone walkway and hosta border installed at a Zionsville colonial
     home." Never "project photo" or "IMG_4471".
   - `w` and `h` are the real pixel dimensions of the source photo. They are
     written into the <img> tag so the browser reserves the space before the
     image loads. Get them wrong and the page jumps while loading, which is
     the single easiest way to wreck a Lighthouse score.
--------------------------------------------------------------------------- */

export const galleryCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'lawn-care', label: 'Lawn Care' },
  { id: 'landscape-design', label: 'Landscape Design' },
  { id: 'hardscaping', label: 'Hardscaping' },
  { id: 'cleanups', label: 'Cleanups' },
  { id: 'irrigation', label: 'Irrigation' },
  { id: 'snow', label: 'Snow' }
];

export const projects = [
  /* == FEATURED: homepage project spotlight ============================== */
  {
    id: 'westfield-slope',
    title: 'The Westfield Slope',
    category: 'hardscaping',
    city: 'Westfield',
    citySlug: 'westfield',
    year: 2026,
    featured: true,
    blurb: 'A 42-foot segmental retaining wall, a French drain, and three feet of grade put back where it belonged.',
    story: {
      problem:
        'The back of this Westfield property was losing about three feet of grade to erosion. Every heavy rain moved more soil toward the low corner, the bottom of the yard stayed wet for days afterward, and the usable flat area had shrunk to a strip along the patio door. The family has two kids and effectively could not use their own back yard.',
      did:
        'We built a 42-foot segmental block retaining wall to hold the upper grade, with a buried base course, compacted aggregate backfill, drain tile at the base and geogrid tied back into the slope. A French drain runs behind the wall and daylights well clear of the lawn. The soil we recovered went into rebuilding a flat, gently pitched turf area above the wall, which we graded, prepped and seeded.',
      result:
        'The wet corner drains. The grade stopped moving. And the family got back roughly 900 square feet of flat, usable lawn that had been a slope for the entire time they had owned the house. The wall doubles as a seat wall along the patio side.'
    },
    image: {
      base: 'westfield-slope-retaining-wall',
      alt: 'Forty-two foot segmental block retaining wall with a level lawn above it, built into an eroding backyard slope at a Westfield, Indiana home.',
      w: 1600,
      h: 1067
    }
  },

  /* == BEFORE / AFTER SET (homepage slider) ==============================
     Any project with a `beforeAfter` block is picked up automatically by the
     homepage before/after slider, in the order listed here. Keep it to three
     on the homepage; the rest still show in the gallery.
  ======================================================================== */
  {
    id: 'fishers-backyard-patio',
    title: 'Bare Backyard to Paver Patio',
    category: 'hardscaping',
    city: 'Fishers',
    citySlug: 'fishers',
    year: 2025,
    blurb: 'An empty rectangle of builder-grade turf turned into a 420 square foot paver patio with a seat wall and fire pit.',
    beforeAfter: {
      label: 'Fishers backyard, one season apart',
      before: {
        base: 'fishers-patio-before',
        alt: 'Empty flat backyard with patchy builder-grade sod and no patio behind a Fishers, Indiana home, before hardscape installation.',
        w: 1600,
        h: 1067
      },
      after: {
        base: 'fishers-patio-after',
        alt: 'Finished 420 square foot paver patio with a curved seat wall and fire pit in the same Fishers, Indiana backyard after installation.',
        w: 1600,
        h: 1067
      }
    },
    image: {
      base: 'fishers-patio-after',
      alt: 'Finished 420 square foot paver patio with a curved seat wall and fire pit in a Fishers, Indiana backyard.',
      w: 1600,
      h: 1067
    }
  },

  {
    id: 'noblesville-lawn-restoration',
    title: 'Weed-Choked Lawn, Restored in One Season',
    category: 'lawn-care',
    city: 'Noblesville',
    citySlug: 'noblesville',
    year: 2025,
    blurb: 'Six-step program, core aeration and a fall overseed took this Noblesville front lawn from mostly weeds to solid turf across a single season.',
    beforeAfter: {
      label: 'Noblesville front lawn, April to October',
      before: {
        base: 'noblesville-lawn-before',
        alt: 'Thin front lawn dominated by crabgrass, clover and dandelion at a Noblesville, Indiana home before turf treatment.',
        w: 1600,
        h: 1067
      },
      after: {
        base: 'noblesville-lawn-after',
        alt: 'Dense uniform green turf on the same Noblesville, Indiana front lawn after one season of the six-step program and fall overseeding.',
        w: 1600,
        h: 1067
      }
    },
    image: {
      base: 'noblesville-lawn-after',
      alt: 'Dense uniform green turf on a Noblesville, Indiana front lawn after a full season of fertilization and overseeding.',
      w: 1600,
      h: 1067
    }
  },

  {
    id: 'carmel-foundation-bed',
    title: 'Overgrown Foundation Bed, Rebuilt',
    category: 'landscape-design',
    city: 'Carmel',
    citySlug: 'carmel',
    year: 2025,
    blurb: 'Twenty years of sheared yews had swallowed the front windows. We took it back to soil and rebuilt the bed with structure that holds its shape.',
    beforeAfter: {
      label: 'Carmel foundation bed, before and after rebuild',
      before: {
        base: 'carmel-bed-before',
        alt: 'Overgrown sheared yews and juniper covering the front windows of a Carmel, Indiana home before the foundation bed was rebuilt.',
        w: 1600,
        h: 1067
      },
      after: {
        base: 'carmel-bed-after',
        alt: 'Rebuilt foundation bed with boxwood, hydrangea, ornamental grasses and hardwood mulch at the same Carmel, Indiana home.',
        w: 1600,
        h: 1067
      }
    },
    image: {
      base: 'carmel-bed-after',
      alt: 'Rebuilt foundation bed with boxwood, hydrangea, ornamental grasses and hardwood mulch at a Carmel, Indiana home.',
      w: 1600,
      h: 1067
    }
  },

  /* == GALLERY ONLY ====================================================== */
  {
    id: 'zionsville-flagstone-walk',
    title: 'Flagstone Walkway and Shade Border',
    category: 'hardscaping',
    city: 'Zionsville',
    citySlug: 'zionsville',
    year: 2026,
    blurb: 'Irregular flagstone set on a compacted base, with a hosta and fern border that suits the age of the house.',
    image: {
      base: 'zionsville-flagstone-walkway',
      alt: 'Flagstone walkway and hosta border installed at a Zionsville colonial home.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'zionsville-patio-firepit',
    title: 'Paver Patio with Fire Pit',
    category: 'hardscaping',
    city: 'Zionsville',
    citySlug: 'zionsville',
    year: 2026,
    blurb: 'The flagship build. Tumbled paver patio, circular wood-burning fire pit, seat wall and integrated low-voltage lighting.',
    image: {
      base: 'paver-patio-zionsville-firepit',
      alt: 'Tumbled paver patio with a circular fire pit, curved seat wall and landscape lighting behind a Zionsville, Indiana home.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'carmel-front-walk-lighting',
    title: 'Front Entry Rebuild with Lighting',
    category: 'landscape-design',
    city: 'Carmel',
    citySlug: 'carmel',
    year: 2025,
    blurb: 'Widened entry walk, layered evergreen structure and eight low-voltage path fixtures that make the house readable after dark.',
    image: {
      base: 'carmel-front-entry-lighting',
      alt: 'Widened paver entry walk with layered evergreen plantings and low-voltage path lighting at a Carmel, Indiana home at dusk.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'westfield-drainage-swale',
    title: 'Dry Creek Bed and Downspout Tie-In',
    category: 'landscape-design',
    city: 'Westfield',
    citySlug: 'westfield',
    year: 2025,
    blurb: 'A wet side yard rerouted into a stone dry creek bed, with all four downspouts piped underground to daylight.',
    image: {
      base: 'westfield-dry-creek-bed',
      alt: 'Stone dry creek bed carrying roof runoff through a side yard at a Westfield, Indiana home.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'fishers-irrigation-install',
    title: 'Six-Zone Irrigation Install',
    category: 'irrigation',
    city: 'Fishers',
    citySlug: 'fishers',
    year: 2025,
    blurb: 'Six zones separating turf, sun beds and shade beds, run off a weather-based smart controller.',
    image: {
      base: 'fishers-irrigation-install',
      alt: 'Newly installed rotary sprinkler head running on a freshly restored lawn during a six-zone irrigation install in Fishers, Indiana.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'carmel-smart-controller',
    title: 'Smart Controller Retrofit',
    category: 'irrigation',
    city: 'Carmel',
    citySlug: 'carmel',
    year: 2026,
    blurb: 'An eleven-year-old system kept in the ground, with the controller replaced by a weather-based unit and every head re-aimed.',
    image: {
      base: 'carmel-smart-controller',
      alt: 'Weather-based smart irrigation controller mounted in a garage during a system retrofit at a Carmel, Indiana home.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'indy-leaf-cleanup',
    title: 'Mature-Canopy Fall Cleanup',
    category: 'cleanups',
    city: 'Meridian-Kessler',
    citySlug: 'north-indianapolis',
    year: 2025,
    blurb: 'Three passes across six weeks on a north-side lot with mature oaks and maples that drop a month apart.',
    image: {
      base: 'indy-leaf-cleanup',
      alt: 'Crew clearing heavy oak and maple leaf cover from a lawn under mature trees in the Meridian-Kessler neighbourhood of Indianapolis.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'noblesville-spring-cleanup',
    title: 'Spring Bed Reset and Mulch',
    category: 'cleanups',
    city: 'Noblesville',
    citySlug: 'noblesville',
    year: 2026,
    blurb: 'Perennials cut back, beds re-edged after frost heave, and hardwood mulch refreshed to a proper two-inch depth.',
    image: {
      base: 'noblesville-spring-cleanup',
      alt: 'Freshly edged and mulched perennial beds after a spring cleanup at a Noblesville, Indiana home.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'whitestown-commercial-lot',
    title: 'Commercial Lot Snow Contract',
    category: 'snow',
    city: 'Whitestown',
    citySlug: 'whitestown',
    year: 2026,
    blurb: 'Business park lot, drive lanes, fire lanes and entries, pre-treated ahead of a forecast event with documented service times.',
    image: {
      base: 'whitestown-commercial-snow',
      alt: 'Plow truck clearing drive lanes across a commercial parking lot at a Whitestown, Indiana business park after a snowfall.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'carmel-driveway-plow',
    title: 'Residential Overnight Plow Route',
    category: 'snow',
    city: 'Carmel',
    citySlug: 'carmel',
    year: 2026,
    blurb: 'A 2-inch trigger driveway on the overnight route, cleared and salted before the morning commute.',
    image: {
      base: 'snow-plow-carmel-driveway',
      alt: 'Plow truck clearing a residential driveway at dawn after a snowfall in Carmel, Indiana.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'westfield-weekly-mow',
    title: 'Weekly Mow, Half-Acre Lot',
    category: 'lawn-care',
    city: 'Westfield',
    citySlug: 'westfield',
    year: 2026,
    blurb: 'Half-acre Westfield lot on the weekly route, cut high through the summer with a mechanical edge on every hard surface.',
    image: {
      base: 'westfield-weekly-mow',
      alt: 'Freshly mown and edged half-acre front lawn with mowing stripes at a Westfield, Indiana home.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'carmel-aeration-overseed',
    title: 'Core Aeration and Overseed',
    category: 'lawn-care',
    city: 'Carmel',
    citySlug: 'carmel',
    year: 2025,
    blurb: 'The September visit that does most of the work. Cores pulled, seed down, straight into the establishment window.',
    image: {
      base: 'carmel-aeration-overseed',
      alt: 'Soil cores pulled across a lawn during September core aeration and overseeding at a Carmel, Indiana property.',
      w: 1600,
      h: 1067
    }
  },
  {
    id: 'zionsville-shrub-restoration',
    title: 'Staged Shrub Restoration',
    category: 'landscape-design',
    city: 'Zionsville',
    citySlug: 'zionsville',
    year: 2026,
    blurb: 'Two seasons of rejuvenation pruning brought a row of hollow, over-sheared shrubs back to natural form instead of replacing them.',
    image: {
      base: 'zionsville-shrub-restoration',
      alt: 'Row of hand-pruned shrubs restored to natural form along a brick facade at a Zionsville, Indiana home.',
      w: 1600,
      h: 1067
    }
  }
];

/* Derived views used by the templates. */
export const featuredProject = projects.find((p) => p.featured) || projects[0];
export const beforeAfterProjects = projects.filter((p) => p.beforeAfter);
export const projectsByCity = (citySlug) => projects.filter((p) => p.citySlug === citySlug);
