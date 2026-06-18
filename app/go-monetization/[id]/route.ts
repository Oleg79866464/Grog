import { type NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { getClientFingerprint, isSuspiciousUserAgent } from '@/lib/abuse';
import { createChallengeToken } from '@/lib/challenge-store';
import { getRateLimitRetryAfterSeconds, isRateLimited } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getDeviceType(userAgent: string | null) {
  return userAgent?.includes('Mobile') ? 'mobile' : 'desktop';
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const userAgent = request.headers.get('user-agent');
  const fingerprint = getClientFingerprint(ip, userAgent);

  if (isRateLimited(`monetization:${fingerprint}`) || isSuspiciousUserAgent(userAgent)) {
    const token = createChallengeToken(fingerprint);
    return NextResponse.json(
      { error: 'challenge_required', challengeToken: token, challengeUrl: '/challenge' },
      { status: 429, headers: { 'Retry-After': String(getRateLimitRetryAfterSeconds(`monetization:${fingerprint}`)) } },
    );
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: 'supabase_unavailable' }, { status: 503 });
  }

  const { data: offer, error: offerError } = await supabase
    .from('monetization_offers')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'active')
    .maybeSingle();

  if (offerError || !offer) {
    return NextResponse.json({ error: 'offer_not_found' }, { status: 404 });
  }

  const targetUrl = new URL(offer.affiliate_url || offer.url);
  const utmSource = request.nextUrl.searchParams.get('utm_source') || 'grog';
  const utmMedium = request.nextUrl.searchParams.get('utm_medium') || 'affiliate';
  const utmCampaign = request.nextUrl.searchParams.get('utm_campaign') || offer.slug;

  targetUrl.searchParams.set('utm_source', utmSource);
  targetUrl.searchParams.set('utm_medium', utmMedium);
  targetUrl.searchParams.set('utm_campaign', utmCampaign);

  const country = request.headers.get('x-vercel-ip-country') || 'unknown';
  const deviceType = getDeviceType(userAgent);
  const referer = request.headers.get('referer') || '';

  const { error: eventError } = await supabase.from('monetization_events').insert({
    offer_id: offer.id,
    event_type: 'click',
    country,
    device_type: deviceType,
    referer,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    clicked_at: new Date().toISOString(),
  });

  if (eventError) {
    console.error('Failed to log monetization click', eventError.message);
  }

  const response = NextResponse.redirect(targetUrl, 302);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
