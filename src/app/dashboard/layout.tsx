import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { LocaleProvider } from "@/lib/i18n-context";

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
    <div className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} bg-gray-50 text-gray-900`}>
      <LocaleProvider locale="ro">
        <div className="flex min-h-screen">
          <aside className="w-64 border-r border-gray-200 bg-white flex flex-col shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="font-mono text-sm font-bold tracking-widest text-gray-900">
                HIGH-UP.LABS
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mt-1">
                Client Dashboard
              </div>
            </div>
            
            <DashboardNav />
            
            <div className="p-4 border-t border-gray-200 mt-auto">
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-colors rounded"
                >
                  Logout
                </button>
              </form>
            </div>
          </aside>
          
          <main className="flex-1 overflow-auto p-8">
            <ToastProvider>
              {children}
            </ToastProvider>
          </main>
        </div>
      </LocaleProvider>
    </div>
  );
}
