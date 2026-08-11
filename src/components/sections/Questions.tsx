import { FAQ } from "@/content/misc";
import { Petal, Reveal } from "@/components/ui";

/**
 * Section 10 - Questions.
 *
 * The AEO / GEO engine (Marketing Strategy §1.9). Written the way people
 * actually search - the problem, in plain words - and paired with FAQPage
 * structured data in page.tsx so answer engines can quote it directly.
 *
 * Because Leocym owns an uncontested category in India, being the default
 * answer here is available now and will not be later.
 *
 * Native <details> so the content is in the DOM, crawlable and quotable even
 * when collapsed. A JS accordion would hide it from exactly the machines this
 * section exists to reach.
 */
export function Questions() {
  return (
    <section id="questions" className="bg-paper-2">
      <div className="gutter measure-wide section-y">
        <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12">
          <Reveal as="header" className="block lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="rule-t flex items-baseline gap-4 pt-3">
                <span className="plate-no text-ink-soft">Questions</span>
                <Petal size={13} strokeWidth={2.4} className="text-ink-soft" />
              </div>
              <h2 className="display-1 mt-6 max-w-[12ch]">Straight answers.</h2>
              <p className="prose-lead text-ink-soft measure-editorial mt-5">
                The questions people actually ask before they buy anything for a
                smell.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-8">
            {FAQ.map((item, i) => (
              <details
                key={item.q}
                name="leocym-faq"
                open={i === 0}
                className={`group ${i === 0 ? "rule-t" : ""} rule-b`}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-3.5 [&::-webkit-details-marker]:hidden">
                  <h3 className="display-3 group-hover:text-flame transition-colors duration-(--dur-quick)">
                    {item.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="text-ink-soft group-open:text-flame mt-1.5 shrink-0 transition-transform duration-(--dur-base) group-open:rotate-45"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <line
                        x1="8"
                        y1="1"
                        x2="8"
                        y2="15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="1"
                        y1="8"
                        x2="15"
                        y2="8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="prose-body text-ink-deep/75 measure-text pb-5">
                  {item.a}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
