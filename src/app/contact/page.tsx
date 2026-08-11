import type { Metadata } from "next";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Questions } from "@/components/sections/Questions";
import { NextUp, PageHero, SpecRow } from "@/components/ui";
import { FAQ } from "@/content/misc";
import { RETAIL, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Business enquiry & contact",
  description:
    "Tell us where the smell is and what has been tried. Enquiries for facilities, food businesses, hospitals, hotels and contractors running industrial or municipal work.",
  alternates: { canonical: "/contact" },
};

/**
 * BUSINESS ENQUIRY & CONTACT — sitemap Part C, item 7.
 *
 * The questions sit BELOW the form rather than on the homepage, which is where
 * they used to live. Two reasons. A reader on this page is about to describe a
 * problem, and half of what they were going to ask is answered in the list — so
 * it saves them a round trip. And it moves ten expandable rows off a homepage
 * that was carrying the whole site.
 *
 * The FAQPage structured data moved here with them. Markup that describes
 * questions belongs on the page that renders the answers; leaving it on the
 * homepage would have been a claim about a page that no longer had them.
 */
export default function ContactPage() {
  return (
    <>
      <FaqData />

      <PageHero
        label="Business enquiry"
        title="Describe the smell. We will tell you what treats it."
        standfirst="There is no cart at the other end of this and no sales sequence waiting. A person reads it, and the reply is a recommendation — sometimes that the problem needs a site assessment rather than a product."
      />

      <div className="gutter measure-wide grid gap-x-14 gap-y-12 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <EnquiryForm />
        </div>

        {/* ---- The direct routes, for anyone who would rather not use a form.
                A contact page that offers only a form is a contact page that
                loses the enquiry with an attachment. ---- */}
        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="spec-label text-ink-soft rule-b pb-3">
            Or reach us directly
          </h2>
          <dl>
            <SpecRow
              label="Email"
              value={
                <a
                  href={`mailto:${SITE.contact.email}?subject=Leocym%20enquiry`}
                  className="text-flame-deep hover:text-flame underline decoration-1 underline-offset-4 transition-colors duration-(--dur-quick)"
                >
                  {SITE.contact.email}
                </a>
              }
            />
            <SpecRow
              label="Attachments"
              value="Photographs of the site, a layout, or a tender document — send those by email"
            />
            <SpecRow
              label="Demonstrations"
              value={
                <a
                  href={SITE.contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-flame-deep hover:text-flame underline decoration-1 underline-offset-4 transition-colors duration-(--dur-quick)"
                >
                  On YouTube
                </a>
              }
            />
            <SpecRow
              label="To order"
              value={
                <>
                  The range is sold by{" "}
                  <a
                    href={RETAIL.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-flame-deep hover:text-flame underline decoration-1 underline-offset-4 transition-colors duration-(--dur-quick)"
                  >
                    {RETAIL.name}
                  </a>
                  , not on this site
                </>
              }
            />
            <SpecRow
              label="Origin"
              value={`${SITE.origin.city}, ${SITE.origin.country}`}
            />
          </dl>

          <p className="prose-body text-ink-deep/70 rule-t mt-8 pt-6">
            For a large or recurring problem, the six-step method starts with
            identifying the source through a site assessment — so the most
            useful first message is a description of the place, not a request
            for a product.
          </p>
        </aside>
      </div>

      <Questions />

      <NextUp
        items={[
          {
            label: "Where to buy",
            href: "/where-to-buy",
            blurb: "If you already know what you need and just want to order it.",
          },
          {
            label: "For business",
            href: "/for-business",
            blurb:
              "How large-scale work runs, before you write about a site.",
          },
        ]}
      />
    </>
  );
}

/**
 * FAQPage, rendered on the page that renders the answers.
 *
 * This is the AEO / GEO engine from Marketing Strategy §1.9: the category is
 * uncontested in India, so being the quotable default answer is available now
 * and will not be later.
 */
function FaqData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ContactPage",
              "@id": `${SITE.url}/contact#page`,
              url: `${SITE.url}/contact`,
              name: "Business enquiry & contact",
              isPartOf: { "@id": `${SITE.url}#website` },
              about: { "@id": `${SITE.url}#organization` },
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE.url}/contact#faq`,
              mainEntity: FAQ.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ],
        }),
      }}
    />
  );
}
