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
            <p
              className="spec-label enter text-flame-deep flex flex-wrap items-center gap-x-3 gap-y-2"
              style={{ "--d": "60ms" } as React.CSSProperties}
            >
              <span>
                {SITE.origin.city}, {SITE.origin.country}
              </span>
              {/* Draws itself between the two facts rather than simply being
                  there, which is what turns a rule into a connective. */}
              <span
                aria-hidden="true"
                data-shown
                className="draw-x bg-ink-faint h-px w-10"
                style={{ "--rv-delay": "260ms" } as React.CSSProperties}
              />
              <span>French formulas, first time in India</span>
            </p>

            {/* Derived from SITE.tagline, never retyped. This headline used to
                be a hardcoded literal, which let it drift out of sync with the
                footer and the document title. Split on the comma so the line
                break lands in the right place.

                Each line is its own block and wipes in separately: the promise
                arrives one clause at a time, the way it is meant to be read.
                A wipe rather than a fade because these are the largest words on
                the site, and large type fading in reads as a slideshow. */}
            <h1 className="display-hero text-ink mt-6">
              <span
                className="enter-wipe block"
                style={{ "--d": "150ms" } as React.CSSProperties}
              >
                {lineOne},
              </span>
              <span
                className="enter-wipe block"
                style={{ "--d": "290ms" } as React.CSSProperties}
              >
                {lineTwo}.
              </span>
            </h1>

            <p
              className="prose-lead enter measure-editorial text-ink-deep/80 mt-7"
              style={{ "--d": "470ms" } as React.CSSProperties}
            >
              Most products lay a fragrance over a bad smell. The source is
              still there, so the smell comes back. Leocym works on the odour
              itself — at the source, where it actually starts.
            </p>

            <div
              className="enter mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ "--d": "600ms" } as React.CSSProperties}
            >
              <Action href="/products">See the range</Action>
              <TextLink href="/brand-story">Why it works</TextLink>
            </div>
          </div>

          {/* ---- The evidence ---- */}
          <div className="relative lg:col-span-5 lg:col-start-8 xl:col-span-6 xl:col-start-7">
            <Dots
              aria-hidden="true"
              className="text-ink-faint drift-slow absolute -top-6 left-0 hidden lg:block"
            />
            {/* Capped rather than fluid: at full column width this plate ran
                ~620px tall and was what pushed the hero past one screen. */}
            <figure
              className="enter-plate relative ml-auto max-w-[24rem] lg:max-w-104"
              /* Short delay, because on most screens this is the LCP element
                 and every millisecond before it is painted is charged to the
                 page's loading score. */
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              {/* A warm halo, sitting behind the plate and breathing very
                  slowly. It is the only light source on the page and it exists
                  to lift the plate off the paper — the same job the shadow does
                  on the product grids, done the other way round because this
                  plate has no shadow. */}
              <div
                aria-hidden="true"
                className="bg-flame/45 breathe-slow pointer-events-none absolute inset-[12%] -z-10 rounded-full blur-3xl"
              />
              <div className="float-slow">
                <div
                  className="overflow-hidden rounded-[20%]"
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
        <dl
          data-stagger
          data-shown
          className="gutter measure-wide grid grid-cols-1 sm:grid-cols-3"
          style={
            {
              "--rv-delay": "720ms",
              "--stagger-step": "80ms",
            } as React.CSSProperties
          }
        >
          {[
            { k: "Category", v: "Odour neutralisers & eco-hygiene" },
            { k: "Range", v: `${PRODUCTS.length} products` },
            { k: "Origin", v: `${SITE.origin.city}, ${SITE.origin.country}` },
          ].map((row, i) => (
            <div
              key={row.k}
              className={`py-4 ${
                i > 0 ? "rule-t sm:rule-l sm:border-t-0 sm:pl-6" : ""
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
