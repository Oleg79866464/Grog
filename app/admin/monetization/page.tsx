import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getMonetizationAnalyticsData, getMonetizationOffersData, summarizeMonetizationRevenue } from '@/lib/monetization';

export default async function AdminMonetizationPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const offers = await getMonetizationOffersData();
  const analytics = await getMonetizationAnalyticsData();
  const summary = summarizeMonetizationRevenue(analytics.length > 0 ? analytics : offers);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Admin / monetization</p>
        <h1 className="mt-4 text-4xl font-black text-white">Спонсоры, реклама и банковские офферы</h1>
        <p className="mt-3 text-sm text-slate-400">Signed in as {session.user?.email}</p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          ['Offers', offers.length],
          ['Clicks', summary.totalClicks],
          ['Impressions', summary.totalImpressions],
          ['CTR', `${(summary.ctr * 100).toFixed(2)}%`],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-white">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-black">{String(value)}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
        <h2 className="text-2xl font-bold text-white">Latest offers</h2>
        <div className="mt-4 space-y-3">
          {offers.slice(0, 10).map((offer) => (
            <div key={offer.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{offer.title}</p>
                  <p className="text-sm text-slate-400">{offer.entity_type} · {offer.placement} · {offer.pricing}</p>
                </div>
                <Link href={`/go/${offer.id}`} className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                  Open
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
