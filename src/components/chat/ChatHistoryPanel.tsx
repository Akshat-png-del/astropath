"use client";

import { useEffect, useState } from "react";
import {
  listLocalChatHistory,
  listFirebaseChatHistory,
  type ChatHistoryItem,
} from "@/lib/firebase/chat-persistence";
import { STELLAR_PLAN_NAME } from "@/lib/brand";
import { History, X, Cloud } from "lucide-react";

interface ChatHistoryPanelProps {
  open: boolean;
  onClose: () => void;
  currentId: string | null;
  onSelect: (id: string, source?: "local" | "cloud") => void;
  onNewChat: () => void;
  userId?: string | null;
  cloudHistory?: boolean;
}

export function ChatHistoryPanel({
  open,
  onClose,
  currentId,
  onSelect,
  onNewChat,
  userId,
  cloudHistory = false,
}: ChatHistoryPanelProps) {
  const [items, setItems] = useState<ChatHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const local = listLocalChatHistory();
    if (userId && cloudHistory) {
      listFirebaseChatHistory(userId).then((cloud) => {
        const merged = [...cloud, ...local.filter((l) => !cloud.some((c) => c.id === l.id))];
        setItems(merged);
        setLoading(false);
      });
    } else {
      setItems(local);
      setLoading(false);
    }
  }, [open, userId, cloudHistory]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed sm:absolute inset-y-0 left-0 z-50 w-[min(100%,280px)] sm:w-64 border-r border-white/[0.06] bg-[#050505]/95 backdrop-blur-2xl flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
          <div className="flex items-center gap-2 text-white/50">
            <History className="w-4 h-4" />
            <span className="text-xs tracking-wider uppercase">Saved chats</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/30 hover:text-white/60 p-1"
            aria-label="Close history"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            onNewChat();
            onClose();
          }}
          className="mx-3 mt-3 py-2.5 rounded-xl border border-white/10 text-xs text-white/50 hover:bg-white/[0.04] transition-colors"
        >
          + New reading
        </button>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
          {loading ? (
            <p className="text-xs text-white/25 px-2 py-4">Loading…</p>
          ) : items.length === 0 ? (
            <p className="text-xs text-white/25 px-2 py-4 leading-relaxed">
              Conversations save as you chat. Sign in for cloud sync on the {STELLAR_PLAN_NAME} plan.
            </p>
          ) : (
            items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id, item.source);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl border transition-colors ${
                  currentId === item.id
                    ? "border-white/20 bg-white/[0.06]"
                    : "border-white/[0.05] hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-white/55 truncate flex-1">{item.title}</p>
                  {item.source === "cloud" && <Cloud className="w-3 h-3 text-white/20 flex-shrink-0" />}
                </div>
                <p className="text-[10px] text-white/25 mt-1 truncate">{item.preview}</p>
                <p className="text-[9px] text-white/15 mt-1">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </p>
              </button>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
