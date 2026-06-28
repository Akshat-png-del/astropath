"use client";

import { useState, useEffect, useRef } from "react";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { ZODIAC_SIGNS_ORDER, getCompatibility } from "@/lib/astrology/zodiac-traits";
import { getElementTokens } from "@/lib/astrology/zodiac-tokens";
import { ZodiacSignImage } from "@/components/cosmic/ZodiacSignImage";
import { ZodiacIconPair } from "@/components/zodiac/ZodiacIcon";
import { CelestialPattern } from "@/components/zodiac/CelestialPattern";
import { motion } from "framer-motion";
import { FeatureGate } from "@/components/billing/FeatureGate";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { CREDIT_COSTS } from "@/lib/billing/plans";
import { PAID_PLANS_LABEL } from "@/lib/brand";
import { BTN_TEXT } from "@/lib/ui/button-classes";
import { SYMBOL } from "@/lib/symbols";
import { useRetention } from "@/hooks/useRetention";

export function CompatibilityChecker({ locked = false }: { locked?: boolean }) {
  const [sign1, setSign1] = useState("Aries");
  const [sign2, setSign2] = useState("Libra");
  const { logHistory } = useRetention();
  const lastLogged = useRef("");
  const result = getCompatibility(sign1, sign2);
  const tokens1 = getElementTokens(sign1);
  const tokens2 = getElementTokens(sign2);

  useEffect(() => {
    const key = `${sign1}-${sign2}`;
    if (lastLogged.current === key) return;
    lastLogged.current = key;
    logHistory({
      type: "compatibility",
      title: `${sign1} & ${sign2}`,
      summary: result.summary.slice(0, 200),
      payload: { sign1, sign2, score: result.score },
    });
  }, [sign1, sign2, result.summary, result.score, logHistory]);

  const content = (
    <GlassCard hover className="relative overflow-hidden">
      <CelestialPattern className="opacity-30" seed={`compat-${sign1}-${sign2}`} density={10} />
      <div className="relative z-10">
        <h3 className="font-display text-lg text-silver/90 mb-1">Zodiac Compatibility</h3>
        <p className="text-xs text-silver-faint mb-5">See how two zodiac signs connect</p>

        <div className="flex justify-center mb-6">
          <ZodiacIconPair sign1={sign1} sign2={sign2} size={40} />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
          <select
            value={sign1}
            onChange={(e) => setSign1(e.target.value)}
            className="flex-1 bg-silver/[0.06] border border-silver/15 rounded-xl px-3 py-2 text-sm text-silver/80 focus:outline-none focus:border-silver/30"
            style={{ borderColor: tokens1.muted }}
          >
            {ZODIAC_SIGNS_ORDER.map((s) => (
              <option key={s} value={s} className="bg-[#111]">
                {s}
              </option>
            ))}
          </select>
          <span className="text-silver-faint/90 text-xs text-center sm:text-left">×</span>
          <select
            value={sign2}
            onChange={(e) => setSign2(e.target.value)}
            className="flex-1 bg-silver/[0.06] border border-silver/15 rounded-xl px-3 py-2 text-sm text-silver/80 focus:outline-none focus:border-silver/30"
            style={{ borderColor: tokens2.muted }}
          >
            {ZODIAC_SIGNS_ORDER.map((s) => (
              <option key={s} value={s} className="bg-[#111]">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center mb-4">
          <motion.p
            key={result.score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-display text-4xl text-silver-bright/90"
          >
            {result.score}%
          </motion.p>
          <p className="text-xs text-silver-muted/80 mt-1">Compatibility score</p>
        </div>

        <p className="text-sm text-silver-muted/90 leading-relaxed mb-4">{result.summary}</p>
        {result.strengths.map((s) => (
          <p key={s} className="text-xs text-silver-muted/80 mb-1 flex items-start gap-2">
            <span className="text-[var(--zodiac-gold)] opacity-60 mt-0.5">{SYMBOL.star}</span>
            {s}
          </p>
        ))}
      </div>
    </GlassCard>
  );

  return (
    <FeatureGate
      locked={locked}
      title="Compatibility deep-dive"
      description={`Full sign-to-sign analysis is included with ${PAID_PLANS_LABEL} plans.`}
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
          <p className="text-xs text-silver-faint tracking-wider uppercase">Reading streak</p>
          <p className="font-display text-3xl text-silver/90 mt-1">{streak} day{streak !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-0.5 sm:gap-1 shrink-0">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`w-1.5 sm:w-2 h-5 sm:h-6 rounded-full ${i < streak ? "bg-silver/30" : "bg-silver/10"}`} />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

const WEEKLY_THEMES = ["Reflective", "Dynamic", "Harmonious", "Intense", "Expansive", "Restful", "Creative"];

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
    <GlassCard hover className="relative overflow-hidden">
      <CelestialPattern className="opacity-25" seed={`week-${sunSign}`} density={8} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-1">
          <ZodiacSignImage sign={sunSign} size={28} ring={false} shimmer />
          <h3 className="font-display text-lg text-silver/90">Weekly Energy Forecast</h3>
        </div>
        <p className="text-xs text-silver-faint mb-3">For {sunSign} — your week ahead</p>
      {data?.overview && (
        <p className="text-xs text-silver-muted/85 leading-relaxed mb-5">{data.overview}</p>
      )}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((d) => (
          <div key={d.day} className="text-center min-w-0">
            <p className="text-[9px] sm:text-[10px] text-silver-faint/90 mb-2">{d.day}</p>
            <div className="h-14 sm:h-16 rounded-lg bg-silver/5 border border-silver/10 flex flex-col items-center justify-end pb-2 px-0.5">
              <p className="text-[8px] sm:text-[9px] text-silver-muted/90 leading-tight">{d.energy}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </GlassCard>
  );
}

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
      <h3 className="font-display text-lg text-silver/90 mb-1">Monthly Forecast</h3>
      <p className="text-xs text-silver-faint mb-4">{new Date().toLocaleString("en-US", { month: "long" })} · {sunSign}</p>
      <div className="py-6 text-center border border-dashed border-silver/15 rounded-xl">
        <p className="text-sm text-silver-muted/90 mb-2">Month-ahead guidance</p>
        <p className="text-xs text-silver-faint mb-4 max-w-xs mx-auto">
          Included with {PAID_PLANS_LABEL}, or use {CREDIT_COSTS.monthlyForecast} credits on Free.
        </p>
        <div className="flex flex-col gap-2 items-center">
          <CosmicButton size="sm" href="/pricing">View plans</CosmicButton>
          {canUnlockWithCredits && onUnlockWithCredits && (
            <button
              type="button"
              onClick={onUnlockWithCredits}
              className={BTN_TEXT}
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
      <h3 className="font-display text-lg text-silver/90 mb-1">Monthly Forecast</h3>
      <p className="text-xs text-silver-faint mb-4">{data?.month ?? new Date().toLocaleString("en-US", { month: "long" })} · {sunSign}</p>
      {data?.theme && <p className="text-sm text-silver-dim/85 mb-2">{data.theme}</p>}
      {data?.overview && <p className="text-xs text-silver-muted/85 leading-relaxed mb-4">{data.overview}</p>}
      {data?.focusAreas && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {data.focusAreas.map((a) => (
            <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-silver/[0.06] border border-silver/10 text-silver-muted/85">
              {a}
            </span>
          ))}
        </div>
      )}
      {data?.affirmation && (
        <p className="text-xs text-silver-muted/80 italic">&ldquo;{data.affirmation}&rdquo;</p>
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
    <GlassCard glow className="relative overflow-hidden">
      <CelestialPattern className="opacity-35" seed={`chart-${sunSign}`} density={14} />
      <div className="relative z-10">
        <h3 className="font-display text-lg text-silver/90 mb-5">Your Birth Chart</h3>
        <div className="relative w-52 h-52 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border border-silver/10" />
          <div className="absolute inset-4 rounded-full border border-silver/10" />
          <div className="absolute inset-8 rounded-full border border-dashed border-silver/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ZodiacSignImage sign={sunSign} size={44} interactive shimmer />
          </div>
          {placements.map((p, i) => {
            const angle = (i * 120 - 90) * (Math.PI / 180);
            const x = 104 + 78 * Math.cos(angle);
            const y = 104 + 78 * Math.sin(angle);
            const tokens = getElementTokens(p.sign);
            return (
              <div
                key={p.label}
                className="absolute flex flex-col items-center"
                style={{ left: x - 28, top: y - 28, width: 56 }}
              >
                <div
                  className="rounded-full p-1 border bg-black/30 backdrop-blur-sm mb-1"
                  style={{ borderColor: tokens.muted }}
                >
                  <ZodiacSignImage sign={p.sign} size={32} ring={false} shimmer />
                </div>
                <p className="text-[9px] text-silver-faint uppercase tracking-wider">{p.label}</p>
                <p className="text-[10px] text-silver-dim/80">{p.sign}</p>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {placements.map((p) => {
            const tokens = getElementTokens(p.sign);
            return (
              <div
                key={p.label}
                className="text-center p-3 rounded-xl bg-silver/5 border border-silver/10"
                style={{ borderColor: tokens.muted }}
              >
                <ZodiacSignImage sign={p.sign} size={28} ring={false} className="mx-auto mb-2" />
                <p className="text-[10px] text-silver-faint">{p.label}</p>
                <p className="text-xs text-silver-dim/80 mt-0.5">{p.sign}</p>
                <p className="text-[9px] text-silver-faint/90 mt-1">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}

export function DailyCosmicCard({ guidance, affirmation, focusArea }: { guidance: string; affirmation: string; focusArea: string }) {
  return (
    <GlassCard glow className="bg-gradient-to-br from-silver/5 to-transparent">
      <p className="text-[10px] tracking-[0.3em] uppercase text-silver-faint mb-3">Today&apos;s insight</p>
      <p className="text-sm text-silver-dim/90 leading-relaxed mb-4">{guidance}</p>
      <p className="text-xs text-silver-muted/80 italic mb-3">&ldquo;{affirmation}&rdquo;</p>
      <span className="text-[10px] px-2.5 py-1 rounded-full bg-silver/[0.06] border border-silver/10 text-silver-muted/80">
        Focus: {focusArea}
      </span>
    </GlassCard>
  );
}

export function JournalEntry({ entries }: { entries: { date: string; text: string }[] }) {
  return (
    <GlassCard hover>
      <h3 className="font-display text-lg text-silver/90 mb-4">Spiritual Journal</h3>
      {entries.length === 0 ? (
        <p className="text-sm text-silver-faint">Your reflections will appear here as you explore.</p>
      ) : (
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {entries.map((e) => (
            <div key={e.date} className="p-3 rounded-xl bg-silver/5 border border-silver/10">
              <p className="text-[10px] text-silver-faint/90 mb-1">{e.date}</p>
              <p className="text-xs text-silver-muted/90 leading-relaxed">{e.text}</p>
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
      <h3 className="text-sm text-silver-dim/80 mb-4">Your astrology journey</h3>
      <div className="space-y-3">
        {milestones.map((m, i) => (
          <div key={m.label} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${m.done ? "bg-silver/40" : "bg-silver/10"}`} />
            <p className={`text-xs ${m.done ? "text-silver-dim/80" : "text-silver-faint/90"}`}>{m.label}</p>
            {i < milestones.length - 1 && <div className="flex-1" />}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
