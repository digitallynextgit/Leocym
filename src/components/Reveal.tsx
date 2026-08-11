"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll entrance.
 *
 * Deliberately not an animation library. An IntersectionObserver flips a single
 * data attribute and CSS does the rest, so there is no JS running on scroll and
 * nothing that can jank the main thread.
 *
 * Two safeguards:
 *   - `.js` is added to <html> only once this mounts, so the hidden state never
 *     applies without JavaScript. Content is readable with JS off.
 *   - prefers-reduced-motion is honoured globally in globals.css, which zeroes
 *     every transition; the element still reveals, it just does not travel.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  /** Stagger, in ms. Keep under ~250 — longer reads as sluggish, not composed. */
  delay?: number;
  variant?: "up" | "left";
  as?: React.ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("js");
    const el = ref.current;
    if (!el) return;

    // If the browser cannot observe, show it immediately rather than hide it.
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-shown", "");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const node = e.target as HTMLElement;
          const d = Number(node.dataset.delay ?? 0);
          window.setTimeout(() => node.setAttribute("data-shown", ""), d);
          io.unobserve(node); // reveal once; re-animating on every pass is noise
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-delay={delay || undefined}
      className={`${variant === "left" ? "reveal-left" : "reveal"} ${className}`}
    >
      {children}
    </Tag>
  );
}
