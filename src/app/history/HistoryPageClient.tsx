"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { useRetention } from "@/hooks/useRetention";
import type { ReadingType } from "@/lib/retention/types";
import { BTN_CHIP } from "@/lib/ui/button-classes";

const TYPE_LABELS: Record<ReadingType, string> = {
  tarot: "Tarot",
  "birth-chart": "Birth Chart",
  compatibility: "Compatibility",
  chat: "Legacy",
  horoscope: "Horoscope",
};

function historyReopenHref(entry: { type: ReadingType }): string | undefined {
  if (entry.type === "tarot") return "/tarot/reading";
  if (entry.type === "birth-chart" || entry.type === "compatibility" || entry.type === "horoscope") {
    return "/dashboard";
  }
  return undefined;
}

export default function HistoryPageClient() {
  const { history, filterHistory, saveReading, refresh } = useRetention();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ReadingType | "all">("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const filtered = useMemo(
    () => filterHistory({ query, type: typeFilter, sort }).filter((entry) => entry.type !== "chat"),
    [filterHistory, query, typeFilter, sort, history]
  );

  return (
    <PageShell
      width="md"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "History" },
      ]}
      title="Reading history"
      subtitle="Tarot sessions, horoscopes, and chart insights — searchable and saveable."
      stack={false}
      compactFooter
    >
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-faint" />
            <input
              type="search"
              placeholder="Search readings…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-silver/5 border border-silver/15 text-sm text-silver/80 placeholder:text-silver-faint focus:outline-none focus:border-silver/30"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ReadingType | "all")}
            className="rounded-xl bg-silver/5 border border-silver/15 px-4 py-2.5 text-sm text-silver-dim/90 focus:outline-none"
          >
            <option value="all">All types</option>
            <option value="tarot">Tarot</option>
            <option value="birth-chart">Birth chart</option>
            <option value="horoscope">Horoscope</option>
            <option value="compatibility">Compatibility</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
            className="rounded-xl bg-silver/5 border border-silver/15 px-4 py-2.5 text-sm text-silver-dim/90 focus:outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <GlassCard className="text-center py-12">
            <p className="text-silver-muted/80 text-sm">No readings yet.</p>
            <Link href="/tarot/reading" className="text-sm text-silver-dim/80 hover:text-silver/80 mt-4 inline-block underline-offset-2 hover:underline">
              Start with a free tarot reading →
            </Link>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => {
              const href = historyReopenHref(entry);
              return (
                <GlassCard key={entry.id} padding="sm" className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-silver-faint mb-1">
                      {TYPE_LABELS[entry.type]} · {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                    <h2 className="text-sm text-silver/85 truncate">{entry.title}</h2>
                    {entry.summary && (
                      <p className="text-xs text-silver-muted/85 mt-1 line-clamp-2">{entry.summary}</p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {href && (
                      <Link
                        href={href}
                        className={BTN_CHIP}
                      >
                        Reopen
                      </Link>
                    )}
                    {!entry.saved && (
                      <button
                        type="button"
                        onClick={() => {
                          saveReading({
                            type: entry.type,
                            title: entry.title,
                            summary: entry.summary,
                            payload: entry.payload ?? {},
                          });
                          refresh();
                        }}
                        className={BTN_CHIP}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
    </PageShell>
  );
}
