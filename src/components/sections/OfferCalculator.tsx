"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Percent, 
  Mail, 
  Building2,
  Phone,
  User,
  Check,
  X,
  FileText,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  Info
} from "lucide-react";
import { createClient } from "@/lib/supabase-client";
import { useAppConfig } from "@/lib/use-app-config";

gsap.registerPlugin(ScrollTrigger);

interface CalculatorInputs {
  monthlyRevenue: number;
  marginPercent: number;
  currentAdSpend: number;
  targetRoas: number;
  email: string;
  fullName: string;
  companyName: string;
  phone: string;
}

interface OfferResult {
  recommendedBudget: number;
  estimatedProfit: number;
  commissionPercent: number;
  commissionValue: number;
  poasEstimate: number;
  roasEstimate: number;
  monthlyRevenue: number;
  marginPercent: number;
  netProfitBeforeAds: number;
  qualifies: boolean;
  disqualifyReason: string;
}

function useCalculatorDefaults(config: Record<string, string>) {
  return {
    monthlyRevenue: Number(config.default_monthly_revenue) || 15000,
    marginPercent: Number(config.default_margin_percent) || 25,
    currentAdSpend: Number(config.default_ad_spend) || 2000,
    targetRoas: Number(config.default_target_roas) || 4,
  };
}

function useQualificationConfig(config: Record<string, string>) {
  return {
    minRevenue: Number(config.qualify_min_revenue) || 10000,
    minMargin: Number(config.qualify_min_margin) || 15,
    minAdSpend: Number(config.qualify_min_adspend) || 1000,
    commissionPercent: Number(config.commission_percent) || 5,
  };
}

function CustomSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix = "",
  prefix = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  suffix?: string;
  prefix?: string;
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
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em]">
          {label}
        </label>
        <span className="text-sm font-mono text-[#CCFF00] font-bold">
          {prefix}{value.toLocaleString()}{suffix}
        </span>
      </div>
      <div
        ref={trackRef}
        className="relative h-2 bg-[#1A1A1A] cursor-pointer"
        onClick={handleClick}
      >
        <div
          className="absolute top-0 left-0 h-full bg-[#CCFF00] transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#CCFF00] border-2 border-white cursor-grab active:cursor-grabbing transition-all"
          style={{ left: `calc(${percentage}% - 8px)` }}
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
    <span className={className}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

function calculateOffer(
  inputs: CalculatorInputs,
  qualConfig: ReturnType<typeof useQualificationConfig>
): OfferResult {
  const { monthlyRevenue, marginPercent, currentAdSpend, targetRoas } = inputs;
  
  // Calificare minimă
  const qualifies = monthlyRevenue >= qualConfig.minRevenue && marginPercent >= qualConfig.minMargin && currentAdSpend >= qualConfig.minAdSpend;
  
  let disqualifyReason = "";
  if (monthlyRevenue < qualConfig.minRevenue) disqualifyReason = `Venitul lunar minim pentru colaborare este de ${qualConfig.minRevenue.toLocaleString()} EUR.`;
  else if (marginPercent < qualConfig.minMargin) disqualifyReason = `Marja minimă necesară este de ${qualConfig.minMargin}%.`;
  else if (currentAdSpend < qualConfig.minAdSpend) disqualifyReason = `Bugetul minim de reclame este de ${qualConfig.minAdSpend.toLocaleString()} EUR/lună.`;
  
  // Calcule
  const netProfitBeforeAds = monthlyRevenue * (marginPercent / 100);
  const commissionPercent = qualConfig.commissionPercent;
  
  // Buget recomandat = venituri / ROAS target
  const recommendedBudget = Math.max(currentAdSpend, Math.round(monthlyRevenue / targetRoas));
  
  // Comision = venituri * comision%
  const commissionValue = monthlyRevenue * (commissionPercent / 100);
  
  // Profit estimat = profit brut - buget ads - comision
  const estimatedProfit = netProfitBeforeAds - recommendedBudget - commissionValue;
  
  // POAS = (profit - comision) / buget ads
  const poasEstimate = recommendedBudget > 0 ? (netProfitBeforeAds - commissionValue) / recommendedBudget : 0;
  
  // ROAS estimat = venituri / buget
  const roasEstimate = recommendedBudget > 0 ? monthlyRevenue / recommendedBudget : 0;
  
  return {
    recommendedBudget,
    estimatedProfit,
    commissionPercent,
    commissionValue,
    poasEstimate,
    roasEstimate,
    monthlyRevenue,
    marginPercent,
    netProfitBeforeAds,
    qualifies,
    disqualifyReason,
  };
}

