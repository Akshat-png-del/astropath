import { LandingNav } from "@/components/landing/Hero";
import { PricingSection } from "@/components/billing/PricingSection";

export default function PricingPage() {
  return (
    <main className="min-h-dvh bg-[#050505] text-white relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]" />
      <LandingNav />
      <PricingSection />
    </main>
  );
}
