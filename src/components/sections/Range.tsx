"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  CLEANING_PRODUCTS,
  FRAGRANCES,
  FRAGRANCE_RANGE_SLUGS,
  ODOUR_PRODUCTS,
  type Family,
  type Product,
} from "@/content/products";
import { PlateNo, SpecRow, Stagger } from "@/components/ui";

/**
 * The catalogue grid, on /products.
 *
 * Information only. There is no price, no cart and no "add to basket" anywhere
 * in this component, by contract (Marketing Strategy §6.3).
 *
 * Filtering is by PROBLEM, not by product name, because that is how customers
 * actually search - "drain smell", not "Drain Odrkill".
 *
 * The grid is deliberately uneven: the lead plate in each family is twice the
 * size of the rest. A row of identical cards is the most recognisable
 * generated-layout tell there is.
 */
export function Range() {
  const [family, setFamily] = useState<Family>("odour");
  const [problem, setProblem] = useState<string | null>(null);
  const [open, setOpen] = useState<Product | null>(null);

  const source = family === "odour" ? ODOUR_PRODUCTS : CLEANING_PRODUCTS;

  const problems = useMemo(() => {
    const seen: string[] = [];
    for (const p of source) if (!seen.includes(p.problem)) seen.push(p.problem);
    return seen;
  }, [source]);

  const shown = problem ? source.filter((p) => p.problem === problem) : source;

  function switchFamily(f: Family) {
    setFamily(f);
    setProblem(null);
  }

  return (
    <section id="range" className="gutter measure-wide pb-12 lg:pb-16">
      {/* No section heading here: the page's own <h1> already made the
          argument, and repeating it above the controls was the single biggest
          piece of furniture between the reader and the products. What follows
          is the apparatus - family, filter, plates - and nothing else. */}

      {/* ---- Family switch ----
           Plain toggle buttons with aria-pressed, not role="tab". There are no
           tabpanels here - the grid below is a filtered list, not a panel - so
           claiming the tab pattern would promise keyboard behaviour (arrow-key
           navigation between tabs, aria-controls) that does not exist. */}
      <div
        role="group"
        aria-label="Product families"
        className="rule-b flex gap-8"
      >
        {(
          [
            ["odour", "Odour neutralisers", ODOUR_PRODUCTS.length],
            ["cleaning", "Cleaning & hygiene", CLEANING_PRODUCTS.length],
          ] as const
        ).map(([key, label, count]) => {
          const active = family === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => switchFamily(key)}
              className={`display-3 relative -mb-px border-b-2 pb-3 transition-colors duration-(--dur-quick) ${
                active
                  ? "border-flame text-ink"
                  : "text-ink-soft hover:text-ink border-transparent"
              }`}
            >
              {label} <span className="plate-no align-super">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ---- Problem filter ---- */}
      <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2">
        <span className="spec-label text-ink-soft mr-2">Filter by problem</span>
        <FilterChip active={problem === null} onClick={() => setProblem(null)}>
          All
        </FilterChip>
        {problems.map((p) => (
          <FilterChip
            key={p}
            active={problem === p}
            onClick={() => setProblem(problem === p ? null : p)}
          >
            {p}
          </FilterChip>
        ))}
      </div>

      {/* ---- Plates ----
           Keyed on the current filter, so changing family or problem REMOUNTS
           the grid and the cascade runs again. That is the whole point: the
           filter is the one control on this page, and re-dealing the plates is
           what tells the reader it did something. Without it, twenty-six items
           silently become four and the change is easy to miss entirely. */}
      <Stagger
        as="ul"
        key={`${family}-${problem ?? "all"}`}
        variant="scale"
        step={45}
        duration={520}
        className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4"
      >
        {shown.map((p, i) => (
          <li
            key={p.slug}
            className={
              /* the lead plate of an unfiltered family gets double weight */
              !problem && i === 0 ? "col-span-2 row-span-2" : ""
            }
          >
            <Plate
              product={p}
              large={!problem && i === 0}
              onOpen={() => setOpen(p)}
            />
          </li>
        ))}
      </Stagger>

      {shown.length === 0 ? (
        <p className="prose-body text-ink-soft mt-10">
          Nothing in that group yet.
        </p>
      ) : null}

      {open ? <Detail product={open} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`spec-value px-3 py-1.5 transition-[color,background-color,border-color,transform] duration-(--dur-base) ease-brand ${
        active
          ? "bg-ink text-paper scale-[1.04]"
          : "rule-all text-ink-deep hover:border-ink hover:bg-paper-2 hover:-translate-y-0.5"
      }`}
    >
      {children}
    </button>
  );
}

function Plate({
  product,
  large,
  onOpen,
}: {
  product: Product;
  large: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full text-left"
      aria-label={`${product.name} - ${product.strapline}. Open details.`}
    >
      <div
        className="plate-depth lift sheen overflow-hidden rounded-[20%]"
        style={{ backgroundColor: product.accent }}
      >
        <Image
          src={product.image}
          alt=""
          width={900}
          height={928}
          sizes={
            large
              ? "(min-width: 1024px) 44vw, 92vw"
              : "(min-width: 1024px) 22vw, 46vw"
          }
          className="h-auto w-full scale-110 transition-transform duration-(--dur-slow) ease-brand group-hover:scale-[1.03]"
        />
      </div>
      <div className="rule-t mt-3 flex items-start justify-between gap-3 pt-2">
        <div>
          <h3 className={large ? "display-3" : "spec-value font-semibold"}>
            {product.name}
          </h3>
          <p className="spec-value text-ink-soft mt-1">{product.strapline}</p>
        </div>
        <PlateNo n={product.plate} className="text-ink-soft shrink-0 pt-1" />
      </div>
    </button>
  );
}

/** Detail panel. A dialog, because 26 inline expansions would wreck the grid. */
function Detail({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const node = ref.current;
    node?.focus();
    document.body.style.overflow = "hidden";

    const FOCUSABLE =
      'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Trap Tab inside the dialog. Without this, focus walks out into the page
      // behind the overlay and the modal stops being modal.
      if (e.key !== "Tab" || !node) return;
      const items = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [onClose]);

  const hasFragrances = FRAGRANCE_RANGE_SLUGS.has(product.slug);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
      role="presentation"
    >
      {/* The scrim fades and the panel rises from the edge it is anchored to -
          up from the bottom on a phone, out of the page on a desktop. A dialog
          that simply exists reads as a page change; one that arrives from
          somewhere reads as a layer over the grid the reader was just in, and
          they keep their place. */}
      <div
        className="bg-ink-black/55 dialog-scrim absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`d-${product.slug}`}
        tabIndex={-1}
        className="bg-paper scroll-slim dialog-panel relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto md:h-[min(92dvh,42rem)] md:overflow-hidden"
      >
        {/* TWO INDEPENDENT PANELS on desktop.
            The dialog owns the height; neither column decides it. That is what
            lets the plate sit dead centre of its own panel no matter how long
            the copy runs, and it means the two sides no longer share a scroll
            position - the left one simply does not scroll.
            Below md there are no panels: it is one column and one scroller. */}
        <div className="grid grid-cols-1 md:h-full md:grid-cols-2">
          {/* THE PLATE PANEL - fixed, never scrolls.
              object-CONTAIN, not cover. The plate is roughly square and this
              column is tall, so `cover` was scaling to fill the height and
              slicing the product off at both sides. Because the artwork already
              runs edge-to-edge in the product's own accent, letterboxing
              against that same accent is invisible.
              `fill` + `object-contain` centres on both axes for free, so with
              the panel at full height the plate is always centred.
              Shown on mobile too — hiding the product inside a product dialog
              was the wrong call. */}
          <div
            className="relative aspect-square md:aspect-auto md:h-full"
            style={{ backgroundColor: product.accent }}
          >
            <Image
              src={product.image}
              alt={`${product.name} - ${product.strapline}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>

          {/* THE COPY PANEL - the only scroller on desktop. */}
          <div className="scroll-slim md:h-full md:overflow-y-auto">
            {/* Pinned. The close button scrolling out of reach left Escape and
                a blind overlay click as the only ways out of the dialog. */}
            {/* pb-2 so scrolling copy is cut a few pixels clear of the
                hairline rather than slicing along it */}
            <div className="bg-paper sticky top-0 z-10 px-6 pt-6 pb-2 sm:px-9 sm:pt-9">
              <div className="rule-b flex items-baseline justify-between gap-4 pb-3">
                <PlateNo n={product.plate} className="text-ink-soft" />
                <button
                  type="button"
                  onClick={onClose}
                  className="spec-label text-ink-soft hover:text-flame-deep transition-colors duration-(--dur-quick)"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-9 sm:pb-9">
            <h3 id={`d-${product.slug}`} className="display-2 mt-6">
              {product.name}
            </h3>
            <p className="spec-label text-flame-deep mt-3">
              {product.strapline}
            </p>
            {product.tagline ? (
              <p className="prose-lead text-ink-deep/80 mt-5">
                {product.tagline}
              </p>
            ) : null}

            <p className="prose-body text-ink-deep/75 mt-5">
              {product.description}
            </p>

            <dl className="mt-8">
              <SpecRow label="Application" value={product.application} />
              <SpecRow
                label={
                  product.methodVerb === "mainly used by"
                    ? "Mainly used by"
                    : "Works through"
                }
                value={product.method}
              />
              {product.specs?.map((s) => (
                <SpecRow key={s.label} label={s.label} value={s.value} />
              ))}
              {hasFragrances ? (
                <SpecRow label="Fragrances" value={FRAGRANCES.join(" · ")} />
              ) : null}
            </dl>

            <p className="spec-value text-ink-soft rule-t mt-8 pt-4">
              Specifications as printed in the Leocym product catalogue.
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
