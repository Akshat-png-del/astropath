import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import OpenAI from "openai";

admin.initializeApp();
const db = admin.firestore();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const COSMIC_SYSTEM_PROMPT = `You are AstroPath — a warm, intuitive cosmic companion. Never make fear-based predictions. Use supportive, reflective language. Build rapport before asking for birth details.`;

export const onMessageCreated = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snap, context) => {
    const message = snap.data();
    if (message.role !== "user" || message.processed) return;

    const conversationRef = db
      .collection("conversations")
      .doc(message.conversationId);
    const conversation = (await conversationRef.get()).data();
    if (!conversation) return;

    const messagesSnap = await db
      .collection("messages")
      .where("conversationId", "==", message.conversationId)
      .orderBy("timestamp", "asc")
      .get();

    const chatHistory = messagesSnap.docs.map((d) => {
      const data = d.data();
      return { role: data.role, content: data.content };
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: COSMIC_SYSTEM_PROMPT },
        ...chatHistory.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      temperature: 0.8,
      max_tokens: 1024,
    });

    const assistantContent =
      completion.choices[0]?.message?.content ?? "I'm here with you.";

    await db.collection("messages").add({
      conversationId: message.conversationId,
      role: "assistant",
      content: assistantContent,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      processed: true,
    });

    await conversationRef.update({
      messageCount: admin.firestore.FieldValue.increment(1),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await snap.ref.update({ processed: true });
  });

export const generateDailyInsight = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Must be signed in"
      );
    }

    const userId = context.auth.uid;
    const today = new Date().toISOString().split("T")[0];

    const existing = await db
      .collection("dailyInsights")
      .where("userId", "==", userId)
      .where("date", "==", today)
      .get();

    if (!existing.empty) {
      return existing.docs[0].data();
    }

    const memoriesSnap = await db
      .collection("userMemories")
      .where("userId", "==", userId)
      .orderBy("updatedAt", "desc")
      .limit(10)
      .get();

    const memories = memoriesSnap.docs.map((d) => d.data().value);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Generate today's cosmic guidance. Memories: ${memories.join(", ")}. Return JSON with guidance, focusArea, affirmation, planetaryInfluence, mood.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const insight = JSON.parse(
      completion.choices[0]?.message?.content ?? "{}"
    );

    const docRef = await db.collection("dailyInsights").add({
      userId,
      date: today,
      ...insight,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { id: docRef.id, userId, date: today, ...insight };
  }
);

export const extractInsights = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Must be signed in"
      );
    }

    const { userMessage, assistantResponse, conversationId } = data;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Extract insights from:\nUSER: ${userMessage}\nASSISTANT: ${assistantResponse}\nReturn JSON: { insights: [{category, value, confidence}], sentiment, topicsDiscussed }`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const extracted = JSON.parse(
      completion.choices[0]?.message?.content ?? "{}"
    );

    if (conversationId && extracted.insights?.length) {
      await db
        .collection("conversations")
        .doc(conversationId)
        .update({
          insights: admin.firestore.FieldValue.arrayUnion(
            ...extracted.insights
          ),
        });
    }

    return extracted;
  }
);

export const saveUserMemory = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Must be signed in"
      );
    }

    const { key, value, category, source, confidence } = data;

    const ref = await db.collection("userMemories").add({
      userId: context.auth.uid,
      key,
      value,
      category,
      source: source ?? "conversation",
      confidence: confidence ?? 0.7,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { id: ref.id };
  }
);

/** Server-only: activate subscription after Stripe checkout (webhook calls this pattern) */
export const activateSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth?.token?.admin) {
    throw new functions.https.HttpsError("permission-denied", "Admin only");
  }
  const { userId, tier, stripeCustomerId, stripeSubscriptionId, currentPeriodEnd } = data as {
    userId: string;
    tier: "cosmic" | "oracle";
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    currentPeriodEnd?: string;
  };
  if (!userId || !tier) {
    throw new functions.https.HttpsError("invalid-argument", "userId and tier required");
  }

  const features =
    tier === "oracle"
      ? {
          unlimitedChat: true,
          unlimitedTarot: true,
          monthlyForecast: true,
          compatibilityDeepDive: true,
          savedHistory: true,
          priorityReports: true,
        }
      : {
          unlimitedChat: true,
          unlimitedTarot: true,
          monthlyForecast: true,
          compatibilityDeepDive: true,
          savedHistory: true,
          priorityReports: true,
        };

  await db.collection("subscriptions").doc(userId).set(
    {
      userId,
      tier,
      status: "active",
      stripeCustomerId: stripeCustomerId ?? null,
      stripeSubscriptionId: stripeSubscriptionId ?? null,
      currentPeriodEnd: currentPeriodEnd ? admin.firestore.Timestamp.fromDate(new Date(currentPeriodEnd)) : null,
      features,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  await db.collection("users").doc(userId).set(
    { subscriptionTier: tier, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
    { merge: true }
  );

  return { ok: true, tier };
});
