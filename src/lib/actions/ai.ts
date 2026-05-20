'use server';

import { chatCompletion } from '@/lib/openrouter';
import { z } from 'zod';
import { logAction } from './audit';
import { createClient } from '@/lib/supabase-server';

// --- Types ---

export interface ContentVariant {
  headline: string;
  body: string;
  cta: string;
  hashtags: string[];
}

export interface WebsiteAnalysisResult {
  summary: string;
  scores: Array<{
    category: string;
    score: number;
    reasoning: string;
  }>;
  issues: Array<{
    severity: 'high' | 'medium' | 'low';
    description: string;
    impact: string;
  }>;
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    action: string;
    expectedImpact: string;
  }>;
}

// --- Schemas ---

const askAIAdvisorSchema = z.object({
  prompt: z.string().min(1),
  context: z.unknown().optional(),
});

const analyzeMarginsSchema = z.object({
  inputs: z.unknown(),
  metaContext: z.unknown().optional(),
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
  } catch {
    const cleaned = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    return JSON.parse(cleaned);
  }
}

// --- Actions ---

export async function askAIAdvisor(data: { prompt: string; context?: unknown }) {
  const user = await ensureAuth();
  const parsed = askAIAdvisorSchema.parse(data);

  await logAction('ai_advisor_ask', { user_id: user.id, prompt: parsed.prompt });

  const systemPrompt = `Ești un AI Advisor pentru HighUpLabs, o agenție de performance marketing.
Răspunde în română. Oferă sfaturi strategice, acționabile și directe despre marketing digital, CRO, media buying și scalare.
Fii concis, fără bullshit.`;

  try {
    const result = await chatCompletion({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: parsed.context ? `${parsed.prompt}\n\nContext: ${JSON.stringify(parsed.context)}` : parsed.prompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    await logAction('ai_advisor_success', { user_id: user.id });
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    await logAction('ai_advisor_error', { user_id: user.id, error: message });
    throw new Error(`AI Advisor failed: ${message}`);
  }
}

export async function analyzeWebsite(url: string) {
  const user = await ensureAuth();
  const parsedUrl = z.string().url().parse(url);

  await logAction('ai_website_analyze', { user_id: user.id, url: parsedUrl });

  let html: string;
  try {
    const response = await fetch(parsedUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!response.ok) throw new Error(`Failed to fetch website: ${response.status}`);
    html = await response.text();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    await logAction('ai_website_fetch_error', { user_id: user.id, url: parsedUrl, error: message });
    throw new Error(`Website fetch failed: ${message}`);
  }

  const textContent = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, 8000);

  const systemPrompt = `Ești un expert CRO (Conversion Rate Optimization). Analizează conținutul website-ului primit și oferă un audit structurat în JSON cu următoarea schemă exactă:
{
  "summary": "string - sumar executiv în română",
  "scores": [
    { "category": "string", "score": number 0-10, "reasoning": "string" }
  ],
  "issues": [
    { "severity": "high|medium|low", "description": "string", "impact": "string" }
  ],
  "recommendations": [
    { "priority": "high|medium|low", "action": "string", "expectedImpact": "string" }
  ]
}
Răspunde STRICT în format JSON valid, fără markdown, fără text adițional.`;

  try {
    const result = await chatCompletion({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `URL: ${parsedUrl}\n\nContent:\n${textContent}` },
      ],
      temperature: 0.5,
      max_tokens: 2048,
      response_format: { type: 'json_object' },
    });

    const data = extractJsonFromCompletion(result) as WebsiteAnalysisResult;

    await logAction('ai_website_success', { user_id: user.id, url: parsedUrl });
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    await logAction('ai_website_error', { user_id: user.id, url: parsedUrl, error: message });
    throw new Error(`Website analysis failed: ${message}`);
  }
}

