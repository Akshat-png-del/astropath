"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/brand";

const NAV_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/tarot", label: "Tarot" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/account", label: "Account" },
  { href: "/auth", label: "Sign In" },
];

export function AppNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0" onClick={() => setOpen(false)}>
          <div className="w-8 h-8 shrink-0 rounded-full border border-white/10 flex items-center justify-center">
            <span className="text-white/50 text-sm">☽</span>
          </div>
          <span className="font-display text-base sm:text-lg text-white/75 tracking-wide truncate">
            {APP_NAME}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          {NAV_LINKS.map((link) => (
            <CosmicButton key={link.href} variant="ghost" size="sm" href={link.href}>
              {link.label}
            </CosmicButton>
          ))}
          <CosmicButton size="sm" href="/chat">Begin Reading</CosmicButton>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <CosmicButton size="sm" href="/chat">
            Chat
          </CosmicButton>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white/90 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-out",
          open ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        )}
      >
        <div className="glass-card rounded-2xl p-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <CosmicButton href="/chat" className="w-full mt-1" onClick={() => setOpen(false)}>
            Begin Reading
          </CosmicButton>
        </div>
      </div>
    </nav>
  );
}
