import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  limit,
  increment,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseDb } from "./config";
import { COLLECTIONS } from "./collections";
import type {
  Conversation,
  ConversationMessage,
  UserProfile,
  BirthProfile,
  CosmicReport,
  DailyInsight,
  UserMemory,
  ExtractedInsight,
} from "@/types";

const db = () => getFirebaseDb();

export async function createUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  await setDoc(
    doc(db(), COLLECTIONS.USERS, uid),
    {
      uid,
      email: data.email ?? null,
      displayName: data.displayName ?? null,
      photoURL: data.photoURL ?? null,
      createdAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
      onboardingComplete: false,
      ...data,
    },
    { merge: true }
  );
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db(), COLLECTIONS.USERS, uid));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as unknown as UserProfile;
}

export async function updateUserLastActive(uid: string): Promise<void> {
  await updateDoc(doc(db(), COLLECTIONS.USERS, uid), {
    lastActiveAt: serverTimestamp(),
  });
}

export async function createConversation(userId: string): Promise<string> {
  const ref = await addDoc(collection(db(), COLLECTIONS.CONVERSATIONS), {
    userId,
    status: "active",
    phase: "rapport",
    messageCount: 0,
    insights: [],
    topicsCovered: [],
    birthDetailsRequested: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateConversation(
  conversationId: string,
  data: Partial<Conversation>
): Promise<void> {
  await updateDoc(doc(db(), COLLECTIONS.CONVERSATIONS, conversationId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function addMessage(
  conversationId: string,
  message: Omit<ConversationMessage, "id" | "conversationId" | "timestamp">
): Promise<string> {
  const ref = await addDoc(collection(db(), COLLECTIONS.MESSAGES), {
    conversationId,
    ...message,
    timestamp: serverTimestamp(),
  });

  await updateDoc(doc(db(), COLLECTIONS.CONVERSATIONS, conversationId), {
    messageCount: increment(message.role === "user" ? 1 : 0),
    updatedAt: serverTimestamp(),
  });

  return ref.id;
}

export async function getUserConversations(userId: string, max = 15) {
  const q = query(
    collection(db(), COLLECTIONS.CONVERSATIONS),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc"),
    limit(max)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function logAnalyticsEvent(
  userId: string,
  event: string,
  properties?: Record<string, string | number | boolean>
): Promise<void> {
  await addDoc(collection(db(), COLLECTIONS.ANALYTICS), {
    userId,
    event,
    properties: properties ?? {},
    createdAt: serverTimestamp(),
  });
}

export async function getUserSubscription(userId: string) {
  const snap = await getDoc(doc(db(), COLLECTIONS.SUBSCRIPTIONS, userId));
  if (!snap.exists()) {
    return {
      userId,
      tier: "free" as const,
      status: "active" as const,
      features: {
        unlimitedChat: true,
        monthlyForecast: false,
        compatibilityDeepDive: false,
        savedHistory: true,
        priorityReports: false,
      },
    };
  }
  return snap.data();
}

export function subscribeToMessages(
  conversationId: string,
  callback: (messages: ConversationMessage[]) => void
): Unsubscribe {
  const q = query(
    collection(db(), COLLECTIONS.MESSAGES),
    where("conversationId", "==", conversationId),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        conversationId: data.conversationId,
        role: data.role,
        content: data.content,
        timestamp: data.timestamp?.toDate?.() ?? new Date(),
        extractedInsights: data.extractedInsights,
        sentiment: data.sentiment,
        topicsDiscussed: data.topicsDiscussed,
        isStreaming: data.isStreaming,
      } as ConversationMessage;
    });
    callback(messages);
  });
}

export async function saveBirthProfile(
  profile: Omit<BirthProfile, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(db(), COLLECTIONS.BIRTH_PROFILES), {
    ...profile,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function saveCosmicReport(
  report: Omit<CosmicReport, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(db(), COLLECTIONS.COSMIC_REPORTS), {
    ...report,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getCosmicReport(
  reportId: string
): Promise<CosmicReport | null> {
  const snap = await getDoc(doc(db(), COLLECTIONS.COSMIC_REPORTS, reportId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as unknown as CosmicReport;
}

export async function getUserReports(userId: string): Promise<CosmicReport[]> {
  const q = query(
    collection(db(), COLLECTIONS.COSMIC_REPORTS),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as unknown as CosmicReport
  );
}

export async function saveDailyInsight(
  insight: Omit<DailyInsight, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(db(), COLLECTIONS.DAILY_INSIGHTS), {
    ...insight,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getTodayInsight(
  userId: string,
  date: string
): Promise<DailyInsight | null> {
  const q = query(
    collection(db(), COLLECTIONS.DAILY_INSIGHTS),
    where("userId", "==", userId),
    where("date", "==", date)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as unknown as DailyInsight;
}

export async function saveUserMemory(
  memory: Omit<UserMemory, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const ref = await addDoc(collection(db(), COLLECTIONS.USER_MEMORIES), {
    ...memory,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getUserMemories(userId: string): Promise<UserMemory[]> {
  const q = query(
    collection(db(), COLLECTIONS.USER_MEMORIES),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as unknown as UserMemory
  );
}

export async function updateConversationInsights(
  conversationId: string,
  insights: ExtractedInsight[]
): Promise<void> {
  await updateDoc(doc(db(), COLLECTIONS.CONVERSATIONS, conversationId), {
    insights,
    updatedAt: serverTimestamp(),
  });
}
