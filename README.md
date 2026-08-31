# Ridgeline Lawn & Landscape

Static marketing site for Ridgeline Lawn & Landscape, LLC (Carmel, Indiana).

33 pages, no framework, no runtime dependencies. A small Node script renders
plain HTML into `dist/`. Upload `dist/` to any host and it works.

---

## Quick start

```bash
npm run build     # render the site into dist/
npm run serve     # preview at http://localhost:4173
npm run dev       # build, then serve
```

There is nothing to install. The build uses only Node's standard library
(Node 18 or newer). `sharp` is optional and only needed for photo processing.

After every build, run the checker:

```bash
node tools/verify.mjs
```

It fails loudly on dead internal links, missing alt text, images without
width and height, duplicate H1s, JSON-LD that does not parse, and pages
missing a canonical.

---

## The two edits you will make most

### 1. Swapping the seasonal banner

The gold strip under the hero. It lives in one place:
**`src/data/site.mjs`**, in the `seasonalBanner` block.

```js
export const seasonalBanner = {
  active: true,
  season: 'Late summer / early fall 2026',
  text: 'Fall cleanup and aeration slots are booking now. Reserve before September 15 and lock next season\u2019s rate. Snow contracts open through November 1.',
  ctaLabel: 'Reserve my slot',
  ctaHref: '/contact/',
  expires: '2026-11-01'
};
```

Change `text`, run `npm run build`, done. It updates on every page that shows
the banner.

- `active: false` removes the banner everywhere with no other edits.
- `expires` is a safety net. After that date the banner hides itself even if
  nobody remembers to come back and change it. Format `YYYY-MM-DD`.
- Keep `text` to roughly one or two sentences. It sits on a single strip and
  long copy wraps to three lines on a phone.

**Copy-paste library for the rest of the year.** Drop one of these into
`text` and set `expires` to the date in brackets.

| Season | Banner text | Set `expires` |
|---|---|---|
| Late winter | Spring cleanup and pre-emergent booking is open. The crabgrass window is two weeks wide and it moves every year, so get on the schedule before it opens. | `03-31` |
| Spring | Weekly mowing routes are filling for the season. Lock your service day before the routes close. | `05-31` |
| Early summer | Grub prevention goes down before the beetles lay, not after the damage shows. Ask about adding it to your plan. | `07-15` |
| Mid summer | Patio and retaining wall builds are booking into fall. Send photos and rough dimensions for an honest range this week. | `08-31` |
| Late summer | Fall cleanup and aeration slots are booking now. Reserve before September 15 and lock next season's rate. Snow contracts open through November 1. | `11-01` |
| Fall | Irrigation blowouts should be done by mid October. Book before the forecast turns and everyone calls the same week. | `10-20` |
| Pre-winter | Winter Watch snow contracts close November 1 or when the routes fill. A 2-inch trigger, unlimited plows, cleared before your commute. | `11-01` |
| Winter | Snow response is running 24/7 for contract clients through March 15. Non-contract work is served after the routes. | `03-15` |

Do not leave a stale banner up. A site advertising fall cleanup in February
tells a visitor nobody has touched the site since fall, which is exactly the
wrong signal for a business selling reliability.

### 2. Adding a project to the gallery

Projects live in **`src/data/projects.mjs`**. One object per project. Adding
one puts it in the filterable gallery, in the city page it belongs to, and in
the lightbox, with no other edits.

**Step 1. Add the photo.**
Put the image in `src/assets/img/` named to match the `base` value you are
about to write, for example `carmel-paver-walkway.jpg`.
(If you have the originals and want the full AVIF/WebP set, see
"Photos and performance" below and run `npm run images` instead.)

**Step 2. Add the entry.** Copy this to the top of the `projects` array:

```js
{
  id: 'carmel-paver-walkway',
  title: 'Front Walk Rebuild',
  category: 'hardscaping',
  city: 'Carmel',
  citySlug: 'carmel',
  year: 2026,
  blurb: 'Widened the entry walk to four feet and rebuilt the base so it stops heaving every spring.',
  image: {
    base: 'carmel-paver-walkway',
    alt: 'Widened paver front entry walk with layered plantings at a Carmel, Indiana home.',
    w: 1600,
    h: 1067
  }
},
```

