"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-client";

export function useAppConfig() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    
    async function load() {
      try {
        const supabase = createClient();
        if (!supabase) return;
        
        const { data, error } = await supabase
          .from("app_config")
          .select("key, value");
        
        if (error) {
          console.error("useAppConfig error:", error);
          return;
        }
        
        if (!cancelled) {
          const configData = data || [];
          const map: Record<string, string> = {};
          configData.forEach((row: { key: string; value: string }) => {
            map[row.key] = row.value;
          });
          setConfig(map);
        }
      } catch (err) {
        console.error("useAppConfig exception:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    
    load();
    return () => { cancelled = true; };
  }, []);

  return { config, loading, getValue: (key: string, fallback?: string) => config[key] || fallback };
}
