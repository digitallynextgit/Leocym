import type { Metadata } from "next";
import Link from "next/link";
import { NAV } from "@/content/site";
import { Action, SectionLabel, Stagger } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * 404. It inherits the header and footer from the root layout, so a reader who
 * lands here is never stranded — and it lists the five pages rather than
 * offering a single "go home" button that makes them start over.
 */
export default function NotFound() {
  return (
    <div className="gutter measure-wide flex flex-col justify-center py-20 lg:min-h-[calc(100svh-var(--header-h))] lg:py-24">
      {/* Above the fold by definition, so this runs on load rather than being
          observed - there would be nothing to wait for. */}
      <div
        data-shown
        className="rule-t enter pt-3"
        style={{ "--d": "40ms" } as React.CSSProperties}
      >
        <SectionLabel>404</SectionLabel>
      </div>

      <h1
        className="display-hero enter-wipe text-ink mt-6 max-w-[14ch]"
        style={{ "--d": "140ms" } as React.CSSProperties}
      >
        That page is not here.
      </h1>
      <p
        className="prose-lead enter text-ink-deep/75 measure-text mt-6"
        style={{ "--d": "300ms" } as React.CSSProperties}
      >
        Either the address is wrong, or it moved when the site was reorganised
        into the sections below. Everything that was on the old single page is
        still here, on one of them.
      </p>

      <Stagger
        as="ul"
        delay={400}
        step={70}
        className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {NAV.map((item) => (
          <li key={item.href} className="rule-t">
            <Link
              href={item.href}
              className="group hover:bg-paper-2/60 -mx-3 block px-3 py-5 transition-colors duration-(--dur-base)"
            >
              <span className="display-3 group-hover:text-flame-deep transition-colors duration-(--dur-quick)">
                {item.label}
              </span>
              <span className="prose-body text-ink-deep/65 mt-1.5 block">
                {item.blurb}
              </span>
            </Link>
          </li>
        ))}
      </Stagger>

      <div
        className="enter mt-10"
        style={{ "--d": "760ms" } as React.CSSProperties}
      >
        <Action href="/">Back to the start</Action>
      </div>
    </div>
  );
}
