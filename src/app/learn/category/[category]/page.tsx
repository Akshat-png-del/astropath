import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppNav } from "@/components/layout/AppNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CategoryIndex } from "@/components/education/CategoryIndex";
import { getCategoryBySlug } from "@/content/education/categories";
import type { EducationCategoryId } from "@/content/education/types";
import { pageMetadata } from "@/lib/brand";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return [
    "astrology-basics",
    "zodiac-signs",
    "birth-charts",
    "planets",
    "houses",
    "aspects",
    "tarot",
    "compatibility",
  ].map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return pageMetadata("Topic Not Found", "Topic not found.", "/learn");
  return pageMetadata(
    `${cat.name} — Astrology Guides`,
    cat.description,
    `/learn/category/${cat.slug}`
  );
}

export default async function LearnCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  return (
    <>
      <AppNav />
      <main className="relative z-10 flex-1 px-4 sm:px-6 py-10 sm:py-16 max-w-4xl mx-auto w-full">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-silver-muted/80 hover:text-silver-dim/80 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Learn home
        </Link>
        <CategoryIndex categoryId={cat.id as EducationCategoryId} />
      </main>
      <SiteFooter />
    </>
  );
}
