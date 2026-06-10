import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { analyticsConfig, siteUrl } from '@/lib/config';
import { getSiteControls } from '@/lib/site-controls';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { ManualAffiliateLinkForm } from '@/components/manual-affiliate-link-form';
import { getPromptsData } from '@/lib/prompts';
import { getPromptAnalyticsData, summarizePromptRevenue, type PromptAnalyticsRow } from '@/lib/prompts-analytics';

type MetricPair = [label: string, value: string | number];

type TrendPoint = {
  label: string;
  clicks: number;
};

function buildTrendPoints(rows: PromptAnalyticsRow[], fallbackRows: AnalyticsRow[]): TrendPoint[] {
  const source = rows.length > 0 ? rows : fallbackRows.map((row) => ({
    ...row,
    id: row.id,
    slug: row.slug,
    title: row.name,
    category: row.category,
    price: 0,
    currency: 'USD' as const,
    featured: row.featured,
    file_url: '',
    preview_text: '',
    created_at: '',
    updated_at: '',
    click_count: row.click_count,
    tracked_clicks: row.tracked_clicks,
    total_clicks: row.total_clicks,
    mobile_clicks: row.mobile_clicks,
    desktop_clicks: row.desktop_clicks,
    geo_events: row.geo_events,
    last_clicked_at: row.last_clicked_at,
  }));

  return source.slice(0, 7).map((row, index) => ({
    label: `P${index + 1}`,
    clicks: Number(row.total_clicks ?? row.tracked_clicks ?? row.click_count ?? 0),
  }));
}

function TrendChart({ points }: { points: TrendPoint[] }) {
  const width = 640;
  const height = 180;
  const padding = 20;
  const maxClicks = Math.max(...points.map((point) => point.clicks), 1);
  const step = points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;
  const linePath = points
    .map((point, index) => {
      const x = padding + step * index;
      const y = height - padding - (point.clicks / maxClicks) * (height - padding * 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-4">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
        <span>Clicks trend</span>
        <span>last {points.length} points</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" role="img" aria-label="Clicks trend chart">
        <defs>
          <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <path d={linePath} fill="none" stroke="url(#trendLine)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point, index) => {
          const x = padding + step * index;
          const y = height - padding - (point.clicks / maxClicks) * (height - padding * 2);
          return <circle key={point.label} cx={x} cy={y} r="4" fill="#e2e8f0" />;
        })}
      </svg>
    </div>
  );
}

type AnalyticsRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  pricing: string;
  commission_rate: number;
  featured: boolean;
  verified: boolean;
  click_count: number;
  tracked_clicks: number;
  total_clicks: number;
  mobile_clicks: number;
  desktop_clicks: number;
  geo_events: number;
  last_clicked_at: string | null;
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const siteControls = await getSiteControls();
  const supabase = createSupabaseServerClient();
  const analyticsQuery = supabase ? await supabase.from('tools_analytics').select('*').order('tracked_clicks', { ascending: false }) : { data: null, error: null };
  const tools = (analyticsQuery.data ?? []) as AnalyticsRow[];
  const totalClicks = tools.reduce((sum, tool) => sum + Number(tool.total_clicks ?? tool.tracked_clicks ?? tool.click_count ?? 0), 0);
  const totalTools = tools.length;
  const estimatedRevenue = totalClicks * 0.15 * 29 * 0.2;
  const revenuePerClick = totalClicks > 0 ? estimatedRevenue / totalClicks : 0;

  const topTools = tools.slice(0, 5);
  const prompts = await getPromptsData();
  const promptAnalytics = await getPromptAnalyticsData();
  const fallbackPromptAnalytics: PromptAnalyticsRow[] = prompts.map((prompt) => ({
    id: prompt.id,
    slug: prompt.slug,
    title: prompt.title,
    category: prompt.category,
    price: prompt.price,
    currency: prompt.currency,
    featured: prompt.featured,
    file_url: prompt.file_url,
    preview_text: prompt.preview_text,
    created_at: prompt.created_at,
    updated_at: prompt.updated_at,
    click_count: 0,
    tracked_clicks: 0,
    total_clicks: 0,
    mobile_clicks: 0,
    desktop_clicks: 0,
    geo_events: 0,
    last_clicked_at: null,
  }));
  const promptSummary = summarizePromptRevenue(promptAnalytics.length > 0 ? promptAnalytics : fallbackPromptAnalytics);
  const promptTotal = promptSummary.totalPrompts;
  const promptFeatured = promptSummary.featuredPrompts;
  const promptRevenue = promptSummary.estimatedRevenue;
  const promptTrendPoints = buildTrendPoints(promptAnalytics, tools);
  const deviceBreakdown = tools.reduce(
    (acc, tool) => ({
      mobile: acc.mobile + Number(tool.mobile_clicks ?? 0),
      desktop: acc.desktop + Number(tool.desktop_clicks ?? 0),
    }),
    { mobile: 0, desktop: 0 },
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Admin dashboard</p>
        <h1 className="mt-4 text-4xl font-black text-white">Revenue analytics</h1>
        <p className="mt-3 text-sm text-slate-400">Signed in as {session.user?.email}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {([
            ['Total clicks', totalClicks],
            ['Total tools', totalTools],
            ['Estimated revenue', `${estimatedRevenue.toFixed(2)}`],
            ['Revenue per click', `${revenuePerClick.toFixed(2)}`],
          ] as MetricPair[]).map(([label, value]) => (
            <div key={String(label)} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-2xl font-black text-white">{String(value)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-bold text-white">Top tools</h2>
          <div className="mt-4 space-y-4">
            {topTools.map((tool) => (
              <div key={tool.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{tool.name}</p>
                <p className="text-sm text-slate-400">Clicks: {Number(tool.total_clicks ?? tool.tracked_clicks ?? tool.click_count ?? 0)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-bold text-white">Breakdown</h2>
          <div className="mt-4 space-y-4 text-slate-300">
            <p>Mobile clicks: {deviceBreakdown.mobile}</p>
            <p>Desktop clicks: {deviceBreakdown.desktop}</p>
            <p>Admin URL: {siteUrl}/admin</p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
        <h2 className="text-2xl font-bold text-white">Prompts analytics</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">Total prompts: {promptTotal}</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">Featured prompts: {promptFeatured}</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">Est. prompt revenue: ${promptRevenue.toFixed(2)}</div>
        </div>
        <div className="mt-6">
          <TrendChart points={promptTrendPoints} />
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
        <h2 className="text-2xl font-bold text-white">Security controls</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
            Anti-capture: {siteControls.antiCaptureEnabled ? 'enabled' : 'disabled'}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
            AI model: llama-3.3-70b-versatile
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/#assistant" className="rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950">
            Open AI assistant
          </Link>
          <Link href="/import" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
            Import flow
          </Link>
          <Link href="/admin/prompts" className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100">
            Prompts analytics
          </Link>
          <Link href="/admin/monetization" className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100">
            Monetization analytics
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
        <h2 className="text-2xl font-bold text-white">Manual affiliate link editor</h2>
        <p className="mt-2 text-sm text-slate-400">Use this form to assign or replace affiliate URLs for a tool when needed.</p>
        <ManualAffiliateLinkForm endpoint="/api/admin/tools" />
      </section>
    </main>
  );
}
