import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '@/lib/url';
import { getMonetizationOffersData } from '@/lib/monetization';

export const metadata: Metadata = {
  title: 'Разместить рекламу и стать спонсором | Grog',
  description:
    'Запросите спонсорское размещение, рекламный слот или партнёрский пакет на Grog. Премиальный доступ к аудитории AI, marketing, SEO и digital.',
  keywords: [
    'разместить рекламу',
    'спонсорство сайта',
    'реклама на сайте',
    'рекламный пакет',
    'партнерский пакет',
  ],
  alternates: {
    canonical: absoluteUrl('/advertise'),
    languages: {
      'ru-RU': absoluteUrl('/advertise'),
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: absoluteUrl('/advertise'),
    siteName: 'Grog',
    title: 'Разместить рекламу и стать спонсором | Grog',
    description:
      'Запросите спонсорское размещение, рекламный слот или партнёрский пакет на Grog. Премиальный доступ к аудитории AI, marketing, SEO и digital.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Разместить рекламу и стать спонсором | Grog',
    description:
      'Запросите спонсорское размещение, рекламный слот или партнёрский пакет на Grog. Премиальный доступ к аудитории AI, marketing, SEO и digital.',
  },
};

export default async function AdvertisePage() {
  const offers = await getMonetizationOffersData();
  const topOffers = offers.slice(0, 2);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium backdrop-blur xl:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Advertising inquiry</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Разместить рекламу, стать спонсором или купить партнёрский пакет.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Мы предлагаем нативные блоки, спонсорские карточки, банковские продукты и отдельные бренд-партнёрства. Формат и
          стоимость зависят от позиции, срока размещения и объёма трафика.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ['Нативный блок', 'Встраивается в главный поток без агрессивного баннера.'],
            ['Премиум placement', 'Спонсорская карточка с аналитикой кликов и показов.'],
            ['Banking offers', 'Финансовые продукты с доверительной подачей и RevShare.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-white font-semibold">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="mailto:ads@example.com" className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25">
            Написать по рекламе
          </Link>
          <Link href="/sponsors" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white">
            Смотреть пакеты
          </Link>
        </div>
      </section>
    </main>
  );
}
