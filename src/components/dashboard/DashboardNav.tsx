"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Image,
  FileText,
  Calculator,
  Search,
  PenTool,
  Bot,
  Share2,
  Settings,
  Rocket,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface NavGroup {
  label?: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { label: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
      { label: "Campanii", href: "/dashboard/campaigns", icon: Megaphone },
      { label: "Reclame", href: "/dashboard/ads", icon: Image },
      { label: "Rapoarte", href: "/dashboard/reports", icon: FileText },
    ],
  },
  {
    items: [
      { label: "Calculator", href: "/dashboard/calculator", icon: Calculator },
      { label: "Analyzer", href: "/dashboard/analyzer", icon: Search },
      { label: "Content", href: "/dashboard/content", icon: PenTool },
    ],
  },
  {
    items: [
      { label: "AI Advisor", href: "/dashboard/ai-advisor", icon: Bot, badge: 1 },
      { label: "Social", href: "/dashboard/social", icon: Share2 },
    ],
  },
  {
    items: [
      { label: "Setări", href: "/dashboard/setari", icon: Settings },
      { label: "Onboarding", href: "/dashboard/onboarding", icon: Rocket },
    ],
  },
];

function NavItemComponent({
  item,
  isActive,
  collapsed,
}: {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider border-[3px] transition-all ${
        isActive
          ? "border-gray-900 bg-gray-900 text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
          : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300"
      } ${collapsed ? "justify-center" : ""}`}
      title={collapsed ? item.label : undefined}
    >
      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-900"}`} />
      {!collapsed && (
        <>
          <span className="truncate">{item.label}</span>
          {item.badge && (
            <span className="ml-auto px-1.5 py-0.5 bg-gray-900 text-white text-[9px] font-bold rounded-none min-w-[18px] text-center">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

export function DashboardNav({ alertCount = 0 }: { alertCount?: number }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? "w-16" : "w-64";

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 border-[3px] border-gray-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 ${sidebarWidth} border-r-[3px] border-gray-900 bg-white flex flex-col shadow-[4px_0_0_0_rgba(0,0,0,0.1)] transition-all duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className={`p-4 border-b-[3px] border-gray-900 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <div>
              <div className="font-mono text-sm font-bold tracking-widest text-gray-900">
                HIGH-UP
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mt-0.5">
                Dashboard
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1 border-2 border-gray-200 hover:border-gray-900 transition-colors"
              title={collapsed ? "Expand" : "Collapse"}
            >
              {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 border-2 border-gray-200 hover:border-gray-900 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-6 overflow-y-auto">
          {NAV_GROUPS.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.label && !collapsed && (
                <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                  {group.label}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href || pathname.startsWith(item.href + "/");
                  const itemWithBadge = item.href === "/dashboard/overview" && alertCount > 0
                    ? { ...item, badge: alertCount }
                    : item;
                  return (
                    <NavItemComponent
                      key={item.href}
                      item={itemWithBadge}
                      isActive={isActive}
                      collapsed={collapsed}
                    />
                  );
                })}
              </div>
              {groupIndex < NAV_GROUPS.length - 1 && !collapsed && (
                <hr className="mt-4 border-gray-200" />
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t-[3px] border-gray-900">
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className={`w-full px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-gray-500 border-2 border-gray-200 hover:border-gray-900 hover:text-gray-900 transition-colors ${
                collapsed ? "flex justify-center" : ""
              }`}
              title={collapsed ? "Logout" : undefined}
            >
              {collapsed ? "×" : "Logout"}
            </button>
          </form>
        </div>
      </aside>

      {/* Spacer for mobile when sidebar is open */}
      <div className="lg:hidden w-0" />
    </>
  );
}
