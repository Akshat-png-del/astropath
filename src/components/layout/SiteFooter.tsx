import Link from "next/link";
import { APP_NAME } from "@/lib/brand";

export const FOOTER_SECTIONS = [
  {
    title: "Explore",
    links: [
      { href: "/tarot/reading", label: "Tarot Readings" },
      { href: "/pricing", label: "Pricing" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
] as const;

interface SiteFooterProps {
  className?: string;
  compact?: boolean;
}

export function SiteFooter({ className = "", compact = false }: SiteFooterProps) {
  return (
    <footer
      className={`relative z-10 border-t border-silver/10 ${
        compact ? "py-8" : "py-12 sm:py-14"
      } px-4 sm:px-6 mt-auto ${className}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 sm:gap-10">
        <nav
          aria-label="Footer"
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-10 text-center sm:text-left"
        >
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col items-center sm:items-start">
              <p className="text-[10px] tracking-[0.35em] uppercase text-silver-faint mb-3 sm:mb-4">
                {section.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-silver-muted/85 hover:text-silver-dim/90 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="w-full border-t border-silver/10 pt-6 sm:pt-8 flex flex-col items-center gap-3 sm:gap-4">
          <p className="text-[11px] text-silver-faint text-center max-w-md leading-relaxed">
            {APP_NAME} is for reflection and self-discovery.
          </p>
          <p className="text-[10px] text-silver-faint/80 text-center" suppressHydrationWarning>
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
