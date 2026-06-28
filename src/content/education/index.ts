import type { EducationArticle } from "./types";
import { whatIsAstrology } from "./articles/what-is-astrology";
import { howAstrologyWorks } from "./articles/how-astrology-works";
import { readingYourBirthChartBasics } from "./articles/reading-your-birth-chart-basics";
import { twelveZodiacSigns } from "./articles/twelve-zodiac-signs";
import { sunMoonRisingExplained } from "./articles/sun-moon-rising-explained";
import { elementsAndModalities } from "./articles/elements-and-modalities";
import { understandingBirthCharts } from "./articles/understanding-birth-charts";
import { howToReadNatalChart } from "./articles/how-to-read-natal-chart";
import { birthTimeImportance } from "./articles/birth-time-importance";
import { planetsInAstrology } from "./articles/planets-in-astrology";
import { personalVsOuterPlanets } from "./articles/personal-vs-outer-planets";
import { understandingPlanetaryTransits } from "./articles/understanding-planetary-transits";
import { twelveHousesExplained } from "./articles/twelve-houses-explained";
import { houseSystemsGuide } from "./articles/house-systems-guide";
import { astrologicalAspectsGuide } from "./articles/astrological-aspects-guide";
import { majorAspectsExplained } from "./articles/major-aspects-explained";
import { howTarotReadingsWork } from "./articles/how-tarot-readings-work";
import { majorArcanaBeginners } from "./articles/major-arcana-beginners";
import { zodiacCompatibilityGuide } from "./articles/zodiac-compatibility-guide";
import { synastryRelationshipAstrology } from "./articles/synastry-relationship-astrology";
import { moonSignsExplained } from "./articles/moon-signs-explained";
import { venusMarsInRelationships } from "./articles/venus-mars-in-relationships";
import { aiAndAstrologyEthics } from "./articles/ai-and-astrology-ethics";

export const EDUCATION_ARTICLES: EducationArticle[] = [
  whatIsAstrology,
  howAstrologyWorks,
  aiAndAstrologyEthics,
  readingYourBirthChartBasics,
  twelveZodiacSigns,
  sunMoonRisingExplained,
  elementsAndModalities,
  moonSignsExplained,
  understandingBirthCharts,
  howToReadNatalChart,
  birthTimeImportance,
  planetsInAstrology,
  personalVsOuterPlanets,
  understandingPlanetaryTransits,
  twelveHousesExplained,
  houseSystemsGuide,
  astrologicalAspectsGuide,
  majorAspectsExplained,
  howTarotReadingsWork,
  majorArcanaBeginners,
  zodiacCompatibilityGuide,
  synastryRelationshipAstrology,
  venusMarsInRelationships,
];

export function getArticleBySlug(slug: string): EducationArticle | undefined {
  return EDUCATION_ARTICLES.find((article) => article.slug === slug);
}

export function getArticlesByCategory(
  category: EducationArticle["category"]
): EducationArticle[] {
  return EDUCATION_ARTICLES.filter((article) => article.category === category);
}

export function getArticlesBySlugs(slugs: string[]): EducationArticle[] {
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is EducationArticle => article !== undefined);
}

export type {
  EducationArticle,
  EducationSection,
  EducationFAQ,
  EducationCategoryId,
} from "./types";
export { articleWordCount, articleReadMinutes } from "./types";
