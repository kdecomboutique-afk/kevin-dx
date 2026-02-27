import { cn } from "@/lib/utils";
import type { BlogSection } from "@/data/blog-posts";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const calloutStyles = {
  info: {
    container: "border-secondary/30 bg-secondary/5",
    icon: "text-secondary",
    iconPath:
      "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  tip: {
    container: "border-green-300/50 bg-green-50",
    icon: "text-green-600",
    iconPath:
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  warning: {
    container: "border-accent/30 bg-accent/5",
    icon: "text-accent",
    iconPath:
      "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  },
};

interface ArticleRendererProps {
  sections: BlogSection[];
}

export default function ArticleRenderer({ sections }: ArticleRendererProps) {
  return (
    <div className="prose-custom">
      {sections.map((section, index) => {
        switch (section.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="mb-5 text-base leading-relaxed text-text/90 sm:text-lg sm:leading-relaxed"
              >
                {section.content}
              </p>
            );

          case "heading": {
            const id = slugify(section.content);
            if (section.level === 3) {
              return (
                <h3
                  key={index}
                  id={id}
                  className="mb-3 mt-8 font-heading text-xl font-bold text-primary sm:text-2xl"
                >
                  {section.content}
                </h3>
              );
            }
            return (
              <h2
                key={index}
                id={id}
                className="mb-4 mt-10 font-heading text-2xl font-bold text-primary sm:text-3xl"
              >
                {section.content}
              </h2>
            );
          }

          case "list":
            return (
              <ul key={index} className="mb-5 space-y-2 pl-1">
                {section.items?.map((item, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-text/90 sm:text-lg">
                    <svg
                      className="mt-1.5 h-4 w-4 shrink-0 text-accent"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="my-8 border-l-4 border-accent/40 bg-accent/5 py-4 pl-6 pr-4 italic text-text/80 rounded-r-xl"
              >
                <p className="text-base leading-relaxed sm:text-lg">
                  {section.content}
                </p>
              </blockquote>
            );

          case "callout": {
            const style =
              calloutStyles[section.variant || "info"];
            return (
              <div
                key={index}
                className={cn(
                  "my-6 flex gap-3 rounded-xl border p-4 sm:p-5",
                  style.container
                )}
              >
                <svg
                  className={cn("mt-0.5 h-5 w-5 shrink-0", style.icon)}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={style.iconPath}
                  />
                </svg>
                <p className="text-sm leading-relaxed text-text/80 sm:text-base">
                  {section.content}
                </p>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
