import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getPromptAnalyticsData, promptRowsToHighlights, summarizePromptRevenue } from '@/lib/prompts-analytics';

export default async function PromptsAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const rows = await getPromptAnalyticsData();
  const summary = summarizePromptRevenue(rows);
  const highlights = promptRowsToHighlights(rows);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Prompts analytics</p>
        <h1 className="mt-4 text-4xl font-black text-white">Панель промптов и трафика</h1>
        <p className="mt-3 text-sm text-slate-400">Signed in as {session.user?.email}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ['Total clicks', summary.totalClicks],
            ['Total prompts', summary.totalPrompts],
            ['Estimated revenue', `$${summary.estimatedRevenue.toFixed(2)}`],
            ['Revenue per click', `$${summary.revenuePerClick.toFixed(2)}`],
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-2xl font-black text-white">{String(value)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-bold text-white">Top prompts</h2>
          <div className="mt-4 space-y-4">
            {highlights.length > 0 ? (
              highlights.map((prompt) => (
                <div key={prompt.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{prompt.title}</p>
                  <p className="text-sm text-slate-400">
                    Clicks: {prompt.clicks} · {prompt.category} · {prompt.price} {prompt.currency}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">Нет аналитических данных по промптам. Добавьте view prompts_analytics в Supabase.</p>
            )}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-bold text-white">Traffic controls</h2>
          <div className="mt-4 space-y-4 text-slate-300">
            <p>Featured prompts: {summary.featuredPrompts}</p>
            <p>Admin scope: prompts vertical only</p>
            <p>Tracking source: Supabase click logging</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/prompts" className="rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950">
              Open prompts catalog
            </Link>
            <Link href="/import" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
              Import workflow
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
