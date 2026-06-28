import type { Metadata } from "next";
import { PillarHubPage } from "@/components/pillars/PillarHubPage";
import { PLANET_PILLARS } from "@/content/pillars/planets";
import { APP_NAME, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Planets in Astrology — Sun, Moon & Planetary Meanings",
  `Learn what each planet means in astrology on ${APP_NAME}: symbolism, sign and house influence, and chart interpretation.`,
  "/planets"
);

export default function PlanetsHubPage() {
  return (
    <PillarHubPage
      hub="planets"
      articles={PLANET_PILLARS}
      extraLinks={[
        { href: "/learn/planets-in-astrology", label: "Planets overview guide", description: "Beginner-friendly introduction" },
        { href: "/houses", label: "Astrological houses", description: "Where planets act in your chart" },
      ]}
    />
  );
}
