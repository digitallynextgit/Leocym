import type { MetadataRoute } from "next";
import { CTA, NAV, SITE } from "@/content/site";

/**
 * Generated from the same NAV array the header and footer render, so a page can
 * never be added to the navigation and quietly left out of the sitemap.
 *
 * /review and /llms.txt are deliberately absent: the first is the internal copy
 * approval sheet and is noindex, the second is a plain-text brief for answer
 * engines rather than a page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...NAV.map((item) => ({
      url: `${SITE.url}${item.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      // The catalogue is the page most searches should land on after the
      // homepage; the rest are equal.
      priority: item.href === "/products" ? 0.9 : 0.8,
    })),
    {
      url: `${SITE.url}${CTA.href}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
