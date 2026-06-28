"use client";

import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRetention } from "@/hooks/useRetention";
import type { FavoriteType } from "@/lib/retention/types";
import { BTN_CHIP } from "@/lib/ui/button-classes";

interface FavoriteButtonProps {
  href: string;
  title: string;
  type: FavoriteType;
  meta?: string;
  className?: string;
  compact?: boolean;
}

export function FavoriteButton({ href, title, type, meta, className, compact }: FavoriteButtonProps) {
  const { isFavorited, toggleFavorite } = useRetention();
  const active = isFavorited(href);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite({ href, title, type, meta })}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      className={cn(
        BTN_CHIP,
        compact && "px-2 py-1",
        active && "btn-active",
        className
      )}
    >
      <Bookmark className={cn("w-3.5 h-3.5", active && "fill-current")} />
      {compact ? null : active ? "Saved" : "Favorite"}
    </button>
  );
}
