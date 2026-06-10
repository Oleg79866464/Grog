import type { Tool } from './types';
import { createSupabaseServerClient } from './supabase-server';
import { tools as localTools } from './catalog';

export async function getToolsData(): Promise<Tool[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return localTools;
  }

  const { data, error } = await supabase.from('tools').select('*').order('featured', { ascending: false }).order('created_at', { ascending: false });

  if (error || !data) {
    return localTools;
  }

  return data as Tool[];
}

export async function getToolDataBySlug(slug: string): Promise<Tool | null> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return localTools.find((tool) => tool.slug === slug) ?? null;
  }

  const { data, error } = await supabase.from('tools').select('*').eq('slug', slug).maybeSingle();

  if (error || !data) {
    return localTools.find((tool) => tool.slug === slug) ?? null;
  }

  return data as Tool;
}
