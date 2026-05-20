"use client";

import { useState } from "react";
import { HelpCircle, X } from "lucide-react";

interface TooltipData {
  title: string;
  description: string;
  examples: string[];
  warning?: string;
}

const TOOLTIPS: Record<string, TooltipData> = {
  revenue: {
    title: "Venituri Lunare",
    description: "Total venituri din vânzări în ultima lună. Include toate canalele de vânzare.",
    examples: [
      "Shopify: Rapoarte → Financiar → Venituri totale",
      "Include taxele? Da, dacă nu le scazi separat",
      "Exclude rambursările pentru acuratețe",
    ],
    warning: "Dacă ai fluctuații mari, folosește media ultimelor 3 luni.",
  },
  cogs: {
    title: "Cost Bunuri Vândute (COGS)",
    description: "Costul direct al produselor vândute. Include materiale, producție, ambalaj.",
    examples: [
      "Cost mediu per produs x număr produse vândute",
      "Include ambalajul și etichetele",
      "NU include shipping-ul către client (e separat)",
    ],
    warning: "COGS prea mare (>60% din venituri) = marjă mică, greu de scalat.",
  },
  fulfillment: {
    title: "Cost Livrare & Fulfillment",
    description: "Toate costurile de livrare, depozitare și procesare comenzi.",
    examples: [
      "Shipping către client (curier)",
      "Taxe depozitare / pick & pack",
      "Ambalaj pentru livrare",
    ],
    warning: "Negociază cu curierul dacă depășește 8% din venituri.",
  },
  adSpend: {
    title: "Cheltuieli Reclame",
    description: "Total cheltuieli pe advertising: Meta, Google, TikTok, etc.",
    examples: [
      "Meta Ads Manager: Total spend ultima lună",
      "Google Ads: Cost total",
      "Include și influencer marketing",
    ],
    warning: "Ideal: 15-25% din venituri. Peste 30% = dependent de ads.",
  },
  fixedCosts: {
    title: "Cheltuieli Fixe",
    description: "Costuri care nu depind de volumul de vânzări.",
    examples: [
      "Salarii echipe (inclusiv tine)",
      "Chirie birou / depozit",
      "Software, unelte, abonamente",
      "Contabil, avocat, alte servicii",
    ],
    warning: "Fixele prea mari în raport cu venitul = risc ridicat.",
  },
  agencyFeePercent: {
    title: "Comision Agenție",
    description: "Procentul din venituri pe care îl plătești agenției de marketing.",
    examples: [
      "HighUpLabs: 5-10% din venituri",
      "Alte agenții: poate fi 15-20%",
      "Include doar comisionul, nu și ad spend",
    ],
    warning: "Dacă agenția nu livrează ROAS > 3x, negociază sau schimbă.",
  },
};

interface InputTooltipProps {
  fieldKey: string;
}

export function InputTooltip({ fieldKey }: InputTooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltip = TOOLTIPS[fieldKey];

  if (!tooltip) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-1 hover:bg-[var(--color-bg-alt)] transition-colors"
        title="Informații ajutătoare"
      >
        <HelpCircle className="w-4 h-4 text-[var(--color-muted)]" />
      </button>

      {open && (
        <div className="absolute z-50 top-full right-0 mt-2 w-80 brutal-card p-4 bg-[var(--color-card)]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-heading font-bold text-sm">{tooltip.title}</span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-[var(--color-bg-alt)]"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <p className="font-mono text-xs text-[var(--color-muted)] mb-3">{tooltip.description}</p>

          <div className="space-y-1 mb-3">
            <p className="font-mono text-[10px] uppercase text-[var(--color-muted)] tracking-wider">Exemple:</p>
            {tooltip.examples.map((ex, i) => (
              <p key={i} className="font-mono text-xs">• {ex}</p>
            ))}
          </div>

          {tooltip.warning && (
            <div className="p-2 bg-yellow-50 border-[2px] border-[#FACC15]">
              <p className="font-mono text-xs">{tooltip.warning}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function getValidationWarning(
  fieldKey: string,
  value: number,
  inputs: { revenue: number; cogs: number; adSpend: number; fixedCosts: number; agencyFeePercent: number }
): string | null {
  switch (fieldKey) {
    case "revenue":
      if (value < 1000) return "Venituri foarte mici. Verifică dacă ai introdus valoarea corectă.";
      if (value > 10000000) return "Valoare foarte mare. Ești sigur că e în EUR?";
      return null;
    case "cogs":
      if (inputs.revenue > 0 && value / inputs.revenue > 0.7) return "COGS depășește 70% din venituri. Verifică calculul.";
      if (inputs.revenue > 0 && value / inputs.revenue < 0.1) return "COGS sub 10%. Verifică dacă incluzi toate costurile.";
      return null;
    case "adSpend":
      if (inputs.revenue > 0 && value / inputs.revenue > 0.4) return "Cheltuieli pe ads foarte mari (>40%). Risc de dependență.";
      if (inputs.revenue > 0 && value / inputs.revenue < 0.05) return "Buget ads foarte mic. Greu de scalat.";
      return null;
    case "fixedCosts":
      if (inputs.revenue > 0 && value / inputs.revenue > 0.5) return "Fixele depășesc 50% din venituri. Risc ridicat.";
      return null;
    case "agencyFeePercent":
      if (value > 20) return "Comision agenție foarte mare. Negociază.";
      return null;
    default:
      return null;
  }
}