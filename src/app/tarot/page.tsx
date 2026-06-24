"use client";

import { TarotExperience } from "@/components/tarot/TarotExperience";
import { PageTransition } from "@/components/cosmic/FadeIn";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TarotPage() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/30 hover:text-white/60 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 text-sm">
                ✦
              </div>
              <div>
                <h1 className="font-display text-sm text-white/70">Tarot Reading</h1>
                <p className="text-[10px] text-white/25 tracking-wider uppercase">Major Arcana · Free</p>
              </div>
            </div>
          </div>
          <CosmicButton variant="secondary" size="sm" href="/chat">
            Astrology chat
          </CosmicButton>
        </header>
        <main className="flex-1 max-w-5xl w-full mx-auto">
          <TarotExperience />
        </main>
      </div>
    </PageTransition>
  );
}
