import { SITE } from "@/content/site";
import { Petal, Reveal } from "@/components/ui";

/**
 * Section 11 - Where to find Leocym.
 *
 * The ONE conversion point on the whole site, and the only CTA outside the
 * header. Everything above it is information; this is where a reader who is
 * convinced goes next.
 *
 * The distributor is deliberately not named anywhere - see the client
 * directive in content/site.ts. So this section does not promise a shop it
 * cannot link to. It offers the one thing that is actually true and actionable:
 * describe the problem, and a person will answer.
 */
export function Contact() {
  return (
    <section id="where-to-buy" className="bg-ink text-paper">
      <div className="gutter measure-wide section-y">
        <Reveal>
          <header className="rule-inv-t pt-3">
            <div className="flex items-baseline gap-4">
              <span className="plate-no text-paper/65">Where to find Leocym</span>
              <Petal size={13} strokeWidth={2.4} className="text-paper/60" />
            </div>
            <div className="mt-4 grid gap-6 lg:grid-cols-12">
              <h2 className="display-1 lg:col-span-6">
                Tell us what the smell is. We will tell you what treats it.
              </h2>
              <p className="prose-lead text-paper/70 lg:col-span-5 lg:col-start-8 lg:pt-1">
                This site is information only. There is no cart here, and no
                sales pitch waiting at the other end - just the person who knows
                which formulation matches your problem.
              </p>
            </div>
          </header>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ul className="rule-inv-t">
                {[
                  {
                    k: "Where the smell is",
                    v: "A drain, a washroom, a kitchen, a car, a whole site.",
                  },
                  {
                    k: "How long it has been there",
                    v: "Recurring odour and one-off odour are treated differently.",
                  },
                  {
                    k: "What has been tried",
                    v: "Usually a fragrance. Knowing what failed narrows it quickly.",
                  },
                ].map((row) => (
                  <li
                    key={row.k}
                    className="rule-inv-b grid grid-cols-1 gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6"
                  >
                    <span className="spec-label text-flame pt-1">{row.k}</span>
                    <span className="prose-body text-paper/80">{row.v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="rule-inv-all rounded-photo p-6">
                <p className="spec-label text-paper/65">Write to us</p>
                <a
                  href={`mailto:${SITE.contact.email}?subject=Leocym%20enquiry`}
                  className="display-2 text-paper hover:text-flame mt-3 block break-words transition-colors duration-(--dur-quick)"
                >
                  {SITE.contact.email}
                </a>
                <p className="prose-body text-paper/65 mt-4">
                  For homes, facilities, food businesses, and contractors
                  running industrial or municipal work.
                </p>
                <a
                  href={SITE.contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="ui-text text-paper/80 hover:text-flame rule-inv-t mt-5 inline-block w-full pt-4 transition-colors duration-(--dur-quick)"
                >
                  Watch the product demonstrations
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
