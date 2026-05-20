"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { logAction } from "./audit";

export async function updateClientSettings(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const company_name = formData.get("company_name") as string;
  const phone = formData.get("phone") as string;
  const alert_notifications = formData.get("alert_notifications") === "on";

  const { error } = await supabase
    .from("clients")
    .update({ company_name, phone, alert_notifications })
    .eq("id", user.id);

  if (error) throw new Error(error.message);

  await logAction("settings_updated", { company_name, phone, alert_notifications });

  revalidatePath("/dashboard/setari");
}

export async function disconnectPlatform(platform: "meta" | "google" | "tiktok") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("client_platform_accounts")
    .update({ is_active: false })
    .eq("client_id", user.id)
    .eq("platform", platform);

  if (error) throw new Error(error.message);

  await logAction("platform_disconnected", { platform });

  revalidatePath("/dashboard/setari");
}

export async function completeOnboarding() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("clients")
    .update({ onboarding_completed: true })
    .eq("id", user.id);

  if (error) throw new Error(error.message);
}
