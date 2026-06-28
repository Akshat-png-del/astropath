import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { APP_NAME, CONTACT_EMAIL, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Contact Us",
  `Contact the ${APP_NAME} team for support, privacy requests, feedback, and partnership inquiries.`,
  "/contact"
);

export default function ContactPage() {
  return (
    <LegalPageLayout
      title="Contact Us"
      subtitle="We read every message and aim to respond within 2–3 business days."
      breadcrumb={[
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" },
      ]}
    >
      <section className="space-y-4">
        <h2 className="font-display text-lg text-silver/85">General support</h2>
        <p>
          For help with your account, credits, reading quality, tarot readings, or dashboard features,
          email us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          . Please include the email address associated with your account (if signed in) and a brief
          description of what you were trying to do when the issue occurred.
        </p>
        <p>
          Common topics we can help with include: credits not updating after a session, birth-chart
          reports that seem incomplete, difficulty signing in, questions about Stellar or Oracle
          plans, and feedback on reading tone or accuracy. The more context you provide — browser,
          device, approximate time of the issue — the faster we can assist.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg text-silver/85">Privacy &amp; data requests</h2>
        <p>
          To request access to, correction of, or deletion of personal data we hold about you,
          email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Privacy%20request`}
            className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          with the subject line &quot;Privacy request.&quot; We will verify your identity before
          processing deletion requests tied to a registered account.
        </p>
        <p>
          For details on what we collect and how we use it, see our{" "}
          <Link href="/privacy" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookies" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
            Cookie Policy
          </Link>
          . Anonymous trial credits are stored in your browser&apos;s local storage and can be
          cleared by removing site data for {APP_NAME} in your browser settings.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg text-silver/85">Feedback &amp; content suggestions</h2>
        <p>
          {APP_NAME} is actively expanding its educational guides and product features. If you
          have ideas for new guide topics, tarot spreads, or dashboard widgets, we welcome them.
          Thoughtful criticism helps us improve reading quality, reduce repetitive responses, and
          build a platform that feels trustworthy — especially for new visitors exploring astrology
          for self-discovery.
        </p>
        <p>
          We cannot provide individualized astrological consultations over email. For tarot readings,
          use the{" "}
          <Link href="/tarot/reading" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
            tarot experience
          </Link>{" "}
          inside the app, where your session history is saved automatically.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg text-silver/85">Before you write</h2>
        <p>
          Many answers are available without waiting for a reply. Check your{" "}
          <Link href="/dashboard" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
            dashboard
          </Link>{" "}
          for credit usage and saved reports. Visit{" "}
          <Link href="/pricing" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
            pricing
          </Link>{" "}
          for plan comparisons and credit costs. Browse{" "}
          <Link href="/learn" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
            guides
          </Link>{" "}
          for in-depth articles on birth charts, moon signs, compatibility, and more.
        </p>
        <p>
          For reading quality issues, try a new tarot spread with a clear, specific question.
          Approximate birth times can affect rising-sign accuracy in educational chart content.
        </p>
        <CosmicButton href="/tarot/reading" className="mt-2">
          Open tarot reading
        </CosmicButton>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg text-silver/85">Important limitations</h2>
        <p>
          {APP_NAME} does not provide emergency services, crisis counseling, medical diagnoses, legal
          advice, or financial planning. If you are in immediate danger or experiencing a mental-health
          emergency, contact local emergency services or a qualified helpline in your region. Our{" "}
          <Link href="/disclaimer" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
            Disclaimer
          </Link>{" "}
          explains the entertainment and reflection purpose of all readings on this platform.
        </p>
      </section>
    </LegalPageLayout>
  );
}
