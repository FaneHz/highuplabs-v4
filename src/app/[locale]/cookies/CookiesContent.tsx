"use client";

import { useTranslations } from "@/lib/i18n-context";

export default function CookiesContent() {
  const t = useTranslations("cookies");
  const whatAre = t("whatAre") as { title: string; content: string };
  const categories = t("categories") as {
    title: string;
    essential: { label: string; badge: string; content: string };
    analytics: { label: string; content: string };
    marketing: { label: string; content: string };
  };
  const manage = t("manage") as { title: string; content: string };

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
          <p className="mt-4 text-sm text-[#A3A3A3]">
            {t("updated")}
          </p>
        </div>

        <div className="border border-[#1A1A1A] p-8 md:p-12 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-white mb-4">
              {whatAre.title}
            </h2>
            <p className="text-sm text-[#D4D4D8] leading-[1.7]">
              {whatAre.content}
            </p>
          </div>

          <div className="border-t border-[#1A1A1A] pt-8">
            <h2 className="text-lg font-bold text-white mb-4">
              {categories.title}
            </h2>

            <div className="space-y-6">
              <div className="border border-[#1A1A1A] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-wider">{categories.essential.label}</span>
                  <span className="text-[10px] font-mono text-[#CCFF00]">{categories.essential.badge}</span>
                </div>
                <p className="text-sm text-[#D4D4D8]">
                  {categories.essential.content}
                </p>
              </div>

              <div className="border border-[#1A1A1A] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider">{categories.analytics.label}</span>
                </div>
                <p className="text-sm text-[#D4D4D8]">
                  {categories.analytics.content}
                </p>
              </div>

              <div className="border border-[#1A1A1A] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider">{categories.marketing.label}</span>
                </div>
                <p className="text-sm text-[#D4D4D8]">
                  {categories.marketing.content}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1A1A1A] pt-8">
            <h2 className="text-lg font-bold text-white mb-4">
              {manage.title}
            </h2>
            <p className="text-sm text-[#D4D4D8] leading-[1.7]">
              {manage.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
