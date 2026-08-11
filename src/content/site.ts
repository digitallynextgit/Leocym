/**
 * Site-level configuration.
 *
 * CONTRACT (Rudione Brand Guidelines Part 2 · Marketing Strategy §6.3, §14.7):
 *   - This is Leocym's OWN channel, so it carries the LEOCYM LOGO ONLY.
 *   - This site is INFORMATION ONLY. It never sells. There is deliberately no
 *     price, cart or checkout primitive anywhere in the type system.
 *
 * CLIENT DIRECTIVE (supersedes the strategy's §6.3 routing instruction):
 *   The distributor is not named anywhere on this site — no logo, no wordmark,
 *   no text credit. The site explains what Leocym is and how it works, and
 *   points enquiries at Leocym directly. `npm run build` fails if the name
 *   reappears anywhere in shipped content; see scripts/check-claims.mjs.
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

export type NavItem = { label: string; href: string };

/**
 * Navigation follows the argument, in order: what the difference is, how it
 * works, what the science is, what the products are, where it is used.
 */
export const NAV: NavItem[] = [
  { label: "The difference", href: "#difference" },
  { label: "How it works", href: "#method" },
  { label: "The science", href: "#science" },
  { label: "Products", href: "#range" },
  { label: "Where it's used", href: "#areas" },
  { label: "Questions", href: "#questions" },
];
