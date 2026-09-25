import type { NextConfig } from "next";

// Export statique : `npm run build` produit un dossier `out/`
// qu'on peut déposer tel quel sur n'importe quel hébergement (sous-domaine d'ananas-frais.fr).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
