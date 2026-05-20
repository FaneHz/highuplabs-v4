"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useTranslations } from "@/lib/i18n-context";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Lightbulb,
  Target,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Calculator,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { AIAnalysisPanel } from "./AIAnalysisPanel";
import { ScenarioComparison, type CalculatorScenario } from "./ScenarioComparison";
import { InputTooltip, getValidationWarning } from "./CalculatorTooltip";
import { analyzeMargins, type MarginAnalysisResult } from "@/lib/actions/ai";
import {
  getCalculatorScenarios,
  saveCalculatorScenario,
  deleteCalculatorScenario,
  type CalculatorScenarioRecord,
} from "@/lib/actions/calculator";

interface CalculatorInputs {
  revenue: number;
  cogs: number;
  fulfillment: number;
  adSpend: number;
  fixedCosts: number;
  agencyFeePercent: number;
}

interface MarginCalculatorProps {
  reportedRoas?: number;
}

const STEPS = [
  { key: "revenue", label: "Venituri lunare", placeholder: "ex: 50000", unit: "€" },
  { key: "cogs", label: "Cost bunuri vândute (COGS)", placeholder: "ex: 15000", unit: "€" },
  { key: "fulfillment", label: "Cost livrare & fulfillment", placeholder: "ex: 3000", unit: "€" },
  { key: "adSpend", label: "Cheltuieli reclame", placeholder: "ex: 8000", unit: "€" },
  { key: "fixedCosts", label: "Cheltuieli fixe (salarii, chirie, etc.)", placeholder: "ex: 12000", unit: "€" },
  { key: "agencyFeePercent", label: "Comision agenție (%)", placeholder: "ex: 7", unit: "%" },
];

/* ─── Helpers ─── */

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

function getHealthScoreColor(score: number) {
  if (score < 40) return "#EF3E36";
  if (score <= 70) return "#FACC15";
  return "#22C55E";
}

