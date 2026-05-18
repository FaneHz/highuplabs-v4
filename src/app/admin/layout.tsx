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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if user is admin
  const { data: client } = await supabase
    .from("clients")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!client || client.role !== "admin") {
    redirect("/dashboard/overview");
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
              <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-wider mt-1">
                Admin Panel
              </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              {[
                { label: "Aplicații", href: "/admin/applications" },
                { label: "Articole", href: "/admin/articles" },
                { label: "Case Studies", href: "/admin/cases" },
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
