"use client";

import { GlassCard } from "@/components/cosmic/GlassCard";
import { ConfidenceBadge } from "@/components/cosmic/ConfidenceBadge";
import { Eye, Heart, Lightbulb, Star, TrendingUp } from "lucide-react";
import type { CuriosityCard, CosmicDnaProfile, ReportSection } from "@/types";
import { BRAND_MARK } from "@/lib/symbols";

const CARD_ICONS: Record<string, typeof Star> = {
  hidden_strength: Eye, upcoming_opportunity: TrendingUp,
  relationship_pattern: Heart, soul_lesson: Lightbulb, ninety_day_outlook: Star,
};

export function CuriosityCardDisplay({ card }: { card: CuriosityCard }) {
  const Icon = CARD_ICONS[card.type] ?? Star;
  return (
    <GlassCard hover className="h-full">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-silver/[0.06] border border-silver/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-silver-muted/80" />
        </div>
        <div>
          <h4 className="text-silver/80 font-medium mb-1">{card.title}</h4>
          <p className="text-sm text-silver-muted/85 leading-relaxed mb-3">{card.content}</p>
          <ConfidenceBadge confidence={card.confidence} reasoning={card.reasoning} />
        </div>
      </div>
    </GlassCard>
  );
}

export function CosmicDnaDisplay({ dna }: { dna: CosmicDnaProfile }) {
  return (
    <GlassCard glow>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-silver/10 border border-silver/20 flex items-center justify-center text-silver-muted/90">{BRAND_MARK}</div>
        <div>
          <h3 className="font-display text-xl text-silver/90">Birth Chart Profile</h3>
          <p className="text-sm text-silver-muted/80">{dna.archetype}</p>
        </div>
      </div>
      <p className="text-sm text-silver-muted/85 italic mb-6">&ldquo;{dna.cosmicSignature}&rdquo;</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {dna.coreTraits.map((t) => (
          <span key={t} className="px-3 py-1 rounded-full text-xs bg-silver/[0.06] border border-silver/10 text-silver-muted/90">{t}</span>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { label: "Emotional Pattern", value: dna.emotionalPattern },
          { label: "Relationship Style", value: dna.relationshipStyle },
          { label: "Career Drive", value: dna.careerDrive },
          { label: "Hidden Strength", value: dna.hiddenStrength },
          { label: "Soul Lesson", value: dna.soulLesson },
        ].map(({ label, value }) => (
          <div key={label} className="p-3 rounded-xl bg-silver/5 border border-silver/10">
            <p className="text-[10px] text-silver-faint uppercase tracking-wider mb-1">{label}</p>
            <p className="text-sm text-silver-muted">{value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export function ReportSectionDisplay({ section }: { section: ReportSection }) {
  return (
    <GlassCard hover>
      <h4 className="font-display text-lg text-silver/80 mb-3">{section.title}</h4>
      <p className="text-sm text-silver-muted/85 leading-relaxed mb-4">{section.content}</p>
      <ConfidenceBadge confidence={section.confidence} reasoning={section.reasoning} />
      {section.astrologicalBasis.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {section.astrologicalBasis.map((b) => (
            <span key={b} className="text-[10px] px-2 py-0.5 rounded-md bg-silver/5 border border-silver/10 text-silver-faint">{b}</span>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
