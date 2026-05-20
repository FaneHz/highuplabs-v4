import { createClient } from "./supabase-server";

export type ConfigScope = "public" | "secret" | "all";

export interface ConfigValue {
  key: string;
  value: string;
  is_secret: boolean;
}

async function fetchConfigFromSupabase(key: string): Promise<string | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("app_config")
      .select("value")
      .eq("key", key)
      .single();

    if (error || !data) {
      return null;
    }

    return data.value;
  } catch (err) {
    console.warn("[config] fetchConfigFromSupabase failed:", err instanceof Error ? err.message : String(err));
    return null;
  }
}

function getEnvFallback(key: string): string | undefined {
  return process.env[key];
}

export async function getConfig(key: string): Promise<string | undefined> {
  const fromDb = await fetchConfigFromSupabase(key);
  if (fromDb && fromDb.trim() !== "") {
    return fromDb;
  }
  return getEnvFallback(key);
}

export async function getPublicConfig(key: string): Promise<string | undefined> {
  const fromDb = await fetchConfigFromSupabase(key);
  if (fromDb && fromDb.trim() !== "") {
    return fromDb;
  }
  return getEnvFallback(key);
}

export async function getSecretConfig(key: string): Promise<string | undefined> {
  const fromDb = await fetchConfigFromSupabase(key);
  if (fromDb && fromDb.trim() !== "") {
    return fromDb;
  }
  return getEnvFallback(key);
}

export async function getAllPublicConfigs(): Promise<Record<string, string>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("app_config")
      .select("key, value")
      .eq("is_secret", false);

    if (error || !data) {
      return {};
    }

    return data.reduce((acc: Record<string, string>, row: { key: string; value: string }) => {
      acc[row.key] = row.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (err) {
    console.warn("[config] getAllPublicConfigs failed:", err instanceof Error ? err.message : String(err));
    return {};
  }
}
