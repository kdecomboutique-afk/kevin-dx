"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import TemplateThumb from "@/components/ui/TemplateThumb";
import { cn } from "@/lib/utils";

interface TemplateListing {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  lighthouseScore?: number;
}

interface TemplateShowcaseProps {
  templates: TemplateListing[];
}

const curatedCategories = [
  "Tous",
  "Restaurant",
  "Artisan",
  "BTP",
  "Beauté",
  "E-commerce",
  "Santé",
];

const MAX_DISPLAY = 6;

export default function TemplateShowcase({ templates }: TemplateShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredTemplates =
    activeCategory === "Tous"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  const displayedTemplates = filteredTemplates.slice(0, MAX_DISPLAY);

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Templates"
          title="Des templates pensés pour votre secteur"
          subtitle="Choisissez parmi mes modèles optimisés et personnalisables, prêts à être adaptés à votre activité."
        />

        {/* Filter tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {curatedCategories.map((category) => (
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

        {/* Template grid - 3 columns */}
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
                <Link href={`/templates/${template.id}`} className="block">
                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <TemplateThumb
                      src={template.image}
                      alt={template.title}
                      category={template.category}
                      lighthouseScore={template.lighthouseScore}
                    />

                    <div className="p-5">
                      <h3 className="font-heading text-base font-bold text-primary">
                        {template.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-text-muted line-clamp-2">
                        {template.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {template.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="default">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-center">
          <Button href="/templates" variant="secondary" size="lg">
            Voir les {templates.length} templates
          </Button>
        </div>
      </Container>
    </section>
  );
}
