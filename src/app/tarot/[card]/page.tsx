import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PillarArticlePage } from "@/components/pillars/PillarArticlePage";
import { getTarotPillar } from "@/content/pillars/tarot";
import { TAROT_CARD_SLUGS } from "@/content/pillars/tarot/meta";
import { pageMetadata } from "@/lib/brand";

interface PageProps {
  params: Promise<{ card: string }>;
}

export function generateStaticParams() {
  return TAROT_CARD_SLUGS.map((card) => ({ card }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { card } = await params;
  const article = getTarotPillar(card);
  if (!article) return pageMetadata("Card Not Found", "Tarot card not found.", "/tarot");
  return pageMetadata(article.title, article.description, `/tarot/${card}`);
}

export default async function TarotCardPage({ params }: PageProps) {
  const { card } = await params;
  const article = getTarotPillar(card);
  if (!article) notFound();
  return <PillarArticlePage article={article} />;
}
