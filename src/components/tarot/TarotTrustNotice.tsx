"use client";

export function TarotTrustNotice({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-[11px] text-silver-muted/80 leading-relaxed text-center max-w-2xl mx-auto ${className}`}
      role="note"
    >
      AstroPath readings are designed for reflection, self-discovery, and personal insight.
    </p>
  );
}
