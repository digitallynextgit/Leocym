import type { Metadata } from "next";
import Link from "next/link";
import { NAV } from "@/content/site";
import { Action, Petal } from "@/components/ui";

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
      <div className="rule-t flex items-baseline gap-4 pt-3">
        <span className="plate-no text-ink-soft">404</span>
        <Petal size={13} strokeWidth={2.4} className="text-ink-soft" />
      </div>

      <h1 className="display-hero text-ink mt-6 max-w-[14ch]">
        That page is not here.
      </h1>
      <p className="prose-lead text-ink-deep/75 measure-text mt-6">
        Either the address is wrong, or it moved when the site was reorganised
        into the sections below. Everything that was on the old single page is
        still here, on one of them.
      </p>

      <ul className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {NAV.map((item) => (
          <li key={item.href} className="rule-t">
            <Link href={item.href} className="group block py-5">
              <span className="display-3 group-hover:text-flame-deep transition-colors duration-(--dur-quick)">
                {item.label}
              </span>
              <span className="prose-body text-ink-deep/65 mt-1.5 block">
                {item.blurb}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Action href="/">Back to the start</Action>
      </div>
    </div>
  );
}
