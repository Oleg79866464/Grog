import { createSupabaseServerClient } from './supabase-server';

export async function logMonetizationImpression(params: {
  offerId: string;
  country: string;
  deviceType: string;
  referer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}) {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return false;
  }

  const { error } = await supabase.from('monetization_events').insert({
    offer_id: params.offerId,
    event_type: 'impression',
    country: params.country,
    device_type: params.deviceType,
    referer: params.referer,
    utm_source: params.utmSource,
    utm_medium: params.utmMedium,
    utm_campaign: params.utmCampaign,
    clicked_at: new Date().toISOString(),
  });

  return !error;
}
