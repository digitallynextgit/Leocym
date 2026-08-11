import Image from "next/image";
import Link from "next/link";
import { CLEANING_PRODUCTS, ODOUR_PRODUCTS } from "@/content/products";
import { INDUSTRIAL } from "@/content/industrial";
import { AREAS_COUNT } from "@/content/misc";
import { SITE } from "@/content/site";
import { Petal, Reveal, TextLink } from "@/components/ui";
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
  meta?: string;
}) {
  const muted = tone === "ink" ? "text-ink-soft" : "text-paper/65";
  const rule = tone === "ink" ? "rule-t" : "rule-inv-t";
  const body = tone === "ink" ? "text-ink-deep/75" : "text-paper/75";
  return (
    <header className={`${rule} pt-3`}>
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className={`plate-no ${muted}`}>{label}</span>
          <Petal size={13} strokeWidth={2.4} className={muted} />
        </div>
        {meta ? <span className={`spec-label nums ${muted}`}>{meta}</span> : null}
      </div>
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
    <section className="gutter measure-wide section-y">
      <Reveal>
        <PreviewHead
          label="The range"
          meta={`${ODOUR_PRODUCTS.length + CLEANING_PRODUCTS.length} products`}
          title="A product for the smell you actually have."
          standfirst="The old approach sells one fragrance for everything. Leocym is built the other way round — a specific formulation for each specific source."
        />
      </Reveal>

      <Reveal delay={70}>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {lead.map((p) => (
            <li key={p.slug}>
              <Link href="/products" className="group block">
                <div
                  className="rounded-plate plate-depth lift overflow-hidden"
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
                  <p className="spec-value text-ink-soft mt-0.5">
                    {p.strapline}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={110}>
        <div className="rule-t mt-10 flex flex-col gap-5 pt-5 sm:flex-row sm:items-center sm:justify-between">
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
    <section className="bg-ink-black text-paper">
      <div className="gutter measure-wide section-y">
        <Reveal>
          <PreviewHead
            label="Industrial & large scale"
            tone="paper"
            meta={`${AREAS_COUNT} environments`}
            title="The same technology that treats a landfill treats a washroom."
            standfirst="Across Europe, on water treatment plants, landfills, refineries and metro tunnelling. The chemistry does not change for smaller jobs — only the equipment that delivers it."
          />
        </Reveal>

        <div className="mt-10 grid gap-x-14 gap-y-8 lg:grid-cols-12">
          <Reveal delay={70} className="lg:col-span-6">
            <ul className="rule-inv-t">
              {INDUSTRIAL.map((seg) => (
                <li
                  key={seg.slug}
                  className="rule-inv-b flex items-center gap-4 py-4"
                >
                  <span className="text-field-pale shrink-0">
                    <Icon name={seg.icon} size={24} />
                  </span>
                  <span className="plate-no nums text-field-pale w-6 shrink-0">
                    {seg.index}
                  </span>
                  <span className="display-3">{seg.title}</span>
                </li>
              ))}
            </ul>
            <TextLink href="/for-business" tone="paper" className="mt-7">
              Industrial and large-scale use
            </TextLink>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6">
            <figure>
              <div className="rounded-photo plate-depth-inv relative aspect-4/3 overflow-hidden">
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
    <section className="bg-paper-3">
      <div className="gutter measure-wide section-y">
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="rule-t flex items-baseline gap-4 pt-3">
              <span className="plate-no text-ink-soft">Origin</span>
              <Petal size={13} strokeWidth={2.4} className="text-ink-soft" />
            </div>
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
            delay={100}
            className="lg:col-span-4 lg:col-start-9 lg:pt-10"
          >
            <figure className="flex items-start gap-6 lg:block">
              <FranceMap
                className="text-ink-soft h-32 w-auto shrink-0 lg:h-40"
                markerClassName="text-flame"
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
