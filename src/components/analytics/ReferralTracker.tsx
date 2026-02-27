"use client";

import { useEffect } from "react";
import { captureReferralFromURL } from "@/lib/referral";

/**
 * Composant invisible monté dans le layout root.
 * Capture le paramètre ?ref=CODE de l'URL et le persiste dans localStorage.
 */
export default function ReferralTracker() {
  useEffect(() => {
    captureReferralFromURL();
  }, []);

  return null;
}
