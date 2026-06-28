import Link from "next/link";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { APP_NAME, pageMetadata } from "@/lib/brand";

export const metadata = pageMetadata(
  "Page Not Found",
  `${APP_NAME} could not find the page you requested.`,
  "/404"
);

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-silver-faint mb-4">{APP_NAME}</p>
        <h1 className="font-display text-4xl sm:text-5xl text-silver-bright/85 mb-3">404</h1>
        <p className="text-silver-muted/85 text-sm max-w-md mb-8 leading-relaxed">
          This page isn&apos;t in the stars right now. Head back to {APP_NAME} and continue your
          journey.
        </p>
        <CosmicButton href="/">Back to {APP_NAME}</CosmicButton>
        <Link href="/tarot/reading" className="mt-4 text-sm text-silver-muted/90 hover:text-silver-dim/90 transition-colors">
          Try a free tarot reading
        </Link>
      </main>
      <SiteFooter compact />
    </div>
  );
}
