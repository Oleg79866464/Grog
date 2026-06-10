import { NextRequest, NextResponse } from 'next/server';
import { getToolBySlug } from '@/lib/catalog';
import { getToolsData } from '@/lib/data';
import { createSupabaseServerClient } from '@/lib/supabase-server';

function getDeviceType(userAgent: string | null) {
  return userAgent?.includes('Mobile') ? 'mobile' : 'desktop';
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const tools = await getToolsData();
  const tool = tools.find((item) => item.id === params.id) ?? getToolBySlug(params.id);

  if (!tool) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }

  const url = new URL(tool.affiliate_url || tool.url);
  const utmSource = request.nextUrl.searchParams.get('utm_source') || 'grog';
  const utmMedium = request.nextUrl.searchParams.get('utm_medium') || 'affiliate';
  const utmCampaign = request.nextUrl.searchParams.get('utm_campaign') || tool.slug;

  url.searchParams.set('utm_source', utmSource);
  url.searchParams.set('utm_medium', utmMedium);
  url.searchParams.set('utm_campaign', utmCampaign);

  const supabase = createSupabaseServerClient();
  const country = request.headers.get('x-vercel-ip-country') || 'unknown';
  const deviceType = getDeviceType(request.headers.get('user-agent'));
  const referer = request.headers.get('referer') || '';

  if (supabase) {
    const { error } = await supabase.from('clicks').insert({
      tool_id: tool.id,
      slug: tool.slug,
      country,
      device_type: deviceType,
      referer,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
    });

    if (error) {
      console.error('Failed to log click', error.message);
    }
  }

  const response = NextResponse.redirect(url, 302);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