export async function generateContent(
  topic: string,
  platform: string,
  tone?: string,
  context?: string
) {
  const user = await ensureAuth();

  await logAction('ai_content_generate', { user_id: user.id, topic, platform });

  const systemPrompt = `Ești un copywriter senior pentru social media. Generează 3 variante de post pentru platforma și topicul specificat.
Răspunde în română. Returnează un JSON valid cu structura exactă:
{
  "variants": [
    { "headline": "string max 40 chars", "body": "string", "cta": "string", "hashtags": ["string"] }
  ]
}
Fă postările engaging, cu CTA clar, adaptate tonei și platformei.`;

  try {
    const result = await chatCompletion({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Topic: ${topic}\nPlatform: ${platform}\nTone: ${tone || 'professional'}\nContext: ${context || 'N/A'}` },
      ],
      temperature: 0.8,
      max_tokens: 2048,
      response_format: { type: 'json_object' },
    });

    const data = extractJsonFromCompletion(result) as { variants: ContentVariant[] };

    await logAction('ai_content_success', { user_id: user.id });
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    await logAction('ai_content_error', { user_id: user.id, error: message });
    throw new Error(`Content generation failed: ${message}`);
  }
}

export interface MarginAnalysisResult {
  profitability_score: number;
  break_even_analysis: string;
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    action: string;
    impact: string;
    estimated_value: string;
  }>;
  risks: Array<{
    severity: 'high' | 'medium' | 'low';
    description: string;
    mitigation: string;
  }>;
  scaling_opportunities: string[];
}

const marginAnalysisResultSchema = z.object({
  profitability_score: z.number().min(0).max(100),
  break_even_analysis: z.string(),
  recommendations: z.array(z.object({
    priority: z.enum(['high', 'medium', 'low']),
    action: z.string(),
    impact: z.string(),
    estimated_value: z.string(),
  })),
  risks: z.array(z.object({
    severity: z.enum(['high', 'medium', 'low']),
    description: z.string(),
    mitigation: z.string(),
  })),
  scaling_opportunities: z.array(z.string()),
});

export async function analyzeMargins(data: { inputs: unknown; metaContext?: unknown }) {
  const user = await ensureAuth();
  const parsed = analyzeMarginsSchema.parse(data);

  await logAction('ai_margins_analyze', { user_id: user.id });

  const systemPrompt = `Ești un expert financiar pentru e-commerce cu 15 ani experiență în analiza profitabilității business-urilor online.

TASK: Analizează datele financiare primite și oferă un audit complet al profitabilității în format JSON strict.

STRUCTURĂ OBLIGATORIE:
{
  "profitability_score": number (0-100),
  "break_even_analysis": "string - analiză detaliată break-even în română",
  "recommendations": [
    {
      "priority": "high|medium|low",
      "action": "string - acțiune concretă și specifică",
      "impact": "string - impact estimat asupra business-ului",
      "estimated_value": "string - valoare estimată în EUR sau procent"
    }
  ],
  "risks": [
    {
      "severity": "high|medium|low",
      "description": "string - descriere clară a riscului",
      "mitigation": "string - strategie de mitigare concretă"
    }
  ],
  "scaling_opportunities": ["string - oportunități de scalare"]
}

INSTRUCȚIUNI:
- Scorul de profitabilitate (0-100) bazat pe: marja netă, raportul break-even/revenue, eficiența ad spend, structura costurilor
- Break-even: calculează cât trebuie să vândă lunar pentru a acoperi toate costurile, cât de aproape e de veniturile actuale
- Recomandări: maxim 5, prioritizate, cu acțiuni concrete și valori estimate
- Riscuri: identifică riscurile reale din date (dependență de ads, marjă mică, costuri fixe mari, etc.)
- Oportunități: sugerează canale de scalare sau optimizări
- Răspunde ÎN ROMÂNĂ, folosește termeni de business clari
- Fii direct, fără bullshit, acționabil
- Răspunde STRICT în JSON valid, fără markdown, fără text adițional`;

  try {
    const result = await chatCompletion({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Date financiare: ${JSON.stringify(parsed.inputs)}\nContext suplimentar: ${parsed.metaContext ? JSON.stringify(parsed.metaContext) : 'N/A'}` },
      ],
      temperature: 0.4,
      max_tokens: 2500,
      response_format: { type: 'json_object' },
    });

    const extracted = extractJsonFromCompletion(result);
    const validated = marginAnalysisResultSchema.parse(extracted);

    await logAction('ai_margins_success', { user_id: user.id });
    return validated;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    await logAction('ai_margins_error', { user_id: user.id, error: message });
    throw new Error(`Margin analysis failed: ${message}`);
  }
}
