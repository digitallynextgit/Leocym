import Image from "next/image";
import Link from "next/link";
import { CLEANING_PRODUCTS, ODOUR_PRODUCTS } from "@/content/products";
import { INDUSTRIAL } from "@/content/industrial";
import { AREAS_COUNT } from "@/content/misc";
import { SITE } from "@/content/site";
import {
  Counter,
  Reveal,
  SectionLabel,
  Stagger,
  TextLink,
} from "@/components/ui";
import { FranceMap, Icon } from "@/components/Icon";

/* ============================================================================
   HOMEPAGE PREVIEWS

   The homepage used to carry the entire site: 26 product plates with filters
   and a dialog, five industrial segments with photography, twenty-seven areas
   of use, a six-step method, four science blocks and ten questions. Every one
   of those is worth reading; none of them is worth reading on the way past.

   Each preview below is the SHORTEST honest version of a page - enough to
   decide whether to open it, and not one row more. They all read from the same
   typed content as the full pages, so a preview can never quietly drift out of
   date with what it is previewing.
   ========================================================================== */

/** Section opener shared by the previews, so the three read as one rhythm. */
function PreviewHead({
  label,
  title,
  standfirst,
  tone = "ink",
  meta,
}: {
  label: string;
  title: React.ReactNode;
  standfirst: React.ReactNode;
  tone?: "ink" | "paper";
  meta?: React.ReactNode;
}) {
  const rule = tone === "ink" ? "rule-t" : "rule-inv-t";
  const body = tone === "ink" ? "text-ink-deep/75" : "text-paper/75";
  return (
    <header className={`${rule} pt-3`}>
      <SectionLabel tone={tone} meta={meta}>
        {label}
      </SectionLabel>
      <div className="mt-5 grid gap-x-14 gap-y-5 lg:grid-cols-12">
        <h2 className="display-1 lg:col-span-6">{title}</h2>
        <p className={`prose-lead ${body} lg:col-span-5 lg:col-start-8 lg:pt-1`}>
          {standfirst}
        </p>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------- THE RANGE  */

/**
 * Six plates, not twenty-six. Three from each family, in catalogue order, so
 * the reader sees the two halves of the business and the fact that products are
 * named after problems rather than after fragrances.
 */
export function RangePreview() {
  const lead = [...ODOUR_PRODUCTS.slice(0, 3), ...CLEANING_PRODUCTS.slice(0, 3)];

  return (
    <section className="gutter measure-wide section-y-lg">
      <Reveal>
        <PreviewHead
          label="The range"
          meta={
            <>
              <Counter to={ODOUR_PRODUCTS.length + CLEANING_PRODUCTS.length} />{" "}
              products
            </>
          }
          title="A product for the smell you actually have."
          standfirst="The old approach sells one fragrance for everything. Leocym is built the other way round — a specific formulation for each specific source."
        />
      </Reveal>

      {/* The plates deal themselves out left to right. One observer for the
          whole row: the parent is watched, the six children run their own
          keyframe on an indexed delay. */}
      {/* Six across at gap-5 put ~20px between plates whose captions run to
          three lines, which is what made this row read as a wall. Three across
          on a laptop and six only on a wide desktop, with the gaps roughly
          doubled and the caption given its own space below the rule. */}
      <Stagger
        as="ul"
        delay={70}
        step={70}
        variant="scale"
        className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-x-10 xl:grid-cols-6"
      >
        {lead.map((p) => (
          <li key={p.slug}>
            <Link href="/products" className="group block">
              <div
                className="rounded-plate plate-depth lift sheen overflow-hidden"
                style={{ backgroundColor: p.accent }}
              >
                <Image
                  src={p.image}
                  alt=""
                  width={900}
                  height={928}
                  sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 46vw"
                  className="h-auto w-full scale-110 transition-transform duration-(--dur-slow) ease-brand group-hover:scale-[1.03]"
                />
              </div>
              <div className="rule-t mt-3 pt-2">
                <h3 className="spec-value group-hover:text-flame-deep font-semibold transition-colors duration-(--dur-quick)">
                  {p.name}
                </h3>
                <p className="spec-value text-ink-soft mt-0.5">{p.strapline}</p>
              </div>
            </Link>
          </li>
        ))}
      </Stagger>

      <Reveal delay={110}>
        <div className="rule-t mt-14 flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="prose-body text-ink-deep/70 max-w-[52ch]">
            <strong className="font-semibold">
              {ODOUR_PRODUCTS.length} odour neutralisers
            </strong>{" "}
            for drains, urine, garbage, smoke, carpets, meat, fish and paint,
            and{" "}
            <strong className="font-semibold">
              {CLEANING_PRODUCTS.length} cleaning and hygiene products
            </strong>{" "}
            alongside them.
          </p>
          <TextLink href="/products" className="shrink-0">
            The full catalogue
          </TextLink>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------- THE SCALE  */

/**
 * The credibility argument, compressed to one photograph and five nouns.
 * The full segment-by-segment breakdown - areas of use, techniques, equipment -
 * lives on the business page, where a facility manager has a reason to read it.
 */
export function ScalePreview() {
  return (
    /* `ink`, not `ink-black`. The site had three near-identical navies doing
       dark duty and used the darkest of them for an ordinary mid-page band,
       which meant the reader fell off a cream cliff into near-black halfway
       down the homepage. `ink-black` is now reserved for the footer, where the
       page is actually meant to end. */
    <section className="bg-ink text-paper band">
      <div className="gutter measure-wide section-y-lg">
        <Reveal>
          <PreviewHead
            label="Industrial & large scale"
            tone="paper"
            meta={
              <>
                <Counter to={AREAS_COUNT} /> environments
              </>
            }
            title="The same technology that treats a landfill treats a washroom."
            standfirst="Across Europe, on water treatment plants, landfills, refineries and metro tunnelling. The chemistry does not change for smaller jobs — only the equipment that delivers it."
          />
        </Reveal>

        <div className="mt-14 grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            {/* The five segments arrive one after another, which is the point:
                the argument is the ACCUMULATION, not any single line of it. */}
            <Stagger as="ul" delay={70} step={80} className="rule-inv-t">
              {INDUSTRIAL.map((seg) => (
                <li
                  key={seg.slug}
                  className="rule-inv-b group hover:bg-paper/5 flex items-center gap-4 py-4 transition-colors duration-(--dur-base)"
                >
                  <span className="text-field-pale shrink-0 transition-transform duration-(--dur-base) ease-brand group-hover:scale-110">
                    <Icon name={seg.icon} size={24} />
                  </span>
                  <span className="plate-no nums text-field-pale w-6 shrink-0">
                    {seg.index}
                  </span>
                  <span className="display-3">{seg.title}</span>
                </li>
              ))}
            </Stagger>
            <Reveal delay={140}>
              <TextLink href="/for-business" tone="paper" className="mt-7">
                Industrial and large-scale use
              </TextLink>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={120} className="lg:col-span-6">
            <figure>
              {/* `parallax` drives the photograph off the scroll position
                  itself where the browser supports scroll timelines, so the
                  frame and its contents move at different rates as the section
                  passes. No listener, no JavaScript, and no change at all in a
                  browser that does not support it. */}
              <div className="rounded-photo plate-depth-inv parallax relative aspect-4/3">
                <Image
                  src={INDUSTRIAL[0].image}
                  alt="A waste water treatment plant — odour control in operation on site"
                  fill
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="spec-label text-field-pale mt-3">
                {INDUSTRIAL[0].title} — {INDUSTRIAL[0].areas[0].toLowerCase()}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- THE ORIGIN  */

/**
 * Three sentences and a map. The full story, the mission line and the
 * technology explanation are on the brand story page.
 *
 * Note the absence of the Italianno signature here: it appears exactly ONCE on
 * the entire site, in the Origin section of the brand story (Brand Guidelines
 * Part 5.3). Repeating it on the homepage would spend the one time it works.
 */
export function OriginPreview() {
  return (
    <section className="bg-paper-2 band">
      <div className="gutter measure-wide section-y-lg">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionLabel className="rule-t pt-3">Origin</SectionLabel>
            <h2 className="display-1 mt-5">
              {SITE.origin.city}, {SITE.origin.country}.
            </h2>
            <p className="prose-lead text-ink-deep/85 measure-text mt-6">
              Leocym is a French company headquartered in the north of France,
              built around a single problem — odour pollution — and a single
              refusal: that covering a smell is not the same as removing one.
            </p>
            <p className="prose-body text-ink-deep/75 measure-text mt-4">
              None of this technology is new. It is only new to India.
            </p>
            <TextLink href="/brand-story" className="mt-7">
              The brand story
            </TextLink>
          </Reveal>

          <Reveal
            variant="right"
            delay={100}
            className="lg:col-span-4 lg:col-start-9 lg:pt-10"
          >
            <figure className="flex items-start gap-6 lg:block">
              <FranceMap
                className="text-ink-soft h-32 w-auto shrink-0 lg:h-40"
                markerClassName="text-flame-deep"
              />
              <figcaption className="spec-label text-ink-soft mt-3 max-w-[18ch] lg:mt-4">
                Douai, in the north of France
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
