import Link from "next/link";
import { cn } from "@/lib/utils";

const categoryBadgeColors: Record<string, string> = {
  Guide: "bg-primary/10 text-primary",
  Conseil: "bg-accent/10 text-accent",
  Tendances: "bg-secondary/10 text-secondary",
  SEO: "bg-green-100 text-green-700",
  Business: "bg-primary/10 text-primary",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface BlogCardPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
}

interface BlogCardProps {
  post: BlogCardPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const badgeColor = categoryBadgeColors[post.category] || "bg-primary/10 text-primary";

  return (
    <article className="group transition-transform duration-200 ease-out hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-accent/5 group-hover:border-accent/20">
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <span
              className={cn(
                "absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold",
                badgeColor
              )}
              style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
            >
              <span className={cn("text-xs font-semibold", badgeColor.split(" ").pop())}>
                {post.category}
              </span>
            </span>
          </div>

          <div className="p-5">
            <h3 className="font-heading text-lg font-bold leading-snug text-primary transition-colors group-hover:text-accent line-clamp-2">
              {post.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-2">
              {post.excerpt}
            </p>

            <div className="mt-4 flex items-center gap-3 text-xs text-text-muted">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span className="h-1 w-1 rounded-full bg-text-muted/40" />
              <span>{post.readTime} de lecture</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
