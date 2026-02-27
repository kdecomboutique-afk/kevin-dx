"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navigation.map((item) => {
        const isActive =
          pathname === item.href ||
          item.children?.some((child) => pathname === child.href);

        if (item.children) {
          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "text-accent"
                    : "text-text-muted hover:text-text hover:bg-black/5"
                )}
              >
                {item.label}
                <svg
                  className={cn(
                    "inline-block ml-1 w-3 h-3 transition-transform",
                    openDropdown === item.label && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-border py-2 z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-colors",
                        pathname === child.href
                          ? "text-accent bg-accent/5"
                          : "text-text-muted hover:text-text hover:bg-surface"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "text-accent"
                : "text-text-muted hover:text-text hover:bg-black/5"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
