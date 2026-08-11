/**
 * THE CLAIMS ALLOWLIST - legally load-bearing. Read before editing.
 *
 * Rudione Brand Guidelines Part 12 · Marketing Strategy §8.4, §14.4:
 *
 *   "If we cannot prove it, we do not say it."
 *
 * Only the strings below have been checked and approved by the company and may
 * be used as written. NEW specific or number-based performance claims (e.g.
 * "kills 99.9% of bacteria in 60 seconds") MUST NOT be introduced without real
 * evidence or written approval from Ms. Priya Lalani. There is currently no
 * laboratory test data.
 *
 * Anything rendered on this site that asserts what a product does should either
 * come from here or from PRODUCT_SPECS below. Everything on this page is
 * surfaced at /review so it can be approved a week ahead of go-live.
 */

export type Claim = {
  id: string;
  text: string;
  /** Where the approval comes from. */
  source: string;
};

/** Approved verbatim. Do not reword. */
export const APPROVED_CLAIMS: readonly Claim[] = [
  {
    id: "source-not-mask",
    text: "Our odour products remove smells at the source, rather than masking them with fragrance.",
    source: "Brand Guidelines §12.2",
  },
  {
    id: "gutka",
    text: "We are the only product in India that removes gutka stains.",
    source: "Brand Guidelines §12.2",
  },
  {
    id: "urine-garbage-smoke",
    text: "We are the only real solution that removes human urine, garbage and smoke smells at the source.",
    source: "Brand Guidelines §12.2",
  },
  {
    id: "greaseblast",
    text: "Our GreaseBlast was tested as performing far better than other brands.",
    source: "Brand Guidelines §12.2",
  },
] as const;

/**
 * NOT a claim. These are the mechanism descriptions printed in the Leocym
 * product catalogue - how the chemistry works, with no performance number
 * attached. Safe to paraphrase, never to embellish.
 */
export const MECHANISM = {
  short: "Removes odour at the source. Does not mask it.",
  long: "Most products place a fragrance on top of a bad smell. The source is still there, so the smell comes back. Leocym works on the odour itself - the synergistic action actively neutralises the compound rather than covering it.",
  polymerGel:
    "A high concentration of perfuming agents combined with powerful neutralising agents, delivered by polymer gel technology. The synergistic action, instead of masking, actively neutralises unpleasant odours.",
} as const;

/**
 * Product SPECIFICATIONS carried from the printed catalogue and pack labels.
 * These are manufacturer specs, not new performance claims - see
 * WEBSITE-PLAN.md §7 (flagged with Priya for confirmation).
 */
export const SPEC_NOTE =
  "Specifications as printed in the Leocym product catalogue.";

/** Language forbidden anywhere on this site. */
export const FORBIDDEN_LANGUAGE: readonly string[] = [
  "cheapest",
  "discount",
  "lowest price",
  "best in the world",
  "miracle",
  "guaranteed forever",
  "99.9%",
  "kills 99",
  "sale ends",
  "limited stock",
  "hurry",
  "buy now",
  "add to cart",
] as const;
