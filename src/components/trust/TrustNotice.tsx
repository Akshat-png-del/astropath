interface TrustNoticeProps {
  className?: string;
  compact?: boolean;
}

export function TrustNotice({ className = "", compact = false }: TrustNoticeProps) {
  return (
    <div
      role="note"
      className={`rounded-xl border border-silver/10 bg-silver/5 ${compact ? "px-4 py-3" : "px-4 py-4"} text-center ${className}`}
    >
      <p className={`${compact ? "text-[11px]" : "text-xs"} text-silver-muted leading-relaxed`}>
        AstroPath is designed for reflection, education, and self-discovery.
      </p>
    </div>
  );
}
