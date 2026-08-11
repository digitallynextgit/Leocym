import { CTA, RETAIL, SITE } from "@/content/site";
import { CLEANING_PRODUCTS, ODOUR_PRODUCTS } from "@/content/products";
import { Petal, Reveal, TextLink } from "@/components/ui";

/**
 * WHERE TO BUY — sitemap Part C, item 6.
 * Marketing Strategy §6.3.3: "links to the Rudione website (never to Amazon)".
 *
 * This is the ONE place on the site where the distributor is named, and the
 * naming is a text link only — no logo, no lockup, no co-branding, because this
 * is Leocym's own channel and it carries the Leocym logo only (Brand Guidelines
 * Part 2). `scripts/check-claims.mjs` allows the name in this file and in
 * content/site.ts, and fails the build if it turns up anywhere else.
 *
 * Marketplaces are deliberately not linked. The strategy's reasoning is worth
 * keeping in view: sending traffic we generated ourselves to a marketplace
 * hands over both the customer relationship and a fee on a sale we had already
 * won. The link goes to a site the group controls.
 *
 * Note what is still absent here: a price, a pack size with a number beside it,
 * a "shop now", an availability badge. Handing a reader to the shop is not the
 * same as becoming one.
 */
export function WhereToBuy() {
  return (
    <div className="gutter measure-wide pb-16">
      {/* ---- The hand-off ---- */}
      <Reveal>
        <div className="rule-t grid gap-x-14 gap-y-8 pt-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="plate-no text-flame-deep">01 / To buy</p>
            <h2 className="display-2 mt-3">In India.</h2>
          </div>

          <div className="lg:col-span-9">
            <p className="prose-lead text-ink-deep/80 measure-text">
              The Leocym range is imported and distributed in India by{" "}
              {RETAIL.name}. They hold the stock, they take the orders, and they
              run both the consumer and the business side. This site explains
              the technology; theirs is where it is sold.
            </p>

            {/* The one outbound commercial link on the site. Given real weight,
                because burying it in body copy would be a worse experience than
                the marketplace listing it exists to replace. */}
            <a
              href={RETAIL.url}
              target="_blank"
              rel="noreferrer"
              className="group rule-all hover:border-ink hover:bg-paper-2 mt-7 flex flex-col gap-4 rounded-sm p-6 transition-colors duration-(--dur-base) sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <span>
                <span className="spec-label text-ink-soft">{RETAIL.role}</span>
                <span className="display-2 group-hover:text-flame-deep mt-2 block transition-colors duration-(--dur-quick)">
                  {RETAIL.name}
                </span>
                <span className="spec-value text-ink-soft mt-1.5 block">
                  {RETAIL.url.replace(/^https?:\/\//, "")}
                </span>
              </span>
              <span className="ui-text bg-flame text-ink group-hover:bg-flame-deep group-hover:text-paper inline-flex shrink-0 items-center gap-2.5 px-6 py-3 transition-colors duration-(--dur-quick)">
                Visit the shop
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path
                    d="M4 10 10 4M5 4h5v5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>

            <p className="spec-value text-ink-soft mt-3">
              Opens in a new tab. You are leaving leocym.com.
            </p>
          </div>
        </div>
      </Reveal>

      {/* ---- What is on the other side ---- */}
      <Reveal delay={80}>
        <div className="rule-t mt-12 grid gap-x-14 gap-y-8 pt-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="plate-no text-flame-deep">02 / What you will find</p>
            <h2 className="display-2 mt-3">Two counters.</h2>
          </div>

          <div className="lg:col-span-9">
            <dl className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              <div className="rule-t py-4">
                <dt className="display-3">For your home</dt>
                <dd className="prose-body text-ink-deep/70 mt-1.5">
                  Single units of the products a household actually reaches for
                  — drains, urine, garbage, smoke, carpets — plus the cleaning
                  range. Ordered like anything else.
                </dd>
              </div>
              <div className="rule-t py-4">
                <dt className="display-3">For your business</dt>
                <dd className="prose-body text-ink-deep/70 mt-1.5">
                  Volume supply and repeat supply for facilities, hotels,
                  hospitals, food businesses and contractors, with the
                  large-format packs and the equipment that goes with them.
                </dd>
              </div>
              <div className="rule-t py-4">
                <dt className="display-3">The whole range</dt>
                <dd className="prose-body text-ink-deep/70 mt-1.5">
                  All {ODOUR_PRODUCTS.length} odour neutralisers and{" "}
                  {CLEANING_PRODUCTS.length} cleaning and hygiene products, in
                  the pack sizes each one is made in.
                </dd>
              </div>
              <div className="rule-t py-4">
                <dt className="display-3">Not on a marketplace</dt>
                <dd className="prose-body text-ink-deep/70 mt-1.5">
                  We point buyers at the distributor&rsquo;s own site rather than
                  at a marketplace listing, so the order, the record and the
                  person you can call afterwards all stay in one place.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>

      {/* ---- The other route ---- */}
      <Reveal delay={120}>
        <div className="rule-t mt-12 grid gap-x-14 gap-y-8 pt-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="plate-no text-flame-deep">03 / Or ask us first</p>
            <h2 className="display-2 mt-3">Before you order.</h2>
          </div>

          <div className="lg:col-span-9">
            <p className="prose-lead text-ink-deep/80 measure-text">
              A large site, a recurring problem or a smell that has already
              survived two other products is worth a conversation before it is
              worth a basket. The range is deliberately specific, and the wrong
              specific product works no better than a fragrance.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
              <TextLink href={CTA.href}>Send a business enquiry</TextLink>
              <a
                href={`mailto:${SITE.contact.email}?subject=Leocym%20enquiry`}
                className="ui-text text-ink-soft hover:text-flame-deep transition-colors duration-(--dur-quick)"
              >
                {SITE.contact.email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <Petal size={26} className="text-ink-faint mx-auto mt-10" />
      </Reveal>
    </div>
  );
}
