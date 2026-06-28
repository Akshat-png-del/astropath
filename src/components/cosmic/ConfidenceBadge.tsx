"use client";

import { confidenceColor, confidenceLabel } from "@/lib/utils";
import { Info } from "lucide-react";
import { useState } from "react";

export function ConfidenceBadge({ confidence, reasoning }: { confidence: number; reasoning?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex items-center gap-1.5">
      <span className={`text-xs ${confidenceColor(confidence)}`}>{confidenceLabel(confidence)}</span>
      {reasoning && (
        <>
          <button onClick={() => setShow(!show)} className="text-silver-faint/90 hover:text-silver-muted/90" aria-label="Why?">
            <Info className="w-3 h-3" />
          </button>
          {show && (
            <div className="absolute top-full left-0 mt-2 z-50 w-64 p-3 rounded-xl glass-card text-xs text-silver-muted/90">
              <p className="text-silver-dim/80 mb-1">Why this insight?</p>
              <p>{reasoning}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
