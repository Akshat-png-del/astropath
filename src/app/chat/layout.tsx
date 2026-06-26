import type { Metadata } from "next";
import { pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Chat",
  "Talk with AstroPath — personalized astrology readings that learn your story."
);

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
