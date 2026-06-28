import type { Metadata } from "next";
import { pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Tarot",
  "Tarot card meanings and free readings on AstroPath — Major Arcana guide and interactive spreads.",
  "/tarot"
);

export default function TarotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
