/**
 * Chat pipeline diagnostic — runs sample messages through the same path as /api/chat.
 * Usage: npx tsx scripts/diagnose-chat.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import OpenAI from "openai";

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (!m) continue;
      const val = m[2].replace(/^["']|["']$/g, "");
      if (!process.env[m[1]]) process.env[m[1]] = val;
    }
  } catch {
    /* no .env.local */
  }
}

loadEnvLocal();

import {
  isOpenAIConfigured,
  generateFallbackResponse,
} from "../src/lib/ai/fallback-chat";
import {
  runRagPipeline,
  generateWithQualityGate,
  checkResponseQuality,
} from "../src/lib/ai/rag";
import {
  clearChatAuditEntries,
  logChatAudit,
  summarizeChatAudit,
  type ChatAuditEntry,
  type ChatResponseSource,
} from "../src/lib/ai/chat-audit-log";
import { wordCount } from "../src/lib/ai/response-pipeline";
import { QUALITY_MAX_SCORE } from "../src/lib/ai/response-pipeline";

const CHAT_MODEL = "gpt-4o-mini";

interface TestCase {
  label: string;
  messages: { role: "user" | "assistant"; content: string }[];
  birthDetails?: {
    fullName: string;
    dateOfBirth: string;
    timeOfBirth?: string;
    birthLocation: string;
  };
}

const TEST_CASES: TestCase[] = [
  {
    label: "greeting",
    messages: [{ role: "user", content: "Hi, I'm feeling lost lately." }],
  },
  {
    label: "breakup-reconciliation",
    messages: [
      { role: "user", content: "My boyfriend left me three weeks ago without explanation." },
      { role: "assistant", content: "That sounds painful — sudden endings often leave more questions than answers." },
      { role: "user", content: "Do you think he will come back? I can't stop thinking about him." },
    ],
  },
  {
    label: "career-timing",
    messages: [{ role: "user", content: "Should I quit my job this month? I've been miserable for a year." }],
  },
  {
    label: "birth-details",
    messages: [
      { role: "user", content: "I was born March 15 1990 in Brooklyn at 7:30am. What does my chart say about love?" },
    ],
    birthDetails: {
      fullName: "Alex",
      dateOfBirth: "1990-03-15",
      timeOfBirth: "07:30",
      birthLocation: "Brooklyn, NY",
    },
  },
  {
    label: "moon-sign-question",
    messages: [{ role: "user", content: "What's the difference between my sun and moon sign emotionally?" }],
  },
  {
    label: "follow-up-clarification",
    messages: [
      { role: "user", content: "I'm a Gemini and going through a divorce." },
      { role: "assistant", content: "Gemini processes change through conversation and mental clarity — divorce can feel like your narrative keeps rewriting itself." },
      { role: "user", content: "What should I focus on for the next few months?" },
    ],
  },
  {
    label: "health-boundary",
    messages: [{ role: "user", content: "I've been anxious and not sleeping. Can astrology help?" }],
  },
  {
    label: "tarot-style",
    messages: [{ role: "user", content: "Pull energy for my love life this week — I'm single and hopeful." }],
  },
  {
    label: "compatibility",
    messages: [{ role: "user", content: "I'm a Leo dating a Scorpio. Are we compatible long term?" }],
  },
  {
    label: "short-vague",
    messages: [{ role: "user", content: "help" }],
  },
];

