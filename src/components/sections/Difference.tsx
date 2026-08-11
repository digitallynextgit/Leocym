"use client";

import { useId, useState } from "react";
import { Petal, Reveal } from "@/components/ui";

/**
 * Section 3 - Neutralise vs Mask. THE SHOWPIECE.
 *
 * The one idea the whole brand rests on, demonstrated rather than asserted.
 * Ecosorb - the global category leader - buries this inside a value
 * proposition. We make it the centre of the site.
 *
 * Strictly mechanism-only. No numbers, no durations, no percentages, no named
 * competitors. Every sentence stays inside the approved claims
 * (Brand Guidelines Part 12).
 *
 * This is the site's single dark section - chosen because the diagram needs a
 * ground to glow against, not because dark mode is a reflex.
 */

type Mode = "mask" | "neutralise";

const COPY: Record<
  Mode,
  { label: string; title: string; body: string; note: string }
> = {
  mask: {
    label: "An air freshener",
    title: "The fragrance sits on top.",
    body: "A perfume is released into the air above the smell. It is stronger than the odour, so for a while you notice it instead. Nothing has happened to the source - it is still there, still producing odour.",
    note: "When the fragrance fades, the smell is exactly where it was.",
  },
  neutralise: {
    label: "An odour neutraliser",
    title: "The action happens at the source.",
    body: "Leocym is applied to the source itself - poured into the drain, sprayed onto the soiled surface, placed where the odour is produced. The neutralising agents act on the odour compound rather than covering it.",
    note: "It removes the smell at the source, so it does not come back.",
  },
};

const MODES: Mode[] = ["mask", "neutralise"];

