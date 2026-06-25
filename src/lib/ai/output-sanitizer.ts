/** Output sanitizer — detect leaks and template patterns in user-facing text. */

import { hasInternalLeak, INTERNAL_LEAK_PATTERNS } from "./internal-reasoning";

export const TEMPLATE_PATTERNS = [
  /\bgemini energy\b/i,
  /\bcapricorn often carries pain quietly\b/i,
  /\bfocus on what is within your control this week\b/i,
  /\blooking at your \w+ energy\b/i,
  /\bfor \w+, the mind often processes loss\b/i,
  /\bvenus and the moon suggest this chapter\b/i,
  /\bvenus and the moon in your chart speak to\b/i,
  /\bfrom a chart perspective\b/i,
  /\bwhat you shared\b/i,
  /\bdeserves a direct answer, not a generic reading\b/i,
  /\bover the next month, this period appears more focused on emotional processing\b/i,
  /\bgive yourself permission to grieve the closure\b/i,
  /\byour question opens a new chapter\b/i,
  /\bwhat stands out in your message is the specific weight\b/i,
  /\bhere's how i read it\b/i,
  /\bon "[^"]{10,}" —/i,
];

export interface SanitizeResult {
  clean: boolean;
  issues: string[];
  regenerationHint: string | null;
}

export function sanitizeOutput(text: string): SanitizeResult {
  const issues: string[] = [];

  if (hasInternalLeak(text)) {
    issues.push("internal_leak");
  }

  for (const re of INTERNAL_LEAK_PATTERNS) {
    if (re.test(text)) {
      issues.push("leak_pattern");
      break;
    }
  }

  for (const re of TEMPLATE_PATTERNS) {
    if (re.test(text)) {
      issues.push("template_text");
      break;
    }
  }

  const regenerationHint = issues.length
    ? "Rewrite entirely in fresh natural prose. No internal labels. No sign-trait templates. No repeated stock phrases. Answer their specific question."
    : null;

  return {
    clean: issues.length === 0,
    issues,
    regenerationHint,
  };
}
