/**
 * Certifications, safety and compliance.
 * Sitemap Part C · Marketing Strategy §6.3 item 5: "Certifications and safety
 * information, to build trust and support compliance."
 *
 * READ THIS BEFORE EDITING.
 *
 * A certification is a factual assertion about a third party's audit. Inventing
 * one — or implying one by decorating the page with a badge nobody issued — is
 * the single most damaging thing that could go on this site, and it would
 * breach Brand Guidelines Part 12 ("if we cannot prove it, we do not say it")
 * and ASCI's rules at the same time.
 *
 * So CERTIFICATIONS below is empty, deliberately. It is not an oversight and it
 * is not a placeholder to be filled with something plausible. Nothing goes in it
 * until Ms. Priya Lalani supplies the certificate, its issuing body and its
 * reference number. The page renders an honest "documentation on request" state
 * while the register is empty, and switches to a certificate table the moment a
 * real entry lands — no other change required.
 *
 * Everything else on this page is transcribed from the printed catalogue and
 * the pack labels, which are manufacturer statements rather than new claims.
 */

export type Certification = {
  /** What is certified. */
  name: string;
  /** WHO issued it. A certification with no issuer is a decoration. */
  issuer: string;
  /** Certificate or registration number, so it can be verified. */
  reference: string;
  /** What it actually covers — the range, a product, the factory. */
  scope: string;
};

/**
 * EMPTY BY DESIGN. See the note at the top of this file.
 * Add entries only from a certificate document supplied by the company.
 */
export const CERTIFICATIONS: readonly Certification[] = [];

/* ------------------------------------------------------------ SAFETY & USE */
/* Transcribed from the pack labels and catalogue. These were previously buried
   in the Science section; they belong on a page a facility or food-safety
   officer can be sent straight to. */

export type SafetyNote = { label: string; body: string };

export const HANDLING: readonly SafetyNote[] = [
  {
    label: "Read the label",
    body: "Every pack carries its own directions, precautions and storage conditions. Follow the pack, not a general rule. Where the pack and this page ever disagree, the pack is correct.",
  },
  {
    label: "Not on food",
    body: "Meat Odrkill and Fish Odrkill treat surfaces, equipment and surroundings. They are not to be sprayed on food products.",
  },
  {
    label: "Not on people or animals",
    body: "Where a product is applied by spraying into the air, it is used outside of human or animal presence.",
  },
  {
    label: "Fragrance sensitivity",
    body: "Some products contain fragrance and can cause cutaneous allergy. Particular attention is recommended for anyone sensitive to fragrance. Fragrance-free formulations exist in the range for exactly this reason.",
  },
  {
    label: "Keep away from children",
    body: "Store out of reach of children, in sealed packaging, away from direct sunlight.",
  },
  {
    label: "Disposal",
    body: "Dispose of product in accordance with local, regional, national and international regulations.",
  },
];

/* ---------------------------------------------------------- DOCUMENTATION  */
/* What a compliance officer can actually ask for. Naming the documents by their
   real names is what tells a professional reader they are dealing with a
   professional supplier. */

export const DOCUMENTATION: readonly SafetyNote[] = [
  {
    label: "Safety data sheets",
    body: "An SDS for any product in the range, for the site file, the tender pack or the food-safety audit.",
  },
  {
    label: "Composition statements",
    body: "The declared composition for a specific product, beyond the summary printed on the pack.",
  },
  {
    label: "Certification documents",
    body: "Certificates held for a product or the manufacturing site, supplied as issued, with the issuing body named.",
  },
  {
    label: "Technical data sheets",
    body: "Dilution, dosing, contact time, material compatibility and equipment specifications for large-scale application.",
  },
];

/* ------------------------------------------------------------- OUR CLAIMS  */
/* The claims position, stated on the public site rather than kept internal.
   A supplier that publishes its own limits is more credible than one that
   publishes a number nobody can check — and it is the correct posture under
   ASCI's guidance on cleaning, hygiene and eco claims. */

export const CLAIMS_POSITION: readonly SafetyNote[] = [
  {
    label: "What we state",
    body: "That our odour products act on the odour compound at its source rather than covering it with fragrance, and that the cleaning range is made predominantly of ingredients of plant and mineral origin, as printed on each pack.",
  },
  {
    label: "What we do not state",
    body: "No laboratory kill rates, no timings, no efficacy percentages. There is no published test data behind such numbers, so they are not printed here, on the packs, or in any advertising.",
  },
  {
    label: "No comparisons",
    body: "We do not name or rank competitor brands. The argument for the technology is the mechanism, which stands on its own.",
  },
  {
    label: "Advertising standards",
    body: "Claims, creatives and campaigns are held to applicable Indian advertising standards and product regulations, including ASCI guidance and the rules that apply to cleaning, hygiene and eco or biodegradable claims.",
  },
];
