"use client";

import { isOnline } from "@/lib/chatbot/engine";

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  const online = isOnline();

  return (
    <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-primary to-primary-dark px-4 py-3.5">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-sm">
          KD
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Kevin DX</p>
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                online ? "bg-green-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className="text-[11px] text-white/70">
              {online ? "En ligne" : "R\u00e9pond sous 24h"}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Fermer le chat"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
