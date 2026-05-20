"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Link from "next/link";
import { useLocale } from "@/lib/i18n-context";

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const count = 2000;
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    setPositions(pos);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !positions) return;
    meshRef.current.rotation.y += 0.0003;
    meshRef.current.rotation.x += 0.0001;
    const posArray = meshRef.current.geometry.attributes.position
      .array as Float32Array;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const origX = positions[ix];
      const origY = positions[ix + 1];
      const origZ = positions[ix + 2];
      posArray[ix] =
        origX + Math.sin(time * 0.5 + i * 0.01) * 0.015 + mouseRef.current.x * 0.25;
      posArray[ix + 1] =
        origY + Math.cos(time * 0.3 + i * 0.01) * 0.015 + mouseRef.current.y * 0.25;
      posArray[ix + 2] = origZ + Math.sin(time * 0.4 + i * 0.02) * 0.008;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      {positions && (
        <>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.022}
            color="#CCFF00"
            transparent
            opacity={0.5}
            sizeAttenuation
          />
        </>
      )}
    </points>
  );
}

function DecodedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";

  useEffect(() => {
    let iteration = 0;
    const totalFrames = text.length * 3;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iteration / 3) return text[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1;
      if (iteration >= totalFrames) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 25);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setDisplay(text);
    }, delay + text.length * 80 + 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <span className="font-mono text-xs text-[#A3A3A3] tracking-widest">{display}</span>;
}

function AnimatedCounter({ end, suffix = "", prefix = "" }: {
  end: number | string;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numEnd = typeof end === "string" ? parseInt(end) : end;
    if (isNaN(numEnd)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const duration = 1500;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numEnd));
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

  const displayValue = typeof end === "string" && isNaN(parseInt(end)) ? end : count;

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-black text-[#CCFF00] counter-value">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
    </div>
  );
}

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0, 0)";
  }, []);

  return (
    <Link
      ref={btnRef}
      href={href}
      className={`magnetic-btn inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
}

export default function HeroSection() {
  const locale = useLocale();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Particles />
        </Canvas>
      </div>

      <div
        className={`scan-line transition-transform duration-[1000ms] ${
          loaded ? "translate-y-[100vh]" : ""
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.87, 0, 0.13, 1)" }}
      />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <DecodedText text="PITESTI, ROMANIA — COMISION ONLY" delay={600} />
        </div>

        <h1
          className={`text-4xl sm:text-6xl md:text-7xl lg:text-[100px] font-black uppercase tracking-[-0.05em] leading-[0.9] text-white transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Ai ars bani
          <br />
          cu agenții de
          <br />
          <span className="text-[#CCFF00] text-glow-lime">marketing?</span>
        </h1>

        <p
          className={`mt-8 text-base md:text-lg text-[#C2C2C2] max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Nu ești singur. 9 din 10 antreprenori spun același lucru.
          Plătești <span className="text-white font-bold">0 lei lunar</span>.
          Noi luăm doar <span className="text-[#CCFF00] font-bold">5-10%</span> din vânzările pe care ți le aducem.
          Garanție <span className="text-white font-bold">90 de zile</span>.
        </p>

        <div
          className={`mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            "6 ANI IN PERFORMANCE MARKETING",
            "6 CLIENTI ACTIVI",
            "PREZENTA IN 3 TARI",
            "POAS TRACKUIT",
          ].map((item) => (
            <span key={item} className="text-[10px] font-mono text-[#666666] uppercase tracking-widest">
              {item}
            </span>
          ))}
        </div>

        <div
          className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <MagneticButton
            href={`/${locale}/aplica`}
            className="px-10 py-5 bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-[#99CC00] transition-colors"
          >
            VREAU SĂ VÂND FĂRĂ RISC
          </MagneticButton>
          <Link
            href={`/${locale}/studii-de-caz`}
            className="px-10 py-5 border border-[#1A1A1A] text-white text-xs font-mono font-bold uppercase tracking-[0.2em] hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
          >
            [VEZI CIFRELE]
          </Link>
        </div>

        <div className="mt-20 flex justify-center gap-12 md:gap-20 text-center">
          {[
            { value: "5-10%", label: "COMISION DIN VÂNZĂRI", isText: true },
            { value: "90", label: "ZILE GARANȚIE", suffix: "" },
            { value: "0", label: "RETAINER LUNAR", suffix: "€" },
          ].map((stat) => (
            <div key={stat.label}>
              {stat.isText ? (
                <div className="text-2xl md:text-3xl font-black text-[#CCFF00]">{stat.value}</div>
              ) : (
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              )}
              <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CCFF00]" />
    </section>
  );
}
