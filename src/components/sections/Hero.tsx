import Image from "next/image";
import { PRODUCTS } from "@/content/products";
import { SITE } from "@/content/site";
import { Action, Dots, PlateNo, TextLink } from "@/components/ui";

/**
 * The homepage opening.
 *
 * Asymmetric editorial split, not a centred hero with a pill badge. The
 * headline commits fully to the display serif rather than garnishing a sans
 * headline with one italic word, which is a recognisable generated-UI tell.
 *
 * The image is the real Drain Odrkill catalogue plate, on its own sampled
 * colour field. No stock photography anywhere on this site.
 *
 * DECLUTTER NOTE. This used to carry two competing buttons and a four-column
 * spec strip - eight pieces of furniture under the headline, before the reader
 * had been given a reason to want any of them. It is now one action, one quiet
 * link, and three facts. The fourth fact (delivery formats) moved to the brand
 * story, where there is room to explain it rather than assert it.
 */
export function Hero() {
  const flagship = PRODUCTS[0];

  // "Real freshness, not fragrance" -> two display lines.
  // Falls back to the whole string if the comma is ever removed, so the
  // headline degrades to one line rather than rendering "undefined".
  const [lineOne, lineTwo = ""] = SITE.tagline.split(/,\s*/);

  return (
    <section
      /* Sized to sit inside one viewport on a laptop, including the spec strip.
         Below lg it flows naturally — forcing a fixed height on a phone would
         crush the copy. */
      className="relative flex flex-col overflow-hidden lg:min-h-[calc(100svh-var(--header-h))]"
    >
      <div className="gutter measure-wide flex flex-1 items-center">
        <div className="grid w-full grid-cols-1 items-center gap-x-12 gap-y-10 pt-12 pb-12 lg:grid-cols-12 lg:py-8">
          {/* ---- The argument ---- */}
          <div className="lg:col-span-7 xl:col-span-6">
            <p className="spec-label text-flame-deep flex flex-wrap items-center gap-x-3 gap-y-2">
              <span>
                {SITE.origin.city}, {SITE.origin.country}
              </span>
              <span aria-hidden="true" className="bg-ink-faint h-px w-10" />
              <span>French formulas, first time in India</span>
            </p>

            {/* Derived from SITE.tagline, never retyped. This headline used to
                be a hardcoded literal, which let it drift out of sync with the
                footer and the document title. Split on the comma so the line
                break lands in the right place. */}
            <h1 className="display-hero text-ink mt-6">
              {lineOne},
              <br />
              {lineTwo}.
            </h1>

            <p className="prose-lead measure-editorial text-ink-deep/80 mt-7">
              Most products lay a fragrance over a bad smell. The source is
              still there, so the smell comes back. Leocym works on the odour
              itself — at the source, where it actually starts.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Action href="/products">See the range</Action>
              <TextLink href="/brand-story">Why it works</TextLink>
            </div>
          </div>

          {/* ---- The evidence ---- */}
          <div className="relative lg:col-span-5 lg:col-start-8 xl:col-span-6 xl:col-start-7">
            <Dots
              aria-hidden="true"
              className="text-ink-faint absolute -top-6 left-0 hidden lg:block"
            />
            {/* Capped rather than fluid: at full column width this plate ran
                ~620px tall and was what pushed the hero past one screen. */}
            <figure className="relative ml-auto max-w-[24rem] lg:max-w-104">
              <div
                className="rounded-[20%] overflow-hidden"
                style={{ backgroundColor: flagship.accent }}
              >
                <Image
                  src={flagship.image}
                  alt={`${flagship.name} - ${flagship.strapline}`}
                  width={900}
                  height={928}
                  priority
                  sizes="(min-width: 1024px) 26rem, 92vw"
                  className="h-auto w-full scale-110"
                />
              </div>
              <figcaption className="rule-t mt-2.5 flex items-baseline justify-between gap-4 pt-2">
                <PlateNo n={flagship.plate} className="text-ink-soft" />
                <span className="spec-value text-ink-soft text-right">
                  {flagship.name} - {flagship.strapline.toLowerCase()}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* ---- Spec strip. Three facts, every one of them checkable. ---- */}
      <div className="rule-t rule-b mt-10 lg:mt-0">
        <dl className="gutter measure-wide grid grid-cols-1 sm:grid-cols-3">
          {[
            { k: "Category", v: "Odour neutralisers & eco-hygiene" },
            { k: "Range", v: `${PRODUCTS.length} products` },
            { k: "Origin", v: `${SITE.origin.city}, ${SITE.origin.country}` },
          ].map((row, i) => (
            <div
              key={row.k}
              className={`py-4 ${
                i > 0 ? "rule-t sm:border-t-0 sm:rule-l sm:pl-6" : ""
              }`}
            >
              <dt className="spec-label text-ink-soft">{row.k}</dt>
              <dd className="spec-value mt-2">{row.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
