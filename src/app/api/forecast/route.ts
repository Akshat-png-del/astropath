import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { isOpenAIConfigured } from "@/lib/ai/fallback-chat";
import { ZODIAC_TRAITS } from "@/lib/astrology/zodiac-traits";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const WEEKLY_THEMES = [
  "Inner renewal",
  "Bold initiative",
  "Heart connections",
  "Deep focus",
  "Expansion",
  "Rest & integrate",
  "Creative spark",
];

function fallbackWeekly(sunSign: string) {
  const traits = ZODIAC_TRAITS[sunSign];
  return {
    sunSign,
    weekOf: new Date().toISOString().split("T")[0],
    overview: traits
      ? `This week invites ${traits.archetype} energy to lead — ${traits.keywords[0]} and ${traits.keywords[1]} color your path.`
      : "A week of gentle realignment. Trust small signals over loud noise.",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => ({
      day,
      energy: WEEKLY_THEMES[i],
      note: i < 3 ? "Favor reflection" : i < 5 ? "Take aligned action" : "Restore and receive",
    })),
  };
}

function fallbackMonthly(sunSign: string) {
  const month = new Date().toLocaleString("en-US", { month: "long" });
  const traits = ZODIAC_TRAITS[sunSign];
  return {
    sunSign,
    month,
    theme: traits ? `${traits.archetype} Awakening` : "Planetary Recalibration",
    overview: traits
      ? `${month} asks ${sunSign} souls to honor ${traits.strengths[0].toLowerCase()} while gently addressing ${traits.challenges[0].toLowerCase()}.`
      : `${month} favors patience, honest self-reflection, and one meaningful commitment.`,
    focusAreas: ["Relationships", "Purpose", "Inner peace", "Creative expression"],
    affirmation: traits
      ? `I embody the highest expression of my ${sunSign} nature.`
      : "I walk my path with trust and self-respect.",
  };
}

export async function POST(req: NextRequest) {
  try {
    const { sunSign = "Pisces", moonSign = "Unknown", type = "weekly" } = await req.json();

    if (!isOpenAIConfigured()) {
      return NextResponse.json(
        type === "monthly" ? fallbackMonthly(sunSign) : fallbackWeekly(sunSign)
      );
    }

    const prompt =
      type === "monthly"
        ? `Generate a ${new Date().toLocaleString("en-US", { month: "long" })} astrology forecast for Sun in ${sunSign}, Moon in ${moonSign}.
Return JSON: { "month": "string", "theme": "string", "overview": "string (2-3 sentences)", "focusAreas": ["string"], "affirmation": "string" }
Supportive, mystical, never fear-based.`
        : `Generate a weekly energy forecast for Sun in ${sunSign}, Moon in ${moonSign}.
Return JSON: { "weekOf": "YYYY-MM-DD", "overview": "string", "days": [{ "day": "Mon", "energy": "string", "note": "string" }] }
7 days Mon-Sun. Supportive tone.`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const parsed = JSON.parse(completion.choices[0]?.message?.content ?? "{}");
    return NextResponse.json({ sunSign, ...parsed });
  } catch {
    const body = await req.clone().json().catch(() => ({}));
    const sunSign = (body.sunSign as string) ?? "Pisces";
    const type = (body.type as string) ?? "weekly";
    return NextResponse.json(
      type === "monthly" ? fallbackMonthly(sunSign) : fallbackWeekly(sunSign)
    );
  }
}