**Step 3.** `npm run build`

**The four fields that matter and why**

- **`category`** must be exactly one of: `lawn-care`, `landscape-design`,
  `hardscaping`, `cleanups`, `irrigation`, `snow`. Anything else and the
  filter button will never find the project. The list is at the top of
  `projects.mjs` as `galleryCategories`.
- **`citySlug`** must match a `slug` in `src/data/cities.mjs`
  (`carmel`, `fishers`, `westfield`, `zionsville`, `noblesville`,
  `whitestown`, `north-indianapolis`). This is what pulls the project onto
  that city's page automatically.
- **`alt`** is not optional and is not decoration. It is what a screen reader
  announces and what Google Images indexes. Describe the work **and** the
  location: "Flagstone walkway and hosta border installed at a Zionsville
  colonial home." Never "project photo" or "IMG_4471".
- **`w` and `h`** must be the real pixel dimensions of the photo. They are
  written into the tag so the browser reserves the space before the image
  loads. Wrong numbers cause the page to jump while loading, which is the
  fastest way to lose the Lighthouse score.

**Making a project a before/after.** Add a `beforeAfter` block and it is
picked up by the homepage slider automatically, in array order:

```js
beforeAfter: {
  label: 'Carmel front walk, one week apart',
  before: { base: 'carmel-walk-before', alt: 'Cracked and heaved concrete front walk at a Carmel, Indiana home before replacement.', w: 1600, h: 1067 },
  after:  { base: 'carmel-walk-after',  alt: 'New four foot wide paver front walk at the same Carmel, Indiana home.', w: 1600, h: 1067 }
},
```

Shoot the before and after **from the same spot at the same focal length**.
A slider comparing two different angles looks like a trick and reads as one.

**Making a project the homepage spotlight.** Add `featured: true` and a
`story` block with `problem`, `did` and `result`. Only one project should
carry `featured` at a time; the first one found wins.

---

## Before this goes live

`npm run build` prints a numbered checklist at the end of every run. It is
not decorative. Current blockers:

**1. Reviews are placeholders.** Every review card is a sample. Nothing on
the site claims a rating the business has not earned:

- each card is visibly stamped "Sample card"
- `aggregateRating` and `Review` are held out of the JSON-LD entirely
- `/reviews/` is set to `noindex`
- an owner-only warning box shows on the page

To go live: paste real reviews into `src/data/reviews.mjs` (name, date, star
rating and text exactly as they appear on the Google Business Profile), set
`isPlaceholder: false` on each, fill `reviewSummary` with the real count and
average, then set `REVIEWS_ARE_REAL: true` in `src/data/site.mjs`.

Do not shortcut this. Publishing a rating the business did not receive
violates Google's structured data policy, which can strip rich results from
the entire domain, and the FTC has explicit penalties for fabricated reviews.
The guard exists so nobody has to remember the rule.

**2. Three crew cards are placeholders.** In `src/data/about.mjs`. Replace
them with real people or delete the objects. Do not fill them with stock
photos of people who do not work at Ridgeline.

**3. The domain is a placeholder.** `site.domain` in `src/data/site.mjs` is
`https://www.ridgelinelawn.example.com`. Canonical tags, `og:url` and every
URL in `sitemap.xml` point at it. Set the real domain and rebuild.

**4. The email is a placeholder.** `site.email` feeds both PHP handlers.

**5. All 32 photos are generated placeholders.** See below.

**6. No social profile URLs.** `sameAs` is omitted from the schema until at
least the Google Business Profile link is added to `site.social`.

**7. No street address.** The schema publishes city, state and ZIP only,
which is valid for a service-area business. Add `address.street` if there is
a public address.

---

## Photos and performance

The site ships with generated SVG placeholders so nothing is broken and the
layout is final. Each placeholder is drawn at the exact aspect ratio the real
photo needs, so dropping in the real file changes nothing about the layout.

**The fast path (real photos, no tooling):** name each photo to match the
`base` value in the data files, drop it into `src/assets/img/` as `.jpg`, and
rebuild. The build detects it and stops using the placeholder.

