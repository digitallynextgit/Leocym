import { INDUSTRIAL } from "@/content/industrial";
import { FRAGRANCES, ODOUR_PRODUCTS } from "@/content/products";
import { Reveal, SectionLabel, Stagger } from "@/components/ui";

/**
 * "Time-tested, Europe-trusted technology" — the second half of what the
 * sitemap asks the brand story to carry.
 *
 * Framework, from the marketing strategy §6.5: the Lindy Effect. Something that
 * has already worked for a long time in hard conditions is a better bet than
 * something new that tests well. So this section makes the age of the
 * technology the argument, rather than treating it as a footnote.
 *
 * CLAIMS DISCIPLINE. There are no years, no client names and no site counts
 * here, because none has been supplied and approved. Every proposition below is
 * either a description of the mechanism, a fact drawn from the typed content
 * files, or a statement about what the company will not assert. Nothing needs a
 * laboratory result to stand up.
 */
export function Heritage() {
  const segments = INDUSTRIAL.length;

  const PROPOSITIONS = [
    {
      n: "01",
      title: "Proven where masking is not an option",
      body: `The formulations have been used across Europe on water treatment plants, sanitary landfills, refineries and metro tunnelling — ${segments} categories of site where the result is measured at the boundary by somebody who did not buy the product. A fragrance cannot pass that test, so a fragrance was never the approach.`,
    },
    {
      n: "02",
      title: "One chemistry, every scale",
      body: "Nothing is reformulated on the way down from a landfill to a washroom. The neutralising action is the same; what changes is the equipment that carries it — a spray cannon on a tractor at one end, a gel that sits on a shelf and evaporates at the other.",
    },
    {
      n: "03",
      title: "Built around sources, not scents",
      body: `The range is organised by what is producing the smell — drains, urine, garbage, smoke, carpets, meat, fish, paint — which is why there are ${ODOUR_PRODUCTS.length} odour products rather than a single one in ${FRAGRANCES.length} scents. Each is formulated for the compound it has to act on.`,
    },
    {
      n: "04",
      title: "New to India, not new",
      body: "This is the first time the range has been available here. That is a fact about distribution, not about the technology — which is exactly the right way round, and the reason there is no launch-year story to tell.",
    },
  ];

  return (
    <section className="bg-ink text-paper band">
      <div className="gutter measure-wide section-y-lg">
        <Reveal>
          <header className="rule-inv-t pt-3">
            <SectionLabel tone="paper">
              Time-tested, Europe-trusted
            </SectionLabel>
            <div className="mt-5 grid gap-x-14 gap-y-5 lg:grid-cols-12">
              <h2 className="display-1 lg:col-span-6">
                The technology is old. That is the point.
              </h2>
              <p className="prose-lead text-paper/75 lg:col-span-5 lg:col-start-8 lg:pt-1">
                A product that has held up for years on the hardest sites in
                Europe is a safer bet than a new one that tests well. Longevity
                is evidence.
              </p>
            </div>
          </header>
        </Reveal>

        <Stagger
          as="ol"
          delay={60}
          step={90}
          className="mt-10 grid gap-x-14 gap-y-0 lg:grid-cols-2"
        >
          {PROPOSITIONS.map((p) => (
            <li
              key={p.n}
              className="group rule-inv-t grid grid-cols-[2.5rem_1fr] gap-x-4 py-6"
            >
              <span className="plate-no nums text-field-pale group-hover:text-flame pt-1.5 transition-colors duration-(--dur-base)">
                {p.n}
              </span>
              <div>
                <h3 className="display-3">{p.title}</h3>
                <p className="prose-body text-paper/75 mt-2 max-w-[46ch]">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
