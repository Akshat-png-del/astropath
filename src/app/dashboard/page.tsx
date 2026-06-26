"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { useAuth } from "@/contexts/AuthContext";
import { useBilling } from "@/hooks/useBilling";
import { consumeCredits } from "@/lib/firebase/credits";
import { UpgradeModal, type UpgradeReason } from "@/components/billing/UpgradeModal";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { FadeIn, PageTransition } from "@/components/cosmic/FadeIn";
import { CreditsPanel } from "@/components/dashboard/CreditsPanel";
import { FreePlanAd } from "@/components/ads/FreePlanAd";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  CosmicDnaDisplay,
  CuriosityCardDisplay,
  ReportSectionDisplay,
} from "@/components/report/ReportComponents";
import {
  CompatibilityChecker,
  CosmicStreak,
  WeeklyForecast,
  MonthlyForecast,
  BirthChartViz,
  DailyCosmicCard,
  JournalEntry,
  ProgressTimeline,
} from "@/components/dashboard/DashboardWidgets";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import type { CosmicReport, DailyInsight } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const billing = useBilling();
  const { currentReport, setCurrentReport, dailyInsight, setDailyInsight, insights } = useAppStore();
  const [report, setReport] = useState<CosmicReport | null>(currentReport);
  const [loadingDaily, setLoadingDaily] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<UpgradeReason>("forecast");

  const handleUnlockMonthly = async () => {
    if (!user?.uid || billing.monthlyForecast) return;
    const result = await consumeCredits(user.uid, "monthlyForecast");
    if (!result.ok) {
      setUpgradeReason("forecast");
      setUpgradeOpen(true);
    }
  };

  useEffect(() => {
    if (!report && typeof window !== "undefined") {
      const stored = sessionStorage.getItem("cosmicReport");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setReport(parsed);
          setCurrentReport(parsed);
        } catch {
          // ignore invalid stored report
        }
      }
    }
  }, [report, setCurrentReport]);

  useEffect(() => {
    if (report && !dailyInsight) {
      const sun =
        report.sunSign ??
        report.cosmicDna?.archetype?.replace("The ", "").replace(" Visionary", "").replace(" Pioneer", "") ??
        "Unknown";
      setLoadingDaily(true);
      fetch("/api/daily-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.uid ?? "anonymous",
          sunSign: sun,
          moonSign: report.moonSign ?? "Unknown",
          risingSign: report.risingSign ?? "Unknown",
        }),
      })
        .then((res) => res.json())
        .then((data: DailyInsight) => setDailyInsight(data))
        .catch(console.error)
        .finally(() => setLoadingDaily(false));
    }
  }, [report, dailyInsight, setDailyInsight, user]);

  const milestones = [
    { label: "Started cosmic conversation", done: true },
    { label: "Shared birth details", done: !!report },
    { label: "Received cosmic report", done: !!report },
    { label: "Explored daily guidance", done: !!dailyInsight },
    { label: "7-day cosmic streak", done: false },
  ];

  const journalEntries = insights.slice(0, 3).map((i, idx) => ({
    date: `Insight ${idx + 1}`,
    text: `${i.category}: ${i.value}`,
  }));

  const sunSign =
    report?.sunSign ??
    report?.cosmicDna?.archetype?.replace("The ", "").replace(" Visionary", "").replace(" Pioneer", "") ??
    "Unknown";
  const moonSign = report?.moonSign ?? "Unknown";
  const risingSign = report?.risingSign ?? "Unknown";

  return (
    <PageTransition>
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-6xl mx-auto w-full">
        <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} reason={upgradeReason} />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/30 hover:text-white/50 text-sm transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="flex flex-wrap gap-2">
            <CosmicButton variant="secondary" size="sm" href="/chat">
              Continue Chat
            </CosmicButton>
            {report && (
              <CosmicButton variant="ghost" size="sm">
                <Share2 className="w-3.5 h-3.5" /> Share
              </CosmicButton>
            )}
          </div>
        </div>

        <FadeIn>
          <h1 className="font-display text-3xl sm:text-4xl text-gradient mb-2">Your Cosmic Dashboard</h1>
          <p className="text-white/35 text-sm leading-relaxed max-w-2xl mb-8">
            {billing.isAnonymousTrial
              ? "Free trial — track your credits and message history here. No sign-in required."
              : "Track credits, readings, and your cosmic journey."}
          </p>
        </FadeIn>

        <CreditsPanel />

        <FreePlanAd className="mb-8" />

        {!report ? (
          <GlassCard className="text-center py-10 px-6 mb-10">
            <p className="text-3xl mb-4 text-white/20">☽</p>
            <h2 className="font-display text-xl text-white/70 mb-2">Your cosmic report awaits</h2>
            <p className="text-sm text-white/30 mb-6 leading-relaxed max-w-md mx-auto">
              Use your trial credits in chat. After you share birth details and generate a report, your full
              dashboard unlocks here.
            </p>
            <CosmicButton href="/chat">Begin Your Reading</CosmicButton>
          </GlassCard>
        ) : (
          <>
            <FadeIn>
              <h2 className="font-display text-2xl sm:text-3xl text-white/80 mb-2">{report.title}</h2>
              <p className="text-white/35 text-sm leading-relaxed max-w-2xl mb-10">{report.summary}</p>
            </FadeIn>

            <div className="grid lg:grid-cols-3 gap-5 mb-8">
              <div className="lg:col-span-2 space-y-5">
                {dailyInsight && !loadingDaily && (
                  <DailyCosmicCard
                    guidance={dailyInsight.guidance}
                    affirmation={dailyInsight.affirmation}
                    focusArea={dailyInsight.focusArea}
                  />
                )}
                {loadingDaily && (
                  <GlassCard className="animate-pulse">
                    <div className="h-20 bg-white/[0.03] rounded-xl" />
                  </GlassCard>
                )}
                <WeeklyForecast sunSign={sunSign} moonSign={moonSign} />
                <MonthlyForecast
                  sunSign={sunSign}
                  moonSign={moonSign}
                  isPremium={billing.monthlyForecast}
                  canUnlockWithCredits={!!user && billing.canUnlockMonthlyWithCredits}
                  onUnlockWithCredits={handleUnlockMonthly}
                />
              </div>
              <div className="space-y-5">
                <CosmicStreak streak={1} />
                <ProgressTimeline milestones={milestones} />
                <JournalEntry entries={journalEntries} />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-5 mb-10">
              <BirthChartViz sunSign={sunSign} moonSign={moonSign} risingSign={risingSign} />
              <CompatibilityChecker locked={!billing.compatibilityDeepDive} />
            </div>

            <section className="mb-10">
              <CosmicDnaDisplay dna={report.cosmicDna} />
            </section>

            <section className="mb-10">
              <h2 className="font-display text-xl text-white/70 mb-5">Curiosity Cards</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {report.curiosityCards.map((card) => (
                  <CuriosityCardDisplay key={card.id} card={card} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-white/70 mb-5">Deep Insights</h2>
              <div className="space-y-4">
                {report.sections.map((section, i) => (
                  <ReportSectionDisplay key={i} section={section} />
                ))}
              </div>
            </section>
          </>
        )}

        <SiteFooter className="mt-16" />
      </main>
    </PageTransition>
  );
}
