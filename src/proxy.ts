import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.warn("Missing Supabase environment variables in proxy");
      return response;
    }

    const supabase = createServerClient(url, key, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => {
              request.cookies.set(name, value);
            });
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    const pathname = request.nextUrl.pathname;

    const publicPaths = [
      "/",
      "/ro",
      "/en",
      "/login",
      "/_next",
      "/favicon",
      "/robots",
      "/sitemap",
      "/opengraph",
      "/api/applica",
      "/api/auth/signout",
      "/api/auth/meta",
      "/api/auth/google",
      "/oferta",
      "/ro/oferta",
      "/en/oferta",
    ];
    const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));

    if (!isPublic && !user && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch {
    // Ignore auth errors, let layouts handle auth
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
