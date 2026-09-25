import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "République du Feed",
    template: "%s | République du Feed",
  },
  description:
    "Des affaires jugées en ligne, rouvertes pièce par pièce. Petites enquêtes sur les réseaux, la justice et la liberté d'expression.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <a className="evitement" href="#contenu">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
