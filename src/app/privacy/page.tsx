import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import {
  APP_NAME,
  CONTACT_EMAIL,
  ETHICS_GUIDE_PATH,
  ETHICS_GUIDE_TITLE,
  ORACLE_PLAN_NAME,
  STELLAR_PLAN_NAME,
  pageMetadata,
} from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Privacy Policy",
  `How ${APP_NAME} collects, uses, stores, and protects your personal information.`,
  "/privacy"
);

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Last updated: June 2026. We keep this plain, honest, and readable."
      breadcrumb={[
        { name: "Home", url: "/" },
        { name: "Privacy Policy", url: "/privacy" },
      ]}
    >
      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Introduction</h2>
        <p>
          {APP_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy.
          This Privacy Policy explains what information we collect when you use our website and
          services, how we use it, who we share it with, and what choices you have. By using{" "}
          {APP_NAME}, you agree to the practices described here. If you do not agree, please do not
          use the service.
        </p>
        <p>
          {APP_NAME} is designed for reflection, education, and self-discovery. We are not a medical,
          legal, or financial service.           This policy focuses on data practices for personalized guidance,
          tarot readings, educational content, accounts, and subscriptions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Information we collect</h2>
        <p>Depending on how you use {APP_NAME}, we may process the following categories of data:</p>
        <ul className="list-disc pl-5 space-y-2 text-silver-muted">
          <li>
            <strong className="text-silver-dim/85">Account information</strong> — email address, display
            name, and authentication identifiers when you create an account or sign in with a
            third-party provider.
          </li>
          <li>
            <strong className="text-silver-dim/85">Profile and birth data</strong> — birth date, time,
            location, and other details you voluntarily provide for chart calculations, personalized
            personalized guidance, or dashboard features.
          </li>
          <li>
            <strong className="text-silver-dim/85">User content</strong> — guidance messages, tarot
            questions, notes, and other text you submit through the service.
          </li>
          <li>
            <strong className="text-silver-dim/85">Usage and billing data</strong> — credits consumed,
            feature interactions, subscription status, and transaction metadata processed by our
            payment provider when you purchase a paid plan.
          </li>
          <li>
            <strong className="text-silver-dim/85">Technical data</strong> — browser type, device
            information, IP address, approximate region, referral URLs, and diagnostic logs used for
            security, performance, and abuse prevention.
          </li>
          <li>
            <strong className="text-silver-dim/85">Local storage</strong> — without an account, trial
            credits and limited session data may be stored in your browser (localStorage) on your
            device.
          </li>
        </ul>
        <p>
          We do not intentionally collect government IDs, payment card numbers (handled by Stripe or
          similar processors), or highly sensitive health records through a session. Please do not share
          passwords, full financial account numbers, or information you would not want processed by
          third-party interpretation services.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">How we use information</h2>
        <p>We use collected information to:</p>
        <ul className="list-disc pl-5 space-y-2 text-silver-muted">
          <li>Provide and personalize astrology guidance, birth-chart reports, tarot, and dashboard features.</li>
          <li>Calculate charts, manage credits, enforce free-trial limits, and process subscriptions.</li>
          <li>Improve product quality, safety, reliability, and educational content.</li>
          <li>Respond to support requests and communicate service updates.</li>
          <li>Detect fraud, abuse, and violations of our Terms of Service.</li>
          <li>Comply with applicable law and respond to lawful requests.</li>
        </ul>
        <p>
          We do not sell your conversations or birth data to third-party data brokers. We may use
          aggregated, de-identified statistics (for example, feature usage counts) to understand
          product performance.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Personalized guidance processing</h2>
        <p>
          Messages you send may be transmitted to third-party interpretation providers to generate
          responses. These providers process data according to their own terms and security
          practices. We design prompts to minimize unnecessary personal data and to encourage
          balanced, non-alarmist language.
        </p>
        <p>
          Readings may vary between sessions and are not guaranteed to be accurate or complete.
          When extended interpretation is unavailable, structured fallback responses may be used.
          For more on responsible use, see our{" "}
          <Link href={ETHICS_GUIDE_PATH} className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            {ETHICS_GUIDE_TITLE}
          </Link>{" "}
          guide and{" "}
          <Link href="/disclaimer" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Disclaimer
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Advertising and cookies</h2>
        <p>
          Free-plan users may see advertisements served by Google AdSense. Ad partners may use
          cookies, device identifiers, or similar technologies to deliver and measure ads, as
          described in Google&apos;s policies and our{" "}
          <Link href="/cookies" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Cookie Policy
          </Link>
          . Paid subscribers on {STELLAR_PLAN_NAME} or {ORACLE_PLAN_NAME} plans do not see in-app
          advertisements.
        </p>
        <p>
          You can manage cookie preferences through your browser settings. Disabling certain cookies
          may affect sign-in, trial credits, or ad personalization.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Legal bases for processing (EEA/UK)</h2>
        <p>If you are in the European Economic Area or United Kingdom, we process personal data under these bases:</p>
        <ul className="list-disc pl-5 space-y-2 text-silver-muted">
          <li>
            <strong className="text-silver-dim/85">Contract</strong> — to provide the service you request
            (accounts, readings, subscriptions).
          </li>
          <li>
            <strong className="text-silver-dim/85">Legitimate interests</strong> — security, analytics,
            product improvement, and fraud prevention, balanced against your rights.
          </li>
          <li>
            <strong className="text-silver-dim/85">Consent</strong> — where required for non-essential
            cookies or marketing communications.
          </li>
          <li>
            <strong className="text-silver-dim/85">Legal obligation</strong> — when law requires retention
            or disclosure.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">California privacy rights (CCPA/CPRA)</h2>
        <p>
          California residents may have rights to know, access, delete, and correct personal
          information, and to opt out of certain sharing for cross-context behavioral advertising
          where applicable. We do not sell personal information as defined by California law. To
          exercise rights, contact us using the details below. We will verify requests as required
          by law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Data retention and deletion</h2>
        <p>
          We retain account and usage data while your account is active and for a reasonable period
          afterward for legal, security, and backup purposes. You may request deletion of account
          data by emailing us from the{" "}
          <Link href="/contact" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Contact page
          </Link>
          . Anonymous trial data stored locally can be cleared by removing site data for {APP_NAME}{" "}
          in your browser settings.
        </p>
        <p>
          Deletion requests may be subject to exceptions where we must retain data for legal
          compliance, dispute resolution, or enforceable agreements.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Security</h2>
        <p>
          We implement reasonable technical and organizational measures to protect data, including
          encryption in transit (HTTPS), access controls, and vendor due diligence. No method of
          transmission or storage is completely secure; we cannot guarantee absolute security.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">International transfers</h2>
        <p>
          {APP_NAME} may process data in countries other than your own, including the United States,
          where our infrastructure or service providers operate. Where required, we use appropriate
          safeguards such as standard contractual clauses for cross-border transfers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Children</h2>
        <p>
          {APP_NAME} is not directed to children under 13. We do not knowingly collect personal
          information from children under 13. If you believe a child has provided us data, contact us
          and we will take steps to delete it. Users under 18 should use the service with a parent
          or guardian&apos;s permission.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Your rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, delete, restrict, or
          port your personal data, and to object to certain processing. You may also withdraw consent
          where processing is consent-based. Contact us to exercise these rights. You may lodge a
          complaint with your local data protection authority if applicable.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
          the top reflects the latest revision. Material changes will be posted on this page.
          Continued use after changes constitutes acceptance of the updated policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Contact</h2>
        <p>
          Privacy questions or requests:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          . You may also use our{" "}
          <Link href="/contact" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Contact page
          </Link>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
