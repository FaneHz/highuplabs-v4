"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { DailyMetrics } from "@/types";
import { format, parseISO } from "date-fns";
import { ro } from "date-fns/locale";

const TIME_RANGES = [
  { label: "7z", value: 7 },
  { label: "30z", value: 30 },
  { label: "90z", value: 90 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border-2 border-[var(--color-ink)] p-3 shadow-[4px_4px_0px_0px_var(--color-ink)] font-mono text-xs">
      <p className="font-bold mb-2 text-[var(--color-ink)]">
        {format(parseISO(label), "dd MMM yyyy", { locale: ro })}
      </p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 mb-1">
          <div
            className="w-2 h-2 border border-[var(--color-ink)]"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[var(--color-muted)]">{entry.name}:</span>
          <span className="font-bold">
            {entry.name.includes("ROAS")
              ? `${Number(entry.value).toFixed(2)}x`
              : entry.name.includes("CTR")
              ? `${Number(entry.value).toFixed(2)}%`
              : entry.name.includes("CPC")
              ? `€${Number(entry.value).toFixed(2)}`
              : entry.name.includes("Spend") || entry.name.includes("Revenue")
              ? `€${Number(entry.value).toLocaleString("ro-RO", { maximumFractionDigits: 0 })}`
              : Number(entry.value).toLocaleString("ro-RO")}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ChartsSection({
  data,
  timeRange,
  onTimeRangeChange,
}: {
  data: DailyMetrics[];
  timeRange: number;
  onTimeRangeChange: (days: number) => void;
}) {
  const filteredData = data.slice(-timeRange);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-[var(--color-ink)]">
          Evoluție Metrici
        </h2>
        <div className="flex gap-2">
          {TIME_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() => onTimeRangeChange(range.value)}
              className={`px-3 py-1.5 text-xs font-mono border-2 transition-colors ${
                timeRange === range.value
                  ? "bg-[var(--color-ink)] text-[var(--color-accent)] border-[var(--color-ink)]"
                  : "bg-white text-[var(--color-ink)] border-[var(--color-ink)] hover:bg-[var(--color-bg-alt)]"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="brutal-card p-8 text-center">
          <p className="font-mono text-sm text-[var(--color-muted)]">
            Nu există date pentru perioada selectată.
          </p>
        </div>
      ) : (
        <>
          {/* Row 1: Spend vs Revenue + ROAS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="brutal-card p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)] mb-4">
                Spend vs Revenue
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(val) => format(parseISO(val), "dd MMM", { locale: ro })}
                      tick={{ fontSize: 10, fontFamily: "var(--font-space-mono)" }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fontFamily: "var(--font-space-mono)" }}
                      tickFormatter={(val) => `€${(val / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: "10px", fontFamily: "var(--font-space-mono)" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="spend"
                      name="Spend"
                      stroke="#dc2626"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#16a34a"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="brutal-card p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)] mb-4">
                ROAS Trend
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient id="roasGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(val) => format(parseISO(val), "dd MMM", { locale: ro })}
                      tick={{ fontSize: 10, fontFamily: "var(--font-space-mono)" }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fontFamily: "var(--font-space-mono)" }}
                      tickFormatter={(val) => `${val}x`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="roas"
                      name="ROAS"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fill="url(#roasGradient)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Row 2: Conversions + CTR/CPC */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="brutal-card p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)] mb-4">
                Conversii Zilnice
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(val) => format(parseISO(val), "dd MMM", { locale: ro })}
                      tick={{ fontSize: 10, fontFamily: "var(--font-space-mono)" }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fontFamily: "var(--font-space-mono)" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="conversions"
                      name="Conversii"
                      fill="var(--color-lime)"
                      stroke="var(--color-ink)"
                      strokeWidth={1}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="brutal-card p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)] mb-4">
                CTR + CPC Trend
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(val) => format(parseISO(val), "dd MMM", { locale: ro })}
                      tick={{ fontSize: 10, fontFamily: "var(--font-space-mono)" }}
                    />
                    <YAxis
                      yAxisId="left"
                      tick={{ fontSize: 10, fontFamily: "var(--font-space-mono)" }}
                      tickFormatter={(val) => `${val}%`}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 10, fontFamily: "var(--font-space-mono)" }}
                      tickFormatter={(val) => `€${val}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: "10px", fontFamily: "var(--font-space-mono)" }}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="cpc"
                      name="CPC"
                      fill="#f59e0b"
                      stroke="var(--color-ink)"
                      strokeWidth={1}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="ctr"
                      name="CTR"
                      stroke="#7c3aed"
                      strokeWidth={2}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function ChartsSectionSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="skeleton-shimmer h-6 w-32 rounded-none" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton-shimmer h-8 w-12 rounded-none" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="brutal-card p-5">
            <div className="skeleton-shimmer h-3 w-24 mb-4 rounded-none" />
            <div className="skeleton-shimmer h-64 rounded-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
