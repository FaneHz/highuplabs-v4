"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n-context";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    slug: "11-red-flags-agentii",
    num: "01",
    tag: "PROTECȚIE",
    title: "11 semne că agenția cu care stai să semnezi o să te lase lat",
    readTime: "12 min",
    excerpt: "Contracte cu termen minim, conturi pe numele lor, rapoarte în Canva. Semnele sunt acolo, doar că nimeni nu le citește.",
  },
  {
    slug: "retainer-vs-comision",
    num: "02",
    tag: "PROTECȚIE",
    title: "De ce retainerul de 1.500 de euro îți mănâncă businessul mai rău decât crezi",
    readTime: "10 min",
    excerpt: "Matematica simplă: 1.500 EUR/lună × 12 luni = 18.000 EUR. Dacă agenția nu-ți aduce profit, ai plătit 18K pentru rapoarte frumoase.",
  },
  {
    slug: "produs-prost-nu-e-vina-agentiei",
    num: "03",
    tag: "PROTECȚIE",
    title: "Dacă produsul e prost, nicio agenție din lume nu te salvează",
    readTime: "8 min",
    excerpt: "Cea mai scumpă greșeală: să crezi că reclamele pot vinde un produs care nu are piață. Agenția nu e magician, e distribuitor.",
  },
];

export default function ArticlesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const locale = useLocale();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll(".article-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: { trigger: section, start: "top 60%" },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A] py-32 md:py-48">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
              [08] ARTICOLE
            </span>
            <h2 className="mt-6 text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] text-white">
              Educație gratuită. Fără pitch ascuns.
            </h2>
          </div>
          <Link
            href={`/${locale}/articole`}
            className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] hover:text-[#CCFF00] transition-colors underline-draw"
          >
            [TOATE_ARTICOLELE]
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#1A1A1A]">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/${locale}/articole/${article.slug}`}
              className="article-card block p-8 md:p-10 border-b md:border-b-0 md:border-r last:border-r-0 border-[#1A1A1A] hover:bg-[#111111] transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-[120px] font-black text-[#1A1A1A] leading-none select-none">
                {article.num}
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.2em]">
                    {article.tag}
                  </span>
                  <span className="text-[10px] font-mono text-[#808080]">{article.readTime}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white leading-tight group-hover:text-[#CCFF00] transition-colors">
                  {article.title}
                </h3>
                <p className="mt-4 text-sm text-[#666666] leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-8 text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] group-hover:text-[#CCFF00] transition-colors">
                  [CITESTE] &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
