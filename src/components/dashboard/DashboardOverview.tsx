"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "@/lib/i18n-context";
import Link from "next/link";
import { Calculator, ExternalLink, Check, X } from "lucide-react";
import { getMetaInsights } from "@/lib/actions/meta";

interface CampaignMetric {
  campaignId: string;
  campaignName: string;
  spend: number;
  revenue: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
  ctr: number;
  cpc: number;
}

interface Totals {
  totalSpend: number;
  totalRevenue: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  roas: number;
  ctr: number;
  cpc: number;
}

function KpiCard({
  label,
  value,
  prefix = "",
  suffix = "",
}: {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
}) {
  const formatted = typeof value === "number" 
    ? value.toLocaleString("ro-RO", { maximumFractionDigits: 0 })
    : value;

  return (
    <div className="brutal-card p-5">
      <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
        {label}
      </p>
      <p className="font-mono text-2xl font-bold text-[var(--color-ink)]">
        {prefix}
        {formatted}
        {suffix}
      </p>
    </div>
  );
}

function SkeletonKpiCard() {
  return (
    <div className="brutal-card p-5">
      <div className="skeleton-shimmer h-3 w-20 mb-4 rounded-none" />
      <div className="skeleton-shimmer h-8 w-32 rounded-none" />
    </div>
  );
}

export function DashboardOverview({
  clientId,
  companyName,
}: {
  clientId: string;
  companyName?: string;
}) {
  const t = useTranslations("dashboard");
  const [data, setData] = useState<{ campaigns: CampaignMetric[]; totals: Totals } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [metaConnected, setMetaConnected] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const result = await getMetaInsights("last_30d");
        setData(result);
        setMetaConnected(true);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : t("loadError");
        if (message.includes("not connected") || message.includes("neconectat")) {
          setMetaConnected(false);
        } else {
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [t]);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-3xl">
          {companyName ? `Bun venit, ${companyName}` : t("title")}
        </h1>
        <p className="font-mono text-sm text-[var(--color-muted)] mt-1">
          {clientId} · Dashboard
        </p>
      </div>

      {/* Meta Status */}
      <div className="brutal-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 border-[3px] border-[var(--color-ink)] flex items-center justify-center ${metaConnected ? "bg-[var(--color-lime)]" : "bg-[var(--color-bg-alt)]"}`}>
            {metaConnected ? (
              <Check className="w-4 h-4 text-[var(--color-ink)]" />
            ) : (
              <X className="w-4 h-4 text-[var(--color-red)]" />
            )}
          </div>
          <div>
            <p className="font-heading font-semibold text-sm">Meta Ads</p>
            <p className={`font-mono text-xs ${metaConnected ? "text-green-600" : "text-[var(--color-red)]"}`}>
              {metaConnected ? "Conectat" : "Neconectat"}
            </p>
          </div>
        </div>
        {!metaConnected && (
          <Link
            href="/dashboard/setari"
            className="btn-brutal text-xs inline-flex items-center gap-2"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Conectează
          </Link>
        )}
      </div>

      {/* Quick Stats */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonKpiCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="brutal-card p-6 text-center border-[var(--color-red)]">
          <p className="text-[var(--color-red)] font-mono text-sm">{error}</p>
        </div>
      ) : data?.campaigns && data.campaigns.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label={t("totalSpend")} value={data.totals.totalSpend} prefix="€" />
          <KpiCard label={t("revenue")} value={data.totals.totalRevenue} prefix="€" />
          <KpiCard label={t("roas")} value={data.totals.roas} suffix="x" />
          <KpiCard label={t("conversions")} value={data.totals.totalConversions} />
        </div>
      ) : (
        <div className="brutal-card p-8 text-center space-y-4">
          <p className="font-mono text-sm text-[var(--color-muted)]">
            {metaConnected 
              ? "Nu există date de campanii pentru perioada selectată."
              : "Conectează contul Meta Ads pentru a vedea metricile."}
          </p>
        </div>
      )}

      {/* Calculator CTA */}
      <div className="brutal-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-[3px] border-[var(--color-ink)] bg-[var(--color-lime)] flex items-center justify-center">
            <Calculator className="w-5 h-5 text-[var(--color-ink)]" />
          </div>
          <div>
            <p className="font-heading font-semibold text-sm">Calculator POAS</p>
            <p className="font-mono text-xs text-[var(--color-muted)]">
              Calculează profitul real al campaniilor tale
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/calculator"
          className="btn-brutal inline-flex items-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          Deschide Calculator
        </Link>
      </div>
    </div>
  );
}
