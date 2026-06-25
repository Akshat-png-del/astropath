"use client";

import { motion, useReducedMotion } from "framer-motion";

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
}: {
  word: string;
  index: number;
  highlight?: string | boolean;
  italic?: string | boolean;
  reducedMotion: boolean;
}) {
  const isHighlight = highlight === true || highlight === word;
  const isItalic = italic === true || italic === word;

  return (
    <motion.span
      className={`${isItalic ? "italic" : ""} ${
        isHighlight ? "headline-shimmer" : "text-white/90"
      }`}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        delay: reducedMotion ? 0 : 0.1 + index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {word}
    </motion.span>
  );
}

export function AnimatedHeadline() {
  const reducedMotion = useReducedMotion();
  let wordIndex = 0;

  return (
    <h1 className="font-display text-[1.65rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light sm:leading-[1.2] mb-4 sm:mb-6 text-white/90 w-full">
      {HEADLINE_LINES.map((line, lineIdx) => (
        <span
          key={lineIdx}
          className="block py-0.5 sm:py-1 text-center lg:text-left"
        >
          <span className="inline leading-snug sm:leading-tight">
            {line.words.map((word, wordIdx) => {
              const idx = wordIndex++;
              return (
                <span key={`${lineIdx}-${word}-${idx}`}>
                  <AnimatedWord
                    word={word}
                    index={idx}
                    highlight={line.highlight}
                    italic={line.italic}
                    reducedMotion={!!reducedMotion}
                  />
                  {wordIdx < line.words.length - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </h1>
  );
}

export function MovingTagline() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden py-2 max-w-full w-full">
      <motion.div
        className="flex gap-8 sm:gap-12 whitespace-nowrap text-[10px] tracking-[0.25em] sm:tracking-[0.4em] uppercase text-white/15"
        animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, ri) => (
          <span key={ri} className="flex gap-8 sm:gap-12 shrink-0">
            <span>✦ Trust the cosmos</span>
            <span>☽ Know yourself</span>
            <span>✧ Discover your path</span>
            <span>◎ The stars await</span>
            <span>✦ Trust the cosmos</span>
            <span>☽ Know yourself</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
