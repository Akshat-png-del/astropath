import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "./SiteFooter";
import { AppNav } from "./AppNav";

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, subtitle, children }: LegalPageLayoutProps) {
  return (
    <>
      <AppNav />
      <main className="relative z-10 flex-1 px-4 sm:px-6 py-10 sm:py-14 max-w-3xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/30 hover:text-white/50 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl text-white/85 mb-2">{title}</h1>
        {subtitle && (
          <p className="text-sm text-white/35 mb-8 leading-relaxed">{subtitle}</p>
        )}

        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-5 text-sm text-white/50 leading-relaxed">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
