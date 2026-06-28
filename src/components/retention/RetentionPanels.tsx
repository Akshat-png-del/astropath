"use client";

import Link from "next/link";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { streakTitle, nextStreakMilestone } from "@/lib/retention/streaks";
import { ACHIEVEMENTS } from "@/lib/retention/achievements";
import type { StreakState } from "@/lib/retention/types";

interface StreakPanelProps {
  streak: StreakState;
}

export function StreakPanel({ streak }: StreakPanelProps) {
  const title = streakTitle(streak.currentStreak);
  const next = nextStreakMilestone(streak.currentStreak);

  return (
    <GlassCard glow className="relative overflow-hidden">
      <p className="text-[10px] tracking-[0.3em] uppercase text-silver-faint mb-2">Current streak</p>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-4xl text-silver-bright/85">{streak.currentStreak}</p>
          <p className="text-xs text-silver-muted/85 mt-1">day{streak.currentStreak !== 1 ? "s" : ""}</p>
          <p className="text-sm text-[var(--zodiac-gold)]/80 mt-2">{title}</p>
        </div>
        <div className="flex gap-1 shrink-0">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-8 rounded-full transition-colors ${
                i < Math.min(streak.currentStreak, 7) ? "bg-silver/35" : "bg-silver/10"
              }`}
            />
          ))}
        </div>
      </div>
      {next && (
        <p className="text-[11px] text-silver-muted/80 mt-4">
          {next.days - streak.currentStreak} day{next.days - streak.currentStreak !== 1 ? "s" : ""} until{" "}
          <span className="text-silver-dim/80">{next.title}</span>
        </p>
      )}
      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-silver/10 text-[10px] text-silver-faint">
        <span>{streak.totalVisits} visits</span>
        <span>·</span>
        <span>{streak.tarotDays} tarot days</span>
        <span>·</span>
        <span>Best: {streak.longestStreak} days</span>
      </div>
    </GlassCard>
  );
}

interface AchievementsPanelProps {
  unlockedIds: string[];
}

export function AchievementsPanel({ unlockedIds }: AchievementsPanelProps) {
  return (
    <GlassCard hover>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-silver/90">Achievements</h3>
        <span className="text-[10px] text-silver-faint">
          {unlockedIds.length}/{ACHIEVEMENTS.length}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ACHIEVEMENTS.map((a) => {
          const unlocked = unlockedIds.includes(a.id);
          return (
            <div
              key={a.id}
              title={a.description}
              className={`rounded-xl p-3 text-center border transition-colors ${
                unlocked
                  ? "border-[var(--zodiac-gold)]/25 bg-[var(--zodiac-gold)]/[0.06]"
                  : "border-silver/10 bg-silver/5 opacity-40"
              }`}
            >
              <span className="text-xl block mb-1">{a.icon}</span>
              <p className="text-[10px] text-silver-dim/85 leading-tight">{a.title}</p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

interface DailyEngagementProps {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  guidance?: string;
  affirmation?: string;
  focusArea?: string;
  mood?: string;
  tarotCard?: { name: string; keyword: string; message: string; href: string };
  cosmicTip?: string;
  recommendedArticle?: { href: string; title: string; reason: string };
  loading?: boolean;
}

export function DailyEngagementPanel({
  sunSign,
  moonSign,
  risingSign,
  guidance,
  affirmation,
  focusArea,
  mood,
  tarotCard,
  cosmicTip,
  recommendedArticle,
  loading,
}: DailyEngagementProps) {
  return (
    <div className="space-y-5">
      <GlassCard glow className="bg-gradient-to-br from-silver/[0.06] to-transparent">
        <p className="text-[10px] tracking-[0.3em] uppercase text-silver-faint mb-2">
          Today&apos;s cosmic snapshot
        </p>
        <p className="text-xs text-silver-muted/80 mb-4">
          {sunSign} sun · {moonSign} moon · {risingSign} rising
        </p>
        {loading ? (
          <div className="h-24 animate-pulse bg-silver/5 rounded-xl" />
        ) : (
          <>
            <h3 className="font-display text-lg text-silver/85 mb-2">Daily horoscope</h3>
            <p className="text-sm text-silver-dim/85 leading-relaxed mb-3">{guidance}</p>
            {affirmation && (
              <p className="text-xs text-silver-muted/85 italic mb-3">&ldquo;{affirmation}&rdquo;</p>
            )}
            <div className="flex flex-wrap gap-2">
              {focusArea && (
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-silver/[0.06] border border-silver/10 text-silver-muted/85">
                  Focus: {focusArea}
                </span>
              )}
              {mood && (
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-silver/[0.06] border border-silver/10 text-silver-muted/80">
                  Mood: {mood}
                </span>
              )}
            </div>
          </>
        )}
      </GlassCard>

      {tarotCard && (
        <GlassCard hover>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a227]/40 mb-2">Daily tarot card</p>
          <h3 className="font-display text-xl text-silver/90 mb-1">{tarotCard.name}</h3>
          <p className="text-xs text-silver-muted/80 mb-3 capitalize">{tarotCard.keyword}</p>
          <p className="text-sm text-silver-muted leading-relaxed mb-4">{tarotCard.message}</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={tarotCard.href}
              className="text-xs text-silver-dim/80 hover:text-silver/80 underline-offset-2 hover:underline"
            >
              Full card meaning →
            </Link>
            <Link
              href="/tarot/reading"
              className="text-xs text-silver-muted/90 hover:text-silver-dim/90 underline-offset-2 hover:underline"
            >
              Draw a spread
            </Link>
          </div>
        </GlassCard>
      )}

      {cosmicTip && (
        <GlassCard padding="sm">
          <p className="text-[10px] tracking-[0.25em] uppercase text-silver-faint mb-2">Cosmic tip of the day</p>
          <p className="text-sm text-silver-muted leading-relaxed">{cosmicTip}</p>
        </GlassCard>
      )}

      {recommendedArticle && (
        <GlassCard padding="sm">
          <p className="text-[10px] tracking-[0.25em] uppercase text-silver-faint mb-2">Recommended for you</p>
          <Link href={recommendedArticle.href} className="group block">
            <p className="text-sm text-silver-dim group-hover:text-silver-bright/85 transition-colors">
              {recommendedArticle.title}
            </p>
            <p className="text-[11px] text-silver-muted/80 mt-1">{recommendedArticle.reason}</p>
          </Link>
        </GlassCard>
      )}
    </div>
  );
}

interface ReadingsListProps {
  title: string;
  items: { id: string; type: string; title: string; summary: string; createdAt: string; href?: string }[];
  emptyMessage: string;
  viewAllHref?: string;
  onRemove?: (id: string) => void;
}

export function ReadingsListPanel({ title, items, emptyMessage, viewAllHref, onRemove }: ReadingsListProps) {
  return (
    <GlassCard hover>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-silver/90">{title}</h3>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-[11px] text-silver-muted/85 hover:text-silver-dim/85">
            View all →
          </Link>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-silver-faint">{emptyMessage}</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-silver/5 border border-silver/10 flex gap-3 items-start"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-silver-faint/90 mb-0.5">{item.type}</p>
                <p className="text-sm text-silver-dim/90 truncate">{item.title}</p>
                <p className="text-xs text-silver-muted/80 line-clamp-2 mt-1">{item.summary}</p>
                <p className="text-[10px] text-silver-faint/90 mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                {item.href && (
                  <Link
                    href={item.href}
                    className="text-[10px] text-silver-muted/90 hover:text-silver-dim/90 underline-offset-2 hover:underline"
                  >
                    Open
                  </Link>
                )}
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="text-[10px] text-silver-faint hover:text-silver-muted"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

interface RecommendationsPanelProps {
  items: { href: string; title: string; reason: string }[];
}

export function RecommendationsPanel({ items }: RecommendationsPanelProps) {
  if (!items.length) return null;
  return (
    <GlassCard hover>
      <h3 className="font-display text-lg text-silver/90 mb-4">Recommended guides</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block p-3 rounded-xl bg-silver/5 border border-silver/10 hover:border-silver/15 transition-colors group"
          >
            <p className="text-sm text-silver-dim/90 group-hover:text-silver/90">{item.title}</p>
            <p className="text-[11px] text-silver-muted/80 mt-0.5">{item.reason}</p>
          </Link>
        ))}
      </div>
    </GlassCard>
  );
}

interface FavoritesPreviewProps {
  favorites: { id: string; title: string; href: string; type: string }[];
}

export function FavoritesPreviewPanel({ favorites }: FavoritesPreviewProps) {
  const preview = favorites.slice(0, 4);
  return (
    <GlassCard hover>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-silver/90">Favorite articles</h3>
        <Link href="/favorites" className="text-[11px] text-silver-muted/85 hover:text-silver-dim/85">
          View all →
        </Link>
      </div>
      {preview.length === 0 ? (
        <p className="text-sm text-silver-faint">
          Favorite guides, zodiac pages, and spreads as you explore.{" "}
          <Link href="/learn" className="text-silver-muted/90 hover:text-silver-dim/90 underline-offset-2 hover:underline">
            Browse Learn
          </Link>
        </p>
      ) : (
        <div className="space-y-2">
          {preview.map((f) => (
            <Link
              key={f.id}
              href={f.href}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-silver/5 transition-colors"
            >
              <span className="text-[10px] text-silver-faint/90 uppercase w-16 shrink-0">{f.type}</span>
              <span className="text-sm text-silver-dim/85 truncate">{f.title}</span>
            </Link>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

interface NotificationPrefsPanelProps {
  prefs: import("@/lib/retention/types").NotificationPrefs;
  onChange: (prefs: Partial<import("@/lib/retention/types").NotificationPrefs>) => void;
}

export function NotificationPrefsPanel({ prefs, onChange }: NotificationPrefsPanelProps) {
  const toggle = (key: keyof typeof prefs, value: boolean) => onChange({ [key]: value });

  return (
    <GlassCard padding="sm">
      <h3 className="font-display text-base text-silver/80 mb-3">Daily reminders</h3>
      <p className="text-xs text-silver-muted/80 mb-4">Optional browser notifications — you control what you receive.</p>
      <div className="space-y-3">
        <label className="flex items-center justify-between gap-3 text-sm text-silver-muted">
          <span>Enable notifications</span>
          <input
            type="checkbox"
            checked={prefs.enabled}
            onChange={(e) => toggle("enabled", e.target.checked)}
            className="rounded border-silver/30"
          />
        </label>
        {prefs.enabled && (
          <>
            <label className="flex items-center justify-between gap-3 text-xs text-silver-muted/90">
              <span>Daily horoscope ready</span>
              <input
                type="checkbox"
                checked={prefs.dailyHoroscope}
                onChange={(e) => toggle("dailyHoroscope", e.target.checked)}
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-xs text-silver-muted/90">
              <span>Free tarot available</span>
              <input
                type="checkbox"
                checked={prefs.freeTarot}
                onChange={(e) => toggle("freeTarot", e.target.checked)}
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-xs text-silver-muted/90">
              <span>Streak reminder</span>
              <input
                type="checkbox"
                checked={prefs.streakReminder}
                onChange={(e) => toggle("streakReminder", e.target.checked)}
              />
            </label>
          </>
        )}
      </div>
    </GlassCard>
  );
}
