import type { Metadata } from 'next';
import Link from 'next/link';
import { getMonetizationOffersData, summarizeMonetizationRevenue } from '@/lib/monetization';
import { absoluteUrl } from '@/lib/url';

export const metadata: Metadata = {
  title: 'Спонсоры, реклама и партнёрские размещения | Grog',
  description:
    'Премиальные спонсорские размещения, рекламные слоты и banking offers для брендов, которые хотят охватить аудиторию маркетинга, SEO, SMM и digital.',
  keywords: [
    'спонсоры проекта',
    'реклама на сайте',
    'рекламодатели',
    'партнерские размещения',
    'банковские продукты',
    'спонсорство сайта',
  ],
  alternates: {
    canonical: absoluteUrl('/sponsors'),
    languages: {
      'ru-RU': absoluteUrl('/sponsors'),
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: absoluteUrl('/sponsors'),
    siteName: 'Grog',
    title: 'Спонсоры, реклама и партнёрские размещения | Grog',
    description:
      'Премиальные спонсорские размещения, рекламные слоты и banking offers для брендов, которые хотят охватить аудиторию маркетинга, SEO, SMM и digital.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Спонсоры, реклама и партнёрские размещения | Grog',
    description:
      'Премиальные спонсорские размещения, рекламные слоты и banking offers для брендов, которые хотят охватить аудиторию маркетинга, SEO, SMM и digital.',
  },
};

export default async function SponsorsPage() {
  const offers = await getMonetizationOffersData();
  const summary = summarizeMonetizationRevenue(offers);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium backdrop-blur xl:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Sponsors & advertising</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl xl:text-6xl">
          Спонсоры, рекламодатели и банковские продукты для премиального размещения.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Отдельная коммерческая вертикаль с нативными слотами, аналитикой кликов и показов, а также ручным и автоматическим
          добавлением предложений.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#packages" className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25">
            Смотреть пакеты
          </Link>
          <Link href="#stats" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white">
            Статистика
          </Link>
          <Link href="/advertise" className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-100">
            Разместить рекламу
          </Link>
        </div>
      </section>

      <section id="stats" className="mt-10 grid gap-4 md:grid-cols-4">
        {[
          ['Активных офферов', summary.totalOffers],
          ['Кликов', summary.totalClicks],
          ['Показов', summary.totalImpressions],
          ['CTR', `${(summary.ctr * 100).toFixed(2)}%`],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-white">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-black">{String(value)}</p>
          </div>
        ))}
      </section>

      <section id="packages" className="mt-14 grid gap-4 lg:grid-cols-3">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <article key={offer.id} className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 shadow-premium">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{offer.entity_type}</p>
              <h2 className="mt-3 text-2xl font-bold text-white">{offer.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{offer.description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">{offer.pricing}</span>
                <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-cyan-200">{offer.placement}</span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">
                  {Math.round(offer.commission_rate * 100)}% revshare
                </span>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href={`/go/${offer.id}`} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
                  Открыть
                </Link>
                <Link href="/advertise" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                  Обсудить размещение
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 text-slate-300 lg:col-span-3">
            Пока нет активных спонсорских офферов. Добавьте их через Supabase или импорт.
          </div>
        )}
      </section>
    </main>
  );
}
