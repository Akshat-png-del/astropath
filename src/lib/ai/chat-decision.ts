import type { Conversation } from "@/types";
import type { ConversationContext } from "./conversation-context";
import { nextBirthFieldToAsk } from "./conversation-context";
import type { MessageInterpretation, UserIntent } from "./message-interpreter";

export type ChatAction =
  | "respond_love"
  | "respond_career"
  | "respond_emotion"
  | "respond_marriage"
  | "respond_health"
  | "respond_family"
  | "respond_finance"
  | "respond_spirituality"
  | "respond_self_discovery"
  | "acknowledge_birth"
  | "collect_birth_field"
  | "clarify"
  | "greet"
  | "general";

export interface ChatDecision {
  action: ChatAction;
  phase: Conversation["phase"];
  focus: string;
  askBirthField: string | null;
}

const INTENT_TO_ACTION: Record<UserIntent, ChatAction> = {
  greeting: "greet",
  sharing_birth_details: "acknowledge_birth",
  love_question: "respond_love",
  career_question: "respond_career",
  family_question: "respond_family",
  finance_question: "respond_finance",
  spirituality_question: "respond_spirituality",
  self_discovery_question: "respond_self_discovery",
  astrology_question: "collect_birth_field",
  emotional_support: "respond_emotion",
  marriage_question: "respond_marriage",
  health_question: "respond_health",
  general_question: "general",
  follow_up: "general",
  unclear: "clarify",
};

