"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Template } from "@/types";
import TemplatePreview from "./TemplatePreview";
import { motion, AnimatePresence } from "framer-motion";

interface TemplateGridProps {
  templates: Template[];
  categories: string[];
}

export default function TemplateGrid({ templates, categories }: TemplateGridProps) {
  const mainCategories = categories.slice(0, 8);
  const extraCategories = categories.slice(8);
  const [activeFilter, setActiveFilter] = useState<string>("Tous");
  const [showExtra, setShowExtra] = useState(false);

  function getCategoryCount(category: string) {
    if (category === "Tous") return templates.length;
    return templates.filter((t) => t.category === category).length;
  }

  const filteredTemplates =
    activeFilter === "Tous"
      ? templates
      : templates.filter((t) => t.category === activeFilter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {mainCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
              activeFilter === category
                ? "bg-accent text-white shadow-md"
                : "bg-white text-text-muted border border-border hover:border-accent/50 hover:text-accent"
            )}
          >
            {category}{" "}
            <span className={cn(
              "text-xs",
              activeFilter === category ? "text-white/70" : "text-text-muted/60"
            )}>
              ({getCategoryCount(category)})
            </span>
          </button>
        ))}

        {/* Expandable extra categories */}
        <AnimatePresence>
          {showExtra &&
            extraCategories.map((category) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
                  activeFilter === category
                    ? "bg-accent text-white shadow-md"
                    : "bg-white text-text-muted border border-border hover:border-accent/50 hover:text-accent"
                )}
              >
                {category}{" "}
                <span className={cn(
                  "text-xs",
                  activeFilter === category ? "text-white/70" : "text-text-muted/60"
                )}>
                  ({getCategoryCount(category)})
                </span>
              </motion.button>
            ))}
        </AnimatePresence>

        {extraCategories.length > 0 && (
          <button
            onClick={() => setShowExtra(!showExtra)}
            className="rounded-full border border-dashed border-border px-5 py-2 text-sm font-semibold text-text-muted transition-all duration-200 hover:border-accent/50 hover:text-accent"
          >
            {showExtra ? "Moins" : `+${extraCategories.length} secteurs`}
          </button>
        )}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: index * 0.05,
              }}
            >
              <TemplatePreview template={template} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredTemplates.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-text-muted text-lg">
            Aucun template dans cette catégorie pour le moment.
          </p>
        </div>
      )}
    </div>
  );
}
