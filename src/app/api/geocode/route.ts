import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");
  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
      { headers: { "User-Agent": "CosmicMirrorAI/1.0" } }
    );
    const data = await res.json();

    if (!data.length) {
      return NextResponse.json({ latitude: 0, longitude: 0, displayName: query });
    }

    return NextResponse.json({
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    });
  } catch {
    return NextResponse.json({ latitude: 0, longitude: 0, displayName: query });
  }
}
