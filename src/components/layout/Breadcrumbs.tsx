import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-1.5 text-sm", className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-silver-faint/90 shrink-0" aria-hidden />}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-silver-muted/85 hover:text-silver-dim/90 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-silver-dim/85" : "text-silver-muted/85"}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
