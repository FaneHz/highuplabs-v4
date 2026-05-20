import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function createErrorProxy(message: string): ReturnType<typeof createServerClient> {
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
  }) as unknown as ReturnType<typeof createServerClient>;
}

export async function createClient() {
  const cookieStore = await cookies();

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("Missing Supabase environment variables");
    return createErrorProxy("Supabase not configured");
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch (err) {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
          console.warn("[supabase-server] Cookie setAll failed (expected in Server Components):", err instanceof Error ? err.message : String(err));
        }
      },
    },
  });
}
