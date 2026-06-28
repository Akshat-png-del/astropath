import { MAJOR_ARCANA } from "@/lib/tarot/major-arcana";

export function tarotCardSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/^the /, "the-")
    .replace(/\s+/g, "-");
}

export const TAROT_CARD_SLUGS = MAJOR_ARCANA.map((c) => tarotCardSlug(c.name));

export function tarotSlugFromName(name: string): string {
  return tarotCardSlug(name);
}

export function tarotNameFromSlug(slug: string): string | null {
  const card = MAJOR_ARCANA.find((c) => tarotCardSlug(c.name) === slug);
  return card?.name ?? null;
}

export function tarotCardIdFromSlug(slug: string): number | null {
  const card = MAJOR_ARCANA.find((c) => tarotCardSlug(c.name) === slug);
  return card?.id ?? null;
}
