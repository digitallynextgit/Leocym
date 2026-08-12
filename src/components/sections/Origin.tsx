import { SITE } from "@/content/site";
import { SectionLabel, SpecRow, Reveal, Stagger } from "@/components/ui";
import { FranceMap } from "@/components/Icon";

/**
 * Section 8 - Origin.
 *
 * The Lindy argument, in the brand's quietest register: the technology is new
 * to India, not new to the world.
 *
 * This section contains the ONLY use of Italianno on the entire site, as a
 * signature-style sign-off - which is precisely the use the Brand Guidelines
 * sanction (Part 5.3: "a campaign tagline or a signature-style sign-off",
 * "once is usually plenty").
 */
export function Origin() {
  return (
    <section id="origin" className="bg-paper-2 band">
      <div className="gutter measure-wide section-y-lg">
        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7 lg:col-start-2">
            <SectionLabel className="rule-t pt-3">Origin</SectionLabel>

            {/* The map rather than a flag. A flag says "French brand" and stops
                there; the map says WHERE, which is the actual point of this
                section, and it earns the space a flag would waste. */}
            <div className="mt-5 flex items-start gap-6">
              <h2 className="display-1">
                {SITE.origin.city}, {SITE.origin.country}.
              </h2>
              <figure className="hidden shrink-0 sm:block">
                <FranceMap
                  className="text-ink-soft h-28 w-auto"
                  markerClassName="text-flame-deep"
                />
                <figcaption className="spec-label text-ink-soft mt-1.5 text-center">
                  Douai
                </figcaption>
              </figure>
            </div>

            <div className="measure-text mt-6 space-y-4">
              <p className="prose-lead text-ink-deep/85">
                Leocym is a French company headquartered in Douai, in the north
                of France. It was built around a single problem - odour
                pollution - and a single refusal: that covering a smell is not
                the same as removing one.
              </p>
              <p className="prose-body text-ink-deep/75">
                The formulations have been used across Europe on water treatment
                plants, sanitary landfills, refineries and tunnelling projects,
                where masking is simply not an option and the result has to hold
                up at the site boundary. Alongside odour control, Leocym makes a
                range of high-quality, affordable hygiene products for
                commercial, industrial and domestic use.
              </p>
              <p className="prose-body text-ink-deep/75">
                None of this technology is new. It is only new to India.
              </p>
            </div>

            <figure className="mt-10">
              <blockquote>
                {/* The site's one use of the script face, and the one place a
                    wipe is the right gesture: a signature is WRITTEN, so it
                    arrives left to right rather than fading up as a block. */}
                <Reveal variant="mask" duration={1200} delay={120}>
                  <p className="signature text-ink">
                    An odour-free and hygienic world.
                  </p>
                </Reveal>
              </blockquote>
              <figcaption className="spec-label text-ink-soft mt-4">
                The Leocym mission
              </figcaption>
            </figure>
          </Reveal>

          <aside className="lg:col-span-3 lg:col-start-10 lg:pt-16">
            <Reveal variant="right" delay={110}>
              <h3 className="spec-label text-ink-soft rule-b pb-3">
                At a glance
              </h3>
            </Reveal>
            <Stagger as="dl" delay={160} step={70}>
              <SpecRow
                label="Headquarters"
                value={`${SITE.origin.city}, ${SITE.origin.country}`}
              />
              <SpecRow
                label="Field"
                value="Odour neutralisation and eco-hygiene"
              />
              <SpecRow label="In India" value="Available now" />
              <SpecRow label="Enquiries" value={SITE.contact.email} />
            </Stagger>
          </aside>
        </div>
      </div>
    </section>
  );
}
