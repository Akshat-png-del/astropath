"use client";

import Link from "next/link";
import { LandingNav } from "@/components/landing/Hero";
import { useAuth } from "@/contexts/AuthContext";
import { useBilling } from "@/hooks/useBilling";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { CREDIT_COSTS, getPlan, PLANS } from "@/lib/billing/plans";
import { PricingSection } from "@/components/billing/PricingSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { logOut } from "@/lib/firebase/auth";
import { APP_NAME } from "@/lib/brand";

export default function AccountPage() {
  const { user, loading, firebaseReady } = useAuth();
  const { profile, tier, credits, unlimitedTarot, canGenerateReport } = useBilling();

  if (loading) {
    return (
      <main className="min-h-dvh bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center text-silver-muted/80 text-sm" role="status">
          Loading account…
        </div>
        <SiteFooter compact />
      </main>
    );
  }

  if (!firebaseReady || !user) {
    return (
      <main className="min-h-dvh bg-background text-silver-bright overflow-x-hidden flex flex-col">
        <LandingNav />
        <div className="flex-1 max-w-md mx-auto px-6 py-24 text-center w-full">
          <h1 className="font-display text-2xl text-silver/90 mb-4">Your {APP_NAME} account</h1>
          <p className="text-sm text-silver-muted/85 mb-8">Sign in to manage credits, saved readings, and subscriptions.</p>
          <CosmicButton href="/auth">Sign in</CosmicButton>
        </div>
        <SiteFooter compact />
      </main>
    );
  }

  const plan = getPlan(tier);
  const usage = profile?.usage;

  return (
    <main className="min-h-dvh bg-background text-silver-bright overflow-x-hidden flex flex-col">
      <LandingNav />
      <div className="flex-1 max-w-lg mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        <h1 className="font-display text-2xl text-silver-bright/85 mb-1">Account</h1>
        <p className="text-sm text-silver-muted/85 mb-10">{user.email}</p>

        <div className="glass-card rounded-2xl p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-silver-muted/80 uppercase tracking-wider">Plan</span>
            <span className="text-sm text-silver/80 capitalize">{plan.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-silver-muted/80 uppercase tracking-wider">Credits</span>
            <span className="text-sm text-silver/80">
              {unlimitedTarot ? "Unlimited tarot" : `${credits} remaining`}
            </span>
          </div>
          {usage && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-xs text-silver-muted/80 uppercase tracking-wider">Tarot this month</span>
                <span className="text-sm text-silver/80">{usage.tarotThisPeriod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-silver-muted/80 uppercase tracking-wider">Reports this month</span>
                <span className="text-sm text-silver/80">{usage.reportsThisPeriod}</span>
              </div>
            </>
          )}
          <div className="flex justify-between items-center">
            <span className="text-xs text-silver-muted/80 uppercase tracking-wider">Detailed report</span>
            <span className="text-sm text-silver/80">
              {canGenerateReport ? "Available" : `Needs ${CREDIT_COSTS.detailedReport} credits`}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-12">
          <CosmicButton href="/pricing">Upgrade plan</CosmicButton>
          <CosmicButton variant="secondary" href="/tarot/reading">Tarot reading</CosmicButton>
          <button
            type="button"
            onClick={() => logOut()}
            className="text-xs text-silver-faint hover:text-silver-muted py-2"
          >
            Sign out
          </button>
        </div>

        <div id="upgrade-plans" className="border-t border-silver/10 pt-10">
          <PricingSection />
        </div>

        <p className="text-[10px] text-silver-faint/90 mt-10 leading-relaxed">
          Credit costs: tarot from {CREDIT_COSTS.tarotReading} · report {CREDIT_COSTS.detailedReport} · forecast {CREDIT_COSTS.monthlyForecast}.
          Free tier resets monthly. {PLANS[1].name} and {PLANS[2].name} include unlimited tarot.
        </p>
      </div>
      <SiteFooter compact />
    </main>
  );
}
