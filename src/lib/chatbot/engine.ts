import { templates } from "@/data/templates";
import { services } from "@/data/services";
import type {
  ChatMessage,
  ChatSession,
  EngineAction,
  FlowState,
  LeadData,
  QuickReply,
  ServiceCardData,
  TemplateCardData,
} from "./types";
import {
  defaultWelcome,
  exitIntentMessage,
  leadMessages,
  pageWelcomes,
  proactiveTriggers,
  qualifyMessages,
  qualifySectorReplies,
  qualifyTypeReplies,
  sectorTemplateMap,
  serviceInfoMessages,
  OPENAI_SYSTEM_PROMPT,
} from "./flows";

const DASHBOARD_API = "https://kevin-dashboard-delta.vercel.app/api/chatbot";
const MAX_MESSAGES_PER_SESSION = 20;

// --- Session storage helpers ---
const STORAGE_KEY = "chatbot-session";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createEmptySession(): ChatSession {
  return {
    id: generateId(),
    messages: [],
    flowState: { step: "welcome" },
    leadData: {},
    hasInteracted: false,
    messageCount: 0,
    triggerShown: false,
  };
}

export function loadSession(): ChatSession {
  if (typeof window === "undefined") return createEmptySession();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ChatSession;
  } catch {
    // Corrupted data — start fresh
  }
  return createEmptySession();
}

export function saveSession(session: ChatSession): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Storage full — silently fail
  }
}

export function getIsOpen(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("chatbot-is-open") === "true";
}

export function setIsOpen(open: boolean): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("chatbot-is-open", String(open));
}

// --- Message factory ---
function botMsg(
  content: string,
  contentType: ChatMessage["contentType"] = "text",
  data?: ChatMessage["data"]
): ChatMessage {
  return {
    id: generateId(),
    role: "bot",
    content,
    contentType,
    timestamp: Date.now(),
    data,
  };
}

function userMsg(content: string): ChatMessage {
  return {
    id: generateId(),
    role: "user",
    content,
    contentType: "text",
    timestamp: Date.now(),
  };
}

// --- Service & template lookups ---
function getServiceData(serviceId: string): ServiceCardData | undefined {
  const s = services.find((svc) => svc.id === serviceId);
  if (!s) return undefined;
  return {
    id: s.id,
    title: s.title,
    price: s.price,
    priceNote: s.priceNote,
    features: s.features.slice(0, 4),
    href: s.href,
  };
}

function getTemplateData(templateId: string): TemplateCardData | undefined {
  const t = templates.find((tpl) => tpl.id === templateId);
  if (!t) return undefined;
  return {
    id: t.id,
    title: t.title,
    category: t.category,
    image: t.image,
    lighthouseScore: t.lighthouseScore ?? 95,
    price: t.price ?? 99,
  };
}

function getServiceForType(projectType: string): string {
  switch (projectType) {
    case "site-vitrine":
      return "site-vitrine";
    case "e-commerce":
      return "e-commerce";
    case "reseaux-sociaux":
      return "reseaux-sociaux";
    default:
      return "site-vitrine";
  }
}

function getTemplatesForSector(sector: string): string[] {
  return sectorTemplateMap[sector] ?? [];
}

// --- Online status ---
export function isOnline(): boolean {
  const now = new Date();
  const parisOffset = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "numeric",
    weekday: "short",
  })
    .formatToParts(now)
    .reduce(
      (acc, part) => {
        if (part.type === "weekday") acc.weekday = part.value;
        if (part.type === "hour") acc.hour = parseInt(part.value, 10);
        return acc;
      },
      { weekday: "", hour: 0 }
    );

  const weekdays = ["lun.", "mar.", "mer.", "jeu.", "ven."];
  const isWeekday = weekdays.includes(parisOffset.weekday);
  const isBusinessHour = parisOffset.hour >= 9 && parisOffset.hour < 18;
  return isWeekday && isBusinessHour;
}

// --- Core engine ---
export interface EngineResult {
  messages: ChatMessage[];
  quickReplies: QuickReply[];
  flowState: FlowState;
  leadData: Partial<LeadData>;
}

export function getWelcomeMessages(page: string): EngineResult {
  const welcome = pageWelcomes[page] ?? defaultWelcome;
  return {
    messages: [botMsg(welcome.message)],
    quickReplies: welcome.quickReplies,
    flowState: { step: "welcome" },
    leadData: { source: page },
  };
}

