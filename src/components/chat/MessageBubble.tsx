"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function MessageBubble({ role, content, isStreaming }: MessageBubbleProps) {
  const isUser = role === "user";
  if (!content && !isStreaming) return null;

  return (
    <div className={cn("flex gap-3 max-w-[88%]", isUser ? "ml-auto flex-row-reverse" : "mr-auto")}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm",
        isUser ? "bg-white/[0.06] border border-white/10 text-white/40" : "bg-white/[0.08] border border-white/15 text-white/60"
      )}>
        {isUser ? "◈" : "☽"}
      </div>
      <div className={cn(
        "rounded-2xl px-4 py-3 text-sm leading-relaxed",
        isUser ? "bg-white/[0.06] border border-white/[0.08] text-white/80" : "glass-card text-white/60"
      )}>
        <p className="whitespace-pre-wrap">
          {content}
          {isStreaming && <span className="inline-block w-0.5 h-4 ml-0.5 bg-white/40 animate-pulse" />}
        </p>
      </div>
    </div>
  );
}

const THINKING_LABELS = [
  "Reading your chart…",
  "Consulting the stars…",
  "Preparing your reading…",
  "Aligning the planets…",
];

export function ThinkingIndicator() {
  const [labelIndex, setLabelIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLabelIndex((i) => (i + 1) % THINKING_LABELS.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3 mr-auto max-w-[88%]">
      <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-white/60 text-sm shrink-0">
        ☽
      </div>
      <div className="rounded-2xl px-4 py-3 glass-card border border-white/[0.06] min-w-[180px]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 shrink-0">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-violet-300/70 animate-bounce"
                style={{ animationDelay: `${i * 0.14}s` }}
              />
            ))}
          </div>
          <p className="text-xs text-white/45 tracking-wide transition-opacity duration-300">
            {THINKING_LABELS[labelIndex]}
          </p>
        </div>
        <div className="mt-2 h-0.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-violet-400/50 to-transparent animate-thinking-shimmer" />
        </div>
      </div>
    </div>
  );
}

/** @deprecated Use ThinkingIndicator */
export function TypingIndicator() {
  return <ThinkingIndicator />;
}
