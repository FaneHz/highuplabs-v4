"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function generateReport(dateFrom: string, dateTo: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const title = `Raport ${dateFrom} – ${dateTo}`;
  const { data, error } = await supabase
    .from("reports")
    .insert({
      client_id: user.id,
      title,
      date_from: dateFrom,
      date_to: dateTo,
      metrics: {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await supabase.from("audit_logs").insert({
    client_id: user.id,
    action: "report_generated",
    details: { report_id: data.id, date_from: dateFrom, date_to: dateTo },
  });

  return data;
}

export async function getReports() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function deleteReport(reportId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("reports")
    .delete()
    .eq("id", reportId)
    .eq("client_id", user.id);

  if (error) throw new Error(error.message);

  await supabase.from("audit_logs").insert({
    client_id: user.id,
    action: "report_deleted",
    details: { report_id: reportId },
  });

}

export async function logReportAction(reportId: string, action: "viewed" | "exported") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("audit_logs").insert({
    client_id: user.id,
    action: `report_${action}`,
    details: { report_id: reportId },
  });
}
