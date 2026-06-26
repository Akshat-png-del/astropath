import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { APP_NAME, ORACLE_PLAN_NAME, STELLAR_PLAN_NAME, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Privacy Policy",
  `How ${APP_NAME} collects, uses, and protects your information.`
);

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Last updated: June 2026. We keep this plain and honest."
    >
      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">Information we collect</h2>
        <p>Depending on how you use {APP_NAME}, we may process:</p>
        <ul className="list-disc pl-5 space-y-2 text-white/45">
          <li>Account details (email, display name) when you sign in.</li>
          <li>Chat messages and birth details you choose to share for readings.</li>
          <li>Usage data such as credits consumed, tarot sessions, and feature interactions.</li>
          <li>Technical data (browser type, device, approximate region) for security and analytics.</li>
          <li>Payment-related metadata if you subscribe (processed by our payment provider).</li>
        </ul>
        <p>
          Without an account, trial credits and chat history may be stored locally in your browser
          (localStorage) on your device.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">How we use information</h2>
        <ul className="list-disc pl-5 space-y-2 text-white/45">
          <li>Deliver personalized astrology chat, reports, tarot, and dashboard features.</li>
          <li>Manage credits, subscriptions, and free-trial limits.</li>
          <li>Improve product quality, safety, and reliability.</li>
          <li>Comply with law and respond to legitimate requests.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">AI processing</h2>
        <p>
          Messages you send may be processed by third-party AI providers to generate responses. We
          design prompts to minimize unnecessary personal data and do not sell your conversations.
          Do not share passwords, government IDs, or highly sensitive information in chat.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">Advertising</h2>
        <p>
          Free-plan users may see ads served by Google AdSense. Ad partners may use cookies or
          similar technologies as described in Google&apos;s policies. Paid subscribers on {STELLAR_PLAN_NAME} or{" "}
          {ORACLE_PLAN_NAME} plans do not see in-app advertisements.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">Data retention &amp; deletion</h2>
        <p>
          We retain account and usage data while your account is active. You may request deletion by
          contacting us. Local trial data can be cleared by removing site data in your browser
          settings.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">Your rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, delete, or restrict
          processing of your personal data. Contact us to exercise these rights.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">Contact</h2>
        <p>
          Questions about privacy? Email{" "}
          <a href="mailto:akshatsharma98765@gmail.com" className="text-white/65 hover:text-white/85 underline-offset-2 hover:underline">
            akshatsharma98765@gmail.com
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
