import Link from "next/link";
import { CTA, NAV, RETAIL, SITE } from "@/content/site";
import { Petal, Reveal, Stagger, Wordmark } from "@/components/ui";

/**
 * The footer. One instance, in the root layout, shared by every page.
 *
 * Leocym logo only, in its all-white form because the ground is dark
 * (Brand Guidelines Part 3.3). The distributor appears here as a text link
 * only - no logo, no lockup - which is the one sanctioned mention on the site
 * (Marketing Strategy §6.3.3, and the note in content/site.ts).
 *
 * Built from what the site actually has: three groups, not the reflex four
 * equal columns with a newsletter box nobody reads.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-black text-paper mt-auto">
      <div className="gutter measure-wide section-y-lg">
        {/* Three groups, arriving left to right as the reader reaches the foot
            of the page. The footer is the last thing anyone sees and it is
            usually the deadest surface on a site; a cascade costs nothing and
            makes the end of the page feel like an end rather than a stop. */}
        <Stagger
          step={110}
          className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12"
        >
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
            <Petal
              draw={false}
              size={30}
              className="text-paper/20 drift-slow mt-8"
            />
          </div>

          {/* ---- Navigation ---- */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="spec-label text-paper/65">Pages</h2>
            <ul className="mt-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="ui-text text-paper/80 hover:text-flame inline-block py-1.5 transition-[color,transform] duration-(--dur-base) ease-brand hover:translate-x-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={CTA.href}
                  className="ui-text text-paper/80 hover:text-flame inline-block py-1.5 transition-[color,transform] duration-(--dur-base) ease-brand hover:translate-x-1"
                >
                  {CTA.label}
                </Link>
              </li>
            </ul>
          </nav>

          {/* ---- Contact ---- */}
          <div className="lg:col-span-4">
            <h2 className="spec-label text-paper/65">Get in touch</h2>
            <ul className="mt-4">
              <li>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="ui-text text-paper/80 hover:text-flame inline-block py-1.5 transition-[color,transform] duration-(--dur-base) ease-brand hover:translate-x-1"
                >
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="ui-text text-paper/80 hover:text-flame inline-block py-1.5 transition-[color,transform] duration-(--dur-base) ease-brand hover:translate-x-1"
                >
                  YouTube
                </a>
              </li>
            </ul>

            <h2 className="spec-label text-paper/65 mt-8">To buy in India</h2>
            <p className="prose-body text-paper/65 mt-3">
              <a
                href={RETAIL.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-flame underline decoration-1 underline-offset-4 transition-colors duration-(--dur-quick)"
              >
                {RETAIL.name}
              </a>{" "}
              — {RETAIL.roleInline}.
            </p>

            <h2 className="spec-label text-paper/65 mt-8">Origin</h2>
            <p className="prose-body text-paper/65 mt-3">
              {SITE.origin.city}, {SITE.origin.country}
            </p>
          </div>
        </Stagger>

        {/* ---- Legal ---- */}
        <Reveal
          delay={80}
          className="rule-inv-t mt-12 flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="spec-value text-paper/65">
            © {year} Leocym. All rights reserved.
          </p>
          <p className="spec-value text-paper/65">
            This website is for information only.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
