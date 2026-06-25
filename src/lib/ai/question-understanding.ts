import {
  hasTopicKeyword,
  scoreTopic,
  TOPIC_KEYWORDS,
  type ReadingTopic,
} from "./message-topics";

export type QuestionDomain =
  | "love"
  | "career"
  | "marriage"
  | "health"
  | "family"
  | "finance"
  | "spirituality"
  | "self_discovery"
  | "astrology"
  | "timing"
  | "self"
  | "general";

export type QuestionType =
  | "yes_no"
  | "when"
  | "why"
  | "how"
  | "what"
  | "should"
  | "open";

export type MeaningLens = "love" | "career" | "general";

export interface QuestionAnalysis {
  domain: QuestionDomain;
  readingTopic: ReadingTopic;
  questionType: QuestionType;
  isExplicitQuestion: boolean;
  isYesNo: boolean;
  emotionalTone: "negative" | "positive" | "neutral";
  coreConcern: string;
  answerAngle: string;
}

function detectQuestionType(text: string): QuestionType {
  const t = text.toLowerCase();
  if (/\b(when|how long|what time|by when)\b/.test(t)) return "when";
  if (/\b(why|reason)\b/.test(t)) return "why";
  if (/\b(how do|how can|how to|how will)\b/.test(t)) return "how";
  if (/\b(what|which|who)\b/.test(t)) return "what";
  if (/\b(should|ought)\b/.test(t)) return "should";
  if (/\b(will|can i|is it|are we|do they|does (he|she|it)|would)\b/.test(t)) return "yes_no";
  return "open";
}

function detectDomain(text: string): QuestionDomain {
  const marriage = scoreTopic(text, TOPIC_KEYWORDS.marriage);
  let love = scoreTopic(text, TOPIC_KEYWORDS.relationship);
  if (/\b(come back|get back together|broke up|left me|dumped|ex-|my ex)\b/i.test(text)) love += 2;
  const career = scoreTopic(text, TOPIC_KEYWORDS.career);
  const health = scoreTopic(text, TOPIC_KEYWORDS.health);
  const family = scoreTopic(text, TOPIC_KEYWORDS.family);
  const finance = scoreTopic(text, TOPIC_KEYWORDS.finance);
  const spirituality = scoreTopic(text, TOPIC_KEYWORDS.spirituality);
  const astrology = scoreTopic(text, TOPIC_KEYWORDS.astrology);
  const self = scoreTopic(text, TOPIC_KEYWORDS.self_worth);
  const timing = /\b(when|timing|soon|future|next month|this year|how long)\b/i.test(text) ? 1 : 0;

  const scores: [QuestionDomain, number][] = [
    ["astrology", astrology * 2],
    ["marriage", marriage * 2],
    ["love", love],
    ["family", family],
    ["career", career],
    ["finance", finance],
    ["health", health],
    ["spirituality", spirituality],
    ["self_discovery", self],
    ["timing", timing],
  ];
  scores.sort((a, b) => b[1] - a[1]);
  if (scores[0][1] > 0) return scores[0][0];
  return "general";
}

function buildCoreConcern(text: string, domain: QuestionDomain, tone: QuestionAnalysis["emotionalTone"]): string {
  const snippet = text.length > 90 ? `${text.slice(0, 90)}…` : text;
  const mood =
    tone === "negative" ? "They sound worried or hurt"
    : tone === "positive" ? "They sound hopeful"
    : "They want clarity";

  const domainLine: Record<QuestionDomain, string> = {
    love: "about love or a relationship",
    marriage: "about marriage or commitment",
    career: "about work, money, or career direction",
    family: "about family dynamics or home life",
    finance: "about money, debt, or financial security",
    health: "about health or wellbeing (not medical advice)",
    spirituality: "about meaning, faith, or spiritual direction",
    self_discovery: "about identity, purpose, or who they are becoming",
    astrology: "about their birth chart or astrological reading",
    timing: "about timing — when something may shift",
    self: "about confidence, self-worth, or inner struggle",
    general: "about their life path right now",
  };

  return `${mood} ${domainLine[domain]}. In their words: "${snippet}"`;
}

