import Image from "next/image";
import { INDUSTRIAL, type IndustrialSegment } from "@/content/industrial";
import { Petal, Reveal } from "@/components/ui";
import { Icon } from "@/components/Icon";

/**
 * Section 8 - Industrial and large scale.
 *
 * Strategic purpose: a facility manager who sees this technology handling an
 * entire landfill will trust it for their washrooms. It is also the entry point
 * for contractors running municipal and industrial work.
 *
 * STRUCTURE NOTE. An earlier version gave each segment a different number of
 * photographs, on the theory that varied density reads as rhythm. It does not -
 * it reads as inconsistency, and it made the section hard to scan. Every
 * segment now uses the identical layout: icon, number, title, premise and spec
 * chips down the left, one photograph on the right. The eye learns the pattern
 * once and then just reads.
 *
 * DENSITY NOTE. Areas of use are chips; techniques are not. Two rows of
 * near-identical pills read as one undifferentiated mass, and the techniques
 * row was the longer of the two - seven pills on the first segment alone.
 * Techniques are now a single run of text, which is the same information at a
 * fraction of the weight, and it makes the two rows tell apart at a glance.
 * Nothing was deleted from the content file.
 *
 * COLOUR NOTE. This section used to sit on `ink-deep` with orange icons and
 * hairline chips, and it read as murky: a mid-navy ground, body copy at 65%
 * white that came out grey, and outlines so faint the chips barely registered.
 * Four changes, none of them a new colour:
 *
 *   1. Ground moved to `ink-black`, which Range already uses. The site had
 *      THREE near-identical navies doing dark duty (ink, ink-deep, ink-black);
 *      this consolidates to two, so dark grounds now read as a system rather
 *      than as drift.
 *   2. Labels and plate numbers use `field-pale`, a real token, instead of
 *      translucent white. 11.7:1 here, and predictable.
 *   3. Icons come off orange. Orange is being reserved for interaction, and
 *      these are wayfinding. Green was the tempting alternative and is wrong -
 *      the token layer reserves green and red as SEMANTIC ONLY, and a waste
 *      icon is not making a claim about being clean.
 *   4. Chips get a ground. On a dark surface a 1px outline is not an object.
 *
 * The photographs are now the only saturated colour in the section, which is
 * where the eye should be going anyway.
 */
export function Industrial() {
  return (
    <section id="industrial" className="bg-ink-black text-paper">
      <div className="gutter measure-wide section-y">
        <Reveal as="header" className="rule-inv-t block pt-3">
          <div className="flex items-baseline gap-4">
            <span className="plate-no text-field-pale">
              Industrial &amp; large scale
            </span>
            <Petal size={13} strokeWidth={2.4} className="text-paper/60" />
          </div>
          <div className="mt-4 grid gap-8 lg:grid-cols-12">
            <h2 className="display-1 lg:col-span-6">
              The same technology that treats a landfill treats a washroom.
            </h2>
            <p className="prose-lead text-paper/80 lg:col-span-5 lg:col-start-8 lg:pt-1">
              Across Europe, on water treatment plants, landfills, refineries
              and metro tunnelling. The chemistry does not change for smaller
              jobs — only the equipment that delivers it.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 lg:mt-12">
          {INDUSTRIAL.map((seg, i) => (
            <Reveal key={seg.slug} delay={i === 0 ? 0 : 50}>
              <Segment seg={seg} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Segment({ seg }: { seg: IndustrialSegment }) {
  return (
    <article className="rule-inv-t grid grid-cols-1 items-start gap-x-10 gap-y-5 py-7 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:py-8">
      {/* ---- Left: identity and specification, in that order, every time.
             The chips live here rather than in a full-width row underneath,
             which is what stops a tall photograph leaving dead space beside
             the title. ---- */}
      <div className="lg:col-span-7">
        <div className="flex items-center gap-3">
          <span className="text-field-pale shrink-0">
            <Icon name={seg.icon} size={26} />
          </span>
          <span className="plate-no nums text-field-pale">{seg.index}</span>
        </div>
        <h3 className="display-2 mt-3">{seg.title}</h3>
        <p className="prose-body text-paper/75 mt-3 max-w-[42ch]">
          {seg.premise}
        </p>

        <div className="mt-5 space-y-4">
          <ChipRow label="Areas of use" items={seg.areas} />
          <SpecLine label="Techniques" items={seg.techniques} />
        </div>
      </div>

      {/* ---- Right: one photograph. Same aspect, same place, every time.
             Five columns at 3:2, not seven at 4:3 - the photographs were
             running to roughly 800x600 each and five of them stacked made the
             section read as a gallery with captions rather than a spec sheet
             with evidence. ---- */}
      <figure className="lg:col-span-5">
        <div className="rounded-photo plate-depth-inv relative aspect-3/2 overflow-hidden">
          <Image
            src={seg.image}
            alt={`${seg.title} — odour control in operation on site`}
            fill
            sizes="(min-width: 1024px) 38vw, 92vw"
            className="object-cover"
          />
        </div>
      </figure>
    </article>
  );
}

/** Categories. Chips, because they are scanned rather than read. */
function ChipRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h4 className="spec-label text-field-pale">{label}</h4>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {items.map((t) => (
          <li
            key={t}
            className="spec-value text-paper bg-paper/10 border border-paper/20 rounded-sm px-2.5 py-1"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Equipment. One run of text, because it is reference detail, not navigation. */
function SpecLine({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h4 className="spec-label text-field-pale">{label}</h4>
      <p className="spec-value text-paper/75 mt-2 max-w-[54ch]">
        {items.join(" · ")}
      </p>
    </div>
  );
}