**The right path (AVIF + WebP + responsive srcset):**

```bash
npm i --save-dev sharp        # one time, dev only
mkdir photos-original         # put full-size originals here
npm run images
npm run build
```

`npm run images` generates, for every original:

```
<base>.avif  <base>.webp  <base>.jpg                    full size, capped at 1600px
<base>-480 / -800 / -1200 / -1600  in all three         responsive srcset
```

The build emits `<picture>` with AVIF first, WebP second and JPEG as the
fallback, with `srcset` and `sizes` already wired. Everything below the fold
is `loading="lazy"`; the hero is `fetchpriority="high"`.

`npm run images` prints the real dimensions of every processed photo. Copy
those into the `w` and `h` fields in `src/data/*.mjs`. A mismatch there is
layout shift, and layout shift is most of what costs a Lighthouse score on an
image-heavy site.

`sharp` is a dev dependency. Nothing on the live server needs it.

### The one photo to get right

The hero uses `paver-patio-zionsville-firepit` at 1920x1080. It is the first
thing every visitor sees and the only image loaded eagerly. Shoot it at dusk
with the landscape lighting on if that is available.

---

## Wiring the forms

Two forms, two handlers, both shipped in `dist/`.

| Form | Where | Fields | Handler |
|---|---|---|---|
| Free estimate | `/contact/` | name, phone, email, address, size, 8 service checkboxes, photo upload, start date, notes | `estimate.php` |
| Reserve My Spot | `/packages/` and homepage | name, phone, address, package | `reserve.php` |

Both post to `estimates@ridgelinelawn.example.com` (from `site.email`) and
redirect to `/thank-you/` on success.

**On PHP hosting (cPanel, most shared hosts): it already works.** Upload
`dist/`, send a test through each form, confirm both arrive.

The estimate handler re-validates everything server side, checks uploads by
real MIME type rather than filename, renames every file, attaches them to the
email and deletes them. Nothing is written into the web root, so there is no
path to execute an uploaded file. Both forms carry a honeypot field.

**On static hosting with no PHP** (Netlify, Vercel, Cloudflare Pages, S3),
change the two `action` values in `src/data/site.mjs`:

```js
forms: {
  estimateAction: 'https://formspree.io/f/YOURFORMID',
  reserveAction:  'https://formspree.io/f/YOUROTHERID',
  ...
}
```

Formspree, Web3Forms and Basin all accept `multipart/form-data` with file
attachments on paid tiers. Confirm the file size limit covers 8 photos at
10 MB before committing to one. For Netlify, add `netlify` and
`data-netlify="true"` to the form tags in `src/lib/components.mjs` and use
Netlify Forms with the file upload field.

**Upload limits** live in one place, `site.forms`: `maxUploadMb` (10),
`maxUploadFiles` (8) and `acceptedUploads`. Changing them updates the helper
text, the client-side check and the PHP validation together. If you raise
them, also raise `upload_max_filesize` and `post_max_size` in the shipped
`.htaccess`.

`npm run serve` does not run PHP. Submitting a form locally will 404 on
`estimate.php`. That is expected; test forms on the real host.

---

## Deploying

Upload the **contents** of `dist/` to the web root. That is the whole deploy.

Shipped in `dist/`:

- 33 HTML pages as `index.html` inside clean-URL folders
- `assets/css/site.css`, `assets/js/site.js`, `assets/img/*`
- `estimate.php`, `reserve.php`
- `sitemap.xml`, `robots.txt`, `site.webmanifest`
- `favicon.svg`, `apple-touch-icon.png`
- `404.html`
- `.htaccess`

**The `.htaccess` file is easy to miss.** It is a dotfile and many FTP
clients hide it by default. It forces HTTPS, canonicalises to `www`, adds a
trailing slash to directory URLs so `/services` and `/services/` do not
become two indexable pages, sets the 404 document, adds security headers, and
sets long cache lifetimes on assets. Without it the site works but leaks
duplicate URLs and serves over HTTP.

HSTS is present but commented out. Switch it on only after HTTPS is confirmed
working on every hostname. It is difficult to undo.

