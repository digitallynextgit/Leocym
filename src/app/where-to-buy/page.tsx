import type { Metadata } from "next";
import { WhereToBuy } from "@/components/sections/WhereToBuy";
import { NextUp, PageHero } from "@/components/ui";
import { PRODUCTS } from "@/content/products";
import { RETAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "Where to buy",
  description: `The Leocym range is distributed in India by ${RETAIL.name}. This site is information only — where to buy it, for a home or for a business.`,
  alternates: { canonical: "/where-to-buy" },
};

/**
 * WHERE TO BUY — sitemap Part C, item 6.
 *
 * The only page on the site that sends a reader somewhere else on purpose.
 * There is no Closing band at the foot of it, unlike every other page: a second
 * call to action underneath the one link this page exists to serve would be
 * competing with itself.
 */
export default function WhereToBuyPage() {
  return (
    <>
      <PageHero
        label="Where to buy"
        title="This site does not sell. Here is the one that does."
        standfirst="Leocym explains the technology and stands behind it. The range itself is imported and sold in India by our distributor, on their own site — one order, one record, one person to call afterwards."
        aside={[
          { k: "Sold by", v: `${RETAIL.name}, ${RETAIL.roleInline}` },
          { k: "Range", v: `${PRODUCTS.length} products` },
          { k: "For", v: "Homes and businesses" },
          { k: "On this site", v: "Nothing — information only" },
        ]}
      />

      <WhereToBuy />

      <NextUp
        items={[
          {
            label: "The products",
            href: "/products",
            blurb:
              "Work out which one treats your smell before you go looking for it.",
          },
          {
            label: "Business enquiry",
            href: "/contact",
            blurb:
              "Volume supply, a difficult site, or documentation for a tender.",
          },
        ]}
      />
    </>
  );
}
