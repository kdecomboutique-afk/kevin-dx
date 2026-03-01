import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogGrid from "@/components/sections/blog/BlogGrid";
import { blogPosts, blogCategories } from "@/data/blog-posts";
import { createMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = createMetadata({
  title: "Blog - Conseils et Guides pour votre Présence Web",
  description:
    "Découvrez nos articles, guides et conseils pour créer et développer votre présence en ligne. Tarifs, astuces SEO, réseaux sociaux et plus encore.",
  path: "/blog",
});

// Strip content from blog posts — only listing data goes to the client
const postsListing = blogPosts.map(({ content, ...rest }) => rest);

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Accueil", href: "/" }, { name: "Blog", href: "/blog" }]} />
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface via-white to-primary/5 py-16 sm:py-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

        <Container className="relative">
          <SectionHeading
            as="h1"
            badge="Blog"
            title="Blog & Ressources"
            subtitle={`Conseils, guides et tendances pour développer votre présence en ligne. ${blogPosts.length} articles disponibles.`}
          />
        </Container>
      </section>

      {/* Blog grid */}
      <section className="py-16 sm:py-20">
        <Container>
          <BlogGrid posts={postsListing} categories={blogCategories} />
        </Container>
      </section>
    </>
  );
}
