import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PillarArticlePage } from "@/components/pillars/PillarArticlePage";
import { getPlanetPillar, PLANET_PILLARS } from "@/content/pillars/planets";
import { PLANET_SLUGS } from "@/content/pillars/planets/meta";
import { pageMetadata } from "@/lib/brand";

interface PageProps {
  params: Promise<{ planet: string }>;
}

export function generateStaticParams() {
  return PLANET_SLUGS.map((planet) => ({ planet }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { planet } = await params;
  const article = getPlanetPillar(planet);
  if (!article) return pageMetadata("Planet Not Found", "Planet not found.", "/planets");
  return pageMetadata(article.title, article.description, `/planets/${planet}`);
}

export default async function PlanetPage({ params }: PageProps) {
  const { planet } = await params;
  const article = getPlanetPillar(planet);
  if (!article) notFound();
  return <PillarArticlePage article={article} />;
}
