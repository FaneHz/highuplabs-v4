import { createClient } from "@supabase/supabase-js";

let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) {
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("Missing Supabase environment variables");
    }
    _client = createClient(url, key);
  }
  return _client;
}

export async function getAppConfig(key: string): Promise<string | null> {
  try {
    const client = getClient();
    const { data, error } = await client
      .from("app_config")
      .select("value")
      .eq("key", key)
      .single();
    
    if (error) {
      console.error(`getAppConfig error for key ${key}:`, error);
      return null;
    }
    
    return (data as { value?: string } | null)?.value ?? null;
  } catch (err) {
    console.error(`getAppConfig exception for key ${key}:`, err);
    return null;
  }
}

export async function getAppConfigNumber(key: string, defaultValue: number): Promise<number> {
  const value = await getAppConfig(key);
  if (value === null) return defaultValue;
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
}

export async function getAllAppConfig(): Promise<Record<string, string>> {
  try {
    const client = getClient();
    const { data, error } = await client
      .from("app_config")
      .select("key, value");
    
    if (error) {
      console.error("getAllAppConfig error:", error);
      return {};
    }
    
    const rows = (data || []) as Array<{ key: string; value: string }>;
    return rows.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (err) {
    console.error("getAllAppConfig exception:", err);
    return {};
  }
}
