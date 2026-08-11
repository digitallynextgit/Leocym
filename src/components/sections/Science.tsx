import { DELIVERY, INTENSITY_SCALE, SCIENCE_NOTE } from "@/content/misc";
import { MECHANISM } from "@/content/claims";
import { CLEANING_PRODUCTS } from "@/content/products";
import { SITE } from "@/content/site";
import { Petal, Reveal } from "@/components/ui";
import { Icon } from "@/components/Icon";

/** Derived from the product data, never asserted by hand. */
const originShare = (() => {
  const v = CLEANING_PRODUCTS.map(
    (p) => p.specs?.find((s) => s.label === "Composition")?.value ?? "",
  )
    .map((s) => parseInt(s, 10))
    .filter((n) => !Number.isNaN(n));
  const min = Math.min(...v);
  const max = Math.max(...v);
  return min === max ? `${min}%` : `${min}-${max}%`;
})();

const fragranceFree = CLEANING_PRODUCTS.filter((p) =>
  p.specs?.some((s) => s.value.toLowerCase().includes("fragrance-free")),
).length;

const HANDLING = [
  {
    label: "Read the label",
    body: "Every pack carries its own directions, precautions and storage conditions. Follow the pack, not a general rule.",
  },
  {
    label: "Not on food",
    body: "Meat Odrkill and Fish Odrkill treat surfaces, equipment and surroundings. They are not to be sprayed on food products.",
  },
  {
    label: "Not on people or animals",
    body: "Where a product is applied by spraying into the air, it is used outside of human or animal presence.",
  },
  {
    label: "Fragrance sensitivity",
    body: "Some products contain fragrance and can cause cutaneous allergy. Particular attention is recommended for anyone sensitive to fragrance.",
  },
  {
    label: "Keep away from children",
    body: "Store out of reach of children, in sealed packaging, away from direct sunlight.",
  },
  {
    label: "Disposal",
    body: "Dispose of product in accordance with local, regional, national and international regulations.",
  },
];

/**
 * Section - The science.
 *
 * Three ideas, in order: what the chemistry actually does, how it is delivered
 * to the source, and how odour is measured in the field.
 *
 * The measurement scale is quoted from a published CPCB / VTT study (see
 * content/misc.ts for the citation) purely as industry context. It is NOT a
 * claim about Leocym, and it is worded so it cannot be read as one - the whole
 * point is that odour is measurable, so the honest test of any treatment is
 * whether the reading falls.
 */
export function Science() {
  return (
    <section id="science" className="bg-paper-2">
      <div className="gutter measure-wide section-y">
        <Reveal>
          <header className="rule-t pt-3">
            <div className="flex items-baseline gap-4">
              <span className="plate-no text-ink-soft">The science</span>
              <Petal size={13} strokeWidth={2.4} className="text-ink-soft" />
            </div>
            <div className="mt-4 grid gap-6 lg:grid-cols-12">
              <h2 className="display-1 lg:col-span-6">
                A smell is a compound, not an atmosphere.
              </h2>
              <p className="prose-lead text-ink-soft lg:col-span-5 lg:col-start-8 lg:pt-1">
                Which is why it can be acted on directly — and why the treatment
                has to reach the thing producing it.
              </p>
            </div>
          </header>
        </Reveal>

        {/* ---- 01 The mechanism ---- */}
        <Reveal delay={80}>
          <div className="mt-10 grid gap-x-14 gap-y-6 lg:grid-cols-12">
            <p className="plate-no text-flame-deep lg:col-span-2 lg:pt-2">01 / Mechanism</p>
            <div className="lg:col-span-10">
              <p className="display-3 measure-text">{MECHANISM.long}</p>
              <p className="prose-body text-ink-deep/70 measure-text mt-4">
                {MECHANISM.polymerGel}
              </p>
            </div>
          </div>
        </Reveal>

        {/* ---- 02 Delivery ---- */}
        <Reveal delay={120}>
          <div className="rule-t mt-12 grid gap-x-14 gap-y-6 pt-8 lg:grid-cols-12">
            <p className="plate-no text-flame-deep lg:col-span-2 lg:pt-2">02 / Delivery</p>
            <div className="lg:col-span-10">
              <p className="prose-lead text-ink-deep/80 measure-text">
                Chemistry only works where it lands. Each format exists because
                a different kind of source needs reaching a different way.
              </p>
              <ul className="mt-6 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                {DELIVERY.map((d) => (
                  <li key={d.mode} className="rule-t py-4">
                    <h3 className="display-3 flex items-center gap-2.5">
                      <span className="text-flame-deep shrink-0">
                        <Icon name={d.icon} size={26} />
                      </span>
                      {d.mode}
                    </h3>
                    <p className="prose-body text-ink-deep/70 mt-1.5">{d.how}</p>
                    <p className="spec-label text-ink-soft mt-2.5">{d.where}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ---- 03 Measurement ---- */}
        <Reveal delay={160}>
          <div className="rule-t mt-12 grid gap-x-14 gap-y-6 pt-8 lg:grid-cols-12">
            <p className="plate-no text-flame-deep lg:col-span-2 lg:pt-2">
              03 / Measurement
            </p>
            <div className="lg:col-span-10">
              <p className="prose-lead text-ink-deep/80 measure-text">
                Odour is not judged by opinion. In field assessment it is scored
                on a five-point intensity scale, by trained assessors, on site.
              </p>

              <ol className="mt-6 grid grid-cols-1 gap-px sm:grid-cols-5">
                {INTENSITY_SCALE.map((s, i) => (
                  <li
                    key={s.n}
                    className="rule-all bg-paper rounded-sm p-4"
                    style={{
                      // the scale reads as a gradient of severity, left to right
                      borderColor:
                        i === 0
                          ? undefined
                          : `color-mix(in srgb, var(--color-odour) ${i * 22}%, transparent)`,
                    }}
                  >
                    <span className="display-2 nums text-ink block leading-none">
                      {s.n}
                    </span>
                    <span className="spec-value text-ink-deep/75 mt-2 block">
                      {s.label}
                    </span>
                  </li>
                ))}
              </ol>

              <p className="prose-body text-ink-deep/70 measure-text mt-6">
                {SCIENCE_NOTE}
              </p>
            </div>
          </div>
        </Reveal>

        {/* ---- 04 Composition and safety ---- */}
        <Reveal delay={200}>
          <div className="rule-t mt-12 grid gap-x-14 gap-y-6 pt-8 lg:grid-cols-12">
            <p className="plate-no text-flame-deep lg:col-span-2 lg:pt-2">
              04 / Composition
            </p>
            <div className="lg:col-span-10">
              <p className="prose-lead text-ink-deep/80 measure-text">
                {originShare} of the ingredients across the cleaning range are of
                plant and mineral origin, stated on each product.{" "}
                {fragranceFree} of them are formulated without fragrance at all,
                for food-industry and sensitive environments.
              </p>
              <dl className="mt-6 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {HANDLING.map((h) => (
                  <div key={h.label} className="rule-t py-3.5">
                    <dt className="display-3">{h.label}</dt>
                    <dd className="prose-body text-ink-deep/70 mt-1">{h.body}</dd>
                  </div>
                ))}
              </dl>
              <p className="spec-value text-ink-soft rule-t mt-6 pt-4">
                Safety data sheets, composition details and certification
                documentation for any product are available on request from{" "}
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="text-flame-deep hover:text-flame underline decoration-1 underline-offset-4 transition-colors duration-(--dur-quick)"
                >
                  {SITE.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
