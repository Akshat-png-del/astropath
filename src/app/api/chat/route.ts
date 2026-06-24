import { NextRequest } from "next/server";
import OpenAI from "openai";
import {
  buildChatPrompt,
  buildInsightExtractionPrompt,
  buildReportPrompt,
  determinePhase,
} from "@/lib/ai/prompts";
import { buildConversationContext } from "@/lib/ai/conversation-context";
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
import { interpretMessage } from "@/lib/ai/message-interpreter";
import { decideChatAction } from "@/lib/ai/chat-decision";
import type { Conversation } from "@/types";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const MAX_HISTORY = 12;

function trimHistory(messages: { role: string; content: string }[]) {
  return messages
    .filter((m) => m.content?.trim())
    .slice(-MAX_HISTORY);
}

function fallbackStreamResponse(
  text: string,
  phase: Conversation["phase"]
): Response {
  return new Response(streamFallbackText(text), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Conversation-Phase": phase,
      "X-Fallback-Mode": "true",
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
      mode = "chat",
      chartSummary,
      userName,
      topics = [],
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

    const chatMessages = trimHistory(messages ?? []);
    const ctx = buildConversationContext(chatMessages);
    const hasBirthDetails = !!birthDetails?.dateOfBirth;
    const interp = interpretMessage(ctx, chatMessages);
    const decision = decideChatAction(ctx, interp, hasBirthDetails);

    const currentPhase: Conversation["phase"] = determinePhase(
      ctx.messageCount,
      false,
      hasBirthDetails,
      decision.phase ?? phase
    );

    if (!useOpenAI) {
      const text = generateFallbackResponse(chatMessages, currentPhase, ctx.messageCount, hasBirthDetails);
      return fallbackStreamResponse(text, currentPhase);
    }

    try {
      const systemPrompt = buildChatPrompt(
        currentPhase,
        insights,
        ctx,
        interp,
        decision
      );

      const stream = await getOpenAI().chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...chatMessages.map((m: { role: string; content: string }) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 280,
        presence_penalty: 0.3,
        frequency_penalty: 0.4,
      });

      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const text = chunk.choices[0]?.delta?.content ?? "";
              if (text) controller.enqueue(encoder.encode(text));
            }
            controller.close();
          } catch {
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
          "X-Conversation-Phase": currentPhase,
        },
      });
    } catch {
      const text = generateFallbackResponse(chatMessages, currentPhase, ctx.messageCount, hasBirthDetails);
      return fallbackStreamResponse(text, currentPhase);
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return fallbackStreamResponse(
      "I'm here. What's on your mind — love, career, or something else?",
      "rapport"
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
    title: `${userName}'s Cosmic Mirror`,
    summary: `Dear ${userName}, your cosmic blueprint reveals a soul of remarkable depth. With your Sun in ${sun}, Moon in ${moon}, and ${rising} rising, you carry a unique blend of energies that shapes how you move through the world.${emotionalInsight ? ` Your recent emotional landscape — ${emotionalInsight.value.toLowerCase()} — is reflected in your chart's current transits, inviting gentle self-reflection rather than urgency.` : ""} This reading is a mirror for self-discovery, designed to spark curiosity about who you are becoming.`,
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
        content: `With your Moon in ${moon}, your emotional landscape is rich and complex. You feel things deeply — sometimes before you can name them. This sensitivity is not a burden; it's your cosmic gift for understanding what others miss.`,
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
