"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "@/lib/i18n-context";
import { getMetaCampaigns, getMetaInsights } from "@/lib/actions/meta";
import { Megaphone, Play, Pause, Archive, Plug, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Campaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget?: string;
  spend?: number;
  revenue?: number;
  roas?: number;
  ctr?: number;
  cpc?: number;
  conversions?: number;
}

const statusIcons: Record<string, React.ReactNode> = {
  ACTIVE: <Play className="w-4 h-4 text-green-600" />,
  PAUSED: <Pause className="w-4 h-4 text-orange-500" />,
  ARCHIVED: <Archive className="w-4 h-4 text-[var(--color-muted)]" />,
};

function CampaignsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="skeleton-shimmer h-9 w-32 rounded-none" />
        <div className="skeleton-shimmer h-8 w-20 rounded-none" />
      </div>
      <div className="brutal-card p-6 overflow-x-auto">
        <div className="space-y-3 min-w-[800px]">
          <div className="skeleton-shimmer h-8 w-full rounded-none" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton-shimmer h-12 w-full rounded-none" />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyCampaigns() {
  const t = useTranslations("campaigns");
  return (
    <div className="brutal-card p-10 text-center flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-[3px] border-[var(--color-ink)] bg-[var(--color-bg-alt)] flex items-center justify-center">
        <Plug className="w-8 h-8 text-[var(--color-muted)]" />
      </div>
      <h3 className="font-heading font-bold text-lg">{t("emptyTitle")}</h3>
      <p className="font-mono text-sm text-[var(--color-muted)] max-w-md">
        {t("emptyDescription")}
      </p>
      <Link
        href="/dashboard/setari"
        className="btn-brutal text-xs mt-2"
      >
        <Plug className="w-3.5 h-3.5" />
        {t("connectAccount")}
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export function CampaignsTable() {
  const t = useTranslations("campaigns");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const [campaignsData, insightsData] = await Promise.all([
          getMetaCampaigns(),
          getMetaInsights("last_30d"),
        ]);

        const insightsMap = new Map(
          insightsData.campaigns.map((c) => [c.campaignId, c])
        );

        const merged = campaignsData.map((camp) => {
          const insight = insightsMap.get(camp.id);
          return {
            ...camp,
            spend: insight?.spend || 0,
            revenue: insight?.revenue || 0,
            roas: insight?.roas || 0,
            ctr: insight?.ctr || 0,
            cpc: insight?.cpc || 0,
            conversions: insight?.conversions || 0,
          };
        });

        setCampaigns(merged);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : t("loadError"));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [t]);

  if (loading) return <CampaignsSkeleton />;

  if (error) {
    return (
      <div className="brutal-card p-8 text-center border-[var(--color-red)]">
        <p className="text-[var(--color-red)] font-mono">{error}</p>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl">{t("title")}</h1>
        </div>
        <EmptyCampaigns />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">{t("title")}</h1>
        <span className="sticker">{campaigns.filter((c) => c.status === "ACTIVE").length} active</span>
      </div>

      <div className="brutal-card p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-[3px] border-[var(--color-ink)]">
              <th className="text-left py-3 px-2 font-heading font-semibold text-sm">{t("status")}</th>
              <th className="text-left py-3 px-2 font-heading font-semibold text-sm">{t("campaign")}</th>
              <th className="text-left py-3 px-2 font-heading font-semibold text-sm">{t("objective")}</th>
              <th className="text-right py-3 px-2 font-heading font-semibold text-sm">{t("dailyBudget")}</th>
              <th className="text-right py-3 px-2 font-heading font-semibold text-sm">{t("spend")}</th>
              <th className="text-right py-3 px-2 font-heading font-semibold text-sm">{t("revenue")}</th>
              <th className="text-right py-3 px-2 font-heading font-semibold text-sm">{t("roas")}</th>
              <th className="text-right py-3 px-2 font-heading font-semibold text-sm">{t("ctr")}</th>
              <th className="text-right py-3 px-2 font-heading font-semibold text-sm">{t("conversions")}</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((camp) => (
              <tr
                key={camp.id}
                className="border-b-2 border-[var(--color-bg-alt)] hover:bg-[var(--color-bg-alt)] transition-colors"
              >
                <td className="py-3 px-2">{statusIcons[camp.status] || <Megaphone className="w-4 h-4" />}</td>
                <td className="py-3 px-2 font-mono text-sm">{camp.name}</td>
                <td className="py-3 px-2 font-mono text-xs text-[var(--color-muted)]">{camp.objective}</td>
                <td className="py-3 px-2 text-right font-mono text-sm">
                  {camp.daily_budget
                    ? `€${(parseInt(camp.daily_budget) / 100).toLocaleString("ro-RO")}`
                    : "—"}
                </td>
                <td className="py-3 px-2 text-right font-mono text-sm">
                  €{camp.spend?.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
                </td>
                <td className="py-3 px-2 text-right font-mono text-sm">
                  €{camp.revenue?.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
                </td>
                <td className="py-3 px-2 text-right font-mono text-sm font-bold">
                  {camp.roas?.toFixed(1)}x
                </td>
                <td className="py-3 px-2 text-right font-mono text-sm">
                  {camp.ctr?.toFixed(2)}%
                </td>
                <td className="py-3 px-2 text-right font-mono text-sm">
                  {camp.conversions?.toFixed(0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
