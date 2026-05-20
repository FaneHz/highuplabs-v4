'use server';

import { createClient } from '@/lib/supabase-server';
import { z } from 'zod';

const scenarioSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(100),
  inputs: z.object({
    revenue: z.number(),
    cogs: z.number(),
    fulfillment: z.number(),
    adSpend: z.number(),
    fixedCosts: z.number(),
    agencyFeePercent: z.number(),
  }),
  results: z.object({
    grossProfit: z.number(),
    agencyFee: z.number(),
    ebitda: z.number(),
    netMargin: z.number(),
    breakEvenRevenue: z.number(),
  }),
});

export interface CalculatorScenarioRecord {
  id: string;
  client_id: string;
  name: string;
  inputs: Record<string, unknown>;
  results: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export async function getCalculatorScenarios(): Promise<CalculatorScenarioRecord[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('calculator_scenarios')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []) as CalculatorScenarioRecord[];
}

export async function saveCalculatorScenario(data: z.infer<typeof scenarioSchema>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const parsed = scenarioSchema.parse(data);

  const { data: result, error } = await supabase
    .from('calculator_scenarios')
    .insert({
      client_id: user.id,
      name: parsed.name,
      inputs: parsed.inputs,
      results: parsed.results,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return result;
}

export async function deleteCalculatorScenario(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('calculator_scenarios')
    .delete()
    .eq('id', id)
    .eq('client_id', user.id);

  if (error) throw new Error(error.message);
}