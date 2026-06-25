"use client";

import { LandingNav, HeroSection } from "@/components/landing/Hero";
import { FeatureShowcase, Testimonials } from "@/components/landing/Features";
import { FadeIn } from "@/components/cosmic/FadeIn";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { PageTransition } from "@/components/cosmic/FadeIn";

export default function LandingPage() {
  return (
    <PageTransition>
      <main className="relative flex-1 overflow-x-hidden">
        <div className="glow-orb w-full max-w-lg sm:max-w-xl md:max-w-2xl aspect-square bg-white/[0.02] -top-48 sm:-top-64 left-1/2 -translate-x-1/2 sm:left-1/3 sm:translate-x-0 animate-pulse-soft" />

        <LandingNav />
        <HeroSection />
        <FeatureShowcase />
        <Testimonials />

        <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 max-w-3xl mx-auto w-full text-center">
          <FadeIn>
            <GlassCard glow className="p-10 sm:p-14">
              <p className="font-display text-2xl sm:text-3xl text-white/80 mb-4">
                Guidance, not certainty
              </p>
              <p className="text-white/30 text-sm leading-relaxed max-w-md mx-auto mb-8">
                We never make fear-based predictions. Every insight comes with
                transparent reasoning and supportive language for your journey.
              </p>
              <CosmicButton size="lg" href="/chat">Start Your Journey</CosmicButton>
            </GlassCard>
          </FadeIn>
        </section>

        <footer className="relative z-10 border-t border-white/[0.04] py-8 sm:py-10 px-4 sm:px-6 text-center">
          <p className="text-[10px] text-white/20 tracking-[0.35em] uppercase">
            made by the universe itself
          </p>
        </footer>
      </main>
    </PageTransition>
  );
}
