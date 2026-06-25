import type { DrawnCard, TarotReadingResult, TarotSpread } from "./types";
import type { MajorArcanaCard } from "./types";
import {
  analyzeQuestion,
  cardMeaningForLens,
  lensForReading,
  type MeaningLens,
  type QuestionAnalysis,
} from "@/lib/ai/question-understanding";

const IRA_INTRO = "I'm IRA, your guide through the Major Arcana — inspired by the Rider-Waite tradition.";

const LOVE_FRAMES: Record<string, string> = {
  You: "Your heart in this",
  Them: "Their energy toward you",
  Connection: "What binds you two",
  Challenge: "The block between you",
  Advice: "What love asks of you now",
  "Near future": "Where this is heading soon",
  Outcome: "The likely outcome if patterns stay the same",
};

const PSYCHIC_FRAMES: Record<string, string> = {
  "Root energy": "The root of the situation",
  "Hidden influence": "What you cannot see yet",
  "Present energy": "What is active right now",
  Guidance: "Spirit's guidance for you",
  Outcome: "Where this leads",
};

const CELTIC_FRAMES: Record<string, string> = {
  "Heart of the matter": "At the centre of it all",
  "Crossing influence": "What crosses or challenges you",
  Foundation: "What this is built on",
  "Recent past": "What just shaped this",
  "Crown — best possible": "Your highest potential here",
  "Near future": "What is approaching",
  Self: "How you are showing up",
  Environment: "People and forces around you",
  "Hopes & fears": "What you hope for — and fear",
  "Final outcome": "The path this is moving toward",
};

const FREE_FRAMES: Record<string, string> = {
  "Present situation": "Right now",
  Challenge: "The main challenge",
  "Distant past": "Old roots still in play",
  "Recent past": "What recently shifted",
  "Possible outcome": "One possible direction",
  "Near future": "Coming soon",
  "Your approach": "How you are handling this",
  "External influences": "Outside forces",
  "Hopes & fears": "Hopes and fears in the mix",
  "Final outcome": "Where this can land",
};

const ELEMENT_FRAMES: Record<string, string> = {
  Earth: "Grounding and stability — what is solid in your life right now",
  Water: "Emotions and intuition — what you feel beneath the surface",
  Fire: "Passion and action — where your energy wants to move",
  Wood: "Growth and flexibility — what is expanding or needs patience",
  Metal: "Clarity and boundaries — what to refine or release",
};

const EGYPT_FRAMES: Record<string, string> = {
  Ankh: "Life force and renewal — the breath of new possibility",
  Scarab: "Transformation and persistence — what you are becoming",
  Eye: "Truth and protection — what is seen and what is hidden",
  Pyramid: "Legacy and structure — the foundation you are building",
  Nile: "Flow and abundance — how life moves through your path",
};

const ORACLE_POSITION_PREFIX: Record<string, Partial<Record<string, string>>> = {
  oracle: { Message: "The message for you", Lesson: "The lesson to learn", Blessing: "The blessing available" },
  angel: { Protection: "Angelic protection around", Guidance: "Guidance pointing toward", Blessing: "A blessing unfolding through" },
  osho: { Awareness: "Bring awareness to", Transformation: "Transformation asks you to release", Celebration: "Celebrate the gift of" },
  "32-cards": { Past: "In the past", Present: "In the present", Hidden: "Hidden from view", Advice: "As advice", Outcome: "As outcome" },
};

function applyPositionFrame(
  position: string | undefined,
  frames: Record<string, string>,
  meaning: string
): string {
  if (!position || !frames[position]) return meaning;
  return `${frames[position]}: ${meaning}`;
}

function meaningForSpread(
  card: MajorArcanaCard,
  spreadId: string,
  position: string | undefined,
  lens: MeaningLens
): string {
  const core = cardMeaningForLens(card, lens);

  if (spreadId === "love" && position) {
    return applyPositionFrame(position, LOVE_FRAMES, core);
  }
  if (spreadId === "psychic" && position) {
    return applyPositionFrame(position, PSYCHIC_FRAMES, core);
  }
  if (spreadId === "celtic-cross" && position) {
    return applyPositionFrame(position, CELTIC_FRAMES, core);
  }
  if (spreadId === "free" && position) {
    return applyPositionFrame(position, FREE_FRAMES, core);
  }
  if (spreadId === "oracle" && position) {
    const prefix = ORACLE_POSITION_PREFIX.oracle[position];
    return prefix ? `${prefix}: ${core}` : core;
  }
  if (spreadId === "angel" && position) {
    const prefix = ORACLE_POSITION_PREFIX.angel[position];
    return `${prefix ?? "Guidance"}: ${card.love.split(".")[0]}. You are supported.`;
  }
  if (spreadId === "osho" && position) {
    const prefix = ORACLE_POSITION_PREFIX.osho[position];
    return `${prefix ?? "Notice"}: ${card.general} Stay present — the answer is in the moment.`;
  }
  if (spreadId === "chinese" && position && ELEMENT_FRAMES[position]) {
    return `${ELEMENT_FRAMES[position]}: ${core}`;
  }
  if (spreadId === "egyptian" && position && EGYPT_FRAMES[position]) {
    return `${EGYPT_FRAMES[position]}: ${core}`;
  }
  if (spreadId === "32-cards" && position) {
    const prefix = ORACLE_POSITION_PREFIX["32-cards"][position];
    return `${prefix ?? "Here"}, ${card.name} speaks: ${core}`;
  }
  if (spreadId === "daily") {
    return `Today's energy through ${card.name}: ${core}`;
  }

  return core;
}

