import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PillarArticlePage } from "@/components/pillars/PillarArticlePage";
import { getZodiacPillar } from "@/content/pillars/zodiac";
import { ZODIAC_SIGN_SLUGS } from "@/lib/zodiac/sign-slugs";
import { pageMetadata } from "@/lib/brand";

interface PageProps {
  params: Promise<{ sign: string }>;
}

export function generateStaticParams() {
  return ZODIAC_SIGN_SLUGS.map((sign) => ({ sign }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sign } = await params;
  const article = getZodiacPillar(sign);
  if (!article) return pageMetadata("Sign Not Found", "Zodiac sign not found.", "/zodiac");
  return pageMetadata(article.title, article.description, `/zodiac/${sign}`);
}

export default async function ZodiacSignPage({ params }: PageProps) {
  const { sign } = await params;
  const article = getZodiacPillar(sign);
  if (!article) notFound();
  return <PillarArticlePage article={article} />;
}
