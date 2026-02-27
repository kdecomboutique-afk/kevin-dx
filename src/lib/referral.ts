"use client";

const REFERRAL_STORAGE_KEY = "kdx_referral_code";
const REFERRAL_EXPIRY_KEY = "kdx_referral_expiry";
const REFERRAL_TTL_DAYS = 30;

/**
 * Sauvegarde un code parrain dans localStorage (persistant 30 jours).
 * Appelé automatiquement quand ?ref= est détecté dans l'URL.
 */
export function saveReferralCode(code: string): void {
  if (typeof window === "undefined") return;
  const expiry = Date.now() + REFERRAL_TTL_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(REFERRAL_STORAGE_KEY, code.toUpperCase().trim());
  localStorage.setItem(REFERRAL_EXPIRY_KEY, expiry.toString());
}

/**
 * Récupère le code parrain stocké (ou null si expiré/absent).
 */
export function getReferralCode(): string | null {
  if (typeof window === "undefined") return null;
  const code = localStorage.getItem(REFERRAL_STORAGE_KEY);
  const expiry = localStorage.getItem(REFERRAL_EXPIRY_KEY);

  if (!code || !expiry) return null;

  if (Date.now() > parseInt(expiry, 10)) {
    localStorage.removeItem(REFERRAL_STORAGE_KEY);
    localStorage.removeItem(REFERRAL_EXPIRY_KEY);
    return null;
  }

  return code;
}

/**
 * Extrait ?ref=CODE de l'URL et le sauvegarde.
 * Retourne le code trouvé ou null.
 */
export function captureReferralFromURL(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref && ref.trim().length > 0) {
    saveReferralCode(ref);
    return ref.toUpperCase().trim();
  }
  return getReferralCode();
}
