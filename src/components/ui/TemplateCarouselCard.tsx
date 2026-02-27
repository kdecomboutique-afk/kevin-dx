"use client";

import Link from "next/link";
import TemplateThumb from "@/components/ui/TemplateThumb";
import Badge from "@/components/ui/Badge";

interface TemplateCarouselCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  lighthouseScore?: number;
  price?: number;
  isDragging: boolean;
}

export default function TemplateCarouselCard({
  id,
  title,
  category,
  image,
  description,
  tags,
  lighthouseScore,
  price,
  isDragging,
}: TemplateCarouselCardProps) {
  return (
    <Link
      href={`/templates/${id}`}
      className="block w-[260px] md:w-[320px] flex-shrink-0"
      onClick={(e) => {
        if (isDragging) e.preventDefault();
      }}
      draggable={false}
    >
      <div className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <TemplateThumb
          src={image}
          alt={title}
          category={category}
          lighthouseScore={lighthouseScore}
        />

        <div className="p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <Badge variant="accent" className="text-[10px]">
              {category}
            </Badge>
            {price !== undefined && (
              <span className="text-sm font-bold text-accent">
                {price}&thinsp;&euro;
              </span>
            )}
          </div>

          <h3 className="font-heading text-sm font-bold text-primary md:text-base">
            {title}
          </h3>
          <p className="mt-1 text-xs text-text-muted line-clamp-2 md:text-sm">
            {description}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
