"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import type { AlertRule } from "@/types";
import {
  createAlertRule,
  deleteAlertRule,
  updateAlertRule,
  acknowledgeAlert,
} from "@/lib/actions/overview";
import {
  Bell,
  Plus,
  Trash2,
  Check,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface AlertsPanelProps {
  alerts: AlertRule[];
  triggeredAlerts: AlertRule[];
  onUpdate: () => void;
}

export function AlertsPanel({ alerts, triggeredAlerts, onUpdate }: AlertsPanelProps) {
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    metric: "ROAS" as AlertRule["metric"],
    operator: "<" as AlertRule["operator"],
    threshold: "",
    is_active: true,
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.threshold) return;

    try {
      await createAlertRule({
        metric: formData.metric,
        operator: formData.operator,
        threshold: Number(formData.threshold),
        is_active: formData.is_active,
      });
      showToast("Alerta creată cu succes", "success");
      setShowForm(false);
      setFormData({ metric: "ROAS", operator: "<", threshold: "", is_active: true });
      onUpdate();
    } catch (err: any) {
      showToast(err.message || "Eroare la creare alertă", "error");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteAlertRule(id);
      showToast("Alerta ștearsă", "success");
      onUpdate();
    } catch (err: any) {
      showToast(err.message || "Eroare la ștergere", "error");
    }
  }

  async function handleToggleActive(id: string, isActive: boolean) {
    try {
      await updateAlertRule(id, { is_active: !isActive });
      showToast(`Alerta ${!isActive ? "activată" : "dezactivată"}`, "success");
      onUpdate();
    } catch (err: any) {
      showToast(err.message || "Eroare la actualizare", "error");
    }
  }

  async function handleAcknowledge(id: string) {
    try {
      await acknowledgeAlert(id);
      showToast("Alerta marcată ca citită", "success");
      onUpdate();
    } catch (err: any) {
      showToast(err.message || "Eroare", "error");
    }
  }

  const triggeredIds = new Set(triggeredAlerts.map((a) => a.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-[var(--color-ink)]" />
          <h2 className="font-heading text-lg font-bold text-[var(--color-ink)]">
            Alerte
          </h2>
          {triggeredAlerts.length > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[var(--color-red)] text-white border border-[var(--color-ink)]">
              {triggeredAlerts.length}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-brutal text-xs inline-flex items-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" />
          {showForm ? "Anulează" : "Adaugă"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="brutal-card p-5 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Metric
              </label>
              <select
                value={formData.metric}
                onChange={(e) => setFormData({ ...formData, metric: e.target.value as AlertRule["metric"] })}
                className="w-full px-3 py-2 text-sm font-mono border-2 border-[var(--color-ink)] bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_var(--color-ink)]"
              >
                <option value="ROAS">ROAS</option>
                <option value="Spend">Spend</option>
                <option value="CTR">CTR</option>
                <option value="Conversions">Conversii</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Operator
              </label>
              <select
                value={formData.operator}
                onChange={(e) => setFormData({ ...formData, operator: e.target.value as AlertRule["operator"] })}
                className="w-full px-3 py-2 text-sm font-mono border-2 border-[var(--color-ink)] bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_var(--color-ink)]"
              >
                <option value="<">{'<'} (mai mic)</option>
                <option value=">">{'>'} (mai mare)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Threshold
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.threshold}
                onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                placeholder="ex: 2.5"
                className="w-full px-3 py-2 text-sm font-mono border-2 border-[var(--color-ink)] bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_var(--color-ink)]"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-mono">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 border-2 border-[var(--color-ink)]"
              />
              Activă
            </label>
            <button type="submit" className="btn-brutal text-xs">
              Salvează Alerta
            </button>
          </div>
        </form>
      )}

      {alerts.length === 0 ? (
        <div className="brutal-card p-8 text-center">
          <Bell className="w-8 h-8 text-[var(--color-muted)] mx-auto mb-3" />
          <p className="font-mono text-sm text-[var(--color-muted)]">
            Nu există alerte configurate.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {triggeredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="brutal-card p-4 border-l-4 border-l-[var(--color-red)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-[var(--color-red)]" />
                  <span className="font-mono text-sm font-bold">
                    {alert.metric} {alert.operator} {alert.threshold}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-[var(--color-red)] text-white border border-[var(--color-ink)]">
                    TRIGGERED
                  </span>
                </div>
                <button
                  onClick={() => handleAcknowledge(alert.id)}
                  className="p-1.5 border border-[var(--color-ink)] hover:bg-[var(--color-bg-alt)] transition-colors"
                  title="Marchează ca citit"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {alerts.map((alert) => {
            const isTriggered = triggeredIds.has(alert.id);
            if (isTriggered) return null;

            return (
              <div key={alert.id} className="brutal-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-[var(--color-muted)]" />
                    <span className="font-mono text-sm">
                      {alert.metric} {alert.operator} {alert.threshold}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono border ${
                        alert.is_active
                          ? "bg-[var(--color-lime)] text-[var(--color-ink)] border-[var(--color-ink)]"
                          : "bg-gray-100 text-gray-500 border-gray-300"
                      }`}
                    >
                      {alert.is_active ? "ACTIVĂ" : "INACTIVĂ"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(alert.id, alert.is_active)}
                      className="p-1.5 border border-[var(--color-ink)] hover:bg-[var(--color-bg-alt)] transition-colors text-xs font-mono"
                    >
                      {alert.is_active ? "Dezactivează" : "Activează"}
                    </button>
                    <button
                      onClick={() => handleDelete(alert.id)}
                      className="p-1.5 border border-[var(--color-red)] text-[var(--color-red)] hover:bg-[var(--color-red)] hover:text-white transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AlertsPanelSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="skeleton-shimmer h-5 w-5 rounded-none" />
          <div className="skeleton-shimmer h-6 w-16 rounded-none" />
        </div>
        <div className="skeleton-shimmer h-8 w-20 rounded-none" />
      </div>
      <div className="brutal-card p-8 text-center">
        <div className="skeleton-shimmer h-8 w-8 mx-auto mb-3 rounded-none" />
        <div className="skeleton-shimmer h-3 w-48 mx-auto rounded-none" />
      </div>
    </div>
  );
}
