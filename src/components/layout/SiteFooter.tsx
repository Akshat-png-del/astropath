import Link from "next/link";
import { APP_NAME } from "@/lib/brand";

const FOOTER_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/contact", label: "Contact Us" },
] as const;

interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className = "" }: SiteFooterProps) {
  return (
    <footer
      className={`relative z-10 border-t border-white/[0.04] py-8 sm:py-10 px-4 sm:px-6 ${className}`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-5 sm:gap-6">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm text-white/35 hover:text-white/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-[10px] text-white/20 tracking-[0.35em] uppercase text-center">
          made by the universe itself
        </p>
        <p className="text-[10px] text-white/15 text-center" suppressHydrationWarning>
          © {new Date().getFullYear()} {APP_NAME}. Guidance, not certainty.
        </p>
      </div>
    </footer>
  );
}
