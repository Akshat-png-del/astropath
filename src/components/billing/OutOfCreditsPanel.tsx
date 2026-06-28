"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useBilling } from "@/hooks/useBilling";
import { FREE_TRIAL_CREDITS } from "@/lib/billing/plans";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { BTN_TEXT } from "@/lib/ui/button-classes";

interface OutOfCreditsPanelProps {
  onClose: () => void;
  context?: "tarot" | "chat" | "general";
}

export function OutOfCreditsPanel({ onClose, context = "general" }: OutOfCreditsPanelProps) {
  const billing = useBilling();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card rounded-3xl p-8 max-w-md w-full text-center">
        <div className="w-12 h-12 mx-auto rounded-full border border-silver/20 flex items-center justify-center mb-4">
          <Sparkles className="w-5 h-5 text-silver-muted/90" />
        </div>
        <h3 className="font-display text-xl text-silver-bright/85 mb-2">
          You&apos;re out of credits for now
        </h3>
        <p className="text-sm text-silver-muted/90 leading-relaxed mb-6">
          {context === "tarot"
            ? "This reading needs credits, but your balance is empty. Credits are only deducted after a successful reading — you haven't been charged."
            : `Each action uses credits from your ${FREE_TRIAL_CREDITS}-credit starter balance. You can return tomorrow for free daily readings, explore guides at no cost, or upgrade for unlimited exploration.`}
        </p>

        <div className="space-y-2 text-left text-xs text-silver-muted/85 mb-6 rounded-xl border border-silver/10 p-4">
          <p className="text-silver-dim/80 font-medium mb-2">What you can do now:</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>Return tomorrow for a free daily tarot card</li>
            <li>Read free guides on birth charts, moon signs, and more</li>
            <li>Upgrade for unlimited readings and deeper insights</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <CosmicButton href="/guides" className="w-full" variant="secondary">
            Explore free guides
          </CosmicButton>
          <CosmicButton href="/pricing" className="w-full">
            Unlimited exploration
          </CosmicButton>
          {!billing.unlimitedTarot && (
            <p className="text-[10px] text-silver-faint pt-1">
              Stellar &amp; Oracle plans include unlimited tarot
            </p>
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
