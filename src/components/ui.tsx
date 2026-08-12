import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger } from "./Reveal";

/* ============================================================================
   Shared primitives.

   Deliberately NOT a card component. This design uses hairline rules, measure
   and position for hierarchy - not a uniform rounded-and-shadowed surface
   repeated everywhere.
   ========================================================================== */

/**
 * The five-petal line flower from the Leocym catalogue, redrawn as SVG.
 * Used as section punctuation - the brand's own ornament, not a stock icon.
 *
 * The petals draw themselves in sequence once an ancestor Reveal has fired,
 * which is the one place on this site where an ornament is allowed to move: it
 * is punctuation, so it should arrive after the sentence it punctuates.
 */
export function Petal({
  className = "",
  size = 56,
  strokeWidth = 1.4,
  draw = true,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
  /** Set false where the ornament is decorative furniture rather than a mark
      of punctuation - the footer's large one, for instance. */
  draw?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      fill="none"
      aria-hidden="true"
      className={`${draw ? "petal-draw" : ""} ${className}`}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <path
            key={deg}
            transform={`rotate(${deg})`}
            /* Normalised so one stroke-dasharray value draws every petal
               regardless of its real path length. */
            pathLength={1}
            style={{ "--i": i } as React.CSSProperties}
            d="M0 -6 C -14 -20 -12 -42 2 -42 C 16 -42 18 -20 0 -6 Z"
          />
        ))}
      </g>
      <circle cx="0" cy="0" r="3.2" fill="currentColor" />
    </svg>
  );
}

/**
 * The reading-progress hairline under the header.
 *
 * No JavaScript: it is a CSS scroll-driven animation, so the browser advances
 * it off the scroll position itself rather than off a scroll listener that has
 * to run on the main thread. Where `animation-timeline` is unsupported the bar
 * simply stays at zero width and nothing else changes; under reduced motion it
 * is not drawn at all (see globals.css).
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 overflow-hidden"
    >
      <div className="scroll-progress bg-flame h-full w-full" />
    </div>
  );
}

/** A small cluster of dots, also lifted from the catalogue's page furniture. */
export function Dots({ className = "" }: { className?: string }) {
  return (
    <svg
      width="42"
      height="30"
      viewBox="0 0 42 30"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <circle cx="7" cy="19" r="5.5" />
      <circle cx="24" cy="8" r="2.6" />
      <circle cx="36" cy="21" r="1.8" />
    </svg>
  );
}

/**
 * The Leocym logo. Extracted from the printed catalogue, never redrawn.
 *
 * CONTRACT: this is Leocym's own channel, so this is the ONLY logo that appears
 * anywhere on this site. No other brand asset exists in this repository.
 * (Brand Guidelines Part 2.)
 */
export function Wordmark({
  variant = "colour",
  className = "",
  width = 92,
}: {
  variant?: "colour" | "white";
  className?: string;
  width?: number;
}) {
  const src =
    variant === "white"
      ? "/brand/leocym-lockup-white.png"
      : "/brand/leocym-lockup.png";
  return (
    <Image
      src={src}
      alt="Leocym"
      width={width}
      height={Math.round((width * 436) / 335)}
      priority
      className={className}
    />
  );
}

/** The running plate number that ties the catalogue together. */
export function PlateNo({
  n,
  className = "",
}: {
  n: number | string;
  className?: string;
}) {
  const label = typeof n === "number" ? String(n).padStart(2, "0") : n;
  return <span className={`plate-no ${className}`}>Pl.&nbsp;{label}</span>;
}

/**
 * The running label above a section heading, with the flame tick that draws
 * itself in as the block arrives.
 *
 * Pulled out of SectionHead because five different section openers were each
 * rebuilding this same three-part row - label, ornament, rule - by hand, and
 * the motion had to be added to all of them or none.
 *
 * The tick keys off `[data-shown]` on an ancestor, so it draws when the Reveal
 * that wraps the section fires. Outside a Reveal it simply sits at full width.
 */
