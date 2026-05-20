"use server";

import { createClient } from "@/lib/supabase-server";
import type { CurrencyCode } from "./currency-format";

const FALLBACK_RON_TO_EUR = 0.2;
const FALLBACK_EUR_TO_RON = 4.97;

/**
 * Fetch rate from Frankfurter API and save to DB.
 * Returns rate: 1 `from` = X `to`
 */
export async function getExchangeRate(
  from: CurrencyCode,
  to: CurrencyCode
): Promise<number> {
  if (from === to) return 1;

  const supabase = await createClient();

  // 1. Check DB for fresh rate (< 24h)
  const { data: existing } = await supabase
    .from("exchange_rates")
    .select("rate, date")
    .eq("from_currency", from)
    .eq("to_currency", to)
    .order("date", { ascending: false })
    .limit(1)
    .single();

  const now = new Date();
  const isFresh =
    existing?.date &&
    now.getTime() - new Date(existing.date).getTime() < 24 * 60 * 60 * 1000;

  if (existing && isFresh) {
    return existing.rate;
  }

  // 2. Fetch from Frankfurter
  try {
    const res = await fetch(
      `https://api.frankfurter.app/latest?from=${from}&to=${to}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("Frankfurter fetch failed");

    const json = await res.json();
    const rate = json?.rates?.[to] as number | undefined;

    if (typeof rate !== "number" || isNaN(rate)) {
      throw new Error("Invalid rate from Frankfurter");
    }

    // 3. Save to DB
    await supabase.from("exchange_rates").insert({
      from_currency: from,
      to_currency: to,
      rate,
      date: now.toISOString(),
    });

    return rate;
  } catch {
    // Fallback to hardcoded approximate rates
    if (from === "RON" && to === "EUR") return FALLBACK_RON_TO_EUR;
    if (from === "EUR" && to === "RON") return FALLBACK_EUR_TO_RON;
    return 1;
  }
}

/**
 * Convert amount from one currency to another.
 */
export async function convertAmount(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): Promise<number> {
  if (from === to || amount === 0) return amount;
  const rate = await getExchangeRate(from, to);
  return amount * rate;
}
