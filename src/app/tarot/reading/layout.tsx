import type { Metadata } from "next";
import { pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Tarot Reading",
  "Free tarot readings on AstroPath — guided spreads through the Major Arcana with transparent credit costs.",
  "/tarot/reading"
);

export default function TarotReadingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
