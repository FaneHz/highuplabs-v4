"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { getExchangeRate } from "@/lib/currency";
import type { CurrencyCode } from "@/lib/currency-format";

export async function updateCurrencyPreference(currency: CurrencyCode) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("clients")
    .update({ currency_preference: currency })
    .eq("id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/calculator");
  revalidatePath("/dashboard/setari");
}

export async function getExchangeRateAction(from: CurrencyCode, to: CurrencyCode) {
  return getExchangeRate(from, to);
}
