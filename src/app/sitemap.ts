import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/**
 * One page in v1 by decision (WEBSITE-PLAN.md §4). When the 26 product pages
 * and 5 industrial pages land in v2 they are added here from the same typed
 * content files, so this never has to be hand-maintained.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
