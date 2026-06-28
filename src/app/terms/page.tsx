import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { APP_NAME, CONTACT_EMAIL, ETHICS_GUIDE_PATH, ETHICS_GUIDE_TITLE, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Terms of Service",
  `Terms of use for ${APP_NAME} astrology, tarot, personalized guidance, credits, and subscription services.`,
  "/terms"
);

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle={`Last updated: June 2026. By using ${APP_NAME}, you agree to these terms.`}
      breadcrumb={[
        { name: "Home", url: "/" },
        { name: "Terms of Service", url: "/terms" },
      ]}
    >
      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">1. Agreement to terms</h2>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of {APP_NAME},
          including our website, mobile experiences, personalized guidance, birth-chart tools, tarot
          readings, educational content, and related services (collectively, the &quot;Service&quot;).
          By accessing or using the Service, you agree to be bound by these Terms and our{" "}
          <Link href="/privacy" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          ,{" "}
          <Link href="/cookies" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Cookie Policy
          </Link>
          , and{" "}
          <Link href="/disclaimer" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Disclaimer
          </Link>
          . If you do not agree, do not use the Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">2. Service description</h2>
        <p>
          {APP_NAME} provides personalized astrology guidance, birth-chart reports, tarot readings, educational
          guides, and related wellness-oriented content. The Service is offered on free-trial,
          credit-based, and subscription tiers as described on our pricing page. {APP_NAME} is
          designed for reflection, education, and self-discovery. Content is not medical, legal, or
          financial advice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">3. Eligibility</h2>
        <p>
          You must be at least 13 years old (or the minimum age required in your jurisdiction) to
          use the Service. If you are under 18, you should use {APP_NAME} with a parent or
          guardian&apos;s permission. By using the Service, you represent that you meet these
          requirements and have authority to enter into these Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">4. Accounts and security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and
          for all activity under your account. Notify us promptly of unauthorized access. We may
          suspend or terminate accounts that violate these Terms or pose security risks.
        </p>
        <p>
          Anonymous users may access limited features using browser-stored trial credits. Such data
          is device-specific and may be lost if you clear browser storage or switch devices.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">5. Credits and subscriptions</h2>
        <ul className="list-disc pl-5 space-y-2 text-silver-muted">
          <li>Free trials and monthly credits are subject to the limits shown in the app.</li>
          <li>
            Credits are consumed per action (e.g., guidance messages, reports, tarot spreads) as
            displayed before you confirm an action.
          </li>
          <li>Credits are deducted only after a successful reading or response where applicable.</li>
          <li>Paid subscriptions renew according to the plan you select unless cancelled before renewal.</li>
          <li>
            Prices, features, and credit allocations may change with notice on our pricing page or
            in-app.
          </li>
          <li>
            Refunds are handled according to applicable law and our payment provider&apos;s policies.
            Digital content consumed before cancellation may affect refund eligibility.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">6. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-2 text-silver-muted">
          <li>Abuse, harass, threaten, or attempt to manipulate the service, staff, or other users.</li>
          <li>Reverse engineer, scrape, crawl, or overload our systems without permission.</li>
          <li>Use the Service for unlawful purposes or to generate harmful, discriminatory, or exploitative content.</li>
          <li>Circumvent credit limits, advertisements, paywalls, or access controls.</li>
          <li>Impersonate others or misrepresent your affiliation with {APP_NAME}.</li>
          <li>Upload malware or attempt unauthorized access to our infrastructure.</li>
          <li>Use automated bots to extract content or simulate human usage at scale.</li>
        </ul>
        <p>
          We may investigate violations and cooperate with law enforcement where required. Repeated
          or serious violations may result in immediate termination without refund.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">7. User content</h2>
        <p>
          You retain ownership of content you submit (messages, questions, profile details). By
          submitting content, you grant {APP_NAME} a worldwide, non-exclusive license to use, store,
          process, and display that content solely to operate, improve, and secure the Service,
          including transmission to interpretation providers as described in our Privacy Policy.
        </p>
        <p>
          You represent that your content does not infringe third-party rights and complies with
          these Terms. We may remove content that violates law or these Terms but are not obligated
          to monitor all user submissions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">8. Intellectual property</h2>
        <p>
          {APP_NAME}, its branding, user interface, software, and original educational content are
          owned by us or our licensors and protected by intellectual property laws. You may not copy,
          modify, distribute, or create derivative works without written permission, except as
          permitted by law or explicit in-app sharing features.
        </p>
        <p>
          Astrology and tarot symbols are part of shared cultural traditions; our specific
          expression, design, and written materials remain our property.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">9. Automated and personalized content</h2>
        <p>
          Portions of the Service use automated interpretation. Readings may be inaccurate,
          incomplete, or inconsistent. They are provided for entertainment and reflection, not as
          professional advice. You agree not to rely on readings for medical, legal, financial,
          or emergency decisions. See our{" "}
          <Link href={ETHICS_GUIDE_PATH} className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            {ETHICS_GUIDE_TITLE}
          </Link>{" "}
          guide for more context.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">10. Disclaimers</h2>
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES
          OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, AND NON-INFRINGEMENT. ASTROLOGICAL AND TAROT INTERPRETATIONS ARE INHERENTLY
          SUBJECTIVE. WE DO NOT WARRANT ACCURACY, AVAILABILITY, OR SPECIFIC OUTCOMES.
        </p>
        <p>
          To the extent permitted by law, we disclaim liability for decisions you make based on
          readings, forecasts, or educational content on the Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">11. Limitation of liability</h2>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, {APP_NAME.toUpperCase()} AND ITS AFFILIATES,
          OFFICERS, EMPLOYEES, AND SUPPLIERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL,
          ARISING FROM YOUR USE OF THE SERVICE OR RELIANCE ON ANY READING OR INSIGHT.
        </p>
        <p>
          OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM THESE TERMS OR THE SERVICE SHALL NOT EXCEED
          THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE TWELVE MONTHS BEFORE THE CLAIM OR (B) ONE
          HUNDRED U.S. DOLLARS (USD $100), EXCEPT WHERE LIABILITY CANNOT BE LIMITED BY LAW.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">12. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless {APP_NAME} and its affiliates from claims,
          damages, losses, and expenses (including reasonable legal fees) arising from your use of
          the Service, your content, or your violation of these Terms or applicable law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">13. Termination</h2>
        <p>
          You may stop using the Service at any time. We may suspend or terminate access if you
          violate these Terms, create risk for us or other users, or where required by law.
          Provisions that by nature should survive termination (including disclaimers, limitation
          of liability, and dispute resolution) will survive.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">14. Governing law and disputes</h2>
        <p>
          These Terms are governed by the laws of the jurisdiction in which {APP_NAME} operates,
          without regard to conflict-of-law principles, except where mandatory consumer protection
          laws in your country of residence apply. Disputes should first be raised through our{" "}
          <Link href="/contact" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Contact page
          </Link>
          . Where permitted, you agree to attempt informal resolution before pursuing formal legal
          action.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">15. Changes to terms</h2>
        <p>
          We may update these Terms from time to time. The &quot;Last updated&quot; date reflects
          the latest revision. Material changes will be posted on this page. Continued use after
          changes constitutes acceptance. If you disagree with updated Terms, stop using the Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">16. Severability and entire agreement</h2>
        <p>
          If any provision of these Terms is found unenforceable, the remaining provisions remain in
          full effect. These Terms, together with the Privacy Policy, Cookie Policy, and Disclaimer,
          constitute the entire agreement between you and {APP_NAME} regarding the Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">17. Assignment and force majeure</h2>
        <p>
          We may assign or transfer these Terms in connection with a merger, acquisition, or sale of
          assets. You may not assign your rights without our consent. Neither party is liable for
          delays or failures caused by events beyond reasonable control, including natural disasters,
          internet outages, or third-party service failures.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">18. Contact</h2>
        <p>
          Legal inquiries:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          . See also our{" "}
          <Link href="/faq" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            FAQ
          </Link>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
