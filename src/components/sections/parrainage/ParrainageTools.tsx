"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import { SITE_CONFIG } from "@/lib/constants";
import { shareTemplates } from "@/data/referral";

function generateCode(name: string): string {
  const cleaned = name
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z]/g, "");
  const short = cleaned.slice(0, 10) || "PARRAIN";
  return `REF-${short}`;
}

export default function ParrainageTools() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const referralLink = code ? `${SITE_CONFIG.url}?ref=${code}` : "";

  const handleGenerate = useCallback(() => {
    if (!name.trim()) return;
    setCode(generateCode(name));
  }, [name]);

  const copyToClipboard = useCallback(
    async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
      }
    },
    []
  );

  const whatsappUrl = referralLink
    ? `https://wa.me/?text=${encodeURIComponent(shareTemplates.whatsapp.replace("{link}", referralLink))}`
    : "";

  const smsBody = referralLink
    ? shareTemplates.sms.replace("{link}", referralLink)
    : "";

  const emailUrl = referralLink
    ? `mailto:?subject=${encodeURIComponent(shareTemplates.email.subject)}&body=${encodeURIComponent(shareTemplates.email.body.replace("{link}", referralLink))}`
    : "";

  return (
    <section id="devenir-parrain" className="py-20 lg:py-28 bg-surface scroll-mt-20">
      <Container>
        <SectionHeading
          badge="Vos outils de parrainage"
          title="Partagez en 1 clic"
          subtitle="Entrez votre prénom, obtenez votre lien personnalisé, et partagez-le facilement."
        />

        <div className="mx-auto max-w-2xl">
          {/* Code generator */}
          <FadeIn>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <label htmlFor="parrain-name" className="mb-2 block font-heading text-sm font-semibold text-primary">
                Votre prénom ou nom
              </label>
              <div className="flex gap-3">
                <input
                  id="parrain-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  placeholder="Ex : Marc, Julie, Entreprise Dupont..."
                  className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted/60 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!name.trim()}
                  className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Générer
                </button>
              </div>

              {/* Generated link */}
              <AnimatePresence>
                {code && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 space-y-4">
                      {/* Code */}
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
                          Votre code parrain
                        </p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 rounded-lg bg-primary/5 px-4 py-2.5 font-mono text-lg font-bold text-primary">
                            {code}
                          </code>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(code, "code")}
                            className="rounded-lg border border-border px-3 py-2.5 text-sm transition-colors hover:bg-surface"
                          >
                            {copied === "code" ? (
                              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Link */}
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
                          Votre lien personnalisé
                        </p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-primary/5 px-4 py-2.5 text-sm text-primary">
                            {referralLink}
                          </code>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(referralLink, "link")}
                            className="rounded-lg border border-border px-3 py-2.5 text-sm transition-colors hover:bg-surface"
                          >
                            {copied === "link" ? (
                              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Share buttons */}
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                          Partager directement
                        </p>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {/* WhatsApp */}
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-3 text-sm font-semibold text-[#25D366] transition-all duration-200 hover:bg-[#25D366] hover:text-white"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp
                          </a>

                          {/* SMS */}
                          <a
                            href={`sms:?body=${encodeURIComponent(smsBody)}`}
                            className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-500 hover:text-white"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>
                            SMS
                          </a>

                          {/* Email */}
                          <a
                            href={emailUrl}
                            className="flex items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm font-semibold text-purple-600 transition-all duration-200 hover:bg-purple-500 hover:text-white"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            Email
                          </a>

                          {/* Copy message */}
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(
                                shareTemplates.whatsapp.replace("{link}", referralLink),
                                "message"
                              )
                            }
                            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-text transition-all duration-200 hover:bg-surface"
                          >
                            {copied === "message" ? (
                              <>
                                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Copié !
                              </>
                            ) : (
                              <>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                Copier texte
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Tip */}
                      <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                        <p className="text-sm text-text-muted leading-relaxed">
                          <strong className="text-primary">Astuce :</strong> partagez ce lien par WhatsApp ou SMS à un pro qui a besoin d&apos;un site.
                          Le message est déjà pré-rédigé — il n&apos;y a qu&apos;à envoyer.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
