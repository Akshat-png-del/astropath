import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { Starfield, AuroraBackground, CosmicParticles } from "@/components/cosmic/Starfield";
import { TarotCardsBackground } from "@/components/cosmic/TarotCardsBackground";
import { MouseGlow } from "@/components/cosmic/MouseGlow";
import { FloatingConstellations } from "@/components/cosmic/ZodiacWheel";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { siteMetadata } from "@/lib/brand";
import "./globals.css";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = siteMetadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased overflow-x-hidden`}>
      <head>
        <JsonLdScript data={[organizationJsonLd(), websiteJsonLd()]} />
      </head>
      <body className="min-h-full min-h-dvh flex flex-col cosmic-gradient overflow-x-hidden">
        <Starfield />
        <TarotCardsBackground />
        <AuroraBackground />
        <CosmicParticles />
        <FloatingConstellations />
        <MouseGlow />
        <AdSenseScript />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
