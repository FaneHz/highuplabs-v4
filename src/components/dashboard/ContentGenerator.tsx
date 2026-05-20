"use client";

import { useState } from "react";
import { generateContent, ContentVariant } from "@/lib/actions/ai";
import { Copy, Check, Loader2, Sparkles, FileText, Hash, MousePointer } from "lucide-react";

const PLATFORMS = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "linkedin", label: "LinkedIn" },
];

const TONES = [
  { value: "professional", label: "Profesional" },
  { value: "playful", label: "Playful" },
  { value: "urgent", label: "Urgent" },
  { value: "educational", label: "Educational" },
];

export function ContentGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("facebook");
  const [tone, setTone] = useState("professional");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [variants, setVariants] = useState<ContentVariant[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setVariants([]);

    try {
      const result = await generateContent(topic, platform, tone, context);
      setVariants(result.variants);
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare");
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard(variant: ContentVariant, index: number) {
    const text = `${variant.headline}\n\n${variant.body}\n\n${variant.cta}\n\n${variant.hashtags.join(" ")}`;
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Topic */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Subiect / Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="ex: promovare produse handmade"
              required
              className="w-full px-4 py-3 text-sm font-mono border border-gray-200 rounded bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
            />
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Platformă
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-3 text-sm font-mono border border-gray-200 rounded bg-white text-gray-900 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors appearance-none cursor-pointer"
            >
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Ton / Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-3 text-sm font-mono border border-gray-200 rounded bg-white text-gray-900 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors appearance-none cursor-pointer"
            >
              {TONES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Context - full width */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Context business (opțional)
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Descriere scurtă a business-ului, produse, target audience..."
              rows={4}
              className="w-full px-4 py-3 text-sm font-mono border border-gray-200 rounded bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-wider bg-gray-900 text-white border border-gray-900 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Se generează...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generează
              </>
            )}
          </button>

          {error && (
            <p className="text-sm font-mono text-red-600">{error}</p>
          )}
        </div>
      </form>

      {/* Results */}
      {variants.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-gray-900">
            Variante generate
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {variants.map((variant, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded bg-white overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card header */}
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                    Variantă {index + 1}
                  </span>
                  <button
                    onClick={() => copyToClipboard(variant, index)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border border-gray-200 rounded hover:border-gray-400 hover:text-gray-900 text-gray-500 transition-colors"
                    title="Copiază tot conținutul"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3 h-3" />
                        Copiat
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copiază
                      </>
                    )}
                  </button>
                </div>

                {/* Card body */}
                <div className="p-4 space-y-4">
                  {/* Headline */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                      <FileText className="w-3 h-3" />
                      Headline
                    </div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">
                      {variant.headline}
                    </p>
                    <div className="text-[10px] font-mono text-gray-400">
                      {variant.headline.length}/40 caractere
                    </div>
                  </div>

                  {/* Body */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                      <FileText className="w-3 h-3" />
                      Body
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {variant.body}
                    </p>
                    <div className="text-[10px] font-mono text-gray-400">
                      {variant.body.length}/{platform === "instagram" ? 125 : 220} caractere
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                      <MousePointer className="w-3 h-3" />
                      Call to Action
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {variant.cta}
                    </p>
                  </div>

                  {/* Hashtags */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                      <Hash className="w-3 h-3" />
                      Hashtags
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {variant.hashtags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
