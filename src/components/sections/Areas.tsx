import Image from "next/image";
import { AREAS, AREAS_COUNT } from "@/content/misc";
import { Counter, Reveal, SectionLabel, Stagger } from "@/components/ui";
import { Icon } from "@/components/Icon";

/**
 * Section 7 - Where it's used.
 *
 * Catalogue p.4, 27 environments. Set as a dense typographic index rather than
 * a grid of icon tiles - the point is breadth, and a list carries breadth far
 * better than twenty-seven rounded squares.
 *
 * Two photographs give the list somewhere to breathe. They are contextual, not
 * evidential, which is why stock is the right choice here.
 */
export function Areas() {
  return (
    <section id="areas" className="gutter measure-wide section-y-lg">
      <Reveal>
        <header className="rule-t flex flex-col gap-6 pt-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel>Where it&rsquo;s used</SectionLabel>
            <h2 className="display-1 mt-4 max-w-[17ch]">
              The same chemistry, from a washroom to a landfill.
            </h2>
          </div>
          {/* The count runs up as the section arrives. Twenty-seven is the
              argument here — breadth — and a number that lands rather than a
              number that is simply printed is the difference between a reader
              registering it and skimming past it. */}
          <p className="spec-label text-ink-soft nums shrink-0">
            <Counter to={AREAS_COUNT} /> environments listed
          </p>
        </header>
      </Reveal>

      <div className="mt-10 grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <Stagger
          delay={70}
          step={90}
          className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8"
        >
          {AREAS.map((group) => (
            <div key={group.group}>
              <h3 className="group rule-b flex items-center gap-2.5 pb-3">
                <span className="text-flame-deep shrink-0">
                  <Icon name={group.icon} size={22} />
                </span>
                <span className="spec-label text-flame-deep">
                  {group.group}
                </span>
              </h3>
              <ul className="mt-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="prose-body text-ink-deep/80 hover:text-ink py-1 leading-snug transition-[color,transform] duration-(--dur-quick) ease-brand hover:translate-x-1"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Stagger>

        <Stagger
          delay={130}
          step={120}
          variant="scale"
          className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-1"
        >
          {[
            { src: "/stock/area-hotel.webp", alt: "A hotel lobby" },
            {
              src: "/stock/area-kitchen.webp",
              alt: "A commercial kitchen with stainless steel ranges",
            },
          ].map((img) => (
            <div
              key={img.src}
              className="rounded-photo plate-depth parallax relative aspect-[3/2]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 26vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
