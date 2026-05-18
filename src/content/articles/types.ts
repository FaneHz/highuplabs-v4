export interface ArticleBlock {
  type: "p" | "h2" | "h3" | "ul" | "ol" | "callout" | "table";
  text?: string;
  items?: string[];
  title?: string;
  tone?: "ink" | "warning" | "success" | "red" | "lime";
  headers?: string[];
  rows?: string[][];
}

export interface ArticleTranslation {
  title: string;
  hook: string;
  metaTitle: string;
  metaDescription: string;
  blocks: ArticleBlock[];
}

export interface Article {
  slug: string;
  publishedAt: string;
  readTime: { ro: string; en: string };
  tag: string;
  translations: {
    ro: ArticleTranslation;
    en: ArticleTranslation;
  };
}
