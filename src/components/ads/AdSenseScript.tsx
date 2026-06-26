"use client";

import Script from "next/script";
import { ADSENSE_CLIENT_ID, isAdSenseConfigured } from "@/lib/ads/adsense";

/** Loads the AdSense library once per page (required before ad units render). */
export function AdSenseScript() {
  if (!isAdSenseConfigured()) return null;

  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
    />
  );
}
