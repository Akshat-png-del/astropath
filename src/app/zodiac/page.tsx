import type { Metadata } from "next";
import { PillarHubPage } from "@/components/pillars/PillarHubPage";
import { ZODIAC_PILLARS } from "@/content/pillars/zodiac";
import { APP_NAME, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Zodiac Signs — Complete Astrology Guide",
  `Explore all twelve zodiac signs on ${APP_NAME}: personality, love, career, compatibility, ruling planets, and in-depth FAQs.`,
  "/zodiac"
);

export default function ZodiacHubPage() {
  return (
    <PillarHubPage
      hub="zodiac"
      articles={ZODIAC_PILLARS}
      extraLinks={[
        { href: "/learn/zodiac-compatibility-guide", label: "Compatibility guide", description: "How synastry and elements work" },
        { href: "/tarot/reading", label: "Tarot reading", description: "Draw cards for personal reflection" },
      ]}
    />
  );
}
