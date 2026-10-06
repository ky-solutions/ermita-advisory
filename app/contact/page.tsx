import { ContactForm } from "@/components/contact-form";
import { Container, SectionLabel } from "@/components/ui";
import { contactConfigured } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Contact",
  "Présentez votre besoin à Ermita Advisory : décision financière, pilotage, stratégie ou accompagnement de projets.",
  "/contact",
);
export default function Contact() {
  return (
    <div className="contact-page">
      <Container>
        <section className="page-heading" aria-labelledby="page-title">
          <SectionLabel>Contact</SectionLabel>
          <h1 id="page-title">
            Parlons <span className="accent">de vos enjeux.</span>
          </h1>
          <p>
            Vous souhaitez préparer une décision financière, améliorer votre
            pilotage ou structurer un projet ? Présentez-nous votre besoin et
            les objectifs que vous souhaitez atteindre.
          </p>
        </section>
        <div className="contact-layout">
          <ContactForm configured={contactConfigured()} />
          <aside>
            <h2>Ermita Advisory</h2>
            <address className="not-italic">
              95 boulevard Berthier
              <br />
              75017 Paris, France
            </address>
            <p className="mt-6 text-sm">
              Les coordonnées e-mail et téléphone seront ajoutées après
              confirmation par le cabinet.
            </p>
          </aside>
        </div>
      </Container>
    </div>
  );
}
