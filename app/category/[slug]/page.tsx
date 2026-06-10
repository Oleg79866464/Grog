import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug, getToolsByCategory } from '@/lib/catalog';
import { getToolsData } from '@/lib/data';
import { absoluteUrl } from '@/lib/url';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return { title: 'Категория не найдена' };
  }

  const title = `${category.title} — лучшие AI-инструменты | Grog`;
  const description = `Подборка лучших AI-инструментов для ${category.title.toLowerCase()}. Сравнение, use cases, преимущества и переходы к проверенным сервисам.`;
  const canonical = absoluteUrl(`/category/${category.slug}`);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'ru-RU': canonical,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: canonical,
      siteName: 'Grog',
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);

  if (!category) notFound();

  const categoryTools = getToolsByCategory(category.slug, await getToolsData());
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.title,
    itemListElement: categoryTools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `/tool/${tool.slug}`,
      name: tool.name,
    })),
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">{category.keyword}</p>
        <h1 className="mt-4 text-4xl font-black text-white">{category.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{category.description}</p>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {categoryTools.map((tool) => (
          <article key={tool.id} className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{tool.description}</p>
            <div className="mt-4 flex gap-3">
              <Link href={`/tool/${tool.slug}`} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
                Подробнее
              </Link>
              <Link href={`/go/${tool.id}`} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                Перейти
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
