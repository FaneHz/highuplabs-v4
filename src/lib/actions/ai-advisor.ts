'use server';

import { chatCompletion, ChatMessage } from '@/lib/openrouter';
import { createClient } from '@/lib/supabase-server';
import { logAction } from './audit';
import { getMetaInsights } from './meta';
import { z } from 'zod';

export interface AdvisorMessage {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  context?: Record<string, unknown>;
  created_at?: string;
}

export interface AdvisorContext {
  meta?: {
    spend: number;
    revenue: number;
    roas: number;
    ctr: number;
    cpc: number;
    conversions: number;
    campaigns: number;
  };
  calculator?: {
    reportedRoas: number;
    targetRoas: number;
    aov: number;
    cogs: number;
    shipping: number;
    fees: number;
  };
  client?: {
    companyName: string;
    industry?: string;
  };
}

// --- Validation Schema ---

const advisorMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(4000),
});

const advisorMessagesSchema = z.array(advisorMessageSchema).min(1).max(50);

// --- System Prompt ---

const SYSTEM_PROMPT = `Ești AI Advisor pentru HighUpLabs — un expert senior în performance marketing, media buying și scalare business.

REGULI:
- Răspunde ÎNTOTDEAUNA în română
- Fii direct, concis, fără bullshit
- Oferă sfaturi acționabile, nu teorie generală
- Când analizezi date, spune exact ce vezi și ce ar trebui făcut
- Folosești bullet points pentru liste
- Poți genera strategii, scripturi de anunțuri, structuri de campanii
- Dacă datele sunt slabe, spune direct — nu încerca să fii politicos
- Răspunde ca un consultant plătit scump, nu ca un chatbot generic

CONTEXT:
Ai acces la datele clientului din dashboard (Meta Ads, calculator POAS, etc.). Folosește aceste date pentru a da răspunsuri personalizate.`;

// --- Helpers ---

async function ensureAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  return user;
}

async function getClientData(userId: string) {
  const supabase = await createClient();
  
  const { data: client } = await supabase
    .from('clients')
    .select('id, company_name, industry')
    .eq('id', userId)
    .single();

  const { data: platforms } = await supabase
    .from('client_platform_accounts')
    .select('platform, is_active')
    .eq('client_id', userId)
    .eq('is_active', true);

  return { client, platforms };
}

async function buildContext(userId: string): Promise<AdvisorContext> {
  const context: AdvisorContext = {};
  
  try {
    const { client, platforms } = await getClientData(userId);
    
    if (client) {
      context.client = {
        companyName: client.company_name,
        industry: client.industry,
      };
    }

    const hasMeta = platforms?.some((p: { platform: string }) => p.platform === 'meta');
    
    if (hasMeta) {
      try {
        const insights = await getMetaInsights('last_30d');
        if (insights?.totals) {
          context.meta = {
            spend: insights.totals.totalSpend || 0,
            revenue: insights.totals.totalRevenue || 0,
            roas: insights.totals.roas || 0,
            ctr: insights.totals.ctr || 0,
            cpc: insights.totals.cpc || 0,
            conversions: insights.totals.totalConversions || 0,
            campaigns: insights.campaigns?.length || 0,
          };
        }
      } catch {
        // Meta data not available, continue without it
      }
    }
  } catch {
    // Context building failed, continue with empty context
  }

  return context;
}

function formatContextForPrompt(context: AdvisorContext): string {
  const parts: string[] = [];

  if (context.client) {
    parts.push(`Client: ${context.client.companyName}${context.client.industry ? ` (${context.client.industry})` : ''}`);
  }

  if (context.meta) {
    parts.push(`\n--- Date Meta Ads (ultimele 30 zile) ---`);
    parts.push(`Spend: ${context.meta.spend.toLocaleString('ro-RO', { maximumFractionDigits: 0 })} RON`);
    parts.push(`Revenue: ${context.meta.revenue.toLocaleString('ro-RO', { maximumFractionDigits: 0 })} RON`);
    parts.push(`ROAS: ${context.meta.roas.toFixed(2)}x`);
    parts.push(`CTR: ${(context.meta.ctr * 100).toFixed(2)}%`);
    parts.push(`CPC: ${context.meta.cpc.toFixed(2)} RON`);
    parts.push(`Conversii: ${context.meta.conversions}`);
    parts.push(`Campanii active: ${context.meta.campaigns}`);
  }

  if (context.calculator) {
    parts.push(`\n--- Date Calculator POAS ---`);
    parts.push(`ROAS raportat: ${context.calculator.reportedRoas.toFixed(2)}x`);
    parts.push(`Target ROAS: ${context.calculator.targetRoas.toFixed(2)}x`);
    parts.push(`AOV: ${context.calculator.aov.toFixed(0)} RON`);
  }

  return parts.join('\n');
}

