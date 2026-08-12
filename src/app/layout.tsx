import type { Metadata } from "next";
import { Lora, Montserrat, Open_Sans, Italianno } from "next/font/google";
import { SITE } from "@/content/site";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";

/* Brand-mandated faces (Rudione Brand Guidelines, Part 5).
   Lora carries the argument. Montserrat carries the evidence.
   Open Sans carries long prose. Italianno appears exactly once on the site. */

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

const italianno = Italianno({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italianno",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - ${SITE.tagline}`,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "odour neutraliser India",
    "how to remove drain smell",
    "odour eliminator",
    "French odour technology",
    "eco friendly cleaning products India",
    "industrial odour control",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
  // Preview deployments must never be indexed (WEBSITE-PLAN.md §6).
  robots: SITE.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

/**
 * The shell every page shares: skip link, header, main, footer.
 *
 * These used to live inside page.tsx when the site was a single page. Hoisting
 * them here is what makes the header's sticky position and its open mobile
 * panel survive a client-side navigation instead of being torn down and rebuilt
 * on every page change.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${lora.variable} ${montserrat.variable} ${openSans.variable} ${italianno.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/* Sets the `js` flag BEFORE the first paint.
            Every scroll entrance in globals.css is gated on `.js`, which is
            what keeps the site fully readable with JavaScript off - the hidden
            state is never applied if this never runs. It used to be set from
            an effect inside <Reveal>, which meant the browser painted the
            content, then hid it, then faded it back in: a flash on every load.
            Two lines of inline script in the document remove the flash
            entirely, and there is nothing here to hydrate. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        <a
          href="#content"
          className="ui-text bg-ink text-paper sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:px-5 focus:py-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="content" className="flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
