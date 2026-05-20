import { createClient } from "@/lib/supabase-server";
import { SettingsPage } from "@/components/dashboard/SettingsPage";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";
import { redirect } from "next/navigation";

export default async function SettingsRoute() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold font-mono mb-8">Setări</h1>
      <ErrorBoundary>
        <SettingsPage client={client} />
      </ErrorBoundary>
    </div>
  );
}
