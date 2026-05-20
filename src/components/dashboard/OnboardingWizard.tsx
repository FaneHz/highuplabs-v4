"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ExternalLink, ArrowRight, ArrowLeft, Building2, Bell, BarChart3 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { updateClientSettings } from "@/lib/actions/settings";

interface OnboardingWizardProps {
  clientId: string;
  metaOAuthUrl: string;
  onComplete?: () => void;
}

export function OnboardingWizard({ clientId, metaOAuthUrl, onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    company_name: "",
    phone: "",
    alert_notifications: true,
  });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const steps = [
    {
      icon: BarChart3,
      title: "Bun venit în Dashboard",
      description: "Pentru a vedea metricile live, trebuie să conectezi contul de Meta Ads.",
    },
    {
      icon: Building2,
      title: "Date companie",
      description: "Completează datele de bază ale companiei tale.",
    },
    {
      icon: Bell,
      title: "Notificări",
      description: "Alege cum vrei să fii notificat.",
    },
    {
      icon: Check,
      title: "Gata de start",
      description: "Dashboard-ul tău este configurat.",
    },
  ];

  const handleNext = async () => {
    if (step === 1) {
      // Save company data
      if (!form.company_name) {
        showToast("Completează numele companiei", "error");
        return;
      }
      setSaving(true);
      try {
        const fd = new FormData();
        fd.append("company_name", form.company_name);
        fd.append("phone", form.phone);
        fd.append("alert_notifications", form.alert_notifications ? "on" : "off");
        await updateClientSettings(fd);
        showToast("Date salvate", "success");
      } catch (err) {
        showToast("Eroare la salvare", "error");
      } finally {
        setSaving(false);
      }
    }
    
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      if (onComplete) onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  i <= step
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 transition-colors ${
                    i < step ? "bg-gray-900" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-gray-900" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStep.title}</h2>
          <p className="text-gray-500">{currentStep.description}</p>
        </div>

        {/* Step 0: Connect Meta */}
        {step === 0 && (
          <div className="text-center space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-[#1877F2] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Meta Ads</h3>
              <p className="text-sm text-gray-500 mb-4">
                Conectează contul de Meta Ads pentru a vedea metricile live.
              </p>
              <a
                href={metaOAuthUrl}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Conectează Meta Ads
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Sau poți sări peste acest pas și să-l faci mai târziu din Setări.
            </p>
          </div>
        )}

        {/* Step 1: Company Data */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numele companiei *
              </label>
              <input
                type="text"
                value={form.company_name}
                onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Ex: High-Up Labs SRL"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="+40 725 358 757"
              />
            </div>
          </div>
        )}

        {/* Step 2: Notifications */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <button
                type="button"
                role="switch"
                aria-checked={form.alert_notifications}
                onClick={() => setForm((f) => ({ ...f, alert_notifications: !f.alert_notifications }))}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  form.alert_notifications ? "bg-gray-900" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    form.alert_notifications ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <div>
                <p className="font-medium text-gray-900">Notificări în aplicație</p>
                <p className="text-sm text-gray-500">Primești alerte despre campanii și metrici</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Configurare completă!</h3>
              <p className="text-gray-500">
                Dashboard-ul tău este gata. Poți vedea metricile, rapoartele și setările.
              </p>
            </div>
            <button
              onClick={() => onComplete?.()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Mergi la Dashboard
            </button>
          </div>
        )}

        {/* Navigation */}
        {step < 3 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi
            </button>
            <button
              onClick={handleNext}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {saving ? "Se salvează..." : step === steps.length - 2 ? "Finalizează" : "Continuă"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
