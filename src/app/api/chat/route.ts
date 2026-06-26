import { NextRequest } from "next/server";
import OpenAI from "openai";
import { buildReportPrompt } from "@/lib/ai/prompts";
import {
  retrieveRelevantKnowledge,
  formatKnowledgeForPrompt,
} from "@/lib/ai/knowledge";
import {
  isOpenAIConfigured,
  generateFallbackResponse,
  streamFallbackText,
  extractFallbackInsights,
} from "@/lib/ai/fallback-chat";
import { chatLog, chatLogMultiline, logReasoningPipeline } from "@/lib/ai/chat-debug";
import {
  runRagPipeline,
  generateWithQualityGate,
  checkResponseQuality,
} from "@/lib/ai/rag";
import type { Conversation } from "@/types";
import type { PastConversationSnippet } from "@/lib/ai/rag";
import { reportTitleFor } from "@/lib/brand";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY?.trim() });
}

function streamResponse(
  text: string,
  phase: Conversation["phase"],
  headers: Record<string, string> = {}
): Response {
  return new Response(streamFallbackText(text), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store",
      "X-Conversation-Phase": phase,
      ...headers,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      messages,
      phase,
      insights = [],
      birthDetails,
      memories = [],
      externalKnowledge,
      retrievedKnowledge,
      pastConversations = [],
      conversationSummaries = [],
      mode = "chat",
      chartSummary,
      userName,
      topics = [],
      userId,
    } = body;

    const useOpenAI = isOpenAIConfigured();

    if (mode === "report") {
      if (!useOpenAI) {
        return Response.json(generateFallbackReport(userName, insights, chartSummary));
      }

      try {
        const knowledge = retrieveRelevantKnowledge(topics, 6);
        const prompt = buildReportPrompt(
          insights,
          chartSummary,
          formatKnowledgeForPrompt(knowledge),
          userName
        );

        const completion = await getOpenAI().chat.completions.create({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
          temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content ?? "{}";
        return Response.json(JSON.parse(content));
      } catch {
        return Response.json(generateFallbackReport(userName, insights, chartSummary));
      }
    }

    if (mode === "extract") {
      const lastUser = messages.filter((m: { role: string }) => m.role === "user").pop();
      if (!lastUser) {
        return Response.json({ insights: [], sentiment: "neutral", topicsDiscussed: [] });
      }
      return Response.json(extractFallbackInsights(lastUser.content));
    }

    const rawMessages = messages ?? [];
    chatLog("USER_MESSAGE", {
      userMessage: rawMessages.filter((m: { role: string }) => m.role === "user").at(-1)?.content ?? "",
    });
    chatLog("HISTORY", { rawCount: rawMessages.length });
    chatLog("USING_FALLBACK", { usingFallback: !useOpenAI, openAIConfigured: useOpenAI });

    const pipeline = await runRagPipeline({
      chatMessages: rawMessages,
      insights,
      memories,
      birthDetails,
      externalKnowledge: externalKnowledge ?? retrievedKnowledge,
      pastConversations: pastConversations as PastConversationSnippet[],
      conversationSummaries,
      phase,
      userId,
    });

    chatLogMultiline("FINAL_PROMPT", pipeline.systemPrompt);
    chatLog("LLM_MESSAGES", {
      count: pipeline.llmMessages.length,
      phase: pipeline.phase,
      retrievalActive: pipeline.retrieval.need.needsRetrieval,
    });

    if (!useOpenAI) {
      const text = generateFallbackResponse(
        pipeline.chatMessages,
        pipeline.phase,
        pipeline.ctx.messageCount,
        pipeline.hasBirthDetails,
        birthDetails,
        pipeline.retrieval
      );

      const quality = checkResponseQuality({
        response: text,
        ctx: pipeline.ctx,
        topicSwitched: pipeline.interp.memory.topicSwitched,
        reasoning: pipeline.reasoning,
        knownSign: pipeline.ctx.knownSign ?? pipeline.interp.entities.sign,
      });

      logReasoningPipeline({
        userIntent: pipeline.interp.chatIntent,
        emotionalState: pipeline.reasoning.emotions,
        activeTopic: pipeline.interp.memory.chatIntent,
        reasoningSummary: pipeline.reasoning.whatUserWants,
        qualityScore: quality.score,
      });

      chatLog("MODEL_RESPONSE", {
        source: "fallback-no-api-key",
        preview: text.slice(0, 120),
        qualityPassed: quality.passed,
        isDuplicate: quality.isDuplicate,
      });

      return streamResponse(text, pipeline.phase, {
        "X-Fallback-Mode": "true",
        "X-Chat-Source": "fallback",
        "X-Fallback-Reason": "openai-not-configured",
        "X-Retrieval-Active": String(pipeline.retrieval.need.needsRetrieval),
        "X-Live-Data": String(pipeline.retrieval.hasLiveCelestialData),
        "X-Quality-Passed": String(quality.passed),
        "X-Quality-Score": String(quality.score),
      });
    }

    try {
      const openai = getOpenAI();

      const { text, quality, retried } = await generateWithQualityGate(
        async (llmMessages, isRetry) => {
          const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: llmMessages,
            stream: false,
            temperature: isRetry ? 0.65 : 0.55,
            max_tokens: isRetry ? 680 : 620,
            presence_penalty: 0.3,
            frequency_penalty: 0.4,
          });
          return completion.choices[0]?.message?.content ?? "";
        },
        pipeline,
        insights,
        memories,
        birthDetails
      );

      chatLog("MODEL_RESPONSE", {
        source: "openai",
        length: text.length,
        preview: text.slice(0, 120),
        qualityPassed: quality.passed,
        isDuplicate: quality.isDuplicate,
        retried,
      });

      return streamResponse(text, pipeline.phase, {
        "X-Fallback-Mode": "false",
        "X-Chat-Source": "openai",
        "X-Retrieval-Active": String(pipeline.retrieval.need.needsRetrieval),
        "X-Live-Data": String(pipeline.retrieval.hasLiveCelestialData),
        "X-Quality-Passed": String(quality.passed),
        "X-Quality-Retried": String(retried),
        "X-Quality-Score": String(quality.score),
      });
    } catch (openAiErr) {
      console.error("[chat:openai_error]", openAiErr);
      chatLog("USING_FALLBACK", { usingFallback: true, reason: "openai_call_failed" });

      const text = generateFallbackResponse(
        pipeline.chatMessages,
        pipeline.phase,
        pipeline.ctx.messageCount,
        pipeline.hasBirthDetails,
        birthDetails,
        pipeline.retrieval
      );

      const quality = checkResponseQuality({
        response: text,
        ctx: pipeline.ctx,
        topicSwitched: pipeline.interp.memory.topicSwitched,
        reasoning: pipeline.reasoning,
        knownSign: pipeline.ctx.knownSign ?? pipeline.interp.entities.sign,
      });

      logReasoningPipeline({
        userIntent: pipeline.interp.chatIntent,
        emotionalState: pipeline.reasoning.emotions,
        activeTopic: pipeline.interp.memory.chatIntent,
        reasoningSummary: pipeline.reasoning.whatUserWants,
        qualityScore: quality.score,
      });

      chatLog("MODEL_RESPONSE", {
        source: "fallback-after-error",
        preview: text.slice(0, 120),
        qualityPassed: quality.passed,
      });

      return streamResponse(text, pipeline.phase, {
        "X-Fallback-Mode": "true",
        "X-Chat-Source": "fallback",
        "X-Fallback-Reason": "openai-call-failed",
        "X-Quality-Passed": String(quality.passed),
        "X-Quality-Score": String(quality.score),
      });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return streamResponse(
      "I'm here. What's on your mind — love, career, or something else?",
      "rapport",
      { "X-Fallback-Mode": "true", "X-Chat-Source": "fallback" }
    );
  }
}

