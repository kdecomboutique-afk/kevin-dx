export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  priceNote?: string;
  features: string[];
  icon: string;
  href: string;
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface Template {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  lighthouseScore?: number;
  price?: number;
  purchaseUrl?: string;
  colorScheme?: { primary: string; accent: string; bg: string };
  longDescription?: string;
  sections?: string[];
  idealFor?: string[];
  keyFeatures?: { title: string; description: string }[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

export interface PricingTier {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  href: string;
}

export interface SocialStat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
}

export interface CaseStudyPainPoint {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudyMetric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  clientType: string;
  clientName: string;
  city: string;
  region: string;
  templateId: string;
  templateName: string;
  heroMetric: { value: string; label: string };
  tagline: string;
  challenge: {
    intro: string;
    painPoints: CaseStudyPainPoint[];
  };
  solution: {
    intro: string;
    features: { title: string; description: string }[];
    tech: string[];
    price: string;
    duration: string;
  };
  results: CaseStudyMetric[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    rating: number;
  };
  colorScheme: { primary: string; accent: string };
  lighthouseScore: number;
  seoTitle: string;
  seoDescription: string;
}