function CircularScore({ score, label }: { score: number; label: string }) {
  const color = getHealthScoreColor(score);
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (clamp(score, 0, 100) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-40 h-40">
        <svg height="160" width="160" className="absolute top-0 left-0">
          <circle
            stroke="#F1EFE8"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            fill="transparent"
            strokeLinecap="butt"
          />
          <circle
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset, transition: "stroke-dashoffset 0.8s ease-out" }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            fill="transparent"
            strokeLinecap="butt"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-4xl font-bold" style={{ color }}>
            {Math.round(score)}
          </span>
          <span className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider mt-1">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Recommendations engine ─── */

interface Recommendation {
  id: string;
  text: string;
  type: "danger" | "warning" | "success" | "info";
  icon: React.ReactNode;
}

function generateRecommendations(inputs: CalculatorInputs, results: ReturnType<typeof useCalculatorResults>): Recommendation[] {
  const { revenue, cogs, adSpend } = inputs;
  const { netMargin, ebitda, breakEvenRevenue, agencyFee } = results;
  const recs: Recommendation[] = [];

  if (netMargin < 10) {
    recs.push({
      id: "low-margin",
      text: "Marja ta e sub 10%. Consideră: negociere cu furnizori, creștere preț, sau reducere COGS.",
      type: "danger",
      icon: <AlertTriangle className="w-5 h-5" />,
    });
  }

  if (revenue > 0 && adSpend / revenue > 0.3) {
    recs.push({
      id: "high-adspend",
      text: "Cheltuielile pe reclame depășesc 30% din venituri. Testează canale organice sau crește ROAS.",
      type: "warning",
      icon: <TrendingUp className="w-5 h-5" />,
    });
  }

  if (revenue > 0 && breakEvenRevenue > revenue * 1.5) {
    recs.push({
      id: "far-breakeven",
      text: "Break-even-ul e departe. Fie crești venituri cu 50%+, fie reduci fixele.",
      type: "danger",
      icon: <Target className="w-5 h-5" />,
    });
  }

  if (ebitda > 0 && agencyFee / ebitda > 0.3) {
    recs.push({
      id: "high-agency",
      text: "Comisionul agenției mănâncă >30% din profit. Negociază sau aduce ads in-house.",
      type: "warning",
      icon: <AlertTriangle className="w-5 h-5" />,
    });
  }

  if (netMargin > 25 && revenue > 0 && adSpend / revenue < 0.2) {
    recs.push({
      id: "solid-business",
      text: "Business solid! Scalează bugetul de ads cu 20-30%.",
      type: "success",
      icon: <TrendingUp className="w-5 h-5" />,
    });
  }

  if (revenue > 0 && cogs / revenue > 0.6) {
    recs.push({
      id: "high-cogs",
      text: "COGS e prea mare (>60%). Caută furnizori alternativi sau optimiză stocurile.",
      type: "warning",
      icon: <Lightbulb className="w-5 h-5" />,
    });
  }

  if (recs.length === 0) {
    recs.push({
      id: "default",
      text: "Completează datele pentru a primi recomandări personalizate.",
      type: "info",
      icon: <Lightbulb className="w-5 h-5" />,
    });
  }

  return recs;
}

/* ─── Action Items ─── */

interface ActionItem {
  id: string;
  label: string;
  impact: "high" | "medium" | "low";
}

function generateActionItems(inputs: CalculatorInputs, results: ReturnType<typeof useCalculatorResults>): ActionItem[] {
  const { revenue, cogs, adSpend, agencyFeePercent } = inputs;
  const { netMargin, ebitda, breakEvenRevenue } = results;
  const items: ActionItem[] = [];

  if (revenue > 0 && cogs / revenue > 0.55) {
    items.push({ id: "neg-cogs", label: "Negociază COGS cu furnizorul principal", impact: "high" });
  }

  if (revenue > 0 && adSpend / revenue > 0.25) {
    items.push({ id: "test-creative", label: "Testează 2 noi creative-uri pe Meta", impact: "high" });
  }

  if (netMargin < 15) {
    items.push({ id: "raise-price", label: "Crește prețul cu 10% pe produsele premium", impact: "high" });
  }

  if (breakEvenRevenue > revenue * 1.3) {
    items.push({ id: "cut-fixed", label: "Redu cheltuielile fixe cu 15%", impact: "medium" });
  }

  if (agencyFeePercent > 10) {
    items.push({ id: "neg-agency", label: "Renegociază comisionul agenției", impact: "medium" });
  }

  if (adSpend > 0 && ebitda > 0) {
    items.push({ id: "organic", label: "Investește în 2 canale organice (SEO/email)", impact: "medium" });
  }

  if (items.length === 0) {
    items.push({ id: "review", label: "Revizuiește strategia de pricing lunar", impact: "low" });
  }

  const impactOrder = { high: 0, medium: 1, low: 2 };
  return items.sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact]);
}

/* ─── Benchmarks ─── */

