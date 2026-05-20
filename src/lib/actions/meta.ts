"use server";

import { createClient } from "@/lib/supabase-server";
import { fetchMetaCampaigns, fetchMetaAds, fetchMetaInsights, getPurchaseRevenue } from "@/lib/meta-api";
import { decryptToken, encryptToken, getMetaLongLivedToken } from "@/lib/meta-auth";
import type { SupabaseClient } from "@supabase/supabase-js";

async function getActiveMetaAccount() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // 1. Incarca intai assignments (model simplificat)
  const { data: assignments } = await supabase
    .from("client_ad_assignments")
    .select("ad_account_id, master_account_id")
    .eq("client_id", user.id)
    .eq("platform", "meta")
    .eq("is_active", true)
    .limit(1);

  if (assignments && assignments.length > 0) {
    // Model simplificat: foloseste token-ul master (admin)
    const assignment = assignments[0];
    const { data: masterAccount } = await supabase
      .from("master_platform_accounts")
      .select("access_token_encrypted, token_expires_at")
      .eq("account_id", assignment.master_account_id)
      .eq("platform", "meta")
      .eq("is_active", true)
      .single();

    if (!masterAccount) {
      throw new Error("Contul Meta principal nu este configurat. Contacteaza echipa High-Up Labs.");
    }

    const accessToken = await refreshMasterMetaTokenIfNeeded(
      supabase,
      assignment.master_account_id,
      decryptToken(masterAccount.access_token_encrypted),
      masterAccount.token_expires_at
    );

    return {
      accessToken,
      accountId: assignment.ad_account_id,
    };
  }

  // 2. Fallback la modelul legacy (client_platform_accounts)
  const { data: accounts, error } = await supabase
    .from("client_platform_accounts")
    .select("account_id, access_token_encrypted, token_expires_at")
    .eq("client_id", user.id)
    .eq("platform", "meta")
    .eq("is_active", true)
    .limit(1);

  if (error) throw new Error(error.message);
  if (!accounts || accounts.length === 0) {
    throw new Error("Nu ai conectat niciun cont Meta. Mergi la Setări pentru a conecta un cont.");
  }

  const account = accounts[0];
  const accessToken = await refreshMetaTokenIfNeeded(
    supabase,
    user.id,
    account.account_id,
    decryptToken(account.access_token_encrypted),
    account.token_expires_at
  );

  return {
    accessToken,
    accountId: account.account_id,
  };
}

async function refreshMasterMetaTokenIfNeeded(
  supabase: SupabaseClient,
  masterAccountId: string,
  currentToken: string,
  expiresAt: string | null
): Promise<string> {
  if (!expiresAt) return currentToken;

  const expiryDate = new Date(expiresAt);
  const now = new Date();
  const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilExpiry > 24) return currentToken;

  const { token, expiresIn } = await getMetaLongLivedToken(currentToken);
  const newExpiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

  await supabase
    .from("master_platform_accounts")
    .update({
      access_token_encrypted: encryptToken(token),
      token_expires_at: newExpiresAt,
    })
    .eq("account_id", masterAccountId)
    .eq("platform", "meta");

  return token;
}

export async function refreshMetaTokenIfNeeded(
  supabase: SupabaseClient,
  clientId: string,
  accountId: string,
  currentToken: string,
  expiresAt: string | null
): Promise<string> {
  if (!expiresAt) return currentToken;

  const expiryDate = new Date(expiresAt);
  const now = new Date();
  const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilExpiry > 24) return currentToken;

  const { token, expiresIn } = await getMetaLongLivedToken(currentToken);
  const newExpiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

  await supabase
    .from("client_platform_accounts")
    .update({
      access_token_encrypted: encryptToken(token),
      token_expires_at: newExpiresAt,
    })
    .eq("client_id", clientId)
    .eq("platform", "meta")
    .eq("account_id", accountId);

  return token;
}

export async function getMetaCampaigns() {
  const { accessToken, accountId } = await getActiveMetaAccount();
  const campaigns = await fetchMetaCampaigns(accessToken, accountId);
  return campaigns;
}

export async function getMetaInsights(datePreset: string = "last_30d") {
  const { accessToken, accountId } = await getActiveMetaAccount();
  const insights = await fetchMetaInsights(accessToken, accountId, datePreset);

  // Aggregate metrics
  let totalSpend = 0;
  let totalRevenue = 0;
  let totalImpressions = 0;
  let totalClicks = 0;
  let totalConversions = 0;

  const campaignsWithMetrics = insights.map((insight) => {
    const spend = parseFloat(insight.spend) || 0;
    const revenue = getPurchaseRevenue(insight.action_values);
    const impressions = parseInt(insight.impressions) || 0;
    const clicks = parseInt(insight.clicks) || 0;
    const conversions = parseFloat(insight.conversions || "0");
    const roas = spend > 0 ? revenue / spend : 0;
    const ctr = parseFloat(insight.ctr) || 0;
    const cpc = parseFloat(insight.cpc) || 0;

    totalSpend += spend;
    totalRevenue += revenue;
    totalImpressions += impressions;
    totalClicks += clicks;
    totalConversions += conversions;

    return {
      campaignId: insight.campaign_id,
      campaignName: insight.campaign_name,
      spend,
      revenue,
      impressions,
      clicks,
      conversions,
      roas,
      ctr,
      cpc,
    };
  });

  const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;
  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;

  return {
    campaigns: campaignsWithMetrics,
    totals: {
      totalSpend,
      totalRevenue,
      totalImpressions,
      totalClicks,
      totalConversions,
      roas,
      ctr,
      cpc,
    },
  };
}

export async function getMetaAds() {
  const { accessToken, accountId } = await getActiveMetaAccount();
  const ads = await fetchMetaAds(accessToken, accountId);
  return ads;
}

export async function getMetaAdInsights(datePreset: string = "last_30d") {
  const { accessToken, accountId } = await getActiveMetaAccount();

  const [ads, insights] = await Promise.all([
    fetchMetaAds(accessToken, accountId),
    fetchMetaInsights(accessToken, accountId, datePreset, "ad"),
  ]);

  const adsStatusMap = new Map(ads.map((ad) => [ad.id, ad.status]));

  const adsWithMetrics = insights.map((insight) => {
    const spend = parseFloat(insight.spend) || 0;
    const revenue = getPurchaseRevenue(insight.action_values);
    const impressions = parseInt(insight.impressions) || 0;
    const clicks = parseInt(insight.clicks) || 0;
    const conversions = parseFloat(insight.conversions || "0");
    const ctr = parseFloat(insight.ctr) || 0;
    const cpc = parseFloat(insight.cpc) || 0;

    return {
      adId: insight.ad_id || "",
      adName: insight.ad_name || "—",
      campaignId: insight.campaign_id,
      campaignName: insight.campaign_name,
      status: adsStatusMap.get(insight.ad_id || "") || "UNKNOWN",
      spend,
      revenue,
      impressions,
      clicks,
      conversions,
      ctr,
      cpc,
    };
  });

  return { ads: adsWithMetrics };
}
