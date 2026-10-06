import type { MetadataRoute } from "next";
import { SITE_URL, isIndexable } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return isIndexable
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${SITE_URL}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
