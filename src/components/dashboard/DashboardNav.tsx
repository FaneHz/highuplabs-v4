"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard/overview" },
  { label: "Calculator", href: "/dashboard/calculator" },
  { label: "Analyzer", href: "/dashboard/analyzer" },
  { label: "Setări", href: "/dashboard/setari" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-4 space-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-3 text-xs font-mono uppercase tracking-wider border transition-colors rounded ${
              isActive
                ? "text-gray-900 bg-gray-100 border-gray-300 font-bold"
                : "text-gray-500 border-transparent hover:text-gray-900 hover:bg-gray-50 hover:border-gray-200"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
