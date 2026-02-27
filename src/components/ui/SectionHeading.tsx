import { cn } from "@/lib/utils";
import Badge from "./Badge";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2";
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  align = "center",
  dark = false,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <Badge className="mb-4 inline-block">{badge}</Badge>
      )}
      <Tag
        className={cn(
          "font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-primary"
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lg",
            align === "center" && "mx-auto",
            dark ? "text-gray-300" : "text-text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
