import Image from "next/image";

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
  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
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
