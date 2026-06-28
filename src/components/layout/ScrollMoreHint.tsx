"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SCROLL_START = 48;
const BOTTOM_BUFFER = 64;
const HIDE_DELAY_MS = 850;

export function ScrollMoreHint() {
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const update = () => {
      const scrollY = window.scrollY;
      const scrollingUp = scrollY < lastScrollY.current;
      lastScrollY.current = scrollY;

      const viewport = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - viewport;
      const hasMoreBelow = scrollY < maxScroll - BOTTOM_BUFFER;
      const hasScrolled = scrollY > SCROLL_START;

      if (scrollingUp && hasScrolled && hasMoreBelow) {
        setVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setVisible(false), HIDE_DELAY_MS);
      } else {
        setVisible(false);
        if (hideTimer.current) clearTimeout(hideTimer.current);
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "fixed left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center gap-1.5",
        "transition-opacity duration-500 ease-out motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="w-px h-10 bg-gradient-to-b from-transparent via-silver-dim/45 to-silver-dim/65" />
      <ChevronDown
        className={cn(
          "w-3.5 h-3.5 text-silver-dim/70",
          visible && "motion-safe:animate-bounce"
        )}
        strokeWidth={1.75}
      />
    </div>
  );
}
