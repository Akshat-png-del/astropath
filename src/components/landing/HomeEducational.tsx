import Link from "next/link";
import { FadeIn } from "@/components/cosmic/FadeIn";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { HOME_FAQ } from "@/lib/content/home-faq";
import { APP_NAME } from "@/lib/brand";

export function HomeEducational() {
  const faqPreview = HOME_FAQ.slice(0, 4);

  return (
    <>
      <section className="relative z-10 px-4 sm:px-6 py-20 sm:py-28 max-w-3xl mx-auto w-full">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="font-display text-2xl sm:text-3xl text-silver-bright/85 mb-4">
              How {APP_NAME} works
            </h2>
            <p className="text-sm text-silver-muted/85 leading-relaxed max-w-lg mx-auto">
              Tarot readings, free educational guides, and a personal dashboard — built for reflection,
              not certainty.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 mb-10">
            {[
              { n: "1", title: "Pick a spread", text: "Daily card, love, yes/no, or Celtic Cross — costs shown before you start." },
              { n: "2", title: "Shuffle & draw", text: "You shuffle the deck and choose each card. Positions map to your spread." },
              { n: "3", title: "Read & reflect", text: "Get position-by-position guidance. Save readings to your dashboard anytime." },
            ].map((item) => (
              <div key={item.n} className="glass-card rounded-xl p-6 text-center sm:text-left">
                <span className="text-[10px] tracking-widest uppercase text-silver-faint">{item.n}</span>
                <h3 className="font-display text-lg text-silver/85 mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-silver-muted/85 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <CosmicButton href="/tarot/reading">Try a free reading</CosmicButton>
            <CosmicButton variant="secondary" href="/learn">Explore guides</CosmicButton>
          </div>
        </FadeIn>
      </section>

      <section className="relative z-10 px-4 sm:px-6 pb-20 sm:pb-28 max-w-3xl mx-auto w-full">
        <FadeIn delay={0.1}>
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl text-silver-bright/85 mb-3">
              Common questions
            </h2>
            <p className="text-sm text-silver-muted/85">
              Quick answers before you begin.
            </p>
          </div>

          <div className="space-y-4">
            {faqPreview.map((item) => (
              <GlassCard key={item.question} padding="sm" className="text-left p-6">
                <h3 className="text-sm font-medium text-silver/80 mb-2">{item.question}</h3>
                <p className="text-sm text-silver-muted/90 leading-relaxed">{item.answer}</p>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="text-sm text-silver-muted hover:text-silver/80 transition-colors underline-offset-2 hover:underline"
            >
              View all FAQs →
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