function generateFallbackReport(
  userName: string,
  insights: { category: string; value: string }[],
  chartSummary: string
) {
  const sunMatch = chartSummary?.match(/Sun: (\w+)/);
  const moonMatch = chartSummary?.match(/Moon: (\w+)/);
  const risingMatch = chartSummary?.match(/Rising: (\w+)/);
  const sun = sunMatch?.[1] ?? "Unknown";
  const moon = moonMatch?.[1] ?? "Unknown";
  const rising = risingMatch?.[1] ?? "Unknown";

  const emotionalInsight = insights.find((i) => i.category === "emotions");

  return {
    title: reportTitleFor(userName),
    summary: `Dear ${userName}, your birth chart reveals a soul of remarkable depth. With your Sun in ${sun}, Moon in ${moon}, and ${rising} rising, you carry a unique blend of energies that shapes how you move through the world.${emotionalInsight ? ` Your recent emotional landscape — ${emotionalInsight.value.toLowerCase()} — is reflected in your chart's current transits, inviting gentle self-reflection rather than urgency.` : ""} This reading is a mirror for self-discovery, designed to spark curiosity about who you are becoming.`,
    cosmicDna: {
      archetype: `The ${sun} Visionary`,
      coreTraits: ["Intuitive", "Reflective", "Resilient", "Deep-feeling", "Seeking"],
      emotionalPattern: emotionalInsight?.value ?? "Processes emotions deeply, needs space to reflect before acting",
      relationshipStyle: "Seeks authentic connection over surface-level interaction",
      careerDrive: "Drawn to meaningful work that aligns with personal values",
      hiddenStrength: "Ability to find clarity in moments of stillness",
      soulLesson: "Learning to honor your emotional rhythms without judgment",
      cosmicSignature: `A ${sun} soul with ${moon} depths and ${rising} presence`,
    },
    curiosityCards: [
      {
        type: "hidden_strength",
        title: "Quiet Resilience",
        content: "Your chart reveals a strength you may underestimate — the ability to regenerate after emotional winters. Like the moon that always returns, you have an innate capacity to begin again.",
        confidence: 0.82,
        reasoning: `Moon in ${moon} combined with conversational patterns of introspection`,
      },
      {
        type: "upcoming_opportunity",
        title: "A Door Opening",
        content: "Jupiter's current influence suggests an opening in the next 6-8 weeks around personal growth. Watch for invitations to step outside your comfort zone — they may arrive subtly.",
        confidence: 0.7,
        reasoning: "Jupiter transit through growth-oriented house placement",
      },
      {
        type: "relationship_pattern",
        title: "The Depth Seeker",
        content: "You tend to attract connections that challenge you to be more authentic. Your Venus placement suggests you value emotional honesty over perfection in relationships.",
        confidence: 0.78,
        reasoning: `Venus aspects and ${moon} Moon emotional needs`,
      },
      {
        type: "soul_lesson",
        title: "Embracing the Shadow",
        content: "Your current chapter asks you to befriend the parts of yourself you've been taught to hide — especially around vulnerability. This is not weakness; it is the path to wholeness.",
        confidence: 0.85,
        reasoning: "Saturn themes and conversational emotional patterns",
      },
      {
        type: "ninety_day_outlook",
        title: "The Unfolding",
        content: "The next 90 days favor inner work over outer achievement. Focus on one area of emotional healing, and trust that clarity about direction will follow naturally — not through force, but through patience.",
        confidence: 0.75,
        reasoning: "Current transits and seasonal planetary shifts",
      },
    ],
    sections: [
      {
        title: "Your Inner World",
        content: `With your Moon in ${moon}, your emotional landscape is rich and complex. You feel things deeply — sometimes before you can name them. This sensitivity is not a burden; it's a gift for understanding what others miss.`,
        confidence: 0.8,
        reasoning: `Moon sign ${moon} governs emotional processing`,
        astrologicalBasis: [`Moon in ${moon}`, "4th house themes"],
      },
      {
        title: "How Others See You",
        content: `Your ${rising} rising creates a first impression of someone thoughtful and present. People sense there's more beneath your surface — and they're right. You reveal yourself in layers, which builds trust with those patient enough to stay.`,
        confidence: 0.77,
        reasoning: `Rising sign ${rising} shapes social presentation`,
        astrologicalBasis: [`${rising} Ascendant`, "1st house identity"],
      },
      {
        title: "Your Path Forward",
        content: "The stars don't demand you have everything figured out. Your chart suggests this is a season for listening — to your body, your dreams, and the quiet voice that knows what you need before your mind catches up.",
        confidence: 0.73,
        reasoning: "Combined chart analysis and conversational insights",
        astrologicalBasis: ["North Node themes", "Current transits"],
      },
    ],
  };
}
