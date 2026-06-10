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

  const priceFilterOptions = ['Все цены', 'Бесплатно', 'Freemium', 'Платные'] as const;
  const sortOptions = ['Сначала новые', 'По названию', 'По популярности'] as const;
  const resourceOptions = [
    ['Лучший видеохостинг', 'YouTube'],
    ['Русский видеохостинг', 'Rutube'],
    ['Социальная платформа', 'VK'],
    ['Лучший форум', 'Product Hunt'],
    ['Информационный портал', 'TechCrunch'],
  ] as const;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="card-premium card-premium-hover bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_38%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.1),transparent_30%)] p-8 xl:p-12">
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
            <div className="card-premium card-premium-hover p-5">
              <p className="text-sm text-slate-400">Оценка дохода</p>
              <p className="mt-2 text-3xl font-black text-white">Revenue-first</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">Клики → трекинг → RevShare → прогноз выручки по формуле CTR × conversion × commission.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {['Trust signals', 'SEO structure', 'Affiliate routing'].map((item) => (
                <div key={item} className="card-premium card-premium-hover p-4 text-sm font-medium text-slate-200">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-violet-400/10 p-4 text-sm text-cyan-50 shadow-glow">
              Sponsored placement ready: нативный рекламный слот подключается через /sponsors и /advertise без потери SEO.
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

      <section className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-premium">
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Навигация и поиск</p>
            <h2 className="mt-3 text-2xl font-bold text-white">Фильтры по цене, сортировка и поиск</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Можно фильтровать инструменты по типу цен, сортировать список и быстро искать по каталогу без потери премиального вида.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <select aria-label="Фильтр по цене" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none">
              {priceFilterOptions.map((option) => (
                <option key={option} value={option.toLowerCase()}>{option}</option>
              ))}
            </select>
            <select aria-label="Сортировка" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none">
              {sortOptions.map((option) => (
                <option key={option} value={option.toLowerCase()}>{option}</option>
              ))}
            </select>
            <a href="https://www.google.com/search?q=best+ai+tools+for+marketing" target="_blank" rel="noreferrer" className="rounded-2xl bg-cyan-500 px-4 py-3 text-center text-sm font-semibold text-slate-950">Поиск в интернете</a>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-premium">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Trusted web resources</p>
            <h2 className="mt-3 text-2xl font-bold text-white">Лучшие ресурсы и каналы по теме AI</h2>
          </div>
          <Link href="/sponsors" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
            Все спонсоры
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {resourceOptions.map(([label, title]) => (
            <a key={title} href={`https://${title.toLowerCase().replace(/\s+/g, '')}.com`} target="_blank" rel="noreferrer" className="card-premium card-premium-hover p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">Заполнитель для дальнейшей ручной подстановки партнёрских ссылок из админки.</p>
            </a>
          ))}
        </div>
      </section>

      <section id="author" className="mt-14 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card-premium card-premium-hover p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Автор / portfolio</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-[140px_1fr] sm:items-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 text-center text-xs text-slate-400">
              Фото автора<br />300×300
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">[Ваше имя / псевдоним]</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Автор и владелец проекта. Каталог собран как premium AI tools directory с фокусом на SEO, RevShare, sponsor-форматы и рост органического трафика.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Это поле удобно использовать как продающее портфолио для покупателя: фото, краткое описание и ссылки на ваши профили.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href="https://t.me/your_username" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Telegram — @your_username</a>
            <a href="https://www.instagram.com/your_username/" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Instagram — @your_username</a>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Ссылки-заглушки можно заменить вручную перед продажей или публикацией.</p>
        </div>
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
        <Link href="/prompts" className="card-premium card-premium-hover p-6">
          <p className="text-sm text-cyan-300">Premium prompts</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Отдельная линия монетизации на промптах</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">SEO-раздел, категории и карточки для продажи промптов без смешения с каталогом AI tools.</p>
        </Link>
        <div className="card-premium card-premium-hover p-6">
          <p className="text-sm text-cyan-300">Prompt categories</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {promptCategories.slice(0, 6).map((category) => (
              <Link key={category.slug} href={`/prompts/category/${category.slug}`} className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-200 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10">
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
            <Link key={category.slug} href={`/category/${category.slug}`} className="card-premium card-premium-hover p-6">
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
            <article key={tool.id} className="card-premium card-premium-hover p-6">
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