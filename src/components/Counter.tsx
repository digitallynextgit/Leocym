"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up the first time it is scrolled into view.
 *
 * Three things this is careful about, because a count-up is one of the easiest
 * effects to ship broken:
 *
 *   - It renders the FINAL value on the server. With JavaScript off, or before
 *     hydration, or to a crawler, this is just the number — never a zero that
 *     silently stays a zero.
 *   - It honours prefers-reduced-motion by not running at all. A digit spinning
 *     in place is exactly the kind of motion the setting exists to decline.
 *   - It is `aria-hidden` while it runs and carries the real figure in a
 *     visually-hidden span, so a screen reader is told "26", once, rather than
 *     being read a stream of intermediate numbers.
 *
 * Tabular figures come from the `nums` utility on the caller, so the box does
 * not twitch as the digits change width.
 */
export function Counter({
  to,
  duration = 1100,
  className = "",
}: {
  to: number;
  /** In ms. Long enough to read as counting, short enough to finish before the
      reader has moved on. */
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let start = 0;
    setValue(0);

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      // Ease-out: fast at the head, settling at the end, matching --ease-out-soft.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className={className}>
        {value}
      </span>
      <span className="sr-only">{to}</span>
    </>
  );
}
