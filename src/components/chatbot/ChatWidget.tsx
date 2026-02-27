"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import type {
  ChatMessage,
  ChatSession,
  LeadData,
  QuickReply,
} from "@/lib/chatbot/types";
import {
  loadSession,
  saveSession,
  getIsOpen,
  setIsOpen,
  processAction,
  getWelcomeMessages,
  streamOpenAI,
  getProactiveTrigger,
  exitIntentMessage,
  FALLBACK_MESSAGE,
  MAX_MESSAGES_PER_SESSION,
} from "@/lib/chatbot/engine";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getCurrentPage(): string {
  if (typeof window === "undefined") return "/";
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return path;
}

export default function ChatWidget() {
  const [isOpen, setOpen] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  const sessionRef = useRef<ChatSession | null>(null);
  const proactiveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initRef = useRef(false);

  // Keep ref in sync
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  // --- Initialize ---
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const loaded = loadSession();
    const wasOpen = getIsOpen();

    if (loaded.messages.length > 0) {
      // Restore existing session
      setSession(loaded);
      setOpen(wasOpen);
      // Restore quick replies from last flow state
      const welcome = getWelcomeMessages(getCurrentPage());
      if (loaded.flowState.step === "welcome") {
        setQuickReplies(welcome.quickReplies);
      }
      if (loaded.flowState.step === "capture-lead") {
        setShowLeadForm(true);
      }
    } else {
      // New session — show welcome
      const page = getCurrentPage();
      const result = getWelcomeMessages(page);
      const newSession: ChatSession = {
        ...loaded,
        messages: result.messages,
        flowState: result.flowState,
        leadData: result.leadData,
      };
      setSession(newSession);
      setQuickReplies(result.quickReplies);
      saveSession(newSession);
    }

    // Setup proactive trigger
    setupProactiveTrigger();

    return () => {
      if (proactiveTimerRef.current) clearTimeout(proactiveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Save session on every update ---
  useEffect(() => {
    if (session) saveSession(session);
  }, [session]);

  // --- Persist open state ---
  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  // --- Exit intent detection (desktop) ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    function handleMouseLeave(e: MouseEvent) {
      if (
        e.clientY <= 0 &&
        sessionRef.current &&
        !sessionRef.current.hasInteracted &&
        !sessionRef.current.triggerShown
      ) {
        triggerProactiveMessage(exitIntentMessage);
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Proactive trigger ---
  function setupProactiveTrigger() {
    const page = getCurrentPage();
    const trigger = getProactiveTrigger(page);

    if (!trigger) return;

    proactiveTimerRef.current = setTimeout(() => {
      const current = sessionRef.current;
      if (current && !current.hasInteracted && !current.triggerShown) {
        triggerProactiveMessage(trigger.message);
      }
    }, trigger.delay);
  }

  function triggerProactiveMessage(message: string) {
    setSession((prev) => {
      if (!prev || prev.triggerShown) return prev;
      return { ...prev, triggerShown: true };
    });
    setShowBadge(true);

    // Add bot message
    const msg: ChatMessage = {
      id: generateId(),
      role: "bot",
      content: message,
      contentType: "text",
      timestamp: Date.now(),
    };

    setSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: [...prev.messages, msg],
        triggerShown: true,
      };
    });
  }

  // --- Handle open/close ---
  const handleOpen = useCallback(() => {
    setOpen(true);
    setShowBadge(false);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSession((prev) => {
      if (!prev) return prev;
      return { ...prev, lastClosedAt: Date.now() };
    });
  }, []);

  // --- Add messages with typing delay ---
  const addBotMessages = useCallback(
    (messages: ChatMessage[], replies: QuickReply[]) => {
      if (messages.length === 0) {
        setQuickReplies(replies);
        return;
      }

      setIsTyping(true);
      setQuickReplies([]);

      let delay = 0;
      messages.forEach((msg, i) => {
        const typingTime = Math.min(
          400 + msg.content.length * 8,
          1200
        );
        delay += i === 0 ? 600 : typingTime;

        setTimeout(() => {
          setSession((prev) => {
            if (!prev) return prev;
            return { ...prev, messages: [...prev.messages, msg] };
          });

          // Check for lead form
          if (msg.contentType === "lead-form") {
            setShowLeadForm(true);
          }

          // Last message → stop typing, show quick replies
          if (i === messages.length - 1) {
            setIsTyping(false);
            setQuickReplies(replies);
          }
        }, delay);
      });
    },
    []
  );

  // --- Handle quick reply ---
  const handleQuickReply = useCallback(
    (value: string) => {
      if (!session) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content:
          quickReplies.find((qr) => qr.value === value)?.label ?? value,
        contentType: "text",
        timestamp: Date.now(),
      };

      const updatedSession: ChatSession = {
        ...session,
        messages: [...session.messages, userMessage],
        hasInteracted: true,
        messageCount: session.messageCount + 1,
      };

      setSession(updatedSession);
      setShowLeadForm(false);

      const result = processAction(
        { type: "QUICK_REPLY", value },
        updatedSession,
        getCurrentPage()
      );

      setSession((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          flowState: result.flowState,
          leadData: result.leadData,
        };
      });

      addBotMessages(result.messages, result.quickReplies);
    },
    [session, quickReplies, addBotMessages]
  );

  // --- Handle free text ---
  const handleSend = useCallback(
    (text: string) => {
      if (!session) return;

      if (session.messageCount >= MAX_MESSAGES_PER_SESSION) {
        const limitMsg: ChatMessage = {
          id: generateId(),
          role: "bot",
          content:
            "Vous avez atteint la limite de messages. Contactez Kevin au 06 09 30 63 35 pour continuer.",
          contentType: "text",
          timestamp: Date.now(),
        };
        setSession((prev) =>
          prev ? { ...prev, messages: [...prev.messages, limitMsg] } : prev
        );
        return;
      }

      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: text,
        contentType: "text",
        timestamp: Date.now(),
      };

      const updatedSession: ChatSession = {
        ...session,
        messages: [...session.messages, userMessage],
        hasInteracted: true,
        messageCount: session.messageCount + 1,
      };
      setSession(updatedSession);
      setShowLeadForm(false);

      // Try flow engine first
      const result = processAction(
        { type: "FREE_TEXT", text },
        updatedSession,
        getCurrentPage()
      );

      setSession((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          flowState: result.flowState,
          leadData: result.leadData,
        };
      });

      // If engine returned messages → use them
      if (result.messages.length > 0) {
        addBotMessages(result.messages, result.quickReplies);
        return;
      }

      // Otherwise → OpenAI streaming
      setIsTyping(true);
      setQuickReplies([]);

      const botMsgId = generateId();
      const streamingMsg: ChatMessage = {
        id: botMsgId,
        role: "bot",
        content: "",
        contentType: "text",
        timestamp: Date.now(),
      };

      // Add empty bot message that we'll stream into
      setTimeout(() => {
        setIsTyping(false);
        setSession((prev) => {
          if (!prev) return prev;
          return { ...prev, messages: [...prev.messages, streamingMsg] };
        });

        const conversationHistory = updatedSession.messages
          .filter((m) => m.contentType === "text" && m.content)
          .slice(-6)
          .map((m) => ({
            role: m.role === "bot" ? "assistant" : "user",
            content: m.content,
          }));

        streamOpenAI(
          conversationHistory,
          updatedSession.id,
          {
            page: getCurrentPage(),
            sector: updatedSession.leadData.sector,
            projectType: updatedSession.leadData.projectType,
          },
          // onToken
          (token: string) => {
            setSession((prev) => {
              if (!prev) return prev;
              const msgs = [...prev.messages];
              const lastIdx = msgs.findIndex((m) => m.id === botMsgId);
              if (lastIdx >= 0) {
                msgs[lastIdx] = {
                  ...msgs[lastIdx],
                  content: msgs[lastIdx].content + token,
                };
              }
              return { ...prev, messages: msgs };
            });
          },
          // onDone
          () => {
            setQuickReplies([
              {
                id: "qr-ai-devis",
                label: "Demander un devis",
                value: "devis",
              },
              {
                id: "qr-ai-autre",
                label: "Autre question",
                value: "question",
              },
            ]);
          },
          // onError
          () => {
            setSession((prev) => {
              if (!prev) return prev;
              const msgs = [...prev.messages];
              const lastIdx = msgs.findIndex((m) => m.id === botMsgId);
              if (lastIdx >= 0) {
                msgs[lastIdx] = {
                  ...msgs[lastIdx],
                  content: FALLBACK_MESSAGE,
                };
              }
              return { ...prev, messages: msgs };
            });
            setQuickReplies([
              {
                id: "qr-err-devis",
                label: "Demander un devis",
                value: "devis",
              },
            ]);
          }
        );
      }, 800);
    },
    [session, addBotMessages]
  );

  // --- Handle lead submit ---
  const handleLeadSubmit = useCallback(
    (data: LeadData) => {
      if (!session) return;

      setShowLeadForm(false);

      const result = processAction(
        { type: "LEAD_SUBMIT", data },
        session,
        getCurrentPage()
      );

      setSession((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          flowState: result.flowState,
          leadData: result.leadData,
        };
      });

      addBotMessages(result.messages, result.quickReplies);
    },
    [session, addBotMessages]
  );

  if (!session) return null;

  return (
    <>
      {/* FAB Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: 3,
            }}
            onClick={handleOpen}
            className="fixed bottom-22 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark shadow-lg shadow-accent/30 transition-shadow hover:shadow-xl hover:shadow-accent/40 max-md:bottom-18 max-md:right-4 max-md:h-12 max-md:w-12"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
            aria-label="Ouvrir le chat"
          >
            {/* Chat bubble icon */}
            <svg
              className="h-6 w-6 text-white max-md:h-5 max-md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>

            {/* Notification badge */}
            {showBadge && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-red-500"
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[59] bg-black/20 backdrop-blur-sm md:hidden"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="fixed z-[60] flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl max-md:inset-0 max-md:rounded-none max-md:border-0 md:bottom-40 md:right-6 md:h-[560px] md:max-h-[75vh] md:w-[400px]"
            >
              <ChatHeader onClose={handleClose} />
              <ChatMessages
                messages={session.messages}
                isTyping={isTyping}
                quickReplies={quickReplies}
                onQuickReply={handleQuickReply}
                onLeadSubmit={handleLeadSubmit}
                leadData={session.leadData}
                showLeadForm={showLeadForm}
              />
              <ChatInput
                onSend={handleSend}
                disabled={isTyping}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
