"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  "Management campanii complete: setup, optimizare și scalare pe Meta Ads, Google Ads și TikTok Ads",
  "Creative production: poze, carusele, bannere și formaturi adaptate pentru fiecare platformă",
  "Landing page optimization: analiză, sugestii și implementare de teste A/B pentru conversii mai bune",
  "Tracking & attribution: audit, instalare și testare pixel Meta, GA4, TikTok, Google Ads — verificăm că fiecare conversie se înregistrează",
  "Raportare săptămânală cu POAS, ROAS, AOV, CPA. Metrici reali care arată profitul, nu numere de paradă.",
  "Strategie de scalare: plan lunar cu bugete, targeturi și pași concreți. Fără vagi promisiuni.",
  "Acces total la conturi: tu ești admin, tu deții datele. Zero opacitate, zero scuze.",
];

const excludes = [
  "Rebranding: nu facem logo-uri, identitate vizuală sau redesign complet de site.",
  "SEO organic: nu facem optimizare pentru motoarele de căutare. E alt skillset, alt buget.",
  "Social media organic: postări, stories, community management. Nu facem asta și nici nu pretindem că facem.",
  "Garantarea vânzărilor: nu garantăm cifre. Garantăm că vom lucra profesionist și transparent. Restul depinde de produs și piață.",
  "Copywriting pompos: nu scriem texte de \"inspiratie\" sau \"transformări\". Scenarii clare, directe, care vând.",
];

export default function ValueStackSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll(".stack-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 60%" },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-32 md:py-48 border-y-2 border-[#CCFF00]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
            [05] OFERTA
          </span>
          <h2 className="mt-6 text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] text-white">
            Ce primești. Ce NU primești. Și cât costă, fără surprize.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="stack-card border border-[#1A1A1A] bg-[#0A0A0A] p-8 md:p-12">
            <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em] mb-8">
              [INCLUS]
            </div>
            <ul className="space-y-6">
              {includes.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-[#CCFF00] font-mono text-sm flex-shrink-0">[+]</span>
                  <span className="text-sm text-white leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="stack-card border border-[#1A1A1A] border-t-0 lg:border-t lg:border-l-0 bg-black p-8 md:p-12">
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.3em] mb-8">
              [NU_INCLUDE]
            </div>
            <ul className="space-y-6">
              {excludes.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-[#A3A3A3] font-mono text-sm flex-shrink-0">[-]</span>
                  <span className="text-sm text-[#A3A3A3] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#1A1A1A]">
          <div className="p-8 border-b md:border-b-0 md:border-r border-[#1A1A1A]">
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-2">Cost lunar</div>
            <div className="text-5xl md:text-6xl font-black text-[#CCFF00]">0€</div>
            <div className="text-xs text-[#A3A3A3] mt-2">zero retainer, zero taxă de setup</div>
          </div>
          <div className="p-8">
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-2">Comision</div>
            <div className="text-5xl md:text-6xl font-black text-white">5-10%</div>
            <div className="text-xs text-[#A3A3A3] mt-2">din vânzările aduse de reclame</div>
          </div>
        </div>
      </div>
    </section>
  );
}
