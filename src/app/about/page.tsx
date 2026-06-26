import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { APP_NAME, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "About Us",
  `Learn about ${APP_NAME}, your personal cosmic astrology and tarot companion.`
);

export default function AboutPage() {
  return (
    <LegalPageLayout
      title="About Us"
      subtitle="A wise cosmic companion that understands your story before reading your stars."
    >
      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">Our mission</h2>
        <p>
          {APP_NAME} is a personal astrology and tarot experience built for self-discovery—not
          fear. We combine conversational AI, birth-chart insights, tarot readings, and thoughtful
          memory so every session feels like talking to someone who actually knows you.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">What we believe</h2>
        <ul className="list-disc pl-5 space-y-2 text-white/45">
          <li>Guidance, not certainty—we never use scare tactics or absolute predictions.</li>
          <li>Transparency—insights come with reasoning you can understand and question.</li>
          <li>Respect—your data, your journey, your pace.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">What we offer</h2>
        <p>
          Free trial credits let you explore chat and tarot without signing in. Create an account to
          save progress, unlock your cosmic report, and access deeper dashboard features. Paid plans
          remove ads and expand unlimited access for regular seekers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">A note on astrology &amp; tarot</h2>
        <p>
          Our readings are for reflection, entertainment, and personal growth. They are not a
          substitute for professional medical, legal, financial, or mental-health advice. Always
          use your own judgment when making important life decisions.
        </p>
      </section>
    </LegalPageLayout>
  );
}
