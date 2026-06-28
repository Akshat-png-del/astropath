import type { Metadata } from "next";
import { APP_DESCRIPTION, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Guides",
  APP_DESCRIPTION,
  "/guides"
);

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
