"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { PLANS, CREDIT_COSTS } from "@/lib/billing/plans";
import { useAuth } from "@/contexts/AuthContext";
import { useBilling } from "@/hooks/useBilling";

export function PricingSection() {
  const { user } = useAuth();
  const { tier } = useBilling();

  return (
    <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 max-w-5xl mx-auto w-full">
      <div className="text-center mb-14">
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-4">Freemium · Credits · Plans</p>
        <h1 className="font-display text-3xl sm:text-4xl text-white/85 mb-4">Choose your astrology path</h1>
        <p className="text-white/35 max-w-lg mx-auto text-sm leading-relaxed">
          Start free with {PLANS[0].creditsPerMonth} credits per month.
          Chat costs {CREDIT_COSTS.chatMessage} credit · reports {CREDIT_COSTS.detailedReport} credits · tarot {CREDIT_COSTS.tarotReading} credits.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {PLANS.map((plan, i) => {
          const isCurrent = user && tier === plan.id;
          const highlighted = plan.id === "cosmic";

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl border p-6 flex flex-col ${
                highlighted
                  ? "border-white/20 bg-white/[0.06] shadow-[0_0_60px_rgba(255,255,255,0.06)]"
                  : "border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              {highlighted && (
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/50 mb-3">Most popular</span>
              )}
              <h2 className="font-display text-xl text-white/80">{plan.name}</h2>
              <p className="text-xs text-white/30 mt-1 mb-4">{plan.tagline}</p>
              <div className="mb-6">
                <span className="text-3xl font-display text-white/90">${plan.priceMonthly}</span>
                {plan.priceMonthly > 0 && (
                  <span className="text-xs text-white/30"> / month</span>
                )}
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-xs text-white/45">
                    <Check className="w-3.5 h-3.5 text-white/30 flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <CosmicButton variant="secondary" className="w-full" disabled>
                  Current plan
                </CosmicButton>
              ) : plan.id === "free" ? (
                <CosmicButton variant="ghost" href={user ? "/chat" : "/auth"} className="w-full">
                  {user ? "Keep exploring" : "Start free"}
                </CosmicButton>
              ) : (
                <CosmicButton
                  href={user ? "/account#upgrade-plans" : "/auth"}
                  className="w-full"
                  variant={highlighted ? "primary" : "secondary"}
                >
                  Upgrade to {plan.name}
                </CosmicButton>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-white/20 mt-10 max-w-md mx-auto leading-relaxed">
        Payments via Stripe (coming soon in production). For now, sign in to use your free monthly credits.
        {" "}
        <Link href="/account" className="text-white/35 hover:text-white/55 underline-offset-2 hover:underline">
          Account & usage
        </Link>
      </p>
    </section>
  );
}
