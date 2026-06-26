import type { Metadata } from "next";

/** App branding — single source of truth */
export const APP_NAME = "AstroPath";
export const APP_DESCRIPTION = "The universe reveals more when it knows you.";
export const APP_TAGLINE = "Your Personal Astrology Guide";

/** Display name for the mid-tier paid plan (internal id remains `cosmic`) */
export const STELLAR_PLAN_NAME = "Stellar";
export const ORACLE_PLAN_NAME = "Oracle";
export const PAID_PLANS_LABEL = `${STELLAR_PLAN_NAME} & ${ORACLE_PLAN_NAME}`;

export function reportTitleFor(name: string): string {
  return `${name}'s ${APP_NAME}`;
}

export function conversationTitleFor(fallback?: string): string {
  return fallback?.trim() || `${APP_NAME} conversation`;
}

/** Default chat history title from first user message */
export function titleFromFirstMessage(first?: string): string {
  if (!first?.trim()) return conversationTitleFor();
  const snippet = first.trim().slice(0, 48);
  return snippet.length < first.trim().length ? `${snippet}…` : snippet;
}

export function pageMetadata(
  pageTitle: string,
  description: string = APP_DESCRIPTION
): Metadata {
  return {
    title: pageTitle,
    description,
    openGraph: {
      title: APP_NAME,
      description,
      siteName: APP_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: APP_NAME,
      description,
    },
  };
}

export const siteMetadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : undefined,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  keywords: ["astrology", "tarot", "birth chart", "horoscope", "AstroPath"],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/astropath-icon.svg",
    apple: "/astropath-icon.svg",
    shortcut: "/astropath-icon.svg",
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: APP_NAME,
  description: APP_DESCRIPTION,
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
};