function BenchmarkChart({
  netMargin,
  adSpendRatio,
  roas,
}: {
  netMargin: number;
  adSpendRatio: number;
  roas: number;
}) {
  const data = [
    { name: "Marjă neta (%)", yours: netMargin, min: 15, max: 25 },
    { name: "Ad spend / Rev (%)", yours: adSpendRatio * 100, min: 15, max: 25 },
    { name: "ROAS (x)", yours: roas, min: 3, max: 5 },
  ];

  const colors = ["#CCFF00", "#0A0A0A", "#EF3E36"];

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }} barGap={4}>
          <CartesianGrid strokeDasharray="4 4" stroke="var(--color-bg-alt)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "var(--color-muted)" }}
            tickLine={false}
            axisLine={{ stroke: "var(--color-ink)", strokeWidth: 2 }}
          />
          <YAxis
            tick={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "var(--color-muted)" }}
            tickLine={false}
            axisLine={{ stroke: "var(--color-ink)", strokeWidth: 2 }}
          />
          <Tooltip
            contentStyle={{
              background: "var(--color-card)",
              border: "3px solid var(--color-ink)",
              boxShadow: "3px 3px 0 0 #0A0A0A",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
            }}
          />
          <Bar dataKey="yours" name="Tu" radius={[0, 0, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={`y-${i}`} fill={colors[i % colors.length]} stroke="var(--color-ink)" strokeWidth={2} />
            ))}
          </Bar>
          <Bar dataKey="min" name="Min industrie" fill="#F1EFE8" stroke="var(--color-ink)" strokeWidth={2} radius={[0, 0, 0, 0]} />
          <Bar dataKey="max" name="Max industrie" fill="#E8E6DF" stroke="var(--color-ink)" strokeWidth={2} radius={[0, 0, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── Hook results ─── */

function useCalculatorResults(inputs: CalculatorInputs) {
  return useMemo(() => {
    const grossProfit = inputs.revenue - inputs.cogs - inputs.fulfillment;
    const agencyFee = inputs.revenue * (inputs.agencyFeePercent / 100);
    const ebitda = grossProfit - inputs.adSpend - inputs.fixedCosts - agencyFee;
    const netMargin = inputs.revenue > 0 ? (ebitda / inputs.revenue) * 100 : 0;
    const breakEvenRevenue =
      inputs.revenue > 0
        ? (inputs.fixedCosts + inputs.adSpend + agencyFee) /
          (1 - (inputs.cogs + inputs.fulfillment) / inputs.revenue)
        : 0;
    return { grossProfit, agencyFee, ebitda, netMargin, breakEvenRevenue };
  }, [inputs]);
}

/* ─── Main Component ─── */

export function MarginCalculator({ reportedRoas = 0 }: MarginCalculatorProps) {
  const t = useTranslations("calculator");
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    revenue: 50000,
    cogs: 15000,
    fulfillment: 3000,
    adSpend: 8000,
    fixedCosts: 12000,
    agencyFeePercent: 7,
  });
  const [showResults, setShowResults] = useState(false);
  const [checkedActions, setCheckedActions] = useState<Set<string>>(new Set());
  
  // AI Analysis state
  const [aiData, setAiData] = useState<MarginAnalysisResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
  // Scenarios state
  const [scenarios, setScenarios] = useState<CalculatorScenario[]>([]);
  const [compareScenarios, setCompareScenarios] = useState<CalculatorScenario[]>([]);

  // Load scenarios from Supabase on mount
  useEffect(() => {
    async function load() {
      try {
        const data: CalculatorScenarioRecord[] = await getCalculatorScenarios();
        setScenarios(
          data.map((s: CalculatorScenarioRecord) => ({
            id: s.id,
            name: s.name,
            created_at: s.created_at,
            inputs: s.inputs as CalculatorScenario["inputs"],
            results: s.results as CalculatorScenario["results"],
          }))
        );
      } catch (err) {
        console.error("[MarginCalculator] Failed to load scenarios:", err);
      }
    }
    load();
  }, []);

  const results = useCalculatorResults(inputs);
  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const healthScore = useMemo(() => {
    const netMarginScore = clamp(results.netMargin, 0, 50) * 2;
    const roasScore = clamp(reportedRoas, 0, 10) * 5;
    const beRatio = results.breakEvenRevenue > 0 && inputs.revenue > 0 ? inputs.revenue / results.breakEvenRevenue : 0;
    const revenueScore = clamp(beRatio, 0, 2) * 50;
    return clamp(netMarginScore + roasScore + revenueScore, 0, 100);
  }, [results, reportedRoas, inputs.revenue, results.breakEvenRevenue]);

  const recommendations = useMemo(() => generateRecommendations(inputs, results), [inputs, results]);
  const actionItems = useMemo(() => generateActionItems(inputs, results), [inputs, results]);

  // Smart validation
  const validationWarning = useMemo(() => {
    if (!currentStep) return null;
    return getValidationWarning(currentStep.key, inputs[currentStep.key as keyof CalculatorInputs], inputs);
  }, [currentStep, inputs]);

  function updateValue(key: keyof CalculatorInputs, value: string) {
    const num = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  }

  function toggleAction(id: string) {
    setCheckedActions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // AI Analysis handler
  const handleAnalyze = useCallback(async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const data = await analyzeMargins({
        inputs: {
          ...inputs,
          ...results,
          reportedRoas,
          healthScore,
        },
        metaContext: {
          industry: "e-commerce",
          currency: "EUR",
          analysis_type: "monthly",
        },
      });
      setAiData(data);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Eroare necunoscută");
    } finally {
      setAiLoading(false);
    }
  }, [inputs, results, reportedRoas, healthScore]);

  // Scenario handlers
  const handleSaveScenario = useCallback(async (name: string) => {
    try {
      const saved = await saveCalculatorScenario({
        name,
        inputs: { ...inputs },
        results: { ...results },
      });
      const newScenario: CalculatorScenario = {
        id: saved.id,
        name: saved.name,
        created_at: saved.created_at,
        inputs: saved.inputs as CalculatorScenario["inputs"],
        results: saved.results as CalculatorScenario["results"],
      };
      setScenarios((prev) => [newScenario, ...prev]);
    } catch (err) {
      console.error("[MarginCalculator] Failed to save scenario:", err);
    }
  }, [inputs, results]);

  const handleDeleteScenario = useCallback(async (id: string) => {
    try {
      await deleteCalculatorScenario(id);
      setScenarios((prev) => prev.filter((s) => s.id !== id));
      setCompareScenarios((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("[MarginCalculator] Failed to delete scenario:", err);
    }
  }, []);

  const handleLoadScenario = useCallback((scenario: CalculatorScenario) => {
    setInputs(scenario.inputs);
    setShowResults(false);
    setStep(0);
    setAiData(null);
  }, []);

  const handleCompareScenario = useCallback((scenario: CalculatorScenario) => {
    setCompareScenarios((prev) => {
      if (prev.some((s) => s.id === scenario.id)) return prev;
      return [...prev, scenario].slice(0, 2);
    });
  }, []);

  const hasData = useMemo(() => {
    return inputs.revenue > 0 && inputs.cogs >= 0 && inputs.adSpend >= 0;
  }, [inputs]);

  const borderLeftColors: Record<string, string> = {
    danger: "border-l-[6px] border-l-[var(--color-red)]",
    warning: "border-l-[6px] border-l-[#FACC15]",
    success: "border-l-[6px] border-l-green-500",
    info: "border-l-[6px] border-l-blue-500",
  };

  const recBgColors: Record<string, string> = {
    danger: "bg-red-50",
    warning: "bg-yellow-50",
    success: "bg-green-50",
    info: "bg-blue-50",
  };

  if (showResults) {
    return (
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-3xl">{t("title")}</h1>
            <button
              onClick={() => {
                setShowResults(false);
                setAiData(null);
              }}
              className="btn-brutal-ghost text-xs hover:bg-[var(--color-ink)] hover:text-[var(--color-lime)] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Recalculează
            </button>
          </div>

          {/* Health Score */}
          <div className="brutal-card p-8 flex flex-col sm:flex-row items-center gap-8">
            <CircularScore score={healthScore} label={t("healthScore")} />
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <p className="font-heading font-bold text-lg">
                {healthScore < 40 ? t("scorePoor") : healthScore <= 70 ? t("scoreAverage") : t("scoreGood")}
              </p>
              <p className="font-mono text-sm text-[var(--color-muted)]">
                {t("scoreDescription")}
              </p>
            </div>
          </div>

          {/* Main Result */}
          <div className="brutal-card p-8 bg-[var(--color-lime)]">
            <p className="font-mono text-sm uppercase tracking-wider mb-2">{t("resultEbitda")}</p>
            <p className="font-mono text-5xl font-bold">
              €{results.ebitda.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
            </p>
            <p className="font-heading font-semibold mt-2">
              {t("resultMargin")}: {results.netMargin.toFixed(1)}%
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="brutal-card p-5">
              <p className="text-xs font-mono uppercase text-[var(--color-muted)]">{t("grossProfit")}</p>
              <p className="font-mono text-xl font-bold mt-1">
                €{results.grossProfit.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="brutal-card p-5">
              <p className="text-xs font-mono uppercase text-[var(--color-muted)]">{t("agencyFee")}</p>
              <p className="font-mono text-xl font-bold mt-1">
                €{results.agencyFee.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="brutal-card p-5">
              <p className="text-xs font-mono uppercase text-[var(--color-muted)]">{t("resultBreakEven")}</p>
              <p className="font-mono text-xl font-bold mt-1">
                €{results.breakEvenRevenue.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="brutal-card p-6">
            <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              {t("recommendationsTitle")}
            </h2>
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-4 ${recBgColors[rec.type]} ${borderLeftColors[rec.type]} border-[3px] border-[var(--color-ink)] flex items-start gap-3`}
                >
                  <span className="mt-0.5 shrink-0">{rec.icon}</span>
                  <p className="font-mono text-sm leading-relaxed">{rec.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="brutal-card p-6">
            <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              {t("actionItemsTitle")}
            </h2>
            <div className="space-y-2">
              {actionItems.map((item) => {
                const checked = checkedActions.has(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleAction(item.id)}
                    className={`w-full text-left p-3 border-[3px] border-[var(--color-ink)] flex items-center gap-3 transition-all ${
                      checked ? "bg-[var(--color-lime)] opacity-70" : "bg-[var(--color-card)] hover:bg-[var(--color-bg-alt)]"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 border-[3px] border-[var(--color-ink)] flex items-center justify-center transition-colors ${
                        checked ? "bg-[var(--color-ink)]" : "bg-white"
                      }`}
                    >
                      {checked && <Check className="w-3 h-3 text-[var(--color-lime)]" />}
                    </span>
                    <span className={`font-mono text-sm flex-1 ${checked ? "line-through text-[var(--color-muted)]" : ""}`}>
                      {item.label}
                    </span>
                    <span
                      className={`sticker text-[10px] ${
                        item.impact === "high"
                          ? "bg-[var(--color-red)] text-white"
                          : item.impact === "medium"
                          ? "bg-[var(--color-lime)]"
                          : "bg-[var(--color-bg-alt)]"
                      }`}
                    >
                      {item.impact === "high" ? "HIGH" : item.impact === "medium" ? "MED" : "LOW"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Benchmarks */}
          <div className="brutal-card p-6">
            <h2 className="font-heading font-bold text-lg mb-4">{t("benchmarksTitle")}</h2>
            <BenchmarkChart
              netMargin={results.netMargin}
              adSpendRatio={inputs.revenue > 0 ? inputs.adSpend / inputs.revenue : 0}
              roas={reportedRoas}
            />
            <p className="font-mono text-xs text-[var(--color-muted)] mt-3">
              {t("benchmarksLegend")}
            </p>
          </div>

          {/* Scenarios */}
          <div className="brutal-card p-6">
            <h2 className="font-heading font-bold text-lg mb-4">{t("scenarioTitle")}</h2>
            <div className="space-y-3">
              {[
                { label: t("scenarioRoas20"), impact: results.ebitda * 0.2 },
                { label: t("scenarioAds15"), impact: inputs.adSpend * 0.15 },
                { label: t("scenarioRevenue30"), impact: results.ebitda * 0.3 },
              ].map((scenario) => (
                <div
                  key={scenario.label}
                  className="flex items-center justify-between p-3 bg-[var(--color-bg-alt)] border-[2px] border-[var(--color-ink)]"
                >
                  <span className="font-heading font-semibold text-sm">{scenario.label}</span>
                  <span className="font-mono font-bold text-green-600">
                    +€{scenario.impact.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="brutal-card p-6">
            <h2 className="font-heading font-bold text-lg mb-4">{t("costStructure")}</h2>
            <div className="space-y-3">
              {[
                { label: "COGS", value: inputs.cogs, color: "bg-[var(--color-red)]" },
                { label: "Fulfillment", value: inputs.fulfillment, color: "bg-orange-400" },
                { label: "Reclame", value: inputs.adSpend, color: "bg-blue-400" },
                { label: "Fixe", value: inputs.fixedCosts, color: "bg-purple-400" },
                { label: "Comision HUL", value: results.agencyFee, color: "bg-[var(--color-lime-dark)]" },
                { label: "EBITDA", value: Math.max(0, results.ebitda), color: "bg-green-500" },
              ].map((item) => {
                const pct = inputs.revenue > 0 ? (item.value / inputs.revenue) * 100 : 0;
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-heading font-semibold">{item.label}</span>
                      <span className="font-mono">
                        €{item.value.toLocaleString("ro-RO", { maximumFractionDigits: 0 })} ({pct.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-4 bg-[var(--color-bg-alt)] border-[2px] border-[var(--color-ink)]">
                      <div
                        className={`h-full ${item.color} transition-all duration-500`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scenario Comparison */}
          <div className="brutal-card p-6">
            <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Comparare Scenarii
            </h2>
            <ScenarioComparison
              scenarios={scenarios}
              currentInputs={inputs}
              currentResults={results}
              onSave={handleSaveScenario}
              onDelete={handleDeleteScenario}
              onLoad={handleLoadScenario}
              onCompare={handleCompareScenario}
              compareScenarios={compareScenarios}
            />
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-8">
            <AIAnalysisPanel
              data={aiData}
              loading={aiLoading}
              error={aiError}
              onAnalyze={handleAnalyze}
              hasData={hasData}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 max-w-xl">
        <h1 className="font-display text-3xl mb-2">{t("title")}</h1>
        <p className="font-mono text-sm text-[var(--color-muted)] mb-8">
          {t("description")}
        </p>

        {/* Progress bar */}
        <div className="h-3 bg-[var(--color-bg-alt)] border-[3px] border-[var(--color-ink)] mb-8">
          <div
            className="h-full bg-[var(--color-lime)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step card */}
        <div className="brutal-card p-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-mono uppercase text-[var(--color-muted)]">
              {t("stepCounter", { current: step + 1, total: STEPS.length })}
            </p>
            <InputTooltip fieldKey={currentStep.key} />
          </div>

          <h2 className="font-heading font-bold text-xl mb-6">{currentStep.label}</h2>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[var(--color-muted)]">
              {currentStep.unit === "%" ? "" : currentStep.unit}
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={inputs[currentStep.key as keyof CalculatorInputs]}
              onChange={(e) => updateValue(currentStep.key as keyof CalculatorInputs, e.target.value)}
              placeholder={currentStep.placeholder}
              className="w-full px-4 py-4 bg-[var(--color-bg)] border-[3px] border-[var(--color-ink)] font-mono text-2xl font-bold focus:outline-none focus:shadow-[3px_3px_0_0_#0A0A0A]"
              autoFocus
            />
            {currentStep.unit === "%" && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[var(--color-muted)]">%</span>
            )}
          </div>

          {/* Smart validation warning */}
          {validationWarning && (
            <div className="mt-3 p-3 bg-yellow-50 border-[2px] border-[#FACC15] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
              <p className="font-mono text-xs">{validationWarning}</p>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-brutal-ghost hover:bg-[var(--color-ink)] hover:text-[var(--color-lime)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("back")}
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="btn-brutal ml-auto"
              >
                {t("continue")}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowResults(true)}
                className="btn-brutal ml-auto"
              >
                {t("calculate")}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Summary preview */}
        {step > 0 && (
          <div className="mt-6 brutal-card p-5">
            <p className="text-xs font-mono uppercase text-[var(--color-muted)] mb-3">{t("quickSummary")}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {STEPS.slice(0, step + 1).map((s) => (
                <div key={s.key} className="flex justify-between">
                  <span className="font-heading font-semibold text-[var(--color-muted)]">{s.label}</span>
                  <span className="font-mono">
                    {s.unit === "%" ? "" : s.unit}
                    {inputs[s.key as keyof CalculatorInputs].toLocaleString("ro-RO")}
                    {s.unit === "%" ? "%" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Sidebar - shown on input screen too */}
      <div className="space-y-6">
        <div className="sticky top-8">
          <div className="brutal-card p-8 text-center space-y-4">
            <div className="w-16 h-16 border-[3px] border-[var(--color-ink)] bg-[var(--color-bg-alt)] flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-[var(--color-muted)]" />
            </div>
            <h3 className="font-heading font-bold text-lg">AI Financial Advisor</h3>
            <p className="font-mono text-sm text-[var(--color-muted)]">
              CompleteazÄƒ toate câmpurile È™i apasÄƒ &quot;CalculeazÄƒ&quot; pentru a primi o analizÄƒ completÄƒ cu AI.
            </p>
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--color-lime)]" />
                <span className="font-mono text-xs">Scor profitabilitate 0-100</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--color-lime)]" />
                <span className="font-mono text-xs">Analiză break-even</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--color-lime)]" />
                <span className="font-mono text-xs">Recomandări acționabile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--color-lime)]" />
                <span className="font-mono text-xs">Identificare riscuri</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}