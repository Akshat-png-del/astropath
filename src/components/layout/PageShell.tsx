import type { ReactNode } from "react";
import { AppNav } from "./AppNav";
import { SiteFooter } from "./SiteFooter";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";
import { PageStack } from "./PageSection";
import { ScrollMoreHint } from "./ScrollMoreHint";
import { cn } from "@/lib/utils";

const WIDTH = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
} as const;

interface PageShellProps {
  children: ReactNode;
  width?: keyof typeof WIDTH;
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  footer?: boolean;
  compactFooter?: boolean;
  showNav?: boolean;
  className?: string;
  mainClassName?: string;
  /** When false, children render without the default PageStack wrapper */
  stack?: boolean;
}

export function PageShell({
  children,
  width = "lg",
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  footer = true,
  compactFooter = false,
  showNav = true,
  className,
  mainClassName,
  stack = true,
}: PageShellProps) {
  const hasHeader = eyebrow || title || subtitle;

  return (
    <div className={cn("flex flex-col flex-1 min-h-0", className)}>
      {showNav && <AppNav />}
      <ScrollMoreHint />
      <main
        className={cn(
          "relative z-10 flex-1 w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20",
          WIDTH[width],
          mainClassName
        )}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-8 sm:mb-10" />
        )}

        {hasHeader && (
          <header className="mb-10 sm:mb-14 max-w-2xl">
            {eyebrow && (
              <p className="text-[10px] tracking-[0.35em] uppercase text-silver-faint mb-3">
                {eyebrow}
              </p>
            )}
            {title && (
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-silver-bright/85 leading-tight mb-4">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm sm:text-base text-silver-muted/90 leading-relaxed max-w-xl">
                {subtitle}
              </p>
            )}
          </header>
        )}

        {stack ? <PageStack>{children}</PageStack> : children}
      </main>
      {footer && <SiteFooter compact={compactFooter} />}
    </div>
  );
}
