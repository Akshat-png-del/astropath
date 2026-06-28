import { getArticleBySlug } from "@/content/education";
import { articleReadMinutes } from "@/content/education/types";
import type { PillarArticle, PillarHub, PillarLink } from "./types";
import { pillarPath, pillarReadMinutes } from "./types";
import { ZODIAC_META } from "./zodiac/meta";
import { signFromSlug } from "@/lib/zodiac/sign-slugs";
import { PLANET_SLUGS } from "./planets/meta";
import { HOUSE_SLUGS } from "./houses/meta";
import { TAROT_CARD_SLUGS } from "./tarot/meta";

const LEARN_LINKS: Record<PillarHub, string[]> = {
  zodiac: ["twelve-zodiac-signs", "zodiac-compatibility-guide", "elements-and-modalities", "sun-moon-rising-explained"],
  planets: ["planets-in-astrology", "personal-vs-outer-planets", "understanding-planetary-transits"],
  houses: ["twelve-houses-explained", "house-systems-guide", "how-to-read-natal-chart"],
  tarot: ["how-tarot-readings-work", "major-arcana-beginners"],
};

const ELEMENT_TAROT: Record<string, string> = {
  Fire: "the-sun",
  Earth: "the-empress",
  Air: "the-magician",
  Water: "the-high-priestess",
};

function learnLinks(slugs: string[]): PillarLink[] {
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean)
    .map((article) => ({
      href: `/learn/${article!.slug}`,
      title: article!.title,
      hub: "learn" as const,
      readMinutes: articleReadMinutes(article!),
    }));
}

function pillarLinks(hub: PillarHub, slugs: string[], articles: PillarArticle[]): PillarLink[] {
  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter(Boolean)
    .map((article) => ({
      href: pillarPath(hub, article!.slug),
      title: article!.title,
      hub,
      readMinutes: pillarReadMinutes(article!),
    }));
}

export function getAutoRelatedLinks(
  article: PillarArticle,
  registry: {
    zodiac: PillarArticle[];
    planets: PillarArticle[];
    houses: PillarArticle[];
    tarot: PillarArticle[];
  }
): PillarLink[] {
  const links: PillarLink[] = [...learnLinks(LEARN_LINKS[article.hub])];

  if (article.hub === "zodiac") {
    const sign = signFromSlug(article.slug);
    if (sign) {
      const meta = ZODIAC_META[sign];
      links.push(
        ...pillarLinks("zodiac", meta.compatibleWith.slice(0, 3), registry.zodiac),
        ...pillarLinks("planets", [meta.rulingPlanetSlug], registry.planets)
      );
      const tarotSlug = ELEMENT_TAROT[meta.element];
      if (tarotSlug) {
        links.push(...pillarLinks("tarot", [tarotSlug], registry.tarot));
      }
    }
  }

  if (article.hub === "planets") {
    const idx = (PLANET_SLUGS as readonly string[]).indexOf(article.slug);
    const houseSlug = HOUSE_SLUGS[idx % HOUSE_SLUGS.length];
    links.push(
      ...pillarLinks("houses", [houseSlug, HOUSE_SLUGS[(idx + 3) % 12]], registry.houses),
      ...pillarLinks("planets", PLANET_SLUGS.filter((s) => s !== article.slug).slice(0, 2), registry.planets)
    );
  }

  if (article.hub === "houses") {
    const idx = (HOUSE_SLUGS as readonly string[]).indexOf(article.slug);
    links.push(
      ...pillarLinks("planets", [PLANET_SLUGS[idx % PLANET_SLUGS.length]], registry.planets),
      ...pillarLinks("houses", HOUSE_SLUGS.filter((s) => s !== article.slug).slice(0, 2), registry.houses)
    );
  }

  if (article.hub === "tarot") {
    const idx = TAROT_CARD_SLUGS.indexOf(article.slug);
    links.push(
      ...pillarLinks("tarot", TAROT_CARD_SLUGS.filter((s) => s !== article.slug).slice(idx, idx + 2), registry.tarot),
      ...pillarLinks("zodiac", ["leo", "pisces", "gemini"], registry.zodiac)
    );
  }

  const manual = article.relatedLinks ?? [];
  const seen = new Set<string>();
  return [...manual, ...links].filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  }).slice(0, 8);
}
