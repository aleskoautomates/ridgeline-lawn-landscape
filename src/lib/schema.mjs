/* ---------------------------------------------------------------------------
   src/lib/schema.mjs
   JSON-LD structured data.

   The aggregateRating and Review blocks are DELIBERATELY GATED. They are only
   emitted when site.REVIEWS_ARE_REAL is true AND every review in
   src/data/reviews.mjs is marked real AND reviewSummary is filled in.
   Publishing a rating the business did not earn is a Google structured data
   violation and an FTC problem. See the header of src/data/reviews.mjs.
--------------------------------------------------------------------------- */

import { site } from '../data/site.mjs';
import { services } from '../data/services.mjs';
import { cities } from '../data/cities.mjs';
import { packages } from '../data/packages.mjs';
import { reviews, reviewSummary, reviewsLookReal } from '../data/reviews.mjs';

const abs = (p) => `${site.domain}${p}`;

export const ORG_ID = () => `${site.domain}/#business`;

const DAY_NAMES = {
  Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday',
  Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday'
};

function openingHours() {
  return site.hours
    .filter((h) => !h.closed)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => DAY_NAMES[d]),
      opens: h.opens,
      closes: h.closes
    }));
}

export function ratingIsPublishable() {
  return Boolean(site.REVIEWS_ARE_REAL && reviewsLookReal);
}

function ratingBlock() {
  if (!ratingIsPublishable()) return {};
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewSummary.average,
      reviewCount: reviewSummary.count,
      bestRating: 5,
      worstRating: 1
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      reviewBody: r.body
    }))
  };
}

export function localBusiness() {
  const address = {
    '@type': 'PostalAddress',
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country
  };
  if (site.address.street) address.streetAddress = site.address.street;

  const sameAs = Object.values(site.social).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'LandscapingBusiness', 'HomeAndConstructionBusiness'],
    '@id': ORG_ID(),
    name: site.legalName,
    alternateName: site.name,
    url: site.domain,
    telephone: site.phone,
    email: site.email,
    founder: { '@type': 'Person', name: site.owner },
    foundingDate: String(site.founded),
    priceRange: '$$',
    currenciesAccepted: 'USD',
    address,
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`,
    areaServed: cities.map((c) => ({
      '@type': 'City',
      name: c.displayName || c.name,
      containedInPlace: { '@type': 'AdministrativeArea', name: `${c.county}, Indiana` }
    })),
    openingHoursSpecification: openingHours(),
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: [
      'Lawn mowing', 'Landscape design', 'Paver patios', 'Segmental retaining walls',
      'Turf fertilization', 'Weed control', 'Core aeration', 'Overseeding',
      'Irrigation systems', 'Snow removal', 'USDA Zone 6a planting'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Landscaping and lawn care services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          url: abs(`/services/${s.slug}/`),
          serviceType: s.name,
          provider: { '@id': ORG_ID() }
        }
      }))
    },
    makesOffer: packages.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      url: abs('/packages/'),
      price: p.priceValue,
      priceCurrency: 'USD',
      description: p.summary
    })),
    ...ratingBlock()
  };
}

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    url: abs(`/services/${service.slug}/`),
    description: service.metaDescription,
    provider: { '@id': ORG_ID() },
    areaServed: cities.map((c) => ({ '@type': 'City', name: c.displayName || c.name })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} options`,
      itemListElement: service.includes.map((i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: i }
      }))
    }
  };
}

export function cityServiceSchema(city) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${city.h1Service} in ${city.displayName || city.name}, Indiana`,
    url: abs(`/service-areas/${city.slug}/`),
    description: city.metaDescription,
    provider: { '@id': ORG_ID() },
    areaServed: {
      '@type': 'City',
      name: city.displayName || city.name,
      containedInPlace: { '@type': 'AdministrativeArea', name: `${city.county}, Indiana` }
    }
  };
}

export function faqSchema(items) {
  if (!items || !items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

export function articleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: site.legalName, '@id': ORG_ID() },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(`/blog/${post.slug}/`) },
    image: abs(`/assets/img/${post.image.base}.jpg`),
    articleSection: post.category
  };
}

export function breadcrumbSchema(trail) {
  if (!trail || trail.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.label,
      item: abs(t.href)
    }))
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.domain,
    publisher: { '@id': ORG_ID() }
  };
}
