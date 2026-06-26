"use client";

import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { ZodiacWheel } from "@/components/cosmic/ZodiacWheel";
import { AnimatedHeadline, MovingTagline } from "@/components/cosmic/AnimatedHeadline";
import { AppNav } from "@/components/layout/AppNav";
import { motion } from "framer-motion";
import { APP_NAME } from "@/lib/brand";

export function HeroSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 pt-10 sm:pt-16 pb-20 sm:pb-28 max-w-6xl mx-auto w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="text-center lg:text-left min-w-0 w-full relative z-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-6 sm:mb-8"
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
            className="text-base sm:text-lg text-white/35 max-w-md mx-auto lg:mx-0 mb-10 mt-8 leading-relaxed"
          >
            A wise astrology guide that understands your story before reading your stars.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
          >
            <CosmicButton size="lg" href="/chat">Begin Your Reading</CosmicButton>
            <CosmicButton variant="secondary" size="lg" href="/tarot">Free Tarot</CosmicButton>
            <CosmicButton variant="ghost" size="lg" href="/dashboard">Dashboard</CosmicButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-6"
          >
            Explore your sign
          </motion.p>
          <ZodiacWheel />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="text-[10px] text-white/20 mt-6 tracking-[0.2em] uppercase"
          >
            Twelve signs · one {APP_NAME}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export { AppNav as LandingNav } from "@/components/layout/AppNav";
