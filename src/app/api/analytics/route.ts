import { NextRequest, NextResponse } from "next/server";

/** Lightweight analytics ingestion — logs events for retention reporting */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (process.env.NODE_ENV === "development") {
      console.info("[analytics]", body.name, body.properties ?? {});
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
