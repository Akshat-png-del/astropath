/**
 * Zodiac image paths — static SVG fallbacks for OG/meta.
 * Primary UI uses inline React icons from `@/components/zodiac/ZodiacIcon`.
 */
export const ZODIAC_IMAGE: Record<string, string> = {
  Aries: "/zodiac/aries.svg",
  Taurus: "/zodiac/taurus.svg",
  Gemini: "/zodiac/gemini.svg",
  Cancer: "/zodiac/cancer.svg",
  Leo: "/zodiac/leo.svg",
  Virgo: "/zodiac/virgo.svg",
  Libra: "/zodiac/libra.svg",
  Scorpio: "/zodiac/scorpio.svg",
  Sagittarius: "/zodiac/sagittarius.svg",
  Capricorn: "/zodiac/capricorn.svg",
  Aquarius: "/zodiac/aquarius.svg",
  Pisces: "/zodiac/pisces.svg",
};

export function getZodiacImage(sign: string): string {
  return ZODIAC_IMAGE[sign] ?? "/zodiac/aries.svg";
}
