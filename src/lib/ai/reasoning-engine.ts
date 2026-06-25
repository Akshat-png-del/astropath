import type { ConversationContext } from "./conversation-context";
import type { MessageInterpretation } from "./message-interpreter";
import type { ProductTopic } from "./topic-detector";
import { detectProductTopic } from "./topic-detector";
import {
  internalReasoning,
  buildPrivateReasoningLog,
  type InternalReasoning,
  type QuestionOrientation,
} from "./internal-reasoning";
import { shouldIncludeFollowUp } from "./response-pipeline";

export type { QuestionOrientation, InternalReasoning };

export interface ReasoningSummary {
  includeFollowUp: boolean;
  followUpPrompt: string | null;
  orientation: QuestionOrientation;
  userThemes: string[];
  formattedBlock: string;
  promptGuidance: string;
  internalBrief: string;
  privateReasoning: InternalReasoning;
  /** @deprecated logging compat */
  reflection: string;
  interpretation: string;
  astroInsight: string;
  futurePossibilities: string | null;
  practicalGuidance: string;
  whatUserWants: string;
  priorConversation: string;
  emotions: string;
  astrologicalPrinciples: string;
  practicalAdvice: string;
  futureGuidance: string | null;
}

export { detectOrientation } from "./internal-reasoning";

export function buildReasoningSummary(
  ctx: ConversationContext,
  interp: MessageInterpretation,
  productTopic?: ProductTopic
): ReasoningSummary {
  const memory = interp.memory;
  const topic = productTopic ?? detectProductTopic(ctx.lastUserMessage).topic;
  const privateReasoning = internalReasoning(ctx, interp, topic);
  const includeFollowUp = shouldIncludeFollowUp(memory.turnNumber);

  const internalBrief = buildPrivateReasoningLog(privateReasoning);

  return {
    includeFollowUp,
    followUpPrompt: null,
    orientation: privateReasoning.orientation,
    userThemes: [],
    formattedBlock: internalBrief,
    promptGuidance: internalBrief,
    internalBrief,
    privateReasoning,
    reflection: "",
    interpretation: privateReasoning.emotion,
    astroInsight: privateReasoning.astroContext ?? "",
    futurePossibilities: null,
    practicalGuidance: "",
    whatUserWants: ctx.lastUserMessage,
    priorConversation: memory.situationSummary,
    emotions: privateReasoning.emotion,
    astrologicalPrinciples: privateReasoning.astroContext ?? "",
    practicalAdvice: "",
    futureGuidance: null,
  };
}
