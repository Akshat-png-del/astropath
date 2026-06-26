import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { APP_NAME, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Terms & Conditions",
  `Terms of use for ${APP_NAME} astrology, tarot, and subscription services.`
);

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle={`Last updated: June 2026. By using ${APP_NAME}, you agree to these terms.`}
    >
      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">1. Service description</h2>
        <p>
          {APP_NAME} provides astrology chat, birth-chart reports, tarot readings, and related
          wellness-oriented content. The service is offered on free-trial, credit-based, and
          subscription tiers as described on our pricing page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">2. Eligibility</h2>
        <p>
          You must be at least 13 years old (or the minimum age in your jurisdiction) to use the
          service. If you are under 18, you should use {APP_NAME} with a parent or guardian&apos;s
          permission.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">3. Credits &amp; subscriptions</h2>
        <ul className="list-disc pl-5 space-y-2 text-white/45">
          <li>Free trials and monthly credits are subject to the limits shown in the app.</li>
          <li>Credits are consumed per action (e.g. chat messages, reports, tarot) as displayed.</li>
          <li>Paid subscriptions renew according to the plan you select unless cancelled.</li>
          <li>Refunds are handled according to applicable law and our payment provider&apos;s policies.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">4. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-2 text-white/45">
          <li>Abuse, harass, or attempt to manipulate the AI or other users.</li>
          <li>Reverse engineer, scrape, or overload our systems.</li>
          <li>Use the service for unlawful purposes or to generate harmful content.</li>
          <li>Circumvent credit limits, ads, or paywalls without authorization.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">5. Intellectual property</h2>
        <p>
          {APP_NAME}, its branding, UI, and original content are owned by us or our licensors. You
          retain rights to content you submit, but grant us a license to process it to operate the
          service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">6. Disclaimers</h2>
        <p>
          The service is provided &quot;as is&quot; without warranties of accuracy, availability, or
          fitness for a particular purpose. Astrological and tarot interpretations are inherently
          subjective.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">7. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {APP_NAME} is not liable for indirect,
          incidental, or consequential damages arising from your use of the service or reliance on
          any reading or insight.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">8. Changes</h2>
        <p>
          We may update these terms from time to time. Continued use after changes constitutes
          acceptance. Material changes will be reflected on this page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">9. Contact</h2>
        <p>
          Legal inquiries:{" "}
          <a href="mailto:akshatsharma98765@gmail.com" className="text-white/65 hover:text-white/85 underline-offset-2 hover:underline">
            akshatsharma98765@gmail.com
          </a>
        </p>
      </section>
    </LegalPageLayout>
  );
}
