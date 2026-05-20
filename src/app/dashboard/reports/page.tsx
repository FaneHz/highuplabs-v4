import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { ReportsPage } from "@/components/dashboard/ReportsPage";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function ReportsRoute() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!client) {
    redirect("/dashboard/onboarding");
  }

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <ErrorBoundary>
        <ReportsPage client={client} reports={reports || []} />
      </ErrorBoundary>
    </div>
  );
}
