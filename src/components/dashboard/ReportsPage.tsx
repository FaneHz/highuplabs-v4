"use client";

import { useState } from "react";
import { useTranslations } from "@/lib/i18n-context";
import { Eye, Download, Plus, FileText, Calendar, FileX, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { generateReport, logReportAction, deleteReport } from "@/lib/actions/reports";
import type { Client } from "@/types";

interface Report {
  id: string;
  title: string;
  period: string;
  type: "weekly" | "monthly";
  metrics: {
    spend: number;
    revenue: number;
    roas: number;
  };
}

interface ReportsPageProps {
  client: Client | null;
  reports: Report[];
}

function ReportCard({
  report,
  onDelete,
}: {
  report: Report;
  onDelete: (id: string) => void;
}) {
  const t = useTranslations("reports");
  const { showToast } = useToast();

  async function handleView() {
    await logReportAction(report.id, "viewed");
    showToast(`${t("viewReport")}: ${report.title}`, "info");
  }

  async function handleExport() {
    await logReportAction(report.id, "exported");
    showToast(`${t("exportPdf")}: ${report.title}`, "info");
  }

  async function handleDelete() {
    if (!confirm(t("confirmDelete"))) return;
    try {
      await deleteReport(report.id);
      showToast(t("deleted"), "success");
      onDelete(report.id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t("deleteError");
      showToast(message, "error");
    }
  }

  return (
    <div className="brutal-card p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-[3px] border-[var(--color-ink)] bg-[var(--color-lime)] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base">{report.title}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--color-muted)]" />
              <span className="font-mono text-xs text-[var(--color-muted)]">{report.period}</span>
            </div>
          </div>
        </div>
        <span className="sticker">{report.type === "weekly" ? t("weekly") : t("monthly")}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="border-[3px] border-[var(--color-ink)] p-3 bg-[var(--color-card)]">
          <p className="font-mono text-[10px] uppercase text-[var(--color-muted)] mb-1">{t("spend")}</p>
          <p className="font-mono text-sm font-bold">
            €{report.metrics.spend.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="border-[3px] border-[var(--color-ink)] p-3 bg-[var(--color-card)]">
          <p className="font-mono text-[10px] uppercase text-[var(--color-muted)] mb-1">{t("revenue")}</p>
          <p className="font-mono text-sm font-bold">
            €{report.metrics.revenue.toLocaleString("ro-RO", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="border-[3px] border-[var(--color-ink)] p-3 bg-[var(--color-card)]">
          <p className="font-mono text-[10px] uppercase text-[var(--color-muted)] mb-1">{t("roas")}</p>
          <p className="font-mono text-sm font-bold">{report.metrics.roas.toFixed(2)}x</p>
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          onClick={handleView}
          className="btn-brutal-ghost flex-1 justify-center text-xs hover:bg-[var(--color-ink)] hover:text-[var(--color-lime)] transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          {t("view")}
        </button>
        <button
          onClick={handleExport}
          className="btn-brutal flex-1 justify-center text-xs"
        >
          <Download className="w-3.5 h-3.5" />
          {t("export")}
        </button>
        <button
          onClick={handleDelete}
          className="btn-brutal-ghost justify-center text-xs hover:bg-[var(--color-red)] hover:text-white transition-colors"
          title={t("delete")}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export function ReportsPage({ client, reports }: ReportsPageProps) {
  const t = useTranslations("reports");
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [period, setPeriod] = useState<"last_week" | "last_month">("last_week");
  const [generating, setGenerating] = useState(false);
  const [reportList, setReportList] = useState(reports);

  function getDateRange(periodValue: "last_week" | "last_month") {
    const now = new Date();
    if (periodValue === "last_week") {
      const from = new Date(now);
      from.setDate(now.getDate() - 7);
      return {
        from: from.toISOString().split("T")[0],
        to: now.toISOString().split("T")[0],
      };
    }
    const from = new Date(now);
    from.setMonth(now.getMonth() - 1);
    return {
      from: from.toISOString().split("T")[0],
      to: now.toISOString().split("T")[0],
    };
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!client?.id) {
      showToast(t("noClient"), "error");
      return;
    }
    setGenerating(true);
    try {
      const { from, to } = getDateRange(period);
      await generateReport(from, to);
      showToast(
        `${t("generateSuccess")}: ${period === "last_week" ? t("lastWeek") : t("lastMonth")}`,
        "success"
      );
      setShowForm(false);
      window.location.reload();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t("generateError");
      showToast(message, "error");
    } finally {
      setGenerating(false);
    }
  }

  function handleDelete(id: string) {
    setReportList((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">{t("title")}</h1>
          <p className="font-mono text-sm text-[var(--color-muted)] mt-1">
            {t("subtitle")}
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="btn-brutal text-sm"
        >
          <Plus className="w-4 h-4" />
          {t("generateNew")}
        </button>
      </div>

      {showForm && (
        <div className="brutal-card p-6 border-[var(--color-lime-dark)]">
          <h2 className="font-heading font-bold text-lg mb-4">{t("generateNew")}</h2>
          <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="block font-heading font-semibold text-sm mb-2">
                {t("selectPeriod")}
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as "last_week" | "last_month")}
                className="w-full border-[3px] border-[var(--color-ink)] bg-[var(--color-card)] px-4 py-3 font-mono text-sm focus:shadow-[0_0_0_4px_var(--color-lime)] focus:outline-none"
              >
                <option value="last_week">{t("lastWeek")}</option>
                <option value="last_month">{t("lastMonth")}</option>
              </select>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-brutal-ghost flex-1 sm:flex-none text-xs hover:bg-[var(--color-ink)] hover:text-[var(--color-lime)] transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                disabled={generating}
                className="btn-brutal flex-1 sm:flex-none text-xs disabled:opacity-50"
              >
                {generating ? t("generating") : t("generate")}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {reportList.map((report) => (
          <ReportCard key={report.id} report={report} onDelete={handleDelete} />
        ))}
      </div>

      {reportList.length === 0 && (
        <div className="brutal-card p-10 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-[3px] border-[var(--color-ink)] bg-[var(--color-bg-alt)] flex items-center justify-center">
            <FileX className="w-8 h-8 text-[var(--color-muted)]" />
          </div>
          <h3 className="font-heading font-bold text-lg">{t("noReportsTitle")}</h3>
          <p className="font-mono text-sm text-[var(--color-muted)] max-w-md">{t("noReports")}</p>
        </div>
      )}
    </div>
  );
}
