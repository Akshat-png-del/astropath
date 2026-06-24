import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { Starfield, AuroraBackground, CosmicParticles } from "@/components/cosmic/Starfield";
import { TarotCardsBackground } from "@/components/cosmic/TarotCardsBackground";
import { MouseGlow } from "@/components/cosmic/MouseGlow";
import { FloatingConstellations } from "@/components/cosmic/ZodiacWheel";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cosmic Mirror — Your Personal Cosmic Guide",
  description: "The universe reveals more when it knows you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col cosmic-gradient overflow-x-hidden">
        <Starfield />
        <TarotCardsBackground />
        <AuroraBackground />
        <CosmicParticles />
        <FloatingConstellations />
        <MouseGlow />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
