import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Verifica daca clientul are already ad assignments (configurat de admin)
  const { data: assignments } = await supabase
    .from("client_ad_assignments")
    .select("id")
    .eq("client_id", user.id)
    .eq("is_active", true)
    .limit(1);

  // Daca are assignments, redirect la overview
  if (assignments && assignments.length > 0) {
    redirect("/dashboard/overview");
  }

  // Daca nu are assignments — contul nu e configurat inca
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md border border-[#1A1A1A] bg-[#0A0A0A] p-8 text-center">
        <div className="font-mono text-lg font-bold tracking-widest text-white mb-4">
          HIGH-UP.LABS
        </div>
        <div className="text-[10px] font-mono text-[#666] uppercase tracking-wider mb-8">
          Client Dashboard
        </div>

        <div className="w-16 h-16 mx-auto mb-6 border-2 border-[#CCFF00] flex items-center justify-center">
          <div className="w-3 h-3 bg-[#CCFF00] animate-pulse" />
        </div>

        <h2 className="text-xl font-bold text-white mb-4 font-mono">
          Cont in curs de configurare
        </h2>

        <p className="text-sm text-[#666] font-mono leading-relaxed mb-6">
          Echipa High-Up Labs configureaza acum dashboard-ul tau.
          Vei primi un email cand este gata, de obicei in maxim 24 de ore.
        </p>

        <div className="border-t border-[#1A1A1A] pt-6">
          <p className="text-xs text-[#444] font-mono">
            Ai intrebari? Scrie-ne la{' '}
            <a href="mailto:business@highuplabs.ro" className="text-[#CCFF00] hover:underline">
              business@highuplabs.ro
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
