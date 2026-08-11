import {
  CERTIFICATIONS,
  CLAIMS_POSITION,
  DOCUMENTATION,
  HANDLING,
} from "@/content/compliance";
import { CLEANING_PRODUCTS } from "@/content/products";
import { SITE } from "@/content/site";
import { Action, Petal, Reveal, SpecRow } from "@/components/ui";

/**
 * CERTIFICATIONS & SAFETY INFORMATION — sitemap Part C, item 5.
 *
 * The hard part of this page is what it does NOT do. A certifications page is
 * the most tempting place on any product site to reach for a row of authentic
 * looking badges, and there is no certificate documentation in this project. So
 * the register below renders from `CERTIFICATIONS` in content/compliance.ts,
 * which is empty on purpose, and the empty state says so plainly rather than
 * being padded out with something that reads like a certification and is not
 * one. The moment a real certificate is supplied, the table appears.
 *
 * What the page can stand behind, it states in full: the composition printed on
 * the packs, the handling rules from the labels, the documents a compliance
 * officer can request by name, and the company's claims position — including
 * the claims it refuses to make.
 */

/** Derived from the product data, never asserted by hand. */
const originShare = (() => {
  const v = CLEANING_PRODUCTS.map(
    (p) => p.specs?.find((s) => s.label === "Composition")?.value ?? "",
  )
    .map((s) => parseInt(s, 10))
    .filter((n) => !Number.isNaN(n));
  const min = Math.min(...v);
  const max = Math.max(...v);
  return min === max ? `${min}%` : `${min}-${max}%`;
})();

const fragranceFree = CLEANING_PRODUCTS.filter((p) =>
  p.specs?.some((s) => s.value.toLowerCase().includes("fragrance-free")),
).length;

const shelfLife =
  CLEANING_PRODUCTS.flatMap((p) => p.specs ?? []).find(
    (s) => s.label === "Storage",
  )?.value ?? "As printed on the pack";

/* -------------------------------------------------------------------------- */

function Block({
  index,
  title,
  standfirst,
  children,
}: {
  index: string;
  title: string;
  standfirst?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="rule-t grid gap-x-14 gap-y-6 pt-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="plate-no text-flame-deep">{index}</p>
          <h2 className="display-2 mt-3">{title}</h2>
        </div>
        <div className="lg:col-span-9">
          {standfirst ? (
            <p className="prose-lead text-ink-deep/80 measure-text">
              {standfirst}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </Reveal>
  );
}

/** A label / body pair, used by three of the four blocks. */
function Notes({
  items,
  columns = 2,
}: {
  items: readonly { label: string; body: string }[];
  columns?: 1 | 2;
}) {
  return (
    <dl
      className={`mt-6 grid grid-cols-1 gap-x-12 ${
        columns === 2 ? "sm:grid-cols-2" : ""
      }`}
    >
      {items.map((item) => (
        <div key={item.label} className="rule-t py-4">
          <dt className="display-3">{item.label}</dt>
          <dd className="prose-body text-ink-deep/70 mt-1.5">{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------------- */

export function Compliance() {
  return (
    <div className="gutter measure-wide space-y-12 pb-16 lg:space-y-16">
      {/* ---- 01 Composition ---- */}
      <Block
        index="01 / Composition"
        title="What is in it."
        standfirst={
          <>
            {originShare} of the ingredients across the cleaning range are of
            plant and mineral origin, and the exact proportion is printed on each
            individual product. {fragranceFree} of them are formulated without
            fragrance at all, for food-industry and fragrance-sensitive
            environments.
          </>
        }
      >
        <dl className="mt-6">
          <SpecRow
            label="Plant & mineral"
            value={`${originShare} across the cleaning range, stated per product`}
          />
          <SpecRow
            label="Fragrance-free"
            value={`${fragranceFree} of ${CLEANING_PRODUCTS.length} cleaning products`}
          />
          <SpecRow label="Shelf life" value={shelfLife} />
          <SpecRow
            label="Exact figures"
            value="Printed on the pack, and on the safety data sheet for that product"
          />
        </dl>
      </Block>

      {/* ---- 02 Safety and handling ---- */}
      <Block
        index="02 / Safety"
        title="How it is handled."
        standfirst="Transcribed from the pack labels. Where this page and a pack ever disagree, the pack is the one that counts — it is the document that shipped with the product you are holding."
      >
        <Notes items={HANDLING} />
      </Block>

      {/* ---- 03 Certifications ---- */}
      <Block
        index="03 / Certifications"
        title="What is certified."
        standfirst={
          CERTIFICATIONS.length > 0
            ? "Each certificate below is supplied as issued, with its issuing body and reference, so it can be verified independently."
            : undefined
        }
      >
        {CERTIFICATIONS.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr>
                  {["Certification", "Issued by", "Reference", "Scope"].map(
                    (h) => (
                      <th
                        key={h}
                        scope="col"
                        className="spec-label text-ink-soft rule-b pb-3"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {CERTIFICATIONS.map((c) => (
                  <tr key={c.reference} className="rule-b align-top">
                    <td className="spec-value py-4 pr-6 font-semibold">
                      {c.name}
                    </td>
                    <td className="spec-value py-4 pr-6">{c.issuer}</td>
                    <td className="spec-value nums py-4 pr-6">{c.reference}</td>
                    <td className="spec-value text-ink-deep/70 py-4">
                      {c.scope}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* The honest empty state. A certifications page with nothing to
             certify is far better than one decorated with badges nobody
             issued — and a reader who needs a certificate can get the real
             document today by asking for it. */
          <div className="rule-all rounded-sm bg-paper-2 mt-6 p-6 sm:p-8">
            <p className="display-3">
              Certificates are issued per product and per site, and are supplied
              on request rather than published as badges.
            </p>
            <p className="prose-body text-ink-deep/75 measure-text mt-4">
              We would rather send you the document than show you a logo. Name
              the product and the certification your audit, tender or
              food-safety file needs, and we will send what is held for it — as
              issued, with the issuing body and reference on it. If something is
              not held, we will tell you that instead of implying otherwise.
            </p>
          </div>
        )}
      </Block>

      {/* ---- 04 Documentation ---- */}
      <Block
        index="04 / Documentation"
        title="What we can send you."
        standfirst="For the site file, the tender pack, the HACCP file or the audit. Ask for it by name and it comes back as the document, not as a summary of the document."
      >
        <Notes items={DOCUMENTATION} />
        <div className="rule-t mt-8 flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="prose-body text-ink-deep/70 max-w-[46ch]">
            Tell us the product and the document. If you are compiling a tender
            response, say so — it usually needs four of these at once.
          </p>
          <Action href="/contact" className="shrink-0">
            Request documentation
          </Action>
        </div>
      </Block>

      {/* ---- 05 Claims ---- */}
      <Block
        index="05 / Claims"
        title="What we will and will not say."
        standfirst="Published here rather than kept as an internal rule, because a supplier that states its own limits is easier to trust than one that states a number nobody can check."
      >
        <Notes items={CLAIMS_POSITION} />
        <p className="spec-value text-ink-soft rule-t mt-6 pt-4">
          Questions about a claim, a certificate or a safety data sheet go to{" "}
          <a
            href={`mailto:${SITE.contact.email}?subject=Documentation%20request`}
            className="text-flame-deep hover:text-flame underline decoration-1 underline-offset-4 transition-colors duration-(--dur-quick)"
          >
            {SITE.contact.email}
          </a>
          .
        </p>
      </Block>

      <Reveal>
        <Petal size={30} className="text-ink-faint mx-auto" />
      </Reveal>
    </div>
  );
}
