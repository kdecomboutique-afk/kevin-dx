"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { QuickReply } from "@/lib/chatbot/types";

interface ChatQuickRepliesProps {
  replies: QuickReply[];
  onSelect: (value: string) => void;
  visible: boolean;
}

export default function ChatQuickReplies({
  replies,
  onSelect,
  visible,
}: ChatQuickRepliesProps) {
  return (
    <AnimatePresence mode="wait">
      {visible && replies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap gap-2 px-4 pb-2"
        >
          {replies.map((reply, i) => (
            <motion.button
              key={reply.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              onClick={() => onSelect(reply.value)}
              className="rounded-xl border-2 border-accent/20 bg-white px-3.5 py-2 text-xs font-semibold text-accent transition-all duration-200 hover:border-accent/40 hover:bg-accent/5 active:scale-95"
            >
              {reply.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