export function Difference() {
  const [mode, setMode] = useState<Mode>("mask");
  const groupId = useId();
  const masked = mode === "mask";
  const copy = COPY[mode];

  /** ARIA radiogroup keyboard contract: arrows wrap, Home/End jump. */
  function onGroupKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const i = MODES.indexOf(mode);
    let next: Mode | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      next = MODES[(i + 1) % MODES.length];
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = MODES[(i - 1 + MODES.length) % MODES.length];
    else if (e.key === "Home") next = MODES[0];
    else if (e.key === "End") next = MODES[MODES.length - 1];
    if (!next) return;
    e.preventDefault();
    setMode(next);
    document.getElementById(`${groupId}-${next}`)?.focus();
  }

  return (
    <section
      id="difference"
      /* Fills exactly one screen minus the navbar. This is the argument the
         whole site rests on, so it gets the reader's full view with nothing
         else competing for attention. Below lg it flows naturally — pinning a
         height on a phone would crush the diagram and the copy together. */
      className="bg-ink text-paper relative overflow-hidden lg:fits-view"
    >
      <div className="gutter measure-wide section-y w-full">
        {/* ---- Opening ---- */}
        <Reveal as="header" className="rule-inv-t block pt-3">
          <div className="flex items-baseline gap-4">
            <span className="plate-no text-paper/65">The difference</span>
            <Petal size={13} strokeWidth={2.4} className="text-paper/60" />
          </div>
          <div className="mt-4 grid gap-8 lg:grid-cols-12">
            <h2 className="display-1 lg:col-span-7">
              Covering a smell and removing one are not the same thing.
            </h2>
            <p className="prose-lead text-paper/70 lg:col-span-5 lg:pt-2">
              Almost every product sold for odour in India works the first way.
              Use the switch below to see what the second way actually does.
            </p>
          </div>
        </Reveal>

        {/* ---- The control ----
             A real ARIA radiogroup: roving tabindex, arrow-key navigation and
             Home/End. Declaring role="radio" without these would claim a
             keyboard contract the component does not honour. */}
        <div
          role="radiogroup"
          aria-label="Compare how each approach works"
          onKeyDown={onGroupKeyDown}
          className="rule-inv-all mt-6 inline-grid grid-cols-2 gap-0"
        >
          {MODES.map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                id={`${groupId}-${m}`}
                type="button"
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                onClick={() => setMode(m)}
                className={`ui-text px-5 py-3 transition-colors duration-(--dur-quick) sm:px-8 ${
                  active
                    ? m === "mask"
                      ? "bg-odour-deep text-paper"
                      : "bg-clean-deep text-paper"
                    : "text-paper/70 hover:text-paper"
                }`}
              >
                {COPY[m].label}
              </button>
            );
          })}
        </div>

        {/* The state change is announced, so a screen-reader user is told what
            switched rather than being left to discover it. */}
        <p className="sr-only" aria-live="polite">
          Showing {copy.label}. {copy.title} {copy.note}
        </p>

        {/* ---- The stage ---- */}
        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <figure className="lg:col-span-6">
            <div className="rule-inv-all bg-ink-black/40 p-3 sm:p-4">
              <Diagram masked={masked} />
            </div>
            <figcaption className="spec-label text-paper/65 mt-2">
              Diagram - how each approach meets the odour source
            </figcaption>
          </figure>

          <div className="lg:col-span-6 lg:pt-1">
            <p
              className={`spec-label ${masked ? "text-odour-lite" : "text-clean-lite"}`}
            >
              {copy.label}
            </p>
            <h3 className="display-2 mt-4">{copy.title}</h3>
            <p className="prose-body text-paper/75 mt-5">{copy.body}</p>
            <p
              className={`display-3 mt-6 border-l-2 pl-5 ${
                masked
                  ? "border-odour text-paper/90"
                  : "border-clean text-paper"
              }`}
            >
              {copy.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The diagram. Two states over one shared stage so the eye can hold the
 * comparison.
 *
 * Geometry is SVG; every LABEL is HTML positioned over it. SVG <text> scales
 * with the viewBox, which on a 390px phone shrank these labels to about 7px -
 * unreadable. HTML labels stay at a real, responsive size at every width.
 *
 * Motion is CSS-transitioned and reduced motion is honoured globally.
 */

/* Shared coordinate space, so the SVG and the HTML labels stay locked together. */
const VB = { w: 660, h: 340 };
const pct = (v: number, axis: "x" | "y") =>
  `${(v / (axis === "x" ? VB.w : VB.h)) * 100}%`;

function Diagram({ masked }: { masked: boolean }) {
  const t = "transition-all duration-(--dur-slow) ease-brand";

  /* Odour particles rising from the source. In the masked state they reach the
     nose line. In the neutralised state they resolve at the source. */
  const particles = [
    { x: 132, drift: -16 },
    { x: 236, drift: 12 },
    { x: 336, drift: -6 },
    { x: 436, drift: 16 },
    { x: 532, drift: -12 },
  ];

  const label =
    "spec-label absolute text-[0.5625rem] sm:text-[0.6875rem] whitespace-nowrap";

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="h-auto w-full"
        role="img"
        aria-label={
          masked
            ? "Diagram: a fragrance layer sits above the odour source. The source is untouched and odour still reaches the air you breathe."
            : "Diagram: the neutralising agent is applied at the odour source. The source is treated and no odour reaches the air you breathe."
        }
      >
        {/* nose line - where a person actually smells */}
        <line
          x1="40"
          y1="46"
          x2="620"
          y2="46"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 5"
          className="text-paper/25"
        />

        {/* fragrance layer - masked state only */}
        <g className={t} opacity={masked ? 1 : 0}>
          <rect
            x="40"
            y="104"
            width="580"
            height="42"
            fill="var(--color-flame)"
            opacity="0.22"
          />
          <line
            x1="40"
            y1="104"
            x2="620"
            y2="104"
            stroke="var(--color-flame)"
            strokeWidth="1.5"
          />
        </g>

        {/* odour particles */}
        {particles.map((p, i) => (
          <g key={i}>
            <line
              x1={p.x}
              y1="258"
              x2={p.x + (masked ? p.drift : 0)}
              y2={masked ? 64 : 222}
              stroke="var(--color-odour)"
              strokeWidth="1"
              strokeDasharray="2 6"
              opacity={masked ? 0.55 : 0.25}
              className={t}
            />
            <circle
              cx={p.x + (masked ? p.drift : 0)}
              cy={masked ? 64 : 222}
              r={masked ? 7 : 3}
              fill="var(--color-odour)"
              opacity={masked ? 1 : 0.35}
              className={t}
            />
          </g>
        ))}

        {/* neutralising action at the source - neutralise state only */}
        <g className={t} opacity={masked ? 0 : 1}>
          <rect
            x="40"
            y="216"
            width="580"
            height="42"
            fill="var(--color-clean)"
            opacity="0.28"
          />
          <line
            x1="40"
            y1="216"
            x2="620"
            y2="216"
            stroke="var(--color-clean)"
            strokeWidth="1.5"
          />
        </g>

        {/* the source - always present, always the same */}
        <rect
          x="40"
          y="258"
          width="580"
          height="50"
          className="fill-paper/10"
        />
        <line
          x1="40"
          y1="258"
          x2="620"
          y2="258"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-paper/65"
        />
      </svg>

      {/* ---- Labels. HTML, so they stay readable at every viewport. ---- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span
          className={`${label} text-paper/65`}
          style={{ left: pct(40, "x"), top: pct(18, "y") }}
        >
          What you smell
        </span>
        <span
          className={`${label} ${t} ${masked ? "text-odour-lite" : "text-clean-lite"}`}
          style={{ right: pct(56, "x"), top: pct(18, "y") }}
        >
          {masked ? "Odour still arrives" : "Nothing arrives"}
        </span>

        <span
          className={`${label} text-flame ${t}`}
          style={{
            left: pct(56, "x"),
            top: pct(116, "y"),
            opacity: masked ? 1 : 0,
          }}
        >
          Fragrance
        </span>

        <span
          className={`${label} text-clean-lite ${t}`}
          style={{
            left: pct(56, "x"),
            top: pct(228, "y"),
            opacity: masked ? 0 : 1,
          }}
        >
          Neutralising action
        </span>

        <span
          className={`${label} text-paper/75`}
          style={{ left: pct(56, "x"), top: pct(274, "y") }}
        >
          The source
        </span>
        <span
          className={`${label} ${t} ${masked ? "text-odour-lite" : "text-clean-lite"}`}
          style={{ right: pct(56, "x"), top: pct(274, "y") }}
        >
          {masked ? "Untouched" : "Treated"}
        </span>
      </div>
    </div>
  );
}
