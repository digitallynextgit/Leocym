import { NAV, SITE } from "@/content/site";
import { Petal, Wordmark } from "@/components/ui";

/**
 * Section 12 - Footer.
 *
 * Leocym logo only, in its all-white form because the ground is dark
 * (Brand Guidelines Part 3.3). No distributor is named anywhere - see the
 * client directive in content/site.ts.
 *
 * Built from what the site actually has: three groups, not the reflex four
 * equal columns with a newsletter box nobody reads.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-black text-paper mt-auto">
      <div className="gutter measure-wide section-y">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* ---- Identity ---- */}
          <div className="lg:col-span-5">
            <Wordmark variant="white" width={64} className="h-auto w-16" />
            <p className="display-3 text-paper/90 measure-editorial mt-6">
              {SITE.tagline}
            </p>
            <p className="prose-body text-paper/65 measure-editorial mt-3">
              Odour neutralisers and eco-friendly cleaning and hygiene products,
              from {SITE.origin.city}, {SITE.origin.country}.
            </p>
            <Petal size={30} className="text-paper/20 mt-8" />
          </div>

          {/* ---- Navigation ---- */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="spec-label text-paper/65">This site</h2>
            <ul className="mt-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="ui-text text-paper/80 hover:text-flame inline-block py-1.5 transition-colors duration-(--dur-quick)"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Contact ---- */}
          <div className="lg:col-span-4">
            <h2 className="spec-label text-paper/65">Get in touch</h2>
            <ul className="mt-4">
              <li>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="ui-text text-paper/80 hover:text-flame inline-block py-1.5 transition-colors duration-(--dur-quick)"
                >
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="ui-text text-paper/80 hover:text-flame inline-block py-1.5 transition-colors duration-(--dur-quick)"
                >
                  YouTube
                </a>
              </li>
            </ul>

            <h2 className="spec-label text-paper/65 mt-8">Origin</h2>
            <p className="prose-body text-paper/65 mt-3">
              {SITE.origin.city}, {SITE.origin.country}
            </p>
          </div>
        </div>

        {/* ---- Legal ---- */}
        <div className="rule-inv-t mt-12 flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="spec-value text-paper/65">
            © {year} Leocym. All rights reserved.
          </p>
          <p className="spec-value text-paper/65">
            This website is for information only.
          </p>
        </div>
      </div>
    </footer>
  );
}
