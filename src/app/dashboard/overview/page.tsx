import { createClient } from "@/lib/supabase-server";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function OverviewPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("id, company_name")
    .eq("id", user.id)
    .single();

  if (clientError || !client) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">
          Eroare
        </h1>
        <p className="mt-4 text-sm text-gray-500">
          Nu am putut încărca datele clientului. Te rugăm să încerci din nou mai târziu.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <ErrorBoundary>
        <DashboardOverview clientId={client.id} companyName={client.company_name} />
      </ErrorBoundary>
    </div>
  );
}
