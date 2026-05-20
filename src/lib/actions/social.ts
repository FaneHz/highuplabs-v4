'use server';

import { chatCompletion } from '@/lib/openrouter';
import { z } from 'zod';
import { logAction } from './audit';
import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

// --- Types ---

export interface VideoScriptSegment {
  timestamp: string;
  text: string;
  visual_direction: string;
  audio_direction: string;
  duration: string;
}

export interface VideoScript {
  title: string;
  hook: string;
  script: VideoScriptSegment[];
  cta: string;
  hashtags: string[];
  estimated_performance: string;
}

export interface SocialStrategyPost {
  day: number;
  platform: string;
  content_type: string;
  caption: string;
  hashtags: string[];
  best_time: string;
  objective: string;
}

export interface SocialStrategy {
  overview: string;
  content_calendar: SocialStrategyPost[];
  funnel_strategy: {
    awareness: string[];
    consideration: string[];
    conversion: string[];
  };
  hashtag_strategy: string;
  best_posting_times: Record<string, string[]>;
  engagement_tactics: string[];
  metrics_to_track: string[];
}

// --- Schemas ---

const videoScriptSchema = z.object({
  platform: z.enum(['TikTok', 'Reels', 'YouTube Shorts', 'YouTube Long']),
  topic: z.string().min(1),
  duration: z.enum(['15s', '30s', '60s', '3min']),
  tone: z.enum(['funny', 'educational', 'dramatic', 'inspirational']),
  target_audience: z.string().min(1),
});

const socialStrategySchema = z.object({
  business_type: z.string().min(1),
  platforms: z.array(z.string()).min(1),
  objectives: z.array(z.enum(['awareness', 'leads', 'sales'])).min(1),
  organic_budget: z.string().min(1),
});

// --- Helpers ---

async function ensureAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  return user;
}

function extractJsonFromCompletion(result: unknown): unknown {
  const r = result as Record<string, unknown>;
  const choices = r?.choices as Array<Record<string, unknown>> | undefined;
  const message = choices?.[0]?.message as Record<string, unknown> | undefined;
  const content = message?.content as string | undefined;

  if (!content) {
    throw new Error('Invalid response format from OpenRouter');
  }

  try {
    return JSON.parse(content);
  } catch (err) {
    console.warn("[social] JSON parse error, retrying with cleaned content:", err instanceof Error ? err.message : String(err));
    const cleaned = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    return JSON.parse(cleaned);
  }
}

// --- Actions ---

