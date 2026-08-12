import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { Range } from "@/components/sections/Range";
import { Closing } from "@/components/sections/Closing";
import { NextUp, PageHero } from "@/components/ui";
import {
  CLEANING_PRODUCTS,
  ODOUR_PRODUCTS,
  PRODUCTS,
} from "@/content/products";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Product catalogue",
  description: `The full Leocym range — ${ODOUR_PRODUCTS.length} odour neutralisers and ${CLEANING_PRODUCTS.length} cleaning and hygiene products, filtered by the problem they treat. Information only; nothing is sold on this site.`,
  alternates: { canonical: "/products" },
};

/**
 * PRODUCT CATALOGUE — sitemap Part C, item 3.
 * "Shown as information only, with no option to buy."
 *
 * That constraint is enforced below the copy as well as in it: `Product` in
 * content/products.ts has no price field, the JSON-LD carries no `offers`, and
 * scripts/check-claims.mjs fails the build on any commerce primitive. There is
 * nothing to remove later because there is nothing to remove now.
 */
export default function ProductsPage() {
  return (
    <PageTransition>
      <CatalogueData />

      <PageHero
        label="Product catalogue"
        title="Named after the problem, not the perfume."
        standfirst="Every product here exists because a specific source behaves a specific way. Filter by the smell you actually have, and open any plate for the printed specification."
        aside={[
          { k: "Odour", v: `${ODOUR_PRODUCTS.length} neutralisers` },
          { k: "Cleaning", v: `${CLEANING_PRODUCTS.length} products` },
          { k: "Sold here", v: "No — information only" },
          { k: "Specifications", v: "As printed in the catalogue" },
        ]}
      />

      <Range />

      <NextUp
        items={[
          {
            label: "Where to buy",
            href: "/where-to-buy",
            blurb: "Where the range is sold in India, and how to order at scale.",
          },
          {
            label: "For business",
            href: "/for-business",
            blurb:
              "Industrial and large-scale use, and the six-step method behind it.",
          },
        ]}
      />

      <Closing
        title="Not sure which one treats your smell?"
        standfirst="Describe the site and the source. The range is large on purpose, and the right answer is usually one product rather than three."
      />
    </PageTransition>
  );
}

/**
 * The catalogue's machine-readable layer.
 *
 * No `offers`, no `price`, no `availability` on any node. A crawler that reads
 * this must come away knowing the range exists and knowing it cannot be bought
 * here — which is exactly what the page says to a human.
 */
function CatalogueData() {
  const graph = [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.url}/products#page`,
      url: `${SITE.url}/products`,
      name: "Leocym product catalogue",
      isPartOf: { "@id": `${SITE.url}#website` },
      about: { "@id": `${SITE.url}#organization` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE.url}/products#list`,
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
