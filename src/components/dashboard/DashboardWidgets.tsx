"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { ZODIAC_SIGNS_ORDER, getCompatibility } from "@/lib/astrology/zodiac-traits";
import { motion } from "framer-motion";
import { FeatureGate } from "@/components/billing/FeatureGate";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { CREDIT_COSTS } from "@/lib/billing/plans";

const SYMBOLS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍",
  Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

export function CompatibilityChecker({ locked = false }: { locked?: boolean }) {
  const [sign1, setSign1] = useState("Aries");
  const [sign2, setSign2] = useState("Libra");
  const result = getCompatibility(sign1, sign2);

  const content = (
    <GlassCard hover>
      <h3 className="font-display text-lg text-white/80 mb-1">Zodiac Compatibility</h3>
      <p className="text-xs text-white/25 mb-6">Discover cosmic chemistry between signs</p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        <select value={sign1} onChange={(e) => setSign1(e.target.value)}
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-white/20">
          {ZODIAC_SIGNS_ORDER.map((s) => <option key={s} value={s} className="bg-[#111]">{SYMBOLS[s]} {s}</option>)}
        </select>
        <span className="text-white/20 text-xs">×</span>
        <select value={sign2} onChange={(e) => setSign2(e.target.value)}
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-white/20">
          {ZODIAC_SIGNS_ORDER.map((s) => <option key={s} value={s} className="bg-[#111]">{SYMBOLS[s]} {s}</option>)}
        </select>
      </div>

      <div className="text-center mb-4">
        <motion.p key={result.score} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="font-display text-4xl text-white/90">{result.score}%</motion.p>
        <p className="text-xs text-white/30 mt-1">Cosmic Resonance</p>
      </div>

      <p className="text-sm text-white/40 leading-relaxed mb-4">{result.summary}</p>
      {result.strengths.map((s) => (
        <p key={s} className="text-xs text-white/30 mb-1">✦ {s}</p>
      ))}
    </GlassCard>
  );

  return (
    <FeatureGate
      locked={locked}
      title="Compatibility deep-dive"
      description="Full sign-to-sign analysis is included with Cosmic & Oracle plans."
    >
      {content}
    </FeatureGate>
  );
}

