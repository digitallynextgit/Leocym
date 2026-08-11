/**
 * Site-level configuration.
 *
 * CONTRACT (Rudione Brand Guidelines Part 2 · Marketing Strategy §6.3, §14.7):
 *   - This is Leocym's OWN channel, so it carries the LEOCYM LOGO ONLY.
 *   - This site is INFORMATION ONLY. It never sells. There is deliberately no
 *     price, cart or checkout primitive anywhere in the type system.
 *   - Buying traffic leaves for the distributor's site, never for a marketplace
 *     (Marketing Strategy §6.3.3).
 */

export const SITE = {
  name: "Leocym",
  /**
   * The customer-facing brand line. SINGLE SOURCE OF TRUTH — this one string
   * drives the hero headline, the footer, the document title, the OpenGraph and
   * Twitter cards, and the JSON-LD slogan.
   *
   * The hero splits it on the comma to set it over two lines, so keep the
   * "<first part>, <second part>" shape. Sentence case is deliberate: the Brand
   * Guidelines prefer sentence case, and it reads better at display size.
   *
   * NOTE: the Brand Guidelines name "Real Freshness, Not Perfume" as the
   * approved line. Any change to this string is a brand decision and needs
   * Ms. Priya Lalani's sign-off.
   */
  tagline: "Real freshness, not fragrance",
  url: "https://leocym.com",
  description:
    "Leocym is a French company from Douai that removes odour at its source instead of covering it with fragrance. How the chemistry works, what it treats, and where it is used.",

  origin: { city: "Douai", country: "France" },

  contact: {
    email: "info@leocym.com",
    youtube: "https://www.youtube.com/@leocym",
  },

  /** Preview deployments must not be indexed. */
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
} as const;

/**
 * WHERE TO BUY — the one outbound commercial link on the site.
 *
 * Marketing Strategy §6.3.3 and the sitemap: "WHERE TO BUY → links to the
 * Rudione website (never to Amazon)". Leocym informs and sends buying traffic
 * to the distributor's own site, so the customer relationship and the margin
 * both stay in-house rather than going to a marketplace.
 *
 * This is the ONLY place the distributor is named. `scripts/check-claims.mjs`
 * allows the name in this file and in the Where-to-buy section, and fails the
 * build if it appears anywhere else — the distributor still gets no logo, no
 * lockup and no credit in product or brand copy (Brand Guidelines Part 2).
 *
 * ⚠ CONFIRM THE URL BEFORE GO-LIVE. The marketing strategy names the site but
 * never prints the address; `rudione.com` is the assumed domain. One string to
 * change if it is wrong.
 */
export const RETAIL = {
  name: "Rudione",
  url: "https://rudione.com",
  /**
   * Two cases, because "India" is a proper noun and lowercasing the label to
   * drop it into a sentence produced "authorised distributor for india".
   * `role` is the standalone label; `roleInline` is the mid-sentence form.
   */
  role: "Authorised distributor for India",
  roleInline: "authorised distributor for India",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** One line for the footer and the mobile panel. */
  blurb: string;
};

/**
 * The five information pages from the sitemap, in reading order: what the brand
 * is, what it makes, how far it scales, what it is certified and safe for, and
 * where to get it. The enquiry form is the header CTA rather than a nav item —
 * one call to action, as per the brand contract.
 */
export const NAV: NavItem[] = [
  {
    label: "Brand story",
    href: "/brand-story",
    blurb: "French origin, and technology Europe has trusted for years.",
  },
  {
    label: "Products",
    href: "/products",
    blurb: "The full catalogue, as information. Nothing is sold here.",
  },
  {
    label: "For business",
    href: "/for-business",
    blurb: "Industrial and large-scale odour control, and the six-step method.",
  },
  {
    // Short in the nav; the page itself carries the full "Certifications &
    // safety information" heading from the sitemap.
    label: "Certifications",
    href: "/certifications",
    blurb: "Composition, handling, and the documentation available on request.",
  },
  {
    label: "Where to buy",
    href: "/where-to-buy",
    blurb: "Where the range is sold in India.",
  },
];

/** The single call to action, used by the header, the footer and every page end. */
export const CTA = { label: "Business enquiry", href: "/contact" } as const;
