import { doc, getDoc } from "firebase/firestore";
import { getFirebaseDb } from "./config";
import { COLLECTIONS } from "./collections";
import { TIER_FEATURES, type SubscriptionTier, type SubscriptionStatus } from "./schemas";

const ACTIVE_STATUSES: SubscriptionStatus[] = ["active", "trialing"];

export interface ResolvedTier {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  features: (typeof TIER_FEATURES)[SubscriptionTier];
  isPaid: boolean;
}

export async function resolveUserTier(uid: string): Promise<ResolvedTier> {
  const db = getFirebaseDb();

  try {
    const subSnap = await getDoc(doc(db, COLLECTIONS.SUBSCRIPTIONS, uid));
    if (subSnap.exists()) {
      const data = subSnap.data();
      const status = (data.status ?? "active") as SubscriptionStatus;
      const tier = (data.tier ?? "free") as SubscriptionTier;
      if (ACTIVE_STATUSES.includes(status) && (tier === "cosmic" || tier === "oracle")) {
        return {
          tier,
          status,
          features: TIER_FEATURES[tier],
          isPaid: true,
        };
      }
    }
  } catch {
    // Fall back to profile tier.
  }

  const userSnap = await getDoc(doc(db, COLLECTIONS.USERS, uid));
  const tier = (userSnap.data()?.subscriptionTier ?? "free") as SubscriptionTier;
  const safeTier = tier === "cosmic" || tier === "oracle" ? tier : "free";

  return {
    tier: safeTier,
    status: "active",
    features: TIER_FEATURES[safeTier],
    isPaid: safeTier !== "free",
  };
}
