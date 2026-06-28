"use client";

import Link from "next/link";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { CREDIT_COSTS, FREE_MONTHLY_CREDITS, FREE_TRIAL_CREDITS } from "@/lib/billing/plans";
import { PAID_PLANS_LABEL, STELLAR_PLAN_NAME } from "@/lib/brand";
import { BTN_TEXT } from "@/lib/ui/button-classes";

export type UpgradeReason =
  | "credits"
  | "report"
  | "signin"
  | "history"
  | "tarot"
  | "forecast"
  | "compatibility";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  reason?: UpgradeReason;
}

const COPY: Record<UpgradeReason, { title: string; body: string }> = {
  credits: {
    title: "You're out of credits for now",
    body: `Credits power tarot and reports. Your free starter balance is ${FREE_TRIAL_CREDITS} credits — return tomorrow for a free daily reading, explore our guides at no cost, or upgrade for unlimited exploration.`,
  },
  report: {
    title: "Unlock your birth chart analysis",
    body: `Full birth chart reports use ${CREDIT_COSTS.detailedReport} credits. ${PAID_PLANS_LABEL} plans include unlimited reports and extended interpretations.`,
  },
  signin: {
    title: "Sign in to continue exploring",
    body: `Create a free account for ${FREE_MONTHLY_CREDITS} monthly credits, 1 free tarot per month, a free daily card, saved progress, and optional unlimited access on paid plans.`,
  },
  history: {
    title: `Cloud history is a ${STELLAR_PLAN_NAME} feature`,
    body: "Upgrade for unlimited tarot, saved reading history across devices, and priority access.",
  },
  tarot: {
    title: "Continue your tarot journey",
    body: `Free accounts get a daily card, one monthly complimentary reading, and transparent per-spread costs. ${PAID_PLANS_LABEL} unlock unlimited readings and deeper spreads.`,
  },
  forecast: {
    title: "Unlock monthly forecast",
    body: `Month-ahead guidance is on ${PAID_PLANS_LABEL} plans, or use ${CREDIT_COSTS.monthlyForecast} credits on Free.`,
  },
  compatibility: {
    title: "Unlock compatibility deep-dive",
    body: `Full zodiac compatibility analysis uses ${CREDIT_COSTS.compatibilityReading} credits, or is included with ${PAID_PLANS_LABEL} plans.`,
  },
};

export function UpgradeModal({ open, onClose, reason = "credits" }: UpgradeModalProps) {
  if (!open) return null;
  const { title, body } = COPY[reason];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card rounded-3xl p-8 max-w-sm w-full text-center">
        <h3 className="font-display text-xl text-silver-bright/85 mb-2">{title}</h3>
        <p className="text-sm text-silver-muted/90 leading-relaxed mb-6">{body}</p>
        <div className="flex flex-col gap-2">
          {reason === "signin" ? (
            <CosmicButton href="/auth" className="w-full">Sign in free</CosmicButton>
          ) : reason === "credits" ? (
            <>
              <CosmicButton href="/guides" variant="secondary" className="w-full">
                Explore free guides
              </CosmicButton>
              <CosmicButton href="/pricing" className="w-full">
                Unlimited exploration
              </CosmicButton>
            </>
          ) : (
            <CosmicButton href="/pricing" className="w-full">View plans</CosmicButton>
          )}
          {reason !== "signin" && (
            <Link
              href="/auth"
              className="text-xs text-silver-muted/80 hover:text-silver-dim/80 py-2"
              onClick={onClose}
            >
              Sign in for free daily readings
            </Link>
          )}
          <button
            type="button"
            onClick={onClose}
            className={BTN_TEXT}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
