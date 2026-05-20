"use client";

import { useEffect, useRef, useState } from "react";

const tickerItems = [
  "5-10% COMISION",
  "ZERO RETAINER",
  "90 ZILE GARANȚIE",
  "META ADS",
  "GOOGLE ADS",
  "TIKTOK ADS",
  "6 CLIENȚI ACTIVI",
  "3 ȚĂRI",
  "POAS TRACKUIT",
  "PITEȘTI, RO",
  "COMISION-ONLY",
  "FĂRĂ TERMEN LUNG",
];

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const duration = 1500;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-5xl font-black text-white counter-value">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
    </div>
  );
}

export default function DataStrip() {
  return (
    <section className="relative bg-[#0A0A0A] border-b-2 border-[#CCFF00]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="mb-12">
          <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
            [02] CIFRELE NU MINT
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-black uppercase tracking-[-0.03em] text-white">
            Cifrele nu mint. Spre deosebire de rapoartele &quot;creative&quot; ale altora.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0">
          <div className="md:border-r border-[#1A1A1A] md:px-6">
            <AnimatedCounter end={6} />
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mt-3 text-center">
              CLIENȚI ACTIVI
            </div>
          </div>
          <div className="md:border-r border-[#1A1A1A] md:px-6">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-black text-white">3</div>
            </div>
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mt-3 text-center">
              ȚĂRI
            </div>
          </div>
          <div className="md:border-r border-[#1A1A1A] md:px-6">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-black text-white">POAS</div>
            </div>
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mt-3 text-center">
              TRACKUIT ZILNIC
            </div>
          </div>
          <div className="md:border-r border-[#1A1A1A] md:px-6">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-black text-[#CCFF00]">5-10%</div>
            </div>
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mt-3 text-center">
              COMISION
            </div>
          </div>
          <div className="md:px-6">
            <AnimatedCounter end={90} />
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mt-3 text-center">
              ZILE GARANȚIE
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t border-[#1A1A1A] py-3 bg-black">
        <div className="ticker flex whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="mx-6 text-[10px] font-mono text-[#333333] uppercase tracking-[0.3em]">
              {item}
              <span className="mx-6 text-[#CCFF00]">{"//"}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
