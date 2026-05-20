import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase-server";
import {
  exchangeMetaCodeForToken,
  getMetaLongLivedToken,
  fetchMetaAdAccounts,
  encryptToken,
} from "@/lib/meta-auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/dashboard/setari?error=meta_${error}`, request.url)
    );
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get("meta_oauth_state")?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(
      new URL("/dashboard/setari?error=invalid_state", request.url)
    );
  }

  cookieStore.delete("meta_oauth_state");

  try {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/meta/callback`;
    const shortLivedToken = await exchangeMetaCodeForToken(code, redirectUri);
    const { token: longLivedToken, expiresIn } = await getMetaLongLivedToken(shortLivedToken);
    const adAccounts = await fetchMetaAdAccounts(longLivedToken);

    if (adAccounts.length === 0) {
      return NextResponse.redirect(
        new URL("/dashboard/setari?error=no_adaccounts", request.url)
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(
        new URL("/dashboard/setari?error=unauthorized", request.url)
      );
    }

    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
    const encryptedToken = encryptToken(longLivedToken);

    for (const account of adAccounts) {
      const { data: existing } = await supabase
        .from("client_platform_accounts")
        .select("id")
        .eq("client_id", user.id)
        .eq("platform", "meta")
        .eq("account_id", account.id)
        .limit(1);

      if (existing && existing.length > 0) {
        await supabase
          .from("client_platform_accounts")
          .update({
            access_token_encrypted: encryptedToken,
            token_expires_at: expiresAt,
            is_active: true,
          })
          .eq("id", existing[0].id);
      } else {
        await supabase.from("client_platform_accounts").insert({
          client_id: user.id,
          platform: "meta",
          account_id: account.id,
          access_token_encrypted: encryptedToken,
          token_expires_at: expiresAt,
          is_active: true,
        });
      }
    }

    return NextResponse.redirect(
      new URL("/dashboard/setari?success=meta_connected", request.url)
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    return NextResponse.redirect(
      new URL(`/dashboard/setari?error=meta_${encodeURIComponent(message)}`, request.url)
    );
  }
}
