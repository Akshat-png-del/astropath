import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LearnHub } from "@/components/education/LearnHub";
import { TrustNotice } from "@/components/trust/TrustNotice";
import { pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Learn Astrology — Free Guides & Courses",
  "Premium astrology education: birth charts, zodiac signs, planets, houses, aspects, tarot, and compatibility. Beginner-friendly long-form guides.",
  "/learn"
);

export default function LearnPage() {
  return (
    <PageShell
      width="xl"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Learn" }]}
      eyebrow="AstroPath Academy"
      title="Learn Astrology"
      subtitle="Free, beginner-friendly guides on birth charts, tarot, compatibility, and more."
      stack={false}
    >
      <TrustNotice className="mb-10 max-w-2xl" compact />
      <LearnHub showHeader={false} />
    </PageShell>
  );
}
