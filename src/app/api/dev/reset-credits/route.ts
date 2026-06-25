import { NextRequest } from "next/server";
import { isDevEnvironment, isDevTestUser, DEV_TEST_CREDITS } from "@/lib/billing/dev-test-user";
import { isFirebaseAdminConfigured, getAdminAuth, getAdminFirestore } from "@/lib/firebase/admin";
import { defaultUsage } from "@/lib/firebase/credits-server";

export async function POST(req: NextRequest) {
  if (!isDevEnvironment()) {
    return Response.json({ error: "Not available outside development." }, { status: 404 });
  }

  if (!isFirebaseAdminConfigured()) {
    return Response.json(
      {
        error: "Firebase Admin not configured.",
        hint: "Add FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_ADMIN_CLIENT_EMAIL + FIREBASE_ADMIN_PRIVATE_KEY to .env.local. Dev bypass still works without this.",
      },
      { status: 503 }
    );
  }

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return Response.json({ error: "Missing Bearer token." }, { status: 401 });
  }

  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    if (!isDevTestUser(decoded.uid)) {
      return Response.json({ error: "Not authorized for dev credit reset." }, { status: 403 });
    }

    const db = getAdminFirestore();
    const userRef = db.collection("users").doc(decoded.uid);
    const snap = await userRef.get();

    if (!snap.exists) {
      return Response.json({ error: "User profile not found." }, { status: 404 });
    }

    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1, 1);

    await userRef.update({
      credits: DEV_TEST_CREDITS,
      usage: defaultUsage(),
      creditsResetAt: nextMonth,
      updatedAt: new Date(),
    });

    return Response.json({
      ok: true,
      uid: decoded.uid,
      credits: DEV_TEST_CREDITS,
      message: `Credits reset to ${DEV_TEST_CREDITS} for dev testing.`,
    });
  } catch (error) {
    console.error("[dev/reset-credits]", error);
    return Response.json({ error: "Could not reset credits." }, { status: 500 });
  }
}
