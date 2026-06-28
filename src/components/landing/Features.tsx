"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "@/components/cosmic/FadeIn";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { Layers, Eye, Star, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: Layers,
    title: "Free Tarot Readings",
    desc: "Choose a spread, shuffle, and draw — Love, Celtic Cross, Yes/No, Daily, and more.",
  },
  {
    icon: Sparkles,
    title: "Birth Chart Guides",
    desc: "Learn planets, houses, and signs with beginner-friendly articles and reference pages.",
  },
  {
    icon: Star,
    title: "Daily Dashboard",
    desc: "Track streaks, save readings, and revisit daily cosmic insights in one calm place.",
  },
  {
    icon: Eye,
    title: "Honest & Transparent",
    desc: "Clear credit costs, ethical language, and explanations you can actually understand.",
  },
];

export function FeatureShowcase() {
  return (
    <section className="relative z-10 px-4 sm:px-6 py-20 sm:py-28 max-w-5xl mx-auto w-full">
      <FadeIn>
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl text-silver-bright/90 mb-4">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="text-sm text-silver-muted/85 leading-relaxed">
            Tarot, astrology education, and daily reflection — designed to feel calm and trustworthy.
          </p>
        </div>
      </FadeIn>
      <StaggerChildren className="grid sm:grid-cols-2 gap-5 sm:gap-6">
        {FEATURES.map((f) => (
          <StaggerItem key={f.title}>
            <GlassCard hover className="h-full p-6 sm:p-8">
              <div className="w-10 h-10 rounded-xl bg-silver/[0.06] border border-silver/10 flex items-center justify-center mb-5">
                <f.icon className="w-4 h-4 text-silver-muted/90" />
              </div>
              <h3 className="text-silver/90 font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-silver-muted/85 leading-relaxed">{f.desc}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
