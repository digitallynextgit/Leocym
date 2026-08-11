import type { Metadata } from "next";
import { Lora, Montserrat, Open_Sans, Italianno } from "next/font/google";
import { SITE } from "@/content/site";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${lora.variable} ${montserrat.variable} ${openSans.variable} ${italianno.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
