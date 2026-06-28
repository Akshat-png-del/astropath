import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { APP_NAME, pageMetadata } from "@/lib/brand";
import { SITE_FAQ } from "@/lib/content/site-faq";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(
  "Frequently Asked Questions",
  `Answers about ${APP_NAME} — credits, privacy, personalized guidance, tarot, subscriptions, and responsible use.`,
  "/faq"
);

export default function FAQPage() {
  return (
    <>
      <JsonLdScript data={faqJsonLd([...SITE_FAQ])} />
      <LegalPageLayout
        title="Frequently Asked Questions"
        subtitle={`Common questions about using ${APP_NAME} safely and effectively.`}
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      >
        <p>
          This page collects answers to the questions we hear most often. For legal details, see
          our{" "}
          <Link href="/privacy" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          ,{" "}
          <Link href="/terms" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Terms of Service
          </Link>
          , and{" "}
          <Link href="/disclaimer" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Disclaimer
          </Link>
          .
        </p>

        <div className="space-y-8 pt-2">
          {SITE_FAQ.map((item) => (
            <section key={item.question} className="space-y-2">
              <h2 className="font-display text-base sm:text-lg text-silver/85">{item.question}</h2>
              <p>{item.answer}</p>
            </section>
          ))}
        </div>

        <section className="space-y-3 pt-4 border-t border-silver/10">
          <h2 className="font-display text-lg text-silver/85">Still have questions?</h2>
          <p>
            Visit our{" "}
            <Link href="/contact" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
              Contact page
            </Link>{" "}
            or explore the{" "}
            <Link href="/learn" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
              Learn section
            </Link>{" "}
            for in-depth educational guides.
          </p>
        </section>
      </LegalPageLayout>
    </>
  );
}
