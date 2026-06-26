import Link from "next/link";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { APP_NAME, pageMetadata } from "@/lib/brand";

export const metadata = pageMetadata(
  "Page Not Found",
  `${APP_NAME} could not find the page you requested.`
);

export default function NotFound() {
  return (
    <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16 min-h-dvh text-center">
      <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-4">{APP_NAME}</p>
      <h1 className="font-display text-4xl sm:text-5xl text-white/85 mb-3">404</h1>
      <p className="text-white/35 text-sm max-w-md mb-8 leading-relaxed">
        This page isn&apos;t in the stars right now. Head back to {APP_NAME} and continue your
        journey.
      </p>
      <CosmicButton href="/">Back to {APP_NAME}</CosmicButton>
      <Link href="/chat" className="mt-4 text-sm text-white/40 hover:text-white/60 transition-colors">
        Start a reading
      </Link>
    </main>
  );
}
