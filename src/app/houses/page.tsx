import type { Metadata } from "next";
import { PillarHubPage } from "@/components/pillars/PillarHubPage";
import { HOUSE_PILLARS } from "@/content/pillars/houses";
import { APP_NAME, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Astrological Houses — First Through Twelfth House",
  `Understand all twelve astrological houses on ${APP_NAME}: life areas, planetary placements, cusp signs, and chart reading.`,
  "/houses"
);

export default function HousesHubPage() {
  return (
    <PillarHubPage
      hub="houses"
      articles={HOUSE_PILLARS}
      extraLinks={[
        { href: "/planets", label: "Planets guide", description: "What activates each house" },
        { href: "/learn/twelve-houses-explained", label: "Houses overview", description: "Long-form educational guide" },
      ]}
    />
  );
}
