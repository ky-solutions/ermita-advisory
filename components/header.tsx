"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo, ButtonLink, Container } from "./ui";
const links = [
  ["/", "Accueil"],
  ["/le-cabinet", "Le cabinet"],
  ["/#expertises", "Nos expertises"],
  ["/contact", "Contact"],
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const menuButton = button.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer, .skip-link"),
    );
    const wasInert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    document
      .querySelector<HTMLAnchorElement>("#mobile-navigation a")
      ?.focus({ preventScroll: true });
    function keyboard(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const items = Array.from(
          document.querySelectorAll<HTMLElement>(".header a, .header button"),
        ).filter((el) => el.getBoundingClientRect().width > 0);
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    const desktop = window.matchMedia("(min-width:768px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", keyboard);
    desktop.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = oldOverflow;
      background.forEach((element, index) => {
        element.inert = wasInert[index];
      });
      document.removeEventListener("keydown", keyboard);
      desktop.removeEventListener("change", resize);
      if (!desktop.matches) menuButton?.focus({ preventScroll: true });
    };
  }, [open]);
  const navigation = links.map(([href, label]) => (
    <Link
      key={href}
      href={href}
      aria-current={
        (
          href === "/"
            ? path === href
            : href === "/#expertises"
              ? path.startsWith("/expertises/")
              : path.startsWith(href)
        )
          ? "page"
          : undefined
      }
      onClick={() => setOpen(false)}
    >
      {label}
    </Link>
  ));
  return (
    <div
      className="header"
      role={open ? "dialog" : "banner"}
      aria-modal={open ? true : undefined}
      aria-label={open ? "Menu de navigation" : undefined}
    >
      <Container className="header-inner">
        <BrandLogo />
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation}
        </nav>
        <div className="header-cta">
          <ButtonLink>Parlons de votre projet</ButtonLink>
        </div>
        <button
          ref={button}
          className="menu-toggle"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true">
            {open ? (
              "✕"
            ) : (
              <>
                <span />
                <span />
                <span />
              </>
            )}
          </span>
        </button>
      </Container>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Navigation mobile"
        hidden={!open}
      >
        {navigation}
        <Link href="/contact" onClick={() => setOpen(false)}>
          Parlons de votre projet <span aria-hidden="true">⟶</span>
        </Link>
      </nav>
    </div>
  );
}
