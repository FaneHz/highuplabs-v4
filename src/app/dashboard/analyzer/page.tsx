import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { WebsiteAnalyzer } from "@/components/dashboard/WebsiteAnalyzer";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function AnalyzerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <ErrorBoundary>
        <WebsiteAnalyzer />
      </ErrorBoundary>
    </div>
  );
}