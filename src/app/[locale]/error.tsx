"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n-context";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const isRo = locale === "ro";

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-6xl font-black text-[#EF3E36] mb-6">[ERR]</div>
        <h2 className="text-2xl font-bold text-white mb-4">
          {isRo ? "Ceva nu a mers bine." : "Something went wrong."}
        </h2>
        <p className="text-[#A3A3A3] mb-8">
          {isRo
            ? "A apărut o eroare la încărcarea paginii. Încearcă din nou."
            : "An error occurred while loading the page. Please try again."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-[#99CC00] transition-colors"
          >
            {isRo ? "[ÎNCEARCĂ_DIN_NOU]" : "[TRY_AGAIN]"}
          </button>
          <Link
            href={`/${locale}`}
            className="px-8 py-4 border border-[#1A1A1A] text-[#A3A3A3] text-xs font-mono font-bold uppercase tracking-[0.2em] hover:border-[#666666] transition-colors"
          >
            {isRo ? "[ACASĂ]" : "[HOME]"}
          </Link>
        </div>
      </div>
    </div>
  );
}
