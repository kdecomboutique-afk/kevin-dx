"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ViewportMode = "desktop" | "tablet" | "mobile";

interface TemplateDemoViewerProps {
  isOpen: boolean;
  onClose: () => void;
  templateTitle: string;
  children: React.ReactNode;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const viewportConfig: Record<ViewportMode, { maxWidth: string; label: string }> = {
  desktop: { maxWidth: "100%", label: "Desktop" },
  tablet: { maxWidth: "768px", label: "Tablette" },
  mobile: { maxWidth: "375px", label: "Mobile" },
};

export default function TemplateDemoViewer({
  isOpen,
  onClose,
  templateTitle,
  children,
}: TemplateDemoViewerProps) {
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setViewport("desktop");
    onClose();
  }, [onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, handleClose]);

  // Scroll reset on open
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  const fakeUrl = `www.${slugify(templateTitle)}.fr`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Démo du template ${templateTitle}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex h-full w-full max-h-[95vh] max-w-[95vw] flex-col overflow-hidden rounded-xl bg-[#1e1e1e] shadow-2xl"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#2d2d2d] px-4 py-2.5 shrink-0">
              {/* macOS dots */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClose}
                  className="h-3 w-3 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
                  aria-label="Fermer"
                />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>

              {/* URL bar */}
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 rounded-md bg-[#1a1a1a] px-4 py-1.5 text-xs text-white/50 max-w-md w-full">
                  <svg className="h-3 w-3 shrink-0 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="truncate">{fakeUrl}</span>
                </div>
              </div>

              {/* Viewport toggle + close */}
              <div className="flex items-center gap-1">
                {/* Desktop icon */}
                <button
                  onClick={() => setViewport("desktop")}
                  className={`rounded-md p-1.5 transition-colors ${viewport === "desktop" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                  aria-label="Vue desktop"
                  title="Desktop"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </button>

                {/* Tablet icon */}
                <button
                  onClick={() => setViewport("tablet")}
                  className={`rounded-md p-1.5 transition-colors ${viewport === "tablet" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                  aria-label="Vue tablette"
                  title="Tablette"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </button>

                {/* Mobile icon */}
                <button
                  onClick={() => setViewport("mobile")}
                  className={`rounded-md p-1.5 transition-colors ${viewport === "mobile" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                  aria-label="Vue mobile"
                  title="Mobile"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </button>

                {/* Separator */}
                <div className="mx-1 h-4 w-px bg-white/10" />

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Fermer la démo"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Viewport content */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto bg-white"
            >
              <div
                className="mx-auto transition-all duration-300 ease-in-out"
                style={{ maxWidth: viewportConfig[viewport].maxWidth }}
              >
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
