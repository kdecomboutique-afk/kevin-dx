"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Template } from "@/types";
import Badge from "@/components/ui/Badge";
import TemplateThumb from "@/components/ui/TemplateThumb";

interface TemplatePreviewProps {
  template: Template;
}

const MAX_VISIBLE_TAGS = 3;

export default function TemplatePreview({ template }: TemplatePreviewProps) {
  const visibleTags = template.tags.slice(0, MAX_VISIBLE_TAGS);
  const overflowCount = template.tags.length - MAX_VISIBLE_TAGS;

  return (
    <Link href={`/templates/${template.id}`}>
      <motion.div
        className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image container with glassmorphic overlay */}
        <div className="relative">
          <TemplateThumb
            src={template.image}
            alt={template.title}
            category={template.category}
            lighthouseScore={template.lighthouseScore}
            colorScheme={template.colorScheme}
          />

          {/* Category badge top-left */}
          <div className="absolute top-3 left-3 z-10">
            <span className="rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-primary shadow-sm">
              {template.category}
            </span>
          </div>

          {/* Glassmorphic slide-up overlay */}
          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-t border-white/50">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-primary">
                  Voir la démo
                </span>
                {template.lighthouseScore && (
                  <div className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5 text-green-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-xs font-bold text-green-700">
                      {template.lighthouseScore}/100
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-heading text-base font-bold text-primary">
            {template.title}
          </h3>
          <p className="mb-3 mt-1.5 text-sm text-text-muted leading-relaxed line-clamp-2">
            {template.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
            {overflowCount > 0 && (
              <Badge variant="default">+{overflowCount}</Badge>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
