import { absoluteUrl, site } from "@/lib/site";
import type { Expertise } from "@/content/site";
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function OrganizationData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": absoluteUrl("/#organisation"),
        name: site.name,
        url: absoluteUrl("/"),
        logo: absoluteUrl(site.logo),
        description:
          "Ingénierie financière, pilotage de la performance, stratégie et accompagnement de projets.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "95 boulevard Berthier",
          postalCode: "75017",
          addressLocality: "Paris",
          addressCountry: "FR",
        },
        ...(site.email ? { email: site.email } : {}),
        ...(site.telephone ? { telephone: site.telephone } : {}),
      }}
    />
  );
}
export function ExpertiseData({ expertise }: { expertise: Expertise }) {
  const url = absoluteUrl(`/expertises/${expertise.slug}`);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          url,
          name: expertise.name,
          description: expertise.description,
          provider: { "@id": absoluteUrl("/#organisation") },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Nos expertises",
              item: absoluteUrl("/#expertises"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: expertise.name,
              item: url,
            },
          ],
        }}
      />
    </>
  );
}
