import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { Compliance } from "@/components/sections/Compliance";
import { Closing } from "@/components/sections/Closing";
import { NextUp, PageHero } from "@/components/ui";
import { CERTIFICATIONS } from "@/content/compliance";
import { CLEANING_PRODUCTS } from "@/content/products";

export const metadata: Metadata = {
  title: "Certifications & safety information",
  description:
    "Composition, handling and storage for the Leocym range, the documentation available on request — safety data sheets, composition statements, technical data — and the claims the company will and will not make.",
  alternates: { canonical: "/certifications" },
};

/**
 * CERTIFICATIONS & SAFETY INFORMATION — sitemap Part C, item 5.
 * Marketing Strategy §6.3: "to build trust and support compliance."
 *
 * See the note at the top of content/compliance.ts for why the certification
 * register ships empty, and why that is the correct state rather than an
 * unfinished one.
 */
export default function CertificationsPage() {
  return (
    <PageTransition>
      <PageHero
        label="Certifications & safety"
        title="If we cannot prove it, we do not say it."
        standfirst="This page exists for the person compiling a site file, a tender response or a food-safety audit. Everything on it is either printed on the pack, derived from the catalogue, or a document we will send you on request."
        aside={[
          {
            k: "Certificates",
            v:
              CERTIFICATIONS.length > 0
                ? `${CERTIFICATIONS.length} listed`
                : "Supplied on request",
          },
          { k: "Safety sheets", v: "Per product, on request" },
          { k: "Cleaning range", v: `${CLEANING_PRODUCTS.length} products` },
          { k: "Standards", v: "ASCI and Indian product regulations" },
        ]}
      />

      <Compliance />

      <NextUp
        items={[
          {
            label: "For business",
            href: "/for-business",
            blurb:
              "Industrial and large-scale use, and the six-step site method.",
          },
          {
            label: "The products",
            href: "/products",
            blurb: "Printed specifications for every product in the range.",
          },
        ]}
      />

      <Closing
        title="Which document does your file need?"
        standfirst="Name the product and the paperwork. Safety data sheets, composition statements, technical data and any certificate held all come back as the document itself."
      />
    </PageTransition>
  );
}
