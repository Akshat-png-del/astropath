import { APP_DESCRIPTION, APP_NAME, CONTACT_EMAIL, SITE_URL } from "@/lib/brand";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/astropath-icon.svg`,
    description: APP_DESCRIPTION,
    email: CONTACT_EMAIL,
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: SITE_URL,
    description: APP_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/learn?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: APP_NAME,
    url: SITE_URL,
    description: APP_DESCRIPTION,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const itemUrl = item.url.startsWith("http")
        ? item.url
        : `${SITE_URL}${item.url.startsWith("/") ? item.url : `/${item.url}`}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };
}

export function articleJsonLd(params: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const articleUrl = params.url.startsWith("http")
    ? params.url
    : `${SITE_URL}${params.url.startsWith("/") ? params.url : `/${params.url}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    datePublished: params.datePublished ?? "2026-06-01",
    dateModified: params.dateModified ?? params.datePublished ?? "2026-06-01",
    author: {
      "@type": "Organization",
      name: APP_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/astropath-icon.svg`,
      },
    },
  };
}
