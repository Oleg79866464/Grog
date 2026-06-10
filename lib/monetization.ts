import { createSupabaseServerClient } from './supabase-server';

export type MonetizationPlacement = 'homepage_hero' | 'homepage_mid' | 'homepage_footer' | 'sidebar' | 'prompts' | 'tools';
export type MonetizationEntityType = 'sponsor' | 'advertiser' | 'bank_product';
export type MonetizationStatus = 'draft' | 'active' | 'paused' | 'archived';

export type MonetizationOffer = {
  id: string;
  slug: string;
  entity_type: MonetizationEntityType;
  title: string;
  description: string;
  short_description: string;
  url: string;
  affiliate_url: string;
  cta_label: string;
  category: string;
  placement: MonetizationPlacement;
  price_model: string;
  pricing: string;
  commission_rate: number;
  featured: boolean;
  verified: boolean;
  status: MonetizationStatus;
  tags: string[];
  country: string;
  device_type: string;
  referer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  click_count: number;
  impression_count: number;
  created_at: string;
  updated_at: string;
};

export type MonetizationAnalyticsRow = MonetizationOffer & {
  tracked_clicks: number;
  tracked_impressions: number;
  total_clicks: number;
  total_impressions: number;
  last_clicked_at: string | null;
};

const fallbackMonetizationOffers: MonetizationOffer[] = [];
const fallbackMonetizationAnalytics: MonetizationAnalyticsRow[] = [];

export async function getMonetizationOffersData(): Promise<MonetizationOffer[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallbackMonetizationOffers;
  }

  const { data, error } = await supabase
    .from('monetization_offers')
    .select('*')
    .eq('status', 'active')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error || !data) {
    return fallbackMonetizationOffers;
  }

  return data as MonetizationOffer[];
}

export async function getMonetizationAnalyticsData(): Promise<MonetizationAnalyticsRow[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallbackMonetizationAnalytics;
  }

  const { data, error } = await supabase
    .from('monetization_analytics')
    .select('*')
    .order('tracked_clicks', { ascending: false })
    .order('tracked_impressions', { ascending: false });

  if (error || !data) {
    return fallbackMonetizationAnalytics;
  }

  return data as MonetizationAnalyticsRow[];
}

export function summarizeMonetizationRevenue(rows: MonetizationAnalyticsRow[]) {
  const totalClicks = rows.reduce((sum, row) => sum + Number(row.total_clicks ?? row.tracked_clicks ?? row.click_count ?? 0), 0);
  const totalImpressions = rows.reduce(
    (sum, row) => sum + Number(row.total_impressions ?? row.tracked_impressions ?? row.impression_count ?? 0),
    0,
  );
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
