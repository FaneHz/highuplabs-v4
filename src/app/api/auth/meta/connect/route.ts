import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateMetaOAuthState, generateMetaOAuthUrl } from "@/lib/meta-auth";

export async function GET() {
  const cookieStore = await cookies();
  const state = generateMetaOAuthState();

  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/meta/callback`;
  const url = generateMetaOAuthUrl(redirectUri, state);

  cookieStore.set("meta_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  return NextResponse.redirect(url);
}
