# Leocym India - website

Informational brand site for Leocym, the French odour-neutralisation and
eco-hygiene brand. It explains what Leocym is, why it works, how it is applied
and where it is used.

**This site does not sell.** It never should. See "Contract" below.

---

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # runs the claims guard first, then builds
npm run check:claims   # the compliance guard on its own
```

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript strict.
Everything prerenders as static.

---

## Deployment

Hosted on Vercel, connected to `Karanjoshi128/leocym-site`. **Every push to
`main` deploys to production; every other branch gets a preview URL.**

- Production: https://leocym-site.vercel.app
- The build runs `scripts/check-claims.mjs` first, so a commit that breaks the
  claims contract **fails the deploy** rather than shipping.

### The site is deliberately not indexable yet

`NEXT_PUBLIC_INDEXABLE` is unset in Vercel, so `robots.txt` serves
`Disallow: /` and every page carries `noindex, nofollow`. The site is reachable
by URL for review but invisible to search engines.

**To go live:** set `NEXT_PUBLIC_INDEXABLE=true` in the Vercel project's
Production environment and redeploy — but only after the copy at `/review` has
been signed off (Marketing Strategy §13.7, one week ahead of go-live).

## Environment

| Variable                   | Effect                                                                                                                                                                                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_INDEXABLE`    | `"true"` allows indexing. Anything else emits `Disallow: /` and `noindex`. **Preview deploys must leave it unset.**                                                                                                                                       |

That is the only variable. There is no distributor flag and no enquiry webhook:
enquiries go to `info@leocym.com` directly.

---

## Contract - do not break these

These come from the brand guidelines and the marketing strategy supplied with
the project. They are contractual and, for claims, legally load-bearing.

1. **Leocym logo only, and no distributor named anywhere.** Client directive:
   the distributor appears nowhere - no logo, no wordmark, no text credit. The
   build **fails** if the name reappears in shipped content.
2. **No commerce.** No price, no cart, no checkout - and no such field exists in
   the type system (`src/content/products.ts` has no price field on purpose).
   The JSON-LD carries no `offers` or `price` either.
3. **Approved claims only.** `src/content/claims.ts` holds the claims the company
   has approved. There is no laboratory test data, so no new number, percentage
   or kill-rate may be introduced without written approval from Ms. Priya Lalani.
4. **No named competitors.** Odonil, Godrej, Febreze, Ambi Pur, Ecolab,
   Diversey, Buzil and Satol must never appear on the public site.
5. **One CTA only.** The header button and the closing contact section. No
   secondary calls to action scattered through the page.

`npm run build` enforces these via `scripts/check-claims.mjs`, which fails the
build on a breach. It is tested - inject a violation and it exits non-zero.

`/review` renders every claim and every line of product copy on one page, so it
can be approved a week ahead of go-live without clicking through the whole site.
It is `noindex` and unlinked.

---

## Structure

```
src/
  app/
    globals.css          the brand token layer - read this first
    layout.tsx           fonts + metadata
    page.tsx             the 12 sections, in order, + JSON-LD
    review/              the copy approval sheet (noindex)
    llms.txt/            generated brief for answer engines
  content/               <- single source of truth. Edit content here, not in JSX.
    products.ts          26 products, transcribed from the printed catalogue
    industrial.ts        5 segments, catalogue pp.34-39
    misc.ts              method, areas of use, Q&A
    claims.ts            the claims allowlist
    site.ts              config, nav, contact
  components/
    ui.tsx               shared primitives
    sections/            one file per section
public/
  products/              26 plates, extracted from the catalogue PDF
  stock/                 CC0 photography + CREDITS.json provenance
  brand/                 the Leocym logo, extracted from the catalogue PDF
```

Content lives as typed data so the deferred v2 product pages can be generated
from it without rewriting anything.

---

## Design system

Direction: **French technical apothecary** - editorial typography on an
industrial spec-sheet grid. Every colour is either sampled from the real Leocym
catalogue or taken verbatim from the Brand Guidelines. Nothing was invented.

- **Ground** warm paper `#FEF4E8`, sampled from the catalogue page. Never white.
- **Ink** Leocym Indigo `#282864`, dominant.
- **Accent** Leocym Orange `#F07814`, roughly 10% of any view, never more.
- **Signals** red = the problem, green = neutralised. Semantic only.
- **Type** Lora carries the argument, Montserrat carries the evidence, Open Sans
  carries long prose. Italianno appears **once** on the whole site, as the
  signature in the Origin section.
- **Hierarchy** comes from hairline rules, measure and position - not from a
  uniform rounded-and-shadowed card repeated everywhere.
- **Motion** — staggered scroll entrances, a lift on the product plates, and the
  mask/neutralise state change. All of it runs off one easing and three
  durations from `@theme`, and all of it is switched off wholesale under
  `prefers-reduced-motion`.

### How the animation works

