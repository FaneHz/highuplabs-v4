import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { CampaignsTable } from "@/components/dashboard/CampaignsTable";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function CampaignsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <ErrorBoundary>
        <CampaignsTable />
      </ErrorBoundary>
    </div>
  );
}
