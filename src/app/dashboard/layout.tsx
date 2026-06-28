import type { Metadata } from "next";
import { pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Dashboard",
  "Your AstroPath dashboard — credits, birth chart report, forecasts, and daily guidance.",
  "/dashboard"
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
