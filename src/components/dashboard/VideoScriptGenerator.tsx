"use client";

import { useState, useCallback } from "react";
import {
  generateVideoScript,
  saveScript,
  type VideoScript,
  type VideoScriptSegment,
} from "@/lib/actions/social";
import {
  Copy,
  Check,
  Loader2,
  Sparkles,
  Save,
  Clock,
  Film,
  Target,
  MessageSquare,
  Hash,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Play,
  Volume2,
  Eye,
} from "lucide-react";

const PLATFORMS = [
  { value: "TikTok", label: "TikTok" },
  { value: "Reels", label: "Instagram Reels" },
  { value: "YouTube Shorts", label: "YouTube Shorts" },
  { value: "YouTube Long", label: "YouTube Long-form" },
];

const DURATIONS = [
  { value: "15s", label: "15 secunde", desc: "Quick hook + punch" },
  { value: "30s", label: "30 secunde", desc: "Standard short-form" },
  { value: "60s", label: "60 secunde", desc: "Deep dive short" },
  { value: "3min", label: "3 minute", desc: "Long-form YouTube" },
];

const TONES = [
  { value: "funny", label: "Amuzant / Funny", desc: "Entertainment, memes, humor" },
  { value: "educational", label: "Educațional", desc: "How-to, tips, tutorials" },
  { value: "dramatic", label: "Dramatic", desc: "Storytelling, emotional" },
  { value: "inspirational", label: "Inspirational", desc: "Motivational, uplifting" },
];

export function VideoScriptGenerator() {
  const [platform, setPlatform] = useState("TikTok");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("30s");
  const [tone, setTone] = useState("educational");
  const [targetAudience, setTargetAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [script, setScript] = useState<VideoScript | null>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedSegment, setExpandedSegment] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setScript(null);
    setSaved(false);

    try {
      const result = await generateVideoScript({
        platform,
        topic,
        duration,
        tone,
        target_audience: targetAudience,
      });
      setScript(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!script) return;
    const text = generateFullText(script);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSave() {
    if (!script) return;
    setSaving(true);
    try {
      await saveScript({ ...script, platform, duration });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare la salvare");
    } finally {
      setSaving(false);
    }
  }

  const toggleSegment = useCallback((index: number) => {
    setExpandedSegment((prev) => (prev === index ? null : index));
  }, []);

  function generateFullText(s: VideoScript): string {
    const segments = s.script
      .map(
        (seg: VideoScriptSegment) =>
          `[${seg.timestamp}] ${seg.text}\nVisual: ${seg.visual_direction}\nAudio: ${seg.audio_direction}`
      )
      .join("\n\n");
    return `${s.title}\n\nHOOK: ${s.hook}\n\n${segments}\n\nCTA: ${s.cta}\n\nHashtags: ${s.hashtags.join(" ")}\n\nEstimat: ${s.estimated_performance}`;
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Topic */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Subiect / Topic *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="ex: cum să faci primul 1000€ online"
              required
              className="w-full px-4 py-3 text-sm font-mono border border-gray-200 rounded bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
            />
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Platformă *
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

          {/* Duration */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Durată *
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-3 text-sm font-mono border border-gray-200 rounded bg-white text-gray-900 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors appearance-none cursor-pointer"
            >
              {DURATIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label} — {d.desc}
                </option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Ton / Tone *
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-3 text-sm font-mono border border-gray-200 rounded bg-white text-gray-900 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors appearance-none cursor-pointer"
            >
              {TONES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label} — {t.desc}
                </option>
              ))}
            </select>
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-600">
              Target Audience *
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="ex: tineri 18-25 pasionați de fitness"
              required
              className="w-full px-4 py-3 text-sm font-mono border border-gray-200 rounded bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading || !topic.trim() || !targetAudience.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-wider bg-gray-900 text-white border border-gray-900 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Se generează scriptul...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generează Script
              </>
            )}
          </button>

          {error && (
            <p className="text-sm font-mono text-red-600">{error}</p>
          )}
        </div>
      </form>

      {/* Results */}
      {script && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-gray-900">
              Script Generat
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono uppercase tracking-wider border border-gray-200 rounded hover:border-gray-400 hover:text-gray-900 text-gray-500 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copiat
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copiază tot
                  </>
                )}
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

          {/* Title & Hook */}
          <div className="border border-gray-200 rounded bg-white overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                  {platform} / {duration}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{script.title}</h3>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-amber-600" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700">
                    Hook — Primele 3 secunde
                  </span>
                </div>
                <p className="text-sm font-semibold text-amber-900">{script.hook}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Timeline Script
            </h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />

              <div className="space-y-3">
                {script.script.map((segment, index) => (
                  <div key={index} className="relative pl-10">
                    {/* Timeline dot */}
                    <div className="absolute left-2 top-4 w-2.5 h-2.5 rounded-full bg-gray-900 border-2 border-white shadow" />

                    <div
                      className="border border-gray-200 rounded bg-white overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => toggleSegment(index)}
                    >
                      {/* Segment header */}
                      <div className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono bg-gray-900 text-white px-2 py-1 rounded">
                            {segment.timestamp}
                          </span>
                          <span className="text-sm font-medium text-gray-900 truncate max-w-[300px]">
                            {segment.text}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-gray-400">
                            {segment.duration}
                          </span>
                          {expandedSegment === index ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Expanded content */}
                      {expandedSegment === index && (
                        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                              <MessageSquare className="w-3 h-3" />
                              Text
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {segment.text}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                                <Eye className="w-3 h-3" />
                                Direcție Vizuală
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {segment.visual_direction}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                                <Volume2 className="w-3 h-3" />
                                Direcție Audio
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {segment.audio_direction}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA & Hashtags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded bg-white p-4">
              <div className="flex items-center gap-2 mb-3">
                <Play className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                  Call to Action
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{script.cta}</p>
            </div>

            <div className="border border-gray-200 rounded bg-white p-4">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                  Hashtags
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {script.hashtags.map((tag, i) => (
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

          {/* Performance estimate */}
          <div className="border border-gray-200 rounded bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                Estimare Performance
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {script.estimated_performance}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
