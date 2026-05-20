"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "@/lib/i18n-context";
import { getMetaAdInsights } from "@/lib/actions/meta";
import {
  Play,
  Pause,
  Archive,
  Megaphone,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileX,
} from "lucide-react";

interface AdRow {
  adId: string;
  adName: string;
  campaignId: string;
  campaignName: string;
  status: string;
  spend: number;
  revenue: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
}

type SortKey = "adName" | "campaignName" | "status" | "spend" | "impressions" | "clicks" | "ctr" | "cpc" | "conversions" | "revenue";
type SortDir = "asc" | "desc";

const statusIcons: Record<string, React.ReactNode> = {
  ACTIVE: <Play className="w-4 h-4 text-green-600" />,
  PAUSED: <Pause className="w-4 h-4 text-orange-500" />,
  ARCHIVED: <Archive className="w-4 h-4 text-[var(--color-muted)]" />,
  UNKNOWN: <Megaphone className="w-4 h-4 text-[var(--color-muted)]" />,
};

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ArrowUpDown className="w-3 h-3 text-[var(--color-muted)]" />;
  return dir === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;
}

function AdsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="skeleton-shimmer h-9 w-32 rounded-none" />
        <div className="skeleton-shimmer h-8 w-24 rounded-none" />
      </div>
      <div className="brutal-card p-6 overflow-x-auto">
        <div className="space-y-3 min-w-[900px]">
          <div className="skeleton-shimmer h-8 w-full rounded-none" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton-shimmer h-12 w-full rounded-none" />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyAds() {
  const t = useTranslations("ads");
  return (
    <div className="brutal-card p-10 text-center flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-[3px] border-[var(--color-ink)] bg-[var(--color-bg-alt)] flex items-center justify-center">
        <FileX className="w-8 h-8 text-[var(--color-muted)]" />
      </div>
      <h3 className="font-heading font-bold text-lg">{t("emptyTitle")}</h3>
      <p className="font-mono text-sm text-[var(--color-muted)] max-w-md">{t("emptyDescription")}</p>
    </div>
  );
}

export function AdsTable() {
  const t = useTranslations("ads");
  const [ads, setAds] = useState<AdRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("spend");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [campaignFilter, setCampaignFilter] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getMetaAdInsights("last_30d");
        setAds(data.ads);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : t("loadError"));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [t]);

  const campaigns = useMemo(
    () => Array.from(new Set(ads.map((a) => a.campaignName))).sort(),
    [ads]
  );

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "adName" || key === "campaignName" || key === "status" ? "asc" : "desc");
    }
  }

  const filteredSortedAds = useMemo(() => {
    let rows = [...ads];
    if (campaignFilter) {
      rows = rows.filter((a) => a.campaignName === campaignFilter);
    }
    rows.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
      }
      return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return rows;
  }, [ads, campaignFilter, sortKey, sortDir]);

  if (loading) return <AdsSkeleton />;

  if (error) {
    return (
      <div className="brutal-card p-8 text-center border-[var(--color-red)]">
        <p className="text-[var(--color-red)] font-mono">{error}</p>
      </div>
    );
  }

  const headerCell = (key: SortKey, label: string, align: "left" | "right" = "left") => (
    <th
      className={`py-3 px-2 font-heading font-semibold text-sm cursor-pointer select-none hover:bg-[var(--color-bg-alt)] transition-colors ${
        align === "right" ? "text-right" : "text-left"
      }`}
      onClick={() => toggleSort(key)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <SortIcon active={sortKey === key} dir={sortDir} />
      </span>
    </th>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-display text-3xl">{t("title")}</h1>
        <div className="flex items-center gap-3">
          <span className="sticker">{ads.length} {t("adsCount")}</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]" />
            <select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="pl-9 pr-8 py-2 bg-[var(--color-card)] border-[3px] border-[var(--color-ink)] font-mono text-sm appearance-none cursor-pointer focus:outline-none focus:ring-0"
            >
              <option value="">{t("allCampaigns")}</option>
              {campaigns.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ArrowUpDown className="w-3 h-3 text-[var(--color-muted)]" />
            </div>
          </div>
          {campaignFilter && (
            <button
              onClick={() => setCampaignFilter("")}
              className="px-3 py-2 bg-[var(--color-red)] text-white font-mono text-xs border-[3px] border-[var(--color-ink)] hover:brightness-110 transition"
            >
              {t("reset")}
            </button>
          )}
        </div>
      </div>

      <div className="brutal-card p-6 overflow-x-auto">
        {filteredSortedAds.length === 0 ? (
          <EmptyAds />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b-[3px] border-[var(--color-ink)]">
                {headerCell("status", t("status"))}
                {headerCell("adName", t("ad"))}
                {headerCell("campaignName", t("campaign"))}
                {headerCell("spend", t("spend"), "right")}
                {headerCell("impressions", t("impressions"), "right")}
                {headerCell("clicks", t("clicks"), "right")}
                {headerCell("ctr", t("ctr"), "right")}
                {headerCell("cpc", t("cpc"), "right")}
                {headerCell("conversions", t("conversions"), "right")}
                {headerCell("revenue", t("revenue"), "right")}
              </tr>
            </thead>
            <tbody>
              {filteredSortedAds.map((ad) => (
                <tr
                  key={ad.adId}
                  className="border-b-2 border-[var(--color-bg-alt)] hover:bg-[var(--color-bg-alt)] transition-colors"
                >
                  <td className="py-3 px-2">{statusIcons[ad.status] || <Megaphone className="w-4 h-4" />}</td>
                  <td className="py-3 px-2 font-mono text-sm">{ad.adName}</td>
                  <td className="py-3 px-2 font-mono text-xs text-[var(--color-muted)]">{ad.campaignName}</td>
                  <td className="py-3 px-2 text-right font-mono text-sm">
                    €{ad.spend.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-2 text-right font-mono text-sm">
                    {ad.impressions.toLocaleString("ro-RO")}
                  </td>
                  <td className="py-3 px-2 text-right font-mono text-sm">
                    {ad.clicks.toLocaleString("ro-RO")}
                  </td>
                  <td className="py-3 px-2 text-right font-mono text-sm">{ad.ctr.toFixed(2)}%</td>
                  <td className="py-3 px-2 text-right font-mono text-sm">
                    €{ad.cpc.toLocaleString("ro-RO", { maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-2 text-right font-mono text-sm">{ad.conversions.toFixed(0)}</td>
                  <td className="py-3 px-2 text-right font-mono text-sm font-bold">
                    €{ad.revenue.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
