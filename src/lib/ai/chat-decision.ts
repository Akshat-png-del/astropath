import type { Conversation } from "@/types";
import type { ConversationContext } from "./conversation-context";
import { missingBirthFields, nextBirthFieldToAsk } from "./conversation-context";
import type { MessageInterpretation, UserIntent } from "./message-interpreter";

export type ChatAction =
  | "respond_love"
  | "respond_career"
  | "respond_emotion"
  | "respond_marriage"
  | "respond_health"
  | "acknowledge_birth"
  | "collect_birth_field"
  | "clarify"
  | "greet"
  | "general";

export interface ChatDecision {
  action: ChatAction;
  phase: Conversation["phase"];
  /** Short instruction for response generation */
  focus: string;
  askBirthField: string | null;
}

const INTENT_TO_ACTION: Record<UserIntent, ChatAction> = {
  greeting: "greet",
  sharing_birth_details: "acknowledge_birth",
  love_question: "respond_love",
  career_question: "respond_career",
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
  const missing = missingBirthFields(ctx);
  const nextBirth = nextBirthFieldToAsk(ctx);

  if (hasBirthDetails) {
    return {
      action: INTENT_TO_ACTION[interp.intent] === "clarify" ? "general" : INTENT_TO_ACTION[interp.intent],
      phase: "follow_up",
      focus: "Answer their question from chart knowledge. Short and direct.",
      askBirthField: null,
    };
  }

  if (interp.intent === "sharing_birth_details") {
    const signNote = interp.entities.sign ? ` Confirm Sun sign ${interp.entities.sign}.` : "";
    if (nextBirth) {
      return {
        action: "acknowledge_birth",
        phase: "birth_details",
        focus: `Thank them for what they shared.${signNote} Ask only for ${nextBirth}.`,
        askBirthField: nextBirth,
      };
    }
    return {
      action: "acknowledge_birth",
      phase: "exploration",
      focus: `${signNote} Birth basics captured — ask what they want read (love, career, timing).`,
      askBirthField: null,
    };
  }

  if (interp.intent === "greeting") {
    return {
      action: "greet",
      phase: "rapport",
      focus: "Warm hello. Ask what's on their mind — love, career, marriage, or money.",
      askBirthField: null,
    };
  }

  const action = INTENT_TO_ACTION[interp.intent];

  // After 2+ messages on a topic, gently collect birth date if missing
  const shouldCollectBirth =
    !ctx.knownBirthDate &&
    ctx.messageCount >= 2 &&
    ["respond_love", "respond_career", "respond_emotion", "respond_marriage", "general"].includes(action);

  if (shouldCollectBirth && action !== "clarify") {
    const birthNote = interp.birthAck ? `${interp.birthAck} ` : "";
    return {
      action,
      phase: "birth_details",
      focus: `${birthNote}Address their ${interp.primaryTopic} concern first in 1-2 sentences with warmth and hope, then ask for birth date only.`,
      askBirthField: "birth date",
    };
  }

  if (interp.birthAck && !["acknowledge_birth", "greet", "collect_birth_field"].includes(action)) {
    const focusMap: Record<ChatAction, string> = {
      respond_love: `${interp.birthAck} Then love/relationship reading — warm, hopeful, one chart insight.`,
      respond_career: `${interp.birthAck} Then career/money reading — reassuring with timing note.`,
      respond_emotion: `${interp.birthAck} Then validate feelings — Moon/Saturn insight, leave them hopeful.`,
      respond_marriage: `${interp.birthAck} Then marriage focus — Venus tone, honest and uplifting.`,
      respond_health: `${interp.birthAck} Then general wellness support — not medical advice.`,
      acknowledge_birth: "Confirm what was received.",
      collect_birth_field: "Ask one birth field only.",
      clarify: `${interp.birthAck} Then reflect their message. One clarifying question.`,
      greet: "Short welcome.",
      general: `${interp.birthAck} Then direct astrology answer with a hopeful close.`,
    };
    return {
      action,
      phase: ctx.knownBirthDate && !ctx.knownBirthTime ? "birth_details" : ctx.messageCount >= 2 ? "exploration" : "rapport",
      focus: focusMap[action],
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
      focus: "Mirror their words briefly. Ask if it's about love, career, or something else.",
      askBirthField: null,
    };
  }

  const focusMap: Record<ChatAction, string> = {
    respond_love: "Love/relationship reading. Be warm. One chart insight + one practical line.",
    respond_career: "Career/money reading. Be reassuring. One chart insight + timing note.",
    respond_emotion: "Validate feelings first. Moon/Saturn style insight. No toxic positivity.",
    respond_marriage: "Marriage/commitment focus. Venus + 7th house style plain language.",
    respond_health: "General wellness support — not medical advice. Moon/6th house tone.",
    acknowledge_birth: "Confirm what was received.",
    collect_birth_field: "Ask one birth field only.",
    clarify: "Reflect their message. One clarifying question.",
    greet: "Short welcome.",
    general: "Direct astrology answer to what they asked.",
  };

  return {
    action,
    phase: ctx.messageCount >= 2 ? "exploration" : "rapport",
    focus: focusMap[action],
    askBirthField: null,
  };
}
