"use client";

import { useTranslations } from "@/lib/i18n-context";

export default function PrivacyContent() {
  const t = useTranslations("privacy");

  const sections = t("sections") as Array<{ title: string; content: string }>;

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

        <div className="space-y-0 border border-[#1A1A1A]">
          {sections.map((s: any) => (
            <div key={s.num} className="p-8 md:p-12 border-b border-[#1A1A1A] last:border-b-0">
              <div className="flex items-start gap-6">
                <span className="text-[10px] font-mono text-[#CCFF00] flex-shrink-0 mt-1">{s.num}</span>
                <div>
                  <h2 className="text-lg font-bold text-white mb-3">{s.title}</h2>
                  <p className="text-sm text-[#D4D4D8] leading-[1.7]">{s.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 border border-[#1A1A1A] bg-[#0A0A0A]">
          <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2">
            {t("dpoLabel")}
          </div>
          <p className="text-sm text-white">{t("dpoEmail")}</p>
          <p className="text-sm text-[#A3A3A3]">{t("dpoAddress")}</p>
        </div>
      </div>
    </div>
  );
}
