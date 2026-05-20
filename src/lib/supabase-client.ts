import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    return createErrorProxy("Supabase not configured") as any;
  }

  return createBrowserClient(url, key);
}

// Singleton client for client components - lazy init to avoid build crash
let _supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

function getCachedClient() {
  if (!_supabaseClient) {
    _supabaseClient = createClient();
  }
  return _supabaseClient;
}

function createErrorProxy(message: string): any {
  const dataProxy = new Proxy({}, {
    get() { return null; }
  });

  return new Proxy(() => {}, {
    get(_, prop) {
      if (prop === 'error') return new Error(message);
      if (prop === 'data') return dataProxy;
      return createErrorProxy(message);
    },
    apply() {
      return createErrorProxy(message);
    },
  });
}

export const supabaseClient = new Proxy({} as ReturnType<typeof createBrowserClient>, {
  get(_, prop) {
    if (typeof window === "undefined") {
      return undefined;
    }
    const client = getCachedClient();
    const value = client[prop as keyof typeof client];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
