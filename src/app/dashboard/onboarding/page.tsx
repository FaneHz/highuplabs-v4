import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { OnboardingWizard } from "@/components/dashboard/OnboardingWizard";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("id", user.id)
    .single();

  const clientId = client?.id || user.id;
  
  // Build Meta OAuth URL (same as in settings)
  const metaAppId = process.env.META_APP_ID;
  const metaRedirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/meta/callback`;
  const metaOAuthUrl = metaAppId 
    ? `https://www.facebook.com/v18.0/dialog/oauth?client_id=${metaAppId}&redirect_uri=${encodeURIComponent(metaRedirectUri)}&scope=ads_read,ads_management`
    : "";

  return (
    <div className="p-8">
      <ErrorBoundary>
        <OnboardingWizard 
          clientId={clientId} 
          metaOAuthUrl={metaOAuthUrl}
        />
      </ErrorBoundary>
    </div>
  );
}
