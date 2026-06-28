import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { APP_NAME, APP_TAGLINE, CONTACT_EMAIL, ETHICS_GUIDE_PATH, ETHICS_GUIDE_TITLE, pageMetadata } from "@/lib/brand";
import { organizationJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(
  "About Us",
  `Learn about ${APP_NAME} — our mission, methodology, and commitment to thoughtful astrology and tarot for self-discovery.`,
  "/about"
);

export default function AboutPage() {
  return (
    <>
      <JsonLdScript data={organizationJsonLd()} />
      <LegalPageLayout
        title="About Us"
        subtitle={`${APP_TAGLINE} — a thoughtful astrology platform built for reflection, not fear.`}
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      >
        <section className="space-y-4">
          <h2 className="font-display text-lg text-silver/85">Our mission</h2>
          <p>
            {APP_NAME} exists to make astrology and tarot feel accessible, honest, and useful in
            everyday life. Too many apps treat the stars like a slot machine — vague predictions,
            fear-based language, and one-size-fits-all horoscopes copied from a template. We built
            something different: a conversational guide that listens first, explains its reasoning,
            and respects the limits of what symbols can tell us about real human choices.
          </p>
          <p>
            Whether you are curious about your moon sign, navigating a relationship crossroads, or
            exploring tarot for the first time, {APP_NAME} meets you where you are. Our platform
            combines birth-chart logic, educational articles, tarot spreads, and personalized
            guidance so you can learn the language of astrology while applying it to your own
            questions — at your pace, on your terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg text-silver/85">What makes {APP_NAME} different</h2>
          <p>
            Most astrology products optimize for daily engagement through anxiety. We optimize for
            clarity. That means probabilistic language instead of absolutes, transparent reasoning
            instead of mystical hand-waving, and educational content that teaches you how charts
            work — not just what your sun sign supposedly means this week.
          </p>
          <p>
            When you explore personalized insights with {APP_NAME}, the experience adapts to your story. Early messages
            build rapport; later messages can incorporate birth details for chart-specific
            insights. Your dashboard can surface reports, weekly energy notes, and credit usage in
            one calm view. Tarot readings follow structured spreads with interpretive guidance, not
            random card dumps.
          </p>
          <p>
            We also publish long-form guides on topics like birth charts, moon signs, compatibility,
            tarot methodology, planetary transits, and the ethics of digital guidance. These
            articles are written for seekers who want depth — the same audience we hope recognizes
            {APP_NAME} as a legitimate educational publisher, not a thin wrapper around generic
            horoscopes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg text-silver/85">Our values</h2>
          <ul className="list-disc pl-5 space-y-2 text-silver-muted">
            <li>
              <strong className="text-silver-dim/85 font-normal">Guidance, not certainty.</strong> We
              never use scare tactics, doom predictions, or guaranteed outcomes. Astrology describes
              themes and timing — it does not remove your agency.
            </li>
            <li>
              <strong className="text-silver-dim/85 font-normal">Transparency.</strong> Insights include
              reasoning you can question. We design every response for balanced
              tone and forbid manipulative phrasing.
            </li>
            <li>
              <strong className="text-silver-dim/85 font-normal">Respect for privacy.</strong> We collect
              only what we need to operate the service. We do not sell your conversations. See our{" "}
              <Link href="/privacy" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
                Privacy Policy
              </Link>{" "}
              for details.
            </li>
            <li>
              <strong className="text-silver-dim/85 font-normal">Education first.</strong> We want you to
              leave smarter about astrology — not dependent on an app for every decision.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg text-silver/85">How we deliver guidance responsibly</h2>
          <p>
            Personalized language helps {APP_NAME} scale reflective readings without replacing
            the symbolic frameworks astrology has used for centuries. Our approach references chart
            logic when birth data is available, avoids medical or legal advice, and flags uncertainty
            when birth times are approximate. We run quality checks to reduce repetitive replies and
            maintain conversational freshness.
          </p>
          <p>
            Technology is a tool — not an oracle. When extended interpretation is unavailable,
            structured fallback responses keep the conversation going rather than failing silently.
            For a deeper look at our approach, read{" "}
            <Link href={ETHICS_GUIDE_PATH} className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
              {ETHICS_GUIDE_TITLE}
            </Link>{" "}
            in our guides library.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg text-silver/85">What we offer</h2>
          <p>
            {APP_NAME} is freemium by design. Anonymous visitors receive trial credits stored
            locally so they can explore guidance and tarot before creating an account. Free accounts
            receive monthly credits for ongoing use. Paid plans — Stellar and Oracle — remove
            in-app advertisements and expand unlimited guidance access for regular seekers.
          </p>
          <p>
            Core features include personalized astrology guidance, tarot readings, birth-chart
            reports (when you provide date, time, and location), a personal dashboard, and our
            growing library of educational guides. Credit costs are displayed clearly on the{" "}
            <Link href="/pricing" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
              pricing
            </Link>{" "}
            page so you always know what a session costs before you begin.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg text-silver/85">A note on astrology &amp; tarot</h2>
          <p>
            {APP_NAME} readings are for reflection, entertainment, and personal growth. They are
            not a substitute for professional medical, legal, financial, or mental-health advice.
            If you are experiencing a crisis, please contact qualified emergency services or a
            licensed professional — not an automated reading session.
          </p>
          <p>
            We encourage you to treat every insight as one perspective among many. The most
            valuable outcome is often the question you ask yourself after a reading, not the
            prediction on the screen. Read our full{" "}
            <Link href="/disclaimer" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
              Disclaimer
            </Link>{" "}
            for complete terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg text-silver/85">Who we serve</h2>
          <p>
            {APP_NAME} is for curious beginners, returning astrology enthusiasts, and anyone who
            wants thoughtful language around symbols — not sensational predictions. Whether you are
            exploring your sun sign for the first time or diving into house systems and aspects, our
            Learn library and tools meet you where you are.
          </p>
          <p>
            We also serve people who use tarot as a reflective practice. Our spread catalog explains
            what each layout is for, how many credits it costs, and how to interpret results without
            treating cards as fixed fate.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg text-silver/85">Editorial standards</h2>
          <p>
            Educational articles on {APP_NAME} are written in plain language with beginner-friendly
            structure: clear headings, worked examples, and FAQs. We avoid fear-based headlines,
            deterministic predictions, and language that shames specific signs or placements. When
            techniques are debated among astrologers, we say so rather than presenting one view as
            universal truth.
          </p>
          <p>
            Our editorial team reviews content for accuracy, readability, and alignment with our{" "}
            <Link href="/disclaimer" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
              Disclaimer
            </Link>
            . Updates are dated on each article so you know when material was last revised.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg text-silver/85">Transparency and ads</h2>
          <p>
            Free-tier users may see Google AdSense advertisements. Paid subscribers on eligible plans
            do not see in-app ads. We publish clear policies on{" "}
            <Link href="/privacy" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
              privacy
            </Link>
            ,{" "}
            <Link href="/cookies" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
              cookies
            </Link>
            , and{" "}
            <Link href="/terms" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
              terms
            </Link>{" "}
            so you understand how the business model works. We believe trust requires honesty about
            both capabilities and limits.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg text-silver/85">Get in touch</h2>
          <p>
            Questions, feedback, or partnership ideas? We read every message. Reach us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="text-silver-dim/90 hover:text-silver/90 underline-offset-2 hover:underline">
              Contact
            </Link>{" "}
            page.
          </p>
        </section>
      </LegalPageLayout>
    </>
  );
}
