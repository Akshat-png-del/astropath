"use client";

import { useEffect } from "react";
import { subscribeToMessages } from "@/lib/firebase/firestore";
import { useAppStore } from "@/stores/useAppStore";
import type { ConversationMessage } from "@/types";

export function useChatListener(conversationId: string | null) {
  const setMessages = useAppStore((s) => s.setMessages);

  useEffect(() => {
    if (!conversationId) return;

    const unsubscribe = subscribeToMessages(
      conversationId,
      (messages: ConversationMessage[]) => {
        setMessages(messages);
      }
    );

    return unsubscribe;
  }, [conversationId, setMessages]);
}
