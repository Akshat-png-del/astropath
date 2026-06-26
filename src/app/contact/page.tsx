import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { APP_NAME, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Contact Us",
  `Get in touch with the ${APP_NAME} team.`
);

export default function ContactPage() {
  return (
    <LegalPageLayout
      title="Contact Us"
      subtitle="We'd love to hear from you—questions, feedback, or partnership ideas."
    >
      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">General support</h2>
        <p>
          For help with your account, credits, or readings:{" "}
          <a
            href="mailto:akshatsharma98765@gmail.com"
            className="text-white/65 hover:text-white/85 underline-offset-2 hover:underline"
          >
            akshatsharma98765@gmail.com
          </a>
        </p>
        <p className="text-white/40 text-xs">
          We aim to respond within 2–3 business days.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-white/75">Privacy &amp; data requests</h2>
        <p>
          <a
            href="mailto:akshatsharma98765@gmail.com"
            className="text-white/65 hover:text-white/85 underline-offset-2 hover:underline"
          >
            akshatsharma98765@gmail.com
          </a>
        </p>
      </section>

      <section className="space-y-4 pt-2">
        <h2 className="font-display text-lg text-white/75">Before you write</h2>
        <p>
          Many answers are in the app: check your{" "}
          <Link href="/dashboard" className="text-white/60 hover:text-white/80 underline-offset-2 hover:underline">
            dashboard
          </Link>{" "}
          for credit usage, or visit{" "}
          <Link href="/pricing" className="text-white/60 hover:text-white/80 underline-offset-2 hover:underline">
            pricing
          </Link>{" "}
          for plan details. For reading quality, try starting a fresh chat with clear birth details
          (date, time, city).
        </p>
        <CosmicButton href="/chat" className="mt-2">
          Start a reading
        </CosmicButton>
      </section>
    </LegalPageLayout>
  );
}