async function runCase(test: TestCase): Promise<ChatAuditEntry> {
  const useOpenAI = isOpenAIConfigured();
  const userPreview = test.messages.filter((m) => m.role === "user").at(-1)?.content?.slice(0, 120) ?? "";

  const pipeline = await runRagPipeline({
    chatMessages: test.messages,
    insights: [],
    memories: [],
    birthDetails: test.birthDetails,
    phase: "rapport",
  });

  const qualityInput = {
    ctx: pipeline.ctx,
    topicSwitched: pipeline.interp.memory.topicSwitched,
    reasoning: pipeline.reasoning,
    knownSign: pipeline.ctx.knownSign ?? pipeline.interp.entities.sign,
  };

  if (!useOpenAI) {
    const text = generateFallbackResponse(
      pipeline.chatMessages,
      pipeline.phase,
      pipeline.ctx.messageCount,
      pipeline.hasBirthDetails,
      test.birthDetails,
      pipeline.retrieval
    );
    const quality = checkResponseQuality({ response: text, ...qualityInput });
    return logChatAudit({
      model: "fallback-engine",
      responseSource: "fallback-no-api-key" as ChatResponseSource,
      fallbackReason: "openai-not-configured",
      openAIConfigured: false,
      tokenCount: { prompt: 0, completion: 0, total: 0 },
      responseLength: text.length,
      qualityScore: quality.score,
      qualityMaxScore: QUALITY_MAX_SCORE,
      qualityPassed: quality.passed,
      qualityIssues: quality.issues,
      qualityRetried: false,
      retrievalActive: pipeline.retrieval.need.needsRetrieval,
      userMessagePreview: `[${test.label}] ${userPreview}`,
      responsePreview: text.slice(0, 200),
    });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY?.trim() });
    const tokenCount = { prompt: 0, completion: 0, total: 0 };

    const { text, quality, retried } = await generateWithQualityGate(
      async (llmMessages, isRetry) => {
        const completion = await openai.chat.completions.create({
          model: CHAT_MODEL,
          messages: llmMessages,
          stream: false,
          temperature: isRetry ? 0.65 : 0.55,
          max_tokens: isRetry ? 680 : 620,
          presence_penalty: 0.3,
          frequency_penalty: 0.4,
        });
        if (completion.usage) {
          tokenCount.prompt += completion.usage.prompt_tokens ?? 0;
          tokenCount.completion += completion.usage.completion_tokens ?? 0;
          tokenCount.total += completion.usage.total_tokens ?? 0;
        }
        return completion.choices[0]?.message?.content ?? "";
      },
      pipeline,
      [],
      [],
      test.birthDetails
    );

    return logChatAudit({
      model: CHAT_MODEL,
      responseSource: "openai",
      openAIConfigured: true,
      tokenCount,
      responseLength: text.length,
      qualityScore: quality.score,
      qualityMaxScore: QUALITY_MAX_SCORE,
      qualityPassed: quality.passed,
      qualityIssues: quality.issues,
      qualityRetried: retried,
      retrievalActive: pipeline.retrieval.need.needsRetrieval,
      userMessagePreview: `[${test.label}] ${userPreview}`,
      responsePreview: text.slice(0, 200),
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    const text = generateFallbackResponse(
      pipeline.chatMessages,
      pipeline.phase,
      pipeline.ctx.messageCount,
      pipeline.hasBirthDetails,
      test.birthDetails,
      pipeline.retrieval
    );
    const quality = checkResponseQuality({ response: text, ...qualityInput });
    return logChatAudit({
      model: "fallback-engine",
      responseSource: "fallback-after-error",
      fallbackReason: "openai-call-failed",
      openAIConfigured: true,
      tokenCount: { prompt: 0, completion: 0, total: 0 },
      responseLength: text.length,
      qualityScore: quality.score,
      qualityMaxScore: QUALITY_MAX_SCORE,
      qualityPassed: quality.passed,
      qualityIssues: quality.issues,
      qualityRetried: false,
      retrievalActive: pipeline.retrieval.need.needsRetrieval,
      userMessagePreview: `[${test.label}] ${userPreview}`,
      responsePreview: text.slice(0, 200),
      errorMessage,
    });
  }
}

