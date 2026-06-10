import type { Metadata } from 'next';
import Link from 'next/link';
import { AiAssistant } from '@/components/ai-assistant';
import { categories } from '@/lib/catalog';
import { getSiteControls } from '@/lib/site-controls';
import { getToolsData } from '@/lib/data';
import { absoluteUrl } from '@/lib/url';
import { promptCategories } from '@/lib/prompts-catalog';

export const metadata: Metadata = {
  title: 'Grog — премиальный каталог AI-инструментов для маркетинга, SEO и контента',
  description:
    'Лучшие нейросети и AI-сервисы для маркетологов, SMM, SEO, копирайтинга и digital-команд. Премиальный каталог с обзорами, рейтингами и переходами через трекинг.',
  alternates: {
    canonical: absoluteUrl('/'),
    languages: {
      'ru-RU': absoluteUrl('/'),
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: absoluteUrl('/'),
    siteName: 'Grog',
    title: 'Grog — premium AI tools directory',
    description:
      'Премиальный каталог AI-инструментов для маркетинга, SEO, контента и SMM с server-side tracking и affiliate-first UX.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grog — premium AI tools directory',
    description:
      'Премиальный каталог AI-инструментов для маркетинга, SEO, контента и SMM с server-side tracking и affiliate-first UX.',
  },
};

export default async function HomePage() {
  const tools = await getToolsData();
  const siteControls = getSiteControls();
  const featuredTools = tools.filter((tool) => tool.featured).slice(0, 6);
  const commercialCopy = [
    'Каталог заточен под RU-коммерческие запросы и отбор инструментов, которые реально конвертируют трафик в клики и выручку.',
    'Серверный redirect слой скрывает affiliate URL, повышает доверие и позволяет вести аналитику по стране, устройству и источнику.',
    'Премиальная визуальная подача и структурированный SEO-контент помогают странице выглядеть дороже generic-листинга.',
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium backdrop-blur xl:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Premium AI tools directory</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl xl:text-6xl">
              Каталог AI-инструментов для маркетинга, SEO, контента и SMM, который выглядит как дорогой B2B SaaS.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Нейросети, генераторы текста, AI для SEO, видео, изображений и бизнеса — с упором на trust-first UX,
              органический трафик и RevShare-монетизацию.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#featured" className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25">
                Смотреть инструменты
              </Link>
              <Link href="#categories" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white">
                Категории SEO
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Оценка дохода</p>
              <p className="mt-2 text-3xl font-black text-white">Revenue-first</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">Клики → трекинг → RevShare → прогноз выручки по формуле CTR × conversion × commission.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {['Trust signals', 'SEO structure', 'Affiliate routing'].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm font-medium text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {commercialCopy.map((item) => (
          <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
            {item}
          </div>
        ))}
      </section>

      <section id="assistant" className="mt-14 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <AiAssistant enabled />
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-premium">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Site controls</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Контроль режима защиты экрана</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Защита от скриншотов в вебе работает как best-effort слой: затемнение контента, маскирование чувствительных блоков,
            блокировка select/copy и скрытие UI при попытке захвата. Это не может гарантированно остановить системный скриншот, но
            заметно повышает порог копирования.
          </p>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            Статус анти-capture: {siteControls.antiCaptureEnabled ? 'Включён' : 'Выключен'}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Переключатель включается из админки; в текущей версии отображается как UI-policy, готовая к подключению к Supabase settings.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {commercialCopy.map((item) => (
          <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
            {item}
          </div>
        ))}
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <Link href="/prompts" className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 hover:bg-white/10">
          <p className="text-sm text-cyan-300">Premium prompts</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Отдельная линия монетизации на промптах</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">SEO-раздел, категории и карточки для продажи промптов без смешения с каталогом AI tools.</p>
        </Link>
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-cyan-300">Prompt categories</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {promptCategories.slice(0, 6).map((category) => (
              <Link key={category.slug} href={`/prompts/category/${category.slug}`} className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-200">
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Категории</p>
            <h2 className="mt-3 text-3xl font-black text-white">SEO-лендинги под коммерческие запросы</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 hover:bg-white/10">
              <p className="text-sm text-cyan-300">{category.keyword}</p>
              <h3 className="mt-3 text-xl font-bold text-white">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="featured" className="mt-14">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Featured tools</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-black text-white">Инструменты с самым высоким коммерческим intent</h2>
          <p className="hidden max-w-xl text-sm text-slate-400 md:block">{tools.length} инструментов в базе, curated под маркетинг, контент и product growth.</p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <article key={tool.id} className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 shadow-premium">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{tool.categoryLabel}</p>
              <h3 className="mt-3 text-2xl font-bold text-white">{tool.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{tool.description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">{tool.pricing}</span>
                <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-cyan-200">{tool.click_count} кликов</span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">verified</span>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href={`/tool/${tool.slug}`} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
                  Страница инструмента
                </Link>
                <Link href={`/go/${tool.id}`} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                  Перейти
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}