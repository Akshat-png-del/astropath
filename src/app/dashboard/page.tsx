"use client";

import { useEffect, useState, useRef } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { BRAND_MARK } from "@/lib/symbols";
import { useAuth } from "@/contexts/AuthContext";
import { useBilling } from "@/hooks/useBilling";
import { useRetention } from "@/hooks/useRetention";
import { consumeCredits } from "@/lib/firebase/credits";
import { UpgradeModal, type UpgradeReason } from "@/components/billing/UpgradeModal";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { FadeIn, PageTransition } from "@/components/cosmic/FadeIn";
import { CreditsPanel } from "@/components/dashboard/CreditsPanel";
import { FreePlanAd } from "@/components/ads/FreePlanAd";
import {
  CosmicDnaDisplay,
  CuriosityCardDisplay,
  ReportSectionDisplay,
} from "@/components/report/ReportComponents";
import {
  CompatibilityChecker,
  WeeklyForecast,
  MonthlyForecast,
  BirthChartViz,
  JournalEntry,
} from "@/components/dashboard/DashboardWidgets";
import {
  StreakPanel,
  AchievementsPanel,
  DailyEngagementPanel,
  ReadingsListPanel,
  RecommendationsPanel,
  FavoritesPreviewPanel,
  NotificationPrefsPanel,
} from "@/components/retention/RetentionPanels";
import { buildDailyLoop } from "@/lib/retention/daily-loop";
import { getRetentionUserId } from "@/lib/retention/storage";
import { saveNotificationPrefs, requestNotificationPermission } from "@/lib/retention/notifications";
import { PageShell } from "@/components/layout/PageShell";
import type { CosmicReport, DailyInsight } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const billing = useBilling();
  const { currentReport, setCurrentReport, dailyInsight, setDailyInsight, insights } = useAppStore();
  const [report, setReport] = useState<CosmicReport | null>(currentReport);
  const [loadingDaily, setLoadingDaily] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<UpgradeReason>("forecast");

  const sunSign =
    report?.sunSign ??
    report?.cosmicDna?.archetype?.replace("The ", "").replace(" Visionary", "").replace(" Pioneer", "") ??
    "Unknown";
  const moonSign = report?.moonSign ?? "Unknown";
  const risingSign = report?.risingSign ?? "Unknown";

  const {
    streak,
    achievements,
    favorites,
    savedReadings,
    history,
    recommendations,
    notificationPrefs,
    recordHoroscope,
    removeSaved,
    refresh,
    logHistory,
  } = useRetention(sunSign !== "Unknown" ? sunSign : undefined);

  const horoscopeLogged = useRef(false);

  useEffect(() => {
    if (!report && typeof window !== "undefined") {
      const stored = sessionStorage.getItem("cosmicReport");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setReport(parsed);
          setCurrentReport(parsed);
        } catch {
          // ignore
        }
      }
    }
  }, [report, setCurrentReport]);

  useEffect(() => {
    if (report && !dailyInsight) {
      setLoadingDaily(true);
      fetch("/api/daily-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.uid ?? "anonymous",
          sunSign,
          moonSign,
          risingSign,
        }),
      })
        .then((res) => res.json())
        .then((data: DailyInsight) => setDailyInsight(data))
        .catch(console.error)
        .finally(() => setLoadingDaily(false));
    }
  }, [report, dailyInsight, setDailyInsight, user, sunSign, moonSign, risingSign]);

  useEffect(() => {
    if (dailyInsight && !horoscopeLogged.current) {
      horoscopeLogged.current = true;
      recordHoroscope();
    }
  }, [dailyInsight, recordHoroscope]);

  useEffect(() => {
    if (report && sunSign !== "Unknown") {
      const existing = history.some((h) => h.type === "birth-chart" && h.title === report.title);
      if (!existing) {
        logHistory({
          type: "birth-chart",
          title: report.title,
          summary: report.summary.slice(0, 200),
          payload: { sunSign, moonSign, risingSign },
        });
      }
    }
  }, [report, sunSign, moonSign, risingSign, history, logHistory]);

  const handleUnlockMonthly = async () => {
    if (!user?.uid || billing.monthlyForecast) return;
    const result = await consumeCredits(user.uid, "monthlyForecast");
    if (!result.ok) {
      setUpgradeReason("forecast");
      setUpgradeOpen(true);
    }
  };

  const dailyLoop = buildDailyLoop(
    getRetentionUserId(user?.uid),
    sunSign !== "Unknown" ? sunSign : undefined,
    dailyInsight
      ? {
          guidance: dailyInsight.guidance,
          focusArea: dailyInsight.focusArea,
          affirmation: dailyInsight.affirmation,
          mood: dailyInsight.mood,
        }
      : null
  );

  const journalEntries = insights.slice(0, 3).map((i, idx) => ({
    date: `Insight ${idx + 1}`,
    text: `${i.category}: ${i.value}`,
  }));

  const recentReadings = history.slice(0, 5).map((h) => ({
    id: h.id,
    type: h.type,
    title: h.title,
    summary: h.summary,
    createdAt: h.createdAt,
    href: h.type === "tarot" ? "/tarot/reading" : "/dashboard",
  }));

  const savedPreview = savedReadings.slice(0, 4).map((s) => ({
    id: s.id,
    type: s.type,
    title: s.title,
    summary: s.summary,
    createdAt: s.createdAt,
    href: s.type === "tarot" ? "/tarot/reading" : "/dashboard",
  }));

  const guideFavorites = favorites.filter((f) => f.type === "guide" || f.type === "zodiac");

  return (
    <PageTransition>
      <PageShell
        width="xl"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
        title="Your dashboard"
        subtitle={
          billing.isAnonymousTrial
            ? "Daily horoscope, tarot, streaks, and saved insights — all in one place."
            : "Track readings, streaks, and your astrology journey."
        }
        stack={false}
        mainClassName="pb-12"
      >
        <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} reason={upgradeReason} />

        <div className="flex flex-wrap gap-3 mb-10 sm:mb-12">
          <CosmicButton variant="secondary" size="sm" href="/tarot/reading">
            New tarot reading
          </CosmicButton>
          <CosmicButton variant="ghost" size="sm" href="/history">
            History
          </CosmicButton>
          <CosmicButton variant="ghost" size="sm" href="/favorites">
            Favorites
          </CosmicButton>
        </div>

        <div className="flex flex-col gap-10 sm:gap-12">
        <CreditsPanel />
        <FreePlanAd />

        {/* Daily engagement + streak row */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <DailyEngagementPanel
              sunSign={sunSign}
              moonSign={moonSign}
              risingSign={risingSign}
              guidance={dailyInsight?.guidance ?? (report ? undefined : "Open a tarot reading or explore Learn to begin your daily ritual.")}
              affirmation={dailyInsight?.affirmation}
              focusArea={dailyInsight?.focusArea}
              mood={dailyInsight?.mood}
              tarotCard={dailyLoop.tarotCard}
              cosmicTip={dailyLoop.cosmicTip}
              recommendedArticle={dailyLoop.recommendedArticle}
              loading={loadingDaily && !!report}
            />
          </div>
          <div className="space-y-5">
            <StreakPanel streak={streak} />
            <NotificationPrefsPanel
              prefs={notificationPrefs}
              onChange={async (prefs) => {
                if (prefs.enabled) await requestNotificationPermission();
                saveNotificationPrefs(user?.uid, prefs);
                refresh();
              }}
            />
          </div>
        </div>

        {/* Readings + recommendations */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <ReadingsListPanel
            title="Recent readings"
            items={recentReadings}
            emptyMessage="Your tarot and chart sessions appear here."
            viewAllHref="/history"
          />
          <ReadingsListPanel
            title="Saved readings"
            items={savedPreview}
            emptyMessage="Save readings from history to revisit them anytime."
            viewAllHref="/history"
            onRemove={removeSaved}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <FavoritesPreviewPanel favorites={guideFavorites} />
          <RecommendationsPanel items={recommendations} />
        </div>

        <AchievementsPanel unlockedIds={achievements} />

        {!report ? (
          <GlassCard className="text-center py-12 sm:py-14 px-6 sm:px-8">
            <p className="text-3xl mb-4 text-silver-faint/90">{BRAND_MARK}</p>
            <h2 className="font-display text-xl text-silver/80 mb-2">Start your cosmic journey</h2>
            <p className="text-sm text-silver-muted/80 mb-6 leading-relaxed max-w-md mx-auto">
              Draw tarot cards for daily reflection, explore birth-chart guides, and track streaks from your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CosmicButton href="/tarot/reading">Free Tarot Reading</CosmicButton>
              <CosmicButton variant="secondary" href="/learn">Browse guides</CosmicButton>
            </div>
          </GlassCard>
        ) : (
          <div className="flex flex-col gap-10 sm:gap-12 pt-4">
            <FadeIn>
              <h2 className="font-display text-2xl sm:text-3xl text-silver/90 mb-3">{report.title}</h2>
              <p className="text-silver-muted/85 text-sm leading-relaxed max-w-2xl">{report.summary}</p>
            </FadeIn>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2 space-y-5">
                <WeeklyForecast sunSign={sunSign} moonSign={moonSign} />
                <MonthlyForecast
                  sunSign={sunSign}
                  moonSign={moonSign}
                  isPremium={billing.monthlyForecast}
                  canUnlockWithCredits={!!user && billing.canUnlockMonthlyWithCredits}
                  onUnlockWithCredits={handleUnlockMonthly}
                />
              </div>
              <JournalEntry entries={journalEntries} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              <BirthChartViz sunSign={sunSign} moonSign={moonSign} risingSign={risingSign} />
              <CompatibilityChecker locked={!billing.compatibilityDeepDive} />
            </div>

            <section>
              <CosmicDnaDisplay dna={report.cosmicDna} />
            </section>

            <section>
              <h2 className="font-display text-xl text-silver/80 mb-6">Curiosity Cards</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {report.curiosityCards.map((card) => (
                  <CuriosityCardDisplay key={card.id} card={card} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-silver/80 mb-6">Deep Insights</h2>
              <div className="space-y-5">
                {report.sections.map((section, i) => (
                  <ReportSectionDisplay key={i} section={section} />
                ))}
              </div>
            </section>
          </div>
        )}
        </div>
      </PageShell>
    </PageTransition>
  );
}
