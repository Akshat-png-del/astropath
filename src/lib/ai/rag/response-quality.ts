import type { ConversationContext } from "../conversation-context";
import type { ReasoningSummary } from "../reasoning-engine";
import { ragStageLog } from "../chat-debug";
import {
  containsForbiddenPhrase,
  countQuestions,
  FORBIDDEN_PHRASES,
  MIN_RESPONSE_WORDS,
  PRIOR_MESSAGES_TO_COMPARE,
  QUALITY_MAX_SCORE,
  QUALITY_PASS_THRESHOLD,
  SIMILARITY_REGENERATE_THRESHOLD,
  wordCount,
} from "../response-pipeline";
import { hasInternalLeak } from "../internal-reasoning";
import { sanitizeOutput, TEMPLATE_PATTERNS } from "../output-sanitizer";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordJaccard(a: string, b: string): number {
  const wordsA = new Set(normalize(a).split(" ").filter((w) => w.length > 3));
  const wordsB = new Set(normalize(b).split(" ").filter((w) => w.length > 3));
  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersection = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) intersection++;
  }
  const union = new Set([...wordsA, ...wordsB]).size;
  return intersection / union;
}

function extractKeywords(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((w) => w.length > 4)
    .slice(0, 15);
}

const GENERIC_ZODIAC_PATTERNS = [
  /^since you(?:'re| are) a \w+/i,
  /^as a \w+ you (?:are|have|tend)/i,
  /^\w+:\s*(?:quick wit|communication|adaptable|curious)/i,
  /\bquick wit,?\s*adaptable/i,
  /\b(?:gemini|aries|taurus|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces)s? are (?:known for|communicative|adaptable)/i,
];

const THERAPIST_OPENERS = [
  /^i hear how much/i,
  /^thank you for sharing/i,
  /^what you're going through sounds/i,
  /^i'm here for you/i,
];

const ASTRO_SIGNALS =
  /\b(venus|moon|saturn|jupiter|mercury|mars|sun sign|chart|transit|energy|astrolog|ruling|house|retrograde|zodiac|\b(aries|taurus|gemini|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces)\b)/i;

const RECONCILIATION_USER =
  /\b(come back|want (her|him|them)|miss (her|him|them)|reconcile|get back|closure|never got)\b/i;

const RECONCILIATION_ANSWER =
  /\b(reconcil|come back|return|closure|communicat|may|could|suggest|indicate|month|weeks|both people|pattern|different|work|possibilit)/i;

export interface QualityInput {
  response: string;
  ctx: ConversationContext;
  topicSwitched: boolean;
  reasoning?: ReasoningSummary;
  knownSign?: string | null;
}

export interface QualityResult {
  passed: boolean;
  isDuplicate: boolean;
  similarity: number;
  score: number;
  dimensionScores: Record<string, number>;
  issues: string[];
  regenerationHint: string | null;
}

function scoreDimensions(
  response: string,
  ctx: ConversationContext,
  reasoning: ReasoningSummary | undefined,
  knownSign: string | null | undefined,
  issues: string[]
): Record<string, number> {
  const words = wordCount(response);
  const keywords = extractKeywords(ctx.lastUserMessage);
  const matched = keywords.filter((k) => normalize(response).includes(k));

  const contextUnderstanding =
    issues.includes("ignored_latest_message") || issues.includes("question_not_answered")
      ? 4
      : matched.length >= 2
        ? 9
        : 7;

  const personalization =
    issues.includes("forbidden_phrase") || issues.includes("therapist_opener") ? 4 : words >= MIN_RESPONSE_WORDS ? 8 : 5;

  const emotionalIntelligence =
    issues.includes("missing_emotional_ack") ? 4 : /\b(grief|longing|hope|pain|closure|miss|heart|feel)\b/i.test(response) ? 8 : 6;

  const astrologicalDepth =
    issues.includes("missing_astrology") || issues.includes("generic_zodiac_dump")
      ? knownSign
        ? 3
        : 5
      : ASTRO_SIGNALS.test(response)
        ? 8
        : 5;

  const practicalGuidance =
    /\b(step|try|focus|consider|start|write|ask yourself|boundary|week|month|practice|allow)\b/i.test(response) ? 8 : 5;

  const originality = issues.includes("duplicate_of_prior_reply") || issues.includes("repeated_wording") ? 3 : 8;

  return {
    contextUnderstanding,
    personalization,
    emotionalIntelligence,
    astrologicalDepth,
    practicalGuidance,
    originality,
  };
}

function totalScore(dimensions: Record<string, number>): number {
  return Object.values(dimensions).reduce((a, b) => a + b, 0);
}

export function checkResponseQuality(input: QualityInput): QualityResult {
  const { response, ctx, topicSwitched, reasoning, knownSign } = input;
  const issues: string[] = [];
  let regenerationHint: string | null = null;

  if (!response.trim()) {
    issues.push("empty_response");
    const dims = scoreDimensions("", ctx, reasoning, knownSign, issues);
    return {
      passed: false,
      isDuplicate: false,
      similarity: 0,
      score: 0,
      dimensionScores: dims,
      issues,
      regenerationHint: "Write a full premium reading.",
    };
  }

  const words = wordCount(response);
  if (words < 50) {
    issues.push("too_short");
    regenerationHint = "Write a fuller, more specific reading — at least a few thoughtful paragraphs.";
  } else if (words < MIN_RESPONSE_WORDS) {
    // Soft warning only — do not fail solely on length
  }

  const sanitized = sanitizeOutput(response);
  if (!sanitized.clean) {
    if (sanitized.issues.includes("internal_leak") || sanitized.issues.includes("leak_pattern")) {
      issues.push("internal_leak");
    }
    if (sanitized.issues.includes("template_text")) {
      issues.push("template_text");
    }
    regenerationHint = sanitized.regenerationHint ?? regenerationHint;
  } else if (hasInternalLeak(response)) {
    issues.push("internal_leak");
    regenerationHint =
      "Remove internal labels and analysis. Write only natural user-facing prose.";
  }

  if (TEMPLATE_PATTERNS.some((re) => re.test(response))) {
    issues.push("template_text");
    regenerationHint =
      regenerationHint ??
      "Remove stock phrases and meta-commentary. Answer naturally without quoting them.";
  }

  const userSnippet = normalize(ctx.lastUserMessage).slice(0, 40);
  if (userSnippet.length >= 15 && normalize(response).includes(userSnippet)) {
    issues.push("quoted_user_message");
    regenerationHint =
      regenerationHint ??
      "Do not quote their message back. Respond naturally without repeating their words.";
  }

  if (/what you shared|from a chart perspective|deserves a direct answer/i.test(response)) {
    issues.push("template_text");
    regenerationHint =
      regenerationHint ??
      "Remove meta-commentary. Speak directly and naturally.";
  }

  const forbidden = containsForbiddenPhrase(response);
  if (forbidden) {
    issues.push("forbidden_phrase");
    regenerationHint = regenerationHint ?? `Remove "${forbidden}" — use specific reflection instead.`;
  }

  if (THERAPIST_OPENERS.some((re) => re.test(response.trim()))) {
    issues.push("therapist_opener");
    regenerationHint =
      regenerationHint ?? "Open with a specific reflection on their situation, not a therapy script.";
  }

  if (GENERIC_ZODIAC_PATTERNS.some((re) => re.test(response.trim()))) {
    issues.push("generic_zodiac_dump");
    regenerationHint =
      regenerationHint ?? "Weave astrology situationally — no trait lists or 'Since you're a [sign]'.";
  }

  const questions = countQuestions(response);
  const followUpAllowed = reasoning?.includeFollowUp ?? false;
  if (questions > 1 || (questions === 1 && !followUpAllowed)) {
    issues.push("too_many_questions");
    regenerationHint =
      regenerationHint ??
      (followUpAllowed ? "At most ONE question." : "No questions this turn — deliver value.");
  }

  let maxSimilarity = 0;
  let isDuplicate = false;

  if (!topicSwitched && ctx.assistantMessages.length > 0) {
    const priorMessages = ctx.assistantMessages.slice(-PRIOR_MESSAGES_TO_COMPARE);
    for (const prior of priorMessages) {
      const sim = wordJaccard(response, prior);
      if (sim > maxSimilarity) maxSimilarity = sim;
    }
    if (maxSimilarity > SIMILARITY_REGENERATE_THRESHOLD) {
      isDuplicate = true;
      issues.push("duplicate_of_prior_reply");
      regenerationHint =
        "Too similar to prior replies. Fresh structure and wording required.";
    }

    for (const prior of priorMessages) {
      for (const phrase of FORBIDDEN_PHRASES) {
        if (normalize(response).includes(phrase) && normalize(prior).includes(phrase)) {
          issues.push("repeated_wording");
          regenerationHint = regenerationHint ?? `Avoid repeating "${phrase}".`;
          break;
        }
      }
    }
  }

  const latestKeywords = extractKeywords(ctx.lastUserMessage);
  if (latestKeywords.length >= 2 && ctx.lastUserMessage.length > 20) {
    const responseNorm = normalize(response);
    const matched = latestKeywords.filter((k) => responseNorm.includes(k));
    if (matched.length < Math.min(2, Math.ceil(latestKeywords.length * 0.2))) {
      issues.push("ignored_latest_message");
      regenerationHint =
        regenerationHint ?? `Address their message: "${ctx.lastUserMessage.slice(0, 120)}".`;
    }
  }

  if (RECONCILIATION_USER.test(ctx.lastUserMessage) && !RECONCILIATION_ANSWER.test(response)) {
    issues.push("question_not_answered");
    regenerationHint =
      regenerationHint ??
      "Answer reconciliation/closure directly with may/could possibilities.";
  }

  // Astrology is encouraged but not mandatory — avoid forced filler

  const needsEmotionalAck =
    reasoning?.orientation === "reconciliation" ||
    reasoning?.orientation === "healing" ||
    /grief|longing|breakup/i.test(ctx.lastUserMessage);

  if (
    needsEmotionalAck &&
    !/\b(grief|longing|closure|miss|pain|heart|hope|confus|hurt|feel)\b/i.test(response)
  ) {
    issues.push("missing_emotional_ack");
    regenerationHint =
      regenerationHint ?? "Honour their emotional reality with specific language.";
  }

  const dimensionScores = scoreDimensions(response, ctx, reasoning, knownSign, issues);
  const score = totalScore(dimensionScores);

  const passed =
    score >= QUALITY_PASS_THRESHOLD &&
    !isDuplicate &&
    !issues.includes("empty_response") &&
    !issues.includes("internal_leak") &&
    !issues.includes("forbidden_phrase") &&
    !issues.includes("question_not_answered") &&
    !issues.includes("too_short") &&
    !issues.includes("too_many_questions") &&
    !issues.includes("therapist_opener") &&
    !issues.includes("generic_zodiac_dump") &&
    !issues.includes("template_text") &&
    !issues.includes("quoted_user_message") &&
    !issues.includes("ignored_latest_message");

  ragStageLog("response_quality", {
    passed,
    isDuplicate,
    similarity: Number(maxSimilarity.toFixed(3)),
    score,
    maxScore: QUALITY_MAX_SCORE,
    dimensionScores,
    issues,
    wordCount: words,
    questions,
  });

  return {
    passed,
    isDuplicate,
    similarity: maxSimilarity,
    score,
    dimensionScores,
    issues,
    regenerationHint,
  };
}

export function appendAntiDuplicateInstruction(
  systemPrompt: string,
  hint: string | null
): string {
  if (!hint) return systemPrompt;
  return `${systemPrompt}\n\nRevise: ${hint}\nRewrite in fresh natural prose. No internal labels.`;
}
