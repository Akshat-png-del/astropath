import type { Metadata } from "next";
import { pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Account",
  "Manage your AstroPath account, credits, and subscription.",
  "/account"
);

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
