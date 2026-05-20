import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export function createClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    return null;
  }

  return createBrowserClient(url, key);
}

// Singleton client for client components - lazy init to avoid build crash
let _supabaseClient: SupabaseClient | null = null;

function getCachedClient(): SupabaseClient | null {
  if (!_supabaseClient) {
    _supabaseClient = createClient();
  }
  return _supabaseClient;
}

export const supabaseClient = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (typeof window === "undefined") {
      return undefined;
    }
    const client = getCachedClient();
    if (!client) return undefined;
    const value = client[prop as keyof typeof client];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
