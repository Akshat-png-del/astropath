import type { Metadata } from "next";
import { LandingPageShell } from "@/components/landing/LandingPageShell";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { HOME_FAQ } from "@/lib/content/home-faq";
import { APP_DESCRIPTION, pageMetadata } from "@/lib/brand";
import { faqJsonLd, organizationJsonLd, webApplicationJsonLd, websiteJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(
  "Personal Astrology & Tarot Guide",
  APP_DESCRIPTION,
  "/"
);

export default function HomePage() {
  return (
    <>
      <JsonLdScript
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          webApplicationJsonLd(),
          faqJsonLd([...HOME_FAQ]),
        ]}
      />
      <LandingPageShell />
    </>
  );
}
