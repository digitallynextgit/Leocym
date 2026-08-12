"use client";

import { useEffect, useRef } from "react";

/* ============================================================================
   THE ENTRANCE ENGINE

   Deliberately not an animation library. One IntersectionObserver for the whole
   document flips a single attribute per element and CSS does everything else,
   so there is nothing running on scroll, no layout read in a hot path, and
   nothing that can jank the main thread.

   Three safeguards, in order of how easy they are to get wrong:

     1. `js` is set on <html> by an inline script in the document (see
        app/layout.tsx), not here. Setting it from an effect meant the browser
        painted the content, then hid it, then faded it back in — a flash on
        every load. With the class present before first paint there is no
        flash, and with JavaScript off the class never arrives, so the hidden
        state never applies and the page is simply readable.
     2. prefers-reduced-motion is honoured in globals.css, which both zeroes
        every duration and restores the resting state of anything whose hidden
        state is the CSS default.
     3. Elements are unobserved once shown. Re-animating on every pass is noise,
        and it is the fastest way to make a page feel cheap.
   ========================================================================== */

/**
 * One observer, shared by every Reveal and Stagger on the page.
 *
 * Created lazily on first use so it is never constructed during SSR, and never
 * at all on a page that has no entrances.
 */
let observer: IntersectionObserver | null = null;

function show(node: HTMLElement) {
  node.setAttribute("data-shown", "");
}

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target as HTMLElement);
        observer?.unobserve(entry.target);
      }
    },
    /* NO negative bottom margin, and no threshold above zero. Both are the
       obvious way to make an entrance fire "a little later", and both have the
       same bug: an element that can never satisfy them never reveals AT ALL.
       Shrinking the root from the bottom means the last block on the page — the
       copyright line, in our case — sits permanently inside the excluded strip
       once the document is scrolled to its end, and stays invisible forever. A
       threshold above zero does the same to any block taller than the viewport.

       Firing on first contact and letting the 640ms travel do the work gives
       the same read, and cannot strand anything. */
    { rootMargin: "0px", threshold: 0 },
  );
  return observer;
}

/**
 * Observe a node, or show it immediately if the browser cannot observe.
 *
 * Also handles the case where the element is ALREADY in view on mount — which
 * is most of what a reader sees on a short page, and where a missed callback
 * would leave a block invisible forever.
 */
function useEnter(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    document.documentElement.classList.add("js");

    const io = getObserver();
    if (!io) {
      show(el);
      return;
    }

    io.observe(el);
    return () => io.unobserve(el);
  }, [ref]);
}

/* -------------------------------------------------------------------------- */

/** The gestures. Each maps to a rule in the MOTION section of globals.css. */
export type RevealVariant =
  | "up"
  | "left"
  | "right"
  | "scale"
  | "blur"
  /** A wipe rather than a fade. For headlines: type being set, not type fading in. */
  | "mask"
  | "fade";

/**
 * Scroll entrance for a single block.
 *
 * @param delay  Stagger, in ms. Keep under ~250 — longer reads as sluggish
 *               rather than composed, and a reader who has already arrived is
 *               watching an empty box.
 */
export function Reveal({
  children,
  delay = 0,
  duration,
  variant = "up",
  as: Tag = "div",
  className = "",
  style,
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  /** Override the house duration, in ms. Rarely needed. */
  duration?: number;
  variant?: RevealVariant;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLElement>, "style" | "className">) {
  const ref = useRef<HTMLElement>(null);
  useEnter(ref);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={
        {
          ...(delay ? { "--rv-delay": `${delay}ms` } : null),
          ...(duration ? { "--rv-dur": `${duration}ms` } : null),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {/* The wipe clips an INNER element, never the observed one.
          An IntersectionObserver measures the target's clipped box, so a
          clip-path on the element being watched shrinks its own intersection
          rectangle to nothing — it can never intersect, so it is never shown,
          so the clip is never lifted. The gesture would silently delete the
          content it was decorating. One level of indirection breaks the loop. */}
      {variant === "mask" ? <span data-rv-mask>{children}</span> : children}
    </Tag>
  );
}

/**
 * A cascade, from one observer.
 *
 * The PARENT is observed and the children run their own keyframe on an indexed
 * delay, so a twenty-seven row list costs one observer entry rather than
 * twenty-seven. Children need no markup of their own — the index comes from
 * `nth-child` rules in globals.css.
 *
 * Use this for lists, grids and rows. Use `<Reveal>` for a block that arrives
 * as one thing.
 */
export function Stagger({
  children,
  delay = 0,
  step = 65,
  duration,
  variant = "up",
  as: Tag = "div",
  className = "",
  style,
  ...rest
}: {
  children: React.ReactNode;
  /** Delay before the FIRST child moves. */
  delay?: number;
  /** Gap between consecutive children, in ms. Under ~40 reads as one block;
      over ~120 the last row arrives long after the reader has passed it. */
  step?: number;
  duration?: number;
  variant?: "up" | "left" | "scale";
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLElement>, "style" | "className">) {
  const ref = useRef<HTMLElement>(null);
  useEnter(ref);

  return (
    <Tag
      ref={ref}
      data-stagger={variant}
      className={className}
      style={
        {
          "--stagger-step": `${step}ms`,
          ...(delay ? { "--rv-delay": `${delay}ms` } : null),
          ...(duration ? { "--rv-dur": `${duration}ms` } : null),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
