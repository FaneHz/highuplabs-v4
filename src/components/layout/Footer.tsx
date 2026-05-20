"use client";

import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { useTranslations } from "@/lib/i18n-context";

export default function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const tickerItems = [
    "5-10% COMISION",
    "ZERO RETAINER",
    "90 ZILE GARANTIE",
    "POAS > ROAS",
    "CONTURILE TALE",
    "PITESTI, RO",
    "BRAND SCALING",
    "META ADS",
    "GOOGLE ADS",
    "TIKTOK ADS",
  ];

  return (
    <footer className="border-t-2 border-[#CCFF00] bg-black">
      <div className="overflow-hidden border-b border-[#1A1A1A] py-3 bg-[#0A0A0A]">
        <div className="ticker flex whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="mx-8 text-xs font-mono text-[#A3A3A3] uppercase tracking-widest">
              {item}
              <span className="mx-8 text-[#CCFF00]">+</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          <div className="py-16 md:pr-12 md:border-r border-[#1A1A1A]">
            <Link
              href={`/${locale}`}
              className="font-mono text-lg font-bold tracking-widest uppercase text-white"
            >
              HIGH-UP.LABS
            </Link>
            <p className="mt-6 text-sm text-[#A3A3A3] leading-relaxed max-w-xs">
              Scalam branduri pe comision. Nu retainer. Nu bullshit. Doar cifre.
            </p>
            <div className="mt-8 space-y-1 text-xs font-mono text-[#A3A3A3]">
              <p className="text-white">{t("company")}</p>
              <p>{t("cui")}</p>
              <p>{t("location")}</p>
            </div>
          </div>

          <div className="py-16 md:px-12 md:border-r border-[#1A1A1A]">
            <h4 className="text-[10px] font-mono font-bold text-[#CCFF00] uppercase tracking-[0.2em] mb-8">
              {t("explore")}
            </h4>
            <ul className="space-y-4">
              {[
                { label: tNav("articles"), href: "/articole" },
                { label: tNav("caseStudies"), href: "/studii-de-caz" },
                { label: tNav("about"), href: "/despre" },
                { label: tNav("apply"), href: "/aplica" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-sm text-[#A3A3A3] hover:text-[#CCFF00] transition-colors underline-draw"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="py-16 md:px-12 md:border-r border-[#1A1A1A]">
            <h4 className="text-[10px] font-mono font-bold text-[#CCFF00] uppercase tracking-[0.2em] mb-8">
              {t("legal")}
            </h4>
            <ul className="space-y-4">
              {[
                { label: t("terms"), href: "/termeni" },
                { label: t("privacy"), href: "/confidentialitate" },
                { label: t("cookies"), href: "/cookies" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-sm text-[#A3A3A3] hover:text-[#CCFF00] transition-colors underline-draw"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="py-16 md:pl-12">
            <h4 className="text-[10px] font-mono font-bold text-[#CCFF00] uppercase tracking-[0.2em] mb-8">
              CONTACT
            </h4>
            <div className="space-y-4 text-sm text-[#A3A3A3]">
              <p className="hover:text-white transition-colors">{t("email")}</p>
              <p className="hover:text-white transition-colors">{t("phone")}</p>
            </div>
            <div className="mt-12 pt-8 border-t border-[#1A1A1A]">
              <p className="text-xs text-[#A3A3A3]">
                {t("madeIn")}
              </p>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> HIGH-UP.LABS — {t("rights")}
          </p>
          <p className="text-[10px] font-mono text-[#333333]">
            BUILT WITH PRECISION IN PITESTI
          </p>
        </div>
      </div>
    </footer>
  );
}
