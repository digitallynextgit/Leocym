import type { Metadata } from "next";
import { Origin } from "@/components/sections/Origin";
import { Heritage } from "@/components/sections/Heritage";
import { Science } from "@/components/sections/Science";
import { Closing } from "@/components/sections/Closing";
import { NextUp, PageHero } from "@/components/ui";
import { PRODUCTS } from "@/content/products";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Brand story",
  description:
    "Leocym is a French company from Douai. Where the technology comes from, why odour is treated at its source rather than covered, and how the chemistry is delivered.",
  alternates: { canonical: "/brand-story" },
};

/**
 * BRAND STORY — sitemap Part C, item 2.
 * "French origin, time-tested Europe-trusted technology."
 *
 * Read in that order: where it is from, why age is the argument, and then how
 * the chemistry actually works. The science used to be a block on the homepage
 * that most readers scrolled past on their way to the products; here it has the
 * room to be the proof rather than a claim.
 */
export default function BrandStoryPage() {
  return (
    <>
      <PageHero
        label="Brand story"
        title="A French company built around one refusal."
        standfirst="That covering a smell is not the same as removing one. Everything else — the chemistry, the range, the equipment that carries it onto a landfill — follows from that one position."
        aside={[
          { k: "Founded in", v: `${SITE.origin.city}, ${SITE.origin.country}` },
          { k: "Field", v: "Odour neutralisation and eco-hygiene" },
          { k: "Range", v: `${PRODUCTS.length} products` },
          { k: "In India", v: "Available now" },
        ]}
      />

      <Origin />
      <Heritage />
      <Science />

      <NextUp
        items={[
          {
            label: "The products",
            href: "/products",
            blurb: `All ${PRODUCTS.length}, organised by the problem they treat rather than by name.`,
          },
          {
            label: "Certifications & safety",
            href: "/certifications",
            blurb:
              "Composition, handling, and the documentation available on request.",
          },
        ]}
      />

      <Closing />
    </>
  );
}
