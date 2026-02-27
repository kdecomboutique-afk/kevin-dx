"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import type { ChatMessage as ChatMessageType, LeadData, QuickReply } from "@/lib/chatbot/types";
import ChatMessage from "./ChatMessage";
import ChatTypingIndicator from "./ChatTypingIndicator";
import ChatQuickReplies from "./ChatQuickReplies";
import ChatLeadForm from "./ChatLeadForm";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isTyping: boolean;
  quickReplies: QuickReply[];
  onQuickReply: (value: string) => void;
  onLeadSubmit: (data: LeadData) => void;
  leadData: Partial<LeadData>;
  showLeadForm: boolean;
}

export default function ChatMessages({
  messages,
  isTyping,
  quickReplies,
  onQuickReply,
  onLeadSubmit,
  leadData,
  showLeadForm,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, quickReplies, showLeadForm]);

  return (
    <div
      ref={containerRef}
      className="chat-scrollbar flex-1 overflow-y-auto py-4"
    >
      <AnimatePresence mode="popLayout">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </AnimatePresence>

      {showLeadForm && (
        <ChatLeadForm prefillData={leadData} onSubmit={onLeadSubmit} />
      )}

      {isTyping && <ChatTypingIndicator />}

      <ChatQuickReplies
        replies={quickReplies}
        onSelect={onQuickReply}
        visible={!isTyping && !showLeadForm}
      />

      <div ref={bottomRef} />
    </div>
  );
}
