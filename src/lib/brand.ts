import type { Metadata } from "next";

/** App branding — single source of truth */
export const APP_NAME = "AstroPath";
export const APP_DESCRIPTION =
  "AstroPath is a personal astrology and tarot platform combining birth-chart education, interactive tarot readings, and daily cosmic insights for reflection and self-discovery.";
export const APP_TAGLINE = "Your Personal Astrology Guide";
export const CONTACT_EMAIL = "akshatsharma98765@gmail.com";


export const ETHICS_GUIDE_TITLE = "Digital Guidance & Astrology Ethics";
export const ETHICS_GUIDE_PATH = "/learn/ai-and-astrology-ethics";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://astropath.app"
).replace(/\/$/, "");

export const OG_IMAGE_PATH = "/astropath-icon.svg";

/** Display name for the mid-tier paid plan (internal id remains `cosmic`) */
export const STELLAR_PLAN_NAME = "Stellar";
export const ORACLE_PLAN_NAME = "Oracle";
export const PAID_PLANS_LABEL = `${STELLAR_PLAN_NAME} & ${ORACLE_PLAN_NAME}`;

export function reportTitleFor(name: string): string {
  return `${name}'s ${APP_NAME}`;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function pageMetadata(
  pageTitle: string,
  description: string = APP_DESCRIPTION,
  path: string = "/"
): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(OG_IMAGE_PATH);
  const fullTitle = `${pageTitle} | ${APP_NAME}`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      siteName: APP_NAME,
      type: "website",
      locale: "en_US",
      url: canonical,
      images: [{ url: ogImage, alt: APP_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${APP_NAME} — Personal Astrology & Tarot Guide`,
    template: `%s | ${APP_NAME}`,
  },
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  keywords: [
    "astrology",
    "tarot",
    "birth chart",
    "horoscope",
    "moon sign",
    "zodiac compatibility",
    "personalized horoscope",
    "AstroPath",
  ],
  authors: [{ name: APP_NAME, url: SITE_URL }],
  creator: APP_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${APP_NAME} — Personal Astrology & Tarot Guide`,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    images: [{ url: absoluteUrl(OG_IMAGE_PATH), alt: APP_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Personal Astrology & Tarot Guide`,
    description: APP_DESCRIPTION,
    images: [absoluteUrl(OG_IMAGE_PATH)],
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
  url: SITE_URL,
};

export const READING_DISCLAIMER =
  "AstroPath provides astrological and tarot readings for reflection and entertainment purposes only. It is not medical, legal, financial, or mental health advice.";
