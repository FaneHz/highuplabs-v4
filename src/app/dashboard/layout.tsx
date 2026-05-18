import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-mono",
  display: "swap",
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <html lang="ro" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} bg-black text-white`}>
        <div className="flex min-h-screen">
          <aside className="w-64 border-r border-[#1A1A1A] bg-[#0A0A0A] flex flex-col">
            <div className="p-6 border-b border-[#1A1A1A]">
              <div className="font-mono text-sm font-bold tracking-widest text-white">
                HIGH-UP.LABS
              </div>
              <div className="text-[10px] font-mono text-[#666] uppercase tracking-wider mt-1">
                Client Dashboard
              </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              {[
                { label: "Overview", href: "/dashboard/overview" },
                { label: "Campanii", href: "/dashboard/campanii" },
                { label: "Reclame", href: "/dashboard/reclame" },
                { label: "Calculator", href: "/dashboard/calculator" },
                { label: "Rapoarte", href: "/dashboard/rapoarte" },
                { label: "Setări", href: "/dashboard/setari" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-xs font-mono uppercase tracking-wider text-[#A3A3A3] hover:text-[#CCFF00] hover:bg-[#111] border border-transparent hover:border-[#1A1A1A] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            <div className="p-4 border-t border-[#1A1A1A]">
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-[#666] border border-[#1A1A1A] hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
                >
                  Logout
                </button>
              </form>
            </div>
          </aside>
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
