import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { BlogIndex } from "@/components/education/BlogIndex";
import { TrustNotice } from "@/components/trust/TrustNotice";
import { pageMetadata } from "@/lib/brand";

export const metadata: Metadata = pageMetadata(
  "Astrology Blog — Guides & Insights",
  "The AstroPath journal: long-form astrology education, relationship insights, tarot guides, and beginner-friendly chart reading.",
  "/blog"
);

export default function BlogPage() {
  return (
    <PageShell
      width="md"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      title="Blog"
      subtitle="Long-form astrology education, relationship insights, and tarot guides."
      stack={false}
    >
      <TrustNotice className="mb-10" compact />
      <BlogIndex />
    </PageShell>
  );
}
