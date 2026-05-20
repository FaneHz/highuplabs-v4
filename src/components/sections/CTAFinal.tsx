"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n-context";

export default function CTAFinal() {
  const locale = useLocale();

  return (
    <section className="relative bg-black py-32 md:py-48">
      <div className="overflow-hidden border-y border-[#1A1A1A] py-3 mb-20">
        <div className="ticker flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 text-[10px] font-mono text-[#333333] uppercase tracking-[0.3em]">
              PLATESTI CAND VINZI. SCALAM PROFITUL, NU RETAINERUL. GARANTIE 90 ZILE. CONTURILE TALE.
              <span className="mx-8 text-[#CCFF00]">{"//"}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black uppercase tracking-[-0.05em] text-white leading-[0.9]">
          AUDIT GRATUIT PE
          <br />
          <span className="text-[#CCFF00] text-glow-lime">CIFRELE TALE</span>
        </h2>

        <p className="mt-10 text-base md:text-lg text-[#999999] max-w-xl mx-auto leading-relaxed">
          30 de minute pe cifrele tale, fără obligație. Îți arătăm ce merge, ce nu, și dacă are sens să lucrăm împreună.
          Dacă nu, îți spunem direct. Fără follow-up agresiv. Fără &quot;când semnăm&quot;.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Link
            href={`/${locale}/aplica`}
            className="px-8 py-4 bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-[#99CC00] transition-colors"
          >
            [REZERVĂ_AUDITUL]
          </Link>
        </div>

        <div className="mt-8 text-[10px] font-mono text-[#808080] uppercase tracking-wider">
          Fără presiune. Fără vânzare forțată. Dacă e nu, rămâne nu.
        </div>
      </div>
    </section>
  );
}
