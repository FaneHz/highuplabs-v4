"use client";

import { useState } from "react";
import {
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
  Loader2,
  Sparkles,
  BarChart3,
  Target,
  AlertOctagon,
} from "lucide-react";
import type { MarginAnalysisResult } from "@/lib/actions/ai";

interface AIAnalysisPanelProps {
  data: MarginAnalysisResult | null;
  loading: boolean;
  error: string | null;
  onAnalyze: () => void;
  hasData: boolean;
}

function ScoreRing({ score }: { score: number }) {
  const color =
    score < 40 ? "#EF3E36" : score <= 70 ? "#FACC15" : "#22C55E";
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (Math.min(score, 100) / 100) * circumference;

  return (
    <div className="relative w-28 h-28">
      <svg height="112" width="112" className="absolute top-0 left-0">
        <circle
          stroke="#F1EFE8"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          fill="transparent"
        />
        <circle
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset, transition: "stroke-dashoffset 0.8s ease-out" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          fill="transparent"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-3xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase">din 100</span>
      </div>
    </div>
  );
}

function PriorityBadge({ level }: { level: "high" | "medium" | "low" }) {
  const config = {
    high: { bg: "bg-[var(--color-red)]", text: "text-white", label: "HIGH" },
    medium: { bg: "bg-[var(--color-lime)]", text: "text-[var(--color-ink)]", label: "MED" },
    low: { bg: "bg-[var(--color-bg-alt)]", text: "text-[var(--color-ink)]", label: "LOW" },
  };
  const c = config[level];
  return (
    <span className={`sticker ${c.bg} ${c.text}`}>{c.label}</span>
  );
}

function SeverityBadge({ level }: { level: "high" | "medium" | "low" }) {
  const config = {
    high: { border: "border-l-[6px] border-l-[var(--color-red)]", bg: "bg-red-50" },
    medium: { border: "border-l-[6px] border-l-[#FACC15]", bg: "bg-yellow-50" },
    low: { border: "border-l-[6px] border-l-blue-400", bg: "bg-blue-50" },
  };
  const c = config[level];
  return { borderClass: c.border, bgClass: c.bg };
}

