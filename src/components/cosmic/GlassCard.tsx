import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: "sm" | "md" | "lg";
}

export function GlassCard({ children, className, hover = false, glow = false, padding = "md" }: GlassCardProps) {
  const pads = { sm: "p-4", md: "p-6", lg: "p-8" };
  return (
    <div className={cn("glass-card rounded-2xl", pads[padding], hover && "glass-card-hover", glow && "shadow-[0_0_60px_rgba(255,255,255,0.03)]", className)}>
      {children}
    </div>
  );
}
