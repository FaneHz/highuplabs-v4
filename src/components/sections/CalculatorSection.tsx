"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CustomSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const percentage = ((value - min) / (max - min)) * 100;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const raw = min + pct * (max - min);
      const stepped = Math.round(raw / step) * step;
      onChange(Math.max(min, Math.min(max, stepped)));
    },
    [min, max, step, onChange]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const track = trackRef.current;
      if (!track) return;

      const onMove = (ev: MouseEvent) => {
        const rect = track.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
        const raw = min + pct * (max - min);
        const stepped = Math.round(raw / step) * step;
        onChange(Math.max(min, Math.min(max, stepped)));
      };

      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [min, max, step, onChange]
  );

  return (
    <div className="calc-item">
      <div className="flex justify-between mb-3">
        <label className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em]">{label}</label>
        <span className="text-sm font-mono text-[#CCFF00]">
          {value.toLocaleString()}{suffix}
        </span>
      </div>
      <div
        ref={trackRef}
        className="slider-track"
        onClick={handleClick}
      >
        <div className="slider-fill" style={{ width: `${percentage}%` }} />
        <div
          className="slider-thumb"
          style={{ left: `${percentage}%` }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
}

function AnimatedNumber({ value, prefix = "", suffix = "", className = "" }: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    const diff = to - from;
    if (diff === 0) return;

    const duration = 400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + diff * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    prevRef.current = to;
  }, [value]);

  return (
    <span className={`counter-value ${className}`}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

function GaugeBar({ value, max, label, color = "#CCFF00" }: {
  value: number;
  max: number;
  label: string;
  color?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider">
        <span>{label}</span>
        <span style={{ color }}>{pct.toFixed(0)}%</span>
      </div>
      <div className="h-1 bg-[#1A1A1A] relative">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function CalculatorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const params = useParams();
  const locale = (params?.locale as string) || "ro";
  const [sales, setSales] = useState(15000);
  const [budget, setBudget] = useState(2000);
  const [margin, setMargin] = useState(30);
  const [commission, setCommission] = useState(7);

  const profit = Math.round(sales * (margin / 100));
  const comValue = Math.round(sales * (commission / 100));
  const net = profit - comValue - budget;
  const poas = budget > 0 ? (profit - comValue) / budget : 0;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.fromTo(
      section.querySelectorAll(".calc-item"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: { trigger: section, start: "top 60%" },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A] py-32 md:py-48">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <div className="mb-16">
          <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
            [06] CALCULATOR
          </span>
          <h2 className="mt-6 text-4xl md:text-6xl font-black uppercase tracking-[-0.03em] text-white">
            Calculează cât profit rămâne cu adevărat în contul tău
          </h2>
          <p className="mt-4 text-sm text-[#999999] max-w-2xl leading-relaxed">
            <strong className="text-white">POAS = Profit Over Ad Spend.</strong> Spre deosebire de ROAS, care doar împarte venitul la bugetul de reclame,
            POAS îți arată <span className="text-[#CCFF00]">cât profit real rămâne</span> după ce plătești ads-urile și comisionul nostru.
            ROAS de 4x cu marjă de 10% poate însemna pierdere. POAS de 1.5x cu marjă de 40% înseamnă bani concreți în cont.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#1A1A1A]">
          <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#1A1A1A]">
            <div className="space-y-10">
              <CustomSlider label="Vânzări/lună (EUR)" value={sales} min={2000} max={50000} step={500} onChange={setSales} />
              <CustomSlider label="Buget ads/lună (EUR)" value={budget} min={500} max={10000} step={100} onChange={setBudget} />
              <CustomSlider label="Marjă netă (%)" value={margin} min={5} max={60} step={1} onChange={setMargin} suffix="%" />
              <CustomSlider label="Comision HUL (%)" value={commission} min={5} max={10} step={1} onChange={setCommission} suffix="%" />
            </div>

            <div className="mt-12 space-y-4">
              <GaugeBar value={margin} max={60} label="Marjă utilizată" />
              <GaugeBar value={commission} max={15} label="Comision vs piață" color="#666" />
              <GaugeBar value={poas} max={5} label="POAS estimat" color={poas >= 1 ? "#CCFF00" : "#FF3333"} />
            </div>
          </div>

          <div className="p-8 md:p-12 bg-[#111111]">
            <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-8">
              [REZULTAT LIVE]
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4">
                <span className="text-sm text-[#A3A3A3]">Profit brut după marjă</span>
                <AnimatedNumber value={profit} suffix=" EUR" className="text-2xl font-black text-white" />
              </div>
              <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4">
                <span className="text-sm text-[#A3A3A3]">Comision High-Up Labs</span>
                <AnimatedNumber value={comValue} suffix=" EUR" className="text-2xl font-black text-[#CCFF00]" />
              </div>
              <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4">
                <span className="text-sm text-[#A3A3A3]">Buget ads</span>
                <AnimatedNumber value={budget} suffix=" EUR" className="text-2xl font-black text-white" />
              </div>
              <div className="pt-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-white">Profit net estimat</span>
                  <span className={`text-4xl font-black ${net >= 0 ? "text-[#CCFF00]" : "text-[#FF3333]"}`}>
                    <AnimatedNumber value={net} suffix=" EUR" />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#A3A3A3]">POAS estimat (profit/ad spend)</span>
                  <span className={`text-xl font-black ${poas >= 1 ? "text-white" : "text-[#FF3333]"}`}>
                    {poas.toFixed(1)}x
                  </span>
                </div>
              </div>
            </div>

            {net < 0 && (
              <div className="mt-6 p-4 border border-[#FF3333] bg-[#FF3333]/5">
                <p className="text-xs text-[#FF3333] font-mono">
                  [ALERTA] Cu aceste cifre, ai pierde bani. Marja e prea mică sau bugetul ads prea mare față de vânzări.
                </p>
              </div>
            )}

            <Link
              href={`/${locale}/oferta?sales=${sales}&margin=${margin}&budget=${budget}`}
              className="mt-8 w-full py-4 bg-[#CCFF00] text-black font-mono font-bold uppercase tracking-wider text-sm border-2 border-[#CCFF00] hover:bg-transparent hover:text-[#CCFF00] transition-all flex items-center justify-center gap-2"
            >
              Generează Oferta Completă →
            </Link>

            <p className="mt-8 text-[10px] font-mono text-[#808080] leading-relaxed">
              Calculul e simplificat. Nu include costuri fixe, salarii, impozit pe profit sau retururi.
              Scopul e să-ți arate ordinul de mărime. POAS contează mai mult decât ROAS pentru că măsoară
              profitul real rămas în cont, nu doar venitul generat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
