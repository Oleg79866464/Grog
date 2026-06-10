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

  const body = (await request.json().catch(() => null)) as { id?: string; affiliate_url?: string } | null;
  const id = body?.id?.trim();
  const affiliateUrl = body?.affiliate_url?.trim();

  if (!id || !affiliateUrl) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(affiliateUrl);
  } catch {
    return NextResponse.json({ error: 'invalid_url' }, { status: 400 });
  }

  if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
    return NextResponse.json({ error: 'invalid_url_protocol' }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: 'supabase_unavailable' }, { status: 503 });
  }

  const { error } = await supabase.from('tools').update({ affiliate_url: parsedUrl.toString() }).eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'update_failed', details: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
