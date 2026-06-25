/**
 * Firestore database architecture — collection schemas & relationships
 *
 * users/{uid}
 *   └── conversations (query: userId)
 *   └── birthProfiles (query: userId)
 *   └── cosmicReports (query: userId)
 *   └── dailyInsights (query: userId + date)
 *   └── userMemories (query: userId)
 *   └── subscriptions/{uid} (doc id = uid)
 *   └── analyticsEvents (query: userId, batched client-side)
 *
 * conversations/{conversationId}
 *   └── messages (query: conversationId, orderBy timestamp)
 *
 * feedback/{id} — user ratings on messages, reports, insights
 * knowledgeEmbeddings/{id} — read-only RAG corpus (admin seeded)
 */

import type {
  Conversation,
  ConversationMessage,
  UserProfile,
  BirthProfile,
  CosmicReport,
  DailyInsight,
  UserMemory,
  Feedback,
} from "@/types";

export type SubscriptionTier = "free" | "cosmic" | "oracle";
export type SubscriptionStatus = "active" | "trialing" | "canceled" | "past_due";

export interface UserSubscription {
  userId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodEnd?: Date;
  features: {
    unlimitedChat: boolean;
    unlimitedTarot: boolean;
    monthlyForecast: boolean;
    compatibilityDeepDive: boolean;
    savedHistory: boolean;
    priorityReports: boolean;
  };
  updatedAt: Date;
}

export interface AnalyticsEvent {
  id: string;
  userId: string | "anonymous";
  event: string;
  properties?: Record<string, string | number | boolean>;
  sessionId?: string;
  createdAt: Date;
}

export interface StoredConversation extends Omit<Conversation, "createdAt" | "updatedAt"> {
  title?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoredMessage extends Omit<ConversationMessage, "timestamp"> {
  timestamp: Date;
}

export const TIER_FEATURES: Record<SubscriptionTier, UserSubscription["features"]> = {
  free: {
    unlimitedChat: false,
    unlimitedTarot: false,
    monthlyForecast: false,
    compatibilityDeepDive: false,
    savedHistory: false,
    priorityReports: false,
  },
  cosmic: {
    unlimitedChat: true,
    unlimitedTarot: true,
    monthlyForecast: true,
    compatibilityDeepDive: true,
    savedHistory: true,
    priorityReports: false,
  },
  oracle: {
    unlimitedChat: true,
    unlimitedTarot: true,
    monthlyForecast: true,
    compatibilityDeepDive: true,
    savedHistory: true,
    priorityReports: true,
  },
};

export type {
  Conversation,
  ConversationMessage,
  UserProfile,
  BirthProfile,
  CosmicReport,
  DailyInsight,
  UserMemory,
  Feedback,
};
