import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { AdsTable } from "@/components/dashboard/AdsTable";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function AdsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <ErrorBoundary>
        <AdsTable />
      </ErrorBoundary>
    </div>
  );
}
