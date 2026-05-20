"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import type { DailyMetrics } from "@/types";

interface KpiData {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  previousValue: number;
  sparklineData: { value: number }[];
}

function KpiCard({ data }: { data: KpiData }) {
  const diff = data.previousValue !== 0
    ? ((data.value - data.previousValue) / data.previousValue) * 100
    : 0;

  const isPositive = diff > 0;
  const isNeutral = diff === 0;
  const trendColor = isNeutral
    ? "text-[var(--color-muted)]"
    : isPositive
    ? "text-green-600"
    : "text-[var(--color-red)]";

  const formatted = data.value.toLocaleString("ro-RO", {
    maximumFractionDigits: data.value < 10 ? 2 : 0,
  });

  return (
    <div className="brutal-card p-5 flex flex-col justify-between h-full">
      <div>
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
          {data.label}
        </p>
        <p className="font-mono text-2xl font-bold text-[var(--color-ink)]">
          {data.prefix}
          {formatted}
          {data.suffix}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className={`flex items-center gap-1 text-xs font-mono ${trendColor}`}>
          {isNeutral ? (
            <Minus className="w-3 h-3" />
          ) : isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{Math.abs(diff).toFixed(1)}%</span>
        </div>

        <div className="w-24 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.sparklineData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={isNeutral ? "#9ca3af" : isPositive ? "#16a34a" : "#dc2626"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function KpiCards({
  currentData,
  previousData,
}: {
  currentData: DailyMetrics[];
  previousData: DailyMetrics[];
}) {
  if (!currentData || currentData.length === 0) return null;

  const currTotals = currentData.reduce(
    (acc, d) => ({
      spend: acc.spend + d.spend,
      revenue: acc.revenue + d.revenue,
      conversions: acc.conversions + d.conversions,
      roas: 0,
    }),
    { spend: 0, revenue: 0, conversions: 0, roas: 0 }
  );
  currTotals.roas = currTotals.spend > 0 ? currTotals.revenue / currTotals.spend : 0;

  const prevTotals = previousData.reduce(
    (acc, d) => ({
      spend: acc.spend + d.spend,
      revenue: acc.revenue + d.revenue,
      conversions: acc.conversions + d.conversions,
      roas: 0,
    }),
    { spend: 0, revenue: 0, conversions: 0, roas: 0 }
  );
  prevTotals.roas = prevTotals.spend > 0 ? prevTotals.revenue / prevTotals.spend : 0;

  const kpis: KpiData[] = [
    {
      label: "Spend Total",
      value: currTotals.spend,
      prefix: "€",
      previousValue: prevTotals.spend,
      sparklineData: currentData.map((d) => ({ value: d.spend })),
    },
    {
      label: "Revenue",
      value: currTotals.revenue,
      prefix: "€",
      previousValue: prevTotals.revenue,
      sparklineData: currentData.map((d) => ({ value: d.revenue })),
    },
    {
      label: "ROAS",
      value: currTotals.roas,
      suffix: "x",
      previousValue: prevTotals.roas,
      sparklineData: currentData.map((d) => ({ value: d.roas })),
    },
    {
      label: "Conversii",
      value: currTotals.conversions,
      previousValue: prevTotals.conversions,
      sparklineData: currentData.map((d) => ({ value: d.conversions })),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} data={kpi} />
      ))}
    </div>
  );
}

export function KpiCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="brutal-card p-5">
          <div className="skeleton-shimmer h-3 w-20 mb-4 rounded-none" />
          <div className="skeleton-shimmer h-8 w-32 rounded-none mb-4" />
          <div className="flex justify-between items-center">
            <div className="skeleton-shimmer h-3 w-12 rounded-none" />
            <div className="skeleton-shimmer h-8 w-20 rounded-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
