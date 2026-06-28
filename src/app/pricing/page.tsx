import { PageShell } from "@/components/layout/PageShell";
import { PricingSection } from "@/components/billing/PricingSection";

export default function PricingPage() {
  return (
    <PageShell
      width="lg"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      eyebrow="Start free · upgrade when ready"
      title="Plans & pricing"
      subtitle="Free credits and daily tarot to start. Upgrade for unlimited readings and deeper chart insights."
      stack={false}
    >
      <PricingSection embedded />
    </PageShell>
  );
}
