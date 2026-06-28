import type { Metadata } from "next";
import { pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Sign In",
  "Sign in to AstroPath to save readings, manage credits, and unlock your dashboard.",
  "/auth"
);

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
