# Leocym India - website

Informational brand site for Leocym, the French odour-neutralisation and
eco-hygiene brand. It explains what Leocym is, why it works, how it is applied
and where it is used - and then hands buying traffic to the distributor.

**This site does not sell.** It never should. See "Contract" below.

---

## Run it

```bash
pnpm install
pnpm dev              # http://localhost:3000
pnpm build            # runs the claims guard first, then builds
pnpm check:claims     # the compliance guard on its own
```

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript strict.
Every page prerenders as static; the one exception is `/api/enquiry`, which has
to run per-request because it sends mail.

---

## The pages

The structure comes from the client sitemap (Part C) and Marketing Strategy
§6.3, which lists exactly what the Leocym site must contain. One page per item:

| Route             | Sitemap item                        | What lives there                                                                  |
| ----------------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| `/`               | HOME                                | Hero, the neutralise-vs-mask argument, and a short preview of each page below       |
| `/brand-story`    | BRAND STORY                         | Origin (Douai), the time-tested / Europe-trusted argument, and the science          |
| `/products`       | PRODUCT CATALOGUE                   | All 26 products, filterable by problem, detail dialog. No buy option, by contract   |
| `/for-business`   | FOR BUSINESS                        | Areas of use, the six-step method, and the five industrial segments (cat. pp.35-40) |
| `/certifications` | CERTIFICATIONS & SAFETY INFORMATION | Composition, handling, the certificate register, documentation, claims position     |
| `/where-to-buy`   | WHERE TO BUY                        | The one outbound link, to the distributor's site - never to a marketplace           |
| `/contact`        | BUSINESS ENQUIRY & CONTACT FORM     | The enquiry form (SMTP), direct contact routes, and the questions                   |

Plus `/review` (the noindex copy-approval sheet), `/llms.txt` (a brief for
answer engines) and a `not-found` page. `sitemap.xml` is generated from the same
`NAV` array the header and footer render, so a page cannot be added to the
navigation and quietly left out of the sitemap.

### Why it stopped being one page

v1 put all twelve sections on the homepage. Every part was good and the total
was unreadable - a reader had to scroll the entire catalogue, five industrial
segments and ten expandable questions to find out whether the brand deserved
their attention. Nothing was deleted in the restructure; Method, Science, Areas,
Industrial, the full catalogue and the questions each moved to the page where a
reader has a reason to want them, and the homepage keeps a short preview of each
that reads from the same typed content, so a preview cannot drift out of date
with the page it previews.

---

## The enquiry form

`/contact` posts JSON to `/api/enquiry`, which sends one email over SMTP. There
is no database, no CRM and no queue - the strategy (§14.9) routes leads through
people, so the form's only job is to put a well-formed message in the inbox that
already receives them.

What the route does, and why:

- **Reply-To carries the enquirer, From never does.** Sending as the enquirer
  fails SPF and DMARC at the recipient and quietly lands the whole lead flow in
  spam. From is always our own authenticated sender.
- **Everything is escaped** before it reaches the HTML body, and newlines are
  stripped from the subject. A form read by a salesperson in a mail client is
  still an injection surface.
- **A honeypot field** (`website`) is hidden from people and answered with a
  cheerful 200 when filled, because telling a bot it failed only teaches it to
  try again.
- **A per-instance rate limit**, five per ten minutes. On serverless each
  instance keeps its own copy, so it is a speed bump rather than a real limiter;
  replace `rateLimited()` with a shared store if volume ever justifies it.
- **Misconfiguration returns 503 with a plain instruction**, not a 500. The most
  likely failure on day one is an unset variable, and the reader gets the email
  address instead of a dead form.

With the SMTP variables unset the form still renders and still validates - it
just tells the reader to email instead. That degradation is deliberate.

---

## Deployment

The repository is `digitallynextgit/Leocym`, on the company GitHub org. It was
previously `Karanjoshi128/leocym-site`, on a personal account; that repo is
history and nothing should be pushed to it.

Hosted on Vercel. **Every push to `main` deploys to production; every other
branch gets a preview URL.**

- Production: _to be filled in once the company Vercel project is created._
- The build runs `scripts/check-claims.mjs` first, so a commit that breaks the
  claims contract **fails the deploy** rather than shipping.

### Wiring up the company Vercel project

A Vercel project is bound to one Git repository and carries its own environment
variables — none of the old project's settings come across. So:

