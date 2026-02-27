"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ChatMessage as ChatMessageType, ServiceCardData, TemplateCardData } from "@/lib/chatbot/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ServiceCard({ data }: { data: ServiceCardData }) {
  return (
    <div className="mx-4 max-w-[280px] overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="p-4">
        <h4 className="font-heading text-sm font-bold text-primary">
          {data.title}
        </h4>
        <p className="mt-1">
          <span className="text-xs text-text-muted">{data.priceNote ?? "À partir de"} </span>
          <span className="text-lg font-bold text-accent">{data.price} &euro;</span>
        </p>
        <ul className="mt-3 space-y-1.5">
          {data.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-text-muted">
              <svg
                className="h-3.5 w-3.5 shrink-0 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <Link
          href={`/devis?service=${data.id}`}
          className="mt-3 block w-full rounded-lg bg-accent px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Demander un devis
        </Link>
      </div>
    </div>
  );
}

function TemplateCard({ data }: { data: TemplateCardData }) {
  return (
    <div className="mx-4 max-w-[280px] overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="relative h-36 w-full bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.image}
          alt={data.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute right-2 top-2 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-white">
          {data.category}
        </span>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h4 className="font-heading text-sm font-bold text-primary">
            {data.title}
          </h4>
          <span className="text-sm font-bold text-accent">{data.price} &euro;</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-text-muted">
          <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
          Lighthouse {data.lighthouseScore}/100
        </div>
        <Link
          href={`/site-internet-${data.id.replace("template-", "")}`}
          className="mt-2.5 block w-full rounded-lg border-2 border-accent/20 px-3 py-1.5 text-center text-xs font-semibold text-accent transition-colors hover:border-accent/40 hover:bg-accent/5"
        >
          Voir la d&eacute;mo
        </Link>
      </div>
    </div>
  );
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "bot";

  // Service card
  if (message.contentType === "service-card" && message.data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="mb-3"
      >
        <ServiceCard data={message.data as ServiceCardData} />
      </motion.div>
    );
  }

  // Template card
  if (message.contentType === "template-card" && message.data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="mb-3"
      >
        <TemplateCard data={message.data as TemplateCardData} />
      </motion.div>
    );
  }

  // Lead form placeholder (actual form is rendered by ChatMessages)
  if (message.contentType === "lead-form") {
    return null;
  }

  // Text message
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3 px-4`}
    >
      <div className="flex flex-col">
        <div
          className={`whitespace-pre-wrap text-sm leading-relaxed ${
            isBot
              ? "max-w-[85%] rounded-2xl rounded-bl-md bg-surface text-text"
              : "max-w-[75%] rounded-2xl rounded-br-md bg-accent text-white"
          } px-4 py-2.5`}
        >
          {message.content}
        </div>
        <span
          className={`mt-0.5 text-[10px] text-text-muted/60 ${
            isBot ? "text-left" : "text-right"
          }`}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}