export function processAction(
  action: EngineAction,
  session: ChatSession,
  page: string
): EngineResult {
  const { flowState, leadData } = session;

  switch (action.type) {
    case "INIT":
      return getWelcomeMessages(action.page);

    case "QUICK_REPLY":
      return processQuickReply(action.value, flowState, leadData, page);

    case "FREE_TEXT":
      return processFreeText(action.text, flowState, leadData, page);

    case "LEAD_SUBMIT":
      return processLeadSubmit(action.data);

    default:
      return {
        messages: [],
        quickReplies: [],
        flowState,
        leadData,
      };
  }
}

function processQuickReply(
  value: string,
  flowState: FlowState,
  leadData: Partial<LeadData>,
  page: string
): EngineResult {
  // Navigation quick replies
  if (value === "offres" || value === "templates" || value === "question") {
    if (value === "offres") {
      return {
        messages: [botMsg(qualifyMessages.askType)],
        quickReplies: qualifyTypeReplies,
        flowState: { ...flowState, step: "qualify-type" },
        leadData: { ...leadData, source: page },
      };
    }
    if (value === "templates") {
      return {
        messages: [
          botMsg(
            "Nous avons 26 templates sectoriels premium. Dans quel secteur travaillez-vous ?"
          ),
        ],
        quickReplies: qualifySectorReplies,
        flowState: { ...flowState, step: "qualify-sector", projectType: "template" },
        leadData: { ...leadData, projectType: "template", source: page },
      };
    }
    // question → free-chat
    return {
      messages: [botMsg("Posez-moi votre question, je ferai de mon mieux pour y r\u00e9pondre !")],
      quickReplies: [],
      flowState: { ...flowState, step: "free-chat" },
      leadData: { ...leadData, source: page },
    };
  }

  if (value === "devis") {
    return {
      messages: [botMsg(leadMessages.askLead, "lead-form")],
      quickReplies: [],
      flowState: { ...flowState, step: "capture-lead" },
      leadData: { ...leadData, source: page },
    };
  }

  if (value === "qualify-sector") {
    return {
      messages: [botMsg(qualifyMessages.askSector)],
      quickReplies: qualifySectorReplies,
      flowState: { ...flowState, step: "qualify-sector" },
      leadData: { ...leadData, source: page },
    };
  }

  // Service info
  if (serviceInfoMessages[value]) {
    return {
      messages: [botMsg(serviceInfoMessages[value])],
      quickReplies: [
        { id: "qr-si-devis", label: "Demander un devis", value: "devis" },
        { id: "qr-si-question", label: "J'ai une question", value: "question" },
      ],
      flowState: { ...flowState, step: "free-chat" },
      leadData: { ...leadData, source: page },
    };
  }

  // Qualify type selection
  if (flowState.step === "qualify-type" || isProjectType(value)) {
    const projectType = value;
    return {
      messages: [botMsg(qualifyMessages.askSector)],
      quickReplies: qualifySectorReplies,
      flowState: {
        ...flowState,
        step: "qualify-sector",
        projectType,
      },
      leadData: { ...leadData, projectType, source: page },
    };
  }

  // Qualify sector selection
  if (flowState.step === "qualify-sector" || isSector(value)) {
    const sector = value;
    const projectType = flowState.projectType ?? "site-vitrine";
    const serviceId = getServiceForType(projectType);
    const serviceData = getServiceData(serviceId);
    const templateIds = getTemplatesForSector(sector);
    const firstTemplate = templateIds[0]
      ? getTemplateData(templateIds[0])
      : undefined;

    const msgs: ChatMessage[] = [];

    // Recommendation message
    msgs.push(
      botMsg(qualifyMessages.recommend(sector, serviceData?.title ?? "Site Vitrine"))
    );

    // Service card
    if (serviceData) {
      msgs.push(botMsg("", "service-card", serviceData));
    }

    // Template card
    if (firstTemplate) {
      msgs.push(botMsg(qualifyMessages.recommendTemplate(sector)));
      msgs.push(botMsg("", "template-card", firstTemplate));
    } else {
      msgs.push(botMsg(qualifyMessages.noTemplate));
    }

    return {
      messages: msgs,
      quickReplies: qualifyMessages.afterRecommend,
      flowState: {
        ...flowState,
        step: "recommend",
        sector,
        recommendedService: serviceId,
        recommendedTemplates: templateIds,
      },
      leadData: {
        ...leadData,
        sector,
        projectType,
        recommendedTemplate: templateIds[0],
        source: page,
      },
    };
  }

  // Fallback
  return {
    messages: [botMsg("Je ne suis pas s\u00fbr de comprendre. Pouvez-vous reformuler ?")],
    quickReplies: [
      { id: "qr-fb-offres", label: "Voir les offres", value: "offres" },
      { id: "qr-fb-devis", label: "Demander un devis", value: "devis" },
    ],
    flowState,
    leadData: { ...leadData, source: page },
  };
}

