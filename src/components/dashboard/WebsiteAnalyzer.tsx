"use client";

import { useState } from "react";
import { analyzeWebsite, WebsiteAnalysisResult } from "@/lib/actions/ai";
import {
  Search,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Info,
  Target,
  TrendingUp,
  Shield,
  Smartphone,
  Heading,
  FileText,
  ArrowRight,
} from "lucide-react";

function ScoreBar({ score, label, icon }: { score: number; label: string; icon: React.ReactNode }) {
  const getColor = (s: number) => {
    if (s >= 8) return "bg-green-500";
    if (s >= 5) return "bg-yellow-400";
    return "bg-[var(--color-red)]";
  };

  return (
    <div className="brutal-card p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 border-[3px] border-[var(--color-ink)] bg-[var(--color-bg-alt)] flex items-center justify-center">
          {icon}
        </div>
        <span className="font-heading font-semibold text-sm">{label}</span>
        <span className={`ml-auto font-mono text-2xl font-bold ${score >= 5 ? "text-[var(--color-ink)]" : "text-[var(--color-red)]"}`}>
          {score}
          <span className="text-sm text-[var(--color-muted)]">/10</span>
        </span>
      </div>
      <div className="h-4 bg-[var(--color-bg-alt)] border-[2px] border-[var(--color-ink)]">
        <div
          className={`h-full ${getColor(score)} transition-all duration-700`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}

function IssueCard({ issue }: { issue: WebsiteAnalysisResult["issues"][0] }) {
  const severityConfig = {
    high: { icon: <AlertTriangle className="w-5 h-5" />, bg: "bg-red-50", border: "border-l-[6px] border-l-[var(--color-red)]" },
    medium: { icon: <Info className="w-5 h-5" />, bg: "bg-yellow-50", border: "border-l-[6px] border-l-[#FACC15]" },
    low: { icon: <Info className="w-5 h-5" />, bg: "bg-blue-50", border: "border-l-[6px] border-l-blue-500" },
  };

  const config = severityConfig[issue.severity];

  return (
    <div className={`p-4 ${config.bg} ${config.border} border-[3px] border-[var(--color-ink)] flex items-start gap-3`}>
      <span className="mt-0.5 shrink-0">{config.icon}</span>
      <div className="space-y-1">
        <p className="font-mono text-sm font-semibold leading-relaxed">{issue.description}</p>
        <p className="font-mono text-xs text-[var(--color-muted)]">Impact: {issue.impact}</p>
      </div>
    </div>
  );
}

function RecommendationCard({ rec }: { rec: WebsiteAnalysisResult["recommendations"][0] }) {
  const priorityConfig = {
    high: { sticker: "bg-[var(--color-red)] text-white", label: "HIGH" },
    medium: { sticker: "bg-[var(--color-lime)]", label: "MED" },
    low: { sticker: "bg-[var(--color-bg-alt)]", label: "LOW" },
  };

  const config = priorityConfig[rec.priority];

  return (
    <div className="brutal-card p-4 flex items-start gap-3">
      <div className="w-8 h-8 border-[3px] border-[var(--color-ink)] bg-[var(--color-lime)] flex items-center justify-center shrink-0">
        <TrendingUp className="w-4 h-4 text-[var(--color-ink)]" />
      </div>
      <div className="flex-1 space-y-2">
        <p className="font-mono text-sm font-semibold leading-relaxed">{rec.action}</p>
        <p className="font-mono text-xs text-[var(--color-muted)]">{rec.expectedImpact}</p>
      </div>
      <span className={`sticker text-[10px] shrink-0 ${config.sticker}`}>{config.label}</span>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="brutal-card p-12 text-center space-y-6">
      <div className="relative w-20 h-20 mx-auto">
        <div className="absolute inset-0 border-[4px] border-[var(--color-bg-alt)]" />
        <div className="absolute inset-0 border-[4px] border-[var(--color-lime)] border-t-transparent animate-spin" />
        <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-[var(--color-lime)] animate-spin" />
      </div>
      <div className="space-y-2">
        <p className="font-heading font-bold text-lg">Analiză în curs...</p>
        <p className="font-mono text-sm text-[var(--color-muted)]">
          Fetch HTML, extrag elemente, evaluez CRO...
        </p>
      </div>
      <div className="flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-[var(--color-lime)] animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function WebsiteAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WebsiteAnalysisResult | null>(null);
  const [error, setError] = useState("");

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await analyzeWebsite(url.trim());
      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Eroare la analiză";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const averageScore = result
    ? result.scores.reduce((acc, s) => acc + s.score, 0) / result.scores.length
    : 0;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl">Website Analyzer</h1>
        <p className="font-mono text-sm text-[var(--color-muted)] mt-1">
          Analizează orice website pentru optimizarea ratei de conversie (CRO)
        </p>
      </div>

      {/* Input */}
      <form onSubmit={handleAnalyze} className="brutal-card p-6">
        <label className="block font-mono text-xs uppercase tracking-wider text-[var(--color-muted)] mb-3">
          URL Website
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted)]" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full pl-12 pr-4 py-4 bg-[var(--color-bg)] border-[3px] border-[var(--color-ink)] font-mono text-lg focus:outline-none focus:shadow-[0_0_0_4px_var(--color-lime)] transition-shadow"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="btn-brutal px-6 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            Analizează
          </button>
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-50 border-[3px] border-[var(--color-red)] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[var(--color-red)] shrink-0 mt-0.5" />
            <p className="font-mono text-sm text-[var(--color-red)]">{error}</p>
          </div>
        )}
      </form>

      {/* Loading */}
      {loading && <LoadingState />}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-8">
          {/* Executive Summary */}
          <div className={`brutal-card p-8 ${averageScore >= 7 ? "border-green-600" : averageScore >= 5 ? "border-[#FACC15]" : "border-[var(--color-red)]"}`}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-32 h-32">
                <svg height="128" width="128" className="absolute top-0 left-0">
                  <circle
                    stroke="var(--color-bg-alt)"
                    strokeWidth={10}
                    r={54}
                    cx={64}
                    cy={64}
                    fill="transparent"
                  />
                  <circle
                    stroke={averageScore >= 7 ? "#22C55E" : averageScore >= 5 ? "#FACC15" : "var(--color-red)"}
                    strokeWidth={10}
                    strokeDasharray={`${averageScore * 33.9} ${339 - averageScore * 33.9}`}
                    strokeLinecap="butt"
                    r={54}
                    cx={64}
                    cy={64}
                    fill="transparent"
                    transform="rotate(-90 64 64)"
                    style={{ transition: "stroke-dasharray 0.8s ease-out" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-4xl font-bold">{averageScore.toFixed(1)}</span>
                  <span className="font-mono text-xs text-[var(--color-muted)]">/10</span>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-heading font-bold text-xl mb-2">Sumar Executiv</h2>
                <p className="font-mono text-sm leading-relaxed text-[var(--color-muted)]">{result.summary}</p>
              </div>
            </div>
          </div>

          {/* Scores */}
          <div>
            <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Scoruri CRO
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.scores.map((score) => (
                <ScoreBar
                  key={score.category}
                  score={score.score}
                  label={score.category}
                  icon={
                    score.category.includes("Headline") ? <Heading className="w-4 h-4" /> :
                    score.category.includes("CTA") ? <ArrowRight className="w-4 h-4" /> :
                    score.category.includes("Social") ? <CheckCircle2 className="w-4 h-4" /> :
                    score.category.includes("Trust") ? <Shield className="w-4 h-4" /> :
                    <Smartphone className="w-4 h-4" />
                  }
                />
              ))}
            </div>
          </div>

          {/* Issues */}
          {result.issues.length > 0 && (
            <div>
              <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[var(--color-red)]" />
                Probleme Identificate
              </h2>
              <div className="space-y-3">
                {result.issues.map((issue, i) => (
                  <IssueCard key={i} issue={issue} />
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div>
              <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--color-lime)]" />
                Recomandări Prioritizate
              </h2>
              <div className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <RecommendationCard key={i} rec={rec} />
                ))}
              </div>
            </div>
          )}

          {/* Score Details */}
          <div className="brutal-card p-6">
            <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Detalii Scoruri
            </h2>
            <div className="space-y-4">
              {result.scores.map((score) => (
                <div key={score.category} className="border-b-2 border-[var(--color-bg-alt)] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-semibold text-sm">{score.category}</span>
                    <span className={`font-mono font-bold ${score.score >= 5 ? "text-[var(--color-ink)]" : "text-[var(--color-red)]"}`}>
                      {score.score}/10
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[var(--color-muted)] leading-relaxed">{score.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}