**On Nginx**, translate the `.htaccess` rules: force HTTPS, redirect non-www
to www, `try_files $uri $uri/ /404.html`, and add the same security headers.

**After the first deploy:** submit `sitemap.xml` in Google Search Console,
run the homepage and one service page through the Rich Results Test, and
confirm the NAP on the site matches the Google Business Profile character for
character. Inconsistent NAP is the most common local SEO own-goal.

---

## Where everything lives

```
src/data/          content. edit these.
  site.mjs         NAP, hours, licensing, seasonal banner, nav, form endpoints
  services.mjs     8 services, one page each
  cities.mjs       7 cities, one page each
  packages.mjs     4 plans, tier table, pricing notes
  projects.mjs     gallery, before/afters, featured spotlight
  posts.mjs        6 blog posts
  faqs.mjs         general FAQs
  reviews.mjs      reviews (placeholders, see above)
  about.mjs        about copy and crew

src/lib/           rendering. edit only to change structure.
  html.mjs         escaping, <picture> builder, dates
  layout.mjs       head, sticky header, footer, breadcrumbs
  components.mjs   every reusable section
  schema.mjs       JSON-LD
  png.mjs          tiny PNG encoder for the touch icon

src/pages/         one file per page type
src/assets/        css, js, img
src/server/        estimate.php, reserve.php
tools/             serve.mjs, verify.mjs, optimize-images.mjs
build.mjs          the whole build
dist/              generated. never edit by hand.
```

**Anything in `dist/` is overwritten on every build.** Edit `src/`.

### Adding a service or a city

Add an object to `src/data/services.mjs` or `src/data/cities.mjs` and
rebuild. The page, the nav entry, the footer link, the sitemap entry, the
schema and the cross-links from every other page all appear on their own.

City pages follow the H1 pattern `[Service] in [City], Indiana`, set per city
by `h1Service`.

---

## Accessibility and SEO notes

Built to WCAG 2.1 AA. What that means in practice, and what will break it:

- **Contrast.** Harvest Gold is used as a background with charcoal text, or
  as an accent. It is never used as text on white, where it fails AA at 2.2:1.
  If you restyle, check any new gold-on-light combination.
- **The before/after slider is a range input.** It works with arrow keys and
  is announced properly. The drag handler drives the same input, so the
  visual state and the accessible value never diverge. Do not replace it with
  a bare div.
- **The FAQ accordions are native `details`/`summary`.** No JS, keyboard
  accessible for free.
- **The lightbox** traps focus while open, closes on Escape, moves focus to
  the close button on open and returns it to the thumbnail on close.
- **Every interactive target is at least 44px.**
- **Everything works with JavaScript off:** full navigation, the "after"
  photo of each pair, the unfiltered gallery, reviews as a scrollable list,
  working accordions, and forms that post straight to the server.

SEO already handled: unique title and meta description per page, canonicals,
`LocalBusiness` + `LandscapingBusiness` schema with full NAP, hours,
`areaServed` for all seven cities and geo coordinates for Carmel, per-service
and per-city `Service` schema, `FAQPage` on pages with FAQs, `BlogPosting` on
posts, `BreadcrumbList` on every deep page, Open Graph and Twitter cards.

`tools/verify.mjs` guards the mechanical parts of this on every build. Run it
before every deploy.

---

## Known limits

- **`npm run serve` does not execute PHP.** Test forms on the host.
- **Fonts load from Google Fonts.** One external request. To self-host,
  download the Source Serif 4 and Source Sans 3 woff2 files into
  `src/assets/fonts/`, add `@font-face` rules with `font-display: swap`, and
  remove the three font `<link>` tags from `src/lib/layout.mjs`. Worth doing
  before chasing the last few Lighthouse points.
- **The service area map is a hand-drawn SVG**, not an embedded map. That is
  deliberate: no API key, no third-party script, no cookie banner, no
  performance cost. Pin positions in `cities.mjs` are `map: {x, y}` as
  percentages and are approximate. Adjust by eye.
- **Review counts and star ratings are suppressed** until real ones exist.
- **The blog has no pagination.** Past roughly 15 posts, add it.
