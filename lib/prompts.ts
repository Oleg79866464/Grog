import { createSupabaseServerClient } from './supabase-server';
import type { Prompt, PromptCategorySlug } from './types';

const fallbackPrompts: Prompt[] = [];

export async function getPromptsData(): Promise<Prompt[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallbackPrompts;
  }

  const { data, error } = await supabase.from('prompts').select('*').order('featured', { ascending: false }).order('created_at', { ascending: false });

  if (error || !data) {
    return fallbackPrompts;
  }

  return data as Prompt[];
}

export async function getPromptBySlug(slug: string): Promise<Prompt | null> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallbackPrompts.find((prompt) => prompt.slug === slug) ?? null;
  }

  const { data, error } = await supabase.from('prompts').select('*').eq('slug', slug).maybeSingle();

  if (error || !data) {
    return fallbackPrompts.find((prompt) => prompt.slug === slug) ?? null;
  }

  return data as Prompt;
}

export function getPromptsByCategory(category: PromptCategorySlug, prompts: Prompt[]) {
  return prompts.filter((prompt) => prompt.category === category);
}
