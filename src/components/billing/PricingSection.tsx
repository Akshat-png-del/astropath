"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { PLANS, CREDIT_COSTS, CREDIT_COST_GUIDE } from "@/lib/billing/plans";
import { formatCreditCost } from "@/lib/billing/credit-pricing";
import { useAuth } from "@/contexts/AuthContext";
import { useBilling } from "@/hooks/useBilling";

export function PricingSection({ embedded = false }: { embedded?: boolean }) {
  const { user } = useAuth();
  const { tier } = useBilling();

  return (
    <section className={embedded ? "w-full" : "relative z-10 px-4 sm:px-6 py-12 sm:py-16 max-w-5xl mx-auto w-full"}>
      {!embedded && (
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.35em] uppercase text-silver-faint mb-4">Start free · Upgrade when ready</p>
          <h1 className="font-display text-3xl sm:text-4xl text-silver-bright/85 mb-4">Unlimited exploration</h1>
          <p className="text-silver-muted/85 max-w-lg mx-auto text-sm leading-relaxed">
            Start with free credits and daily tarot. Upgrade for unlimited readings and deeper chart insights.
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-silver/10 bg-silver/5 p-5 sm:p-6 mb-10 max-w-2xl mx-auto">
        <h2 className="text-sm text-silver-dim/90 mb-3 text-center">Transparent credit costs</h2>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-silver-muted/90">
          {CREDIT_COST_GUIDE.map((item) => (
            <li key={item.label} className="flex justify-between gap-4 border-b border-silver/10 pb-2">
              <span>{item.label}</span>
              <span className="text-silver-dim/85 shrink-0">{formatCreditCost(item.cost)}</span>
            </li>
          ))}
        </ul>
        <p className="text-[10px] text-silver-faint text-center mt-4">
          Costs shown before you start · Credits deduct only after a successful reading or response
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {PLANS.map((plan, i) => {
          const isCurrent = user && tier === plan.id;
          const highlighted = plan.id === "cosmic";
          const planHref =
            plan.id === "free"
              ? user
                ? "/tarot/reading"
                : "/auth"
              : user
                ? "/account#upgrade-plans"
                : "/auth";
          const planLabel =
            plan.id === "free"
              ? user
                ? "Keep exploring"
                : "Start free"
              : "Unlock unlimited";

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl border p-6 flex flex-col ${
                highlighted
                  ? "border-silver/30 bg-silver/10 shadow-[0_0_60px_rgba(196,196,204,0.06)]"
                  : "border-silver/15 bg-silver/5"
              }`}
            >
              {highlighted && (
                <span className="text-[9px] tracking-[0.2em] uppercase text-silver-dim/80 mb-3">Most popular</span>
              )}
              <h2 className="font-display text-xl text-silver/90">{plan.name}</h2>
              <p className="text-xs text-silver-muted/80 mt-1 mb-4">{plan.tagline}</p>
              <div className="mb-6">
                <span className="text-3xl font-display text-silver-bright/90">${plan.priceMonthly}</span>
                {plan.priceMonthly > 0 && (
                  <span className="text-xs text-silver-muted/80"> / month</span>
                )}
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-xs text-silver-muted">
                    <Check className="w-3.5 h-3.5 text-silver-muted/80 flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <CosmicButton variant="primary" className="w-full" disabled>
                  Current plan
                </CosmicButton>
              ) : (
                <CosmicButton variant="primary" href={planHref} className="w-full">
                  {planLabel}
                </CosmicButton>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-silver-faint/90 mt-10 max-w-md mx-auto leading-relaxed">
        Payments via Stripe (coming soon in production). For now, sign in to use your free monthly credits.
        {" "}
        <Link href="/account" className="text-silver-muted/85 hover:text-silver-dim/85 underline-offset-2 hover:underline">
          Account & usage
        </Link>
      </p>
    </section>
  );
}
