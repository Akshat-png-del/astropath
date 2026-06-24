import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { retrieveRelevantKnowledge, formatKnowledgeForPrompt } from "@/lib/ai/knowledge";
import { isOpenAIConfigured } from "@/lib/ai/fallback-chat";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function POST(req: NextRequest) {
  const { userId, sunSign, moonSign, risingSign, memories = [] } = await req.json();

  if (!isOpenAIConfigured()) {
    return NextResponse.json({
      guidance: "Today invites gentle introspection. The cosmos suggests honoring your emotional rhythm rather than pushing against it — even small acts of self-kindness carry weight under today's planetary alignment.",
      focusArea: "Emotional well-being",
      affirmation: "I move through this day with patience and trust in my own timing.",
      planetaryInfluence: "Moon energy — nurturing inner tides",
      mood: "Reflective and open",
      userId,
      date: new Date().toISOString().split("T")[0],
    });
  }

  try {
    const knowledge = retrieveRelevantKnowledge(
      [sunSign, moonSign, "transits", "guidance"],
      4
    );

    const prompt = `Generate today's cosmic guidance for a user with Sun in ${sunSign}, Moon in ${moonSign}, Rising in ${risingSign}.

USER MEMORIES:
${memories.map((m: string) => `- ${m}`).join("\n") || "No prior memories"}

ASTROLOGY CONTEXT:
${formatKnowledgeForPrompt(knowledge)}

Return JSON:
{
  "guidance": "string (2-3 sentences of personalized daily guidance)",
  "focusArea": "string (one life area to focus on today)",
  "affirmation": "string (empowering affirmation)",
  "planetaryInfluence": "string (which planetary energy is prominent today)",
  "mood": "string (suggested emotional tone for the day)"
}

Use supportive, reflective language. No fear-based predictions.`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content ?? "{}";
    const insight = JSON.parse(content);

    return NextResponse.json({
      ...insight,
      userId,
      date: new Date().toISOString().split("T")[0],
    });
  } catch {
    return NextResponse.json({
      guidance: "The stars whisper of rest and renewal today. Allow yourself space to breathe — clarity often arrives when we stop chasing it.",
      focusArea: "Inner peace",
      affirmation: "I am exactly where I need to be in my cosmic journey.",
      planetaryInfluence: "Neptune — intuition and dreams",
      mood: "Calm and receptive",
      userId,
      date: new Date().toISOString().split("T")[0],
    });
  }
}
