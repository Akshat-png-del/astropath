import type { Metadata } from "next";
import { pageMetadata } from "@/lib/brand";
import FavoritesPageClient from "./FavoritesPageClient";

export const metadata: Metadata = pageMetadata(
  "Favorites",
  "Your saved AstroPath guides, zodiac pages, tarot spreads, and readings.",
  "/favorites"
);

export default function FavoritesPage() {
  return <FavoritesPageClient />;
}
