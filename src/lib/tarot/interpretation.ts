import type { DrawnCard, TarotReadingResult, TarotSpread } from "./types";
import type { MajorArcanaCard } from "./types";

const IRA_INTRO = "I'm IRA, your guide through the Major Arcana — inspired by the Rider-Waite tradition and Edmond's manuscripts.";

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
  oracle: {
    Message: "The message for you",
    Lesson: "The lesson to learn",
    Blessing: "The blessing available",
  },
  angel: {
    Protection: "Angelic protection around",
    Guidance: "Guidance pointing toward",
    Blessing: "A blessing unfolding through",
  },
  osho: {
    Awareness: "Bring awareness to",
    Transformation: "Transformation asks you to release",
    Celebration: "Celebrate the gift of",
  },
  "32-cards": {
    Past: "In the past",
    Present: "In the present",
    Hidden: "Hidden from view",
    Advice: "As advice",
    Outcome: "As outcome",
  },
};

function meaningForSpread(card: MajorArcanaCard, spreadId: string, position?: string): string {
  const base =
    spreadId === "love" ? card.love
    : spreadId === "psychic" || spreadId === "free" || spreadId === "celtic-cross"
      ? `${card.general} In relationships: ${card.love.split(".")[0]}.`
      : card.general;

  if (spreadId === "oracle" && position) {
    const prefix = ORACLE_POSITION_PREFIX.oracle[position];
    return prefix ? `${prefix}: ${card.general}` : card.general;
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
    return `${ELEMENT_FRAMES[position]}: ${card.general}`;
  }
  if (spreadId === "egyptian" && position && EGYPT_FRAMES[position]) {
    return `${EGYPT_FRAMES[position]}: ${card.general}`;
  }
  if (spreadId === "32-cards" && position) {
    const prefix = ORACLE_POSITION_PREFIX["32-cards"][position];
    return `${prefix ?? "Here"}, ${card.name} speaks: ${card.general}`;
  }

  return base;
}

function reversedTwist(card: MajorArcanaCard, upright: string): string {
  return `${upright} Reversed, ${card.name} suggests blocked energy around "${card.keyword}" — look at what's resisting change.`;
}

function yesNoAnswer(card: MajorArcanaCard, reversed: boolean): string {
  if (reversed) {
    if (card.yesNo === "yes") return "Leaning no — energy is blocked or delayed. Wait before acting.";
    if (card.yesNo === "no") return "Leaning yes — what seemed blocked may clear with patience.";
    return "Unclear for now — the answer isn't ready. Ask again in a few days.";
  }
  if (card.yesNo === "yes") return `Yes — ${card.name} supports forward movement. ${card.general}`;
  if (card.yesNo === "no") return `No for now — ${card.name} asks you to pause. ${card.general}`;
  return `Maybe — ${card.name} says timing matters. ${card.general}`;
}

export function buildReading(
  spread: TarotSpread,
  question: string,
  picks: { card: MajorArcanaCard; reversed: boolean }[]
): TarotReadingResult {
  const cards: DrawnCard[] = picks.map((p, i) => ({
    card: p.card,
    reversed: p.reversed,
    position: spread.positions[i] ?? `Card ${i + 1}`,
  }));

  const positionReadings = cards.map(({ card, reversed, position }) => {
    let text: string;
    if (spread.id === "yes-no") {
      text = yesNoAnswer(card, reversed);
    } else {
      const upright = meaningForSpread(card, spread.id, position);
      text = reversed ? reversedTwist(card, upright) : upright;
    }
    return { position, text };
  });

  const summary = buildSummary(spread, question, cards);

  return { spread, question, cards, summary, positionReadings };
}

function buildSummary(
  spread: TarotSpread,
  question: string,
  cards: DrawnCard[]
): string {
  const lead = question.trim()
    ? `About your question — "${question}" — here is what the cards reveal.`
    : "Here is what the cards reveal for you.";

  const anchors = cards.slice(0, 3).map((c) => c.card.name).join(", ");
  const closing =
    spread.id === "daily"
      ? "Carry this energy through your day with awareness."
      : spread.id === "yes-no"
        ? "Trust your intuition alongside this reading — you already sense the truth."
        : spread.id === "osho"
          ? "Sit with this reading quietly. Zen wisdom unfolds in stillness, not rush."
          : spread.id === "angel"
            ? "You are not alone on this path. Receive this guidance with an open heart."
            : "This reading is a mirror, not a fixed fate. Use it to face your path with more clarity and calm.";

  let middle: string;

  switch (spread.id) {
    case "love":
      middle = `The heart of this draw is ${cards[2]?.card.name ?? cards[0].card.name} — your connection energy. ${IRA_INTRO}`;
      break;
    case "celtic-cross":
      middle = `At the centre sits ${cards[0]?.card.name}, crossed by ${cards[1]?.card.name}. ${IRA_INTRO}`;
      break;
    case "oracle":
      middle = `Your oracle message flows through ${cards[0]?.card.name}, ${cards[1]?.card.name}, and ${cards[2]?.card.name}. ${IRA_INTRO}`;
      break;
    case "angel":
      middle = `Angelic energy highlights ${anchors}. Protection, guidance, and blessing weave through this draw. ${IRA_INTRO}`;
      break;
    case "osho":
      middle = `The Zen path here moves from ${cards[0]?.card.name} (awareness) to ${cards[2]?.card.name} (celebration). ${IRA_INTRO}`;
      break;
    case "chinese":
      middle = `The five elements speak through ${anchors} — balance Eastern wisdom with honest self-reflection. ${IRA_INTRO}`;
      break;
    case "egyptian":
      middle = `Sacred symbols reveal ${anchors} — ancient wisdom mirrors your present crossroads. ${IRA_INTRO}`;
      break;
    case "32-cards":
      middle = `This five-card line reads past to outcome: ${anchors}. ${IRA_INTRO}`;
      break;
    default:
      middle = `Key cards: ${anchors}. ${IRA_INTRO}`;
  }

  return `${lead} ${middle} ${closing}`;
}
