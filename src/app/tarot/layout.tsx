import type { Metadata } from "next";
import { pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Tarot",
  "Free tarot readings on AstroPath — guided by IRA through the Major Arcana."
);

export default function TarotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
