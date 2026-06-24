import { BIRTH_PROMPTS_PLAIN } from "./birth-examples";
import { ZODIAC_TRAITS } from "@/lib/astrology/zodiac-traits";
import type { Conversation } from "@/types";
import type { ChatMessage, ConversationContext } from "./conversation-context";
import { buildConversationContext, nextBirthFieldToAsk } from "./conversation-context";
import { interpretMessage } from "./message-interpreter";
import { decideChatAction, type ChatAction } from "./chat-decision";
import { buildAstrologyTurn } from "./astrology-turn";

export function isOpenAIConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return false;
  if (key.includes("your_openai") || key.includes("sk-your")) return false;
  if (key.length < 20) return false;
  return true;
}

function firstName(ctx: ConversationContext): string {
  return ctx.knownName?.split(" ")[0] ?? "there";
}

function withBirthAck(interp: ReturnType<typeof interpretMessage>, body: string): string {
  if (!interp.birthAck) return body;
  return `${interp.birthAck} ${body}`;
}

function hopeLine(sign: string | null): string {
  const hopes: Record<string, string> = {
    Aries: "Your fire always comes back — this chapter isn't your ending.",
    Taurus: "Steady Taurus energy wins in the long run. Better ground is ahead.",
    Gemini: "Your mind adapts fast — clarity and fresh options are on the way.",
    Cancer: "Your heart heals. The right people and warmth are still coming.",
    Leo: "Your light doesn't dim for long — recognition and love return.",
    Virgo: "You're sharper than you feel right now. Small steps lead to big relief.",
    Libra: "Balance returns — harmony in love and life is still very much possible.",
    Scorpio: "You transform pain into power. This depth becomes your strength.",
    Sagittarius: "A wider path opens soon. Hope and adventure aren't gone.",
    Capricorn: "You've survived harder seasons. Success and respect are still building.",
    Aquarius: "You're meant for something bigger than this low moment.",
    Pisces: "Your intuition is right — softer, happier days are approaching.",
  };
  return sign ? hopes[sign] ?? "There's real light ahead for you." : "There's real light ahead for you.";
}

function signLine(sign: string, topic: ReturnType<typeof buildAstrologyTurn>["topic"]): string {
  const t = ZODIAC_TRAITS[sign];
  if (!t) return "";
  if (topic === "love") return `${sign} in love: ${t.relationship.split(".")[0]}.`;
  if (topic === "career") return `${sign} at work: ${t.career.split(".")[0]}.`;
  return `${sign}: ${t.strengths[0]}.`;
}

const BIRTH_PROMPTS = BIRTH_PROMPTS_PLAIN;

