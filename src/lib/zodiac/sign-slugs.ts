import { ZODIAC_SIGNS_ORDER } from "@/lib/astrology/zodiac-traits";

export const ZODIAC_SIGN_SLUGS = ZODIAC_SIGNS_ORDER.map((sign) =>
  sign.toLowerCase()
) as readonly string[];

export type ZodiacSignSlug = (typeof ZODIAC_SIGN_SLUGS)[number];

export function slugFromSign(sign: string): string {
  return sign.trim().toLowerCase();
}

export function signFromSlug(slug: string): (typeof ZODIAC_SIGNS_ORDER)[number] | null {
  const match = ZODIAC_SIGNS_ORDER.find((s) => s.toLowerCase() === slug.trim().toLowerCase());
  return match ?? null;
}

export function zodiacSignPath(slug: string): string {
  return `/zodiac/${slug.toLowerCase()}`;
}
