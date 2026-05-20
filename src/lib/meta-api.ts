const META_API_VERSION = "v20.0";
const META_BASE_URL = `https://graph.facebook.com/${META_API_VERSION}`;

export interface MetaCampaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget?: string;
  lifetime_budget?: string;
  budget_remaining?: string;
  start_time?: string;
  stop_time?: string;
}

export interface MetaAd {
  id: string;
  name: string;
  status: string;
  campaign_id?: string;
}

export interface MetaInsight {
  campaign_id: string;
  campaign_name: string;
  ad_id?: string;
  ad_name?: string;
  impressions: string;
  clicks: string;
  spend: string;
  ctr: string;
  cpc: string;
  conversions?: string;
  action_values?: Array<{ action_type: string; value: string }>;
  actions?: Array<{ action_type: string; value: string }>;
}

export async function fetchMetaCampaigns(
  accessToken: string,
  adAccountId: string
): Promise<MetaCampaign[]> {
  const url = new URL(`${META_BASE_URL}/${adAccountId}/campaigns`);
  url.searchParams.set(
    "fields",
    "id,name,status,objective,daily_budget,lifetime_budget,budget_remaining,start_time,stop_time"
  );
  url.searchParams.set("access_token", accessToken);
  url.searchParams.set("limit", "100");

  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Meta API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.data || [];
}

export async function fetchMetaAds(
  accessToken: string,
  adAccountId: string
): Promise<MetaAd[]> {
  const url = new URL(`${META_BASE_URL}/${adAccountId}/ads`);
  url.searchParams.set("fields", "id,name,status,campaign_id");
  url.searchParams.set("access_token", accessToken);
  url.searchParams.set("limit", "200");

  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Meta API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.data || [];
}

export async function fetchMetaInsights(
  accessToken: string,
  adAccountId: string,
  datePreset: string = "last_30d",
  level: "campaign" | "ad" = "campaign"
): Promise<MetaInsight[]> {
  const url = new URL(`${META_BASE_URL}/${adAccountId}/insights`);
  url.searchParams.set("level", level);
  url.searchParams.set(
    "fields",
    "campaign_id,campaign_name,ad_id,ad_name,impressions,clicks,spend,ctr,cpc,conversions,action_values,actions"
  );
  url.searchParams.set("date_preset", datePreset);
  url.searchParams.set("access_token", accessToken);
  url.searchParams.set("limit", "100");

  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Meta API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.data || [];
}

export function getPurchaseValue(actions?: Array<{ action_type: string; value: string }>): number {
  if (!actions) return 0;
  const purchase = actions.find((a) => a.action_type === "omni_purchase" || a.action_type === "purchase");
  return purchase ? parseFloat(purchase.value) : 0;
}

export function getPurchaseRevenue(actionValues?: Array<{ action_type: string; value: string }>): number {
  if (!actionValues) return 0;
  const revenue = actionValues.find(
    (a) => a.action_type === "omni_purchase" || a.action_type === "purchase"
  );
  return revenue ? parseFloat(revenue.value) : 0;
}
