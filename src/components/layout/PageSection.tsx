import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  /** Tighter vertical rhythm inside long-form pages */
  tight?: boolean;
}

/** Consistent vertical spacing between major page blocks */
export function PageSection({ children, className, tight }: PageSectionProps) {
  return (
    <section
      className={cn(
        tight ? "py-8 sm:py-10" : "py-14 sm:py-20 lg:py-24",
        className
      )}
    >
      {children}
    </section>
  );
}

interface PageStackProps {
  children: ReactNode;
  className?: string;
}

/** Stacks page content with generous, consistent gaps */
export function PageStack({ children, className }: PageStackProps) {
  return (
    <div className={cn("flex flex-col gap-12 sm:gap-16 lg:gap-20", className)}>
      {children}
    </div>
  );
}
