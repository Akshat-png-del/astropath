import type { Metadata } from "next";
import { pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Pricing",
  "AstroPath plans and credits — start free, upgrade for unlimited tarot and premium features.",
  "/pricing"
);

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
