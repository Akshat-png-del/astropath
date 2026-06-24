"use client";

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

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mr-auto">
      <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/40 text-sm">☽</div>
      <div className="rounded-2xl px-4 py-3 glass-card">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
