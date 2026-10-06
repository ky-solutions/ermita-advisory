import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container ${className}`}>{children}</div>;
}
export function BrandLogo() {
  return (
    <Link href="/" aria-label="Ermita Advisory — Accueil" className="brand">
      <Image
        src="/logo/ermita-advisory-logo-transparent.png"
        alt=""
        width={2079}
        height={756}
        sizes="(max-width:767px) 128px, (max-width:1100px) 145px, 166px"
        priority
      />
    </Link>
  );
}
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="section-label">
      {children}
      <span aria-hidden="true" />
    </p>
  );
}
export function Arrow() {
  return <span aria-hidden="true">⟶</span>;
}
export function ButtonLink({
  children,
  href = "/contact",
  light = false,
}: {
  children: ReactNode;
  href?: string;
  light?: boolean;
}) {
  return (
    <Link className={`button ${light ? "button-light" : ""}`} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
export function TextLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