export function SectionLabel({
  children,
  tone = "ink",
  className = "",
  meta,
}: {
  children: React.ReactNode;
  tone?: "ink" | "paper";
  className?: string;
  /** Optional right-aligned count, e.g. "26 products". */
  meta?: React.ReactNode;
}) {
  const muted = tone === "ink" ? "text-ink-soft" : "text-paper/65";
  return (
    <div className={`flex items-baseline justify-between gap-4 ${className}`}>
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden="true"
          className="draw-x bg-flame mr-1 h-0.5 w-7 shrink-0 self-center"
        />
        <span className={`plate-no ${muted}`}>{children}</span>
        <Petal size={13} strokeWidth={2.4} className={muted} />
      </div>
      {meta ? <span className={`spec-label nums ${muted}`}>{meta}</span> : null}
    </div>
  );
}

/**
 * Section opener. Takes an index, a title and an optional standfirst.
 * The index is a spec-sheet device, not a decorative eyebrow badge.
 */
export function SectionHead({
  index,
  title,
  standfirst,
  tone = "ink",
  className = "",
  id,
}: {
  index: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  tone?: "ink" | "paper";
  className?: string;
  id?: string;
}) {
  const muted = tone === "ink" ? "text-ink-soft" : "text-paper/65";
  const rule = tone === "ink" ? "rule-t" : "rule-inv-t";
  return (
    <header className={className} id={id}>
      <SectionLabel tone={tone} className={`${rule} pt-3`}>
        {index}
      </SectionLabel>
      <h2 className="display-1 mt-6 max-w-[18ch]">{title}</h2>
      {standfirst ? (
        <p className={`prose-lead measure-editorial mt-5 ${muted}`}>
          {standfirst}
        </p>
      ) : null}
    </header>
  );
}

/**
 * The one button style on the site. Flame for the primary action, an outlined
 * hairline for secondary. Real hover, focus and active states - the polish gap
 * is where generated UI gives itself away.
 *
 * An internal href renders through next/link, so page-to-page moves prefetch on
 * hover and transition on the client. Anything else falls back to a plain
 * anchor - mailto:, an external site, or an in-page hash.
 */
