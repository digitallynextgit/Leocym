import { FRAGRANCES, PRODUCTS } from "@/content/products";
import { Petal, Reveal } from "@/components/ui";

/**
 * The problems the range is organised around, running as one continuous line.
 *
 * WHY THIS EARNS ITS PLACE. The single most persuasive fact about this
 * catalogue is that it is indexed by SOURCE rather than by scent — there is a
 * product for drains and a different one for fish, because those are different
 * chemistry problems. Said in a sentence that is a claim. Set as an unbroken
 * run of nouns that keeps arriving, it is self-evidently true, and it is the
 * one place on the site where the sheer breadth of the range is the message.
 *
 * Nothing here is written by hand: the list is every distinct `problem` in
 * content/products.ts, in catalogue order, so it cannot fall out of step with
 * the range it describes.
 *
 * Mechanics. The run is rendered twice and the track translates by exactly
 * -50%, so the second copy is under the cursor at the moment the first would
 * have run out and the seam never arrives. It pauses on hover and on
 * focus-within — a moving list you cannot stop is a moving list you cannot
 * read — and under prefers-reduced-motion it does not move at all and becomes
 * an ordinary horizontally scrollable strip (see globals.css §5).
 */
export function Ticker() {
  const problems = [...new Set(PRODUCTS.map((p) => p.problem))];

  /* One item, in the shape it appears in both copies. */
  const run = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {problems.map((problem) => (
        <li key={problem} className="flex items-center">
          <span className="display-1 text-ink whitespace-nowrap">{problem}</span>
          {/* `flame-deep`, not `flame`. The bright orange measures about 2:1 on
              this ground - it would read as a smudge rather than as a mark. */}
          <Petal
            draw={false}
            size={18}
            strokeWidth={2}
            className="text-flame-deep mx-10 shrink-0 sm:mx-14"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-labelledby="ticker-heading"
      /* `paper-3`, the deepest paper, and this band is why that step exists.
         It sits between the range on plain paper and the industrial argument
         on indigo, so it is the middle of a three-step ramp - light, deeper,
         dark - instead of a cut straight from cream to navy.

         It was briefly indigo, which was worse: the section below is also
         indigo, so the two merged into one long dark stretch with an
         unexplained orange rule through the middle of it. Two adjacent bands
         have to differ in tone or they are not two bands. */
      className="bg-paper-3 band overflow-hidden"
    >
      <Reveal className="gutter measure-wide pt-16 sm:pt-20">
        {/* Both numbers are derived, and the contrast between them IS the
            argument: a range indexed by source needs one product per source,
            where a range indexed by scent needs one product in six scents. */}
        <h2
          id="ticker-heading"
          className="spec-label nums text-ink-soft flex items-center gap-4"
        >
          <span
            aria-hidden="true"
            className="draw-x bg-flame h-0.5 w-7 shrink-0"
          />
          Organised around {problems.length} problems, not around{" "}
          {FRAGRANCES.length} fragrances
        </h2>
      </Reveal>

      <div className="ticker-stop py-10 sm:py-14">
        <div className="ticker-track flex w-max items-center">
          {run(false)}
          {run(true)}
        </div>
      </div>

      <p className="gutter measure-wide prose-body text-ink-deep/70 pb-16 sm:pb-20">
        Each one is a different chemistry problem, so each one is a different
        product.
      </p>
    </section>
  );
}