export function decideChatAction(
  ctx: ConversationContext,
  interp: MessageInterpretation,
  hasBirthDetails: boolean
): ChatDecision {
  const nextBirth = nextBirthFieldToAsk(ctx);

  if (hasBirthDetails) {
    return {
      action: INTENT_TO_ACTION[interp.intent] === "clarify" ? "general" : INTENT_TO_ACTION[interp.intent],
      phase: "follow_up",
      focus: `Use conversation memory. Answer "${interp.resolvedQuestion}" about ${interp.memory.situationSummary} — 4-part structure, no standalone sign traits.`,
      askBirthField: null,
    };
  }

  if (interp.intent === "sharing_birth_details") {
    const signNote = interp.entities.sign ? ` Confirm Sun sign ${interp.entities.sign}.` : "";
    if (nextBirth) {
      return {
        action: "acknowledge_birth",
        phase: "birth_details",
        focus: `Briefly confirm what they shared.${signNote} Ask only for ${nextBirth}.`,
        askBirthField: nextBirth,
      };
    }
    return {
      action: "acknowledge_birth",
      phase: "exploration",
      focus: `${signNote} Confirm birth details, then answer whatever they were asking about.`,
      askBirthField: null,
    };
  }

  if (interp.intent === "greeting") {
    return {
      action: "greet",
      phase: "rapport",
      focus: "Short welcome. Invite them to ask their question.",
      askBirthField: null,
    };
  }

  if (interp.intent === "astrology_question" && !ctx.knownBirthDate) {
    return {
      action: "collect_birth_field",
      phase: "birth_details",
      focus: "Ask for birth date with an example — keep it one line.",
      askBirthField: "birth date",
    };
  }

  const action = INTENT_TO_ACTION[interp.intent];

  const shouldCollectBirth =
    !ctx.knownBirthDate &&
    ctx.messageCount >= 2 &&
    ["respond_love", "respond_career", "respond_emotion", "respond_marriage", "respond_family", "respond_finance", "general"].includes(action);

  if (shouldCollectBirth && action !== "clarify") {
    const birthNote = interp.birthAck ? `${interp.birthAck} ` : "";
    return {
      action,
      phase: "birth_details",
      focus: `${birthNote}Answer their ${interp.primaryTopic} question directly first, then ask for birth date in one short line.`,
      askBirthField: "birth date",
    };
  }

  if (interp.birthAck && !["acknowledge_birth", "greet", "collect_birth_field"].includes(action)) {
    const focusMap: Partial<Record<ChatAction, string>> = {
      respond_love: `${interp.birthAck} Answer directly: ${interp.coreConcern} ${interp.answerAngle}`,
      respond_career: `${interp.birthAck} Answer directly: ${interp.coreConcern} ${interp.answerAngle}`,
      respond_emotion: `${interp.birthAck} Answer with warmth and a clear takeaway: ${interp.coreConcern}`,
      respond_marriage: `${interp.birthAck} Answer directly: ${interp.coreConcern} ${interp.answerAngle}`,
      respond_health: `${interp.birthAck} Support them — not medical advice: ${interp.coreConcern}`,
      respond_family: `${interp.birthAck} Answer directly: ${interp.coreConcern}`,
      respond_finance: `${interp.birthAck} Answer directly: ${interp.coreConcern} ${interp.answerAngle}`,
      respond_spirituality: `${interp.birthAck} Answer directly: ${interp.coreConcern}`,
      respond_self_discovery: `${interp.birthAck} Answer directly: ${interp.coreConcern}`,
      clarify: `Answer or clarify based on: ${interp.userMeaning}`,
      general: `${interp.birthAck} Answer directly: ${interp.coreConcern} ${interp.answerAngle}`,
    };
    return {
      action,
      phase: ctx.knownBirthDate && !ctx.knownBirthTime ? "birth_details" : ctx.messageCount >= 2 ? "exploration" : "rapport",
      focus: focusMap[action] ?? `${interp.birthAck} Answer their question directly.`,
      askBirthField:
        ctx.messageCount >= 2 && ctx.knownBirthDate
          ? nextBirth === "birth date"
            ? null
            : nextBirth
          : null,
    };
  }

  if (interp.intent === "unclear" && ctx.messageCount === 1) {
    return {
      action: "clarify",
      phase: "rapport",
      focus: "They weren't clear — ask one short question: love, career, or something else?",
      askBirthField: null,
    };
  }

  const focusMap: Partial<Record<ChatAction, string>> = {
    respond_love: interp.isFollowUp
      ? `FOLLOW-UP on ${interp.chatIntent}: ${interp.resolvedQuestion}. Situation: ${interp.memory.situationSummary}`
      : `Answer: ${interp.coreConcern}. ${interp.answerAngle}`,
    respond_career: interp.isFollowUp
      ? `FOLLOW-UP career: ${interp.resolvedQuestion}. Context: ${interp.memory.situationSummary}`
      : `Answer: ${interp.coreConcern}. ${interp.answerAngle}`,
    respond_emotion: `Acknowledge feelings about: ${interp.memory.situationSummary}. Then astrological insight + guidance.`,
    respond_marriage: `Answer: ${interp.coreConcern}. ${interp.answerAngle}`,
    respond_health: `Support — not medical advice: ${interp.coreConcern}`,
    respond_family: `Answer: ${interp.coreConcern}`,
    respond_finance: `Answer: ${interp.coreConcern}. ${interp.answerAngle}`,
    respond_spirituality: `Answer: ${interp.coreConcern}`,
    respond_self_discovery: `Answer: ${interp.coreConcern}`,
    acknowledge_birth: "Confirm birth details briefly, then full reading on their situation.",
    collect_birth_field: "Ask one birth field only.",
    clarify: `They said: ${interp.userMeaning}. One short clarifying question only if truly needed.`,
    greet: "Short welcome.",
    general: interp.isFollowUp
      ? `FOLLOW-UP: ${interp.resolvedQuestion}. Memory: ${interp.memory.situationSummary}`
      : `Answer: ${interp.coreConcern}. ${interp.answerAngle}`,
  };

  return {
    action,
    phase: ctx.messageCount >= 2 ? "exploration" : "rapport",
    focus: focusMap[action] ?? `Answer directly: ${interp.coreConcern}`,
    askBirthField: null,
  };
}
