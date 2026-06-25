"use client";

import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { ZodiacWheel } from "@/components/cosmic/ZodiacWheel";
import { AnimatedHeadline, MovingTagline } from "@/components/cosmic/AnimatedHeadline";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative z-10 px-6 pt-16 pb-28 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-8"
          >
            Personal Cosmic Astrology
          </motion.p>

          <AnimatedHeadline />
          <MovingTagline />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-base sm:text-lg text-white/35 max-w-md mx-auto lg:mx-0 mb-10 mt-8 leading-relaxed"
          >
            A wise cosmic companion that understands your story before reading your stars.
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
            Twelve signs · one cosmic mirror
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export function LandingNav() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
          <span className="text-white/50 text-sm">☽</span>
        </div>
        <span className="font-display text-lg text-white/75 tracking-wide">Cosmic Mirror</span>
      </Link>
      <div className="flex items-center gap-3">
        <CosmicButton variant="ghost" size="sm" href="/pricing">Pricing</CosmicButton>
        <CosmicButton variant="ghost" size="sm" href="/tarot">Tarot</CosmicButton>
        <CosmicButton variant="ghost" size="sm" href="/account">Account</CosmicButton>
        <CosmicButton variant="ghost" size="sm" href="/auth">Sign In</CosmicButton>
        <CosmicButton size="sm" href="/chat">Begin Reading</CosmicButton>
      </div>
    </nav>
  );
}