export function AIAnalysisPanel({
  data,
  loading,
  error,
  onAnalyze,
  hasData,
}: AIAnalysisPanelProps) {
  const [expandedRecs, setExpandedRecs] = useState(true);
  const [expandedRisks, setExpandedRisks] = useState(true);
  const [expandedScale, setExpandedScale] = useState(true);

  if (loading) {
    return (
      <div className="brutal-card p-8 text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--color-muted)]" />
        <p className="font-mono text-sm text-[var(--color-muted)]">
          Analizăm datele financiare cu AI...
        </p>
        <p className="font-mono text-xs text-[var(--color-muted)]">
          Acest proces poate dura până la 30 de secunde
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="brutal-card p-6 border-[var(--color-red)]">
        <div className="flex items-start gap-3">
          <AlertOctagon className="w-5 h-5 text-[var(--color-red)] shrink-0 mt-0.5" />
          <div>
            <p className="font-mono text-sm text-[var(--color-red)] font-bold">Eroare analiză AI</p>
            <p className="font-mono text-xs text-[var(--color-muted)] mt-1">{error}</p>
            <button
              onClick={onAnalyze}
              className="btn-brutal-ghost text-xs mt-3 hover:bg-[var(--color-ink)] hover:text-[var(--color-lime)]"
            >
              Reîncearcă
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="brutal-card p-8 text-center space-y-4">
        <div className="w-16 h-16 border-[3px] border-[var(--color-ink)] bg-[var(--color-bg-alt)] flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-[var(--color-muted)]" />
        </div>
        <h3 className="font-heading font-bold text-lg">AI Financial Advisor</h3>
        <p className="font-mono text-sm text-[var(--color-muted)] max-w-sm mx-auto">
          Primește o analiză completă a profitabilității, recomandări acționabile și identificarea riscurilor.
        </p>
        <button
          onClick={onAnalyze}
          disabled={!hasData}
          className="btn-brutal disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Lightbulb className="w-4 h-4" />
          Analizează cu AI
        </button>
        {!hasData && (
          <p className="font-mono text-xs text-[var(--color-muted)]">
            Completează toate câmpurile pentru a activa analiza AI
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with score */}
      <div className="brutal-card p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ScoreRing score={data.profitability_score} />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-heading font-bold text-lg flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-5 h-5 text-[var(--color-lime-dark)]" />
              Analiză AI Profitabilitate
            </h3>
            <p className="font-mono text-sm text-[var(--color-muted)] mt-1">
              {data.profitability_score < 40
                ? "Business-ul are nevoie de atenție urgentă"
                : data.profitability_score <= 70
                ? "Există potențial, dar sunt zone de îmbunătățit"
                : "Business solid, gata de scalare"}
            </p>
            <button
              onClick={onAnalyze}
              className="btn-brutal-ghost text-xs mt-3 hover:bg-[var(--color-ink)] hover:text-[var(--color-lime)]"
            >
              <Zap className="w-3 h-3" />
              Reanalizează
            </button>
          </div>
        </div>
      </div>

      {/* Break-even Analysis */}
      <div className="brutal-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-[var(--color-ink)]" />
          <h4 className="font-heading font-bold">Analiză Break-Even</h4>
        </div>
        <p className="font-mono text-sm leading-relaxed">{data.break_even_analysis}</p>
      </div>

      {/* Recommendations */}
      <div className="brutal-card p-6">
        <button
          onClick={() => setExpandedRecs(!expandedRecs)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[var(--color-lime-dark)]" />
            <h4 className="font-heading font-bold">Recomandări ({data.recommendations.length})</h4>
          </div>
          {expandedRecs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedRecs && (
          <div className="mt-4 space-y-3">
            {data.recommendations.map((rec, i) => (
              <div
                key={i}
                className="p-4 bg-[var(--color-bg-alt)] border-[2px] border-[var(--color-ink)]"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-heading font-semibold text-sm">{rec.action}</span>
                  <PriorityBadge level={rec.priority} />
                </div>
                <p className="font-mono text-xs text-[var(--color-muted)] mb-1">{rec.impact}</p>
                <p className="font-mono text-xs font-bold text-green-600">{rec.estimated_value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Risks */}
      <div className="brutal-card p-6">
        <button
          onClick={() => setExpandedRisks(!expandedRisks)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--color-red)]" />
            <h4 className="font-heading font-bold">Riscuri Identificate ({data.risks.length})</h4>
          </div>
          {expandedRisks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedRisks && (
          <div className="mt-4 space-y-3">
            {data.risks.map((risk, i) => {
              const { borderClass, bgClass } = SeverityBadge({ level: risk.severity });
              return (
                <div
                  key={i}
                  className={`p-4 ${bgClass} ${borderClass} border-[3px] border-[var(--color-ink)]`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading font-semibold text-sm">{risk.description}</span>
                        <PriorityBadge level={risk.severity} />
                      </div>
                      <p className="font-mono text-xs text-[var(--color-muted)]">
                        <span className="font-bold">Mitigare:</span> {risk.mitigation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Scaling Opportunities */}
      <div className="brutal-card p-6">
        <button
          onClick={() => setExpandedScale(!expandedScale)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[var(--color-lime-dark)]" />
            <h4 className="font-heading font-bold">Oportunități de Scalare ({data.scaling_opportunities.length})</h4>
          </div>
          {expandedScale ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedScale && (
          <div className="mt-4 space-y-2">
            {data.scaling_opportunities.map((opp, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-[var(--color-bg-alt)] border-[2px] border-[var(--color-ink)]"
              >
                <BarChart3 className="w-4 h-4 text-[var(--color-lime-dark)] shrink-0 mt-0.5" />
                <span className="font-mono text-sm">{opp}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}