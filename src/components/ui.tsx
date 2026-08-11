import Image from "next/image";
import Link from "next/link";

/* ============================================================================
   Shared primitives.

   Deliberately NOT a card component. This design uses hairline rules, measure
   and position for hierarchy - not a uniform rounded-and-shadowed surface
   repeated everywhere.
   ========================================================================== */

/**
 * The five-petal line flower from the Leocym catalogue, redrawn as SVG.
 * Used as section punctuation - the brand's own ornament, not a stock icon.
 */
export function Petal({
  className = "",
  size = 56,
  strokeWidth = 1.4,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round">
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            transform={`rotate(${deg})`}
            d="M0 -6 C -14 -20 -12 -42 2 -42 C 16 -42 18 -20 0 -6 Z"
          />
        ))}
      </g>
      <circle cx="0" cy="0" r="3.2" fill="currentColor" />
    </svg>
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
      <div className={`${rule} flex items-baseline gap-4 pt-3`}>
        <span className={`plate-no ${muted}`}>{index}</span>
        <Petal size={13} strokeWidth={2.4} className={muted} />
      </div>
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
  const base =
    "ui-text inline-flex items-center justify-center px-6 py-3 transition-colors duration-(--dur-quick) ease-brand";
  const styles = {
    primary:
      "bg-flame text-ink hover:bg-flame-deep hover:text-paper active:bg-flame-deep",
    quiet: "rule-all text-ink hover:bg-ink hover:text-paper active:bg-ink-deep",
    inverse:
      "rule-inv-all text-paper hover:bg-paper hover:text-ink active:bg-paper/90",
  }[variant];
  const cls = `${base} ${styles} ${className}`;

  if (href.startsWith("/") && !external) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
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
      <span className="underline decoration-1 underline-offset-4">
        {children}
      </span>
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-(--dur-base) ease-brand group-hover:translate-x-1"
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
  return (
    <header className="gutter measure-wide pt-10 pb-12 lg:pt-14 lg:pb-16">
      <div className="rule-t flex items-baseline gap-4 pt-3">
        <span className="plate-no text-ink-soft">{label}</span>
        <Petal size={13} strokeWidth={2.4} className="text-ink-soft" />
      </div>

      <div className="mt-6 grid gap-x-14 gap-y-8 lg:grid-cols-12">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
          <h1 className="display-hero text-ink max-w-[16ch]">{title}</h1>
          {standfirst ? (
            <p className="prose-lead text-ink-deep/75 measure-text mt-6">
              {standfirst}
            </p>
          ) : null}
        </div>

        {aside ? (
          <dl className="lg:col-span-4 lg:col-start-9 lg:pt-2">
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
    <nav aria-label="Continue reading" className="gutter measure-wide section-y">
      <h2 className="spec-label text-ink-soft rule-t pt-3">Next</h2>
      <ul className="mt-2 grid gap-x-12 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href} className="rule-b">
            <Link
              href={item.href}
              className="group block py-6 transition-colors duration-(--dur-quick)"
            >
              <span className="display-2 group-hover:text-flame-deep flex items-center gap-3 transition-colors duration-(--dur-quick)">
                {item.label}
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  aria-hidden="true"
                  className="text-ink-soft shrink-0 transition-transform duration-(--dur-base) ease-brand group-hover:translate-x-1.5"
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
      </ul>
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
export { Reveal } from "./Reveal";