export async function generateVideoScript(data: {
  platform: string;
  topic: string;
  duration: string;
  tone: string;
  target_audience: string;
}) {
  const user = await ensureAuth();
  const parsed = videoScriptSchema.parse(data);

  await logAction('ai_video_script_generate', {
    user_id: user.id,
    platform: parsed.platform,
    topic: parsed.topic,
    duration: parsed.duration,
  });

  const durationMap: Record<string, { segments: number; wordsPerSegment: string }> = {
    '15s': { segments: 3, wordsPerSegment: '10-15 words' },
    '30s': { segments: 5, wordsPerSegment: '15-25 words' },
    '60s': { segments: 8, wordsPerSegment: '20-30 words' },
    '3min': { segments: 12, wordsPerSegment: '30-50 words' },
  };

  const config = durationMap[parsed.duration];

  const systemPrompt = `You are an expert video scriptwriter for social media. You create highly engaging, viral-ready video scripts optimized for specific platforms.

Platform: ${parsed.platform}
Duration: ${parsed.duration}
Tone: ${parsed.tone}
Target Audience: ${parsed.target_audience}

CRITICAL RULES:
- The HOOK (first 3 seconds) MUST be impossible to scroll past. Use pattern interrupts, curiosity gaps, or direct address.
- Each script segment must include specific visual direction (what appears on screen) and audio direction (music, SFX, voiceover style).
- Keep language punchy. Every word must earn its place.
- CTA must feel natural, not forced.
- Hashtags must be platform-optimized (mix of broad and niche).
- Estimated performance should benchmark against platform averages.

Generate EXACTLY ${config.segments} script segments.

Return ONLY valid JSON in this EXACT structure:
{
  "title": "string - catchy, click-worthy title",
  "hook": "string - first 3 seconds, scroll-stopping hook",
  "script": [
    {
      "timestamp": "string - e.g. 0:00-0:05",
      "text": "string - exact words to say",
      "visual_direction": "string - detailed visual description for this segment",
      "audio_direction": "string - music style, sound effects, voice tone",
      "duration": "string - e.g. 5s"
    }
  ],
  "cta": "string - clear, actionable call-to-action",
  "hashtags": ["string"],
  "estimated_performance": "string - realistic engagement prediction with reasoning"
}`;

  try {
    const result = await chatCompletion({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Create a ${parsed.duration} video script about: ${parsed.topic}\n\nTarget audience: ${parsed.target_audience}\nTone: ${parsed.tone}\nPlatform: ${parsed.platform}` },
      ],
      temperature: 0.8,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
    });

    const scriptData = extractJsonFromCompletion(result) as VideoScript;

    await logAction('ai_video_script_success', { user_id: user.id });
    return scriptData;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    await logAction('ai_video_script_error', { user_id: user.id, error: message });
    throw new Error(`Video script generation failed: ${message}`);
  }
}

export async function generateSocialStrategy(data: {
  business_type: string;
  platforms: string[];
  objectives: string[];
  organic_budget: string;
}) {
  const user = await ensureAuth();
  const parsed = socialStrategySchema.parse(data);

  await logAction('ai_social_strategy_generate', {
    user_id: user.id,
    business_type: parsed.business_type,
    platforms: parsed.platforms,
  });

  const systemPrompt = `You are a senior social media strategist with 10+ years experience. You create comprehensive, actionable 30-day social media strategies.

Business Type: ${parsed.business_type}
Platforms: ${parsed.platforms.join(', ')}
Objectives: ${parsed.objectives.join(', ')}
Organic Budget: ${parsed.organic_budget}

CRITICAL REQUIREMENTS:
1. Content calendar must have EXACTLY 30 posts (one per day), distributed across platforms
2. Each post must have: day number, platform, content type, full caption, hashtags, best posting time, and objective alignment
3. Funnel strategy must cover all 3 stages with specific tactics
4. Hashtag strategy must be platform-specific and include research methodology
5. Best posting times must be timezone-aware and platform-specific
6. Engagement tactics must be creative, not generic
7. Metrics to track must be specific and measurable

Return ONLY valid JSON in this EXACT structure:
{
  "overview": "string - executive summary of the strategy in Romanian",
  "content_calendar": [
    {
      "day": number,
      "platform": "string",
      "content_type": "string - e.g. educational carousel, behind-the-scenes, product demo",
      "caption": "string - full, ready-to-post caption in Romanian",
      "hashtags": ["string"],
      "best_time": "string - e.g. 18:00-20:00 EEST",
      "objective": "string - awareness|consideration|conversion"
    }
  ],
  "funnel_strategy": {
    "awareness": ["string - specific tactic"],
    "consideration": ["string - specific tactic"],
    "conversion": ["string - specific tactic"]
  },
  "hashtag_strategy": "string - detailed hashtag approach in Romanian",
  "best_posting_times": {
    "platform_name": ["string - time slots"]
  },
  "engagement_tactics": ["string - creative engagement ideas in Romanian"],
  "metrics_to_track": ["string - specific KPIs with target values"]
}`;

  try {
    const result = await chatCompletion({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Create a 30-day strategy for: ${parsed.business_type}\nPlatforms: ${parsed.platforms.join(', ')}\nGoals: ${parsed.objectives.join(', ')}\nTime/Effort: ${parsed.organic_budget}` },
      ],
      temperature: 0.7,
      max_tokens: 8192,
      response_format: { type: 'json_object' },
    });

    const strategyData = extractJsonFromCompletion(result) as SocialStrategy;

    await logAction('ai_social_strategy_success', { user_id: user.id });
    return strategyData;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    await logAction('ai_social_strategy_error', { user_id: user.id, error: message });
    throw new Error(`Social strategy generation failed: ${message}`);
  }
}

export async function saveScript(script: VideoScript & { platform: string; duration: string }) {
  const user = await ensureAuth();
  const supabase = await createClient();

  const { error } = await supabase
    .from('video_scripts')
    .insert({
      client_id: user.id,
      title: script.title,
      platform: script.platform,
      duration: script.duration,
      script: {
        hook: script.hook,
        segments: script.script,
        cta: script.cta,
        hashtags: script.hashtags,
        estimated_performance: script.estimated_performance,
      },
    });

  if (error) {
    await logAction('ai_video_script_save_error', { user_id: user.id, error: error.message });
    throw new Error(`Failed to save script: ${error.message}`);
  }

  await logAction('ai_video_script_save', { user_id: user.id, title: script.title });
  revalidatePath('/dashboard/social');
  return { success: true };
}

export async function getSavedScripts() {
  const user = await ensureAuth();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('video_scripts')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(`Failed to fetch scripts: ${error.message}`);
  }

  return data || [];
}

export async function saveStrategy(strategy: SocialStrategy & { business_type: string; platforms: string[] }) {
  const user = await ensureAuth();
  const supabase = await createClient();

  const { error } = await supabase
    .from('social_strategies')
    .insert({
      client_id: user.id,
      business_type: strategy.business_type,
      platforms: strategy.platforms,
      strategy: {
        overview: strategy.overview,
        content_calendar: strategy.content_calendar,
        funnel_strategy: strategy.funnel_strategy,
        hashtag_strategy: strategy.hashtag_strategy,
        best_posting_times: strategy.best_posting_times,
        engagement_tactics: strategy.engagement_tactics,
        metrics_to_track: strategy.metrics_to_track,
      },
    });

  if (error) {
    await logAction('ai_social_strategy_save_error', { user_id: user.id, error: error.message });
    throw new Error(`Failed to save strategy: ${error.message}`);
  }

  await logAction('ai_social_strategy_save', { user_id: user.id, business_type: strategy.business_type });
  revalidatePath('/dashboard/social');
  return { success: true };
}

export async function getSavedStrategies() {
  const user = await ensureAuth();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('social_strategies')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(`Failed to fetch strategies: ${error.message}`);
  }

  return data || [];
}
