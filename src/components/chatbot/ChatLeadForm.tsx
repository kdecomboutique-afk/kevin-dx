"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FORMSPREE_ENDPOINT, DASHBOARD_LEADS_ENDPOINT } from "@/lib/constants";
import { getTrackingSessionId } from "@/components/analytics/SiteTracker";
import { getReferralCode } from "@/lib/referral";
import type { LeadData } from "@/lib/chatbot/types";

interface ChatLeadFormProps {
  prefillData: Partial<LeadData>;
  onSubmit: (data: LeadData) => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-text-muted/50 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

export default function ChatLeadForm({
  prefillData,
  onSubmit,
}: ChatLeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("submitting");

    const leadData: LeadData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      projectType: prefillData.projectType,
      sector: prefillData.sector,
      needs: prefillData.needs,
      recommendedTemplate: prefillData.recommendedTemplate,
      source: prefillData.source ?? "chatbot",
    };

    try {
      // Essayer le dashboard CRM d'abord
      let dashboardOk = false;
      try {
        const dashRes = await fetch(DASHBOARD_LEADS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "chatbot",
            name: leadData.name,
            email: leadData.email,
            phone: leadData.phone ?? "",
            projectType: leadData.projectType ?? "",
            sector: leadData.sector ?? "",
            recommendedTemplate: leadData.recommendedTemplate ?? "",
            sessionId: getTrackingSessionId() || undefined,
            sourcePage: window.location.pathname,
            referralCode: getReferralCode() || undefined,
          }),
        });
        dashboardOk = dashRes.ok;
      } catch {
        // Dashboard indisponible — on continue avec Formspree
      }

      // Fallback Formspree si le dashboard a echoue
      if (!dashboardOk) {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: leadData.name,
            email: leadData.email,
            phone: leadData.phone ?? "",
            subject: `[Chatbot] ${leadData.projectType ?? "Demande"} — ${leadData.sector ?? "Non précisé"}`,
            message: [
              `Prospect via chatbot`,
              `Type de projet : ${leadData.projectType ?? "Non précisé"}`,
              `Secteur : ${leadData.sector ?? "Non précisé"}`,
              `Template recommandé : ${leadData.recommendedTemplate ?? "Aucun"}`,
              `Page source : ${leadData.source}`,
            ].join("\n"),
          }),
        });
        if (!response.ok) {
          setStatus("error");
          return;
        }
      }

      setStatus("success");
      onSubmit(leadData);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-4 rounded-xl border border-green-200 bg-green-50 p-4 text-center"
      >
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-5 w-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <p className="text-sm font-semibold text-green-800">Demande envoy&eacute;e !</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="mx-4 space-y-3 rounded-xl border border-border bg-white p-4 shadow-sm"
    >
      <div>
        <label htmlFor="chat-name" className="mb-1 block text-xs font-semibold text-primary">
          Nom <span className="text-accent">*</span>
        </label>
        <input
          id="chat-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jean Dupont"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="chat-email" className="mb-1 block text-xs font-semibold text-primary">
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="chat-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jean@exemple.fr"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="chat-phone" className="mb-1 block text-xs font-semibold text-primary">
          T&eacute;l&eacute;phone{" "}
          <span className="text-xs font-normal text-text-muted">(optionnel)</span>
        </label>
        <input
          id="chat-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="06 12 34 56 78"
          className={inputClasses}
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-600">
          Erreur d&apos;envoi. R&eacute;essayez ou appelez le 06 09 30 63 35.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Envoi...
          </span>
        ) : (
          "Recevoir mon devis gratuit"
        )}
      </button>

      <p className="text-center text-[10px] text-text-muted">
        Donn&eacute;es confidentielles. Z&eacute;ro spam.
      </p>
    </motion.form>
  );
}
