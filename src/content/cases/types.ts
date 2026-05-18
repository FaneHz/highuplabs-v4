export interface CaseStat {
  value: string;
  label: string;
  highlight?: boolean;
}

export interface CaseSection {
  type: "narrative" | "discovery" | "strategy" | "screenshots" | "numbers" | "mistakes" | "learnings" | "quote";
  heading?: string;
  paragraphs?: string[];
  intro?: string;
  items?: string[];
  steps?: { title: string; body: string }[];
  shots?: { src: string; alt: string; caption: string }[];
  rows?: { label: string; before: string; after: string; note?: string }[];
  text?: string;
  attribution?: string;
}

export interface CaseTranslation {
  title: string;
  subtitle: string;
  industry: string;
  metaTitle: string;
  metaDescription: string;
  hook: string;
  heroStats: CaseStat[];
  sections: CaseSection[];
}

export interface CaseStudy {
  slug: string;
  publishedAt: string;
  readTime: { ro: string; en: string };
  isNda?: boolean;
  translations: {
    ro: CaseTranslation;
    en: CaseTranslation;
  };
}
