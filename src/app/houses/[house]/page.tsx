import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PillarArticlePage } from "@/components/pillars/PillarArticlePage";
import { getHousePillar } from "@/content/pillars/houses";
import { HOUSE_SLUGS } from "@/content/pillars/houses/meta";
import { pageMetadata } from "@/lib/brand";

interface PageProps {
  params: Promise<{ house: string }>;
}

export function generateStaticParams() {
  return HOUSE_SLUGS.map((house) => ({ house }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { house } = await params;
  const article = getHousePillar(house);
  if (!article) return pageMetadata("House Not Found", "House not found.", "/houses");
  return pageMetadata(article.title, article.description, `/houses/${house}`);
}

export default async function HousePage({ params }: PageProps) {
  const { house } = await params;
  const article = getHousePillar(house);
  if (!article) notFound();
  return <PillarArticlePage article={article} />;
}
