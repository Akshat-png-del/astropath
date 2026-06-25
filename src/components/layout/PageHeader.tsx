"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Menu, X } from "lucide-react";

interface PageHeaderProps {
  backHref?: string;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  mobileActions?: ReactNode;
}

export function PageHeader({
  backHref = "/",
  icon,
  title,
  subtitle,
  actions,
  mobileActions,
}: PageHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shrink-0 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-2xl safe-top">
      <div className="flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Link
            href={backHref}
            className="shrink-0 text-white/30 hover:text-white/60 transition-colors p-1"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            {icon && (
              <div className="w-8 h-8 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-white/50 text-sm">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="font-display text-sm sm:text-base text-white/70 truncate">{title}</h1>
              {subtitle && (
                <p className="text-[10px] text-white/25 tracking-wider uppercase truncate">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        {actions && (
          <div className="hidden sm:flex items-center gap-2 shrink-0">{actions}</div>
        )}

        {(actions || mobileActions) && (
          <button
            type="button"
            className="sm:hidden shrink-0 w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/50"
            aria-label={menuOpen ? "Close actions" : "Open actions"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        )}
      </div>

      {menuOpen && (mobileActions ?? actions) && (
        <div className="sm:hidden px-3 pb-3 flex flex-wrap gap-2 max-w-6xl mx-auto w-full">
          {mobileActions ?? actions}
        </div>
      )}
    </header>
  );
}