function buildAnswerAngle(domain: QuestionDomain, questionType: QuestionType): string {
  const angles: Record<QuestionDomain, string> = {
    love: "Give a love prediction — will they return, is it mutual, what blocks the connection. Use Venus/Moon themes.",
    marriage: "Read marriage/commitment timing and compatibility pressure — family, delay, or green light.",
    career: "Predict job change, promotion, or money shift with a timing window. Saturn/Jupiter career themes.",
    family: "Read the family dynamic — who is driving tension, when it eases.",
    finance: "Money prediction — stability, debt relief, or income change with practical timing.",
    health: "Stress/rest patterns only — never diagnose. Offer when energy improves.",
    spirituality: "Meaning and direction — what the chart says they're being called toward.",
    self_discovery: "Name their pattern and what's coming in their growth chapter.",
    astrology: "Explain chart placement impact on their specific question.",
    timing: "Concrete window — weeks or months — with planetary reason.",
    self: "Confidence reading — what's blocking them and when self-trust returns.",
    general: "Direct prediction on their life question — mirror their words first.",
  };

  const typeHint: Record<QuestionType, string> = {
    yes_no: "First words must be: Short answer: Yes / Not yet / Unlikely / Leaning yes — then astrological why.",
    when: "First sentence must include a timeframe (e.g. next 6–8 weeks, by autumn).",
    why: "Explain the astrological + emotional pattern causing this.",
    how: "One action step + what the chart favours now.",
    what: "Answer exactly what they asked — name people/situations from their message.",
    should: "Clear lean: do it / wait / don't — with balanced chart reasoning.",
    open: "Address their situation by quoting key details they shared.",
  };

  return `${angles[domain]} ${typeHint[questionType]}`;
}

export function isExplicitQuestion(text: string): boolean {
  const t = text.trim();
  if (!t) return false;
  if (t.includes("?")) return true;
  if (/^(what|when|where|why|how|will|should|can|is|are|do|does|did|could|would|tell me)\b/i.test(t)) return true;
  if (/\b(wondering|want to know|need to know|confused about|not sure if)\b/i.test(t)) return true;
  return false;
}

export function hasDomainKeywords(text: string): boolean {
  return (
    hasTopicKeyword(text, "relationship") ||
    hasTopicKeyword(text, "marriage") ||
    hasTopicKeyword(text, "career") ||
    hasTopicKeyword(text, "health") ||
    hasTopicKeyword(text, "goals") ||
    hasTopicKeyword(text, "family") ||
    hasTopicKeyword(text, "finance") ||
    hasTopicKeyword(text, "spirituality") ||
    hasTopicKeyword(text, "astrology")
  );
}

export function isGreetingOnly(text: string): boolean {
  const t = text.trim();
  if (!/^(hi|hello|hey|hii+|yo|namaste|good\s+(morning|evening|night)|sup)\b/i.test(t)) return false;
  const rest = t.replace(/^(hi|hello|hey|hii+|yo|namaste|good\s+(morning|evening|night)|sup)[,!.\s]*/i, "").trim();
  if (!rest) return true;
  if (rest.length < 12 && !hasDomainKeywords(rest)) return true;
  return !hasDomainKeywords(rest) && !isExplicitQuestion(rest);
}

export function analyzeQuestion(text: string): QuestionAnalysis {
  const trimmed = text.trim();
  const negative =
    hasTopicKeyword(trimmed, "emotions_negative") || hasTopicKeyword(trimmed, "self_worth");
  const positive = hasTopicKeyword(trimmed, "emotions_positive");
  const emotionalTone = negative ? "negative" : positive ? "positive" : "neutral";

  const domain = detectDomain(trimmed);
  const questionType = detectQuestionType(trimmed);
  const explicit = isExplicitQuestion(trimmed);

  const isYesNo =
    questionType === "yes_no" ||
    /\b(will (he|she|they|it|this)|should i|can we|is (he|she|they) coming back)\b/i.test(trimmed);

  const readingTopic: ReadingTopic =
    domain === "love" || domain === "marriage" || domain === "family" ? "love"
    : domain === "career" || domain === "finance" ? "career"
    : "general";

  return {
    domain,
    readingTopic,
    questionType,
    isExplicitQuestion: explicit,
    isYesNo,
    emotionalTone,
    coreConcern: buildCoreConcern(trimmed, domain, emotionalTone),
    answerAngle: buildAnswerAngle(domain, questionType),
  };
}

export function lensForReading(question: string, spreadId?: string): MeaningLens {
  if (spreadId === "love") return "love";
  const { domain, readingTopic } = analyzeQuestion(question);
  if (readingTopic === "love") return "love";
  if (readingTopic === "career") return "career";
  if (domain === "career") return "career";
  return "general";
}

export function cardMeaningForLens(card: { general: string; love: string; career: string }, lens: MeaningLens): string {
  if (lens === "love") return card.love;
  if (lens === "career") return card.career;
  return card.general;
}
