"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_CONSENT_KEY = "kevin-dx-cookie-consent";

type ConsentState = "accepted" | "refused" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === "accepted" || stored === "refused") {
      setConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  }

  function handleRefuse() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "refused");
    setConsent("refused");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alertdialog"
          aria-label="Consentement cookies"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-white p-5 shadow-2xl shadow-black/10 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="flex-1">
                <h3 className="font-heading text-sm font-bold text-primary sm:text-base">
                  Nous respectons votre vie privée
                </h3>
                <p className="mt-1 text-xs text-text-muted sm:text-sm leading-relaxed">
                  Ce site utilise des cookies pour améliorer votre expérience et
                  mesurer l&apos;audience. Vous pouvez accepter ou refuser les
                  cookies non essentiels.{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="text-accent underline hover:text-accent-dark"
                  >
                    En savoir plus
                  </Link>
                </p>
              </div>

              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={handleRefuse}
                  className="rounded-xl border-2 border-border px-4 py-2 text-xs font-semibold text-text-muted transition-colors hover:border-primary hover:text-primary sm:text-sm"
                >
                  Refuser
                </button>
                <button
                  type="button"
                  onClick={handleAccept}
                  className="rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-dark sm:text-sm"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
