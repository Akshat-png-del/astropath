import { NextRequest, NextResponse } from "next/server";
import { calculateBirthChart, getSunSign } from "@/lib/astrology/chart";

export async function POST(req: NextRequest) {
  try {
    const { dateOfBirth, timeOfBirth, latitude, longitude } = await req.json();

    if (!dateOfBirth) {
      return NextResponse.json({ error: "Date of birth required" }, { status: 400 });
    }

    const [year, month, day] = dateOfBirth.split("-").map(Number);
    const [hours, minutes] = (timeOfBirth || "12:00").split(":").map(Number);
    const birthDate = new Date(year, month - 1, day, hours, minutes);

    const chart = await calculateBirthChart({
      date: birthDate,
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
    });

    return NextResponse.json(chart);
  } catch (error) {
    console.error("Chart calculation error:", error);
    const body = await req.clone().json().catch(() => ({}));
    const dateOfBirth = body.dateOfBirth as string | undefined;
    if (dateOfBirth) {
      const [year, month, day] = dateOfBirth.split("-").map(Number);
      const sunSign = getSunSign(new Date(year, month - 1, day));
      return NextResponse.json({
        sunSign,
        moonSign: sunSign,
        risingSign: sunSign,
        chartData: { planets: [], houses: [], aspects: [] },
        fallback: true,
      });
    }
    return NextResponse.json({ error: "Chart calculation failed" }, { status: 500 });
  }
}
