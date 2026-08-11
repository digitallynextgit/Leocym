import { PROCEDURE } from "@/content/misc";
import { SectionHead, Reveal } from "@/components/ui";
import { Icon } from "@/components/Icon";

/**
 * Section 5 - The method.
 *
 * Catalogue p.3. This is what positions Leocym as a system rather than a
 * bottle, and it is the single most useful page for a facility manager.
 *
 * Rendered as a running spec sequence with hairline rules, not as a row of
 * numbered cards.
 */
export function Method() {
  return (
    <section id="method" className="bg-paper-2">
      <div className="gutter measure-wide section-y">
        <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <SectionHead
                  index="How it works"
                  title="Odour is diagnosed before it is treated."
                  standfirst="A smell is a symptom. Leocym works to a fixed six-step procedure, so the solution is matched to the source and the severity rather than guessed at."
                />
              </Reveal>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {PROCEDURE.map((step, i) => (
              <Reveal
                as="li"
                key={step.n}
                delay={i * 55}
                className={`grid grid-cols-[2.25rem_1fr] gap-x-4 py-2.5 sm:grid-cols-[3rem_1fr] ${
                  i === 0 ? "rule-t" : ""
                } rule-b`}
              >
                {/* The number keeps its own column so the spine stays straight
                    down the list. The icon travels with the title instead, the
                    same way the delivery modes are set in Science. */}
                <span className="plate-no nums text-ink-soft pt-2">{step.n}</span>
                <div>
                  <h3 className="display-3 flex items-center gap-2.5">
                    <span className="text-flame-deep shrink-0">
                      <Icon name={step.icon} size={26} />
                    </span>
                    {step.title}
                  </h3>
                  <p className="prose-body text-ink-deep/70 mt-1.5 max-w-[46ch]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
