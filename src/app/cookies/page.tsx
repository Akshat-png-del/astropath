import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { APP_NAME, CONTACT_EMAIL, pageMetadata } from "@/lib/brand";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(
  "Cookie Policy",
  `How ${APP_NAME} uses cookies and similar technologies, including Google AdSense, analytics, and your choices.`,
  "/cookies"
);

export default function CookiesPage() {
  return (
    <>
      <JsonLdScript
        data={faqJsonLd([
          {
            question: "Does AstroPath use cookies?",
            answer:
              "Yes. AstroPath uses essential cookies for sign-in and session management, and advertising cookies for free-tier users through Google AdSense.",
          },
          {
            question: "How do I disable advertising cookies?",
            answer:
              "You can manage cookies in your browser settings, use Google's ad personalization controls, or upgrade to a paid plan that removes in-app advertisements.",
          },
        ])}
      />
      <LegalPageLayout
        title="Cookie Policy"
        subtitle="Last updated: June 2026. This policy explains how AstroPath uses cookies and similar technologies."
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Cookie Policy", url: "/cookies" },
        ]}
      >
        <section className="space-y-3">
          <h2 className="font-display text-lg text-silver/85">1. What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help
            sites remember your preferences, keep you signed in, measure performance, and — with
            your consent where required by law — deliver relevant advertising. Similar technologies
            include local storage, session storage, and pixel tags.
          </p>
          <p>
            {APP_NAME} also stores certain trial and credit information in your browser&apos;s
            local storage when you use the service without an account. That data stays on your
            device unless you clear site data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg text-silver/85">2. How we use cookies</h2>
          <p>We group cookies and similar technologies into these categories:</p>
          <ul className="list-disc pl-5 space-y-2 text-silver-muted">
            <li>
              <strong className="text-silver-dim/90">Strictly necessary:</strong> Required for core
              functionality such as authentication, security, and remembering your session. The
              site cannot function properly without these.
            </li>
            <li>
              <strong className="text-silver-dim/90">Functional:</strong> Remember choices such as
              conversation state, dashboard preferences, and credit ledger data stored locally for
              free-tier users.
            </li>
            <li>
              <strong className="text-silver-dim/90">Analytics:</strong> Help us understand how
              features are used so we can improve reliability and content. We aim to collect only
              aggregated or pseudonymous usage data.
            </li>
            <li>
              <strong className="text-silver-dim/90">Advertising:</strong> Free-plan users may see ads
              served by Google AdSense. Google and its partners may use cookies to serve ads based
              on prior visits to this site or other sites, subject to Google&apos;s policies.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg text-silver/85">3. Cookie duration</h2>
          <p>
            Different cookies remain on your device for different periods. Session cookies expire
            when you close your browser. Authentication cookies may persist for days or weeks so you
            stay signed in. Local storage entries for trial credits may persist until you clear site
            data. Advertising cookies set by Google typically follow Google&apos;s published retention
            schedules, which may range from days to two years depending on the cookie type.
          </p>
          <p>
            You can delete cookies at any time through browser settings. Note that clearing cookies
            may sign you out and reset anonymous trial progress.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg text-silver/85">4. Google AdSense</h2>
          <p>
            {APP_NAME} participates in the Google AdSense program. Google uses cookies (including
            the DoubleClick cookie) to serve ads to users based on their visits to this site and
            other sites on the Internet. You can learn how Google uses data at{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google&apos;s Advertising Policies
            </a>
            .
          </p>
          <p>
            Paid subscribers on eligible plans do not see in-app advertisements. If you prefer not
            to receive personalized ads, visit{" "}
            <a
              href="https://adssettings.google.com"
              className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Ads Settings
            </a>{" "}
            or the Network Advertising Initiative opt-out page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg text-silver/85">5. Third-party cookies</h2>
          <p>
            Third parties that may set cookies when you use {APP_NAME} include Google (authentication,
            AdSense, Firebase), payment processors if you subscribe, and interpretation service providers that
            process guidance content server-side. We do not control third-party cookies. Review each
            provider&apos;s privacy policy for details.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg text-silver/85">6. Your choices</h2>
          <p>You can manage cookies in several ways:</p>
          <ul className="list-disc pl-5 space-y-2 text-silver-muted">
            <li>Adjust browser settings to block or delete cookies (may affect sign-in and saved progress).</li>
            <li>Clear {APP_NAME} site data in your browser to reset local trial credits and saved readings.</li>
            <li>Upgrade to a paid plan to remove in-app ads where applicable.</li>
            <li>Use industry opt-out tools for interest-based advertising.</li>
          </ul>
          <p>
            Where required by law (for example in the EEA or UK), we will request consent before
            placing non-essential cookies. Essential cookies remain necessary for the service to
            operate.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg text-silver/85">7. Do Not Track and regional requirements</h2>
          <p>
            Some browsers offer a &quot;Do Not Track&quot; signal. There is no universal standard for
            how websites must respond. {APP_NAME} currently does not alter cookie behavior solely
            based on DNT signals, but you can use browser controls and opt-out tools described
            above.
          </p>
          <p>
            If you are in the European Economic Area, United Kingdom, or other regions with cookie
            consent laws, we will request consent for non-essential cookies where required. Essential
            cookies needed for security and core functionality cannot be disabled without breaking the
            service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg text-silver/85">8. Retention</h2>
          <p>
            Session cookies expire when you close your browser. Persistent cookies and local storage
            entries may remain until they expire or you delete them. Advertising cookies set by
            Google follow Google&apos;s retention schedules.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg text-silver/85">9. Updates and contact</h2>
          <p>
            We may update this Cookie Policy when our practices or legal requirements change. The
            &quot;Last updated&quot; date at the top reflects the latest revision. Continued use of
            {APP_NAME} after changes constitutes acceptance of the updated policy.
          </p>
          <p>
            Questions about cookies or advertising? Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            . See also our{" "}
            <Link href="/privacy" className="text-silver-dim hover:text-silver-bright/85 underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </LegalPageLayout>
    </>
  );
}
