"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import BlogCard from "./BlogCard";

interface BlogPostListing {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image: string;
  tags: string[];
}

interface BlogGridProps {
  posts: BlogPostListing[];
  categories: string[];
}

export default function BlogGrid({ posts, categories }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredPosts =
    activeCategory === "Tous"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const activeCategories = categories.filter((cat) =>
    posts.some((p) => p.category === cat)
  );

  return (
    <div>
      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {["Tous", ...activeCategories].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              activeCategory === category
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-text-muted border border-border hover:border-primary/30 hover:text-primary"
            )}
            type="button"
          >
            {category}
            {category !== "Tous" && (
              <span className="ml-1.5 text-xs opacity-70">
                ({posts.filter((p) => p.category === category).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-text-muted">
            Aucun article dans cette categorie pour le moment.
          </p>
        </div>
      )}
    </div>
  );
}