async function main() {
  clearChatAuditEntries();

  console.log("=== AstroPath Chat Pipeline Diagnostic ===\n");
  console.log(`OpenAI configured: ${isOpenAIConfigured()}`);
  console.log(`Chat model: ${CHAT_MODEL}`);
  console.log(`Test cases: ${TEST_CASES.length}\n`);

  const entries: ChatAuditEntry[] = [];

  for (const test of TEST_CASES) {
    process.stdout.write(`Running: ${test.label}... `);
    const entry = await runCase(test);
    entries.push(entry);
    console.log(
      `${entry.responseSource} | ${entry.responseWordCount} words | quality ${entry.qualityScore}/${entry.qualityMaxScore} | tokens ${entry.tokenCount.total}`
    );
  }

  const summary = summarizeChatAudit(entries);

  console.log("\n=== SUMMARY ===");
  console.log(`OpenAI success rate: ${summary.openAISuccessRate.toFixed(1)}%`);
  console.log(`Fallback usage: ${summary.fallbackRate.toFixed(1)}%`);
  console.log(`Average response words: ${summary.averageResponseWords.toFixed(1)}`);
  console.log(`Average quality score: ${summary.averageQualityScoreOutOf10.toFixed(2)}/10`);
  console.log(`Quality pass rate: ${summary.qualityPassRate.toFixed(1)}%`);
  console.log(`Average token count: ${summary.averageTokenCount.toFixed(0)}`);
  console.log(`OpenAI avg words: ${summary.openAIAverageWords.toFixed(1)} | avg quality: ${(summary.openAIAverageQuality / QUALITY_MAX_SCORE * 10).toFixed(2)}/10`);
  console.log(`Fallback avg words: ${summary.fallbackAverageWords.toFixed(1)} | avg quality: ${(summary.fallbackAverageQuality / QUALITY_MAX_SCORE * 10).toFixed(2)}/10`);

  if (Object.keys(summary.fallbackByReason).length) {
    console.log("\nFallback breakdown:", summary.fallbackByReason);
  }

  console.log("\n=== PER-CASE DETAIL ===");
  for (const e of entries) {
    console.log(`\n--- ${e.userMessagePreview.split("] ")[0]?.replace("[", "")} ---`);
    console.log(`Source: ${e.responseSource} | Model: ${e.model}`);
    console.log(`Words: ${e.responseWordCount} | Quality: ${e.qualityScore}/${e.qualityMaxScore} (pass=${e.qualityPassed})`);
    if (e.qualityIssues.length) console.log(`Issues: ${e.qualityIssues.join(", ")}`);
    if (e.errorMessage) console.log(`Error: ${e.errorMessage}`);
    console.log(`Preview: ${e.responsePreview.replace(/\n/g, " ")}…`);
  }

  // Also run fallback-only simulation to compare template quality
  console.log("\n=== FALLBACK-ONLY SIMULATION (same inputs, OpenAI bypassed) ===");
  let fallbackSimQuality = 0;
  for (const test of TEST_CASES) {
    const pipeline = await runRagPipeline({
      chatMessages: test.messages,
      insights: [],
      memories: [],
      birthDetails: test.birthDetails,
      phase: "rapport",
    });
    const text = generateFallbackResponse(
      pipeline.chatMessages,
      pipeline.phase,
      pipeline.ctx.messageCount,
      pipeline.hasBirthDetails,
      test.birthDetails,
      pipeline.retrieval
    );
    const quality = checkResponseQuality({
      response: text,
      ctx: pipeline.ctx,
      topicSwitched: pipeline.interp.memory.topicSwitched,
      reasoning: pipeline.reasoning,
      knownSign: pipeline.ctx.knownSign ?? pipeline.interp.entities.sign,
    });
    fallbackSimQuality += quality.score;
    console.log(
      `${test.label}: ${wordCount(text)} words, quality ${(quality.score / QUALITY_MAX_SCORE * 10).toFixed(2)}/10, issues=[${quality.issues.join(", ")}]`
    );
  }
  console.log(
    `Fallback-only avg quality: ${((fallbackSimQuality / TEST_CASES.length) / QUALITY_MAX_SCORE * 10).toFixed(2)}/10`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
