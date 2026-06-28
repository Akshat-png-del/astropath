"use client";

import { cn } from "@/lib/utils";
import { SYMBOL } from "@/lib/symbols";

interface StepProgressProps {
  steps: string[];
  currentIndex: number;
  className?: string;
}

export function StepProgress({ steps, currentIndex, className }: StepProgressProps) {
  return (
    <nav
      aria-label="Progress"
      className={cn("w-full overflow-x-auto pb-1 -mx-1 px-1", className)}
    >
      <ol className="flex items-center gap-2 sm:gap-3 min-w-max mx-auto justify-center">
        {steps.map((label, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={label} className="flex items-center gap-2 sm:gap-3">
              {i > 0 && (
                <span
                  className={cn(
                    "hidden sm:block w-6 lg:w-10 h-px",
                    done ? "bg-silver/25" : "bg-silver/10"
                  )}
                  aria-hidden
                />
              )}
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-medium border transition-colors",
                    active && "border-silver/40 bg-silver/10 text-silver/90",
                    done && "border-silver/30 bg-silver/10 text-silver-dim/80",
                    !active && !done && "border-silver/20 text-silver-faint"
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? SYMBOL.check : i + 1}
                </span>
                <span
                  className={cn(
                    "text-[10px] sm:text-xs tracking-wide whitespace-nowrap",
                    active ? "text-silver-dim" : "text-silver-muted/80"
                  )}
                >
                  {label}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
