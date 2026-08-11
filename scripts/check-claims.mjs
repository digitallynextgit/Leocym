#!/usr/bin/env node
/**
 * Claims and commerce guard. Runs before every build.
 *
 * WEBSITE-PLAN.md §6 promises that the contractual rules are enforced by the
 * build rather than by memory. This is that enforcement.
 *
 * It fails the build if any of the following appear in shipped content:
 *   1. Language from FORBIDDEN_LANGUAGE in content/claims.ts
 *   2. Commerce primitives - price, cart, checkout, ₹, MRP
 *   3. A named competitor
 *   4. An invented performance number (a percentage or a "kills N%" pattern)
 *      outside the small allowlist of printed catalogue specifications
 *
 * Scope: src/content, src/components and src/app - i.e. every string that can
 * reach a public page. src/app was added when the site became multi-page: page
 * files now carry real copy (page headings, standfirsts, metadata
 * descriptions), and none of it was being checked while the guard only looked
 * at the section components.
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// fileURLToPath, not .pathname - this project lives under a directory with a
// space in it, which .pathname would hand back percent-encoded.
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");

/** Kept in sync with content/claims.ts FORBIDDEN_LANGUAGE. */
const FORBIDDEN = [
  "cheapest",
  "discount",
  "lowest price",
  "best in the world",
  "miracle",
  "guaranteed forever",
  "sale ends",
  "limited stock",
  "add to cart",
  "buy now",
  "hurry",
];

/** Contractual: this site never sells (Marketing Strategy §6.3). */
const COMMERCE = [
  /₹/,
  /\bMRP\b/i,
  /\bcheckout\b/i,
  // Indian pricing is far more often written "Rs. 499" or "499 INR" than
  // with the glyph, so the symbol alone was never enough cover.
  /\bRs\.?\s*\d/i,
  /\bINR\b/,
  /\badd to (cart|basket|bag)\b/i,
  /\bbuy now\b/i,
];

/**
 * The distributor's name.
 *
 * Marketing Strategy §6.3.3 requires a 'where to buy' section that links to the
 * distributor's website, so the name cannot be banned outright the way it was
 * when this site had nowhere to send buying traffic. It is confined instead:
 * allowed in the two files below, an error everywhere else.
 *
 * What is still absolute, and is NOT relaxed here: no distributor logo, lockup
 * or co-branded mark anywhere on this site. This is Leocym's own channel and it
 * carries the Leocym logo only (Brand Guidelines Part 2) - there is no such
 * asset in `public/` and none should be added.
 */
const FORBIDDEN_NAMES = ["Rudione", "rudione", "RUDIONE"];

/** Paths, relative to the repo root, where the distributor may be named. */
const DISTRIBUTOR_ALLOWED = [
  join("src", "content", "site.ts"),
  join("src", "components", "sections", "WhereToBuy.tsx"),
];

/** Never named on the public site (Marketing Strategy §3.4). */
const COMPETITORS = [
  "Odonil",
  "Godrej",
  "Febreze",
  "Ambi Pur",
  "Ecolab",
  "Diversey",
  "Buzil",
  "Satol",
];

/**
 * Printed catalogue specifications. These are manufacturer specs, not new
 * performance claims, and are permitted. Anything else numeric is not.
 */
const ALLOWED_NUMERIC = [
  /\b9[89]% ingredients of plant/i,
  /\b400 m(etres)? reach/i,
  /spray cannons? with a reach of up to 400 metres/i,
  /\b6 weeks\b/i,
  /\bup to 6 months\b/i,
  /\b3000 sprays\b/i,
  /\b500 ml\b/i,
  /\b100 ml\b/i,
  /\b220 V\b/,
  /\b2 years\b/i,
  /\b5°C and 45°C\b/i,
  /\b4\.5:1\b/,
];

const NUMERIC_CLAIM = /\b\d{1,3}(\.\d+)?\s?%/g;
const KILL_CLAIM = /\bkills?\s+\d/gi;

