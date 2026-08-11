import type { Metadata } from "next";
import { Areas } from "@/components/sections/Areas";
import { Method } from "@/components/sections/Method";
import { Industrial } from "@/components/sections/Industrial";
import { Closing } from "@/components/sections/Closing";
import { NextUp, PageHero } from "@/components/ui";
import { INDUSTRIAL } from "@/content/industrial";
import { AREAS_COUNT, PROCEDURE } from "@/content/misc";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "For business",
  description:
    "Industrial and large-scale odour control: waste water, landfill, on-site decontamination, heavy industry and pollution control sites — plus the six-step method behind every engagement.",
  alternates: { canonical: "/for-business" },
};

/**
 * FOR BUSINESS — sitemap Part C, item 4, built from the industrial and
 * large-scale content on catalogue pages 35–40 (Marketing Strategy §6.5).
 *
 * The strategy is explicit about why this page earns its place, and it is worth
 * restating because it is counter-intuitive: the large-scale work is not the
 * day-to-day selling focus. It is here because a facility manager who sees that
 * the same technology handles an entire landfill or water treatment plant will
 * trust it completely for their washrooms. Social proof and the Lindy effect,
 * doing the work that a price list cannot.
 *
 * Read in widening order: where it is used, how an engagement runs, and then
 * how far it scales.
 */
export default function ForBusinessPage() {
  return (
    <>
      <PageHero
        label="For business"
        title="Odour is a licence condition before it is a nuisance."
        standfirst="For facilities, food businesses, hospitals and hotels — and for contractors running municipal and industrial work, where the result is measured at the site boundary by somebody who did not buy the product."
        aside={[
          { k: "Environments", v: `${AREAS_COUNT} listed` },
          { k: "Method", v: `${PROCEDURE.length} steps, fixed` },
          { k: "At scale", v: `${INDUSTRIAL.length} site categories` },
          { k: "Enquiries", v: SITE.contact.email },
        ]}
      />

      <Areas />
      <Method />
      <Industrial />

      <NextUp
        items={[
          {
            label: "Certifications & safety",
            href: "/certifications",
            blurb:
              "Safety data sheets, composition statements and technical data for the site file.",
          },
          {
            label: "The products",
            href: "/products",
            blurb: "The full range, filtered by the problem it treats.",
          },
        ]}
      />

      <Closing
        title="Send us the site, not just the smell."
        standfirst="Photographs, the layout, what has been tried and what it has to pass. Large-scale work starts with an assessment, and the assessment starts with that."
      />
    </>
  );
}
