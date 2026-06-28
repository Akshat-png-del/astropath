import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/** Shared interactive control classes — always use with a `.btn-*` variant */
export const BTN_BASE = "btn";

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
): string {
  return cn(BTN_BASE, `btn-${variant}`, `btn-${size}`, className);
}

export const BTN_CHIP = cn(BTN_BASE, "btn-secondary", "btn-chip");
export const BTN_SEGMENT = cn(BTN_BASE, "btn-secondary", "btn-segment");
export const BTN_SEGMENT_BLOCK = cn(BTN_BASE, "btn-secondary", "btn-segment", "btn-segment-block");
export const BTN_SEGMENT_PRIMARY = cn(BTN_BASE, "btn-primary", "btn-segment", "btn-segment-block", "btn-lg");
export const BTN_ICON = cn(BTN_BASE, "btn-secondary", "btn-icon");
export const BTN_TEXT = cn(BTN_BASE, "btn-text");
export const BTN_NAV = cn(BTN_BASE, "btn-ghost", "btn-sm", "shrink-0 whitespace-nowrap px-2.5 xl:px-3");
