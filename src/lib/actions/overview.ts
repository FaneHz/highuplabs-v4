"use server";

import { createClient } from "@/lib/supabase-server";
import type { CampaignSnapshot, AlertRule, DailyMetrics } from "@/types";
import { subDays, format, parseISO } from "date-fns";

async function getCurrentUserId() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user.id;
}

export async function getHistoricalData(days: number = 30): Promise<DailyMetrics[]> {
  const clientId = await getCurrentUserId();
  const supabase = await createClient();

  const startDate = subDays(new Date(), days);
  const startDateStr = format(startDate, "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("campaign_snapshots")
    .select("date, spend, revenue, impressions, clicks, conversions")
    .eq("client_id", clientId)
    .gte("date", startDateStr)
    .order("date", { ascending: true });

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) return [];

  const grouped = new Map<string, DailyMetrics>();

  data.forEach((row: Pick<CampaignSnapshot, 'date' | 'spend' | 'revenue' | 'impressions' | 'clicks' | 'conversions'>) => {
    const dateKey = typeof row.date === "string" ? row.date.slice(0, 10) : format(new Date(row.date), "yyyy-MM-dd");
    const existing = grouped.get(dateKey);

    const spend = Number(row.spend) || 0;
    const revenue = Number(row.revenue) || 0;
    const impressions = Number(row.impressions) || 0;
    const clicks = Number(row.clicks) || 0;
    const conversions = Number(row.conversions) || 0;

    if (existing) {
      existing.spend += spend;
      existing.revenue += revenue;
      existing.impressions += impressions;
      existing.clicks += clicks;
      existing.conversions += conversions;
    } else {
      grouped.set(dateKey, {
        date: dateKey,
        spend,
        revenue,
        impressions,
        clicks,
        conversions,
        roas: 0,
        ctr: 0,
        cpc: 0,
      });
    }
  });

  const result = Array.from(grouped.values()).map((day) => {
    const roas = day.spend > 0 ? day.revenue / day.spend : 0;
    const ctr = day.impressions > 0 ? (day.clicks / day.impressions) * 100 : 0;
    const cpc = day.clicks > 0 ? day.spend / day.clicks : 0;

    return {
      ...day,
      roas: Number(roas.toFixed(2)),
      ctr: Number(ctr.toFixed(2)),
      cpc: Number(cpc.toFixed(2)),
    };
  });

  return result;
}

export async function getAlerts(): Promise<AlertRule[]> {
  const clientId = await getCurrentUserId();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("alert_rules")
    .select("*")
    .eq("client_id", clientId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as AlertRule[]) || [];
}

export async function getTriggeredAlerts(): Promise<AlertRule[]> {
  const clientId = await getCurrentUserId();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("alert_rules")
    .select("*")
    .eq("client_id", clientId)
    .eq("is_triggered", true)
    .eq("acknowledged", false)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as AlertRule[]) || [];
}

export async function createAlertRule(data: Omit<AlertRule, "id" | "client_id" | "created_at" | "updated_at" | "is_triggered" | "acknowledged">): Promise<AlertRule> {
  const clientId = await getCurrentUserId();
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .from("alert_rules")
    .insert({
      client_id: clientId,
      metric: data.metric,
      operator: data.operator,
      threshold: data.threshold,
      is_active: data.is_active,
      is_triggered: false,
      acknowledged: false,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return result as AlertRule;
}

export async function deleteAlertRule(id: string): Promise<void> {
  const clientId = await getCurrentUserId();
  const supabase = await createClient();

  const { error } = await supabase
    .from("alert_rules")
    .delete()
    .eq("id", id)
    .eq("client_id", clientId);

  if (error) throw new Error(error.message);
}

export async function updateAlertRule(
  id: string,
  data: Partial<Omit<AlertRule, "id" | "client_id" | "created_at" | "updated_at">>
): Promise<AlertRule> {
  const clientId = await getCurrentUserId();
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .from("alert_rules")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("client_id", clientId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return result as AlertRule;
}

export async function acknowledgeAlert(id: string): Promise<void> {
  const clientId = await getCurrentUserId();
  const supabase = await createClient();

  const { error } = await supabase
    .from("alert_rules")
    .update({ acknowledged: true })
    .eq("id", id)
    .eq("client_id", clientId);

  if (error) throw new Error(error.message);
}

export async function getCampaignSnapshots(days: number = 30): Promise<CampaignSnapshot[]> {
  const clientId = await getCurrentUserId();
  const supabase = await createClient();

  const startDate = subDays(new Date(), days);
  const startDateStr = format(startDate, "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("campaign_snapshots")
    .select("*")
    .eq("client_id", clientId)
    .gte("date", startDateStr)
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as CampaignSnapshot[]) || [];
}
