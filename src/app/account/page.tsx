"use client";

import Link from "next/link";
import { LandingNav } from "@/components/landing/Hero";
import { useAuth } from "@/contexts/AuthContext";
import { useBilling } from "@/hooks/useBilling";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { CREDIT_COSTS, getPlan, PLANS } from "@/lib/billing/plans";
import { PricingSection } from "@/components/billing/PricingSection";
import { DevTestingPanel } from "@/components/billing/DevTestingPanel";
import { logOut } from "@/lib/firebase/auth";
import { APP_NAME } from "@/lib/brand";

export default function AccountPage() {
  const { user, loading, firebaseReady } = useAuth();
  const { profile, tier, credits, unlimitedChat, canGenerateReport } = useBilling();

  if (loading) {
    return (
      <main className="min-h-dvh bg-[#050505] flex items-center justify-center text-white/30 text-sm">
        Loading account…
      </main>
    );
  }

  if (!firebaseReady || !user) {
    return (
      <main className="min-h-dvh bg-[#050505] text-white overflow-x-hidden">
        <LandingNav />
        <div className="max-w-md mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-2xl text-white/80 mb-4">Your {APP_NAME} account</h1>
          <p className="text-sm text-white/35 mb-8">Sign in to manage credits, chat history, and subscriptions.</p>
          <CosmicButton href="/auth">Sign in</CosmicButton>
        </div>
      </main>
    );
  }

  const plan = getPlan(tier);
  const usage = profile?.usage;

  return (
    <main className="min-h-dvh bg-[#050505] text-white overflow-x-hidden">
      <LandingNav />
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="font-display text-2xl text-white/85 mb-1">Account</h1>
        <p className="text-sm text-white/35 mb-10">{user.email}</p>

        <DevTestingPanel />

        <div className="glass-card rounded-2xl p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/30 uppercase tracking-wider">Plan</span>
            <span className="text-sm text-white/70 capitalize">{plan.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/30 uppercase tracking-wider">Credits</span>
            <span className="text-sm text-white/70">
              {unlimitedChat ? "Unlimited chat" : `${credits} remaining`}
            </span>
          </div>
          {usage && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/30 uppercase tracking-wider">Messages this month</span>
                <span className="text-sm text-white/70">{usage.messagesThisPeriod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/30 uppercase tracking-wider">Reports this month</span>
                <span className="text-sm text-white/70">{usage.reportsThisPeriod}</span>
              </div>
            </>
          )}
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/30 uppercase tracking-wider">Detailed report</span>
            <span className="text-sm text-white/70">
              {canGenerateReport ? "Available" : `Needs ${CREDIT_COSTS.detailedReport} credits`}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-12">
          <CosmicButton href="/pricing">Upgrade plan</CosmicButton>
          <CosmicButton variant="secondary" href="/chat">Back to chat</CosmicButton>
          <button
            type="button"
            onClick={() => logOut()}
            className="text-xs text-white/25 hover:text-white/45 py-2"
          >
            Sign out
          </button>
        </div>

        <div id="upgrade-plans" className="border-t border-white/[0.06] pt-10">
          <PricingSection />
        </div>

        <p className="text-[10px] text-white/20 mt-10 leading-relaxed">
          Credit costs: chat {CREDIT_COSTS.chatMessage} · report {CREDIT_COSTS.detailedReport} · tarot {CREDIT_COSTS.tarotReading}.
          Free tier resets monthly. {PLANS[1].name} and {PLANS[2].name} include unlimited chat.
        </p>
      </div>
    </main>
  );
}
