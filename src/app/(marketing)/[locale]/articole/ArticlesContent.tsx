"use client";

import Link from "next/link";
import { allArticles } from "@/content/articles";
import { useLocale, useTranslations } from "@/lib/i18n-context";

export default function ArticlesContent() {
  const locale = useLocale();
  const t = useTranslations("articles");
  const articles = allArticles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
            {t("label")}
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-black uppercase tracking-[-0.05em] text-white">
            {t("title")}
          </h1>
          <p className="mt-4 text-base text-[#A3A3A3] max-w-xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="border border-[#1A1A1A]">
          {articles.map((article, i) => {
            const at = article.translations[locale as "ro" | "en"] || article.translations.ro;
            return (
              <Link
                key={article.slug}
                href={`/${locale}/articole/${article.slug}`}
                className="group block border-b border-[#1A1A1A] last:border-b-0 hover:bg-[#0A0A0A] transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  <div className="md:col-span-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#1A1A1A] flex items-center">
                    <span className="text-4xl md:text-5xl font-black text-[#1A1A1A] group-hover:text-[#CCFF00] transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-8 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.2em]">
                        {article.tag}
                      </span>
                      <span className="text-[10px] font-mono text-[#808080]">
                        {article.readTime[locale as "ro" | "en"] || article.readTime.ro}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#CCFF00] transition-colors leading-tight">
                      {at.title}
                    </h2>
                    <p className="mt-3 text-sm text-[#A3A3A3] line-clamp-2">{at.hook}</p>
                  </div>
                  <div className="md:col-span-3 p-6 md:p-8 border-t md:border-t-0 md:border-l border-[#1A1A1A] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider">
                      {article.publishedAt}
                    </span>
                    <span className="text-[10px] font-mono text-[#A3A3A3] group-hover:text-[#CCFF00] transition-colors">
                      {t("readLabel")} →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
