import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { getMetaInsights } from "@/lib/actions/meta";
import { MarginCalculator } from "@/components/dashboard/MarginCalculator";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function CalculatorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: platforms } = await supabase
    .from("client_platform_accounts")
    .select("platform, is_active")
    .eq("client_id", user.id)
    .eq("is_active", true);

  const hasMeta = platforms?.some((p: { platform: string }) => p.platform === "meta") ?? false;

  let reportedRoas = 0;

  if (hasMeta) {
    try {
      const insights = await getMetaInsights("last_30d");
      reportedRoas = insights.totals.roas || 0;
    } catch {
      reportedRoas = 0;
    }
  }

  return (
    <div className="p-8">
      <ErrorBoundary>
        <h1 className="text-2xl font-bold font-mono mb-8">Calculator POAS</h1>
        {!hasMeta && (
          <div className="mb-6 p-4 border border-gray-200 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 font-mono">
              Nu ai conectat niciun cont publicitar. Calculatorul funcționează cu date estimate.
              Mergi la <Link href="/dashboard/setari" className="text-gray-900 font-semibold hover:underline">Setări</Link> pentru a conecta Meta Ads.
            </p>
          </div>
        )}
        <MarginCalculator reportedRoas={reportedRoas} />
      </ErrorBoundary>
    </div>
  );
}
