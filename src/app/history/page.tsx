import type { Metadata } from "next";
import { pageMetadata } from "@/lib/brand";
import HistoryPageClient from "./HistoryPageClient";

export const metadata: Metadata = pageMetadata(
  "Reading History",
  "Your AstroPath reading history — tarot, birth charts, compatibility, and horoscopes.",
  "/history"
);

export default function HistoryPage() {
  return <HistoryPageClient />;
}
