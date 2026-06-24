import { getPlanetHook, getCuriosityTeaser } from "@/lib/astrology/astrology-reading";
import { detectReadingTopic, type ReadingTopic } from "./message-topics";
import type { ConversationContext } from "./conversation-context";

export interface AstrologyTurn {
  topic: ReadingTopic;
  planet: string;
  teaser: string;
}

export function buildAstrologyTurn(ctx: ConversationContext, message?: string): AstrologyTurn {
  const msg = message ?? ctx.lastUserMessage;
  const topic = detectReadingTopic(msg);
  return {
    topic,
    planet: getPlanetHook(ctx.knownSign, topic),
    teaser: getCuriosityTeaser(ctx.knownSign, topic, !!ctx.knownBirthTime, ctx.messageCount),
  };
}
