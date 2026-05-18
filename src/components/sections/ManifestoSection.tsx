"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const words = text.querySelectorAll(".word");
    gsap.fromTo(
      words,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const part1 = "Am ars bani cu agenții. Apoi am deschis una mai bună.";
  const part2 =
    "Șase ani în performance marketing. Am văzut de prea aproape cum funcționează industria. Agenții care încasează mii de euro pe lună și livrează rapoarte frumoase fără vânzări. Antreprenori care au ars zeci de mii de euro și-au rămas cu buzunarele goale. Conturi de reclame ținute ostatice pe numele agenției, ca să nu poți pleca.";
  const part3 =
    "Toamna lui 2025 am deschis High-Up Labs. Fără retainer. Fără bullshit. 5-10% comision din vânzările generate de reclame. Conturile sunt pe numele tău, tu ești admin, tu deții datele. 90 de zile să atingem targetul de profit. Dacă ratăm, luna a patra e pe noi. Scris negru pe alb în contract. Nu e promisiune de marketing. E matematică simplă.";

  return (
    <section ref={sectionRef} className="relative bg-black py-32 md:py-48">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <div className="mb-16">
          <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
            [03] MANIFESTO
          </span>
        </div>

        <div ref={textRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.3] tracking-tight text-white">
              {part1.split(" ").map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </p>
          </div>
          <div className="space-y-6">
            <p className="text-lg md:text-xl leading-relaxed text-[#A3A3A3]">
              {part2.split(" ").map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-[#A3A3A3]">
              {part3.split(" ").map((word, i) => (
                <span key={`b-${i}`} className="word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-[#1A1A1A] grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: "01", title: "Transparență totală", desc: "Conturile tale. Pixelul tău. Datele tale. Noi avem acces doar cât lucrăm împreună." },
            { num: "02", title: "Aliniere reală", desc: "Câștigăm doar când câștigi tu. Nu vinzi? Nu facturăm. Zero risc, zero scuze." },
            { num: "03", title: "Asumare", desc: "Ratăm targetul în 90 de zile? Luna a patra e pe noi. Scris negru pe alb în contract." },
          ].map((item) => (
            <div key={item.num} className="border-l-2 border-[#CCFF00] pl-6">
              <div className="text-[10px] font-mono text-[#CCFF00] mb-3">{item.num}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
