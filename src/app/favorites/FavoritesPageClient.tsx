"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { useRetention } from "@/hooks/useRetention";
import type { FavoriteType } from "@/lib/retention/types";

const TYPE_LABELS: Record<FavoriteType, string> = {
  guide: "Guide",
  "tarot-spread": "Tarot Spread",
  zodiac: "Zodiac",
  planet: "Planet",
  house: "House",
  "tarot-card": "Tarot Card",
  reading: "Reading",
};

export default function FavoritesPageClient() {
  const { favorites, toggleFavorite, refresh } = useRetention();
  const [typeFilter, setTypeFilter] = useState<FavoriteType | "all">("all");

  const filtered = useMemo(() => {
    if (typeFilter === "all") return favorites;
    return favorites.filter((f) => f.type === typeFilter);
  }, [favorites, typeFilter]);

  return (
    <PageShell
      width="md"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Favorites" },
      ]}
      title="Favorites"
      subtitle="Guides, zodiac pages, tarot spreads, and readings you've bookmarked."
      stack={false}
      compactFooter
    >
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as FavoriteType | "all")}
          className="mb-6 rounded-xl bg-silver/[0.06] border border-silver/15 px-3 py-2.5 text-sm text-silver-dim/90"
        >
          <option value="all" className="bg-[#111]">All favorites</option>
          {(Object.keys(TYPE_LABELS) as FavoriteType[]).map((t) => (
            <option key={t} value={t} className="bg-[#111]">{TYPE_LABELS[t]}</option>
          ))}
        </select>

        {filtered.length === 0 ? (
          <GlassCard className="text-center py-12">
            <p className="text-silver-muted/80 text-sm mb-4">No favorites yet.</p>
            <Link href="/learn" className="text-sm text-silver-dim/80 hover:text-silver/80 underline-offset-2 hover:underline">
              Explore guides →
            </Link>
          </GlassCard>
        ) : (
          <div className="space-y-2">
            {filtered.map((f) => (
              <GlassCard key={f.id} padding="sm" hover>
                <div className="flex items-center justify-between gap-3">
                  <Link href={f.href} className="min-w-0 flex-1 group">
                    <p className="text-[10px] uppercase tracking-wider text-silver-faint">{TYPE_LABELS[f.type]}</p>
                    <p className="text-sm text-silver-dim group-hover:text-silver-bright/85 transition-colors truncate">
                      {f.title}
                    </p>
                    {f.meta && <p className="text-xs text-silver-muted/80 mt-0.5">{f.meta}</p>}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      toggleFavorite({ href: f.href, title: f.title, type: f.type, meta: f.meta });
                      refresh();
                    }}
                    className="text-xs text-silver-muted/80 hover:text-silver-dim/80 shrink-0"
                  >
                    Remove
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
    </PageShell>
  );
}
