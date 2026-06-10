import type { Metadata } from 'next';
import Link from 'next/link';
import { getPromptsData } from '@/lib/prompts';
import { promptCategories } from '@/lib/prompts-catalog';
import { absoluteUrl } from '@/lib/url';

export const metadata: Metadata = {
  title: 'Промпты для маркетинга, SEO, SMM и бизнеса | Grog',
  description:
    'Премиальный каталог промптов для маркетологов, SEO-специалистов, копирайтеров, блогеров и продуктовых команд. SEO-структура, категории и коммерческие подборки.',
  alternates: {
    canonical: absoluteUrl('/prompts'),
    languages: {
      'ru-RU': absoluteUrl('/prompts'),
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: absoluteUrl('/prompts'),
    siteName: 'Grog',
    title: 'Промпты для маркетинга, SEO, SMM и бизнеса | Grog',
    description:
      'Премиальный каталог промптов для маркетинга, SEO, SMM, copywriting, growth и digital-команд.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Промпты для маркетинга, SEO, SMM и бизнеса | Grog',
    description:
      'Премиальный каталог промптов для маркетинга, SEO, SMM, copywriting, growth и digital-команд.',
  },
};

export default async function PromptsIndexPage() {
  const prompts = await getPromptsData();
  const featuredPrompts = prompts.filter((prompt) => prompt.featured).slice(0, 6);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium backdrop-blur xl:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Premium prompt store</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl xl:text-6xl">
          Готовые промпты для маркетинга, SEO, SMM, product и growth-команд.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Отдельная SEO-вертикаль для продажи промптов: прозрачная структура, категории под коммерческие запросы и
          сценарий монетизации через качественный контент.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#categories" className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25">
            Смотреть категории
          </Link>
          <Link href="#featured" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white">
            Featured prompts
          </Link>
          <Link href="/admin/prompts" className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-100">
            Admin analytics
          </Link>
        </div>
      </section>

      <section id="categories" className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Категории</p>
            <h2 className="mt-3 text-3xl font-black text-white">SEO-кластеры для промптов</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {promptCategories.map((category) => (
            <Link key={category.slug} href={`/prompts/category/${category.slug}`} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 hover:bg-white/10">
              <p className="text-sm text-cyan-300">{category.keyword}</p>
              <h3 className="mt-3 text-xl font-bold text-white">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="featured" className="mt-14">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Featured prompts</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-black text-white">Лучшие промпты для быстрой монетизации</h2>
          <p className="hidden max-w-xl text-sm text-slate-400 md:block">{prompts.length} промптов в каталоге, готовых для импорта в Supabase.</p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {featuredPrompts.map((prompt) => (
            <article key={prompt.id} className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 shadow-premium">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{prompt.categoryLabel}</p>
              <h3 className="mt-3 text-2xl font-bold text-white">{prompt.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{prompt.preview_text}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">{prompt.price} {prompt.currency}</span>
                <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-cyan-200">{prompt.category}</span>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href={`/prompts/${prompt.slug}`} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
                  Страница промпта
                </Link>
                <Link href="#categories" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                  Больше
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
