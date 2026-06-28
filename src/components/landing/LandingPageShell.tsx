"use client";

import { LandingNav, HeroSection } from "@/components/landing/Hero";
import { FeatureShowcase } from "@/components/landing/Features";
import { HomeEducational } from "@/components/landing/HomeEducational";
import { StartHereGuide } from "@/components/layout/StartHereGuide";
import { FadeIn } from "@/components/cosmic/FadeIn";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { PageTransition } from "@/components/cosmic/FadeIn";
import { FreePlanAd } from "@/components/ads/FreePlanAd";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollMoreHint } from "@/components/layout/ScrollMoreHint";

export function LandingPageShell() {
  return (
    <PageTransition>
      <main className="relative flex-1">
        <ScrollMoreHint />
        <div className="glow-orb w-full max-w-lg sm:max-w-xl md:max-w-2xl aspect-square bg-silver/5 -top-48 sm:-top-64 left-1/2 -translate-x-1/2 sm:left-1/3 sm:translate-x-0 animate-pulse-soft pointer-events-none -z-10" />

        <div className="relative z-10">
          <LandingNav />
          <HeroSection />
        </div>

        <StartHereGuide />
        <FeatureShowcase />
        <HomeEducational />

        <FreePlanAd variant="infeed" className="py-12 sm:py-16" />

        <section className="relative z-10 px-4 sm:px-6 py-20 sm:py-28 max-w-2xl mx-auto w-full text-center">
          <FadeIn>
            <GlassCard glow className="p-10 sm:p-12">
              <p className="font-display text-2xl sm:text-3xl text-silver/90 mb-4">
                Guidance, not certainty
              </p>
              <p className="text-silver-muted/85 text-sm leading-relaxed max-w-md mx-auto mb-8">
                Reflective language and balanced interpretations — never fear-based predictions.
              </p>
              <CosmicButton size="lg" href="/tarot/reading">
                Start a free tarot reading
              </CosmicButton>
            </GlassCard>
          </FadeIn>
        </section>

        <SiteFooter />
      </main>
    </PageTransition>
  );
}
