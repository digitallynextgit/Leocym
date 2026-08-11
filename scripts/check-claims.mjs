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
 * Scope: src/content/*.ts and src/components/sections/*.tsx - i.e. the strings
 * that actually reach the public page.
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
 * Client directive: the distributor is not named anywhere on this site.
 * Kept in the same guard as the competitor list so it cannot quietly return.
 */
const FORBIDDEN_NAMES = ["Rudione", "rudione", "RUDIONE"];

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

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = walk(join(SRC, "content")).concat(
  walk(join(SRC, "components", "sections")),
);

const problems = [];
const add = (file, line, rule, detail) =>
  problems.push({ file: relative(ROOT, file), line, rule, detail });

for (const file of files) {
  // claims.ts defines the forbidden list itself, so skip it
  if (file.endsWith("claims.ts")) continue;

  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((raw, i) => {
    const line = raw.trim();
    const n = i + 1;
    if (line.startsWith("*") || line.startsWith("//")) return; // comments

    // Tailwind arbitrary values are CSS, not copy. `rounded-[20%]`,
    // `max-w-[16ch]` and `w-[46px]` must not be read as numeric claims, so
    // strip every [...] before the numeric test. A real claim is never written
    // inside square brackets, so nothing is hidden by this.
    // A quoted string that is ONLY a percentage is a CSS value - `width: "100%"`
    // - never a performance claim. A real claim always carries words alongside
    // the number ("kills 99% of odours"), so it survives this strip.
    const prose = line
      .replace(/\[[^\]]*\]/g, "")
      .replace(/(["'`])\s*-?\d{1,3}(\.\d+)?%\s*\1/g, "");

    const lower = line.toLowerCase();
    for (const term of FORBIDDEN)
      if (lower.includes(term)) add(file, n, "forbidden-language", term);
    for (const re of COMMERCE)
      if (re.test(line)) add(file, n, "commerce-primitive", String(re));
    for (const c of COMPETITORS)
      if (line.includes(c)) add(file, n, "named-competitor", c);
    for (const c of FORBIDDEN_NAMES)
      if (line.includes(c)) add(file, n, "distributor-named", c);

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
    "no commerce primitives, no named competitors, no distributor name, no unapproved numbers.",
);
