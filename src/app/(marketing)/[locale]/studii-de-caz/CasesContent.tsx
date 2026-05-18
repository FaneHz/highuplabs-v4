"use client";

import Link from "next/link";
import { allCases } from "@/content/cases";
import { useTranslations, useLocale } from "@/lib/i18n-context";

export default function CasesContent() {
  const locale = useLocale();
  const t = useTranslations("cases");

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

        <div className="space-y-0 border border-[#1A1A1A]">
          {allCases.map((c) => {
            const ct = c.translations[locale as "ro" | "en"] || c.translations.ro;
            return (
              <Link
                key={c.slug}
                href={`/${locale}/studii-de-caz/${c.slug}`}
                className="group block border-b border-[#1A1A1A] last:border-b-0 hover:bg-[#0A0A0A] transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  <div className="p-8 md:p-12 lg:border-r border-[#1A1A1A]">
                    <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em] mb-4">
                      {ct.industry}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-[#CCFF00] transition-colors">
                      {ct.title}
                    </h2>
                    <p className="mt-4 text-sm text-[#A3A3A3] leading-relaxed">{ct.hook}</p>
                    {c.isNda && (
                      <div className="mt-4 inline-block px-3 py-1 border border-[#EF3E36] text-[10px] font-mono text-[#EF3E36] uppercase tracking-wider">
                        {t("ndaBadge")}
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-2 grid grid-cols-3 gap-0">
                    {ct.heroStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="p-8 md:p-12 border-l border-[#1A1A1A] first:border-l-0 flex flex-col justify-center"
                      >
                        <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-2">
                          {stat.label}
                        </div>
                        <div
                          className={`text-2xl md:text-4xl font-black ${
                            stat.highlight ? "text-[#CCFF00]" : "text-white"
                          } group-hover:text-[#CCFF00] transition-colors`}
                        >
                          {stat.value}
                        </div>
                      </div>
                    ))}
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