// --- Actions ---

export async function getAdvisorHistory(): Promise<AdvisorMessage[]> {
  const user = await ensureAuth();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('ai_advisor_chats')
      .select('id, role, content, context, created_at')
      .eq('client_id', user.id)
      .order('created_at', { ascending: true })
      .limit(100);

    if (error) {
      console.error('Failed to fetch advisor history:', error.message);
      return [];
    }

    return (data || []).map((msg: Record<string, unknown>) => ({
      id: msg.id as string,
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content as string,
      context: msg.context as Record<string, unknown>,
      created_at: msg.created_at as string,
    }));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('getAdvisorHistory error:', message);
    return [];
  }
}

export async function saveAdvisorMessage(
  role: 'user' | 'assistant' | 'system',
  content: string,
  context?: Record<string, unknown>
) {
  const user = await ensureAuth();

  const supabase = await createClient();
  const { error } = await supabase.from('ai_advisor_chats').insert({
    client_id: user.id,
    role,
    content,
    context: context || {},
  });

  if (error) {
    console.error('Failed to save advisor message:', error.message);
    throw new Error('Failed to save message');
  }
}

export async function askAIAdvisor(
  messages: AdvisorMessage[],
  extraContext?: Partial<AdvisorContext>
): Promise<{ content: string; context: AdvisorContext }> {
  const user = await ensureAuth();

  // SECURITY: Validate and sanitize messages to prevent prompt injection
  let validatedMessages: Array<{ role: 'user' | 'assistant'; content: string }>;
  try {
    validatedMessages = advisorMessagesSchema.parse(
      messages.map(m => ({ role: m.role, content: m.content }))
    );
  } catch (validationError) {
    await logAction('ai_advisor_validation_error', { user_id: user.id });
    throw new Error('Invalid message format');
  }

  await logAction('ai_advisor_chat', { 
    user_id: user.id, 
    message_count: validatedMessages.length 
  });

  // Build context with client data
  const context = await buildContext(user.id);
  
  // Merge with any extra context passed from client
  if (extraContext?.calculator) {
    context.calculator = extraContext.calculator;
  }

  const contextString = formatContextForPrompt(context);

  // Build messages for OpenRouter
  const chatMessages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
  ];

  // Add context as a system message if available
  if (contextString) {
    chatMessages.push({
      role: 'system',
      content: `Date curente ale clientului:\n${contextString}\n\nFolosește aceste date pentru a da răspunsuri personalizate și specifice.`,
    });
  }

  // Add sanitized conversation history
  for (const msg of validatedMessages) {
    chatMessages.push({
      role: msg.role,
      content: msg.content,
    });
  }

  try {
    const result = await chatCompletion({
      model: 'openrouter/free',
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 2048,
    });

    // Validate response structure
    const responseSchema = z.object({
      choices: z.array(z.object({
        message: z.object({
          content: z.string().min(1)
        })
      })).min(1)
    });

    const parsedResult = responseSchema.parse(result);
    const content = parsedResult.choices[0].message.content;

    if (!content) {
      throw new Error('Empty response from AI');
    }

    await logAction('ai_advisor_chat_success', { user_id: user.id });

    return { content, context };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    await logAction('ai_advisor_chat_error', { user_id: user.id, error: message });
    throw new Error(`AI Advisor failed: ${message}`);
  }
}

export async function clearAdvisorHistory() {
  const user = await ensureAuth();

  const supabase = await createClient();
  const { error } = await supabase
    .from('ai_advisor_chats')
    .delete()
    .eq('client_id', user.id);

  if (error) {
    console.error('Failed to clear advisor history:', error.message);
    throw new Error('Failed to clear history');
  }

  await logAction('ai_advisor_clear_history', { user_id: user.id });
}
