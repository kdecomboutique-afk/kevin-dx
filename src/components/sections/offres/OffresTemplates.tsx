"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import OffresTemplateCard from "./OffresTemplateCard";
import { cn } from "@/lib/utils";
import { Template } from "@/types";

const filterCategories = [
  "Tous",
  "Restaurant",
  "Artisan",
  "BTP",
  "Beauté",
  "E-commerce",
  "Santé",
];

const MAX_DISPLAY = 9;

interface OffresTemplatesProps {
  templates: Template[];
}

export default function OffresTemplates({ templates }: OffresTemplatesProps) {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredTemplates =
    activeCategory === "Tous"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  const displayedTemplates = filteredTemplates.slice(0, MAX_DISPLAY);

  return (
    <section id="templates" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="Templates"
          title="Achetez un template et lancez-vous"
          subtitle="Code source complet, documentation, support email 30 jours. Déployez votre site en quelques heures."
        />

        {/* Inclus */}
        <FadeIn>
          <div className="mx-auto mb-12 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
            {["Code source Next.js", "Documentation", "Support 30 jours", "Lighthouse 95+"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Filter pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                activeCategory === category
                  ? "bg-accent text-white shadow-md"
                  : "bg-white text-text-muted border border-border hover:border-accent/30 hover:text-accent"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayedTemplates.map((template, index) => (
              <FadeIn key={template.id} delay={index * 0.05}>
                <OffresTemplateCard template={template} />
              </FadeIn>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredTemplates.length > MAX_DISPLAY && (
          <div className="mt-12 text-center">
            <Button href="/templates" variant="secondary" size="lg">
              Voir les {templates.length} templates
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
