import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { encryptToken } from "@/lib/meta-auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/dashboard/setari?error=google_${error}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/dashboard/setari?error=google_no_code", request.url)
    );
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errData = await tokenResponse.json();
      throw new Error(errData.error_description || "Token exchange failed");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;

    // Fetch customer info from Google Ads API
    const customerResponse = await fetch(
      "https://googleads.googleapis.com/v14/customers:listAccessibleCustomers",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "developer-token": process.env.GOOGLE_DEVELOPER_TOKEN || "",
        },
      }
    );

    if (!customerResponse.ok) {
      throw new Error("Failed to fetch Google Ads accounts");
    }

    const customerData = await customerResponse.json();
    const customers = customerData.resourceNames || [];

    if (customers.length === 0) {
      return NextResponse.redirect(
        new URL("/dashboard/setari?error=google_no_accounts", request.url)
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(
        new URL("/dashboard/setari?error=unauthorized", request.url)
      );
    }

    // Store tokens (simplified - in production encrypt these)
    const expiresAt = tokenData.expires_in
      ? new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
      : null;

    for (const customer of customers) {
      const customerId = customer.replace("customers/", "");
      const { data: existing } = await supabase
        .from("client_platform_accounts")
        .select("id")
        .eq("client_id", user.id)
        .eq("platform", "google")
        .eq("account_id", customerId)
        .limit(1);

      // Encrypt tokens before storing (SECURITY: never store plaintext tokens)
      const encryptedAccessToken = encryptToken(accessToken);
      const encryptedRefreshToken = refreshToken ? encryptToken(refreshToken) : null;

      if (existing && existing.length > 0) {
        await supabase
          .from("client_platform_accounts")
          .update({
            access_token_encrypted: encryptedAccessToken,
            refresh_token_encrypted: encryptedRefreshToken,
            token_expires_at: expiresAt,
            is_active: true,
          })
          .eq("id", existing[0].id);
      } else {
        await supabase.from("client_platform_accounts").insert({
          client_id: user.id,
          platform: "google",
          account_id: customerId,
          access_token_encrypted: encryptedAccessToken,
          refresh_token_encrypted: encryptedRefreshToken,
          token_expires_at: expiresAt,
          is_active: true,
        });
      }
    }

    return NextResponse.redirect(
      new URL("/dashboard/setari?success=google_connected", request.url)
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    return NextResponse.redirect(
      new URL(`/dashboard/setari?error=google_${encodeURIComponent(message)}`, request.url)
    );
  }
}
