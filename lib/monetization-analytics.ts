import { createSupabaseServerClient } from './supabase-server';
import type { MonetizationOffer } from './monetization';

export type MonetizationEventRow = {
  offer_id: string;
  event_type: 'click' | 'impression';
  country: string;
  device_type: string;
  referer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  clicked_at: string;
};

export type MonetizationAnalyticsRow = MonetizationOffer & {
  tracked_clicks: number;
  tracked_impressions: number;
  total_clicks: number;
  total_impressions: number;
  last_clicked_at: string | null;
};

const fallbackMonetizationAnalytics: MonetizationAnalyticsRow[] = [];

export async function getMonetizationAnalyticsData(): Promise<MonetizationAnalyticsRow[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallbackMonetizationAnalytics;
  }

  const { data, error } = await supabase.from('monetization_analytics').select('*').order('tracked_clicks', { ascending: false });

  if (error || !data) {
    return fallbackMonetizationAnalytics;
  }

  return data as MonetizationAnalyticsRow[];
}

export function summarizeMonetizationRevenue(rows: MonetizationAnalyticsRow[]) {
  const totalClicks = rows.reduce((sum, row) => sum + Number(row.total_clicks ?? row.tracked_clicks ?? row.click_count ?? 0), 0);
  const totalImpressions = rows.reduce((sum, row) => sum + Number(row.total_impressions ?? row.tracked_impressions ?? row.impression_count ?? 0), 0);
  const estimatedRevenue = totalClicks * 0.15 * 29 * 0.2;
  const revenuePerClick = totalClicks > 0 ? estimatedRevenue / totalClicks : 0;
  const ctr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;

  return {
    totalClicks,
    totalImpressions,
    estimatedRevenue,
    revenuePerClick,
    ctr,
    totalOffers: rows.length,
  };
}
