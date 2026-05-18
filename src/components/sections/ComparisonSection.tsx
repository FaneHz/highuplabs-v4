"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { aspect: "Model de plată", them: "5-10% din vânzările generate de reclame. Zero retainer. Plătești doar când vindem.", others: "Retainer fix 1.500–5.000 EUR pe lună. Plătești și când vânzările sunt zero. Și când campaniile dau pe minus." },
  { aspect: "Garanție", them: "90 de zile. Dacă nu atingem targetul agreat, luna a 4-a e gratis. Scris negru pe alb în contract.", others: "Nicio garanție. \"Mai optimizăm\", \"algoritmul învață\", \"trebuie să aștepți\". Traducere: habar n-au ce fac." },
  { aspect: "Acces la conturi", them: "Business Manager, conturi de reclame, pixel — toate pe numele tău. Tu ești proprietarul datelor. Pleci când vrei, cu tot istoricul.", others: "Conturile pe numele agenției. Pierzi pixelul, audiențele și istoricul la plecare. Reconstrucția costă mii de euro și luni de zile." },
  { aspect: "Raportare", them: "Săptămânal. POAS, ROAS, AOV, CPA, cost per achiziție. Numere care contează, nu reach și impresii.", others: "Reach, impresii, engagement, \"brand awareness\". Raport lunar în Canva cu culori frumoase și zero substanță." },
  { aspect: "Comunicare", them: "Direct cu omul care face campaniile. Fără account manager care transmite mesaje. Fără bilețele.", others: "5 oameni în CC. Account manager, strategist, creative director — niciunul care atinge vreodată contul." },
  { aspect: "Interesul real", them: "Câștigăm doar când câștigi. Dacă nu vinzi, nu facturăm. Interesul e perfect aliniat.", others: "Încasează retainerul indiferent de rezultate. Ești doar un alt client în portofoliu." },
  { aspect: "Când nu funcționează", them: "Spunem direct. Dacă produsul e prost sau marja e prea mică, îți spunem în prima săptămână.", others: "\"Mai optimizăm\", \"trebuie să aștepți 3 luni\", \"piața e dificilă\". Orice scuză ca să-ți ia încă 3 luni de retainer." },
  { aspect: "Ce se întâmplă cu bugetul", them: "Tu setezi bugetul. Tu plătești direct platformele. Noi nu atingem banii tăi.", others: "Ei gestionează bugetul. Tu trimiți banii lor. Transparenta = zero. Surprize = infinite." },
  { aspect: "Onestitatea", them: "Dacă nu ești pregătit pentru scaling, spunem NU. Analizăm magazinul înainte. Fără promisiuni false.", others: "Semnează oricine cu un card valid. Apoi dau vina pe client, pe piață, pe sezon, pe orice." },
  { aspect: "Cât timp stai cu ei", them: "Fără termen minim. 30 de zile preaviz. Nicio penalizare la plecare. Conturile rămân ale tale.", others: "6–12 luni blocați. Penalizări la ieșire. Te-au prins cu ghiarele și nu te lasă să respiri." },
];

export default function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rowEls = section.querySelectorAll(".comp-row");
    gsap.fromTo(
      rowEls,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A] py-32 md:py-48">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
            [04] COMPARAȚIE
          </span>
          <h2 className="mt-6 text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] text-white">
            Noi vs. Ei: De ce majoritatea agențiilor te vor minți
          </h2>
        </div>

        <div className="border border-[#1A1A1A]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-[#1A1A1A] bg-[#111111]">
            <div className="p-4 md:p-6 text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] hidden md:block">
              Aspect
            </div>
            <div className="p-4 md:p-6 text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.2em]">
              HIGH-UP.LABS
            </div>
            <div className="p-4 md:p-6 text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em]">
              Agenteia "Standard"
            </div>
          </div>

          {rows.map((row, i) => (
            <div
              key={i}
              className="comp-row grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-[#1A1A1A] hover:bg-[#111111] transition-colors"
            >
              <div className="p-4 md:p-6 text-sm font-bold text-white md:border-r border-[#1A1A1A]">
                {row.aspect}
              </div>
              <div className="p-4 md:p-6 text-sm text-white md:border-r border-[#1A1A1A]">
                {row.them}
              </div>
              <div className="p-4 md:p-6 text-sm text-[#A3A3A3]">
                {row.others}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