function reversedTwist(card: MajorArcanaCard, upright: string, lens: MeaningLens): string {
  const block =
    lens === "love"
      ? `In love, ${card.name} reversed often means mixed signals, fear of vulnerability, or timing that is not ripe yet.`
      : lens === "career"
        ? `At work, ${card.name} reversed can mean delays, self-doubt, or a plan that needs revision before you push.`
        : `${card.name} reversed slows the energy of "${card.keyword}" — resistance or inner blocks need honesty first.`;
  return `${upright} ${block}`;
}

function yesNoAnswer(card: MajorArcanaCard, reversed: boolean, analysis: QuestionAnalysis): string {
  const lean = reversed
    ? card.yesNo === "yes" ? "Leaning no — energy is blocked or delayed."
      : card.yesNo === "no" ? "Leaning yes — what felt stuck may shift with patience."
        : "Not clear yet — wait before you act."
    : card.yesNo === "yes" ? `Yes — ${card.name} supports forward movement.`
      : card.yesNo === "no" ? `No for now — ${card.name} asks you to pause.`
        : `Maybe — timing matters with ${card.name}.`;

  const context =
    analysis.domain === "love"
      ? card.love.split(".")[0]
      : analysis.domain === "career"
        ? card.career.split(".")[0]
        : card.general.split(".")[0];

  return `${lean} ${context}.`;
}

function synthesizeThemes(cards: DrawnCard[], analysis: QuestionAnalysis): string {
  const keywords = [...new Set(cards.map((c) => c.card.keyword))];
  const reversedCount = cards.filter((c) => c.reversed).length;
  const names = cards.slice(0, 3).map((c) => c.card.name);

  let theme = "";
  if (keywords.includes("transformation") || keywords.includes("change")) {
    theme = "A real shift is underway — something old is making room for something truer.";
  } else if (keywords.includes("hope") || keywords.includes("joy")) {
    theme = "The overall tone is hopeful — stay open without forcing an outcome.";
  } else if (keywords.includes("uncertainty") || keywords.includes("pause")) {
    theme = "Patience is part of the answer — not everything is visible yet.";
  } else if (reversedCount >= Math.ceil(cards.length / 2)) {
    theme = "Several reversed cards say inner blocks matter as much as outside events — look at what you are resisting.";
  } else {
    theme = `The thread running through ${names.join(", ")} points to "${keywords[0]}" — let that guide how you read this.`;
  }

  if (analysis.isYesNo) {
    theme += " Read the outcome card as your clearest lean — not fate, but a mirror.";
  } else if (analysis.questionType === "when") {
    theme += " Timing here is about phases, not exact dates — watch for the next visible shift.";
  }

  return theme;
}

function questionLead(question: string, analysis: QuestionAnalysis): string {
  if (!question.trim()) return "Here is what the cards reveal for you.";
  const domainNote: Record<string, string> = {
    love: "on your heart question",
    marriage: "on commitment and marriage",
    career: "on work and money",
    health: "on wellbeing and stress",
    timing: "on timing",
    self: "on how you are feeling about yourself",
    general: "on your question",
  };
  return `You asked ${domainNote[analysis.domain]} — "${question.trim()}". IRA reads the cards with that in mind.`;
}

function buildSummary(
  spread: TarotSpread,
  question: string,
  cards: DrawnCard[],
  analysis: QuestionAnalysis
): string {
  const lead = questionLead(question, analysis);
  const synthesis = synthesizeThemes(cards, analysis);
  const anchors = cards.slice(0, 3).map((c) => c.card.name).join(", ");

  const closing =
    spread.id === "daily"
      ? "Carry this energy through your day with awareness."
      : spread.id === "yes-no"
        ? "Trust your intuition alongside this reading — you already sense the truth."
        : spread.id === "osho"
          ? "Sit with this quietly. The answer often appears in stillness."
          : spread.id === "angel"
            ? "Receive this with an open heart — you are supported."
            : "This is a mirror, not fixed fate. Use it for clarity and calm.";

  let middle: string;

  switch (spread.id) {
    case "love":
      middle = `Connection energy centres on ${cards[2]?.card.name ?? cards[0].card.name}. ${synthesis} ${IRA_INTRO}`;
      break;
    case "celtic-cross":
      middle = `${cards[0]?.card.name} sits at the heart, crossed by ${cards[1]?.card.name}. Outcome: ${cards[9]?.card.name ?? cards.at(-1)?.card.name}. ${synthesis} ${IRA_INTRO}`;
      break;
    case "yes-no":
      middle = `${cards[0]?.card.name} answers your yes/no question directly. ${synthesis} ${IRA_INTRO}`;
      break;
    case "psychic":
      middle = `Hidden influence: ${cards[1]?.card.name}. Guidance: ${cards[3]?.card.name}. ${synthesis} ${IRA_INTRO}`;
      break;
    default:
      middle = `Key cards: ${anchors}. ${synthesis} ${IRA_INTRO}`;
  }

  return `${lead} ${middle} ${closing}`;
}

export function buildReading(
  spread: TarotSpread,
  question: string,
  picks: { card: MajorArcanaCard; reversed: boolean }[]
): TarotReadingResult {
  const analysis = analyzeQuestion(question);
  const lens = lensForReading(question, spread.id);

  const cards: DrawnCard[] = picks.map((p, i) => ({
    card: p.card,
    reversed: p.reversed,
    position: spread.positions[i] ?? `Card ${i + 1}`,
  }));

  const positionReadings = cards.map(({ card, reversed, position }) => {
    let text: string;
    if (spread.id === "yes-no") {
      text = yesNoAnswer(card, reversed, analysis);
    } else {
      const upright = meaningForSpread(card, spread.id, position, lens);
      text = reversed ? reversedTwist(card, upright, lens) : upright;
    }
    return { position, text };
  });

  const summary = buildSummary(spread, question, cards, analysis);

  return { spread, question, cards, summary, positionReadings };
}
