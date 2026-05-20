"use client";

import { useTranslations } from "@/lib/i18n-context";

export default function AboutContent() {
  const t = useTranslations("about");

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
            {t("label")}
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-black uppercase tracking-[-0.05em] text-white">
            {t("title")}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <p className="text-lg md:text-xl text-[#D4D4D8] leading-[1.7]">
              {t("story.p1")}
            </p>
          </div>
          <div>
            <p className="text-base text-[#A3A3A3] leading-[1.7]">
              {t("story.p2")}
            </p>
            <p className="text-base text-[#A3A3A3] leading-[1.7] mt-4">
              {t("story.p3")}
            </p>
          </div>
        </div>

        {/* The model */}
        <div className="border-t-2 border-[#CCFF00] pt-20 mb-24">
          <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em] mb-12">
            {t("model.label")}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#1A1A1A]">
            {(t.raw("model.items") as unknown as Array<{ num: string; title: string; desc: string }>).map((v) => (
              <div key={v.num} className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r last:border-r-0 border-[#1A1A1A]">
                <div className="text-[10px] font-mono text-[#CCFF00] mb-4">{v.num}</div>
                <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-sm text-[#A3A3A3] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="border border-[#1A1A1A] pt-20 mb-24 bg-[#0A0A0A]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em] mb-12">
              {t("values.label")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {(t.raw("values.items") as unknown as Array<{ num: string; title: string; desc: string }>).map((v) => (
                <div key={v.num} className="p-8 md:p-12 border-b md:border-r border-[#1A1A1A] last:border-b-0 even:md:border-r-0">
                  <div className="text-[10px] font-mono text-[#CCFF00] mb-4">{v.num}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company data */}
        <div className="border border-[#1A1A1A] p-8 md:p-12 bg-[#0A0A0A]">
          <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em] mb-8">
            {t("company.label")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2">
                {t("company.nameLabel")}
              </div>
              <div className="text-base text-white">
                {t("company.name")}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2">
                {t("company.cuiLabel")}
              </div>
              <div className="text-base text-white">{t("company.cui")}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2">
                {t("company.hqLabel")}
              </div>
              <div className="text-base text-white">{t("company.hq")}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2">
                {t("company.contactLabel")}
              </div>
              <div className="text-base text-white">{t("company.contact")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
