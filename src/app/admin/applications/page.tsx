import { createClient } from "@/lib/supabase-server";

export default async function ApplicationsPage() {
  const supabase = await createClient();
  const { data: applications } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black uppercase tracking-tight text-white">
          Aplicații
        </h1>
        <div className="text-xs font-mono text-[#666]">
          {applications?.length || 0} total
        </div>
      </div>

      <div className="border border-[#1A1A1A]">
        <div className="grid grid-cols-12 gap-0 border-b border-[#1A1A1A] bg-[#111] text-[10px] font-mono uppercase tracking-wider text-[#666] p-4">
          <div className="col-span-2">Nume</div>
          <div className="col-span-2">Email</div>
          <div className="col-span-2">Telefon</div>
          <div className="col-span-2">Vânzări/lună</div>
          <div className="col-span-2">Buget Ads</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Data</div>
        </div>

        {applications?.map((app) => (
          <div
            key={app.id}
            className="grid grid-cols-12 gap-0 border-b border-[#1A1A1A] p-4 text-sm text-[#D4D4D8] hover:bg-[#111] transition-colors"
          >
            <div className="col-span-2 truncate">{app.name}</div>
            <div className="col-span-2 truncate">{app.email}</div>
            <div className="col-span-2 truncate">{app.phone || "N/A"}</div>
            <div className="col-span-2">{app.monthly_sales}</div>
            <div className="col-span-2">{app.ad_budget}</div>
            <div className="col-span-1">
              <span className="text-[10px] font-mono uppercase px-2 py-1 bg-[#CCFF00]/10 text-[#CCFF00]">
                {app.status}
              </span>
            </div>
            <div className="col-span-1 text-[10px] font-mono text-[#666]">
              {new Date(app.created_at).toLocaleDateString("ro-RO")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
