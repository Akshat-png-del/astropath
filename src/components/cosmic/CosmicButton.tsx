import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface CosmicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function CosmicButton({
  children, variant = "primary", size = "md", className, href, ...props
}: CosmicButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white/20 disabled:opacity-40";

  const variants = {
    primary: "bg-white text-[#050505] hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]",
    secondary: "border border-white/15 bg-white/[0.04] text-white/80 hover:bg-white/[0.08] hover:border-white/25",
    ghost: "text-white/50 hover:text-white/80 hover:bg-white/[0.04]",
  };

  const sizes = { sm: "px-4 py-2 text-sm gap-2", md: "px-6 py-3 text-sm gap-2", lg: "px-8 py-3.5 text-base gap-2.5" };
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
