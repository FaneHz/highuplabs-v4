"use client";

import { useState } from "react";
import {
  Trash2,
  BarChart3,
  Plus,
  X,
  Check,
  ArrowRightLeft,
} from "lucide-react";

export interface CalculatorScenario {
  id: string;
  name: string;
  created_at: string;
  inputs: {
    revenue: number;
    cogs: number;
    fulfillment: number;
    adSpend: number;
    fixedCosts: number;
    agencyFeePercent: number;
  };
  results: {
    grossProfit: number;
    agencyFee: number;
    ebitda: number;
    netMargin: number;
    breakEvenRevenue: number;
  };
}

interface ScenarioComparisonProps {
  scenarios: CalculatorScenario[];
  currentInputs: {
    revenue: number;
    cogs: number;
    fulfillment: number;
    adSpend: number;
    fixedCosts: number;
    agencyFeePercent: number;
  };
  currentResults: {
    grossProfit: number;
    agencyFee: number;
    ebitda: number;
    netMargin: number;
    breakEvenRevenue: number;
  };
  onSave: (name: string) => void;
  onDelete: (id: string) => void;
  onLoad: (scenario: CalculatorScenario) => void;
  onCompare: (scenario: CalculatorScenario) => void;
  compareScenarios: CalculatorScenario[];
}

export function ScenarioComparison({
  scenarios,
  currentInputs,
  currentResults,
  onSave,
  onDelete,
  onLoad,
  onCompare,
  compareScenarios,
}: ScenarioComparisonProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [scenarioName, setScenarioName] = useState("");
  const [showComparison, setShowComparison] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (scenarioName.trim()) {
      onSave(scenarioName.trim());
      setScenarioName("");
      setShowSaveDialog(false);
    }
  }

  const comparisonScenarios = compareScenarios.length > 0
    ? [
        {
          id: "current",
          name: "Curent",
          created_at: new Date().toISOString(),
          inputs: currentInputs,
          results: currentResults,
        },
        ...compareScenarios.slice(0, 2),
      ]
    : [];

  const comparisonRows = [
    { label: "Venituri", key: "revenue", format: (v: number) => `€${v.toLocaleString("ro-RO")}`, isInput: true },
    { label: "COGS", key: "cogs", format: (v: number) => `€${v.toLocaleString("ro-RO")}`, isInput: true },
    { label: "Fulfillment", key: "fulfillment", format: (v: number) => `€${v.toLocaleString("ro-RO")}`, isInput: true },
    { label: "Reclame", key: "adSpend", format: (v: number) => `€${v.toLocaleString("ro-RO")}`, isInput: true },
    { label: "Fixe", key: "fixedCosts", format: (v: number) => `€${v.toLocaleString("ro-RO")}`, isInput: true },
    { label: "Comision %", key: "agencyFeePercent", format: (v: number) => `${v}%`, isInput: true },
    { label: "Profit Brut", key: "grossProfit", format: (v: number) => `€${v.toLocaleString("ro-RO")}`, isInput: false },
    { label: "EBITDA", key: "ebitda", format: (v: number) => `€${v.toLocaleString("ro-RO")}`, isInput: false },
    { label: "Marjă Netă", key: "netMargin", format: (v: number) => `${v.toFixed(1)}%`, isInput: false },
    { label: "Break-Even", key: "breakEvenRevenue", format: (v: number) => `€${v.toLocaleString("ro-RO")}`, isInput: false },
  ];

  return (
    <div className="space-y-4">
      {/* Header actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowSaveDialog(true)}
          className="btn-brutal text-xs"
        >
          <Plus className="w-3 h-3" />
          Salvează Scenariu
        </button>

        {scenarios.length > 0 && (
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`btn-brutal-ghost text-xs ${showComparison ? "bg-[var(--color-lime)]" : ""}`}
          >
            <ArrowRightLeft className="w-3 h-3" />
            {showComparison ? "Închide Comparare" : "Compară Scenarii"}
          </button>
        )}
      </div>

      {/* Save dialog */}
      {showSaveDialog && (
        <form onSubmit={handleSave} className="brutal-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-heading font-semibold text-sm">Salvează scenariul curent</span>
            <button
              type="button"
              onClick={() => setShowSaveDialog(false)}
              className="p-1 hover:bg-[var(--color-bg-alt)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <input
            type="text"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            placeholder="ex: Scenariu Optimist, Test Preț +10%"
            className="w-full px-3 py-2 border-[3px] border-[var(--color-ink)] bg-[var(--color-card)] font-mono text-sm focus:outline-none focus:shadow-[0_0_0_4px_var(--color-lime)]"
            autoFocus
          />
          <div className="flex gap-2">
            <button type="submit" className="btn-brutal text-xs">
              <Check className="w-3 h-3" />
              Salvează
            </button>
            <button
              type="button"
              onClick={() => setShowSaveDialog(false)}
              className="btn-brutal-ghost text-xs"
            >
              Anulează
            </button>
          </div>
        </form>
      )}

      {/* Comparison view */}
      {showComparison && comparisonScenarios.length > 0 && (
        <div className="brutal-card p-4 overflow-x-auto">
          <h4 className="font-heading font-bold text-sm mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Comparare Scenarii
          </h4>
          <div className="min-w-[600px]">
            <table className="w-full">
              <thead>
                <tr className="border-b-[3px] border-[var(--color-ink)]">
                  <th className="text-left py-2 px-2 font-mono text-xs text-[var(--color-muted)]">Metric</th>
                  {comparisonScenarios.map((s) => (
                    <th
                      key={s.id}
                      className="text-right py-2 px-2 font-heading text-xs"
                    >
                      {s.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.key}
                    className="border-b border-[var(--color-bg-alt)]"
                  >
                    <td className="py-2 px-2 font-mono text-xs">{row.label}</td>
                    {comparisonScenarios.map((s) => {
                      const value = row.isInput
                        ? s.inputs[row.key as keyof typeof s.inputs]
                        : s.results[row.key as keyof typeof s.results];
                      const currentValue = row.isInput
                        ? currentInputs[row.key as keyof typeof currentInputs]
                        : currentResults[row.key as keyof typeof currentResults];
                      const isDifferent = s.id !== "current" && value !== currentValue;
                      return (
                        <td
                          key={s.id}
                          className={`text-right py-2 px-2 font-mono text-xs ${
                            isDifferent ? "bg-[var(--color-lime)] bg-opacity-20 font-bold" : ""
                          }`}
                        >
                          {row.format(value as number)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Saved scenarios list */}
      {scenarios.length > 0 && !showComparison && (
        <div className="space-y-2">
          <p className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider">
            Scenarii Salvate ({scenarios.length})
          </p>
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="brutal-card p-3 flex items-center justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-sm truncate">{scenario.name}</p>
                <p className="font-mono text-xs text-[var(--color-muted)]">
                  EBITDA: €{scenario.results.ebitda.toLocaleString("ro-RO")} | Marjă: {scenario.results.netMargin.toFixed(1)}%
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {compareScenarios.length < 2 && (
                  <button
                    onClick={() => onCompare(scenario)}
                    disabled={compareScenarios.some((s) => s.id === scenario.id)}
                    className="p-2 hover:bg-[var(--color-lime)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Adaugă la comparare"
                  >
                    <ArrowRightLeft className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={() => onLoad(scenario)}
                  className="p-2 hover:bg-[var(--color-bg-alt)] transition-colors"
                  title="Încarcă scenariul"
                >
                  <BarChart3 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDelete(scenario.id)}
                  className="p-2 hover:bg-[var(--color-red)] hover:text-white transition-colors"
                  title="Șterge"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}