import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/**
 * Preview deployments must never be indexed (WEBSITE-PLAN.md §6).
 * AI crawlers are explicitly welcomed on production: being the quotable default
 * answer is the whole point of the Questions section.
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE.indexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
