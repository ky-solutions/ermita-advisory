import Image from "next/image";
import Link from "next/link";
import { expertises, method, type Expertise } from "@/content/site";
import { site } from "@/lib/site";
import { Arrow, BrandLogo, ButtonLink, Container, SectionLabel } from "./ui";
export function Hero({
  label,
  title,
  intro,
  cta = "Parlons de votre projet",
  expertise = false,
  breadcrumbs,
}: {
  label: string;
  title: React.ReactNode;
  intro: string;
  cta?: string;
  expertise?: boolean;
  breadcrumbs?: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby="hero-title"
      className={`hero ${expertise ? "expertise-hero" : ""}`}
    >
      <div className="hero-copy">
        {breadcrumbs}
        <SectionLabel>{label}</SectionLabel>
        <h1 id="hero-title">{title}</h1>
        <p className="hero-intro">{intro}</p>
        <div className="hero-actions">
          <ButtonLink>{cta}</ButtonLink>
          {!expertise && (
            <Link className="text-link" href="/#expertises">
              Découvrir nos expertises <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
      </div>
      <div className="hero-photo">
        <Image
          src={
            expertise
              ? "/images/expertise-escalier.webp"
              : "/images/hero-facade.webp"
          }
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 48vw"
          priority
        />
        <span className="photo-caption">
          Une perspective claire.
          <br />
          Un cap défini.
        </span>
      </div>
    </section>
  );
}
export function ExpertiseCard({
  item,
  index,
}: {
  item: Expertise;
  index: number;
}) {
  return (
    <Link
      className="expertise-card"
      aria-labelledby={`expertise-${item.slug}`}
      href={`/expertises/${item.slug}`}
    >
      <span className="number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 id={`expertise-${item.slug}`}>{item.name}</h3>
        <p>{item.description}</p>
        <Arrow />
      </div>
    </Link>
  );
}
export function ExpertiseGrid() {
  return (
    <div className="expertise-grid">
      {expertises.map((item, index) => (
        <ExpertiseCard key={item.slug} item={item} index={index} />
      ))}
    </div>
  );
}
export function ProcessSection({
  steps = method,
  dark = true,
}: {
  steps?: { title: string; text?: string }[];
  dark?: boolean;
}) {
  return (
    <section
      aria-labelledby={dark ? "method-heading" : "approach-heading"}
      className={`process section ${dark ? "dark" : ""}`}
    >
      <Container>
        <SectionLabel>Notre méthode</SectionLabel>
        <h2 id={dark ? "method-heading" : "approach-heading"}>
          {dark
            ? "Comprendre. Structurer. Accompagner."
            : "Une démarche en trois temps."}
        </h2>
        <div className="process-grid">
          {steps.map((step, i) => (
            <div className="process-item" key={step.title}>
              <span className="number">0{i + 1}</span>
              <h3>{step.title}</h3>
              {step.text && <p>{step.text}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
export function ContactBanner({
  cta = "Échanger avec Ermita Advisory",
}: {
  cta?: string;
}) {
  return (
    <section
      className="contact-banner"
      aria-labelledby="contact-banner-heading"
    >
      <Container className="split">
        <div>
          <SectionLabel>Contact</SectionLabel>
          <h2 id="contact-banner-heading">
            Construisons votre
            <br className="desktop-break" /> prochaine étape.
          </h2>
        </div>
        <div>
          <p>
            Présentez-nous votre situation. Un premier échange permettra de
            préciser vos besoins et d’identifier l’accompagnement approprié.
          </p>
          <ButtonLink light>{cta}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <Container>
        <div className="footer-main">
          <div>
            <BrandLogo />
            <p className="footer-tagline">
              Ingénierie financière & conseil en management.
            </p>
          </div>
          <address>
            95 boulevard Berthier
            <br />
            75017 Paris, France
            {(site.email || site.telephone) && (
              <div className="footer-contact">
                {site.email && (
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                )}
                {site.telephone && (
                  <a href={`tel:${site.telephone.replace(/[^+0-9]/g, "")}`}>
                    {site.telephone}
                  </a>
                )}
              </div>
            )}
          </address>
          <nav aria-label="Navigation de pied de page">
            <Link href="/">Accueil</Link>
            <Link href="/le-cabinet">Le cabinet</Link>
            <Link href="/#expertises">Nos expertises</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <nav aria-label="Informations légales">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Politique de confidentialité</Link>
          </nav>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Ermita Advisory. Tous droits réservés.
        </p>
      </Container>
    </footer>
  );
}
