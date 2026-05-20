"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "@/lib/i18n-context";
import Link from "next/link";
import { Calculator, ExternalLink, Check, X, Bell } from "lucide-react";
import { getMetaInsights } from "@/lib/actions/meta";
import {
  getHistoricalData,
  getCampaignSnapshots,
  getAlerts,
  getTriggeredAlerts,
} from "@/lib/actions/overview";
import { useToast } from "@/components/ui/Toast";
import { KpiCards, KpiCardsSkeleton } from "./KpiCards";
import { ChartsSection, ChartsSectionSkeleton } from "./ChartsSection";
import { AlertsPanel, AlertsPanelSkeleton } from "./AlertsPanel";
import { CampaignPerformanceTable, CampaignPerformanceTableSkeleton } from "./CampaignPerformanceTable";
import type { DailyMetrics, CampaignSnapshot, AlertRule } from "@/types";

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
  const { showToast } = useToast();

  const [metaData, setMetaData] = useState<{ campaigns: CampaignMetric[]; totals: Totals } | null>(null);
  const [historicalData, setHistoricalData] = useState<DailyMetrics[]>([]);
  const [previousData, setPreviousData] = useState<DailyMetrics[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignSnapshot[]>([]);
  const [alerts, setAlerts] = useState<AlertRule[]>([]);
  const [triggeredAlerts, setTriggeredAlerts] = useState<AlertRule[]>([]);

  const [loadingMeta, setLoadingMeta] = useState(true);
  const [loadingHistorical, setLoadingHistorical] = useState(true);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [loadingAlerts, setLoadingAlerts] = useState(true);

  const [metaError, setMetaError] = useState("");
  const [metaConnected, setMetaConnected] = useState(false);
  const [timeRange, setTimeRange] = useState(30);

  const loadAllData = useCallback(async () => {
    try {
      setLoadingMeta(true);
      const metaResult = await getMetaInsights("last_30d");
      setMetaData(metaResult);
      setMetaConnected(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t("loadError");
      if (message.includes("not connected") || message.includes("neconectat")) {
        setMetaConnected(false);
      } else {
        setMetaError(message);
      }
    } finally {
      setLoadingMeta(false);
    }

    try {
      setLoadingHistorical(true);
      const [curr, prev] = await Promise.all([
        getHistoricalData(90),
        getHistoricalData(90).then((data) => {
          // Simulăm datele anterioare prin shift-ul cu 30 de zile în practică,
          // dar aici vom returna primele 30 ca "perioada anterioară" pentru demo.
          // În producție, s-ar compara perioade exacte.
          return data.slice(0, Math.floor(data.length / 2));
        }),
      ]);
      setHistoricalData(curr);
      setPreviousData(prev);
    } catch (err) {
      console.error("Failed to load historical data", err);
    } finally {
      setLoadingHistorical(false);
    }

    try {
      setLoadingCampaigns(true);
      const snaps = await getCampaignSnapshots(30);
      setCampaigns(snaps);
    } catch (err) {
      console.error("Failed to load campaigns", err);
    } finally {
      setLoadingCampaigns(false);
    }

    try {
      setLoadingAlerts(true);
      const [allAlerts, triggered] = await Promise.all([
        getAlerts(),
        getTriggeredAlerts(),
      ]);
      setAlerts(allAlerts);
      setTriggeredAlerts(triggered);

      if (triggered.length > 0) {
        triggered.forEach((alert) => {
          showToast(
            `Alertă: ${alert.metric} ${alert.operator} ${alert.threshold}`,
            "error"
          );
        });
      }
    } catch (err) {
      console.error("Failed to load alerts", err);
    } finally {
      setLoadingAlerts(false);
    }
  }, [t, showToast]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const filteredHistorical = historicalData.slice(-timeRange);
  const filteredPrevious = previousData.slice(-timeRange);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">
            {companyName ? `Bun venit, ${companyName}` : t("title")}
          </h1>
          <p className="font-mono text-sm text-[var(--color-muted)] mt-1">
            {clientId} · Dashboard
          </p>
        </div>
        {triggeredAlerts.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 border-2 border-[var(--color-red)] bg-red-50">
            <Bell className="w-4 h-4 text-[var(--color-red)]" />
            <span className="font-mono text-xs text-[var(--color-red)] font-bold">
              {triggeredAlerts.length} alerte active
            </span>
          </div>
        )}
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

      {/* KPI Cards */}
      {loadingHistorical || loadingMeta ? (
        <KpiCardsSkeleton />
      ) : metaError ? (
        <div className="brutal-card p-6 text-center border-[var(--color-red)]">
          <p className="text-[var(--color-red)] font-mono text-sm">{metaError}</p>
        </div>
      ) : (
        <KpiCards
          currentData={filteredHistorical}
          previousData={filteredPrevious}
        />
      )}

      {/* Charts */}
      {loadingHistorical ? (
        <ChartsSectionSkeleton />
      ) : (
        <ChartsSection
          data={historicalData}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
      )}

      {/* Campaign Performance Table */}
      {loadingCampaigns ? (
        <CampaignPerformanceTableSkeleton />
      ) : (
        <CampaignPerformanceTable campaigns={campaigns} />
      )}

      {/* Alerts Panel */}
      {loadingAlerts ? (
        <AlertsPanelSkeleton />
      ) : (
        <AlertsPanel
          alerts={alerts}
          triggeredAlerts={triggeredAlerts}
          onUpdate={loadAllData}
        />
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