1. Create the project from `digitallynextgit/Leocym`. Framework preset Next.js;
   no build-command override, since `pnpm build` already chains the claims
   guard.
2. **Leave `NEXT_PUBLIC_INDEXABLE` unset.** A fresh project starts with no
   environment variables, which happens to be the correct state — see below.
   Do not set it to `true` while wiring things up.
3. Set the SMTP variables (see below) or the enquiry form stays in its
   "not connected yet" state.
4. Record the production URL here once it exists.
5. Delete or disconnect the old personal-account project, so two deployments of
   this site do not sit on the internet drifting apart.

### The site is deliberately not indexable yet

`NEXT_PUBLIC_INDEXABLE` is unset in Vercel, so `robots.txt` serves
`Disallow: /` and every page carries `noindex, nofollow`. The site is reachable
by URL for review but invisible to search engines.

**To go live:** set `NEXT_PUBLIC_INDEXABLE=true` in the Vercel project's
Production environment and redeploy — but only after the copy at `/review` has
been signed off (Marketing Strategy §13.7, one week ahead of go-live).

## Environment

| Variable                | Effect                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_INDEXABLE` | `"true"` allows indexing. Anything else emits `Disallow: /` and `noindex`. **Preview deploys must leave it unset.** |
| `SMTP_HOST`             | Outgoing mail server for the enquiry form.                                                                       |
| `SMTP_PORT`             | 587 (STARTTLS) or 465 (implicit TLS). Defaults to 587.                                                           |
| `SMTP_SECURE`           | Optional. Defaults to true on 465, false otherwise. Set only for an unusual provider.                            |
| `SMTP_USER` / `SMTP_PASS` | The authenticating mailbox.                                                                                    |
| `ENQUIRY_FROM`          | The From address. Must be a domain you are authorised to send as, or SPF/DMARC rejects it.                        |
| `ENQUIRY_TO`            | Where enquiries are delivered. Falls back to `SITE.contact.email`.                                               |

See `.env.example`, which carries the same notes inline.

---

## Contract - do not break these

These come from the brand guidelines and the marketing strategy supplied with
the project. They are contractual and, for claims, legally load-bearing.

1. **Leocym logo only.** This is Leocym's own channel, so it carries the Leocym
   logo and no other brand mark. There is no distributor logo or lockup in
   `public/` and none should be added.
2. **The distributor is named in exactly two files.** Marketing Strategy §6.3.3
   requires a "where to buy" section linking to their site, so the name is
   allowed in `src/content/site.ts` and `src/components/sections/WhereToBuy.tsx`
   and the build **fails** if it appears anywhere else. It is always a text
   link, never a mark.
3. **Buying traffic goes to the distributor's own site, never to a
   marketplace** (§6.3.3). Sending traffic we generated ourselves to a
   marketplace hands over both the customer relationship and a fee on a sale we
   had already won.
4. **No commerce.** No price, no cart, no checkout - and no such field exists in
   the type system (`src/content/products.ts` has no price field on purpose).
   The JSON-LD carries no `offers` or `price` either.
5. **Approved claims only.** `src/content/claims.ts` holds the claims the company
   has approved. There is no laboratory test data, so no new number, percentage
   or kill-rate may be introduced without written approval from Ms. Priya Lalani.
6. **No named competitors.** Odonil, Godrej, Febreze, Ambi Pur, Ecolab,
   Diversey, Buzil and Satol must never appear on the public site.
7. **One CTA per page.** The header button and the closing band. Navigation
   between pages uses text links, which are not calls to action.

`pnpm build` enforces these via `scripts/check-claims.mjs`, which fails the
build on a breach. It is tested - inject a violation and it exits non-zero.

The guard scans `src/content`, `src/components` and `src/app`. `src/app` was
added when the site became multi-page, because page files now carry real copy
(headings, standfirsts, metadata descriptions) that was previously unchecked.
Two files are excluded, for the same reason: `claims.ts` defines the forbidden
list, and `/review` exists to restate the contract for a human to sign off.

`/review` renders every claim and every line of product copy on one page, so it
can be approved a week ahead of go-live without clicking through the whole site.
It is `noindex` and unlinked.

### The certifications register is empty on purpose

`CERTIFICATIONS` in `src/content/compliance.ts` is an empty array, and that is
the correct state rather than an unfinished one. A certification is a factual
assertion about a third party's audit; no certificate documentation was supplied
with this project, and a page decorated with plausible-looking badges would
breach both Brand Guidelines Part 12 and ASCI's rules. The page renders an
honest "supplied on request" state while the array is empty and switches to a
certificate table - name, issuer, reference, scope - the moment a real entry
lands. No other change is needed.

---

## Structure

```
src/
  app/
    globals.css          the brand token layer - read this first
    layout.tsx           fonts, metadata, and the shared shell (skip link,
                         header, main, footer)
    page.tsx             the homepage: hero, difference, three previews, close
    brand-story/  products/  for-business/
    certifications/  where-to-buy/  contact/
    api/enquiry/         the SMTP route handler
    review/              the copy approval sheet (noindex)
    llms.txt/            generated brief for answer engines
  content/               <- single source of truth. Edit content here, not in JSX.
    products.ts          26 products, transcribed from the printed catalogue
    industrial.ts        5 segments, catalogue pp.34-39
    misc.ts              method, areas of use, Q&A
    compliance.ts        certifications, safety, documentation, claims position
    claims.ts            the claims allowlist
    site.ts              config, nav, contact, the distributor link
  components/
    ui.tsx               shared primitives (PageHero, NextUp, Action, TextLink)
    sections/            one file per section
