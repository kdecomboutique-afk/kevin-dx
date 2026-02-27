"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";

const quickLinks = [
  { label: "Accueil", href: "/" },
  { label: "Site Vitrine", href: "/site-vitrine" },
  { label: "E-Commerce", href: "/e-commerce" },
  { label: "Réseaux Sociaux", href: "/reseaux-sociaux" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          {/* Animated 404 SVG Illustration */}
          <motion.div
            className="mx-auto mb-8 w-64"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background shapes */}
              <motion.circle
                cx="200"
                cy="100"
                r="80"
                fill="#FF6B35"
                opacity="0.08"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="140"
                cy="80"
                r="40"
                fill="#0EA5E9"
                opacity="0.06"
                animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="280"
                cy="120"
                r="35"
                fill="#1E3A5F"
                opacity="0.06"
                animate={{ x: [0, -10, 0], y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              {/* 4 */}
              <text
                x="70"
                y="135"
                fontFamily="system-ui, sans-serif"
                fontSize="80"
                fontWeight="800"
                fill="#1E3A5F"
              >
                4
              </text>

              {/* 0 - as a circle/planet */}
              <circle cx="200" cy="100" r="45" fill="#FF6B35" />
              <circle cx="200" cy="100" r="38" fill="#FAFBFC" />
              <circle cx="200" cy="100" r="30" fill="#FF6B35" opacity="0.15" />
              {/* Orbit ring */}
              <motion.ellipse
                cx="200"
                cy="100"
                rx="55"
                ry="18"
                stroke="#FF6B35"
                strokeWidth="2"
                opacity="0.3"
                transform="rotate(-20 200 100)"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Orbiting dot */}
              <motion.circle
                cx="248"
                cy="85"
                r="5"
                fill="#FF6B35"
                animate={{
                  cx: [248, 200, 152, 200, 248],
                  cy: [85, 75, 85, 125, 85],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* 4 */}
              <text
                x="260"
                y="135"
                fontFamily="system-ui, sans-serif"
                fontSize="80"
                fontWeight="800"
                fill="#1E3A5F"
              >
                4
              </text>

              {/* Small stars/dots with twinkle */}
              <motion.circle
                cx="50" cy="40" r="2" fill="#0EA5E9"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="350" cy="50" r="2" fill="#0EA5E9"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.circle
                cx="100" cy="170" r="1.5" fill="#FF6B35"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              <motion.circle
                cx="320" cy="160" r="1.5" fill="#1E3A5F"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.circle
                cx="160" cy="30" r="1.5" fill="#FF6B35"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.7 }}
              />
              <motion.circle
                cx="300" cy="40" r="2" fill="#1E3A5F"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: 1.2 }}
              />
            </svg>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              Page introuvable
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              La page que vous cherchez n&apos;existe pas ou a été déplacée.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button href="/" size="lg">
              Retour à l&apos;accueil
            </Button>
          </motion.div>

          {/* "Vous cherchez peut-être..." section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Vous cherchez peut-être...
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-text transition-all hover:border-accent hover:text-accent hover:shadow-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
