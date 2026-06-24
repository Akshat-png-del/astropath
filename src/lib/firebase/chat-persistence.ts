import { isFirebaseConfigured } from "./config";

const LOCAL_KEY = "cosmic_mirror_chat";
const LOCAL_HISTORY_KEY = "cosmic_mirror_chat_history";

export interface LocalChatSnapshot {
  conversationId: string;
  messages: { role: string; content: string; id: string; timestamp: string }[];
  phase: string;
  insights: { category: string; value: string; confidence: number }[];
  updatedAt: string;
  title?: string;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  updatedAt: string;
  preview: string;
}

export function saveLocalChat(snapshot: LocalChatSnapshot): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(snapshot));

  const history = listLocalChatHistory();
  const existing = history.findIndex((h) => h.id === snapshot.conversationId);
  const item: ChatHistoryItem = {
    id: snapshot.conversationId,
    title: snapshot.title ?? deriveTitle(snapshot.messages),
    updatedAt: snapshot.updatedAt,
    preview: lastUserPreview(snapshot.messages),
  };
  if (existing >= 0) history[existing] = item;
  else history.unshift(item);
  localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

export function loadLocalChat(): LocalChatSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function loadLocalChatById(id: string): LocalChatSnapshot | null {
  const current = loadLocalChat();
  if (current?.conversationId === id) return current;
  return null;
}

export function listLocalChatHistory(): ChatHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function deriveTitle(messages: LocalChatSnapshot["messages"]): string {
  const first = messages.find((m) => m.role === "user")?.content;
  if (!first) return "Cosmic conversation";
  return first.length > 40 ? `${first.slice(0, 40)}…` : first;
}

function lastUserPreview(messages: LocalChatSnapshot["messages"]): string {
  const users = messages.filter((m) => m.role === "user");
  const last = users.at(-1)?.content ?? "New reading";
  return last.length > 60 ? `${last.slice(0, 60)}…` : last;
}

export async function ensureFirebaseConversation(
  userId: string,
  existingId: string | null
): Promise<string | null> {
  if (!isFirebaseConfigured() || !userId) return null;
  try {
    const { createConversation } = await import("./firestore");
    if (existingId) return existingId;
    return await createConversation(userId);
  } catch {
    return null;
  }
}

export async function persistMessageToFirestore(
  conversationId: string,
  message: { role: string; content: string; id?: string }
): Promise<void> {
  if (!isFirebaseConfigured()) return;
  try {
    const { addMessage, updateConversation } = await import("./firestore");
    await addMessage(conversationId, {
      role: message.role as "user" | "assistant",
      content: message.content,
    });
    if (message.role === "user") {
      await updateConversation(conversationId, {});
    }
  } catch {
    // Best-effort — local storage remains source of truth offline
  }
}

export async function trackAnalytics(
  userId: string | null,
  event: string,
  properties?: Record<string, string | number | boolean>
): Promise<void> {
  if (!isFirebaseConfigured()) return;
  try {
    const { logAnalyticsEvent } = await import("./firestore");
    await logAnalyticsEvent(userId ?? "anonymous", event, properties);
  } catch {
    // Non-blocking
  }
}
