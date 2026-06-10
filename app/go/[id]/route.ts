import { NextRequest, NextResponse } from 'next/server';
import { getToolBySlug, tools } from '@/lib/catalog';

function resolveToolById(id: string) {
  return tools.find((tool) => tool.id === id) ?? getToolBySlug(id);
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const tool = resolveToolById(params.id);

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

  const response = NextResponse.redirect(url, 302);
  response.headers.set('Cache-Control', 'no-store');
  response.cookies.set('grog_click', JSON.stringify({
    tool_id: tool.id,
    slug: tool.slug,
    clicked_at: new Date().toISOString(),
    referer: request.headers.get('referer') || '',
    country: request.headers.get('x-vercel-ip-country') || 'unknown',
    device_type: request.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop',
  }), { httpOnly: false, sameSite: 'lax', path: '/' });

  return response;
}
