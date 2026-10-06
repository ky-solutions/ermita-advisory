import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { MotionEnhancements } from "@/components/motion";
import { Footer } from "@/components/sections";
import "./globals.css";
import { SITE_URL, isIndexable, site } from "@/lib/site";
import { OrganizationData } from "@/components/structured-data";
const spaceGrotesk = localFont({
  src: "../public/fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-space-grotesk",
  display: "swap",
  weight: "300 700",
  fallback: ["Arial"],
});
const poppins = localFont({
  src: "../public/fonts/Poppins-Regular.woff2",
  variable: "--font-poppins",
  display: "swap",
  weight: "400",
  fallback: ["Arial"],
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.title, template: "%s | Ermita Advisory" },
  description: site.description,
  robots: { index: isIndexable, follow: isIndexable },
  openGraph: { type: "website", locale: "fr_FR", siteName: site.name },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${spaceGrotesk.variable} ${poppins.variable}`}>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Header />
        <OrganizationData />
        <MotionEnhancements />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
