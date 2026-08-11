import { Hero } from "@/components/sections/Hero";
import { Difference } from "@/components/sections/Difference";
import {
  OriginPreview,
  RangePreview,
  ScalePreview,
} from "@/components/sections/Previews";
import { Closing } from "@/components/sections/Closing";

import { PRODUCTS } from "@/content/products";
import { NAV, SITE } from "@/content/site";

/**
 * THE HOMEPAGE.
 *
 * It used to be the whole site: twelve sections, twenty-six product plates with
 * a filter bar and a dialog, five industrial segments with photography,
 * twenty-seven areas of use, a six-step method, four science blocks and ten
 * expandable questions, stacked on one scroll. Every part was good and the
 * total was unreadable - the reader had to get through the entire catalogue to
 * find out whether the brand was worth their attention.
 *
 * The sitemap already told us the shape (Marketing Strategy §6.3): five
 * information pages, a where-to-buy, and an enquiry form. So the homepage now
 * does the one job a homepage should - make the argument, then point.
 *
 *   1 Hero          the promise, one action
 *   2 Difference    the argument the whole brand rests on, full screen
 *   3 Range         six plates out of twenty-six          -> /products
 *   4 Scale         five segments, one photograph          -> /for-business
 *   5 Origin        three sentences and a map              -> /brand-story
 *   6 Closing       the one CTA           -> /contact, /where-to-buy
 *
 * Nothing was deleted. Method, Science, Areas, Industrial, the full catalogue
 * and the questions all moved to the page where a reader has a reason to want
 * them, and every preview here reads from the same typed content, so they
 * cannot drift apart.
 */
export default function Page() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Difference />
      <RangePreview />
      <ScalePreview />
      <OriginPreview />
      <Closing />
    </>
  );
}

/**
 * Machine-readable layer for the homepage: who Leocym is, what the site is, and
 * the full product list.
 *
 * The FAQPage graph is NOT here. It lives on /contact, alongside the questions
 * it describes - a page that claims FAQ markup without rendering the answers is
 * lying to the crawler, and the questions moved when the homepage was cut down.
 *
 * No `offers` or `price` on any Product node - this site does not sell, and
 * telling a crawler otherwise would be a lie.
 */
function StructuredData() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE.url}#organization`,
      name: SITE.name,
      url: SITE.url,
      slogan: SITE.tagline,
      description: SITE.description,
      logo: `${SITE.url}/brand/leocym-lockup.png`,
      email: SITE.contact.email,
      sameAs: [SITE.contact.youtube],
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.origin.city,
        addressCountry: "FR",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE.url}#organization` },
      hasPart: NAV.map((item) => ({
        "@type": "WebPage",
        "@id": `${SITE.url}${item.href}`,
        name: item.label,
        description: item.blurb,
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${SITE.url}#range`,
      name: "The Leocym range",
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          description: p.description,
          image: `${SITE.url}${p.image}`,
          brand: { "@id": `${SITE.url}#organization` },
          category:
            p.family === "odour" ? "Odour neutraliser" : "Cleaning & hygiene",
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
