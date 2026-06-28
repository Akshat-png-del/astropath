"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { SYMBOL } from "@/lib/symbols";

const HEADLINE_LINES = [
  { words: ["The", "universe", "reveals"], highlight: "universe" },
  { words: ["more", "when", "it"], highlight: false },
  { words: ["knows", "you."], highlight: "you.", italic: "you." },
];

function AnimatedWord({
  word,
  index,
  highlight = false,
  italic = false,
  reducedMotion,
  softEntrance,
}: {
  word: string;
  index: number;
  highlight?: string | boolean;
  italic?: string | boolean;
  reducedMotion: boolean;
  softEntrance: boolean;
}) {
  const isHighlight = highlight === true || highlight === word;
  const isItalic = italic === true || italic === word;

  return (
    <motion.span
      data-headline-word
      className={`inline-block mr-[0.3em] last:mr-0 ${isItalic ? "italic" : ""} ${
        isHighlight ? "headline-shimmer" : "hero-headline-word"
      }`}
      initial={
        reducedMotion
          ? false
          : softEntrance
            ? { opacity: 0, y: 24 }
            : { opacity: 0, y: 40, filter: "blur(8px)" }
      }
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : 0.15 + index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.span
        animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
        className="inline-block will-change-transform [transform:translateZ(0)]"
      >
        {word}
      </motion.span>
    </motion.span>
  );
}

export function AnimatedHeadline() {
  const reducedMotion = useReducedMotion();
  const [softEntrance, setSoftEntrance] = useState(true);

  useEffect(() => {
    const coarse =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 767px)").matches;
    setSoftEntrance(coarse);
  }, []);

  // Mobile WebKit can stall Framer opacity/blur — force visibility if still hidden
  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-headline-word]").forEach((el) => {
        if (getComputedStyle(el).opacity === "0") {
          el.style.opacity = "1";
          el.style.filter = "none";
          el.style.transform = "none";
        }
      });
    }, 1800);
    return () => window.clearTimeout(timer);
  }, []);

  let wordIndex = 0;

  return (
    <motion.h1
      data-headline-root
      className="hero-headline font-display text-[clamp(1.65rem,6.5vw,4.5rem)] font-light leading-[1.12] sm:leading-[1.2] mb-4 sm:mb-6"
      initial={false}
      animate={{ opacity: 1 }}
    >
      {HEADLINE_LINES.map((line, lineIdx) => (
        <span
          key={lineIdx}
          className="flex flex-wrap justify-center lg:justify-start items-baseline py-1 overflow-visible w-full"
        >
          {line.words.map((word) => {
            const idx = wordIndex++;
            return (
              <AnimatedWord
                key={`${lineIdx}-${word}-${idx}`}
                word={word}
                index={idx}
                highlight={line.highlight}
                italic={line.italic}
                reducedMotion={!!reducedMotion}
                softEntrance={softEntrance}
              />
            );
          })}
        </span>
      ))}
    </motion.h1>
  );
}

export function MovingTagline() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative overflow-hidden py-2 max-w-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <motion.div
        className="flex gap-8 sm:gap-12 whitespace-nowrap text-[10px] tracking-[0.25em] sm:tracking-[0.4em] uppercase text-silver-faint/80"
        animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, ri) => (
          <span key={ri} className="flex gap-8 sm:gap-12 shrink-0">
            <span>{SYMBOL.star} Trust the cosmos</span>
            <span>{SYMBOL.moon} Know yourself</span>
            <span>{SYMBOL.starAlt} Discover your path</span>
            <span>{SYMBOL.circle} The stars await</span>
            <span>{SYMBOL.star} Trust the cosmos</span>
            <span>{SYMBOL.moon} Know yourself</span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
