import type { Metadata } from "next";
import { PillarHubPage } from "@/components/pillars/PillarHubPage";
import { TAROT_PILLARS } from "@/content/pillars/tarot";
import { APP_NAME, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Tarot Card Meanings — Major Arcana Guide",
  `Complete Major Arcana encyclopedia on ${APP_NAME}: upright and reversed meanings, love, career, and spiritual interpretations.`,
  "/tarot"
);

export default function TarotHubPage() {
  return (
    <PillarHubPage
      hub="tarot"
      articles={TAROT_PILLARS}
      extraLinks={[
        {
          href: "/tarot/reading",
          label: "Start a tarot reading",
          description: "Interactive spreads with credit transparency",
          highlight: true,
        },
        { href: "/learn/how-tarot-readings-work", label: "How tarot works", description: "Educational guide" },
      ]}
    />
  );
}
