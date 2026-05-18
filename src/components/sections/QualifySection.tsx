"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const questions = [
  {
    text: "Ai minim 2.000 EUR/lună buget de reclame?",
    tip: "Fără buget minim, nu putem testa audiences și creative-uri suficient pentru a găsi ceea ce funcționează.",
  },
  {
    text: "Marja netă pe produs e peste 15%?",
    tip: "Dacă marja e sub 15%, chiar și cu ROAS bun, rămâi cu prea puțin după comision și costuri. E matematică, nu vrajă.",
  },
  {
    text: "Ai tracking funcțional (Pixel, GA4) sau ești dispus să-l montezi?",
    tip: "Fără tracking corect, nu știm ce funcționează. E ca și cum ai conduce cu ochii închiși.",
  },
  {
    text: "Poți procesa de 3x mai multe comenzi fără să cedezi operațional?",
    tip: "Cea mai mare greșeală: să scalezi reclamele dar să nu poți livra. Clienții furioși costă mai mult decât lipsa lor.",
  },
  {
    text: "Ai vânzări validate (nu testăm produse care n-au vândut)?",
    tip: "Nu testăm produse noi pe banii tăi. Dacă nu a vândut organic, nu va vinde nici cu reclame.",
  },
];

function CustomToggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`toggle-track flex-shrink-0 ${checked ? "active" : ""}`}
      aria-pressed={checked}
    >
      <div className="toggle-thumb" />
    </button>
  );
}

function CircularProgress({ score, max }: { score: number; max: number }) {
  const radius = 60;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = score / max;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="rotate-[-90deg]"
      >
        <circle
          stroke="#1A1A1A"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#CCFF00"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
          strokeLinecap="butt"
          className="progress-ring-circle"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-white">{score}/{max}</span>
        <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mt-1">SCOR</span>
      </div>
    </div>
  );
}

export default function QualifySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [checked, setChecked] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [revealedTips, setRevealedTips] = useState<Set<number>>(new Set());

  const score = checked.filter(Boolean).length;
  const progress = (score / questions.length) * 100;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.fromTo(
      section.querySelectorAll(".qualify-item"),
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: { trigger: section, start: "top 60%" },
      }
    );
  }, []);

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);

    if (!next[i]) {
      const newRevealed = new Set(revealedTips);
      newRevealed.delete(i);
      setRevealedTips(newRevealed);
    }
  };

  const revealTip = (i: number) => {
    if (checked[i]) return;
    const newRevealed = new Set(revealedTips);
    newRevealed.add(i);
    setRevealedTips(newRevealed);
  };

  const getResult = () => {
    if (score === 5) return {
      title: "DA.",
      subtitle: "Businessul tău e gata de scaling.",
      desc: "Toate condițiile sunt îndeplinite. Programează un call și hai să vedem cum scalăm.",
      color: "text-[#CCFF00]",
      border: "border-[#CCFF00]",
    };
    if (score >= 3) return {
      title: "APROAPE.",
      subtitle: "Mai ai câteva puncte de fixat.",
      desc: "Businessul are potențial, dar mai sunt câteva lucruri de pus la punct înainte de scaling. Citeste articolele noastre sau programează un call pentru diagnostic.",
      color: "text-white",
      border: "border-white",
    };
    return {
      title: "NU ÎNCĂ.",
      subtitle: "Businessul mai are de maturizat.",
      desc: "Nu ești pregătit pentru scaling. Și e OK — mai bine să știi acum decât să arzi bani. Citește articolele noastre și revino când ești gata.",
      color: "text-[#A3A3A3]",
      border: "border-[#A3A3A3]",
    };
  };

  const result = getResult();

  return (
    <section ref={sectionRef} className="relative bg-black py-32 md:py-48 border-y-2 border-[#CCFF00]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
            [09] VERIFICARE
          </span>
          <h2 className="mt-6 text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] text-white">
            Ești potrivit pentru High-Up Labs? Verifică în 5 secunde.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#1A1A1A]">
          <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#1A1A1A]">
            <div className="mb-8">
              <div className="flex justify-between text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2">
                <span>Progres</span>
                <span className="text-[#CCFF00]">{score}/{questions.length}</span>
              </div>
              <div className="h-1 bg-[#1A1A1A] relative">
                <div
                  className="absolute top-0 left-0 h-full bg-[#CCFF00] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-0">
              {questions.map((q, i) => (
                <div key={i} className="qualify-item">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-start gap-4 py-6 border-b border-[#1A1A1A] last:border-b-0 text-left hover:bg-[#0A0A0A] transition-colors px-4 -mx-4"
                  >
                    <CustomToggle checked={checked[i]} onChange={() => {}} />
                    <span className={`text-sm ${checked[i] ? "text-white" : "text-[#A3A3A3]"}`}>
                      {q.text}
                    </span>
                  </button>

                  {(revealedTips.has(i) || !checked[i]) && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ${revealedTips.has(i) ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="pb-4 pl-[68px]">
                        <p className="text-xs text-[#666666] leading-relaxed">{q.tip}</p>
                      </div>
                    </div>
                  )}

                  {!checked[i] && !revealedTips.has(i) && (
                    <button
                      onClick={() => revealTip(i)}
                      className="ml-[68px] mb-4 text-[10px] font-mono text-[#666666] hover:text-[#CCFF00] transition-colors uppercase tracking-wider"
                    >
                      [De ce contează?]
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12 bg-[#111111]">
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-8">
              [SCOR_TAU]
            </div>

            <CircularProgress score={score} max={questions.length} />

            <div className="text-center py-12">
              <div className={`text-5xl md:text-6xl font-black ${result.color} mb-4`}>
                {result.title}
              </div>
              <p className="text-white font-bold mb-4">{result.subtitle}</p>
              <p className="text-sm text-[#A3A3A3] leading-relaxed max-w-sm mx-auto">
                {result.desc}
              </p>
            </div>

            <div className={`mt-8 p-6 border ${result.border} bg-[#0A0A0A]`}>
              <div className="text-[10px] font-mono uppercase tracking-wider mb-4 text-[#A3A3A3]">
                [URMĂTORUL PAS]
              </div>
              {score === 5 ? (
                <a
                  href="/ro/aplica"
                  className="block w-full py-4 bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase tracking-[0.2em] text-center hover:bg-[#99CC00] transition-colors"
                >
                  PROGRAMEAZĂ CALL-UL GRATUIT
                </a>
              ) : score >= 3 ? (
                <div className="space-y-3">
                  <a
                    href="/ro/aplica"
                    className="block w-full py-4 bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase tracking-[0.2em] text-center hover:bg-[#99CC00] transition-colors"
                  >
                      PROGRAMEAZĂ DIAGNOSTIC GRATUIT
                  </a>
                  <a
                    href="/ro/articole"
                    className="block w-full py-4 border border-[#1A1A1A] text-white text-xs font-mono font-bold uppercase tracking-[0.2em] text-center hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
                  >
                      CITEȘTE ARTICOLELE
                  </a>
                </div>
              ) : (
                <a
                  href="/ro/articole"
                  className="block w-full py-4 border border-[#1A1A1A] text-white text-xs font-mono font-bold uppercase tracking-[0.2em] text-center hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
                >
                    CITEȘTE EDUCAȚIA GRATUITĂ
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