/** A quoted string, and the test for "this is a CSS value, not a sentence". */
const QUOTED = /(["'`])([^"'`\n]*)\1/g;
const CSS_ONLY =
  /^[\s\d.%,()+\-*/]*(?:(?:px|rem|em|vh|vw|svh|dvh|fr|ch|deg|ms|s|auto|none|calc|min|max|clamp|var|infinity)[\s\d.%,()+\-*/]*)*$/i;

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = [
  ...walk(join(SRC, "content")),
  ...walk(join(SRC, "components")),
  ...walk(join(SRC, "app")),
];

const problems = [];
const add = (file, line, rule, detail) =>
  problems.push({ file: relative(ROOT, file), line, rule, detail });

/**
 * Files that DESCRIBE the rules rather than speak to a customer. Scanning them
 * is self-defeating: claims.ts defines the forbidden list, and /review is the
 * internal approval sheet whose whole job is to restate the contract ("no
 * price, no cart, no checkout") so a human can sign it off. Both are excluded
 * for the same reason, and /review is noindex and unlinked besides.
 */
const DESCRIBES_THE_RULES = (rel) =>
  rel.endsWith(join("content", "claims.ts")) ||
  rel.startsWith(join("src", "app", "review"));

for (const file of files) {
  const rel = relative(ROOT, file);
  if (DESCRIBES_THE_RULES(rel)) continue;

  const mayNameDistributor = DISTRIBUTOR_ALLOWED.includes(rel);

  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((raw, i) => {
    const line = raw.trim();
    const n = i + 1;
    // Comments: `//`, and both the opening `/*` and the continuation `*` of a
    // block. The opening line was missed until the guard started scanning
    // src/app, where a file-header comment naming the distributor sailed past
    // the `*` test because it begins with a slash.
    if (
      line.startsWith("*") ||
      line.startsWith("//") ||
      line.startsWith("/*")
    )
      return;

    // Tailwind arbitrary values are CSS, not copy. `rounded-[20%]`,
    // `max-w-[16ch]` and `w-[46px]` must not be read as numeric claims, so
    // strip every [...] before the numeric test. A real claim is never written
    // inside square brackets, so nothing is hidden by this.
    //
    // Likewise a quoted string made only of CSS tokens - `"100%"`,
    // `"0px 0px -12% 0px"`, `"calc(100% - 2rem)"` - is a style value, never a
    // performance claim. Anything carrying an actual word is left alone, and a
    // real claim always carries words beside the number ("kills 99% of
    // odours"), so nothing that asserts anything can hide in here.
    const prose = line
      .replace(/\[[^\]]*\]/g, "")
      .replace(QUOTED, (m, _q, inner) => (CSS_ONLY.test(inner) ? "" : m));

    const lower = line.toLowerCase();
    for (const term of FORBIDDEN)
      if (lower.includes(term)) add(file, n, "forbidden-language", term);
    for (const re of COMMERCE)
      if (re.test(line)) add(file, n, "commerce-primitive", String(re));
    for (const c of COMPETITORS)
      if (line.includes(c)) add(file, n, "named-competitor", c);
    if (!mayNameDistributor) {
      for (const c of FORBIDDEN_NAMES)
        if (line.includes(c)) add(file, n, "distributor-named", c);
    }

    for (const m of prose.match(NUMERIC_CLAIM) ?? []) {
      if (!ALLOWED_NUMERIC.some((re) => re.test(prose)))
        add(file, n, "unapproved-numeric-claim", m);
    }
    for (const m of prose.match(KILL_CLAIM) ?? [])
      add(file, n, "unapproved-kill-claim", m);
  });
}

if (problems.length) {
  console.error(
    "\n✗ Claims guard failed - " + problems.length + " issue(s):\n",
  );
  for (const p of problems)
    console.error(`  ${p.file}:${p.line}  [${p.rule}]  ${p.detail}`);
  console.error(
    "\nSee src/content/claims.ts. New performance claims need written approval\n" +
      "from Ms. Priya Lalani (Brand Guidelines Part 12).\n",
  );
  process.exit(1);
}

console.log(
  `✓ Claims guard passed - ${files.length} files checked, no forbidden language, ` +
    "no commerce primitives, no named competitors, no unapproved numbers, and the\n" +
    `  distributor named only in ${DISTRIBUTOR_ALLOWED.join(" and ")}.`,
);