export function CosmicStreak({ streak = 1 }: { streak?: number }) {
  return (
    <GlassCard padding="sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white/25 tracking-wider uppercase">Cosmic Streak</p>
          <p className="font-display text-3xl text-white/80 mt-1">{streak} day{streak !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-0.5 sm:gap-1 shrink-0">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`w-1.5 sm:w-2 h-5 sm:h-6 rounded-full ${i < streak ? "bg-white/30" : "bg-white/[0.06]"}`} />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

export function WeeklyForecast({ sunSign = "Unknown", moonSign = "Unknown" }: { sunSign?: string; moonSign?: string }) {
  const [data, setData] = useState<{
    overview?: string;
    days?: { day: string; energy: string; note: string }[];
  } | null>(null);

  useEffect(() => {
    fetch("/api/forecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sunSign, moonSign, type: "weekly" }),
    })
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [sunSign, moonSign]);

  const days = data?.days ?? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({
    day: d,
    energy: WEEKLY_THEMES[i] ?? "Flow",
    note: "",
  }));

  return (
    <GlassCard hover>
      <h3 className="font-display text-lg text-white/80 mb-1">Weekly Energy Forecast</h3>
      <p className="text-xs text-white/25 mb-3">For {sunSign} — your cosmic week ahead</p>
      {data?.overview && (
        <p className="text-xs text-white/35 leading-relaxed mb-5">{data.overview}</p>
      )}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((d) => (
          <div key={d.day} className="text-center min-w-0">
            <p className="text-[9px] sm:text-[10px] text-white/20 mb-2">{d.day}</p>
            <div className="h-14 sm:h-16 rounded-lg bg-white/[0.03] border border-white/[0.05] flex flex-col items-center justify-end pb-2 px-0.5">
              <p className="text-[8px] sm:text-[9px] text-white/40 leading-tight">{d.energy}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

const WEEKLY_THEMES = ["Reflective", "Dynamic", "Harmonious", "Intense", "Expansive", "Restful", "Creative"];

export function MonthlyForecast({
  sunSign = "Unknown",
  moonSign = "Unknown",
  isPremium = false,
  canUnlockWithCredits = false,
  onUnlockWithCredits,
}: {
  sunSign?: string;
  moonSign?: string;
  isPremium?: boolean;
  canUnlockWithCredits?: boolean;
  onUnlockWithCredits?: () => void;
}) {
  const [data, setData] = useState<{
    month?: string;
    theme?: string;
    overview?: string;
    focusAreas?: string[];
    affirmation?: string;
  } | null>(null);

  useEffect(() => {
    if (!isPremium) return;
    fetch("/api/forecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sunSign, moonSign, type: "monthly" }),
    })
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [sunSign, moonSign, isPremium]);

  const lockedContent = (
    <GlassCard hover className="relative overflow-hidden">
      <h3 className="font-display text-lg text-white/80 mb-1">Monthly Cosmic Forecast</h3>
      <p className="text-xs text-white/25 mb-4">{new Date().toLocaleString("en-US", { month: "long" })} · {sunSign}</p>
      <div className="py-6 text-center border border-dashed border-white/[0.08] rounded-xl">
        <p className="text-sm text-white/40 mb-2">Month-ahead guidance</p>
        <p className="text-xs text-white/25 mb-4 max-w-xs mx-auto">
          Included with Cosmic & Oracle, or use {CREDIT_COSTS.monthlyForecast} credits on Free.
        </p>
        <div className="flex flex-col gap-2 items-center">
          <CosmicButton size="sm" href="/pricing">View plans</CosmicButton>
          {canUnlockWithCredits && onUnlockWithCredits && (
            <button
              type="button"
              onClick={onUnlockWithCredits}
              className="text-[10px] text-white/35 hover:text-white/55 underline-offset-2 hover:underline"
            >
              Unlock with {CREDIT_COSTS.monthlyForecast} credits
            </button>
          )}
        </div>
      </div>
    </GlassCard>
  );

  if (!isPremium) {
    return lockedContent;
  }

  return (
    <GlassCard hover className="relative overflow-hidden">
      <h3 className="font-display text-lg text-white/80 mb-1">Monthly Cosmic Forecast</h3>
      <p className="text-xs text-white/25 mb-4">{data?.month ?? new Date().toLocaleString("en-US", { month: "long" })} · {sunSign}</p>
      {data?.theme && <p className="text-sm text-white/55 mb-2">{data.theme}</p>}
      {data?.overview && <p className="text-xs text-white/35 leading-relaxed mb-4">{data.overview}</p>}
      {data?.focusAreas && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {data.focusAreas.map((a) => (
            <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/35">
              {a}
            </span>
          ))}
        </div>
      )}
      {data?.affirmation && (
        <p className="text-xs text-white/30 italic">&ldquo;{data.affirmation}&rdquo;</p>
      )}
    </GlassCard>
  );
}

export function BirthChartViz({ sunSign, moonSign, risingSign }: { sunSign: string; moonSign: string; risingSign: string }) {
  const placements = [
    { label: "Sun", sign: sunSign, desc: "Core identity" },
    { label: "Moon", sign: moonSign, desc: "Emotional self" },
    { label: "Rising", sign: risingSign, desc: "Outer persona" },
  ];

  return (
    <GlassCard glow>
      <h3 className="font-display text-lg text-white/80 mb-5">Your Birth Chart</h3>
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
        <div className="absolute inset-4 rounded-full border border-white/[0.04]" />
        <div className="absolute inset-8 rounded-full border border-white/[0.03]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl text-white/20">☽</span>
        </div>
        {placements.map((p, i) => {
          const angle = (i * 120 - 90) * (Math.PI / 180);
          const x = 96 + 70 * Math.cos(angle);
          const y = 96 + 70 * Math.sin(angle);
          return (
            <div key={p.label} className="absolute text-center" style={{ left: x - 24, top: y - 16, width: 48 }}>
              <p className="text-[10px] text-white/25 uppercase tracking-wider">{p.label}</p>
              <p className="text-sm text-white/60">{SYMBOLS[p.sign] || "·"} {p.sign}</p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {placements.map((p) => (
          <div key={p.label} className="text-center p-2 rounded-lg bg-white/[0.02]">
            <p className="text-[10px] text-white/25">{p.label}</p>
            <p className="text-xs text-white/50 mt-0.5">{p.sign}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export function DailyCosmicCard({ guidance, affirmation, focusArea }: { guidance: string; affirmation: string; focusArea: string }) {
  return (
    <GlassCard glow className="bg-gradient-to-br from-white/[0.03] to-transparent">
      <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-3">Today&apos;s Cosmic Message</p>
      <p className="text-sm text-white/60 leading-relaxed mb-4">{guidance}</p>
      <p className="text-xs text-white/30 italic mb-3">&ldquo;{affirmation}&rdquo;</p>
      <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/30">
        Focus: {focusArea}
      </span>
    </GlassCard>
  );
}

export function JournalEntry({ entries }: { entries: { date: string; text: string }[] }) {
  return (
    <GlassCard hover>
      <h3 className="font-display text-lg text-white/80 mb-4">Spiritual Journal</h3>
      {entries.length === 0 ? (
        <p className="text-sm text-white/25">Your cosmic reflections will appear here as you chat.</p>
      ) : (
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {entries.map((e) => (
            <div key={e.date} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-[10px] text-white/20 mb-1">{e.date}</p>
              <p className="text-xs text-white/40 leading-relaxed">{e.text}</p>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

export function ProgressTimeline({ milestones }: { milestones: { label: string; done: boolean }[] }) {
  return (
    <GlassCard padding="sm">
      <h3 className="text-sm text-white/50 mb-4">Your Cosmic Journey</h3>
      <div className="space-y-3">
        {milestones.map((m, i) => (
          <div key={m.label} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${m.done ? "bg-white/40" : "bg-white/10"}`} />
            <p className={`text-xs ${m.done ? "text-white/50" : "text-white/20"}`}>{m.label}</p>
            {i < milestones.length - 1 && <div className="flex-1" />}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
