import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_MARKETING = ["/", "/ro", "/en", "/ro/", "/en/"];
const PUBLIC_PATHS = [
  "/login",
  "/api",
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/opengraph-image",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow marketing pages
  if (
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/onboarding")
  ) {
    return NextResponse.next();
  }

  // Check auth cookie for dashboard/admin routes
  const authCookie = request.cookies.get("sb-access-token");

  if (!authCookie) {
    // Redirect to login if accessing dashboard/admin without auth
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
