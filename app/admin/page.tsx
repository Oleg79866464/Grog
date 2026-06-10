import { tools } from '@/lib/catalog';

export default function AdminPage() {
  const totalClicks = tools.reduce((sum, tool) => sum + tool.click_count, 0);
  const estimatedRevenue = totalClicks * 0.15 * 29 * 0.15;
  const revenuePerClick = totalClicks > 0 ? estimatedRevenue / totalClicks : 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Admin dashboard</p>
        <h1 className="mt-4 text-4xl font-black text-white">Revenue analytics</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ['Total clicks', totalClicks],
            ['Total tools', tools.length],
            ['Estimated revenue', `$${estimatedRevenue.toFixed(2)}`],
            ['Revenue per click', `$${revenuePerClick.toFixed(2)}`],
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-2xl font-black text-white">{String(value)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
