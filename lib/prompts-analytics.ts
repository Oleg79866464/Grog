import { createSupabaseServerClient } from './supabase-server';
import type { Prompt } from './types';

export type PromptAnalyticsRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  currency: 'USD' | 'RUB';
  featured: boolean;
  file_url: string;
  preview_text: string;
  created_at: string;
  updated_at: string;
  click_count: number;
  tracked_clicks: number;
  total_clicks: number;
  mobile_clicks: number;
  desktop_clicks: number;
  geo_events: number;
  last_clicked_at: string | null;
};

const fallbackPromptAnalytics: PromptAnalyticsRow[] = [];

export async function getPromptAnalyticsData(): Promise<PromptAnalyticsRow[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallbackPromptAnalytics;
  }

  const { data, error } = await supabase
    .from('prompts_analytics')
    .select('*')
    .order('tracked_clicks', { ascending: false })
    .order('created_at', { ascending: false });

  if (error || !data) {
    return fallbackPromptAnalytics;
  }

  return data as PromptAnalyticsRow[];
}

export function summarizePromptRevenue(rows: PromptAnalyticsRow[]) {
  const totalClicks = rows.reduce(
    (sum, row) => sum + Number(row.total_clicks ?? row.tracked_clicks ?? row.click_count ?? 0),
    0,
  );
  const totalPrompts = rows.length;
  const featuredPrompts = rows.filter((row) => row.featured).length;
  const estimatedRevenue = totalClicks * 0.15 * 29 * 0.2;
  const revenuePerClick = totalClicks > 0 ? estimatedRevenue / totalClicks : 0;

  return {
    totalClicks,
    totalPrompts,
    featuredPrompts,
    estimatedRevenue,
    revenuePerClick,
  };
}

export function promptRowsToHighlights(rows: PromptAnalyticsRow[]) {
  return rows.slice(0, 5).map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    clicks: Number(row.total_clicks ?? row.tracked_clicks ?? row.click_count ?? 0),
    category: row.category,
    price: row.price,
    currency: row.currency,
    featured: row.featured,
    last_clicked_at: row.last_clicked_at,
  }));
}

export function promptToAnalyticsRow(prompt: Prompt): PromptAnalyticsRow {
  return {
    ...prompt,
    click_count: 0,
    tracked_clicks: 0,
    total_clicks: 0,
    mobile_clicks: 0,
    desktop_clicks: 0,
    geo_events: 0,
    last_clicked_at: null,
  };
}
