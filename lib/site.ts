/** Public settings only. No invented production domain or contact details. */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
function siteOrigin() {
  if (!configuredUrl) return "http://localhost:3000";
  const url = new URL(configuredUrl);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("NEXT_PUBLIC_SITE_URL doit être une URL HTTP(S).");
  return url.origin;
}
export const SITE_URL = siteOrigin();
export const isIndexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
if (isIndexable && !configuredUrl)
  throw new Error("NEXT_PUBLIC_SITE_URL est requis pour activer l’indexation.");
export const site = {
  name: "Ermita Advisory",
  title: "Ermita Advisory | Ingénierie financière & conseil en management",
  description:
    "Ermita Advisory, cabinet de conseil à Paris : ingénierie financière, pilotage de la performance, stratégie et accompagnement de vos projets de développement.",
  logo: "/logo/ermita-advisory-logo-transparent.png",
  // BLOQUÉ : coordonnées publiques confirmées par le cabinet.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "",
  telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "",
};
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;
