"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CTA, NAV, SITE } from "@/content/site";
import { Wordmark } from "@/components/ui";

/**
 * The header. One instance, in the root layout, shared by every page.
 *
 * Leocym logo only. No other brand mark appears anywhere on this site.
 * Solid paper ground with a hairline that arrives on scroll - deliberately not
 * a frosted translucent bar, which is the reflex treatment everywhere else.
 *
 * The current page is marked with `aria-current` and a flame underline, which
 * is the whole reason this became a multi-page site: a reader should always be
 * able to see where they are.
 *
 * The mobile panel is always in the DOM and toggled with the `hidden`
 * attribute, so `aria-controls` always resolves to a real element. When open it
 * takes focus, traps Tab, closes on Escape and returns focus to the toggle -
 * otherwise it would trap sighted users visually while letting keyboard users
 * tab straight out behind it.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* A client-side navigation does not unmount the header, so without this the
     panel would stay open over the page the reader just moved to. */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const node = panelRef.current;
    node?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const items = Array.from(
        node.querySelectorAll<HTMLElement>("a[href],button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper transition-shadow duration-(--dur-base) ${
        scrolled ? "rule-b" : ""
      }`}
    >
      <div className="gutter measure-wide flex h-(--header-h) items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Leocym, home"
          aria-current={pathname === "/" ? "page" : undefined}
          className="shrink-0 leading-none"
        >
          <Wordmark width={46} className="h-auto w-[46px]" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {NAV.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`ui-text relative block border-b-2 py-1.5 transition-colors duration-(--dur-quick) ${
                      current
                        ? "border-flame text-ink"
                        : "hover:text-flame-deep focus-visible:text-flame-deep text-ink-deep border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={CTA.href}
            className="ui-text bg-ink text-paper hover:bg-flame hover:text-ink inline-flex px-4 py-2.5 transition-colors duration-(--dur-quick) sm:px-5"
          >
            <span className="sm:hidden">Enquire</span>
            <span className="hidden sm:inline">{CTA.label}</span>
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rule-all text-ink flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
              {open ? (
                <g stroke="currentColor" strokeWidth="1.6">
                  <line x1="2" y1="1.5" x2="14" y2="10.5" />
                  <line x1="14" y1="1.5" x2="2" y2="10.5" />
                </g>
              ) : (
                <g stroke="currentColor" strokeWidth="1.6">
                  <line x1="0" y1="1.5" x2="16" y2="1.5" />
                  <line x1="0" y1="6" x2="16" y2="6" />
                  <line x1="0" y1="10.5" x2="16" y2="10.5" />
                </g>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="rule-t bg-paper fixed inset-x-0 bottom-0 top-(--header-h) z-40 overflow-y-auto lg:hidden"
      >
        {/* The mobile panel carries each page's one-line blurb. On a phone the
            panel IS the sitemap, and a bare list of five nouns tells a first-time
            visitor nothing about which one they want. */}
        <nav aria-label="Primary, mobile" className="gutter py-4">
          <ul>
            {NAV.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className="rule-b block py-4"
                  >
                    <span
                      className={`display-3 flex items-center gap-2.5 ${
                        current ? "text-flame-deep" : ""
                      }`}
                    >
                      {current ? (
                        <span
                          aria-hidden="true"
                          className="bg-flame inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                        />
                      ) : null}
                      {item.label}
                    </span>
                    <span className="prose-body text-ink-deep/65 mt-1 block">
                      {item.blurb}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={CTA.href}
            className="ui-text bg-ink text-paper mt-8 block px-5 py-4 text-center"
          >
            {CTA.label}
          </Link>
          <p className="spec-label text-ink-soft mt-8">
            {SITE.origin.city}, {SITE.origin.country}
          </p>
        </nav>
      </div>
    </header>
  );
}
