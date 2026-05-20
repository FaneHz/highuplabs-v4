"use client";

import { useState } from "react";
import { useTranslations } from "@/lib/i18n-context";
import { Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { updateClientSettings } from "@/lib/actions/settings";
import type { Client } from "@/types";

interface SettingsPageProps {
  client: Client | null;
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="brutal-card p-6">
      <h2 className="font-heading font-bold text-lg mb-6">{title}</h2>
      {children}
    </div>
  );
}

export function SettingsPage({ client }: SettingsPageProps) {
  const t = useTranslations("settings");
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    company_name: client?.company_name || "",
    phone: client?.phone || "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const fd = new FormData();
      fd.append("company_name", form.company_name);
      fd.append("phone", form.phone);
      await updateClientSettings(fd);
      setMessage(t("saved"));
      showToast(t("saved"), "success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t("saveError");
      setMessage(message);
      showToast(message, "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl">{t("title")}</h1>
        <p className="font-mono text-sm text-[var(--color-muted)] mt-1">
          {t("subtitle")}
        </p>
      </div>

      {message && (
        <div
          className={`brutal-card p-4 flex items-center gap-3 ${
            message.includes(t("saved")) ? "border-green-600" : "border-[var(--color-red)]"
          }`}
        >
          {message.includes(t("saved")) ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[var(--color-red)]" />
          )}
          <span className="font-mono text-sm">{message}</span>
        </div>
      )}

      <SectionCard title={t("companyData")}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-heading font-semibold text-sm mb-2">
              {t("companyName")}
            </label>
            <input
              type="text"
              value={form.company_name}
              onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
              className="w-full border-[3px] border-[var(--color-ink)] bg-[var(--color-card)] px-4 py-3 font-mono text-sm transition-shadow focus:shadow-[0_0_0_4px_var(--color-lime)] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-heading font-semibold text-sm mb-2">
              {t("email")}
            </label>
            <input
              type="email"
              value={client?.email || ""}
              disabled
              className="w-full border-[3px] border-[var(--color-ink)] bg-[var(--color-bg-alt)] px-4 py-3 font-mono text-sm opacity-60 cursor-not-allowed"
            />
            <p className="font-mono text-xs text-[var(--color-muted)] mt-1">
              {t("emailReadOnly")}
            </p>
          </div>

          <div>
            <label className="block font-heading font-semibold text-sm mb-2">
              {t("phone")}
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full border-[3px] border-[var(--color-ink)] bg-[var(--color-card)] px-4 py-3 font-mono text-sm transition-shadow focus:shadow-[0_0_0_4px_var(--color-lime)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-heading font-semibold text-sm mb-2">
              {t("plan")}
            </label>
            <select
              value={client?.plan_type || "performance"}
              disabled
              className="w-full border-[3px] border-[var(--color-ink)] bg-[var(--color-bg-alt)] px-4 py-3 font-mono text-sm opacity-60 cursor-not-allowed"
            >
              <option value="performance">Performance</option>
              <option value="scaling">Scaling</option>
              <option value="enterprise">Enterprise</option>
            </select>
            <p className="font-mono text-xs text-[var(--color-muted)] mt-1">
              {t("planReadOnly")}
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-brutal disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? t("saving") : t("save")}
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
