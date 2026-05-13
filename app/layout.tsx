import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maison Deeya | Patisserie haut de gamme a Faya, Abidjan",
  description:
    "Maison Deeya, patisserie artisanale premium a Faya, Abidjan. Commandez tartes, Paris-Brest, croissants, glaces artisanales, livraison, drive et repas sur place.",
  keywords: [
    "Maison Deeya",
    "patisserie Abidjan",
    "Faya",
    "desserts artisanaux",
    "croissants",
    "tartes",
    "commande patisserie"
  ],
  openGraph: {
    title: "Maison Deeya | L'Art de la Patisserie a Abidjan",
    description: "Des creations artisanales raffinees pour vos moments gourmands.",
    type: "website",
    locale: "fr_CI"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
