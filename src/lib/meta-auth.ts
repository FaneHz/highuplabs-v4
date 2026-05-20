import { randomBytes, createCipheriv, createDecipheriv, scryptSync } from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

function getEncryptionKey(): Buffer {
  const key = process.env.TOKEN_ENCRYPTION_KEY;
  if (!key) throw new Error("TOKEN_ENCRYPTION_KEY not configured");
  return scryptSync(key, "highuplabs-meta-salt", KEY_LENGTH);
}

export function encryptToken(token: string): string {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

export function decryptToken(encryptedToken: string): string {
  const data = Buffer.from(encryptedToken, "base64");
  const iv = data.subarray(0, IV_LENGTH);
  const authTag = data.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const encrypted = data.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
  const decipher = createDecipheriv(ALGORITHM, getEncryptionKey(), iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}

export function generateMetaOAuthState(): string {
  return randomBytes(32).toString("hex");
}

export function generateMetaOAuthUrl(redirectUri: string, state: string): string {
  const url = new URL("https://www.facebook.com/v20.0/dialog/oauth");
  url.searchParams.set("client_id", process.env.META_APP_ID!);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "ads_read,ads_management");
  url.searchParams.set("state", state);
  return url.toString();
}

export async function exchangeMetaCodeForToken(code: string, redirectUri: string): Promise<string> {
  const url = new URL("https://graph.facebook.com/v20.0/oauth/access_token");
  url.searchParams.set("client_id", process.env.META_APP_ID!);
  url.searchParams.set("client_secret", process.env.META_APP_SECRET!);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("code", code);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.access_token;
}

export async function getMetaLongLivedToken(shortLivedToken: string): Promise<{ token: string; expiresIn: number }> {
  const url = new URL("https://graph.facebook.com/v20.0/oauth/access_token");
  url.searchParams.set("grant_type", "fb_exchange_token");
  url.searchParams.set("client_id", process.env.META_APP_ID!);
  url.searchParams.set("client_secret", process.env.META_APP_SECRET!);
  url.searchParams.set("fb_exchange_token", shortLivedToken);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Long-lived token exchange failed: ${res.status} ${err}`);
  }
  const data = await res.json();
  return { token: data.access_token, expiresIn: data.expires_in };
}

export async function fetchMetaAdAccounts(accessToken: string): Promise<Array<{ id: string; name: string }>> {
  const url = new URL("https://graph.facebook.com/v20.0/me/adaccounts");
  url.searchParams.set("access_token", accessToken);
  url.searchParams.set("fields", "id,name,account_status");
  url.searchParams.set("limit", "100");

  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch ad accounts: ${res.status} ${err}`);
  }
  const data = await res.json();
  const accounts: Array<{ id: string; name: string; account_status: number }> = data.data || [];
  return accounts.filter((acc) => acc.account_status === 1);
}
