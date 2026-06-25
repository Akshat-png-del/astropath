import { BIRTH_PROMPTS_PLAIN } from "./birth-examples";
import type { Conversation } from "@/types";
import type { ChatMessage, ConversationContext, BirthDetailsPayload } from "./conversation-context";
import { buildConversationContext, applyBirthDetailsToContext, nextBirthFieldToAsk } from "./conversation-context";
import { interpretMessage } from "./message-interpreter";
import { decideChatAction, type ChatAction } from "./chat-decision";
import { buildStructuredFallbackResponse } from "./response-structure";
import { buildRetrievalFallbackResponse } from "./retrieval-fallback";
import type { RetrievalContext } from "./retrieval-context";
import { chatLog } from "./chat-debug";

export function isOpenAIConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) return false;
  if (/your[_-]?openai|sk-your|placeholder|xxx/i.test(key)) return false;
  if (key.length < 20) return false;
  return true;
}

function firstName(ctx: ConversationContext): string {
  return ctx.knownName?.split(" ")[0] ?? "there";
}

const BIRTH_PROMPTS = BIRTH_PROMPTS_PLAIN;

function isBreakupOrLove(interp: ReturnType<typeof interpretMessage>): boolean {
  return (
    interp.chatIntent === "breakup" ||
    interp.chatIntent === "relationship" ||
    interp.emotionalSituation === "breakup"
  );
}

function respondByAction(
  action: ChatAction,
  ctx: ConversationContext,
  interp: ReturnType<typeof interpretMessage>,
  decision: ReturnType<typeof decideChatAction>
): string {
  const name = firstName(ctx);
  const askBirth = decision.askBirthField ? BIRTH_PROMPTS[decision.askBirthField] : null;

  chatLog("fallback_action", {
    action,
    turn: interp.memory.turnNumber,
    chatIntent: interp.chatIntent,
    lastUser: ctx.lastUserMessage.slice(0, 80),
  });

  switch (action) {
    case "greet":
      return `Hi ${name}! What would you like to explore — love, career, timing, or something else?`;

    case "acknowledge_birth": {
      if (isBreakupOrLove(interp)) {
        const reading = buildStructuredFallbackResponse(ctx, interp.memory, interp);
        if (askBirth) return `${reading} ${askBirth}`;
        return reading;
      }

      const display = interp.entities.displayDate;
      const sign = interp.entities.sign ?? ctx.knownSign;
      let ack = interp.birthAck;
      if (!ack && display) {
        ack = sign ? `Got it — ${display}, ${sign} chart noted.` : `Got it — ${display}.`;
      }
      if (!ack) ack = "Saved.";
      if (askBirth) return `${ack} ${askBirth}`;
      return `${ack} What would you like me to read?`;
    }

    case "collect_birth_field":
      return askBirth ?? BIRTH_PROMPTS[nextBirthFieldToAsk(ctx) ?? "birth date"] ?? "What's your birth date?";

    case "clarify":
      return "Tell me a bit more — is this about love, career, or something else?";

    case "respond_love":
    case "respond_emotion":
    case "respond_marriage":
      return buildStructuredFallbackResponse(ctx, interp.memory, interp);

    case "respond_career":
    case "respond_health":
    case "respond_family":
    case "respond_finance":
    case "respond_spirituality":
    case "respond_self_discovery":
    case "general":
    default: {
      const text = buildStructuredFallbackResponse(ctx, interp.memory, interp);
      return askBirth && interp.memory.turnNumber === 1 ? `${text} ${askBirth}` : text;
    }
  }
}

export function generateFallbackResponse(
  messages: ChatMessage[],
  phase: Conversation["phase"],
  _messageCount: number,
  hasBirthDetails = false,
  birthDetails?: BirthDetailsPayload | null,
  retrieval?: RetrievalContext
): string {
  const baseCtx = buildConversationContext(messages);
  const ctx = applyBirthDetailsToContext(baseCtx, birthDetails);

  if (retrieval?.need.needsRetrieval) {
    const retrievalAnswer = buildRetrievalFallbackResponse(ctx, retrieval);
    if (retrievalAnswer) {
      chatLog("fallback_retrieval", { categories: retrieval.need.categories });
      return retrievalAnswer;
    }
  }

  const interp = interpretMessage(ctx, messages);
  const decision = decideChatAction(ctx, interp, hasBirthDetails || !!ctx.knownBirthDate);

  if (!ctx.lastUserMessage.trim()) {
    return "What's on your mind?";
  }

  const response = respondByAction(decision.action, ctx, interp, decision);
  chatLog("fallback_response", {
    turn: ctx.messageCount,
    responsePreview: response.slice(0, 120),
    responseLength: response.length,
  });
  return response;
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

  insights.push({ category: "intent", value: interp.chatIntent, confidence: 0.9 });
  if (interp.emotionalSituation !== "none") {
    insights.push({ category: "emotions", value: interp.emotionalSituation, confidence: 0.85 });
  }
  if (interp.chatIntent === "breakup") {
    insights.push({ category: "breakup", value: interp.memory.situationSummary, confidence: 0.9 });
  }
  if (interp.sentiment === "negative") {
    insights.push({ category: "emotions", value: "Distressed or low mood", confidence: 0.85 });
  }
  if (interp.chatIntent === "career") {
    insights.push({ category: "career", value: "Career or work focus", confidence: 0.8 });
  }
  if (interp.chatIntent === "relationship" || interp.chatIntent === "breakup") {
    insights.push({
      category: "relationships",
      value: interp.memory.relationshipContext ?? "Love focus",
      confidence: 0.85,
    });
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
