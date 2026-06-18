import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { isAdminEmail } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminEmail(session.user?.email)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    id?: string;
    slug?: string;
    entity_type?: string;
    title?: string;
    description?: string;
    short_description?: string;
    url?: string;
    affiliate_url?: string;
    cta_label?: string;
    category?: string;
    placement?: string;
    price_model?: string;
    pricing?: string;
    commission_rate?: number;
    featured?: boolean;
    verified?: boolean;
    status?: string;
    tags?: string[];
    country?: string;
    device_type?: string;
  } | null;

  if (!body?.id || !body.slug || !body.entity_type || !body.title || !body.url || !body.affiliate_url) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  let parsedUrl: URL;
  let parsedAffiliateUrl: URL;

  try {
    parsedUrl = new URL(body.url);
    parsedAffiliateUrl = new URL(body.affiliate_url);
  } catch {
    return NextResponse.json({ error: 'invalid_url' }, { status: 400 });
  }

  if (!['https:', 'http:'].includes(parsedUrl.protocol) || !['https:', 'http:'].includes(parsedAffiliateUrl.protocol)) {
    return NextResponse.json({ error: 'invalid_url_protocol' }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: 'supabase_unavailable' }, { status: 503 });
  }

  const { error } = await supabase.from('monetization_offers').upsert({
    id: body.id,
    slug: body.slug,
    entity_type: body.entity_type,
    title: body.title,
    description: body.description ?? '',
    short_description: body.short_description ?? '',
    url: parsedUrl.toString(),
    affiliate_url: parsedAffiliateUrl.toString(),
    cta_label: body.cta_label ?? 'Open',
    category: body.category ?? 'general',
    placement: body.placement ?? 'homepage_footer',
    price_model: body.price_model ?? 'revshare',
    pricing: body.pricing ?? 'custom',
    commission_rate: body.commission_rate ?? 0.2,
    featured: body.featured ?? false,
    verified: body.verified ?? false,
    status: body.status ?? 'draft',
    tags: body.tags ?? [],
    country: body.country ?? 'RU',
    device_type: body.device_type ?? 'all',
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: 'upsert_failed', details: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
