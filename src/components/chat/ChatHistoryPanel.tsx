"use client";

import { useEffect, useState } from "react";
import { listLocalChatHistory, type ChatHistoryItem } from "@/lib/firebase/chat-persistence";
import { History, X } from "lucide-react";

interface ChatHistoryPanelProps {
  open: boolean;
  onClose: () => void;
  currentId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

export function ChatHistoryPanel({
  open,
  onClose,
  currentId,
  onSelect,
  onNewChat,
}: ChatHistoryPanelProps) {
  const [items, setItems] = useState<ChatHistoryItem[]>([]);

  useEffect(() => {
    if (open) setItems(listLocalChatHistory());
  }, [open]);

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
          {items.length === 0 ? (
            <p className="text-xs text-white/25 px-2 py-4 leading-relaxed">
              Conversations save automatically as you chat. Sign in to sync across devices.
            </p>
          ) : (
            items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl border transition-colors ${
                  currentId === item.id
                    ? "border-white/20 bg-white/[0.06]"
                    : "border-white/[0.05] hover:bg-white/[0.03]"
                }`}
              >
                <p className="text-xs text-white/55 truncate">{item.title}</p>
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
