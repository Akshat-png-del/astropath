"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/brand";
import { BRAND_MARK } from "@/lib/symbols";

function parentPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) return "/";
  return `/${segments.slice(0, -1).join("/")}`;
}

interface NavBrandControlProps {
  onNavigate?: () => void;
  className?: string;
}

export function NavBrandControl({ onNavigate, className }: NavBrandControlProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const showBack = !isHome;

  const handleBack = () => {
    onNavigate?.();
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(parentPath(pathname));
  };

  return (
    <div className={cn("flex items-center gap-2.5 min-w-0 shrink-0", className)}>
      <div className="flex items-center gap-2 shrink-0">
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-silver/20 bg-silver/[0.04] text-silver-muted/85 hover:text-silver-dim/90 hover:bg-silver/[0.06] transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        )}
        <Link
          href="/"
          onClick={onNavigate}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-silver/20 bg-silver/[0.04] text-sm text-silver-dim/80 hover:text-silver/85 transition-colors"
          aria-label={`${APP_NAME} home`}
        >
          {BRAND_MARK}
        </Link>
      </div>

      <Link
        href="/"
        onClick={onNavigate}
        className="font-display text-base sm:text-lg text-silver/85 tracking-wide truncate hover:text-silver-bright/90 transition-colors"
      >
        {APP_NAME}
      </Link>
    </div>
  );
}
