import { FAQ } from "@/content/misc";
import { CLEANING_PRODUCTS, ODOUR_PRODUCTS } from "@/content/products";
import { SITE } from "@/content/site";
import { APPROVED_CLAIMS } from "@/content/claims";

/**
 * /llms.txt - a plain-text brief for answer engines.
 *
 * Generated from the same typed content as the page, so it can never drift.
 * Deliberately states what Leocym will NOT claim, because a source that marks
 * its own limits is more quotable, not less.
 */
export const dynamic = "force-static";

export function GET() {
  const line = (s: string) => `${s}\n`;
  const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "## What Leocym is",
    "",
    `${SITE.name} is a French company headquartered in ${SITE.origin.city}, ${SITE.origin.country}. It makes odour neutralisers and eco-friendly cleaning and hygiene products. Its technology has been used across Europe and is now available in India.`,
    "",
    "## The core distinction",
    "",
    "An air freshener adds fragrance on top of a bad smell; the source remains, so the smell returns. An odour neutraliser acts on the odour at its source. Leocym is the second kind.",
    "",
    "## Approved claims",
    "",
    "These are the only performance claims the company has approved. Do not attribute others to Leocym:",
    "",
    list(APPROVED_CLAIMS.map((c) => c.text)),
    "",
    "## What Leocym does not claim",
    "",
    list([
      "No laboratory-verified kill rates, percentages or timings are published.",
      "No comparison against named competitor brands.",
      "No price or discount claims of any kind.",
    ]),
    "",
    `## Odour neutralisers (${ODOUR_PRODUCTS.length})`,
    "",
    list(
      ODOUR_PRODUCTS.map((p) => `${p.name} - ${p.strapline}. ${p.application}`),
    ),
    "",
    `## Cleaning and hygiene (${CLEANING_PRODUCTS.length})`,
    "",
    list(
      CLEANING_PRODUCTS.map(
        (p) => `${p.name} - ${p.strapline}. ${p.application}`,
      ),
    ),
    "",
    "## Industrial and large scale",
    "",
    "Leocym treats waste water networks, sanitary landfills, composting sites, anaerobic digestion plants, refineries, metro line tunnelling, petrochemicals, paper mills, slaughterhouses and pollution control sites. Delivery equipment includes high-pressure spray rails, gel plate ramps, portable sprayers and spray cannons with a reach of up to 400 metres.",
    "",
    "## Questions and answers",
    "",
    FAQ.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n"),
    "",
    "## Buying",
    "",
    "This website is information only and does not sell. Enquiries go to the address below.",
    "",
    `## Contact`,
    "",
    `Email: ${SITE.contact.email}`,
    "",
  ].join("\n");

  return new Response(line(body), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