export default function OfferCalculator() {
  const sectionRef = useRef<HTMLElement>(null);
  const searchParams = useSearchParams();
  const { config } = useAppConfig();
  const defaults = useCalculatorDefaults(config);
  const qualConfig = useQualificationConfig(config);
  
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyRevenue: Number(searchParams.get("sales")) || defaults.monthlyRevenue,
    marginPercent: Number(searchParams.get("margin")) || defaults.marginPercent,
    currentAdSpend: Number(searchParams.get("budget")) || defaults.currentAdSpend,
    targetRoas: defaults.targetRoas,
    email: "",
    fullName: "",
    companyName: "",
    phone: "",
  });
  const hasQueryParams = searchParams.has("sales") || searchParams.has("margin") || searchParams.has("budget");
  const [step, setStep] = useState<"calculator" | "contact" | "result" | "contract">(hasQueryParams ? "contact" : "calculator");
  const [offer, setOffer] = useState<OfferResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const supabase = useMemo(() => {
    if (typeof window !== "undefined") {
      try {
        return createClient();
      } catch (e) {
        console.error("Supabase init failed:", e);
        return null;
      }
    }
    return null;
  }, []);

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
  }, []);

  const handleCalculate = () => {
    const result = calculateOffer(inputs, qualConfig);
    setOffer(result);
    setStep("contact");
  };

  const handleSubmitContact = async () => {
    if (!inputs.email || !inputs.fullName) {
      setError("Te rugăm să completezi email-ul și numele.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      setError("Te rugăm să introduci un email valid.");
      return;
    }
    
    setError("");
    setStep("result");
  };

  const handleAcceptOffer = async () => {
    setLoading(true);
    setError("");
    
    try {
      if (!supabase) throw new Error("Client Supabase indisponibil. Reîncarcă pagina.");
      // 1. Salvează mai întâi în Supabase
      const { error: dbError } = await supabase
        .from("offers")
        .insert({
          email: inputs.email,
          full_name: inputs.fullName,
          company_name: inputs.companyName,
          phone: inputs.phone,
          monthly_revenue: inputs.monthlyRevenue,
          margin_percent: inputs.marginPercent,
          current_ad_spend: inputs.currentAdSpend,
          target_roas: inputs.targetRoas,
          recommended_budget: offer?.recommendedBudget,
          estimated_profit: offer?.estimatedProfit,
          commission_percent: offer?.commissionPercent,
          commission_value: offer?.commissionValue,
          poas_estimate: offer?.poasEstimate,
          status: "accepted",
        });

      if (dbError) throw dbError;
      
      // 2. Setează success indiferent de email
      setSuccess("Oferta a fost acceptată! Te contactăm în maxim 24 de ore.");
      
      // 3. Trimite email best-effort (nu blocking)
      try {
        const functionsUrl = config.supabase_functions_url || "https://qpuswbcxegxvgjbwinrq.supabase.co/functions/v1";
        const emailResponse = await fetch(
          `${functionsUrl}/send-offer-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              type: "offer_accepted",
              email: inputs.email,
              fullName: inputs.fullName,
              companyName: inputs.companyName,
              phone: inputs.phone,
              monthlyRevenue: inputs.monthlyRevenue,
              marginPercent: inputs.marginPercent,
              recommendedBudget: offer?.recommendedBudget,
              estimatedProfit: offer?.estimatedProfit,
              commissionPercent: offer?.commissionPercent,
            }),
          }
        );

        if (!emailResponse.ok) {
          const emailData = await emailResponse.json().catch(() => ({}));
          console.error("Email notification failed:", emailData.error || emailResponse.statusText);
        }
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
      }
    } catch (err: any) {
      setError(err.message || "A apărut o eroare. Te rugăm să încerci din nou.");
      console.error("handleAcceptOffer error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectOffer = async () => {
    setLoading(true);
    setError("");

    try {
      if (!supabase) throw new Error("Client Supabase indisponibil. Reîncarcă pagina.");
      const { error: dbError } = await supabase
        .from("offers")
        .insert({
          email: inputs.email,
          full_name: inputs.fullName,
          company_name: inputs.companyName,
          phone: inputs.phone,
          monthly_revenue: inputs.monthlyRevenue,
          margin_percent: inputs.marginPercent,
          current_ad_spend: inputs.currentAdSpend,
          target_roas: inputs.targetRoas,
          recommended_budget: offer?.recommendedBudget,
          estimated_profit: offer?.estimatedProfit,
          commission_percent: offer?.commissionPercent,
          commission_value: offer?.commissionValue,
          poas_estimate: offer?.poasEstimate,
          status: "rejected",
        });

      if (dbError) throw dbError;

      setSuccess("Am înregistrat feedback-ul tău. Dacă îți schimbi părerea, ne poți contacta oricând.");

      // Trimite notificare best-effort (nu blocking)
      try {
        const functionsUrl = config.supabase_functions_url || "https://qpuswbcxegxvgjbwinrq.supabase.co/functions/v1";
        const emailResponse = await fetch(
          "https://qpuswbcxegxvgjbwinrq.supabase.co/functions/v1/send-offer-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              type: "offer_rejected",
              email: inputs.email,
              fullName: inputs.fullName,
              companyName: inputs.companyName,
              phone: inputs.phone,
              monthlyRevenue: inputs.monthlyRevenue,
              marginPercent: inputs.marginPercent,
              recommendedBudget: offer?.recommendedBudget,
              estimatedProfit: offer?.estimatedProfit,
              commissionPercent: offer?.commissionPercent,
            }),
          }
        );

        if (!emailResponse.ok) {
          const emailData = await emailResponse.json().catch(() => ({}));
          console.error("Email notification failed:", emailData.error || emailResponse.statusText);
        }
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
      }
    } catch (err: any) {
      setError(err.message || "A apărut o eroare. Te rugăm să încerci din nou.");
      console.error("handleRejectOffer error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContractRequest = () => {
    setStep("contract");
  };

  const handleContractSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      if (!supabase) throw new Error("Client Supabase indisponibil. Reîncarcă pagina.");
      const formData = new FormData(e.target as HTMLFormElement);
      
      // 1. Salvează mai întâi în Supabase
      const { error: dbError } = await supabase
        .from("offers")
        .insert({
          email: inputs.email,
          full_name: inputs.fullName,
          company_name: inputs.companyName,
          phone: inputs.phone,
          monthly_revenue: inputs.monthlyRevenue,
          margin_percent: inputs.marginPercent,
          current_ad_spend: inputs.currentAdSpend,
          target_roas: inputs.targetRoas,
          recommended_budget: offer?.recommendedBudget,
          estimated_profit: offer?.estimatedProfit,
          commission_percent: offer?.commissionPercent,
          commission_value: offer?.commissionValue,
          poas_estimate: offer?.poasEstimate,
          status: "contract_requested",
          contract_company_name: formData.get("contractCompany") as string,
          contract_cui: formData.get("contractCui") as string,
          contract_address: formData.get("contractAddress") as string,
          contract_legal_rep: formData.get("contractRep") as string,
        });

      if (dbError) throw dbError;
      
      // 2. Setează success indiferent de email
      setSuccess("Solicitarea de contract a fost trimisă! Te contactăm în maxim 24 de ore pentru semnare.");
      
      // 3. Trimite email best-effort (nu blocking)
      try {
        const functionsUrl = config.supabase_functions_url || "https://qpuswbcxegxvgjbwinrq.supabase.co/functions/v1";
        const emailResponse = await fetch(
          `${functionsUrl}/send-offer-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              type: "contract_requested",
              email: inputs.email,
              fullName: inputs.fullName,
              companyName: inputs.companyName,
              phone: inputs.phone,
              monthlyRevenue: inputs.monthlyRevenue,
              marginPercent: inputs.marginPercent,
              recommendedBudget: offer?.recommendedBudget,
              estimatedProfit: offer?.estimatedProfit,
              commissionPercent: offer?.commissionPercent,
              status: "contract_requested",
            }),
          }
        );

        if (!emailResponse.ok) {
          const emailData = await emailResponse.json().catch(() => ({}));
          console.error("Email notification failed:", emailData.error || emailResponse.statusText);
        }
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
      }
    } catch (err: any) {
      setError(err.message || "A apărut o eroare. Te rugăm să încerci din nou.");
      console.error("handleContractSubmit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateInput = (key: keyof CalculatorInputs, value: number | string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A] py-24 md:py-32 min-h-screen">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="mb-12 calc-item">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-[#CCFF00]" />
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
              Generator Ofertă Personalizată
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-[-0.03em] text-white leading-tight">
            Află exact cât costă<br />
            <span className="text-[#CCFF00]">să scalezi cu noi</span>
          </h1>
          <p className="mt-4 text-sm text-[#999999] max-w-2xl leading-relaxed">
            Fără call. Fără pitch. Fără presiune.
            <br />
            <span className="text-white">Introdu 4 cifre. Primești oferta personalizată în 10 secunde.</span>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-12 calc-item">
          {[
            { key: "calculator", label: "Calculator" },
            { key: "contact", label: "Date Contact" },
            { key: "result", label: "Oferta Ta" },
            { key: "contract", label: "Contract" },
          ].map((s, i) => (
            <div key={s.key} className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step === s.key ? "text-[#CCFF00]" : step === "contract" && s.key === "result" ? "text-[#CCFF00]" : "text-[#666]"}`}>
                <div className={`w-8 h-8 flex items-center justify-center border-2 ${step === s.key || (step === "result" && ["calculator", "contact"].includes(s.key)) || (step === "contract" && s.key !== "contract") ? "border-[#CCFF00] bg-[#CCFF00] text-black" : "border-[#333] text-[#666]"}`}>
                  {step === s.key || (step === "result" && ["calculator", "contact"].includes(s.key)) || (step === "contract" && s.key !== "contract") ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-mono font-bold">{i + 1}</span>
                  )}
                </div>
                <span className="text-xs font-mono uppercase hidden sm:block">{s.label}</span>
              </div>
              {i < 3 && <div className="w-8 h-[2px] bg-[#333]" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Calculator */}
          {step === "calculator" && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#1A1A1A]"
            >
              <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#1A1A1A]">
                <div className="space-y-8">
                  <CustomSlider
                    label="Venituri lunare (EUR)"
                    value={inputs.monthlyRevenue}
                    min={5000}
                    max={100000}
                    step={1000}
                    onChange={(v) => updateInput("monthlyRevenue", v)}
                    prefix="€"
                  />
                  <CustomSlider
                    label="Marjă netă (%)"
                    value={inputs.marginPercent}
                    min={5}
                    max={60}
                    step={1}
                    onChange={(v) => updateInput("marginPercent", v)}
                    suffix="%"
                  />
                  <CustomSlider
                    label="Buget reclame curent (EUR)"
                    value={inputs.currentAdSpend}
                    min={500}
                    max={20000}
                    step={500}
                    onChange={(v) => updateInput("currentAdSpend", v)}
                    prefix="€"
                  />
                  <CustomSlider
                    label="ROAS țintă"
                    value={inputs.targetRoas}
                    min={2}
                    max={8}
                    step={0.5}
                    onChange={(v) => updateInput("targetRoas", v)}
                    suffix="x"
                  />
                </div>

                <div className="mt-8 p-4 border border-[#333] bg-[#111]">
                  <div className="flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#CCFF00] mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-mono text-[#999]">
                        Minim pentru colaborare:
                      </p>
                      <ul className="text-xs font-mono text-[#666] space-y-1">
                        <li>• Venituri: {qualConfig.minRevenue.toLocaleString()}+ EUR/lună</li>
                        <li>• Marjă: {qualConfig.minMargin}%+</li>
                        <li>• Buget ads: {qualConfig.minAdSpend.toLocaleString()}+ EUR/lună</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 bg-[#111111]">
                <div className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-8">
                  [PREVIZUALIZARE LIVE]
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4">
                    <span className="text-sm text-[#A3A3A3]">Profit brut din marjă</span>
                    <AnimatedNumber 
                      value={Math.round(inputs.monthlyRevenue * (inputs.marginPercent / 100))} 
                      prefix="€" 
                      className="text-2xl font-black text-white" 
                    />
                  </div>
                  <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4">
                    <span className="text-sm text-[#A3A3A3]">Buget ads recomandat</span>
                    <AnimatedNumber 
                      value={Math.max(inputs.currentAdSpend, Math.round(inputs.monthlyRevenue / inputs.targetRoas))} 
                      prefix="€" 
                      className="text-2xl font-black text-[#CCFF00]" 
                    />
                  </div>
                  <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4">
                    <span className="text-sm text-[#A3A3A3]">Comision HUL ({qualConfig.commissionPercent}%)</span>
                    <AnimatedNumber 
                      value={Math.round(inputs.monthlyRevenue * (qualConfig.commissionPercent / 100))} 
                      prefix="€" 
                      className="text-2xl font-black text-[#CCFF00]" 
                    />
                  </div>
                  <div className="pt-4">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-white">Profit net estimat</span>
                      <span className={`text-4xl font-black ${
                        (inputs.monthlyRevenue * (inputs.marginPercent / 100) - Math.max(inputs.currentAdSpend, Math.round(inputs.monthlyRevenue / inputs.targetRoas)) - inputs.monthlyRevenue * (qualConfig.commissionPercent / 100)) >= 0 
                          ? "text-[#CCFF00]" 
                          : "text-[#FF3333]"
                      }`}>
                        <AnimatedNumber 
                          value={Math.round(inputs.monthlyRevenue * (inputs.marginPercent / 100) - Math.max(inputs.currentAdSpend, Math.round(inputs.monthlyRevenue / inputs.targetRoas)) - inputs.monthlyRevenue * (qualConfig.commissionPercent / 100))} 
                          prefix="€" 
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="mt-8 w-full py-4 bg-[#CCFF00] text-black font-mono font-bold uppercase tracking-wider text-sm border-2 border-[#CCFF00] hover:bg-transparent hover:text-[#CCFF00] transition-all flex items-center justify-center gap-2"
                >
                  Generează Oferta
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Contact */}
          {step === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto"
            >
              <div className="border border-[#1A1A1A] p-8 md:p-12 bg-[#111]">
                <h2 className="text-2xl font-black uppercase text-white mb-2">
                  Aproape gata
                </h2>
                <p className="text-sm text-[#999] mb-8">
                  Completează datele pentru a vedea oferta completă.
                </p>

                <div className="space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2">
                      <Mail className="w-3 h-3" /> Email *
                    </label>
                    <input
                      type="email"
                      value={inputs.email}
                      onChange={(e) => updateInput("email", e.target.value)}
                      placeholder="tu@compania.ro"
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#333] text-white font-mono text-sm focus:border-[#CCFF00] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2">
                      <User className="w-3 h-3" /> Nume complet *
                    </label>
                    <input
                      type="text"
                      value={inputs.fullName}
                      onChange={(e) => updateInput("fullName", e.target.value)}
                      placeholder="Ion Popescu"
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#333] text-white font-mono text-sm focus:border-[#CCFF00] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2">
                      <Building2 className="w-3 h-3" /> Companie
                    </label>
                    <input
                      type="text"
                      value={inputs.companyName}
                      onChange={(e) => updateInput("companyName", e.target.value)}
                      placeholder="Numele companiei"
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#333] text-white font-mono text-sm focus:border-[#CCFF00] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2">
                      <Phone className="w-3 h-3" /> Telefon
                    </label>
                    <input
                      type="tel"
                      value={inputs.phone}
                      onChange={(e) => updateInput("phone", e.target.value)}
                      placeholder="07xx xxx xxx"
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#333] text-white font-mono text-sm focus:border-[#CCFF00] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 border border-[#FF3333] bg-[#FF3333]/10">
                    <p className="text-xs text-[#FF3333] font-mono">{error}</p>
                  </div>
                )}

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setStep("calculator")}
                    className="px-6 py-3 border border-[#333] text-[#999] font-mono text-xs uppercase tracking-wider hover:border-[#666] hover:text-white transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-3 h-3" /> Înapoi
                  </button>
                  <button
                    onClick={handleSubmitContact}
                    className="flex-1 py-3 bg-[#CCFF00] text-black font-mono font-bold uppercase tracking-wider text-xs border-2 border-[#CCFF00] hover:bg-transparent hover:text-[#CCFF00] transition-all flex items-center justify-center gap-2"
                  >
                    Vezi Oferta
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Result */}
          {step === "result" && offer && (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {!offer.qualifies && (
                <div className="mb-8 p-6 border-2 border-[#FF3333] bg-[#FF3333]/5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#FF3333] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-[#FF3333] uppercase tracking-wider mb-1">
                        Nu te califici încă
                      </h3>
                      <p className="text-xs text-[#FF3333]/80 font-mono">
                        {offer.disqualifyReason}
                      </p>
                      <p className="text-xs text-[#999] font-mono mt-2">
                        Dar putem discuta despre cum să crești business-ul până la nivelul potrivit.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Offer Card */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="border border-[#1A1A1A] p-8 md:p-12 bg-[#111]">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
                          OFERTA GENERATĂ
                        </span>
                        <h2 className="text-2xl font-black uppercase text-white mt-2">
                          Propunere Comercială
                        </h2>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-[#666] uppercase">Valabilă 30 zile</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-[#1A1A1A] bg-[#0A0A0A]">
                          <span className="text-[10px] font-mono text-[#666] uppercase">Buget Ads Recomandat</span>
                          <p className="text-2xl font-black text-[#CCFF00] mt-1">
                            €{offer.recommendedBudget.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-4 border border-[#1A1A1A] bg-[#0A0A0A]">
                          <span className="text-[10px] font-mono text-[#666] uppercase">Comision HUL</span>
                          <p className="text-2xl font-black text-[#CCFF00] mt-1">
                            {offer.commissionPercent}%
                          </p>
                        </div>
                        <div className="p-4 border border-[#1A1A1A] bg-[#0A0A0A]">
                          <span className="text-[10px] font-mono text-[#666] uppercase">Profit Net Estimat</span>
                          <p className={`text-2xl font-black mt-1 ${offer.estimatedProfit >= 0 ? "text-[#CCFF00]" : "text-[#FF3333]"}`}>
                            €{offer.estimatedProfit.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-4 border border-[#1A1A1A] bg-[#0A0A0A]">
                          <span className="text-[10px] font-mono text-[#666] uppercase">POAS Estimat</span>
                          <p className={`text-2xl font-black mt-1 ${offer.poasEstimate >= 1 ? "text-[#CCFF00]" : "text-[#FF3333]"}`}>
                            {offer.poasEstimate.toFixed(1)}x
                          </p>
                        </div>
                      </div>

                      {/* Breakdown */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Breakdown Lunar</h3>
                        
                        <div className="flex justify-between items-center py-3 border-b border-[#1A1A1A]">
                          <span className="text-sm text-[#999]">Venituri estimate</span>
                          <span className="font-mono text-sm text-white">€{offer.monthlyRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-[#1A1A1A]">
                          <span className="text-sm text-[#999]">Profit brut (marjă {offer.marginPercent}%)</span>
                          <span className="font-mono text-sm text-white">€{offer.netProfitBeforeAds.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-[#1A1A1A]">
                          <span className="text-sm text-[#999]">Buget reclame</span>
                          <span className="font-mono text-sm text-[#FF3333]">-€{offer.recommendedBudget.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-[#1A1A1A]">
                          <span className="text-sm text-[#999]">Comision HUL ({offer.commissionPercent}%)</span>
                          <span className="font-mono text-sm text-[#FF3333]">-€{offer.commissionValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-sm font-bold text-white">PROFIT NET</span>
                          <span className={`font-mono text-lg font-bold ${offer.estimatedProfit >= 0 ? "text-[#CCFF00]" : "text-[#FF3333]"}`}>
                            €{offer.estimatedProfit.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Conditions */}
                      <div className="p-4 border border-[#333] bg-[#0A0A0A]">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Condiții Ofertă</h4>
                        <ul className="space-y-2 text-xs font-mono text-[#999]">
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-[#CCFF00] mt-0.5 shrink-0" />
                            Comision {qualConfig.commissionPercent}% din veniturile generate de reclame
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-[#CCFF00] mt-0.5 shrink-0" />
                            Zero costuri fixe, zero retainer
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-[#CCFF00] mt-0.5 shrink-0" />
                            Garanție 90 zile: dacă nu atingem targetul, luna 4 e gratis
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-[#CCFF00] mt-0.5 shrink-0" />
                            Raportare săptămânală + dashboard live
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-3 h-3 text-[#CCFF00] mt-0.5 shrink-0" />
                            Posibilitate de creștere comision pe viitor (7-10%)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {!success && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={handleAcceptOffer}
                        disabled={loading || !offer.qualifies}
                        className="py-4 bg-[#CCFF00] text-black font-mono font-bold uppercase tracking-wider text-xs border-2 border-[#CCFF00] hover:bg-transparent hover:text-[#CCFF00] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Check className="w-4 h-4" />
                        Accept Oferta
                      </button>
                      <button
                        onClick={handleContractRequest}
                        disabled={loading || !offer.qualifies}
                        className="py-4 border-2 border-white text-white font-mono font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FileText className="w-4 h-4" />
                        Vreau Contract
                      </button>
                      <button
                        onClick={handleRejectOffer}
                        disabled={loading}
                        className="py-4 border border-[#333] text-[#666] font-mono font-bold uppercase tracking-wider text-xs hover:border-[#FF3333] hover:text-[#FF3333] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Respinge
                      </button>
                    </div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 border-2 border-[#CCFF00] bg-[#CCFF00]/5"
                    >
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#CCFF00] shrink-0 mt-0.5" />
                        <p className="text-sm text-[#CCFF00] font-mono">{success}</p>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <div className="p-4 border border-[#FF3333] bg-[#FF3333]/10">
                      <p className="text-xs text-[#FF3333] font-mono">{error}</p>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="border border-[#1A1A1A] p-6 bg-[#111]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                      Datele Tale
                    </h3>
                    <div className="space-y-3 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-[#666]">Nume:</span>
                        <span className="text-white">{inputs.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666]">Email:</span>
                        <span className="text-white">{inputs.email}</span>
                      </div>
                      {inputs.companyName && (
                        <div className="flex justify-between">
                          <span className="text-[#666]">Companie:</span>
                          <span className="text-white">{inputs.companyName}</span>
                        </div>
                      )}
                      {inputs.phone && (
                        <div className="flex justify-between">
                          <span className="text-[#666]">Telefon:</span>
                          <span className="text-white">{inputs.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border border-[#1A1A1A] p-6 bg-[#111]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                      De ce {qualConfig.commissionPercent}%?
                    </h3>
                    <p className="text-xs font-mono text-[#999] leading-relaxed">
                      Startul e la {qualConfig.commissionPercent}% pentru a-ți demonstra valoarea fără riscuri. 
                      Pe măsură ce scalăm și creștem ROAS, comisionul poate ajunge la 7-10%, 
                      dar doar dacă rezultatele sunt consistente.
                    </p>
                  </div>

                  <div className="border border-[#1A1A1A] p-6 bg-[#111]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                      Ai întrebări?
                    </h3>
                    <p className="text-xs font-mono text-[#999] mb-4">
                      Sună-ne direct sau programează un call.
                    </p>
                    <a
                      href="tel:+40725358757"
                      className="block w-full py-3 text-center border border-[#333] text-white font-mono text-xs uppercase tracking-wider hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all"
                    >
                      0725 358 757
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Contract */}
          {step === "contract" && offer && (
            <motion.div
              key="contract"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="border border-[#1A1A1A] p-8 md:p-12 bg-[#111]">
                <h2 className="text-2xl font-black uppercase text-white mb-2">
                  Solicitare Contract
                </h2>
                <p className="text-sm text-[#999] mb-8">
                  Completează datele firmei pentru a pregăti contractul.
                </p>

                {!success ? (
                  <form onSubmit={handleContractSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2 block">
                          Denumire Firmă *
                        </label>
                        <input
                          type="text"
                          name="contractCompany"
                          required
                          placeholder="SC Example SRL"
                          className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#333] text-white font-mono text-sm focus:border-[#CCFF00] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2 block">
                          CUI *
                        </label>
                        <input
                          type="text"
                          name="contractCui"
                          required
                          placeholder="RO12345678"
                          className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#333] text-white font-mono text-sm focus:border-[#CCFF00] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2 block">
                        Adresă Sediul Social *
                      </label>
                      <input
                        type="text"
                        name="contractAddress"
                        required
                        placeholder="Str. Exemplu, Nr. 1, București"
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#333] text-white font-mono text-sm focus:border-[#CCFF00] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2 block">
                        Reprezentant Legal *
                      </label>
                      <input
                        type="text"
                        name="contractRep"
                        required
                        placeholder="Nume Prenume"
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#333] text-white font-mono text-sm focus:border-[#CCFF00] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="p-4 border border-[#333] bg-[#0A0A0A]">
                      <p className="text-xs font-mono text-[#999] leading-relaxed">
                        Prin trimiterea acestei solicitări, confirmi că dorești să primești 
                        un contract de colaborare pe baza ofertei generate. Vei fi contactat 
                        în maxim 24 de ore pentru finalizare.
                      </p>
                    </div>

                    {error && (
                      <div className="p-3 border border-[#FF3333] bg-[#FF3333]/10">
                        <p className="text-xs text-[#FF3333] font-mono">{error}</p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep("result")}
                        className="px-6 py-3 border border-[#333] text-[#999] font-mono text-xs uppercase tracking-wider hover:border-[#666] hover:text-white transition-all flex items-center gap-2"
                      >
                        <ArrowLeft className="w-3 h-3" /> Înapoi
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3 bg-[#CCFF00] text-black font-mono font-bold uppercase tracking-wider text-xs border-2 border-[#CCFF00] hover:bg-transparent hover:text-[#CCFF00] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? "Se trimite..." : "Trimite Solicitarea"}
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 border-2 border-[#CCFF00] bg-[#CCFF00]/5 text-center"
                  >
                    <Check className="w-12 h-12 text-[#CCFF00] mx-auto mb-4" />
                    <p className="text-lg font-black text-[#CCFF00] uppercase mb-2">
                      Solicitare Trimisă!
                    </p>
                    <p className="text-sm text-[#CCFF00]/80 font-mono">{success}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
