"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Pause,
  Eye,
  Play,
} from "lucide-react";
import type { CampaignSnapshot } from "@/types";

type SortKey = "campaign_name" | "spend" | "revenue" | "roas" | "ctr" | "conversions" | "status";
type SortDir = "asc" | "desc";

interface CampaignPerformanceTableProps {
  campaigns: CampaignSnapshot[];
}

export function CampaignPerformanceTable({ campaigns }: CampaignPerformanceTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("roas");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Get unique campaigns with latest metrics
  const latestByCampaign = new Map<string, CampaignSnapshot>();
  campaigns.forEach((c) => {
    const existing = latestByCampaign.get(c.campaign_id);
    if (!existing || new Date(c.date) > new Date(existing.date)) {
      latestByCampaign.set(c.campaign_id, c);
    }
  });

  const uniqueCampaigns = Array.from(latestByCampaign.values());

  const sorted = [...uniqueCampaigns].sort((a, b) => {
    const aVal = a[sortKey] ?? 0;
    const bVal = b[sortKey] ?? 0;
    if (sortDir === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const top5 = sorted.slice(0, 5);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) return <ArrowUpDown className="w-3 h-3 text-[var(--color-muted)]" />;
    return sortDir === "asc" ? (
      <ArrowUp className="w-3 h-3 text-[var(--color-ink)]" />
    ) : (
      <ArrowDown className="w-3 h-3 text-[var(--color-ink)]" />
    );
  }

  return (
    <div className="brutal-card overflow-hidden">
      <div className="p-5 border-b border-[var(--color-ink)]">
        <h2 className="font-heading text-lg font-bold text-[var(--color-ink)]">
          Top 5 Campanii după ROAS
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-ink)] bg-[var(--color-bg-alt)]">
              {[
                { key: "campaign_name" as SortKey, label: "Campanie" },
                { key: "status" as SortKey, label: "Status" },
                { key: "spend" as SortKey, label: "Spend" },
                { key: "revenue" as SortKey, label: "Revenue" },
                { key: "roas" as SortKey, label: "ROAS" },
                { key: "conversions" as SortKey, label: "Conv." },
                { key: "ctr" as SortKey, label: "CTR" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon column={col.key} />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Acțiuni
              </th>
            </tr>
          </thead>
          <tbody>
            {top5.map((campaign) => (
              <tr
                key={campaign.campaign_id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-sm text-[var(--color-ink)] truncate max-w-[200px]">
                  {campaign.campaign_name}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono border ${
                      campaign.status === "ACTIVE"
                        ? "bg-[var(--color-lime)] text-[var(--color-ink)] border-[var(--color-ink)]"
                        : campaign.status === "PAUSED"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                        : "bg-gray-100 text-gray-500 border-gray-300"
                    }`}
                  >
                    {campaign.status || "N/A"}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-sm">
                  €{campaign.spend?.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
                </td>
                <td className="px-4 py-3 font-mono text-sm">
                  €{campaign.revenue?.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
                </td>
                <td className="px-4 py-3 font-mono text-sm font-bold">
                  {campaign.roas?.toFixed(2)}x
                </td>
                <td className="px-4 py-3 font-mono text-sm">
                  {campaign.conversions?.toLocaleString("ro-RO")}
                </td>
                <td className="px-4 py-3 font-mono text-sm">
                  {campaign.ctr?.toFixed(2)}%
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1.5 border border-[var(--color-ink)] hover:bg-[var(--color-bg-alt)] transition-colors"
                      title="Vezi detalii"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="p-1.5 border border-[var(--color-ink)] hover:bg-[var(--color-bg-alt)] transition-colors"
                      title={campaign.status === "ACTIVE" ? "Pauză" : "Activează"}
                    >
                      {campaign.status === "ACTIVE" ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {top5.length === 0 && (
        <div className="p-8 text-center">
          <p className="font-mono text-sm text-[var(--color-muted)]">
            Nu există campanii pentru perioada selectată.
          </p>
        </div>
      )}
    </div>
  );
}

export function CampaignPerformanceTableSkeleton() {
  return (
    <div className="brutal-card overflow-hidden">
      <div className="p-5 border-b border-[var(--color-ink)]">
        <div className="skeleton-shimmer h-6 w-48 rounded-none" />
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="skeleton-shimmer h-8 flex-1 rounded-none" />
              <div className="skeleton-shimmer h-8 w-20 rounded-none" />
              <div className="skeleton-shimmer h-8 w-20 rounded-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