`components/Reveal.tsx` is an IntersectionObserver that sets a single
`data-shown` attribute; CSS does the rest. No animation library, nothing running
on scroll, and each element reveals once rather than re-firing on every pass.

Two safeguards worth keeping: the hidden state is scoped to `.js` (added by the
observer on mount), so with JavaScript off the content is simply visible; and
`prefers-reduced-motion` zeroes every transition globally, so the element still
appears, it just does not travel.

### Icons

`components/Icon.tsx` holds a **hand-drawn set of 19 glyphs** plus a simplified
map of France. They are not Lucide, Heroicons or any other library, and that is
deliberate: a stock set dropped into a tinted rounded square is one of the most
recognisable generated-UI tells there is, and it would undo the work the rest of
the design does.

House style, so they read as one family: 24x24 box, 1.5 stroke, round caps,
`currentColor`, no fill. Icon names live on the **content** (`misc.ts`,
`industrial.ts`), not in the markup, so a section never picks its own icon.

The Origin section uses the map rather than a flag. A flag says "French brand"
and stops; the map says *where*, which is the point of that section.

### Imagery

- **Product plates** are the real catalogue photography, extracted from the PDF.
- **Everything else** is CC0 / public-domain stock. Provenance for every file is
  in `public/stock/CREDITS.json`. All of it is `cc0 1.0` or `pdm 1.0`, so no
  attribution is required, but the record is kept anyway.
- Image containers use `--radius-plate` (22px) and `--radius-photo` (26px) to
  match the curve of the catalogue's own product cards.

### Industrial section: repeat the structure

An earlier version gave each of the five segments a different number of
photographs, on the theory that varied density reads as rhythm. Design review
disagreed, correctly — it read as inconsistency and made the section hard to
scan. Every segment now uses the **identical** layout: icon, number, title,
premise and spec chips down the left, one photograph on the right.

Areas and techniques are **chips, not bulleted lists**. Same information, about
half the vertical space, and much faster to scan.

### Depth

`plate-depth` (light grounds) and `plate-depth-inv` (dark grounds) apply a very
restrained elevation, and **only ever to imagery** — never to text surfaces,
which would turn the page into the card-and-shadow layout the rest of the design
avoids. The shadow is warm-tinted rather than neutral: grey shadow on a cream
ground reads as dirt.

### Vertical rhythm is viewport-aware

Sections are sized so that each one which reasonably _can_ sit in a single
screen, does. Two mechanisms:

- `section-y` (globals.css) is `clamp(1.35rem, 3.6vh, 3.25rem)` - padding that
  scales with **viewport height**, not just width. On a short laptop it
  contracts so the section still fits; on a tall display it opens back out. A
  fixed padding can only ever be right for one screen height.
- **`--header-h` is the single source of truth for the navbar height** (5.25rem
  / 84px). The header renders at exactly that height, and it is also what
  `fits-view`, the hero, the anchor scroll offset and the mobile nav panel all
  derive from. Change that one token and everything stays in register — nothing
  else hardcodes a header height.
- The `fits-view` utility means "one screen, minus the navbar":
  `min-height: calc(100svh - var(--header-h))` with the content centred. The
  **hero** and **The difference** both use it, so each fills the view exactly.
  Both drop the constraint below `lg` — pinning a height on a phone crushes the
  copy against the diagram.

Two sections are deliberately exempt: **the range** (26 products) and
**industrial** (5 segments with photography). Compressing those into one screen
would mean cutting content, which is the wrong trade for a catalogue site.

If you add content to a section, re-measure before assuming it still fits.

One contrast note: the Guidelines list Leocym Indigo Light as `#8989AA`, but it
measures 2.56:1 on the darkest paper ground and fails AA for the secondary text
it is meant for. `--color-ink-soft` is darkened to `#5E608E`, the nearest indigo
that clears 4.5:1 on all three grounds.

### Two Tailwind v4 traps this project already hit

1. `duration-[--dur-quick]` **silently disables the transition.** v4 no longer
   wraps `[--token]` in `var()`, so it compiles to
   `transition-duration:--dur-quick`, which is invalid - and because it also
   poisons `--tw-duration`, you lose the 150ms default too. Use
   `duration-(--dur-quick)`.
2. `rounded-[--radius-plate]` is dead for the same reason. `--radius-*` is a real
   v4 theme namespace, so use the generated `rounded-plate` / `rounded-photo`.

Both were invisible in code review and only surfaced by reading the compiled CSS.
If you add a token-driven utility, verify the computed style in a browser.

---

## Verified

Checked on desktop (1440) and mobile (390) against the production build:

- axe-core WCAG 2.2 AA: **0 violations**, in both diagram states
- 0 console or page errors, 0 horizontal overflow
- Keyboard: skip link, radiogroup arrow keys + roving tabindex, dialog focus
  trap + Escape + focus restore, mobile nav focus trap + Escape + focus restore
- JSON-LD valid, 4 nodes, no commerce fields
- All 46 images resolve; total image payload 1.72 MB
