import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { AIAdvisorChat } from "@/components/dashboard/AIAdvisorChat";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";
import { getMetaInsights } from "@/lib/actions/meta";

export default async function AIAdvisorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id, company_name")
    .eq("id", user.id)
    .single();

  const { data: platforms } = await supabase
    .from("client_platform_accounts")
    .select("platform, is_active")
    .eq("client_id", user.id)
    .eq("is_active", true);

  const hasMeta = platforms?.some((p: { platform: string }) => p.platform === "meta") ?? false;

  let metaContext = undefined;
  if (hasMeta) {
    try {
      const insights = await getMetaInsights("last_30d");
      if (insights?.totals) {
        metaContext = {
          spend: insights.totals.totalSpend || 0,
          revenue: insights.totals.totalRevenue || 0,
          roas: insights.totals.roas || 0,
          ctr: insights.totals.ctr || 0,
          cpc: insights.totals.cpc || 0,
          conversions: insights.totals.totalConversions || 0,
          campaigns: insights.campaigns?.length || 0,
        };
      }
    } catch {
      // Meta data not available
    }
  }

  return (
    <div className="p-8 h-full">
      <ErrorBoundary>
        <AIAdvisorChat 
          clientId={client?.id || user.id}
          companyName={client?.company_name || 'Client'}
          metaContext={metaContext}
        />
      </ErrorBoundary>
    </div>
  );
}
