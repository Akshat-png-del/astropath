"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BTN_ICON, BTN_NAV } from "@/lib/ui/button-classes";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { NavBrandControl } from "@/components/layout/NavBrandControl";

/** Primary navigation — inline on xl+; collapsible menu below xl */
export const PRIMARY_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/tarot", label: "Tarot" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export function AppNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-silver/10 bg-background/94 backdrop-blur-xl safe-top">
      <div className="flex items-center gap-3 sm:gap-4 w-full min-w-0 px-4 sm:px-6 lg:px-10 xl:px-14 py-4">
        <NavBrandControl onNavigate={() => setOpen(false)} />

        <div className="flex-1 min-w-0" aria-hidden />

        <div className="hidden xl:flex items-center justify-end flex-nowrap gap-0.5 2xl:gap-1.5 shrink-0 min-w-0">
          {PRIMARY_NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={BTN_NAV}>
              {link.label}
            </Link>
          ))}
          <CosmicButton size="sm" href="/tarot/reading" className="ml-1 2xl:ml-2 shrink-0 whitespace-nowrap">
            Free reading
          </CosmicButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(BTN_ICON, "inline-flex xl:hidden shrink-0")}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="px-4 sm:px-6 lg:px-10 xl:px-14 pb-4 xl:hidden">
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="glass-card rounded-2xl p-3 flex flex-col gap-0.5">
            {PRIMARY_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3.5 rounded-xl text-sm text-silver/80 hover:text-silver-bright hover:bg-silver/[0.06] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 px-2">
              <CosmicButton size="md" href="/tarot/reading" className="w-full justify-center">
                Free tarot reading
              </CosmicButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
