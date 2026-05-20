import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { SettingsPage } from "@/components/dashboard/SettingsPage";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function SettingsRoute() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  // Daca nu exista inregistrare in clients, redirect la onboarding
  if (!client) {
    redirect("/dashboard/onboarding");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold font-mono mb-8">Setări</h1>
      <ErrorBoundary>
        <SettingsPage client={client} />
      </ErrorBoundary>
    </div>
  );
}