function respondByAction(
  action: ChatAction,
  ctx: ConversationContext,
  interp: ReturnType<typeof interpretMessage>,
  decision: ReturnType<typeof decideChatAction>
): string {
  const name = firstName(ctx);
  const { planet, topic, teaser } = buildAstrologyTurn(ctx, ctx.lastUserMessage);
  const signBit = ctx.knownSign ? signLine(ctx.knownSign, topic) : planet;
  const askBirth = decision.askBirthField ? BIRTH_PROMPTS[decision.askBirthField] : null;

  switch (action) {
    case "greet":
      return `Hi ${name}! Glad you're here. What's on your mind — love, career, marriage, or money?`;

    case "acknowledge_birth": {
      const display = interp.entities.displayDate;
      const sign = interp.entities.sign ?? ctx.knownSign;
      const time = interp.entities.birthTime ?? ctx.knownBirthTime;
      const place = interp.entities.location ?? ctx.knownLocation;

      let ack = interp.birthAck;
      if (!ack && display) {
        const bits = [display];
        if (time) bits.push(`at ${time}`);
        if (place) bits.push(place);
        ack = sign
          ? `Got it — ${bits.join(", ")}. You're a ${sign} Sun.`
          : `Got it — ${bits.join(", ")}.`;
      }
      if (!ack) ack = "Got it — I've saved that.";

      const hope = sign ? hopeLine(sign) : "Once I have your chart, I can read this much more clearly for you.";
      if (askBirth) {
        return `${ack} ${hope} ${askBirth}`;
      }
      return `${ack} ${hope} What should I read for you — love, career, or timing?`;
    }

    case "collect_birth_field":
      return askBirth ?? BIRTH_PROMPTS[nextBirthFieldToAsk(ctx) ?? "birth date"] ?? "What's your birth date?";

    case "respond_love":
      return withBirthAck(interp, `I hear you, ${name}. ${signBit} This isn't punishment from the stars — it's a phase, and it can shift. ${hopeLine(interp.entities.sign ?? ctx.knownSign)} ${askBirth ?? teaser}`);

    case "respond_career":
      return withBirthAck(interp, `${name}, career stress makes sense — you're not failing. ${signBit} Stay steady; clarity often comes in 2–3 months. ${hopeLine(interp.entities.sign ?? ctx.knownSign)} ${askBirth ?? teaser}`);

    case "respond_emotion":
      return withBirthAck(interp, `${name}, thanks for saying that — you're not weak for feeling this. ${planet} Better days are ahead, and you deserve them. ${askBirth ?? teaser}`);

    case "respond_marriage":
      return withBirthAck(interp, `${name}, marriage questions run deep, and yours matter. ${signBit} Honesty and patience win here. ${hopeLine(interp.entities.sign ?? ctx.knownSign)} ${askBirth ?? teaser}`);

    case "respond_health":
      return withBirthAck(interp, `${name}, I hear your health worry. I'm not a doctor — but ${planet} Rest and calm matter now, and support helps. ${askBirth ?? "Your birth date helps me read your chart deeper."}`);

    case "clarify": {
      const snippet = ctx.lastUserMessage.length > 60
        ? `${ctx.lastUserMessage.slice(0, 60)}…`
        : ctx.lastUserMessage;
      return withBirthAck(interp, `Got it — "${snippet}" Is this mainly about love, career, or something else?`);
    }

    case "general":
    default:
      if (interp.userAskedQuestion) {
        return withBirthAck(interp, `${name}, good question. ${signBit} ${hopeLine(interp.entities.sign ?? ctx.knownSign)} ${askBirth ?? teaser}`);
      }
      return withBirthAck(interp, `${name}, I'm with you. ${signBit} ${hopeLine(interp.entities.sign ?? ctx.knownSign)} ${askBirth ?? teaser}`);
  }
}

export function generateFallbackResponse(
  messages: ChatMessage[],
  phase: Conversation["phase"],
  _messageCount: number,
  hasBirthDetails = false
): string {
  const ctx = buildConversationContext(messages);
  const interp = interpretMessage(ctx, messages);
  const decision = decideChatAction(ctx, interp, hasBirthDetails);

  if (!ctx.lastUserMessage.trim()) {
    return "I'm here. Love, career, money — what's on your mind?";
  }

  return respondByAction(decision.action, ctx, interp, decision);
}

export function resolvePhase(
  ctx: ConversationContext,
  hasBirthDetails: boolean
): Conversation["phase"] {
  const interp = interpretMessage(ctx, ctx.userMessages.map((c) => ({ role: "user", content: c })));
  return decideChatAction(ctx, interp, hasBirthDetails).phase;
}

export function streamFallbackText(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      const chunkSize = 28;
      let i = 0;
      const push = () => {
        if (i >= text.length) {
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode(text.slice(i, i + chunkSize)));
        i += chunkSize;
        setTimeout(push, 8);
      };
      push();
    },
  });
}

export function extractFallbackInsights(userMessage: string) {
  const ctx = buildConversationContext([{ role: "user", content: userMessage }]);
  const interp = interpretMessage(ctx, [{ role: "user", content: userMessage }]);
  const insights: { category: string; value: string; confidence: number }[] = [];

  if (interp.sentiment === "negative") {
    insights.push({ category: "emotions", value: "Low mood or stress", confidence: 0.85 });
  }
  if (interp.intent === "career_question") {
    insights.push({ category: "career", value: "Career or money focus", confidence: 0.8 });
  }
  if (interp.intent === "love_question" || interp.intent === "marriage_question") {
    insights.push({ category: "relationships", value: "Love or relationship focus", confidence: 0.8 });
  }
  if (ctx.knownBirthDate) {
    insights.push({ category: "birth_date", value: ctx.knownBirthDate, confidence: 0.95 });
  }
  if (ctx.knownSign) {
    insights.push({ category: "zodiac_sign", value: ctx.knownSign, confidence: 0.9 });
  }

  return {
    insights,
    sentiment: interp.sentiment,
    topicsDiscussed: interp.topics.length ? interp.topics : [interp.primaryTopic],
  };
}
