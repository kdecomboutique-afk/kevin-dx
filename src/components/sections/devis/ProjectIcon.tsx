import { cn } from "@/lib/utils";
import type { ProjectTypeId } from "@/data/quote-options";

export default function ProjectIcon({
  type,
  className,
}: {
  type: ProjectTypeId;
  className?: string;
}) {
  const base = cn("shrink-0", className);
  switch (type) {
    case "vitrine":
      return (
        <svg
          className={base}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M2 7h20" />
        </svg>
      );
    case "ecommerce":
      return (
        <svg
          className={base}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
        </svg>
      );
    case "reseaux":
      return (
        <svg
          className={base}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
          <path d="M5 3l1.5 1.5" />
          <path d="M19 3l-1.5 1.5" />
          <path d="M12 2v1" />
          <circle cx="17" cy="4" r="1.5" fill="currentColor" />
          <path d="M16 12h5" />
          <path d="M18.5 9.5v5" />
        </svg>
      );
  }
}
