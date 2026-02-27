"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { FORMSPREE_ENDPOINT, DASHBOARD_LEADS_ENDPOINT } from "@/lib/constants";
import { getTrackingSessionId } from "@/components/analytics/SiteTracker";
import { getReferralCode } from "@/lib/referral";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  referrer: string;
}

const subjectOptions = [
  { value: "", label: "Sélectionnez un sujet" },
  { value: "site-vitrine", label: "Site Vitrine" },
  { value: "e-commerce", label: "E-Commerce" },
  { value: "reseaux-sociaux", label: "Réseaux Sociaux" },
  { value: "autre", label: "Autre" },
];

const inputClasses =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-text text-sm placeholder:text-text-muted/60 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    referrer: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      // Essayer le dashboard CRM d'abord
      let dashboardOk = false;
      try {
        const dashRes = await fetch(DASHBOARD_LEADS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "contact",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            sessionId: getTrackingSessionId() || undefined,
            sourcePage: window.location.pathname,
            referralCode: formData.referrer || getReferralCode() || undefined,
          }),
        });
        dashboardOk = dashRes.ok;
      } catch {
        // Dashboard indisponible — fallback Formspree
      }

      // Fallback Formspree
      if (!dashboardOk) {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          }),
        });
        if (!response.ok) {
          setStatus("error");
          return;
        }
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "", referrer: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
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
        <h3 className="font-heading text-xl font-bold text-green-800">
          Message envoyé !
        </h3>
        <p className="mt-2 text-green-700">
          Merci pour votre message. Je vous répondrai dans les 24 heures.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-green-700 underline hover:text-green-900"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nom */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-primary">
          Nom complet <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Jean Dupont"
          className={inputClasses}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-primary">
          Email <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="jean@exemple.fr"
          className={inputClasses}
        />
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-primary">
          Téléphone <span className="text-text-muted text-xs font-normal">(optionnel)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="06 12 34 56 78"
          className={inputClasses}
        />
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-primary">
          Sujet <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className={cn(inputClasses, "appearance-none cursor-pointer pr-10")}
          >
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value} disabled={option.value === ""}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-primary">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Décrivez votre projet, vos besoins, vos délais..."
          className={cn(inputClasses, "resize-y")}
        />
      </div>

      {/* Referrer */}
      <div>
        <label htmlFor="referrer" className="mb-1.5 block text-sm font-semibold text-primary">
          Qui vous a recommandé ?{" "}
          <span className="text-text-muted text-xs font-normal">(optionnel)</span>
        </label>
        <input
          type="text"
          id="referrer"
          name="referrer"
          value={formData.referrer}
          onChange={handleChange}
          placeholder="Nom ou code parrain (ex : REF-MARC)"
          className={inputClasses}
        />
      </div>

      {/* Error message */}
      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Une erreur est survenue. Veuillez réessayer ou me contacter directement
          par email.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "w-full rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-dark hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 sm:w-auto",
          status === "submitting" && "cursor-not-allowed opacity-70"
        )}
      >
        {status === "submitting" ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-5 w-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
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
            Envoi en cours...
          </span>
        ) : (
          "Envoyer mon message"
        )}
      </button>
    </form>
  );
}
