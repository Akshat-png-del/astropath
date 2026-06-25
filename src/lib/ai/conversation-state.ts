import type { ConversationContext } from "./conversation-context";
import {
  classifyMessageIntent,
  detectExplicitTopicShift,
  detectEmotionalSituation,
  emotionalContextLabel,
  INTENT_SWITCH_THRESHOLD,
  isVagueFollowUp,
  type ChatIntent,
  type IntentClassification,
} from "./intent-classifier";
import { chatLog } from "./chat-debug";

export interface ConversationState {
  activeTopic: ChatIntent;
  emotionalContext: string;
  lastUpdated: number;
}

export interface ResolvedConversationState {
  state: ConversationState;
  currentClassification: IntentClassification;
  previousTopic: ChatIntent;
  topicSwitched: boolean;
  activeSegmentMessages: string[];
}

function initialState(): ConversationState {
  return {
    activeTopic: "general",
    emotionalContext: "none",
    lastUpdated: 0,
  };
}

function shouldSwitchTopic(
  currentActive: ChatIntent,
  classification: IntentClassification,
  message: string,
  explicitShift: boolean
): boolean {
  if (explicitShift) return classification.intent !== currentActive;
  if (classification.intent === currentActive) return false;
  if (isVagueFollowUp(message)) return false;
  return classification.confidence >= INTENT_SWITCH_THRESHOLD;
}

/** Replay user messages to derive active topic with dynamic switching. */
export function resolveConversationState(ctx: ConversationContext): ResolvedConversationState {
  const state = initialState();
  let previousTopic: ChatIntent = "general";
  let topicSwitched = false;
  let currentClassification = classifyMessageIntent(ctx.lastUserMessage);

  if (ctx.userMessages.length === 0) {
    return {
      state,
      currentClassification,
      previousTopic,
      topicSwitched: false,
      activeSegmentMessages: [],
    };
  }

  for (let i = 0; i < ctx.userMessages.length; i++) {
    const msg = ctx.userMessages[i];
    const turn = i + 1;
    const classification = classifyMessageIntent(msg);
    const explicitShift = detectExplicitTopicShift(msg);
    const isLastTurn = turn === ctx.userMessages.length;

    if (turn === 1) {
      previousTopic = "general";
      state.activeTopic = classification.intent;
      state.emotionalContext = emotionalContextLabel(classification.intent, msg);
      state.lastUpdated = turn;
      if (isLastTurn) {
        currentClassification = classification;
        topicSwitched = state.activeTopic !== "general";
      }
      continue;
    }

    const switchTopic = shouldSwitchTopic(
      state.activeTopic,
      classification,
      msg,
      explicitShift
    );

    if (switchTopic) {
      if (isLastTurn) {
        previousTopic = state.activeTopic;
        topicSwitched = true;
        currentClassification = classification;

        chatLog("TOPIC_SWITCH", {
          PREVIOUS_TOPIC: previousTopic,
          NEW_INTENT: classification.intent,
          TOPIC_SWITCH: true,
          confidence: classification.confidence,
          explicitShift,
        });
      }

      state.activeTopic = classification.intent;
      state.emotionalContext = emotionalContextLabel(classification.intent, msg);
      state.lastUpdated = turn;
    } else if (isLastTurn) {
      previousTopic = state.activeTopic;
      topicSwitched = false;
      currentClassification = classification;
      state.emotionalContext = emotionalContextLabel(state.activeTopic, msg);

      chatLog("TOPIC_SWITCH", {
        PREVIOUS_TOPIC: previousTopic,
        NEW_INTENT: classification.intent,
        TOPIC_SWITCH: false,
        confidence: classification.confidence,
        activeTopic: state.activeTopic,
      });
    }
  }

  const activeSegmentMessages =
    state.lastUpdated > 0
      ? ctx.userMessages.slice(state.lastUpdated - 1)
      : ctx.userMessages;

  return {
    state,
    currentClassification,
    previousTopic,
    topicSwitched,
    activeSegmentMessages,
  };
}

export function emotionalSituationForActiveTopic(
  activeSegmentMessages: string[],
  activeTopic: ChatIntent
): ReturnType<typeof detectEmotionalSituation> {
  if (activeTopic === "breakup") {
    return activeSegmentMessages.some((m) =>
      /\b(left me|broke up|breakup|dumped|walked away|separation)\b/i.test(m)
    )
      ? "breakup"
      : "none";
  }
  if (activeTopic === "career") {
    const s = detectEmotionalSituation(activeSegmentMessages);
    return s === "career_stress" ? "career_stress" : "none";
  }
  if (activeTopic === "relationship") {
    const s = detectEmotionalSituation(activeSegmentMessages);
    if (s === "breakup") return "relationship_conflict";
    return s === "relationship_conflict" ? s : "none";
  }
  return detectEmotionalSituation(activeSegmentMessages);
}
