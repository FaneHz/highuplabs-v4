"use server";

import { createClient } from "@/lib/supabase-server";

export async function logAction(action: string, details: object = {}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("audit_logs").insert({
    client_id: user?.id || null,
    action,
    details,
  });

  if (error) {
    console.error("Audit log failed:", error.message);
  }
}
