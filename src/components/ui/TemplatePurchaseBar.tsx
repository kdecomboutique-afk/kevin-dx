"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import type { Template } from "@/types";

interface TemplatePurchaseBarProps {
  template: Template;
}

export default function TemplatePurchaseBar({ template }: TemplatePurchaseBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const buyUrl = template.purchaseUrl || `/devis?pack=template-${template.id}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            {/* Template info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <span className="hidden rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent sm:inline-flex">
                  {template.category}
                </span>
                <h3 className="truncate font-heading text-sm font-bold text-primary sm:text-base">
                  {template.title}
                </h3>
              </div>
              <p className="mt-0.5 hidden text-xs text-text-muted sm:block">
                Code source + documentation + support 30 jours
              </p>
            </div>

            {/* Price + CTA */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="font-heading text-2xl font-bold text-primary">
                  {template.price || 99}&euro;
                </span>
                <span className="ml-1 hidden text-xs text-text-muted sm:inline">
                  TTC
                </span>
              </div>
              <Button href={buyUrl} variant="primary" size="lg">
                Acheter
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
