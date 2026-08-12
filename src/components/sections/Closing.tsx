import { CTA, RETAIL, SITE } from "@/content/site";
import { Action, Reveal, SectionLabel, Stagger, TextLink } from "@/components/ui";

/**
 * The closing band. The one conversion point on any page, and the only place
 * outside the header where an action button appears (Brand Guidelines: one CTA,
 * the header and the close).
 *
 * It offers exactly the two endpoints the sitemap defines, and it is honest
 * about which is which: this site does not sell, so buying leaves for the
 * distributor's own site, and everything else is a conversation with a person.
 * Marketplaces are deliberately not linked (Marketing Strategy §6.3.3) - traffic
 * we generated ourselves should not be handed to one.
 */
export function Closing({
  title = "Tell us what the smell is. We will tell you what treats it.",
  standfirst = "There is no cart here, and no sales pitch waiting at the other end — just the person who knows which formulation matches your problem.",
}: {
  title?: React.ReactNode;
  standfirst?: React.ReactNode;
}) {
  return (
    <section className="bg-ink text-paper band">
      <div className="gutter measure-wide section-y-lg">
        <Reveal>
          <header className="rule-inv-t pt-3">
            <SectionLabel tone="paper">Get in touch</SectionLabel>
            <div className="mt-5 grid gap-x-14 gap-y-5 lg:grid-cols-12">
              <h2 className="display-1 lg:col-span-6">{title}</h2>
              <p className="prose-lead text-paper/70 lg:col-span-5 lg:col-start-8 lg:pt-1">
                {standfirst}
              </p>
            </div>
          </header>
        </Reveal>

        {/* The two doors arrive one after the other rather than together, so
            the reader reads them as a choice between two things rather than as
            one block of small print. */}
        <Stagger
          delay={90}
          step={130}
          className="mt-10 grid gap-x-14 gap-y-8 lg:grid-cols-12"
        >
          {/* ---- Enquire ---- */}
          <div className="lg:col-span-6">
            <h3 className="spec-label text-flame">For a site or a business</h3>
            <p className="prose-body text-paper/75 measure-editorial mt-3">
              Facilities, hotels, food businesses, hospitals, and contractors
              running industrial or municipal work. Describe the site and the
              smell, and the reply comes from someone who has treated it before.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Action href={CTA.href} variant="inverse">
                {CTA.label}
              </Action>
              <a
                href={`mailto:${SITE.contact.email}?subject=Leocym%20enquiry`}
                className="ui-text link-wipe text-paper/80 hover:text-flame transition-colors duration-(--dur-quick)"
              >
                {SITE.contact.email}
              </a>
            </div>
          </div>

          {/* ---- Buy ---- */}
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="spec-label text-flame">To buy the range</h3>
            <p className="prose-body text-paper/75 measure-editorial mt-3">
              This site is information only. The range is sold in India by{" "}
              {RETAIL.name}, the {RETAIL.roleInline}, on their own site.
            </p>
            <TextLink href="/where-to-buy" tone="paper" className="mt-6">
              Where to buy
            </TextLink>
          </div>
        </Stagger>
      </div>
    </section>
  );
}
