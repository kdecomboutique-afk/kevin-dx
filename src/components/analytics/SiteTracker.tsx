"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const DASHBOARD_TRACK_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_TRACK_URL ||
  "https://kevin-dashboard-delta.vercel.app/api/track";

/**
 * Recupere ou cree un sessionId unique pour la session de navigation.
 * Stocke dans sessionStorage (persiste dans l'onglet, reset a la fermeture).
 */
function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  const key = "_sid";
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

/**
 * Utilitaire exporte pour que les formulaires puissent attacher le sessionId
 */
export function getTrackingSessionId(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("_sid") || "";
}

/**
 * Envoie un pageview au dashboard
 */
function trackPageview(path: string) {
  const sessionId = getOrCreateSessionId();
  if (!sessionId) return;

  const payload = {
    domain: "kevin-dx.fr",
    path,
    referrer: document.referrer || "",
    screen: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || "",
    sessionId,
  };

  // Utilise sendBeacon si possible (ne bloque pas la navigation)
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      DASHBOARD_TRACK_URL,
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );
  } else {
    fetch(DASHBOARD_TRACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Silently fail — tracking is non-critical
    });
  }
}

/**
 * Composant invisible qui track les pageviews.
 * A monter dans le layout root.
 */
export default function SiteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);

  return null;
}
