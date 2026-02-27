"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/types";

interface AccordionProps {
  items: FAQ[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {items.map((item, index) => {
        const isOpen = openIndices.has(index);
        return (
          <div key={index}>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className={cn(
                "flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface",
                index === 0 && "rounded-t-2xl",
                index === items.length - 1 && !isOpen && "rounded-b-2xl"
              )}
            >
              <span className="font-heading text-base font-semibold text-primary sm:text-lg">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="8" y1="2" x2="8" y2="14" />
                  <line x1="2" y1="8" x2="14" y2="8" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "px-6 pb-5 text-text-muted leading-relaxed",
                      index === items.length - 1 && "rounded-b-2xl"
                    )}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
