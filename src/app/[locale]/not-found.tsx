"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n-context";

export default function NotFound() {
  const locale = useLocale();
  const isRo = locale === "ro";

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-6xl font-black text-[#CCFF00] mb-6">[404]</div>
        <h2 className="text-2xl font-bold text-white mb-4">
          {isRo ? "Pagina nu există." : "Page not found."}
        </h2>
        <p className="text-[#A3A3A3] mb-8">
          {isRo
            ? "Link-ul pe care l-ai accesat nu mai există sau a fost mutat."
            : "The link you accessed no longer exists or has been moved."}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-block px-8 py-4 bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-[#99CC00] transition-colors"
        >
          {isRo ? "[ÎNAPOI_ACASĂ]" : "[BACK_HOME]"}
        </Link>
      </div>
    </div>
  );
}
