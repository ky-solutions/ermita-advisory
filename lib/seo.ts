import type { Metadata } from "next";
import { expertises } from "@/content/site";
import { absoluteUrl, site } from "./site";
export const routes = [
  "/",
  "/le-cabinet",
  "/contact",
  ...expertises.map((e) => `/expertises/${e.slug}`),
  "/mentions-legales",
  "/confidentialite",
];
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = path === "/" ? site.title : `${title} | ${site.name}`;
  const url = absoluteUrl(path);
  const images = [
    {
      url: absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
      alt: site.name,
    },
  ];
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: "website",
      locale: "fr_FR",
      siteName: site.name,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}
export function pageMetadata(title: string, description: string, path: string) {
  return buildMetadata({ title, description, path });
}
