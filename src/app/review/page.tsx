import type { Metadata } from "next";
import { APPROVED_CLAIMS, FORBIDDEN_LANGUAGE } from "@/content/claims";
import { FAQ, PROCEDURE, AREAS } from "@/content/misc";
import { PRODUCTS } from "@/content/products";
import { INDUSTRIAL } from "@/content/industrial";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Copy review sheet",
  robots: { index: false, follow: false },
};

/**
 * /review - the approval sheet.
 *
 * Marketing Strategy §13.7 and §14.3: all marketing content is reviewed at
 * least one week before it goes live, and nothing publishes without
 * Ms. Priya Lalani's sign-off.
 *
 * This page renders every claim and every line of product copy on the site as
 * one scrollable list, so it can be approved without clicking through the whole
 * site. It is noindex and is not linked from the site.
 */
export default function ReviewPage() {
  return (
    <div className="gutter measure-standard py-16">
      <header className="rule-b pb-8">
        <p className="spec-label text-flame-deep">Internal</p>
        <h1 className="display-1 mt-4">Copy review sheet</h1>
        <p className="prose-lead text-ink-soft measure-text mt-5">
          Every claim and every line of product copy on leocym.com, in one
          place, for approval ahead of go-live. Not indexed, not linked from the
          site.
        </p>
      </header>

      <Block title="Approved claims used on this site">
        <ul>
          {APPROVED_CLAIMS.map((c) => (
            <li key={c.id} className="rule-b py-4">
              <p className="prose-body">{c.text}</p>
              <p className="spec-label text-ink-soft mt-2">{c.source}</p>
            </li>
          ))}
        </ul>
        <p className="prose-body text-ink-soft mt-6">
          No new specific or number-based performance claim appears anywhere on
          the site. There is no laboratory test data, so none is implied.
        </p>
      </Block>

      <Block title="Language that must never appear">
        <p className="spec-value text-ink-soft">
          {FORBIDDEN_LANGUAGE.join("  ·  ")}
        </p>
      </Block>

      <Block title={`Product copy - ${PRODUCTS.length} products`}>
        {PRODUCTS.map((p) => (
          <article key={p.slug} className="rule-b py-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="display-3">{p.name}</h3>
              <span className="plate-no text-ink-soft">
                Pl. {String(p.plate).padStart(2, "0")} · {p.family}
              </span>
            </div>
            <p className="spec-label text-flame-deep mt-3">{p.strapline}</p>
            {p.tagline ? (
              <p className="prose-body mt-3 italic">{p.tagline}</p>
            ) : null}
            <p className="prose-body text-ink-deep/80 mt-3">{p.description}</p>
            <p className="prose-body text-ink-deep/80 mt-3">
              <strong className="spec-label">Application - </strong>
              {p.application}
            </p>
            <p className="spec-value text-ink-soft mt-3">
              {p.methodVerb} {p.method}
              {p.specs?.length
                ? ` · ${p.specs.map((s) => `${s.label}: ${s.value}`).join(" · ")}`
                : ""}
            </p>
          </article>
        ))}
      </Block>

      <Block title="Questions and answers (published as structured data)">
        {FAQ.map((f) => (
          <div key={f.q} className="rule-b py-5">
            <h3 className="display-3">{f.q}</h3>
            <p className="prose-body text-ink-deep/80 mt-2">{f.a}</p>
          </div>
        ))}
      </Block>

      <Block title="Industrial segments">
        {INDUSTRIAL.map((s) => (
          <div key={s.slug} className="rule-b py-5">
            <h3 className="display-3">
              {s.index} - {s.title}
            </h3>
            <p className="prose-body text-ink-deep/80 mt-2">{s.premise}</p>
            <p className="spec-value text-ink-soft mt-3">
              Areas: {s.areas.join(", ")}
            </p>
            <p className="spec-value text-ink-soft mt-1">
              Techniques: {s.techniques.join(", ")}
            </p>
          </div>
        ))}
      </Block>

      <Block title="Method">
        <ol>
          {PROCEDURE.map((s) => (
            <li key={s.n} className="rule-b py-3">
              <span className="plate-no text-flame-deep">{s.n}</span>{" "}
              <strong className="spec-value">{s.title}</strong>{" "}
              <span className="prose-body text-ink-deep/80">{s.body}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Areas of use">
        {AREAS.map((g) => (
          <p key={g.group} className="rule-b py-3">
            <span className="spec-label text-flame-deep">{g.group}</span>{" "}
            <span className="prose-body text-ink-deep/80">
              {g.items.join(", ")}
            </span>
          </p>
        ))}
      </Block>

      <Block title="Contractual checks">
        <ul className="prose-body">
          {[
            "Leocym logo only. No other brand mark exists in this repository — the distributor gets a text link on 'where to buy', never a logo.",
            "The distributor is named in exactly two files (content/site.ts and the Where-to-buy section). The build fails if the name appears anywhere else.",
            "Buying traffic goes to the distributor's own site, never to a marketplace (Marketing Strategy §6.3.3).",
            "No price, no cart, no checkout, and no such field exists in the type system.",
            "No discount, price-comparison or urgency language anywhere.",
            "One CTA only per page: the header button and the closing contact section.",
            "Non-product photography is CC0 / public domain; provenance in public/stock/CREDITS.json.",
          ].map((c) => (
            <li key={c} className="rule-b py-3">
              {c}
            </li>
          ))}
        </ul>
      </Block>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="display-2 rule-b pb-3">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
