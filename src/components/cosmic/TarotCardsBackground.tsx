"use client";

import { motion } from "framer-motion";
import { TarotCard } from "@/components/tarot/TarotCard";

const FLOATING_INDICES = [0, 1, 2, 3, 4, 17, 18, 19, 21];

export function TarotCardsBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -12 }}
      aria-hidden="true"
    >
      {FLOATING_INDICES.map((_, i) => {
        const startX = (i * 13 + 5) % 90;
        const duration = 32 + i * 5;
        const delay = i * 3;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${startX}%`, top: "110%" }}
            animate={{
              y: [0, -1300],
              x: [0, Math.sin(i) * 50, Math.cos(i) * 35, 0],
              rotate: [i * 6 - 15, i * 6 + 12, i * 6 - 10],
              opacity: [0, 0.2, 0.2, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.08, 0.88, 1],
            }}
          >
            <TarotCard face="back" size="xs" className="!w-14 sm:!w-16 opacity-90" />
          </motion.div>
        );
      })}
    </div>
  );
}