public/
  products/              26 plates, extracted from the catalogue PDF
  stock/                 CC0 photography + CREDITS.json provenance
  brand/                 the Leocym logo, extracted from the catalogue PDF
```

Content lives as typed data, so a page and the homepage preview of that page are
generated from the same source and cannot disagree.

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
  signature in the Origin section on `/brand-story` — which is why the homepage
  origin preview deliberately does not use it.
- **Hierarchy** comes from hairline rules, measure and position - not from a
  uniform rounded-and-shadowed card repeated everywhere.
- **Motion** — staggered scroll entrances, a lift on the product plates, and the
  mask/neutralise state change. All of it runs off one easing and three
  durations from `@theme`, and all of it is switched off wholesale under
  `prefers-reduced-motion`.

### Page shape

Every page below the homepage opens with `PageHero` (running label, ornament,
display headline, standfirst, and an optional spec list on the right) and closes
with `NextUp` (two doors, never more - a wall of related links is a sitemap, not
a recommendation) followed by `Closing`. `/where-to-buy` is the one exception:
it has no `Closing`, because a second call to action underneath the one link
that page exists to serve would compete with itself.

### How the animation works

`components/Reveal.tsx` is an IntersectionObserver that sets a single
`data-shown` attribute; CSS does the rest. No animation library, nothing running
on scroll, and each element reveals once rather than re-firing on every pass.

Two safeguards worth keeping: the hidden state is scoped to `.js` (added by the
observer on mount), so with JavaScript off the content is simply visible; and
`prefers-reduced-motion` zeroes every transition globally, so the element still
appears, it just does not travel.

One practical note: a full-page screenshot taken before scrolling will show
unrevealed sections as blank. Scroll the page first.

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

If you add content to a section, re-measure before assuming it still fits.

One contrast note: the Guidelines list Leocym Indigo Light as `#8989AA`, but it
measures 2.56:1 on the darkest paper ground and fails AA for the secondary text
it is meant for. `--color-ink-soft` is darkened to `#5E608E`, the nearest indigo
that clears 4.5:1 on all three grounds. Use that token for secondary text rather
than an opacity on `--color-ink-deep` — `text-ink-deep/60` on `paper-2` fails
AA, which is exactly how the enquiry form's hint text first shipped.

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

And one grid trap: a `col-span-2` child in a grid with no declared
`grid-template-columns` forces an implicit second column, so the layout looks
right for reasons that have nothing to do with what you wrote. Declare the
columns.

---

## Verified

Checked against the production build on desktop (1440) and mobile (390), across
all seven pages plus the 404:

- axe-core WCAG 2.2 AA: **0 violations** on every page, both viewports
- 0 console errors, 0 failed requests, 0 horizontal overflow
- Keyboard: skip link, radiogroup arrow keys + roving tabindex, dialog focus
  trap + Escape + focus restore, mobile nav focus trap + Escape + focus restore
- JSON-LD valid, no commerce fields on any node
- Enquiry form end-to-end against a local SMTP server: correct From / Reply-To,
  HTML-escaped body, header-injection stripped, honeypot silently accepted,
  validation errors returned per field, rate limit engaging at the sixth request
- Claims guard fails on injected violations (all seven rule classes)
