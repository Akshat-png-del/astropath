import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/lib/ui/button-classes";

interface CosmicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

export function CosmicButton({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: CosmicButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
