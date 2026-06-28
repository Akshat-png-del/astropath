"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { TarotSpread } from "@/lib/tarot/types";
import { TAROT_SPREADS } from "@/lib/tarot/spreads";
import {
  enrichSpread,
  depthBadgeClass,
  type SpreadCatalogEntry,
} from "@/lib/tarot/spread-catalog";
import { cn } from "@/lib/utils";
import { useBilling } from "@/hooks/useBilling";
import { hasAnonymousTarotTrialLeft } from "@/lib/billing/trials";
import { resolveTarotCost } from "@/lib/billing/daily-free";
import { TarotReadingGuide } from "./TarotReadingGuide";
import { TarotEducationTips } from "./TarotEducationTips";
import { TAROT_SPREAD_SYMBOL, SYMBOL } from "@/lib/symbols";
import { BTN_CHIP } from "@/lib/ui/button-classes";

interface TarotSpreadGridProps {
  onSelect: (spread: TarotSpread) => void;
}

const SPREAD_ICONS = TAROT_SPREAD_SYMBOL;

function SpreadCard({
  entry,
  spread,
  effectiveLabel,
  onSelect,
}: {
  entry: SpreadCatalogEntry;
  spread: TarotSpread;
  effectiveLabel: string;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-card rounded-xl text-left transition-all duration-300 relative overflow-hidden",
        "border border-silver/10 hover:border-silver/25"
      )}
    >
      <button type="button" onClick={onSelect} className="w-full p-4 text-left">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="w-10 h-10 rounded-lg border border-silver/20 flex items-center justify-center text-lg text-silver-dim/80 shrink-0">
            {SPREAD_ICONS[spread.id] ?? SYMBOL.star}
          </div>
          <span className={cn(depthBadgeClass(entry.depthBadge), "shrink-0")}>
            {entry.depthBadge}
          </span>
        </div>
        <h3 className="text-sm font-medium text-silver/90 mb-1">{entry.title}</h3>
        <p className="text-[11px] text-silver-muted/90 leading-relaxed mb-3">{entry.tagline}</p>
        <div className="flex flex-wrap items-center gap-2 text-[10px]">
          <span className={BTN_CHIP}>
            {effectiveLabel}
          </span>
          <span className="text-silver-faint">{entry.estimatedMinutes}</span>
          <span className="text-silver-faint">{spread.cardCount} card{spread.cardCount > 1 ? "s" : ""}</span>
        </div>
      </button>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-center gap-1 py-2 border-t border-silver/10 text-[10px] text-silver-muted/80 hover:text-silver-dim/80 transition-colors"
        aria-expanded={expanded}
      >
        {expanded ? "Hide details" : "Best for & what you'll discover"}
        <ChevronDown className={cn("w-3 h-3 transition-transform", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-1 space-y-3 border-t border-silver/10 text-[11px]">
          <div>
            <p className="text-silver-muted font-medium mb-1">Best for:</p>
            <p className="text-silver-muted/85 leading-relaxed">{entry.bestFor}</p>
          </div>
          <div>
            <p className="text-silver-muted font-medium mb-1">You&apos;ll discover:</p>
            <ul className="list-disc pl-4 space-y-0.5 text-silver-muted/85">
              {entry.discover.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <p className="text-silver-faint">
            Reading depth: {entry.depthLabel} · {entry.estimatedMinutes}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export function TarotSpreadGrid({ onSelect }: TarotSpreadGridProps) {
  const billing = useBilling();
  const [showHelp, setShowHelp] = useState(false);

  const handleGuidePick = (spreadId: string) => {
    const spread = TAROT_SPREADS.find((s) => s.id === spreadId);
    if (spread) onSelect(spread);
  };

  const resolveLabel = (spreadId: string) => {
    const resolved = resolveTarotCost({
      spreadId,
      unlimitedTarot: billing.unlimitedTarot,
      tarotTrialLeft: billing.tarotTrialLeft && !billing.isAnonymousTrial,
      anonymousTrialLeft: billing.isAnonymousTrial && hasAnonymousTarotTrialLeft(),
      credits: billing.credits,
    });
    return resolved.label;
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      <div className="text-center max-w-lg mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl text-silver/90 mb-3">Choose your spread</h2>
        <p className="text-sm text-silver-muted/85 leading-relaxed">
          Each layout explores a different depth — from a single daily card to a full Celtic Cross.
          Tap a spread to begin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {TAROT_SPREADS.map((spread, i) => {
          const entry = enrichSpread(spread);
          return (
            <motion.div
              key={spread.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <SpreadCard
                entry={entry}
                spread={spread}
                effectiveLabel={resolveLabel(spread.id)}
                onSelect={() => onSelect(spread)}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-lg mx-auto">
        <button
          type="button"
          onClick={() => setShowHelp((v) => !v)}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm text-silver-muted/85 hover:text-silver-dim/85 transition-colors"
          aria-expanded={showHelp}
        >
          {showHelp ? "Hide choosing tips" : "Not sure which spread to pick?"}
          <ChevronDown className={cn("w-4 h-4 transition-transform", showHelp && "rotate-180")} />
        </button>
        {showHelp && (
          <div className="space-y-6 pt-2">
            <TarotEducationTips />
            <TarotReadingGuide onPickSpread={handleGuidePick} />
          </div>
        )}
      </div>
    </div>
  );
}
