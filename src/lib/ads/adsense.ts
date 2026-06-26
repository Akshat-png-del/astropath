/** Google AdSense — set in .env.local before production */

export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "";

export const ADSENSE_SLOT_BANNER =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER?.trim() ?? "";

export const ADSENSE_SLOT_INFEED =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_INFEED?.trim() ?? ADSENSE_SLOT_BANNER;

export function isAdSenseConfigured(): boolean {
  return Boolean(ADSENSE_CLIENT_ID && ADSENSE_SLOT_BANNER);
}

export type AdSlotVariant = "banner" | "infeed";

export function getAdSlotId(variant: AdSlotVariant): string {
  return variant === "infeed" ? ADSENSE_SLOT_INFEED : ADSENSE_SLOT_BANNER;
}
