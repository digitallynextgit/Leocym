import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Difference } from "@/components/sections/Difference";
import { Method } from "@/components/sections/Method";
import { Science } from "@/components/sections/Science";
import { Range } from "@/components/sections/Range";
import { Areas } from "@/components/sections/Areas";
import { Industrial } from "@/components/sections/Industrial";
import { Origin } from "@/components/sections/Origin";
import { Questions } from "@/components/sections/Questions";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

import { FAQ } from "@/content/misc";
import { PRODUCTS } from "@/content/products";
import { SITE } from "@/content/site";

/**
 * The twelve sections, ordered as an argument rather than a brochure:
 * what the difference is, how it works, why it works, what the products are,
 * where it is used, how far it scales, where it came from, what you might ask,
 * and how to reach us.
 *
 *  1 Header · 2 Hero · 3 Difference · 4 Method · 5 Science · 6 Range
 *  7 Areas · 8 Industrial · 9 Origin · 10 Questions · 11 Contact · 12 Footer
 */
export default function Page() {
  return (
    <>
      <StructuredData />
      <a
        href="#content"
        className="ui-text bg-ink text-paper sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:px-5 focus:py-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="content">
        <Hero />
        <Difference />
        <Method />
        <Science />
        <Range />
        <Areas />
        <Industrial />
        <Origin />
        <Questions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/**
 * Machine-readable layer. The FAQPage graph is the point of this: it is how the
 * brand becomes the quotable default answer in AI search while the category is
 * still uncontested.
 *
 * No `offers` or `price` on any Product node - this site does not sell, and
 * telling a crawler otherwise would be a lie.
 */
function StructuredData() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE.url}#organization`,
      name: SITE.name,
      url: SITE.url,
      slogan: SITE.tagline,
      description: SITE.description,
      logo: `${SITE.url}/brand/leocym-lockup.png`,
      email: SITE.contact.email,
      sameAs: [SITE.contact.youtube],
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.origin.city,
        addressCountry: "FR",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE.url}#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${SITE.url}#range`,
      name: "The Leocym range",
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          description: p.description,
          image: `${SITE.url}${p.image}`,
          brand: { "@id": `${SITE.url}#organization` },
          category:
            p.family === "odour" ? "Odour neutraliser" : "Cleaning & hygiene",
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
