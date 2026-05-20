"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard/overview");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare de conexiune. Încearcă din nou.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md border border-[#1A1A1A] bg-[#0A0A0A] p-8">
        <div className="mb-8">
          <div className="font-mono text-lg font-bold tracking-widest text-white">
            HIGH-UP.LABS
          </div>
          <div className="text-[10px] font-mono text-[#666] uppercase tracking-wider mt-1">
            Client Dashboard
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 border border-[#EF3E36] bg-[#EF3E36]/10 text-[#EF3E36] text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-[#333] text-white text-sm py-2 focus:border-[#CCFF00] focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-[#333] text-white text-sm py-2 focus:border-[#CCFF00] focus:outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#99CC00] transition-colors disabled:opacity-50"
          >
            {loading ? "Se încarcă..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
