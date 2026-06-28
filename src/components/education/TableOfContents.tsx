"use client";

import type { EducationSection } from "@/content/education/types";

interface TableOfContentsProps {
  sections: EducationSection[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  if (sections.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-xl border border-silver/15 bg-silver/5 p-5 mb-10"
    >
      <p className="text-xs font-medium text-silver-dim/85 uppercase tracking-wider mb-3">
        In this article
      </p>
      <ol className="space-y-2 text-sm">
        {sections.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-silver-muted hover:text-silver/85 transition-colors leading-snug block"
            >
              <span className="text-silver-faint mr-2 tabular-nums">{i + 1}.</span>
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
