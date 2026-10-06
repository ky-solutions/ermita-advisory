import {
  Hero,
  ExpertiseGrid,
  ProcessSection,
  ContactBanner,
} from "@/components/sections";
import { Container, SectionLabel, TextLink } from "@/components/ui";
import { home } from "@/content/site";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Accueil", site.description, "/");
export default function Home() {
  return (
    <>
      <Hero
        label="Ingénierie financière & conseil en management"
        title={
          <>
            Éclairer vos décisions financières.
            <br />
            <span className="accent">Structurer votre développement.</span>
          </>
        }
        intro={home.intro}
      />
      <Container>
        <section
          className="section split ruled"
          aria-labelledby="cabinet-heading"
        >
          <div>
            <SectionLabel>Le cabinet</SectionLabel>
            <h2 id="cabinet-heading">
              Donner une direction claire à vos ambitions.
            </h2>
          </div>
          <div>
            <p>{home.cabinet}</p>
            <TextLink href="/le-cabinet">Découvrir le cabinet</TextLink>
          </div>
        </section>
        <section
          aria-labelledby="expertises-heading"
          id="expertises"
          className="section expertise-section"
        >
          <SectionLabel>Nos expertises</SectionLabel>
          <h2 id="expertises-heading">
            Quatre expertises
            <br />
            <span className="accent">au service de vos décisions.</span>
          </h2>
          <ExpertiseGrid />
        </section>
      </Container>
      <ProcessSection />
      <ContactBanner />
    </>
  );
}
