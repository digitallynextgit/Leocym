import Image from "next/image";
import { PRODUCTS } from "@/content/products";
import { SITE } from "@/content/site";
import { Action, Dots, PlateNo } from "@/components/ui";

/**
 * Section 2 - Hero.
 *
 * Asymmetric editorial split, not a centred hero with a pill badge. The
 * headline commits fully to the display serif rather than garnishing a sans
 * headline with one italic word, which is a recognisable generated-UI tell.
 *
 * The image is the real Drain Odrkill catalogue plate, on its own sampled
 * colour field. No stock photography anywhere on this site.
 */
export function Hero() {
  const flagship = PRODUCTS[0];

  // "Real freshness, not fragrance" -> two display lines.
  // Falls back to the whole string if the comma is ever removed, so the
  // headline degrades to one line rather than rendering "undefined".
  const [lineOne, lineTwo = ""] = SITE.tagline.split(/,\s*/);

  return (
    <section
      id="top"
      /* The hero is sized to sit inside one viewport on a laptop, including its
         spec strip. Below lg it flows naturally — forcing a fixed height on a
         phone would crush the copy. */
      className="relative flex flex-col overflow-hidden lg:min-h-[calc(100svh-var(--header-h))]"
    >
      <div className="gutter measure-wide flex flex-1 items-center">
        <div className="grid w-full grid-cols-1 items-center gap-x-10 gap-y-8 pt-10 pb-10 lg:grid-cols-12 lg:py-6">
          {/* ---- The argument ---- */}
          <div className="lg:col-span-7 xl:col-span-6">
            <p className="spec-label text-flame-deep flex items-center gap-3">
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
            <h1 className="display-hero text-ink mt-5">
              {lineOne},
              <br />
              {lineTwo}.
            </h1>

            <p className="prose-lead measure-editorial text-ink-deep/80 mt-6">
              Most products lay a fragrance over a bad smell. The source is
              still there, so the smell comes back. Leocym works on the odour
              itself - at the source, where it actually starts.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Action href="#difference">See the difference</Action>
              <Action href="#range" variant="quiet">
                The range
              </Action>
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

      {/* ---- Spec strip. Every figure here is true and checkable. ---- */}
      <div className="rule-t rule-b mt-10 lg:mt-0">
        <dl className="gutter measure-wide grid grid-cols-2 md:grid-cols-4">
          {[
            { k: "Category", v: "Odour neutralisers & eco-hygiene" },
            { k: "Range", v: `${PRODUCTS.length} products` },
            { k: "Origin", v: `${SITE.origin.city}, ${SITE.origin.country}` },
            { k: "Delivered by", v: "Pour · spray · evaporation · airflow" },
          ].map((row, i) => (
            <div
              key={row.k}
              className={`py-4 ${i > 0 ? "md:rule-l md:pl-6" : ""} ${
                i === 2 ? "rule-t md:border-t-0" : ""
              } ${i === 3 ? "rule-t md:border-t-0" : ""} ${
                i % 2 === 1 ? "rule-l pl-5 md:pl-6" : ""
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
