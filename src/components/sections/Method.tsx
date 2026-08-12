import { PROCEDURE } from "@/content/misc";
import { SectionHead, Reveal, Stagger } from "@/components/ui";
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
    <section id="method" className="bg-paper-2 band">
      <div className="gutter measure-wide section-y-lg">
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

          {/* A procedure is a SEQUENCE, so the entrance is a sequence: the six
              steps arrive in the order they are carried out, one observer for
              the whole list rather than six. */}
          <Stagger as="ol" variant="left" step={80} className="lg:col-span-7">
            {PROCEDURE.map((step, i) => (
              <li
                key={step.n}
                className={`group grid grid-cols-[2.25rem_1fr] gap-x-4 py-2.5 sm:grid-cols-[3rem_1fr] ${
                  i === 0 ? "rule-t" : ""
                } rule-b`}
              >
                {/* The number keeps its own column so the spine stays straight
                    down the list. The icon travels with the title instead, the
                    same way the delivery modes are set in Science. */}
                <span className="plate-no nums text-ink-soft group-hover:text-flame-deep pt-2 transition-colors duration-(--dur-quick)">
                  {step.n}
                </span>
                <div>
                  <h3 className="display-3 flex items-center gap-2.5">
                    <span className="text-flame-deep shrink-0 transition-transform duration-(--dur-base) ease-brand group-hover:scale-110">
                      <Icon name={step.icon} size={26} />
                    </span>
                    {step.title}
                  </h3>
                  <p className="prose-body text-ink-deep/70 mt-1.5 max-w-[46ch]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
