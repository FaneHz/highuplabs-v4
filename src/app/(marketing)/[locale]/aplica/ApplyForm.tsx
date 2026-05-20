"use client";

import { useState } from "react";
import { useForm, FormProvider, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "@/lib/i18n-context";
import Link from "next/link";
import { applicationSchema, type ApplicationInput } from "@/lib/schemas/application";

const schema = applicationSchema;
type FormData = ApplicationInput;

const steps = [
  { id: 0, labelRo: "Date contact", labelEn: "Contact" },
  { id: 1, labelRo: "Business", labelEn: "Business" },
  { id: 2, labelRo: "Confirmare", labelEn: "Confirm" },
];

export default function ApplyPage() {
  const locale = useLocale();
  const isRo = locale === "ro";
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      sales: "",
      budget: "",
      message: "",
      honeypot: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = methods;

  const values = watch();

  const nextStep = async () => {
    const fields: (keyof FormData)[] = step === 0 
      ? ["name", "email", "phone", "website"] 
      : ["sales", "budget"];
    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/applica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Eroare la trimitere");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Eroare la trimitere. Încearcă din nou.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl font-black text-[#CCFF00] mb-6">[OK]</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {isRo ? "Am primit aplicația." : "Application received."}
          </h2>
          <p className="text-[#A3A3A3] mb-8">
            {isRo
              ? "Răspundem în 24 de ore lucrătoare. Fără vânzare forțată."
              : "We'll respond within 24 business hours. No hard selling."}
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

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.3em]">
            [AUDIT]
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-black uppercase tracking-[-0.05em] text-white">
            {isRo ? "APLICĂ" : "APPLY"}
          </h1>
          <p className="mt-4 text-base text-[#A3A3A3] max-w-xl">
            {isRo
              ? "30 de minute pe businessul tău. Îți arătăm ce am face, cum și pe ce cifre. Dacă nu ne potrivim, îți spunem din primul call."
              : "30 minutes on your business. We'll show you what we'd do, how, and on what numbers. If we're not a fit, we'll tell you on the first call."}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12 max-w-2xl">
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex-1 h-1 transition-colors ${
                    i <= step ? "bg-[#CCFF00]" : "bg-[#1A1A1A]"
                  }`}
                />
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider whitespace-nowrap ${
                    i <= step ? "text-[#CCFF00]" : "text-[#666666]"
                  }`}
                >
                  {isRo ? s.labelRo : s.labelEn}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 transition-colors ${
                      i < step ? "bg-[#CCFF00]" : "bg-[#1A1A1A]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl border border-[#1A1A1A] p-8 md:p-12 bg-[#0A0A0A]"
            noValidate
          >
            {/* Honeypot */}
            <input
              type="text"
              {...register("honeypot")}
              className="absolute opacity-0 pointer-events-none"
              tabIndex={-1}
              aria-hidden="true"
            />

            {/* Step 1: Contact */}
            {step === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <Field
                    label={isRo ? "Nume *" : "Name *"}
                    name="name"
                    register={register}
                    error={errors.name?.message}
                    placeholder={isRo ? "Ex: Ion Popescu" : "Ex: John Doe"}
                  />
                  <Field
                    label={isRo ? "Email *" : "Email *"}
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email?.message}
                    placeholder="you@company.com"
                  />
                  <Field
                    label={isRo ? "Telefon" : "Phone"}
                    name="phone"
                    register={register}
                    error={errors.phone?.message}
                    placeholder="+40 725 358 757"
                  />
                  <Field
                    label={isRo ? "Website" : "Website"}
                    name="website"
                    register={register}
                    error={errors.website?.message}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-4 bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-[#99CC00] transition-colors"
                  >
                    {isRo ? "[CONTINUĂ]" : "[CONTINUE]"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Business */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <Field
                    label={isRo ? "Vânzări medii/lună (EUR) *" : "Avg. sales/month (EUR) *"}
                    name="sales"
                    register={register}
                    error={errors.sales?.message}
                    placeholder="10000"
                  />
                  <Field
                    label={isRo ? "Buget ads/lună (EUR) *" : "Ad budget/month (EUR) *"}
                    name="budget"
                    register={register}
                    error={errors.budget?.message}
                    placeholder="2000"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-2">
                    {isRo ? "Mesaj opțional" : "Optional message"}
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder={isRo
                      ? "Orice context ne ajută să înțelegem mai bine businessul..."
                      : "Any context helps us understand your business better..."
                    }
                    className="w-full bg-transparent border-b-2 border-[#1A1A1A] focus:border-[#CCFF00] text-white py-3 outline-none transition-colors text-sm resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-[#EF3E36] font-mono">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 border border-[#1A1A1A] text-[#A3A3A3] text-xs font-mono font-bold uppercase tracking-[0.2em] hover:border-[#666666] transition-colors"
                  >
                    {isRo ? "[ÎNAPOI]" : "[BACK]"}
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-4 bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-[#99CC00] transition-colors"
                  >
                    {isRo ? "[CONTINUĂ]" : "[CONTINUE]"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmare */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4 border border-[#1A1A1A] p-6">
                  <div className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.2em] mb-4">
                    {isRo ? "[REZUMAT]" : "[SUMMARY]"}
                  </div>
                  <SummaryRow label={isRo ? "Nume" : "Name"} value={values.name} />
                  <SummaryRow label={isRo ? "Email" : "Email"} value={values.email} />
                  <SummaryRow label={isRo ? "Telefon" : "Phone"} value={values.phone || "-"} />
                  <SummaryRow label={isRo ? "Website" : "Website"} value={values.website || "-"} />
                  <SummaryRow label={isRo ? "Vânzări/lună" : "Sales/month"} value={values.sales} />
                  <SummaryRow label={isRo ? "Buget ads/lună" : "Ad budget/month"} value={values.budget} />
                  <SummaryRow label={isRo ? "Mesaj" : "Message"} value={values.message || "-"} />
                </div>

                {submitError && (
                  <div className="p-4 border border-[#EF3E36] bg-[#EF3E36]/10">
                    <p className="text-sm text-[#EF3E36] font-mono">{submitError}</p>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={submitting}
                    className="px-8 py-4 border border-[#1A1A1A] text-[#A3A3A3] text-xs font-mono font-bold uppercase tracking-[0.2em] hover:border-[#666666] transition-colors disabled:opacity-50"
                  >
                    {isRo ? "[ÎNAPOI]" : "[BACK]"}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-4 bg-[#CCFF00] text-black text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-[#99CC00] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {submitting && (
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    )}
                    {isRo ? "[TRIMITE_APLICAȚIA]" : "[SUBMIT_APPLICATION]"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  register,
  error,
  placeholder,
}: {
  label: string;
  name: keyof FormData;
  type?: string;
  register: UseFormRegister<FormData>;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-mono text-[#A3A3A3] uppercase tracking-[0.2em] mb-2">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b-2 border-[#1A1A1A] focus:border-[#CCFF00] text-white py-3 outline-none transition-colors text-sm"
      />
      {error && (
        <p className="mt-1 text-xs text-[#EF3E36] font-mono">{error}</p>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[#1A1A1A] last:border-b-0">
      <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider">{label}</span>
      <span className="text-sm text-white">{value || "-"}</span>
    </div>
  );
}

