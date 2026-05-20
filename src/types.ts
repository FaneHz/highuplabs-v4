export interface Client {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  company_name?: string;
  website?: string;
  status?: string;
  plan_type?: string;
  meta_ad_account_id?: string;
  meta_access_token?: string;
  meta_token_expires_at?: string;
  alert_notifications?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  industry?: string;
  budget?: string;
  message?: string;
  status?: string;
  created_at?: string;
}

export interface Campaign {
  id: string;
  client_id: string;
  platform: string;
  campaign_id: string;
  name: string;
  status: string;
  objective?: string;
  budget?: number;
  spend?: number;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  cost_per_click?: number;
  cost_per_conversion?: number;
  roas?: number;
  start_date?: string;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Ad {
  id: string;
  client_id: string;
  campaign_id: string;
  platform: string;
  ad_id: string;
  name: string;
  status: string;
  creative_type?: string;
  spend?: number;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  cost_per_click?: number;
  cost_per_conversion?: number;
  roas?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Report {
  id: string;
  client_id: string;
  title: string;
  type: string;
  period_start?: string;
  period_end?: string;
  content?: Record<string, unknown>;
  status: string;
  created_at?: string;
}

export interface CampaignSnapshot {
  id: string;
  client_id: string;
  date: string;
  campaign_id: string;
  campaign_name: string;
  spend: number;
  revenue: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
  ctr: number;
  cpc: number;
  status: string;
  created_at?: string;
}

export interface AlertRule {
  id: string;
  client_id: string;
  metric: "ROAS" | "Spend" | "CTR" | "Conversions";
  operator: "<" | ">";
  threshold: number;
  is_active: boolean;
  is_triggered: boolean;
  acknowledged: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DailyMetrics {
  date: string;
  spend: number;
  revenue: number;
  impressions: number;
  clicks: number;
  roas: number;
  ctr: number;
  cpc: number;
  conversions: number;
}
