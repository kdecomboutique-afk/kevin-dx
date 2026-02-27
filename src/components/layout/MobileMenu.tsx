"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="font-heading text-lg font-bold text-primary">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface transition-colors"
                aria-label="Fermer le menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="p-6 space-y-2">
              {navigation.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.label} className="space-y-1">
                      <span className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                        {item.label}
                      </span>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={cn(
                            "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            pathname === child.href
                              ? "text-accent bg-accent/10"
                              : "text-text hover:bg-surface"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-accent bg-accent/10"
                        : "text-text hover:bg-surface"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-border mt-4">
                <Link
                  href="/devis"
                  onClick={onClose}
                  className="block w-full text-center px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-dark transition-colors"
                >
                  Devis gratuit
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