function processFreeText(
  text: string,
  flowState: FlowState,
  leadData: Partial<LeadData>,
  page: string
): EngineResult {
  const lower = text.toLowerCase().trim();

  // Keyword matching → route to flows
  if (/devis|prix|tarif|combien|co[uû]t/.test(lower)) {
    return processQuickReply("devis", flowState, leadData, page);
  }
  if (/vitrine/.test(lower)) {
    return processQuickReply("info-vitrine", flowState, leadData, page);
  }
  if (/e-?commerce|boutique en ligne/.test(lower)) {
    return processQuickReply("info-ecommerce", flowState, leadData, page);
  }
  if (/r[eé]seaux|instagram|facebook|tiktok/.test(lower)) {
    return processQuickReply("info-reseaux", flowState, leadData, page);
  }
  if (/template/.test(lower)) {
    return processQuickReply("templates", flowState, leadData, page);
  }

  // If in qualify-type flow, try to match project type
  if (flowState.step === "qualify-type") {
    if (/vitrine|site/.test(lower))
      return processQuickReply("site-vitrine", flowState, leadData, page);
    if (/commerce|boutique/.test(lower))
      return processQuickReply("e-commerce", flowState, leadData, page);
    if (/r[eé]seaux|social/.test(lower))
      return processQuickReply("reseaux-sociaux", flowState, leadData, page);
  }

  // If in qualify-sector flow, try to match sector
  if (flowState.step === "qualify-sector") {
    const matchedSector = matchSector(lower);
    if (matchedSector) {
      return processQuickReply(matchedSector, flowState, leadData, page);
    }
  }

  // Default: free-chat (will be handled by OpenAI via streaming)
  return {
    messages: [], // Empty — caller will use OpenAI streaming
    quickReplies: [],
    flowState: { ...flowState, step: "free-chat" },
    leadData: { ...leadData, source: page },
  };
}

function processLeadSubmit(data: LeadData): EngineResult {
  return {
    messages: [botMsg(leadMessages.confirmLead)],
    quickReplies: leadMessages.confirmLeadReplies,
    flowState: { step: "confirm" },
    leadData: data,
  };
}

// --- Helpers ---
function isProjectType(value: string): boolean {
  return ["site-vitrine", "e-commerce", "reseaux-sociaux", "template"].includes(value);
}

function isSector(value: string): boolean {
  return Object.keys(sectorTemplateMap).includes(value) || value === "Autre";
}

function matchSector(text: string): string | null {
  const sectorKeywords: Record<string, string[]> = {
    Restaurant: ["restaurant", "resto", "cuisine", "traiteur", "food"],
    Artisan: ["artisan", "btp", "b\u00e2timent", "plombier", "electricien", "menuisier", "ma\u00e7on"],
    Commerce: ["commerce", "magasin", "boutique"],
    "Beauté": ["beaut\u00e9", "coiffure", "esth\u00e9tique", "salon", "spa"],
    Immobilier: ["immobilier", "immo", "agence immobili\u00e8re"],
    "Santé": ["sant\u00e9", "m\u00e9decin", "kin\u00e9", "ost\u00e9o", "cabinet"],
    Autre: ["autre"],
  };

  for (const [sector, keywords] of Object.entries(sectorKeywords)) {
    if (keywords.some((kw) => text.includes(kw))) return sector;
  }
  return null;
}

// --- OpenAI streaming ---
export async function streamOpenAI(
  messages: Array<{ role: string; content: string }>,
  sessionId: string,
  context: { page: string; sector?: string; projectType?: string },
  onToken: (token: string) => void,
  onDone: () => void,
  onError: (error: string) => void
): Promise<void> {
  try {
    const response = await fetch(DASHBOARD_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: OPENAI_SYSTEM_PROMPT },
          ...messages.slice(-6), // Last 6 messages for context
        ],
        context,
        sessionId,
      }),
    });

    if (!response.ok) {
      onError("fallback");
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      onError("fallback");
      return;
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") {
            onDone();
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) onToken(token);
          } catch {
            // Skip malformed SSE chunks
          }
        }
      }
    }

    onDone();
  } catch {
    onError("fallback");
  }
}

export const FALLBACK_MESSAGE =
  "Pour cette question, contactez Kevin directement au 06 09 30 63 35 ou par email \u00e0 kdecom.boutique@gmail.com";

// --- Proactive triggers ---
export function getProactiveTrigger(
  page: string
): { delay: number; message: string } | null {
  return proactiveTriggers[page] ?? null;
}

export { exitIntentMessage, MAX_MESSAGES_PER_SESSION };
