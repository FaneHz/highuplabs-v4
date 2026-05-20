"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { useTranslations } from "@/lib/i18n-context";

const navLinks = [
  { key: "articles", href: "/articole" },
  { key: "caseStudies", href: "/studii-de-caz" },
  { key: "about", href: "/despre" },
  { key: "offer", href: "/oferta", highlight: true },
];

export default function Navigation({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locale === "ro" ? "en" : "ro";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-black/95 backdrop-blur-sm border-b border-[#1A1A1A]"
          : "bg-transparent border-b border-[#1A1A1A]"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between h-16">
          <Link
            href={`/${locale}`}
            className="font-mono text-sm font-bold tracking-widest uppercase text-white hover:text-[#CCFF00] transition-colors"
          >
            HIGH-UP.LABS
          </Link>

          <div className="hidden md:flex items-center gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className={`px-6 py-5 text-xs font-mono uppercase tracking-wider border-l border-[#1A1A1A] transition-colors ${
                  link.highlight
                    ? "text-[#CCFF00] hover:text-[#CCFF00]"
                    : "text-[#A3A3A3] hover:text-white"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              href={`/${locale}/aplica`}
              className="ml-6 px-6 py-2.5 bg-[#CCFF00] text-black text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#99CC00] transition-colors"
            >
              {t("apply")}
            </Link>
            <Link
              href="/login"
              className="ml-4 px-3 py-2 text-[10px] font-mono text-[#A3A3A3] hover:text-[#CCFF00] border border-[#1A1A1A] transition-colors uppercase"
            >
              Client
            </Link>
            <Link
              href={`/${otherLocale}`}
              className="ml-4 px-3 py-2 text-[10px] font-mono text-[#A3A3A3] hover:text-[#CCFF00] border border-[#1A1A1A] transition-colors uppercase"
            >
              {otherLocale.toUpperCase()}
            </Link>
          </div>

          <button
            className="md:hidden text-white p-2 border border-[#1A1A1A] relative w-10 h-10 flex flex-col items-center justify-center gap-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`block w-4 h-0.5 bg-white transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`block w-4 h-0.5 bg-white transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-0.5 bg-white transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </button>
        </nav>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black border-t border-[#1A1A1A] px-6 py-8 flex flex-col gap-0">
          {navLinks.map((link, i) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              onClick={() => setMobileOpen(false)}
              className="py-4 text-sm font-mono uppercase tracking-wider text-white border-b border-[#1A1A1A]"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {t(link.key)}
            </Link>
          ))}
          <Link
            href={`/${locale}/aplica`}
            onClick={() => setMobileOpen(false)}
            className="mt-6 px-6 py-3 bg-[#CCFF00] text-black text-xs font-bold font-mono uppercase tracking-wider text-center"
          >
            {t("apply")}
          </Link>
        </div>
      </div>
    </header>
  );
}
