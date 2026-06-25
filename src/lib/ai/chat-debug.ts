/** Server-side chat pipeline logging. Enable with CHAT_DEBUG=1 */

const ENABLED =
  process.env.CHAT_DEBUG === "1" ||
  process.env.CHAT_DEBUG === "true" ||
  process.env.NODE_ENV === "development";

export function chatLog(step: string, data?: Record<string, unknown>): void {
  if (!ENABLED) return;
  const payload = data ? ` ${JSON.stringify(data, null, 0)}` : "";
  console.log(`[chat:${step}]${payload}`);
}

export function chatLogMultiline(step: string, text: string, max = 1200): void {
  if (!ENABLED) return;
  const trimmed = text.length > max ? `${text.slice(0, max)}…(${text.length} chars)` : text;
  console.log(`[chat:${step}]\n${trimmed}`);
}

export function ragStageLog(stage: string, data?: Record<string, unknown>): void {
  if (!ENABLED) return;
  const payload = data ? ` ${JSON.stringify(data, null, 0)}` : "";
  console.log(`[rag:${stage}]${payload}`);
}

export function logProductionPipeline(data: {
  detectedIntent: string;
  activeTopic: string;
  emotion: string;
  retrievedMemories: number;
  qualityScore?: number;
  duplicateScore?: number;
  responseGenerated?: boolean;
  summaryGenerated?: boolean;
}): void {
  if (!ENABLED) return;
  console.log("DETECTED INTENT", data.detectedIntent);
  console.log("ACTIVE TOPIC", data.activeTopic);
  console.log("EMOTION", data.emotion);
  console.log("RETRIEVED MEMORIES", data.retrievedMemories);
  if (data.duplicateScore !== undefined) console.log("DUPLICATE SCORE", data.duplicateScore);
  if (data.qualityScore !== undefined) console.log("QUALITY SCORE", data.qualityScore);
  if (data.responseGenerated) console.log("FINAL RESPONSE GENERATION", "complete");
  if (data.summaryGenerated) console.log("CONVERSATION SUMMARY", "generated");
}

export function logReasoningPipeline(summary: {
  userIntent: string;
  emotionalState: string;
  activeTopic: string;
  reasoningSummary: string;
  qualityScore?: number;
}): void {
  if (!ENABLED) return;
  logProductionPipeline({
    detectedIntent: summary.userIntent,
    activeTopic: summary.activeTopic,
    emotion: summary.emotionalState,
    retrievedMemories: 0,
    qualityScore: summary.qualityScore,
  });
}