export function Action({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "quiet" | "inverse";
  className?: string;
  external?: boolean;
}) {
  /* The hover is a fill that RISES from the bottom edge rather than a flat
     colour swap - one gesture, used by every button on the site, so a hover
     here always reads the same way. `fill-rise` isolates and paints the fill on
     a negative z-index, which is what keeps it over the button's own ground and
     under its label without a second wrapper element. */
  const base =
    "ui-text fill-rise inline-flex items-center justify-center px-6 py-3 transition-colors duration-(--dur-base) ease-brand";
  const styles = {
    primary: "bg-flame text-ink hover:text-paper active:text-paper",
    quiet: "rule-all text-ink hover:text-paper active:text-paper",
    inverse: "rule-inv-all text-paper hover:text-ink active:text-ink",
  }[variant];
  const fill = {
    primary: "var(--color-flame-deep)",
    quiet: "var(--color-ink)",
    inverse: "var(--color-paper)",
  }[variant];
  const cls = `${base} ${styles} ${className}`;
  const style = { "--fill": fill } as React.CSSProperties;

  if (href.startsWith("/") && !external) {
    return (
      <Link href={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      style={style}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/**
 * A quiet text link with a moving arrow. This is how the site navigates BETWEEN
 * pages without spending its one call-to-action budget: a link is not a CTA, and
 * a page full of buttons is exactly the clutter this restructure removed.
 */
export function TextLink({
  href,
  children,
  tone = "ink",
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "ink" | "paper";
  className?: string;
  external?: boolean;
}) {
  const colour =
    tone === "ink"
      ? "text-flame-deep hover:text-ink"
      : "text-flame hover:text-paper";
  const cls = `ui-text group inline-flex items-center gap-2 transition-colors duration-(--dur-quick) ${colour} ${className}`;
  const inner = (
    <>
      {/* The rule stays at rest - a link that is only underlined on hover is a
          link a reader has to find. What moves is its DISTANCE from the
          baseline, which reads as the word lifting slightly towards you. */}
      <span className="underline decoration-1 underline-offset-4 transition-[text-underline-offset] duration-(--dur-base) ease-brand group-hover:underline-offset-[7px] group-focus-visible:underline-offset-[7px]">
        {children}
      </span>
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-(--dur-base) ease-brand group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
      >
        <path
          d="M0 5h14M10 1l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (href.startsWith("/") && !external) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}

/**
 * The masthead every page below the homepage opens with.
 *
 * One shape, used five times, so the site reads as a set rather than as five
 * pages that happen to share a palette: the running label, the ornament, the
 * argument in the display face, and a standfirst held to editorial measure.
 * The optional `aside` takes a short spec list on the right, which is what keeps
 * a text-only page opening from looking like a blog post.
 */
export function PageHero({
  label,
  title,
  standfirst,
  aside,
}: {
  label: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  aside?: { k: string; v: React.ReactNode }[];
}) {
  /* Everything here is ABOVE the fold, so none of it is observed - there would
     be nothing to wait for. It runs on load instead, sequenced with `--d`, so
     the page opening assembles itself in reading order: label, headline,
     standfirst, then the spec rows down the right. */
  return (
    <header className="gutter measure-wide pt-10 pb-12 lg:pt-14 lg:pb-16">
      <div
        data-shown
        className="rule-t enter pt-3"
        style={{ "--d": "40ms" } as React.CSSProperties}
      >
        <SectionLabel>{label}</SectionLabel>
      </div>

      <div className="mt-6 grid gap-x-14 gap-y-8 lg:grid-cols-12">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
          <h1
            className="display-hero enter-wipe text-ink max-w-[16ch]"
            style={{ "--d": "150ms" } as React.CSSProperties}
          >
            {title}
          </h1>
          {standfirst ? (
            <p
              className="prose-lead enter text-ink-deep/75 measure-text mt-6"
              style={{ "--d": "330ms" } as React.CSSProperties}
            >
              {standfirst}
            </p>
          ) : null}
        </div>

        {aside ? (
          <dl
            data-stagger
            data-shown
            className="lg:col-span-4 lg:col-start-9 lg:pt-2"
            style={
              {
                "--rv-delay": "420ms",
                "--stagger-step": "70ms",
              } as React.CSSProperties
            }
          >
            {aside.map((row) => (
              <SpecRow key={row.k} label={row.k} value={row.v} />
            ))}
          </dl>
        ) : null}
      </div>
    </header>
  );
}

/**
 * The hand-off at the foot of every inner page: where a reader who finished
 * this page most likely wants to go next. Two doors, never more - a wall of
 * "related links" is a sitemap, not a recommendation.
 */
export function NextUp({
  items,
}: {
  items: { label: string; href: string; blurb: string }[];
}) {
  return (
    <nav aria-label="Continue reading" className="gutter measure-wide section-y-lg">
      <Reveal>
        <h2 className="spec-label text-ink-soft rule-t pt-3">Next</h2>
      </Reveal>
      <Stagger
        as="ul"
        delay={60}
        step={90}
        className="mt-2 grid gap-x-12 sm:grid-cols-2"
      >
        {items.map((item) => (
          <li key={item.href} className="rule-b">
            <Link
              href={item.href}
              className="group hover:bg-paper-2/60 -mx-3 block px-3 py-6 transition-colors duration-(--dur-base)"
            >
              <span className="display-2 group-hover:text-flame-deep flex items-center gap-3 transition-colors duration-(--dur-quick)">
                {item.label}
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  aria-hidden="true"
                  className="text-ink-soft group-hover:text-flame-deep shrink-0 transition-all duration-(--dur-base) ease-brand group-hover:translate-x-2"
                >
                  <path
                    d="M0 6h15M11 1.5 15.5 6 11 10.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="prose-body text-ink-deep/70 mt-2 block max-w-[40ch]">
                {item.blurb}
              </span>
            </Link>
          </li>
        ))}
      </Stagger>
    </nav>
  );
}

/** A definition row for spec blocks. Sharp corners, hairline rules, dense. */
export function SpecRow({
  label,
  value,
  tone = "ink",
}: {
  label: string;
  value: React.ReactNode;
  tone?: "ink" | "paper";
}) {
  const muted = tone === "ink" ? "text-ink-soft" : "text-paper/65";
  const rule = tone === "ink" ? "rule-t" : "rule-inv-t";
  return (
    <div className={`${rule} grid grid-cols-[7.5rem_1fr] gap-4 py-2.5`}>
      <dt className={`spec-label pt-1 ${muted}`}>{label}</dt>
      <dd className="spec-value">{value}</dd>
    </div>
  );
}

/* Re-exported so sections import one module for primitives. */
export { Reveal, Stagger } from "./Reveal";
export { Counter } from "./Counter";
