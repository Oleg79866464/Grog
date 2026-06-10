import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPromptsData } from '@/lib/prompts';
import { getPromptCategoryBySlug, promptCategories } from '@/lib/prompts-catalog';
import { absoluteUrl } from '@/lib/url';

export function generateStaticParams() {
  return promptCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = getPromptCategoryBySlug(params.slug);

  if (!category) {
    return { title: 'Категория промптов не найдена' };
  }

  const canonical = absoluteUrl(`/prompts/category/${category.slug}`);

  return {
    title: category.seoTitle,
    description: category.seoDescription,
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
      title: category.seoTitle,
      description: category.seoDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: category.seoTitle,
      description: category.seoDescription,
    },
  };
}

export default async function PromptCategoryPage({ params }: { params: { slug: string } }) {
  const category = getPromptCategoryBySlug(params.slug);

  if (!category) notFound();

  const prompts = await getPromptsData();
  const categoryPrompts = prompts.filter((prompt) => prompt.category === category.slug);
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.title,
    itemListElement: categoryPrompts.map((prompt, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/prompts/${prompt.slug}`),
      name: prompt.title,
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
        {categoryPrompts.map((prompt) => (
          <article key={prompt.id} className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-2xl font-bold text-white">{prompt.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{prompt.preview_text}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">{prompt.price} {prompt.currency}</span>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-cyan-200">{prompt.categoryLabel}</span>
            </div>
            <div className="mt-6 flex gap-3">
              <Link href={`/prompts/${prompt.slug}`} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
                Подробнее
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
