import { Container, ButtonLink, SectionLabel } from "@/components/ui";
export const metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <Container>
      <section className="page-heading" aria-labelledby="not-found-title">
        <SectionLabel>Erreur 404</SectionLabel>
        <h1 id="not-found-title">Cette page est introuvable.</h1>
        <p>
          Retrouvez nos expertises ou revenez à l’accueil pour poursuivre votre
          visite.
        </p>
        <div className="hero-actions">
          <ButtonLink href="/">Retour à l’accueil</ButtonLink>
          <ButtonLink href="/contact">Nous contacter</ButtonLink>
        </div>
      </section>
    </Container>
  );
}
