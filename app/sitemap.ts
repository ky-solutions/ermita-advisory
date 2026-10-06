import type { MetadataRoute } from "next";
import { routes } from "@/lib/seo";
import { absoluteUrl, isIndexable } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return isIndexable ? routes.map((path) => ({ url: absoluteUrl(path) })) : [];
}
