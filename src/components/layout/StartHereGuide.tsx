import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/cosmic/FadeIn";

const STEPS = [
  {
    step: "1",
    title: "Draw your cards",
    description: "Pick a spread, shuffle, and receive a guided tarot reading — costs shown upfront.",
    href: "/tarot/reading",
    label: "Start free reading",
  },
  {
    step: "2",
    title: "Learn the symbols",
    description: "Free guides on birth charts, moon signs, compatibility, and every Major Arcana card.",
    href: "/learn",
    label: "Browse guides",
  },
  {
    step: "3",
    title: "Track your journey",
    description: "Save readings, build streaks, and revisit daily insights from your dashboard.",
    href: "/dashboard",
    label: "Open dashboard",
  },
] as const;

export function StartHereGuide() {
  return (
    <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto w-full">
      <FadeIn>
        <div className="text-center mb-12 sm:mb-16 max-w-xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase text-silver-faint mb-4">New here?</p>
          <h2 className="font-display text-2xl sm:text-3xl text-silver-bright/85 mb-3">Start in three steps</h2>
          <p className="text-sm text-silver-muted/85 leading-relaxed">
            No account required to try tarot. Explore at your own pace — we&apos;ll guide you along the way.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((item, i) => (
            <FadeIn key={item.step} delay={i * 0.08}>
              <li className="glass-card rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-silver/20 text-xs text-silver-muted/90 mb-5">
                  {item.step}
                </span>
                <h3 className="font-display text-xl text-silver/90 mb-3">{item.title}</h3>
                <p className="text-sm text-silver-muted/85 leading-relaxed flex-1 mb-6">{item.description}</p>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm text-silver-dim/85 hover:text-silver/90 transition-colors group"
                >
                  {item.label}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </li>
            </FadeIn>
          ))}
        </ol>
      </FadeIn>
    </section>
  );
}
