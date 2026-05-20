"use client";

import { useState, useMemo } from "react";
import {
  generateSocialStrategy,
  saveStrategy,
  type SocialStrategy,
  type SocialStrategyPost,
} from "@/lib/actions/social";
import {
  Loader2,
  Sparkles,
  Save,
  Check,
  Calendar,
  Target,
  Hash,
  Clock,
  TrendingUp,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  Megaphone,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react";

const BUSINESS_TYPES = [
  "E-commerce / Online Shop",
  "SaaS / Tech Startup",
  "Service Business (agencie, consultanta)",
  "Personal Brand / Creator",
  "Local Business (restaurant, salon, etc.)",
  "Info Products / Cursuri",
  "Fitness / Health",
  "Real Estate",
  "Other",
];

const PLATFORMS = [
  { value: "Instagram", label: "Instagram" },
  { value: "TikTok", label: "TikTok" },
  { value: "Facebook", label: "Facebook" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "YouTube", label: "YouTube" },
  { value: "Twitter/X", label: "Twitter/X" },
];

const OBJECTIVES = [
  { value: "awareness", label: "Brand Awareness", desc: "Reach & visibility" },
  { value: "leads", label: "Lead Generation", desc: "Emails, DMs, calls" },
  { value: "sales", label: "Sales / Conversions", desc: "Direct purchases" },
];

const ORGANIC_BUDGETS = [
  { value: "1-2h/zi", label: "1-2 ore/zi", desc: "Solo operator" },
  { value: "3-4h/zi", label: "3-4 ore/zi", desc: "Part-time focus" },
  { value: "5h+/zi", label: "5+ ore/zi", desc: "Full-time content" },
  { value: "team", label: "Echipă dedicată", desc: "Multiple roles" },
];

const OBJECTIVE_ICONS: Record<string, React.ReactNode> = {
  awareness: <Megaphone className="w-3 h-3" />,
  consideration: <Heart className="w-3 h-3" />,
  conversion: <ShoppingCart className="w-3 h-3" />,
};

const OBJECTIVE_COLORS: Record<string, string> = {
  awareness: "bg-blue-50 text-blue-700 border-blue-200",
  consideration: "bg-amber-50 text-amber-700 border-amber-200",
  conversion: "bg-green-50 text-green-700 border-green-200",
};

export function SocialMediaStrategist() {
  const [businessType, setBusinessType] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [organicBudget, setOrganicBudget] = useState("1-2h/zi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<SocialStrategy | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Calendar state
  const [calendarView, setCalendarView] = useState<"week" | "list">("week");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [platformFilter, setPlatformFilter] = useState<string | "all">("all");
  const [objectiveFilter, setObjectiveFilter] = useState<string | "all">("all");

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const toggleObjective = (objective: string) => {
    setSelectedObjectives((prev) =>
      prev.includes(objective)
        ? prev.filter((o) => o !== objective)
        : [...prev, objective]
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStrategy(null);
    setSaved(false);

    try {
      const result = await generateSocialStrategy({
        business_type: businessType,
        platforms: selectedPlatforms,
        objectives: selectedObjectives,
        organic_budget: organicBudget,
      });
      setStrategy(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!strategy) return;
    setSaving(true);
    try {
      await saveStrategy({ ...strategy, business_type: businessType, platforms: selectedPlatforms });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare la salvare");
    } finally {
      setSaving(false);
    }
  }

  function handleExport(format: "csv" | "json") {
    if (!strategy) return;

    if (format === "json") {
      const dataStr = JSON.stringify(strategy, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `social-strategy-${businessType.replace(/\s+/g, "-")}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const headers = ["Day", "Platform", "Content Type", "Caption", "Hashtags", "Best Time", "Objective"];
      const rows = strategy.content_calendar.map((post: SocialStrategyPost) => [
        post.day,
        post.platform,
        post.content_type,
        `"${post.caption.replace(/"/g, '""')}"`,
        post.hashtags.join(" "),
        post.best_time,
        post.objective,
      ]);
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `content-calendar-${businessType.replace(/\s+/g, "-")}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  const filteredPosts = useMemo(() => {
    if (!strategy) return [];
    return strategy.content_calendar.filter((post: SocialStrategyPost) => {
      if (platformFilter !== "all" && post.platform !== platformFilter) return false;
      if (objectiveFilter !== "all" && post.objective !== objectiveFilter) return false;
      return true;
    });
  }, [strategy, platformFilter, objectiveFilter]);

  const weekPosts = useMemo(() => {
    const start = currentWeek * 7 + 1;
    const end = start + 6;
    return filteredPosts.filter(
      (post: SocialStrategyPost) => post.day >= start && post.day <= end
    );
  }, [filteredPosts, currentWeek]);

  const totalWeeks = strategy ? Math.ceil(strategy.content_calendar.length / 7) : 0;

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Type */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Tip Business *
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm font-mono border border-gray-200 rounded bg-white text-gray-900 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled>Selectează tipul de business</option>
              {BUSINESS_TYPES.map((bt) => (
                <option key={bt} value={bt}>{bt}</option>
              ))}
            </select>
          </div>

          {/* Platforms */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Platforme Active *
            </label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => togglePlatform(p.value)}
                  className={`px-4 py-2 text-xs font-mono border rounded transition-colors ${
                    selectedPlatforms.includes(p.value)
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Obiective *
            </label>
            <div className="flex flex-wrap gap-2">
              {OBJECTIVES.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => toggleObjective(o.value)}
                  className={`px-4 py-2 text-xs font-mono border rounded transition-colors ${
                    selectedObjectives.includes(o.value)
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <div>{o.label}</div>
                  <div className="text-[9px] opacity-70">{o.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Organic Budget */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Buget Organic (timp/efort) *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ORGANIC_BUDGETS.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setOrganicBudget(b.value)}
                  className={`px-4 py-3 text-xs font-mono border rounded transition-colors text-left ${
                    organicBudget === b.value
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <div className="font-semibold">{b.label}</div>
                  <div className="text-[9px] opacity-70 mt-1">{b.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading || !businessType || selectedPlatforms.length === 0 || selectedObjectives.length === 0}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-wider bg-gray-900 text-white border border-gray-900 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Se generează strategia...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generează Strategia
              </>
            )}
          </button>

          {error && (
            <p className="text-sm font-mono text-red-600">{error}</p>
          )}
        </div>
      </form>

      {/* Results */}
      {strategy && (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-gray-900">
                Strategie Social Media
              </h2>
              <p className="text-sm text-gray-500 font-mono mt-1">
                {businessType} / {selectedPlatforms.join(", ")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleExport("csv")}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono uppercase tracking-wider border border-gray-200 rounded hover:border-gray-400 hover:text-gray-900 text-gray-500 transition-colors"
              >
                <Download className="w-3 h-3" />
                Export CSV
              </button>
              <button
                onClick={() => handleExport("json")}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono uppercase tracking-wider border border-gray-200 rounded hover:border-gray-400 hover:text-gray-900 text-gray-500 transition-colors"
              >
                <Download className="w-3 h-3" />
                Export JSON
              </button>
              <button
                onClick={handleSave}
                disabled={saving || saved}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono uppercase tracking-wider border border-gray-200 rounded hover:border-gray-400 hover:text-gray-900 text-gray-500 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : saved ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Save className="w-3 h-3" />
                )}
                {saved ? "Salvat" : "Salvează"}
              </button>
            </div>
          </div>

          {/* Overview */}
          <div className="border border-gray-200 rounded bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                Overview Strategie
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{strategy.overview}</p>
          </div>

          {/* Funnel Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: "awareness", label: "Awareness", icon: <Eye className="w-4 h-4" />, color: "border-blue-200 bg-blue-50/50" },
              { key: "consideration", label: "Consideration", icon: <Heart className="w-4 h-4" />, color: "border-amber-200 bg-amber-50/50" },
              { key: "conversion", label: "Conversion", icon: <ShoppingCart className="w-4 h-4" />, color: "border-green-200 bg-green-50/50" },
            ].map((stage) => (
              <div key={stage.key} className={`border rounded p-4 ${stage.color}`}>
                <div className="flex items-center gap-2 mb-3">
                  {stage.icon}
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                    {stage.label}
                  </span>
                </div>
                <ul className="space-y-2">
                  {strategy.funnel_strategy[stage.key as keyof typeof strategy.funnel_strategy].map(
                    (tactic: string, i: number) => (
                      <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">•</span>
                        {tactic}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Calendar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold font-mono uppercase tracking-wider text-gray-600">
                  Content Calendar
                </span>
                <span className="text-xs font-mono text-gray-400">
                  ({filteredPosts.length} postări)
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex border border-gray-200 rounded overflow-hidden">
                  <button
                    onClick={() => setCalendarView("week")}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                      calendarView === "week"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Săptămână
                  </button>
                  <button
                    onClick={() => setCalendarView("list")}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                      calendarView === "list"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Listă
                  </button>
                </div>

                {/* Week navigation */}
                {calendarView === "week" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentWeek((w) => Math.max(0, w - 1))}
                      disabled={currentWeek === 0}
                      className="p-1 border border-gray-200 rounded hover:border-gray-400 disabled:opacity-30"
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono text-gray-500">
                      Săpt {currentWeek + 1}/{totalWeeks}
                    </span>
                    <button
                      onClick={() => setCurrentWeek((w) => Math.min(totalWeeks - 1, w + 1))}
                      disabled={currentWeek >= totalWeeks - 1}
                      className="p-1 border border-gray-200 rounded hover:border-gray-400 disabled:opacity-30"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] font-mono text-gray-400 uppercase">Filtre:</span>
              </div>
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="px-2 py-1 text-[10px] font-mono border border-gray-200 rounded bg-white"
              >
                <option value="all">Toate platformele</option>
                {selectedPlatforms.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <select
                value={objectiveFilter}
                onChange={(e) => setObjectiveFilter(e.target.value)}
                className="px-2 py-1 text-[10px] font-mono border border-gray-200 rounded bg-white"
              >
                <option value="all">Toate obiectivele</option>
                <option value="awareness">Awareness</option>
                <option value="consideration">Consideration</option>
                <option value="conversion">Conversion</option>
              </select>
            </div>

            {/* Calendar content */}
            {calendarView === "week" ? (
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"].map(
                  (dayName, dayIndex) => {
                    const dayNum = currentWeek * 7 + dayIndex + 1;
                    const posts = weekPosts.filter((p: SocialStrategyPost) => p.day === dayNum);
                    return (
                      <div key={dayName} className="border border-gray-200 rounded bg-white min-h-[120px]">
                        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                            {dayName}
                          </div>
                          <div className="text-xs font-mono text-gray-600">Ziua {dayNum}</div>
                        </div>
                        <div className="p-2 space-y-2">
                          {posts.length > 0 ? (
                            posts.map((post: SocialStrategyPost, i: number) => (
                              <div
                                key={i}
                                className={`p-2 rounded border text-xs ${OBJECTIVE_COLORS[post.objective] || "bg-gray-50 border-gray-200"}`}
                              >
                                <div className="font-semibold">{post.platform}</div>
                                <div className="text-[10px] opacity-80 mt-0.5">{post.content_type}</div>
                                <div className="text-[9px] mt-1 opacity-60">{post.best_time}</div>
                              </div>
                            ))
                          ) : (
                            <div className="text-[10px] text-gray-300 font-mono text-center py-4">
                              —
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredPosts.map((post: SocialStrategyPost) => (
                  <div
                    key={post.day}
                    className="border border-gray-200 rounded bg-white p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold font-mono text-gray-400">
                          {post.day.toString().padStart(2, "0")}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-900">
                              {post.platform}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono rounded border ${
                                OBJECTIVE_COLORS[post.objective] || "bg-gray-50 border-gray-200"
                              }`}
                            >
                              {OBJECTIVE_ICONS[post.objective]}
                              {post.objective}
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-500 mt-0.5">
                            {post.content_type} / {post.best_time}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pl-10">
                      <p className="text-sm text-gray-700 leading-relaxed">{post.caption}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.hashtags.map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 text-[9px] font-mono bg-gray-100 text-gray-500 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hashtag Strategy */}
          <div className="border border-gray-200 rounded bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Hash className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                Hashtag Strategy
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{strategy.hashtag_strategy}</p>
          </div>

          {/* Best Posting Times */}
          <div className="border border-gray-200 rounded bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                Best Posting Times
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(strategy.best_posting_times).map(([platform, times]) => (
                <div key={platform} className="space-y-2">
                  <div className="text-xs font-semibold text-gray-900">{platform}</div>
                  <div className="flex flex-wrap gap-1">
                    {times.map((time: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Tactics */}
          <div className="border border-gray-200 rounded bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                Engagement Tactics
              </span>
            </div>
            <ul className="space-y-2">
              {strategy.engagement_tactics.map((tactic: string, i: number) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  {tactic}
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics */}
          <div className="border border-gray-200 rounded bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                Metrics to Track
              </span>
            </div>
            <ul className="space-y-2">
              {strategy.metrics_to_track.map((metric: string, i: number) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  {metric}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
