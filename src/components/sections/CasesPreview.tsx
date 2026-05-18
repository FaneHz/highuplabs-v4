"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n-context";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    slug: "trotinete-electrice",
    industry: "ECOMMERCE // RO",
    title: "De la 0 la 2.16M RON în 60 de zile — nu e un pitch, e un client real.",
    stats: [
      { label: "REVENUE", value: "2.16M RON" },
      { label: "ROAS", value: "102x" },
      { label: "POAS", value: "26x" },
    ],
    whatWorked: "Google Ads PMax + Meta Ads. 1.043 conversii. Am luat același buget pe care altă agenție îl arsese 8 luni și am scos 2.16 milioane.",
    whatDidnt: "Clientul n-avea landing pages. A trebuit să construim rapid 3 pagini de produs. Fără ele, ROAS-ul era la jumătate.",
  },
  {
    slug: "agentie-turism-arges",
    industry: "TURISM // RO",
    title: "Agenție turism Argeș: 1.7M lei în 12 luni, pornind de la zero digital.",
    stats: [
      { label: "REVENUE", value: "1.7M lei" },
      { label: "FACTURI", value: "993" },
      { label: "POAS", value: "3.2x" },
    ],
    whatWorked: "SmartBill + Meta CAPI + landing pages. De la zero online la 993 facturi în primul an. 85% dintre clienți se întorc.",
    whatDidnt: "Primul trimestru a fost lent. A trebuit să testăm 4 audiences diferite până am găsit unul care convertește sub 15 lei per lead.",
  },
];

export default function CasesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const locale = useLocale();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll(".case-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 60%" },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-32 md:py-48 border-b-2 border-[#CCFF00]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
              [07] STUDII DE CAZ
            </span>
            <h2 className="mt-6 text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] text-white">
              "De la 0 la 50.000 € în 90 de zile" — nu e un pitch, e un client
            </h2>
          </div>
          <Link
            href={`/${locale}/studii-de-caz`}
            className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] hover:text-[#CCFF00] transition-colors underline-draw"
          >
            [VEZI_TOATE]
          </Link>
        </div>

        <div className="space-y-0">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/${locale}/studii-de-caz/${c.slug}`}
              className="case-card block border border-[#1A1A1A] border-b-0 last:border-b hover:border-[#CCFF00] transition-colors group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                <div className="p-8 md:p-12 lg:border-r border-[#1A1A1A]">
                  <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em] mb-4">
                    {c.industry}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-[#CCFF00] transition-colors">
                    {c.title}
                  </h3>
                  <div className="mt-6 space-y-4">
                    <div>
                      <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-wider mb-1">[CE A MERS]</div>
                      <p className="text-sm text-[#A3A3A3] leading-relaxed">{c.whatWorked}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#FF3333] uppercase tracking-wider mb-1">[CE NU A MERS]</div>
                      <p className="text-sm text-[#666666] leading-relaxed">{c.whatDidnt}</p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 grid grid-cols-3 gap-0">
                  {c.stats.map((stat) => (
                    <div key={stat.label} className="p-8 md:p-12 border-l border-[#1A1A1A] first:border-l-0 flex flex-col justify-center">
                      <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-2">
                        {stat.label}
                      </div>
                      <div className="text-2xl md:text-4xl font-black text-white group-hover:text-[#CCFF00] transition-colors">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
