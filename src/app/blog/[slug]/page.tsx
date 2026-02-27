import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import ArticleRenderer from "@/components/sections/blog/ArticleRenderer";
import BlogSidebar from "@/components/sections/blog/BlogSidebar";
import BlogCard from "@/components/sections/blog/BlogCard";
import ShareButtons from "@/components/sections/blog/ShareButtons";
import { blogPosts } from "@/data/blog-posts";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Article introuvable" };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_CONFIG.url}/blog/${slug}`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categoryGradients: Record<string, string> = {
  Guide: "from-primary to-secondary",
  Conseil: "from-accent to-accent-light",
  Tendances: "from-secondary to-primary-light",
  SEO: "from-green-500 to-teal-500",
  Business: "from-primary-dark to-primary",
};

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const gradient =
    categoryGradients[post.category] || "from-primary to-secondary";

  // Related posts: same category first, then different, excluding current
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category)
        return -1;
      if (b.category === post.category && a.category !== post.category)
        return 1;
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    })
    .slice(0, 3);

  // JSON-LD structured data (safe: all data is static, not user-supplied)
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  });

  return (
    <>
      {/* JSON-LD structured data - safe: all data from static blogPosts, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Article header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface via-white to-primary/5 py-12 sm:py-16">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <Container className="relative">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
            <Link
              href="/"
              className="transition-colors hover:text-primary"
            >
              Accueil
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="transition-colors hover:text-primary"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-text truncate max-w-xs">{post.title}</span>
          </nav>

          <div className="max-w-3xl">
            <Badge className="mb-4">{post.category}</Badge>

            <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  K
                </div>
                <span className="font-medium text-text">{post.author}</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-text-muted/40" />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span className="h-1 w-1 rounded-full bg-text-muted/40" />
              <span>{post.readTime} de lecture</span>
            </div>
          </div>

          {/* Article image placeholder */}
          <div
            className={cn(
              "mt-8 h-56 w-full rounded-2xl bg-gradient-to-br sm:h-72 lg:h-80",
              gradient
            )}
          >
            <div className="flex h-full items-center justify-center">
              <svg
                className="h-16 w-16 text-white/20"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21z"
                />
              </svg>
            </div>
          </div>
        </Container>
      </section>

      {/* Article body + sidebar */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* Main content */}
            <div>
              <ArticleRenderer sections={post.content} />

              {/* Tags */}
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
                <span className="text-sm font-medium text-text-muted">
                  Tags :
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <div className="mt-6 border-t border-border pt-6">
                <ShareButtons title={post.title} />
              </div>
            </div>

            {/* Sidebar */}
            <BlogSidebar currentSlug={post.slug} className="hidden lg:block" />
          </div>

          {/* Mobile sidebar */}
          <div className="mt-12 lg:hidden">
            <BlogSidebar currentSlug={post.slug} />
          </div>
        </Container>
      </section>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-surface py-16 sm:py-20">
          <Container>
            <h2 className="mb-8 font-heading text-2xl font-bold text-primary sm:text-3xl">
              Articles similaires
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
