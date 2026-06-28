"use client";

import { TarotExperience } from "@/components/tarot/TarotExperience";
import { PageTransition } from "@/components/cosmic/FadeIn";
import { PageShell } from "@/components/layout/PageShell";
import { FreePlanAd } from "@/components/ads/FreePlanAd";

export default function TarotReadingPage() {
  return (
    <PageTransition>
      <PageShell
        width="lg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tarot", href: "/tarot" },
          { label: "Reading" },
        ]}
        eyebrow="Interactive tarot"
        title="Tarot Reading"
        subtitle="Choose a spread, shuffle the deck, and draw your cards — credit costs shown before you begin."
        compactFooter
        stack={false}
        mainClassName="pb-8"
      >
        <TarotExperience />
        <FreePlanAd className="mt-12 sm:mt-16" />
      </PageShell>
    </PageTransition>
  );
}
