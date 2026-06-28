import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { APP_NAME, READING_DISCLAIMER, CONTACT_EMAIL, ETHICS_GUIDE_PATH, ETHICS_GUIDE_TITLE, pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Disclaimer",
  `Important disclaimers about ${APP_NAME} astrology, tarot, and personalized guidance — informational and entertainment purposes only.`,
  "/disclaimer"
);

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      subtitle="Last updated: June 2026. Please read this before using AstroPath readings or advice."
      breadcrumb={[
        { name: "Home", url: "/" },
        { name: "Disclaimer", url: "/disclaimer" },
      ]}
    >
      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">General information only</h2>
        <p>
          {APP_NAME} provides astrology charts, tarot interpretations, conversational readings, and
          related educational content for <strong className="text-silver-dim">reflection,
          entertainment, and personal growth</strong>. Nothing on this website or in our app
          constitutes medical, psychological, legal, financial, investment, or other professional
          advice.
        </p>
        <p>{READING_DISCLAIMER}</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">No guaranteed outcomes</h2>
        <p>
          Astrology and tarot describe symbolic patterns and archetypal themes. They do not predict
          fixed futures or guarantee specific results in love, career, health, or finances. Any
          forward-looking language uses probabilistic framing (may, could, suggests) by design.
          You are always responsible for your own decisions.
        </p>
        <p>
          We do not use fear-based messaging, curses, or pressure tactics. If a reading feels
          alarming, treat it as a prompt for reflection — not a command.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Automated and personalized content</h2>
        <p>
          Many responses are produced with the assistance of automated interpretation systems trained
          on broad text data. These readings can be helpful, creative, and empathetic — but they can
          also be incomplete, outdated, or incorrect. They do not know you personally beyond what you
          share in the session.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-silver-muted">
          <li>Do not rely on readings for medical diagnosis or treatment.</li>
          <li>Do not use readings as a substitute for licensed mental-health care.</li>
          <li>Do not make major financial or legal decisions based solely on a reading.</li>
          <li>Do not share passwords, government IDs, or highly sensitive data in a session.</li>
        </ul>
        <p>
          Learn more in our guide:{" "}
          <Link href={ETHICS_GUIDE_PATH} className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            {ETHICS_GUIDE_TITLE}
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Birth data accuracy</h2>
        <p>
          Chart calculations depend on accurate birth date, time, and location. Approximate times
          can shift rising signs and house placements. {APP_NAME} explains uncertainty when data is
          incomplete, but you should treat borderline placements as ranges rather than absolutes.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Crisis and emergency situations</h2>
        <p>
          {APP_NAME} is not a crisis service. If you are in immediate danger, experiencing thoughts
          of self-harm, or facing a medical emergency, contact local emergency services or a crisis
          helpline in your country. Do not use guidance sessions as a substitute for urgent professional
          help.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Advertising</h2>
        <p>
          Free-tier users may see third-party advertisements (including Google AdSense). Ads are
          not endorsements. We are not responsible for products or services advertised by third
          parties. See our{" "}
          <Link href="/cookies" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Educational content</h2>
        <p>
          Articles in our Learn and Blog sections are written for general education. They explain
          astrology and tarot concepts in accessible language but do not replace formal study,
          certification, or consultation with a qualified human practitioner. Examples in guides are
          illustrative; your chart may differ significantly based on exact birth data and chosen
          house system.
        </p>
        <p>
          {APP_NAME} is designed for reflection, education, and self-discovery. We encourage
          cross-checking insights with reputable sources and your own lived experience.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Relationship and compatibility</h2>
        <p>
          Compatibility scores and synastry-style commentary describe symbolic patterns between
          signs or charts. They cannot account for communication skills, shared values, trauma
          history, or real-world context. A low score is not a verdict; a high score is not a
          guarantee. Never use {APP_NAME} readings to justify harmful behavior or to avoid honest
          conversation with a partner.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Health and wellness</h2>
        <p>
          Astrology sometimes references body areas or wellness themes symbolically. This is not
          medical diagnosis. Do not delay or avoid professional healthcare because of a reading.
          If you have symptoms or concerns, consult a licensed healthcare provider. {APP_NAME} does
          not prescribe treatments, supplements, or therapies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Financial and legal matters</h2>
        <p>
          Readings that touch on career, money, or contracts are reflective only. They are not
          investment advice, tax guidance, or legal counsel. Consult licensed professionals before
          signing agreements, making large purchases, or changing your financial strategy based on
          any symbolic interpretation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Third-party links and services</h2>
        <p>
          {APP_NAME} may link to external websites or integrate third-party services (authentication,
          payments, advertising). We are not responsible for the content, privacy practices, or
          availability of third-party sites. Your use of external services is governed by their
          terms and policies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Updates</h2>
        <p>
          We may revise this Disclaimer when our features or legal obligations change. The date at
          the top indicates the latest version. Material updates will be posted on this page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {APP_NAME} and its operators disclaim liability
          for any loss or damage arising from reliance on readings, guides, or personalized content.
          Use the service at your own discretion. See our{" "}
          <Link href="/terms" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
            Terms &amp; Conditions
          </Link>{" "}
          for full legal terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg text-silver/85">Contact</h2>
        <p>
          Questions about this disclaimer? Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
