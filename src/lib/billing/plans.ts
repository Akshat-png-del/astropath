import type { SubscriptionTier } from "@/lib/firebase/schemas";
import {
  CREDIT_COSTS,
  FREE_MONTHLY_CREDITS,
  FREE_TRIAL_CREDITS,
  ANONYMOUS_TRIAL_CREDITS,
} from "./credits-constants";

export { CREDIT_COSTS, FREE_MONTHLY_CREDITS, FREE_TRIAL_CREDITS, ANONYMOUS_TRIAL_CREDITS };
export { ANONYMOUS_MESSAGE_LIMIT, ANONYMOUS_TAROT_TRIAL, FREE_TAROT_TRIAL_PER_MONTH } from "./trials";

export interface PlanDefinition {
  id: SubscriptionTier;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  creditsPerMonth: number | "unlimited";
  highlights: string[];
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
}

export const PLANS: PlanDefinition[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Start your astrology journey",
    priceMonthly: 0,
    priceYearly: 0,
    creditsPerMonth: FREE_MONTHLY_CREDITS,
    highlights: [
      `${FREE_TRIAL_CREDITS} free trial credits (no sign-in)`,
      "1 free tarot trial · then 2 credits each",
      "Astrology chat (1 credit / message)",
      `${FREE_TRIAL_CREDITS} credits / month when signed in`,
    ],
  },
  {
    id: "cosmic",
    name: "Stellar",
    tagline: "For regular seekers",
    priceMonthly: 9,
    priceYearly: 79,
    creditsPerMonth: "unlimited",
    highlights: [
      "Unlimited chat & tarot",
      "Cloud chat history",
      "Monthly forecast & compatibility",
      "3 detailed reports / month included",
    ],
    stripePriceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_COSMIC_MONTHLY,
    stripePriceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_COSMIC_YEARLY,
  },
  {
    id: "oracle",
    name: "Oracle",
    tagline: "Full astrology access",
    priceMonthly: 19,
    priceYearly: 149,
    creditsPerMonth: "unlimited",
    highlights: [
      "Everything in Stellar",
      "Unlimited detailed reports",
      "Priority chart readings",
      "Early access to new spreads",
    ],
    stripePriceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ORACLE_MONTHLY,
    stripePriceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ORACLE_YEARLY,
  },
];

export function getPlan(tier: SubscriptionTier): PlanDefinition {
  return PLANS.find((p) => p.id === tier) ?? PLANS[0];
}

export function reportsIncludedPerMonth(tier: SubscriptionTier): number {
  if (tier === "oracle") return 999;
  if (tier === "cosmic") return 3;
  return 0;
}
