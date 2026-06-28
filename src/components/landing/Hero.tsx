"use client";

import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { ZodiacWheel } from "@/components/cosmic/ZodiacWheel";
import { AnimatedHeadline, MovingTagline } from "@/components/cosmic/AnimatedHeadline";
import { AppNav } from "@/components/layout/AppNav";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 pt-12 sm:pt-20 pb-24 sm:pb-32 max-w-6xl mx-auto w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="text-center lg:text-left min-w-0 w-full relative z-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.35em] uppercase text-silver-faint mb-6 sm:mb-8"
          >
            Personal Astrology & Tarot
          </motion.p>

          <div className="relative z-20 isolate overflow-visible mb-1">
            <AnimatedHeadline />
          </div>
          <MovingTagline />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-base sm:text-lg text-silver-muted/85 max-w-md mx-auto lg:mx-0 mb-10 mt-8 leading-relaxed"
          >
            Explore tarot, birth-chart wisdom, and daily cosmic insights — designed for reflection and self-discovery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center lg:items-start gap-3 w-full sm:w-auto max-w-md mx-auto lg:mx-0"
          >
            {[
              { href: "/tarot/reading", label: "Free Tarot Reading" },
              { href: "/learn", label: "Explore Guides" },
              { href: "/dashboard", label: "Dashboard" },
            ].map((item) => (
              <CosmicButton
                key={item.href}
                size="lg"
                href={item.href}
                className="flex-1 sm:flex-none sm:min-w-[11rem] justify-center"
              >
                {item.label}
              </CosmicButton>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex justify-center lg:justify-end"
        >
          <ZodiacWheel />
        </motion.div>
      </div>
    </section>
  );
}

export function LandingNav() {
  return <AppNav />;
}
