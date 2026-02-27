import Link from "next/link";
import { cn } from "@/lib/utils";
import { blogPosts, blogCategories } from "@/data/blog-posts";
import Button from "@/components/ui/Button";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface BlogSidebarProps {
  currentSlug?: string;
  className?: string;
}

export default function BlogSidebar({
  currentSlug,
  className,
}: BlogSidebarProps) {
  const recentPosts = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 4);

  return (
    <aside className={cn("space-y-8", className)}>
      {/* Articles recents */}
      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-heading text-lg font-bold text-primary">
          Articles recents
        </h3>
        <div className="mt-4 space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <p className="text-sm font-medium leading-snug text-text transition-colors group-hover:text-accent">
                {post.title}
              </p>
              <p className="mt-1 text-xs text-text-muted">
                {formatDate(post.publishedAt)} - {post.readTime}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-2xl border border-border bg-white p-5">
        <h3 className="font-heading text-lg font-bold text-primary">
          Categories
        </h3>
        <ul className="mt-4 space-y-2">
          {blogCategories.map((category) => {
            const count = blogPosts.filter(
              (p) => p.category === category
            ).length;
            if (count === 0) return null;
            return (
              <li key={category}>
                <Link
                  href={`/blog?category=${encodeURIComponent(category)}`}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface hover:text-primary"
                >
                  <span>{category}</span>
                  <span className="rounded-full bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary">
                    {count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/5 p-5">
        <h3 className="font-heading text-lg font-bold text-primary">
          Besoin d&apos;un site ?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          Obtenez un site web professionnel a partir de 599 euros. Devis gratuit
          et sans engagement.
        </p>
        <Button href="/contact" size="sm" className="mt-4 w-full">
          Demander un devis
        </Button>
      </div>
    </aside>
  );
}
