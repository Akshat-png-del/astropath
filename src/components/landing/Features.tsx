"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "@/components/cosmic/FadeIn";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { MessageCircle, Eye, Star, Zap, Heart, Sparkles, Layers } from "lucide-react";

const FEATURES = [
  { icon: MessageCircle, title: "Conversational Discovery", desc: "A meaningful dialogue that understands you before any reading begins." },
  { icon: Layers, title: "Free Tarot Readings", desc: "Shuffle the Major Arcana, draw your spread, and get IRA's interpretation — Love, Celtic Cross, Yes/No, and more." },
  { icon: Sparkles, title: "Cosmic DNA Profile", desc: "A unique personality mirror blending your chart with who you truly are." },
  { icon: Eye, title: "Why This Insight?", desc: "Transparent reasoning behind every cosmic revelation." },
  { icon: Star, title: "Curiosity Cards", desc: "Hidden strengths, soul lessons, and 90-day cosmic outlooks." },
  { icon: Zap, title: "Daily Cosmic Guidance", desc: "Personalized daily messages that evolve with your journey." },
  { icon: Heart, title: "Session Memory", desc: "Your companion remembers you — every return feels like coming home." },
];

export function FeatureShowcase() {
  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-28 max-w-7xl mx-auto w-full">
      <FadeIn>
        <h2 className="font-display text-3xl sm:text-4xl text-center text-white/90 mb-3">
          Not a horoscope. A cosmic companion.
        </h2>
        <p className="text-center text-white/30 max-w-lg mx-auto mb-16 text-sm leading-relaxed">
          Every feature designed to build trust, spark curiosity, and guide self-discovery.
        </p>
      </FadeIn>
      <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f) => (
          <StaggerItem key={f.title}>
            <GlassCard hover className="h-full">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4">
                <f.icon className="w-4 h-4 text-white/40" />
              </div>
              <h3 className="text-white/80 font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-white/30 leading-relaxed">{f.desc}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}

const TESTIMONIALS = [
  { name: "Maya, 24", sign: "Cancer", text: "It felt like talking to someone who actually understood me before giving any reading. The insights were eerily accurate." },
  { name: "James, 31", sign: "Capricorn", text: "I've tried every astrology app. This is the first one that asked about my life before predicting it. Completely different experience." },
  { name: "Priya, 27", sign: "Pisces", text: "The daily cosmic messages feel personal — not generic horoscope fluff. I open it every morning now." },
];

export function Testimonials() {
  return (
    <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20 max-w-5xl mx-auto w-full">
      <FadeIn>
        <p className="text-xs tracking-[0.3em] uppercase text-white/25 text-center mb-10">Trusted by cosmic seekers</p>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <FadeIn key={t.name} delay={i * 0.1}>
            <GlassCard padding="sm" className="h-full">
              <p className="text-sm text-white/40 leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-xs text-white/30">
                  {t.sign[0]}
                </div>
                <div>
                  <p className="text-xs text-white/50">{t.name}</p>
                  <p className="text-[10px] text-white/25 tracking-wider uppercase">{t.sign}</p>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
