export type MessageRole = "bot" | "user";

export type MessageContentType =
  | "text"
  | "service-card"
  | "template-card"
  | "lead-form"
  | "typing";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  contentType: MessageContentType;
  timestamp: number;
  data?: ServiceCardData | TemplateCardData;
}

export interface ServiceCardData {
  id: string;
  title: string;
  price: string;
  priceNote?: string;
  features: string[];
  href: string;
}

export interface TemplateCardData {
  id: string;
  title: string;
  category: string;
  image: string;
  lighthouseScore: number;
  price: number;
}

export interface QuickReply {
  id: string;
  label: string;
  value: string;
}

export type FlowStep =
  | "welcome"
  | "qualify-type"
  | "qualify-sector"
  | "qualify-needs"
  | "recommend"
  | "capture-lead"
  | "confirm"
  | "free-chat";

export interface FlowState {
  step: FlowStep;
  projectType?: string;
  sector?: string;
  needs?: string[];
  recommendedService?: string;
  recommendedTemplates?: string[];
}

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  sector?: string;
  needs?: string[];
  recommendedTemplate?: string;
  source: string;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  flowState: FlowState;
  leadData: Partial<LeadData>;
  hasInteracted: boolean;
  messageCount: number;
  lastClosedAt?: number;
  triggerShown: boolean;
}

export type EngineAction =
  | { type: "QUICK_REPLY"; value: string }
  | { type: "FREE_TEXT"; text: string }
  | { type: "LEAD_SUBMIT"; data: LeadData }
  | { type: "INIT"; page: string };
