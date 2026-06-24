"use client";

import { motion } from "framer-motion";

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
}: {
  word: string;
  index: number;
  highlight?: string | boolean;
  italic?: string | boolean;
}) {
  const isHighlight = highlight === true || highlight === word;
  const isItalic = italic === true || italic === word;

  return (
    <motion.span
      className={`inline-block mr-[0.3em] last:mr-0 ${isItalic ? "italic" : ""} ${
        isHighlight ? "headline-shimmer" : "text-white/85"
      }`}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.span
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
        className="inline-block will-change-transform"
      >
        {word}
      </motion.span>
    </motion.span>
  );
}

export function AnimatedHeadline() {
  let wordIndex = 0;

  return (
    <motion.h1
      className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.2] mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {HEADLINE_LINES.map((line, lineIdx) => (
        <span key={lineIdx} className="block overflow-visible py-1 mt-0.5 first:mt-0">
          {line.words.map((word) => {
            const idx = wordIndex++;
            return (
              <AnimatedWord
                key={`${lineIdx}-${word}-${idx}`}
                word={word}
                index={idx}
                highlight={line.highlight}
                italic={line.italic}
              />
            );
          })}
        </span>
      ))}
    </motion.h1>
  );
}

export function MovingTagline() {
  return (
    <motion.div
      className="relative overflow-hidden py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap text-[10px] tracking-[0.4em] uppercase text-white/15"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, ri) => (
          <span key={ri} className="flex gap-12">
            <span>✦ Trust the cosmos</span>
            <span>☽ Know yourself</span>
            <span>✧ Discover your path</span>
            <span>◎ The stars await</span>
            <span>✦ Trust the cosmos</span>
            <span>☽ Know yourself</span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
