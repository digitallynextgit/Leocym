import { DELIVERY, INTENSITY_SCALE, SCIENCE_NOTE } from "@/content/misc";
import { MECHANISM } from "@/content/claims";
import { Reveal, SectionLabel, Stagger, TextLink } from "@/components/ui";
import { Icon } from "@/components/Icon";

/**
 * The science, on the brand story page.
 *
 * Three ideas, in order: what the chemistry actually does, how it is delivered
 * to the source, and how odour is measured in the field.
 *
 * The measurement scale is quoted from a published CPCB / VTT study (see
 * content/misc.ts for the citation) purely as industry context. It is NOT a
 * claim about Leocym, and it is worded so it cannot be read as one - the whole
 * point is that odour is measurable, so the honest test of any treatment is
 * whether the reading falls.
 *
 * A fourth block used to sit here covering composition, handling and safety.
 * It now has a page of its own at /certifications, where a facility or
 * food-safety officer can be sent directly and where it can carry the
 * documentation list it always needed. This section links to it rather than
 * repeating a shortened version.
 */
export function Science() {
  return (
    <section id="science" className="bg-paper-2 band">
      <div className="gutter measure-wide section-y-lg">
        <Reveal>
          <header className="rule-t pt-3">
            <SectionLabel>The science</SectionLabel>
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
              <Stagger
                as="ul"
                step={80}
                className="mt-6 grid gap-x-8 gap-y-0 sm:grid-cols-2"
              >
                {DELIVERY.map((d) => (
                  <li key={d.mode} className="group rule-t py-4">
                    <h3 className="display-3 flex items-center gap-2.5">
                      <span className="text-flame-deep shrink-0 transition-transform duration-(--dur-base) ease-brand group-hover:scale-110">
                        <Icon name={d.icon} size={26} />
                      </span>
                      {d.mode}
                    </h3>
                    <p className="prose-body text-ink-deep/70 mt-1.5">{d.how}</p>
                    <p className="spec-label text-ink-soft mt-2.5">{d.where}</p>
                  </li>
                ))}
              </Stagger>
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

              {/* The scale is read left to right, so it arrives left to right —
                  which is also the direction severity increases in. */}
              <Stagger
                as="ol"
                step={70}
                variant="left"
                className="mt-6 grid grid-cols-1 gap-px sm:grid-cols-5"
              >
                {INTENSITY_SCALE.map((s, i) => (
                  <li
                    key={s.n}
                    className="rule-all bg-paper hover:bg-paper-1 rounded-sm p-4 transition-[background-color,transform] duration-(--dur-base) ease-brand hover:-translate-y-1"
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
              </Stagger>

              <p className="prose-body text-ink-deep/70 measure-text mt-6">
                {SCIENCE_NOTE}
              </p>

              <p className="rule-t mt-8 pt-5">
                <TextLink href="/certifications">
                  Composition, safety and the documentation we can send
                </TextLink>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
